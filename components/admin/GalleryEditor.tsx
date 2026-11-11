"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Gallery, MediaItem } from "@/lib/types";
import PlaceholderMedia from "@/components/PlaceholderMedia";

export default function GalleryEditor({ initialGallery }: { initialGallery: Gallery }) {
  const [gallery, setGallery] = useState(initialGallery);
  const [meta, setMeta] = useState({
    title: initialGallery.title,
    location: initialGallery.location || "",
    year: initialGallery.year || "",
    description: initialGallery.description,
  });
  const [metaStatus, setMetaStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function saveMeta() {
    setMetaStatus("saving");
    const res = await fetch(`/api/admin/galleries/${gallery.slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meta),
    });
    if (res.ok) {
      const { gallery: updated } = await res.json();
      setGallery(updated);
      setMetaStatus("saved");
      setTimeout(() => setMetaStatus("idle"), 1500);
    } else {
      setMetaStatus("idle");
      alert("Couldn't save folder details.");
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadError("");

    const form = new FormData();
    Array.from(files).forEach((f) => form.append("files", f));

    const res = await fetch(`/api/admin/galleries/${gallery.slug}/items`, {
      method: "POST",
      body: form,
    });

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";

    if (res.ok) {
      const { gallery: updated } = await res.json();
      setGallery(updated);
    } else {
      const { error } = await res.json().catch(() => ({ error: "Upload failed" }));
      setUploadError(error);
    }
  }

  async function updateItem(itemId: string, patch: Partial<Pick<MediaItem, "alt" | "caption">>) {
    const res = await fetch(`/api/admin/galleries/${gallery.slug}/items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (res.ok) {
      const { gallery: updated } = await res.json();
      setGallery(updated);
    }
  }

  async function setCover(itemId: string) {
    const res = await fetch(`/api/admin/galleries/${gallery.slug}/items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ setCover: true }),
    });
    if (res.ok) {
      const { gallery: updated } = await res.json();
      setGallery(updated);
    }
  }

  async function deleteItem(itemId: string) {
    if (!confirm("Delete this photo/video? This can't be undone.")) return;
    const res = await fetch(`/api/admin/galleries/${gallery.slug}/items/${itemId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const { gallery: updated } = await res.json();
      setGallery(updated);
    } else {
      alert("Couldn't delete that item.");
    }
  }

  return (
    <div>
      <Link href="/admin" className="text-sm text-blue-600 hover:underline">
        ← All folders
      </Link>

      <h1 className="text-xl font-semibold mt-3 mb-6">{gallery.title}</h1>

      {/* Folder details */}
      <section className="border border-[#ddd] rounded p-4 bg-white mb-8 max-w-xl">
        <h2 className="text-sm font-semibold mb-3">Folder details</h2>
        <div className="flex flex-col gap-3">
          <label className="text-xs text-[#666]">
            Title
            <input
              value={meta.title}
              onChange={(e) => setMeta((m) => ({ ...m, title: e.target.value }))}
              className="border border-[#ccc] px-2 py-1.5 text-sm rounded w-full mt-1"
            />
          </label>
          <label className="text-xs text-[#666]">
            Location
            <input
              value={meta.location}
              onChange={(e) => setMeta((m) => ({ ...m, location: e.target.value }))}
              className="border border-[#ccc] px-2 py-1.5 text-sm rounded w-full mt-1"
            />
          </label>
          <label className="text-xs text-[#666]">
            Year
            <input
              value={meta.year}
              onChange={(e) => setMeta((m) => ({ ...m, year: e.target.value }))}
              className="border border-[#ccc] px-2 py-1.5 text-sm rounded w-full mt-1"
            />
          </label>
          <label className="text-xs text-[#666]">
            Description
            <textarea
              value={meta.description}
              onChange={(e) => setMeta((m) => ({ ...m, description: e.target.value }))}
              rows={3}
              className="border border-[#ccc] px-2 py-1.5 text-sm rounded w-full mt-1"
            />
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={saveMeta}
              disabled={metaStatus === "saving"}
              className="bg-[#222] text-white text-sm px-4 py-1.5 rounded disabled:opacity-50 w-fit"
            >
              {metaStatus === "saving" ? "Saving…" : "Save details"}
            </button>
            {metaStatus === "saved" && <span className="text-xs text-green-700">Saved</span>}
          </div>
        </div>
      </section>

      {/* Upload */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold mb-2">Add photos or videos</h2>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleUpload}
          disabled={uploading}
          className="text-sm"
        />
        {uploading && <p className="text-xs text-[#666] mt-2">Uploading…</p>}
        {uploadError && <p className="text-xs text-red-600 mt-2">{uploadError}</p>}
      </section>

      {/* Items */}
      <section>
        <h2 className="text-sm font-semibold mb-3">{gallery.items.length} items</h2>
        <div className="flex flex-col gap-3">
          {gallery.items.map((item) => (
            <div
              key={item.id}
              className="border border-[#ddd] rounded p-3 bg-white flex gap-4 items-start"
            >
              <div className="w-20 shrink-0">
                <PlaceholderMedia item={item} sizes="80px" />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <label className="text-xs text-[#666]">
                  Alt text (what's in the photo — used for accessibility)
                  <input
                    defaultValue={item.alt}
                    onBlur={(e) => {
                      if (e.target.value !== item.alt) updateItem(item.id, { alt: e.target.value });
                    }}
                    className="border border-[#ccc] px-2 py-1 text-sm rounded w-full mt-0.5"
                  />
                </label>
                <label className="text-xs text-[#666]">
                  Caption (optional, shown in the lightbox)
                  <input
                    defaultValue={item.caption || ""}
                    onBlur={(e) => {
                      if (e.target.value !== (item.caption || ""))
                        updateItem(item.id, { caption: e.target.value });
                    }}
                    className="border border-[#ccc] px-2 py-1 text-sm rounded w-full mt-0.5"
                  />
                </label>
                <div className="flex gap-4 text-xs">
                  {gallery.cover.id === item.id ? (
                    <span className="text-[#888]">Cover photo</span>
                  ) : (
                    <button onClick={() => setCover(item.id)} className="text-blue-600 hover:underline">
                      Set as cover
                    </button>
                  )}
                  <button onClick={() => deleteItem(item.id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {gallery.items.length === 0 && (
            <p className="text-sm text-[#888]">Nothing uploaded to this folder yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
