import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { put } from "@vercel/blob";
import { imageSize } from "image-size";
import { readGalleries, writeGalleries } from "@/lib/content";
import type { MediaItem } from "@/lib/types";

const MAX_BYTES = 200 * 1024 * 1024; // 200MB per file — generous for raw video exports

function extFor(filename: string, mime: string): string {
  const fromName = path.extname(filename);
  if (fromName) return fromName;
  if (mime.startsWith("image/")) return `.${mime.split("/")[1] || "jpg"}`;
  if (mime.startsWith("video/")) return `.${mime.split("/")[1] || "mp4"}`;
  return "";
}

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  const galleries = await readGalleries();
  const index = galleries.findIndex((g) => g.slug === params.slug);
  if (index === -1) {
    return NextResponse.json({ error: "Folder not found" }, { status: 404 });
  }

  const form = await request.formData();
  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: "No files received" }, { status: 400 });
  }

  const newItems: MediaItem[] = [];

  for (const file of files) {
    if (file.size > MAX_BYTES) continue;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    if (!isImage && !isVideo) continue;

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = extFor(file.name, file.type);
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    const pathname = `uploads/${params.slug}/${filename}`;

    const blob = await put(pathname, buffer, {
      access: "public",
      addRandomSuffix: false,
      contentType: file.type,
    });

    let width = 1600;
    let height = 1067; // sane 3:2 fallback, used for video (dimensions aren't easily read server-side)
    if (isImage) {
      try {
        const dims = imageSize(buffer);
        if (dims.width && dims.height) {
          width = dims.width;
          height = dims.height;
        }
      } catch {
        // Keep the fallback dimensions — the layout still works, just with
        // a guessed aspect ratio until she re-uploads a readable file.
      }
    }

    newItems.push({
      id: filename,
      kind: isImage ? "photo" : "video",
      src: blob.url,
      width,
      height,
      alt: path.parse(file.name).name.replace(/[-_]+/g, " "),
    });
  }

  if (newItems.length === 0) {
    return NextResponse.json({ error: "No valid image or video files found" }, { status: 400 });
  }

  const gallery = galleries[index];
  const wasEmpty = gallery.items.length === 0;
  const updated = {
    ...gallery,
    items: [...gallery.items, ...newItems],
    // The first real upload to an empty folder replaces the placeholder cover.
    cover: wasEmpty ? newItems[0] : gallery.cover,
  };

  const next = [...galleries];
  next[index] = updated;
  await writeGalleries(next);

  return NextResponse.json({ gallery: updated }, { status: 201 });
}
