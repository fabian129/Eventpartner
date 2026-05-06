"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface NewsletterCMS {
  headline?: string;
  description?: string;
  placeholder?: string;
  button?: string;
}

export function NewsletterInline({ cms }: { cms?: NewsletterCMS }) {
  return (
    <section className="w-full py-20 md:py-28 px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="max-w-[800px] mx-auto"
      >
        {/* Card */}
        <div
          className="relative rounded-3xl px-8 py-14 md:px-16 md:py-20 text-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a1028 0%, #12101c 50%, #0e0c18 100%)",
          }}
        >
          {/* Label */}
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25 mb-5">
            Newsletter
          </p>

          {/* Headline */}
          <h2 className="font-display text-2xl md:text-3xl font-medium text-white tracking-tight mb-3">
            {cms?.headline || "Stay in the loop"}
          </h2>

          <p className="text-[14px] text-white/35 leading-relaxed max-w-[380px] mx-auto mb-10">
            {cms?.description || "Event insights, new venues, and exclusive opportunities — delivered monthly."}
          </p>

          {/* Form */}
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-[420px] mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder={cms?.placeholder || "Your work email"}
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[14px] text-white placeholder:text-white/25 focus:outline-none focus:border-white/20 transition-colors"
            />
            <button
              type="submit"
              className="group px-6 py-3.5 rounded-xl bg-white text-[#111] text-[13px] font-semibold hover:bg-white/90 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {cms?.button || "Subscribe"}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
