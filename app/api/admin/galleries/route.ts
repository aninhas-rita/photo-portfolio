import { NextRequest, NextResponse } from "next/server";
import { readGalleries, writeGalleries, uniqueSlug } from "@/lib/content";
import type { Gallery } from "@/lib/types";

export async function GET() {
  const galleries = await readGalleries();
  return NextResponse.json({ galleries });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as { title?: string };
  const title = body.title?.trim();
  if (!title) {
    return NextResponse.json({ error: "A folder name is required" }, { status: 400 });
  }

  const galleries = await readGalleries();
  const slug = uniqueSlug(title, galleries.map((g) => g.slug));

  const newGallery: Gallery = {
    slug,
    title,
    location: "",
    year: "",
    description: "",
    // Empty folders still need a valid cover; this placeholder is swapped
    // out automatically for the first real upload (see items route).
    cover: {
      id: `${slug}-empty`,
      kind: "photo",
      src: `placeholder:${slug}-empty`,
      width: 4,
      height: 3,
      alt: `${title} (empty)`,
    },
    items: [],
  };

  await writeGalleries([...galleries, newGallery]);
  return NextResponse.json({ gallery: newGallery }, { status: 201 });
}
