"use client";

import type { MediaItem } from "@/lib/types";
import PlaceholderMedia from "./PlaceholderMedia";
import LazyMount from "./LazyMount";

export default function MasonryGrid({
  items,
  onSelect,
}: {
  items: MediaItem[];
  onSelect: (index: number) => void;
}) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 [column-fill:_balance]">
      {items.map((item, i) => {
        const estimatedHeight = (320 * item.height) / item.width;
        // A real (non-placeholder) video renders its own native controls,
        // which can't sit inside a clickable button — just embed it directly.
        const isRealVideo = item.kind === "video" && !item.src.startsWith("placeholder:");

        return (
          <div key={item.id} className="mb-4 sm:mb-6 break-inside-avoid">
            <LazyMount minHeight={estimatedHeight}>
              {isRealVideo ? (
                <PlaceholderMedia item={item} sizes="(min-width: 1024px) 420px, 100vw" />
              ) : (
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  className="block w-full group focus-visible:outline-2 focus-visible:outline-taupe"
                  aria-label={`Open ${item.alt}`}
                >
                  <PlaceholderMedia
                    item={item}
                    className="group-hover:opacity-90 transition-opacity"
                    sizes="(min-width: 1024px) 420px, 100vw"
                  />
                </button>
              )}
            </LazyMount>
          </div>
        );
      })}
    </div>
  );
}
