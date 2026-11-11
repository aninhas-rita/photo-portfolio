"use client";

import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { MediaItem } from "@/lib/types";
import PlaceholderMedia from "./PlaceholderMedia";

export default function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: MediaItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const open = index !== null;
  const current = open ? items[index!] : null;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!open || index === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + items.length) % items.length);
    },
    [open, index, items.length, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-umber/95 flex items-center justify-center px-4 sm:px-10"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 sm:top-8 sm:right-8 text-paper/80 hover:text-paper text-sm"
          >
            Close
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index! - 1 + items.length) % items.length);
            }}
            aria-label="Previous"
            className="hidden sm:block absolute left-6 text-paper/70 hover:text-paper text-2xl px-2"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index! + 1) % items.length);
            }}
            aria-label="Next"
            className="hidden sm:block absolute right-6 text-paper/70 hover:text-paper text-2xl px-2"
          >
            ›
          </button>

          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <PlaceholderMedia item={current} className="max-h-[80vh] mx-auto" />
            {current.caption && (
              <p className="text-paper/80 text-sm mt-4 text-center">{current.caption}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
