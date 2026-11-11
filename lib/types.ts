export type MediaKind = "photo" | "video";

export interface MediaItem {
  id: string;
  kind: MediaKind;
  src: string;
  /** Natural width/height, used to reserve layout space and avoid reflow. */
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

export interface Gallery {
  slug: string;
  title: string;
  location?: string;
  year?: string;
  description: string;
  cover: MediaItem;
  items: MediaItem[];
}
