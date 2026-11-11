"use client";

import { motion } from "framer-motion";
import OrnamentLeaf from "./OrnamentLeaf";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden flex items-center justify-center text-center px-5"
      style={{
        minHeight: "min(92vh, 780px)",
        background:
          "radial-gradient(circle at 30% 20%, #F6F0E4, #E8DCC8 55%, #D9C4A8 100%)",
      }}
    >
      <OrnamentLeaf className="absolute -left-6 -top-6 w-40 h-40 sm:w-56 sm:h-56 text-taupe/25" />
      <OrnamentLeaf className="absolute -right-6 -bottom-6 w-40 h-40 sm:w-56 sm:h-56 text-taupe/25 rotate-180" />

      <motion.div variants={container} initial="hidden" animate="show" className="relative max-w-2xl">
        <motion.p variants={rise} className="font-sans text-xs sm:text-sm tracking-[0.3em] text-umber/70 mb-6">
          MARWA HASSAN
        </motion.p>
        <motion.h1
          variants={rise}
          className="font-display tracking-wide text-ink"
          style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", lineHeight: 1 }}
        >
          Light, Held Still
        </motion.h1>
        <motion.p variants={rise} className="font-sans text-ink/75 text-base sm:text-lg mt-6 max-w-md mx-auto">
          Travel and landscape photography — candid, unhurried, built around the
          hours just after sunrise.
        </motion.p>
        <motion.div variants={rise} className="mt-9">
          <a
            href="/gallery"
            className="inline-block border border-umber/60 text-umber text-xs sm:text-sm tracking-[0.2em] px-7 py-3 hover:bg-umber hover:text-paper transition-colors"
          >
            VIEW PORTFOLIO
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
