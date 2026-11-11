import { IconEye, IconHeart, IconFrame } from "./icons";

const pillars = [
  {
    icon: IconEye,
    title: "Presence",
    body: "I shoot quietly and stay out of the way, so what you get back is what was actually there.",
  },
  {
    icon: IconHeart,
    title: "Connection",
    body: "No stiff poses. The best frames come from people forgetting the camera is even on.",
  },
  {
    icon: IconFrame,
    title: "Craft",
    body: "Every set is edited and sequenced by hand — a finished story, not a folder of exports.",
  },
];

export default function ApproachSection() {
  return (
    <section className="bg-peach/50 mt-24 sm:mt-32 py-16 sm:py-24">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <h2 className="font-display text-fluid-h2 text-ink">An unhurried approach.</h2>
        <p className="font-sans text-ink/70 max-w-[52ch] mx-auto mt-4">
          Every shoot starts the same way — arriving early, staying late, and
          letting the light and the people set the pace rather than a shot list.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 mt-14 sm:mt-16">
          {pillars.map((p) => (
            <div key={p.title} className="flex flex-col items-center">
              <p.icon className="w-10 h-10 text-taupe mb-4" />
              <h3 className="font-display text-xl text-ink mb-2">{p.title}</h3>
              <p className="font-sans text-sm text-ink/70 max-w-[32ch]">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
