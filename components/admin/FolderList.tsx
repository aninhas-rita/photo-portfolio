"use client";

import { useState } from "react";
import Link from "next/link";
import type { Gallery } from "@/lib/types";

export default function FolderList({ initialGalleries }: { initialGalleries: Gallery[] }) {
  const [galleries, setGalleries] = useState(initialGalleries);
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  async function createFolder(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setCreating(true);
    setError("");

    const res = await fetch("/api/admin/galleries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle.trim() }),
    });

    setCreating(false);

    if (res.ok) {
      const { gallery } = await res.json();
      setGalleries((prev) => [...prev, gallery]);
      setNewTitle("");
    } else {
      const { error } = await res.json().catch(() => ({ error: "Something went wrong" }));
      setError(error);
    }
  }

  async function deleteFolder(slug: string) {
    if (!confirm(`Delete this folder and everything in it? This can't be undone.`)) return;

    const res = await fetch(`/api/admin/galleries/${slug}`, { method: "DELETE" });
    if (res.ok) {
      setGalleries((prev) => prev.filter((g) => g.slug !== slug));
    } else {
      alert("Couldn't delete that folder.");
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-1">Folders</h1>
      <p className="text-sm text-[#666] mb-6">
        Each folder shows up as a gallery on the site. Open one to upload or edit photos and
        videos.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {galleries.map((g) => (
          <div key={g.slug} className="border border-[#ddd] rounded p-4 bg-white">
            <Link href={`/admin/${g.slug}`} className="block">
              <div className="flex items-center gap-2 mb-2">
                <span aria-hidden>📁</span>
                <span className="font-medium">{g.title}</span>
              </div>
              <p className="text-xs text-[#888]">{g.items.length} items</p>
            </Link>
            <div className="flex gap-3 mt-3 text-xs">
              <Link href={`/admin/${g.slug}`} className="text-blue-600 hover:underline">
                Open
              </Link>
              <button onClick={() => deleteFolder(g.slug)} className="text-red-600 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}

        {galleries.length === 0 && (
          <p className="text-sm text-[#888] col-span-full">No folders yet — create one below.</p>
        )}
      </div>

      <form onSubmit={createFolder} className="flex gap-2 items-start max-w-md">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New folder name, e.g. Spring Weddings"
          className="border border-[#ccc] px-3 py-2 text-sm rounded flex-1"
        />
        <button
          type="submit"
          disabled={creating}
          className="bg-[#222] text-white text-sm px-4 py-2 rounded disabled:opacity-50"
        >
          {creating ? "Creating…" : "+ New folder"}
        </button>
      </form>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  );
}
