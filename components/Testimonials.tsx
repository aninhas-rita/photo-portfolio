"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/lib/testimonials";
import PlaceholderMedia from "./PlaceholderMedia";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  function go(delta: number) {
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);
  }

  return (
    <section className="max-w-content mx-auto px-5 sm:px-8 lg:px-12 mt-24 sm:mt-32 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-center">
        <PlaceholderMedia
          item={{
            id: "testimonial-portrait",
            kind: "photo",
            src: "placeholder:testimonial",
            width: 1000,
            height: 1250,
            alt: "Portrait of Marwa Hassan",
          }}
          className="w-full max-w-xs mx-auto lg:mx-0"
          arch
        />

        <div className="text-center lg:text-left">
          <h2 className="font-display text-fluid-h2 text-ink mb-8">Testimonials</h2>

          <div className="min-h-[9rem] sm:min-h-[7rem] flex items-center justify-center lg:justify-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="max-w-[56ch]"
              >
                <p className="font-script text-2xl sm:text-3xl text-taupe leading-snug">
                  "{current.quote}"
                </p>
                <p className="font-sans text-sm text-ink/70 mt-4 tracking-wide">
                  — {current.name.toUpperCase()}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-6 mt-8">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="text-ink/50 hover:text-taupe text-2xl transition-colors"
            >
              ‹
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial from ${t.name}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === index ? "bg-taupe" : "bg-hairline"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="text-ink/50 hover:text-taupe text-2xl transition-colors"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
