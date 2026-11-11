import { readGalleries } from "@/lib/content";
import FolderList from "@/components/admin/FolderList";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const galleries = await readGalleries();
  return <FolderList initialGalleries={galleries} />;
}
