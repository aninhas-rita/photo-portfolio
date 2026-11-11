import { NextRequest, NextResponse } from "next/server";
import { list, del } from "@vercel/blob";
import { readGalleries, writeGalleries } from "@/lib/content";

export async function PATCH(request: NextRequest, { params }: { params: { slug: string } }) {
  const body = (await request.json().catch(() => ({}))) as {
    title?: string;
    location?: string;
    year?: string;
    description?: string;
  };

  const galleries = await readGalleries();
  const index = galleries.findIndex((g) => g.slug === params.slug);
  if (index === -1) {
    return NextResponse.json({ error: "Folder not found" }, { status: 404 });
  }

  const current = galleries[index];
  const updated = {
    ...current,
    title: body.title?.trim() || current.title,
    location: body.location ?? current.location,
    year: body.year ?? current.year,
    description: body.description ?? current.description,
  };

  const next = [...galleries];
  next[index] = updated;
  await writeGalleries(next);
  return NextResponse.json({ gallery: updated });
}

export async function DELETE(_request: NextRequest, { params }: { params: { slug: string } }) {
  const galleries = await readGalleries();
  const exists = galleries.some((g) => g.slug === params.slug);
  if (!exists) {
    return NextResponse.json({ error: "Folder not found" }, { status: 404 });
  }

  const next = galleries.filter((g) => g.slug !== params.slug);
  await writeGalleries(next);

  // Clean up every blob uploaded into this folder. list() pages through
  // results (1000 at a time), so this loops until there's nothing left.
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: `uploads/${params.slug}/`, cursor });
    if (page.blobs.length > 0) {
      await del(page.blobs.map((b) => b.url));
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  return NextResponse.json({ ok: true });
}
