import Link from "next/link";
import { getGalleries } from "@/lib/data";
import PlaceholderMedia from "@/components/PlaceholderMedia";

export const metadata = { title: "Work — Marwa Hassan" };
export const dynamic = "force-dynamic";

export default async function GalleryIndexPage() {
  const galleries = await getGalleries();

  return (
    <section className="max-w-content mx-auto px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16">
      <p className="font-script text-3xl text-taupe mb-1">Our stories</p>
      <h1 className="font-display text-fluid-h2 text-ink mb-10 sm:mb-14">Work</h1>

      {galleries.length === 0 ? (
        <p className="text-stone">Nothing published yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12 sm:gap-y-16">
          {galleries.map((g) => (
            <Link key={g.slug} href={`/gallery/${g.slug}`} className="group block">
              <PlaceholderMedia item={g.cover} className="group-hover:opacity-90 transition-opacity" />
              <div className="mt-4 flex items-baseline justify-between">
                <p className="font-display text-xl sm:text-2xl text-ink">{g.title}</p>
                <p className="text-sm text-stone">{g.items.length} items</p>
              </div>
              <p className="text-sm text-stone mt-1 max-w-[52ch]">{g.description}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
