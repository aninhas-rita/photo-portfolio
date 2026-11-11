import PlaceholderMedia from "@/components/PlaceholderMedia";

export const metadata = { title: "About — Marwa Hassan" };

export default function AboutPage() {
  return (
    <section className="max-w-content mx-auto px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
        <PlaceholderMedia
          item={{
            id: "about-portrait",
            kind: "photo",
            src: "placeholder:about",
            width: 1000,
            height: 1250,
            alt: "Portrait of Marwa Hassan",
          }}
          className="w-full max-w-sm mx-auto lg:mx-0"
          arch
        />

        <div className="max-w-[62ch]">
          <p className="font-script text-3xl text-taupe mb-1">Behind the lens</p>
          <h1 className="font-display text-fluid-h2 text-ink mb-6">I'm Marwa</h1>
          <div className="space-y-5 text-ink/85 leading-relaxed">
            <p>
              I'm a travel and landscape photographer based between deserts and
              coastlines. Most of my work starts the same way — arriving somewhere
              with no plan beyond being there before the light changes.
            </p>
            <p>
              I shoot on location across the Middle East and Central Asia,
              usually alone, usually on foot. The work on this site spans the
              last few years of that practice.
            </p>
            <p>
              For prints, commissions, or collaborations, reach out below.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
