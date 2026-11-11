"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const leftLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

const rightLinks = [
  { href: "/gallery", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-lace/95 backdrop-blur-sm border-b border-hairline">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between sm:justify-center sm:gap-10">
        <nav className="hidden sm:flex items-center gap-8 font-sans text-sm tracking-wide text-ink">
          {leftLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-taupe transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="font-display text-2xl sm:text-3xl tracking-wide text-ink whitespace-nowrap"
          onClick={() => setOpen(false)}
        >
          Marwa Hassan
        </Link>

        <nav className="hidden sm:flex items-center gap-8 font-sans text-sm tracking-wide text-ink">
          {rightLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-taupe transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="sm:hidden flex flex-col gap-1.5 w-7 h-7 justify-center items-end"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0, width: 24 }}
            className="h-px bg-ink block"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1, width: 24 }}
            className="h-px bg-ink block"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0, width: 24 }}
            className="h-px bg-ink block"
          />
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="sm:hidden overflow-hidden border-b border-hairline"
          >
            <div className="flex flex-col px-5 py-4 gap-4 font-sans text-base">
              {[...leftLinks, ...rightLinks].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-ink hover:text-taupe transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
