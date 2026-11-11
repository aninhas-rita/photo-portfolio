import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { readGalleries, writeGalleries } from "@/lib/content";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string; itemId: string } }
) {
  const body = (await request.json().catch(() => ({}))) as {
    alt?: string;
    caption?: string;
    setCover?: boolean;
  };

  const galleries = await readGalleries();
  const gIndex = galleries.findIndex((g) => g.slug === params.slug);
  if (gIndex === -1) return NextResponse.json({ error: "Folder not found" }, { status: 404 });

  const gallery = galleries[gIndex];
  const iIndex = gallery.items.findIndex((it) => it.id === params.itemId);
  if (iIndex === -1) return NextResponse.json({ error: "Item not found" }, { status: 404 });

  const updatedItem = {
    ...gallery.items[iIndex],
    alt: body.alt ?? gallery.items[iIndex].alt,
    caption: body.caption ?? gallery.items[iIndex].caption,
  };

  const items = [...gallery.items];
  items[iIndex] = updatedItem;

  const updatedGallery = {
    ...gallery,
    items,
    cover: body.setCover ? updatedItem : gallery.cover,
  };

  const next = [...galleries];
  next[gIndex] = updatedGallery;
  await writeGalleries(next);

  return NextResponse.json({ gallery: updatedGallery });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { slug: string; itemId: string } }
) {
  const galleries = await readGalleries();
  const gIndex = galleries.findIndex((g) => g.slug === params.slug);
  if (gIndex === -1) return NextResponse.json({ error: "Folder not found" }, { status: 404 });

  const gallery = galleries[gIndex];
  const target = gallery.items.find((it) => it.id === params.itemId);
  if (!target) return NextResponse.json({ error: "Item not found" }, { status: 404 });

  const items = gallery.items.filter((it) => it.id !== params.itemId);
  const wasCover = gallery.cover.id === target.id;

  const updatedGallery = {
    ...gallery,
    items,
    cover: wasCover
      ? items[0] ?? {
          id: `${gallery.slug}-empty`,
          kind: "photo" as const,
          src: `placeholder:${gallery.slug}-empty`,
          width: 4,
          height: 3,
          alt: `${gallery.title} (empty)`,
        }
      : gallery.cover,
  };

  const next = [...galleries];
  next[gIndex] = updatedGallery;
  await writeGalleries(next);

  // Best-effort cleanup of the underlying blob — seed/placeholder items
  // have no real file in storage (their src is "placeholder:...", not a URL).
  if (!target.src.startsWith("placeholder:")) {
    await del(target.src).catch(() => {});
  }

  return NextResponse.json({ gallery: updatedGallery });
}
