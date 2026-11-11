import "server-only";
import { head, put, BlobNotFoundError } from "@vercel/blob";
import type { Gallery } from "./types";
import { seedGalleries } from "./seed-data";

const CONTENT_PATHNAME = "content/data.json";

/**
 * This file is the only place that touches the stored gallery data. Every
 * page and every admin API route goes through readGalleries/writeGalleries,
 * so there's exactly one source of truth and one place to swap out later
 * (e.g. for a real database once content grows past what a single JSON
 * blob comfortably handles) without touching anything else.
 *
 * Storage: a single JSON file in Vercel Blob (not local disk — Vercel's
 * production filesystem is read-only/ephemeral, so this is what actually
 * persists between requests). Media files (lib/content.ts callers in the
 * upload route) are separate blobs; this file only stores the metadata.
 */

export async function readGalleries(): Promise<Gallery[]> {
  try {
    const blob = await head(CONTENT_PATHNAME);
    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch content blob: ${res.status}`);
    return (await res.json()) as Gallery[];
  } catch (err) {
    if (err instanceof BlobNotFoundError) {
      // First run on this Blob store — seed it so the admin and the site
      // start in sync.
      await writeGalleries(seedGalleries);
      return seedGalleries;
    }
    throw err;
  }
}

export async function writeGalleries(galleries: Gallery[]): Promise<void> {
  await put(CONTENT_PATHNAME, JSON.stringify(galleries, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

export async function readGallery(slug: string): Promise<Gallery | undefined> {
  const galleries = await readGalleries();
  return galleries.find((g) => g.slug === slug);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export function uniqueSlug(base: string, existing: string[]): string {
  let slug = slugify(base) || "folder";
  let i = 2;
  while (existing.includes(slug)) {
    slug = `${slugify(base) || "folder"}-${i}`;
    i++;
  }
  return slug;
}
