import { notFound } from "next/navigation";
import { getGallery } from "@/lib/data";
import GalleryView from "@/components/GalleryView";

// Folders are created/removed live via /admin, so this can't be statically
// generated at build time the way a fixed set of pages could.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { folder: string } }) {
  const gallery = await getGallery(params.folder);
  return { title: gallery ? `${gallery.title} — Marwa Hassan` : "Not found" };
}

export default async function GalleryFolderPage({ params }: { params: { folder: string } }) {
  const gallery = await getGallery(params.folder);
  if (!gallery) notFound();

  return (
    <section className="max-w-content mx-auto px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16">
      <div className="mb-10 sm:mb-14 max-w-[60ch]">
        <h1 className="font-display text-fluid-h2 text-ink">{gallery.title}</h1>
        <p className="text-sm text-stone mt-2">
          {gallery.location} {gallery.year ? `· ${gallery.year}` : ""}
        </p>
        <p className="text-ink/80 mt-4">{gallery.description}</p>
      </div>

      {gallery.items.length === 0 ? (
        <p className="text-stone">No photos in this folder yet.</p>
      ) : (
        <GalleryView gallery={gallery} />
      )}
    </section>
  );
}
