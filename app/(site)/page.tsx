import Hero from "@/components/Hero";
import AttractionsRow from "@/components/AttractionsRow";
import ApproachSection from "@/components/ApproachSection";
import Testimonials from "@/components/Testimonials";

// Content is edited live via /admin, so this page must always re-read it
// rather than being statically cached at build time.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AttractionsRow />
      <ApproachSection />
      <Testimonials />
    </>
  );
}
