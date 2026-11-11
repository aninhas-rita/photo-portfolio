import { notFound } from "next/navigation";
import { readGallery } from "@/lib/content";
import GalleryEditor from "@/components/admin/GalleryEditor";

export const dynamic = "force-dynamic";

export default async function AdminFolderPage({ params }: { params: { slug: string } }) {
  const gallery = await readGallery(params.slug);
  if (!gallery) notFound();

  return <GalleryEditor initialGallery={gallery} />;
}
