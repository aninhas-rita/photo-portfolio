import "server-only";
import { readGalleries, readGallery } from "./content";
import type { Gallery } from "./types";

/**
 * What every public page imports. Async because the content now lives in
 * content/data.json (editable at /admin), not in a hardcoded array — pages
 * using these must be (async) Server Components.
 */

export async function getGalleries(): Promise<Gallery[]> {
  return readGalleries();
}

export async function getGallery(slug: string): Promise<Gallery | undefined> {
  return readGallery(slug);
}
