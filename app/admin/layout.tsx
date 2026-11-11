import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#222]">
      <header className="border-b border-[#ddd] px-6 py-3 flex items-center justify-between font-sans text-sm">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="font-semibold">
            Admin
          </Link>
          <Link href="/" target="_blank" className="text-[#666] hover:underline">
            View site ↗
          </Link>
        </div>
        <LogoutButton />
      </header>
      <main className="px-6 py-8 max-w-5xl mx-auto font-sans">{children}</main>
    </div>
  );
}
