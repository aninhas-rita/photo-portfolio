import { getGalleries } from "@/lib/data";
import PlaceholderMedia from "./PlaceholderMedia";

export default async function AttractionsRow() {
  const galleries = await getGalleries();

  // Pull up to 5 shots spread across folders (skipping each folder's cover,
  // since that's already shown elsewhere) — works with however many
  // folders/photos currently exist, including right after a fresh install.
  const picks = galleries
    .flatMap((g) => g.items)
    .slice(0, 5);

  if (picks.length === 0) return null;

  return (
    <section className="max-w-content mx-auto px-5 sm:px-8 lg:px-12 mt-24 sm:mt-32 text-center">
      <p className="font-script text-2xl sm:text-3xl text-taupe mb-1">What I love capturing</p>
      <h2 className="font-display text-fluid-h2 text-ink mb-12 sm:mb-16">Moments, not just photos</h2>

      <div className="flex gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible sm:justify-center pb-4 sm:pb-0 snap-x snap-mandatory -mx-5 px-5 sm:mx-0 sm:px-0">
        {picks.map((item, i) => {
          const emphasized = i === Math.floor((picks.length - 1) / 2);
          return (
            <div
              key={item.id}
              className={`shrink-0 snap-center ${emphasized ? "w-44 sm:w-56" : "w-36 sm:w-44"}`}
              style={{ marginTop: emphasized ? 0 : 24 }}
            >
              <PlaceholderMedia item={item} className="w-full" arch />
            </div>
          );
        })}
      </div>
    </section>
  );
}
