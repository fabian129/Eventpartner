"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

/**
 * NewsletterSection — Clean, light email signup
 *
 * Minimal, editorial-style section. No ambient glows, no blobs.
 * Clean typography, a single form, and a soft tinted background
 * that transitions naturally toward the dark footer below.
 */

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="relative w-full py-28 md:py-36 bg-[#F4F4F4] overflow-hidden">
      {/* Dot grid — left edge with fade */}
      <div className="absolute top-[15%] left-0 w-[28%] h-[70%] dot-grid dot-grid-fade-from-left pointer-events-none" />

      {/* Vertical accent lines — framing the content */}
      <div className="hidden md:block absolute top-[15%] bottom-[15%] left-[calc(50%-320px)] accent-line-v opacity-20" />
      <div className="hidden md:block absolute top-[15%] bottom-[15%] right-[calc(50%-320px)] accent-line-v opacity-20" />

      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[1px] bg-[#111]/10" />

      <div className="relative max-w-[540px] mx-auto px-6 md:px-10 text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#81D8D0]">
            Nyhetsbrev
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[#111] leading-[1.1] mt-4 mb-3">
            Håll er uppdaterade.
          </h2>
          <p className="text-[15px] text-[#777] leading-relaxed mb-10">
            Nya venues, event-trender och exklusiva erbjudanden — en gång i månaden, direkt i inkorgen.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="er@företag.se"
                  required
                  className={`flex-1 px-5 py-3.5 rounded-xl border bg-white text-sm text-[#111] placeholder:text-[#bbb] focus:outline-none transition-all duration-300 ${
                    focused
                      ? "border-[#81D8D0] ring-1 ring-[#81D8D0]/20"
                      : "border-[#e0e0e0]"
                  }`}
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#111] text-white text-sm font-medium hover:bg-[#81D8D0] hover:text-[#0a0a0a] transition-all duration-300 shrink-0"
                >
                  Prenumerera
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-[#81D8D0]/10 border border-[#81D8D0]/20"
              >
                <CheckCircle className="w-5 h-5 text-[#81D8D0]" />
                <span className="text-sm font-medium text-[#111]">
                  Tack! Ni hör av oss snart.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-4 text-[11px] text-[#bbb] tracking-[0.2em]">
            EVENTPARTNER
          </p>
        </motion.div>
      </div>
    </section>
  );
}
