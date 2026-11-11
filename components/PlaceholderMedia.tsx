import Image from "next/image";
import type { MediaItem } from "@/lib/types";

// Deterministic warm gradient per item, so the layout reads as a real
// gallery (varied tones) without depending on any external image host.
// Used for demo/seed items only — anything uploaded through /admin has a
// real src and renders as an actual image or video instead (see below).
function toneFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  const hue = hash % 30; // stays within the lace/peach/blush/taupe range
  return `linear-gradient(160deg, hsl(${24 + hue} 38% 89%), hsl(${10 + hue} 32% 64%))`;
}

export default function PlaceholderMedia({
  item,
  className = "",
  arch = false,
  sizes = "(min-width: 1024px) 400px, 100vw",
}: {
  item: MediaItem;
  className?: string;
  /** Rounds the top into an arch — the recurring frame shape in the new design. */
  arch?: boolean;
  /** Passed straight to next/image; tune per call site for real layout widths. */
  sizes?: string;
}) {
  const isPlaceholder = item.src.startsWith("placeholder:");

  return (
    <div
      className={`relative w-full overflow-hidden ${arch ? "rounded-t-[999px] rounded-b-md" : "rounded-md"} ${className}`}
      style={{
        aspectRatio: `${item.width} / ${item.height}`,
        background: isPlaceholder ? toneFor(item.id) : "#E6E0D6",
      }}
      role={isPlaceholder ? "img" : undefined}
      aria-label={isPlaceholder ? item.alt : undefined}
    >
      {!isPlaceholder && item.kind === "photo" && (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={sizes}
          style={{ objectFit: "cover" }}
        />
      )}

      {!isPlaceholder && item.kind === "video" && (
        <video
          src={item.src}
          className="absolute inset-0 w-full h-full object-cover"
          controls
          muted
          playsInline
          preload="metadata"
          aria-label={item.alt}
        />
      )}

      {isPlaceholder && item.kind === "video" && (
        <span className="absolute bottom-3 left-3 text-[11px] tracking-wide text-paper/90 bg-umber/50 backdrop-blur-sm px-2 py-1 rounded-sm pointer-events-none">
          video
        </span>
      )}
    </div>
  );
}
