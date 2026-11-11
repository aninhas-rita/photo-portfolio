"use client";

import { useState } from "react";
import type { Gallery } from "@/lib/types";
import MasonryGrid from "./MasonryGrid";
import Lightbox from "./Lightbox";

export default function GalleryView({ gallery }: { gallery: Gallery }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <MasonryGrid items={gallery.items} onSelect={setIndex} />
      <Lightbox
        items={gallery.items}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
      />
    </>
  );
}
