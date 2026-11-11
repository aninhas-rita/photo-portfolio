import type { Gallery, MediaItem } from "./types";

/**
 * Seed content — written to content/data.json the first time the site
 * runs if that file doesn't exist yet. After that, content/data.json is
 * the source of truth (edited via /admin), and this file is never read
 * again unless that JSON file is deleted.
 */

function item(
  id: string,
  width: number,
  height: number,
  alt: string,
  kind: "photo" | "video" = "photo"
): MediaItem {
  return { id, kind, src: `placeholder:${id}`, width, height, alt };
}

export const seedGalleries: Gallery[] = [
  {
    slug: "alula-desert",
    title: "AlUla, Saudi Arabia",
    location: "AlUla Region",
    year: "2025",
    description:
      "Three weeks following the sandstone and the light that moves across it — dawn departures, long silences, the desert doing most of the talking.",
    cover: item("alula-cover", 1600, 1067, "Sandstone formations at AlUla"),
    items: [
      item("alula-1", 1600, 1067, "Sandstone cliffs under a clear sky"),
      item("alula-2", 1200, 1600, "Footprints along a dune ridge"),
      item("alula-3", 1400, 1050, "A caravan crossing the dunes"),
      item("alula-4", 1200, 1500, "Tea at sunset on a woven rug"),
      item("alula-5", 1300, 1700, "Walking through a slot canyon"),
      item("alula-6", 1600, 1000, "Clouds over open desert"),
    ],
  },
  {
    slug: "kyrgyz-highlands",
    title: "Kyrgyz Highlands",
    location: "Naryn Region",
    year: "2024",
    description:
      "Yurts at the foot of snow-capped ridgelines, and the particular gold the grass turns in late September.",
    cover: item("kyrgyz-cover", 1600, 1000, "Yurts beneath snow-capped mountains"),
    items: [
      item("kyrgyz-1", 1600, 1000, "A horse grazing in the highlands"),
      item("kyrgyz-2", 1200, 1600, "A rider on an open plain"),
      item("kyrgyz-3", 1400, 1867, "Mist rolling over mountain peaks"),
      item("kyrgyz-4", 1600, 1067, "A camp at dusk"),
      item("kyrgyz-video", 1600, 900, "Clip from the Naryn highlands", "video"),
    ],
  },
  {
    slug: "coastal-studies",
    title: "Coastal Studies",
    location: "Various",
    year: "2023–2025",
    description:
      "An ongoing series on the edges where land gives way — tide lines, cliffs, the hour after the light turns.",
    cover: item("coast-cover", 1600, 1067, "A cliff edge above the sea"),
    items: [
      item("coast-1", 1600, 1067, "Waves against a rocky coastline"),
      item("coast-2", 1200, 1600, "A lone figure on a beach"),
      item("coast-3", 1400, 933, "Fog over coastal cliffs"),
      item("coast-4", 1300, 1733, "Tide pools at low tide"),
    ],
  },
];
