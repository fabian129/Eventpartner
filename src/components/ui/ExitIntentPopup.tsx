"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * ExitIntentPopup — Triggered when user moves cursor toward browser close
 * or after scrolling 80% of page without taking action.
 * Collects email + name for lead capture.
 */

interface ExitCMS {
  label?: string;
  headline?: string;
  headlineAccent?: string;
  description?: string;
  button?: string;
  privacy?: string;
}

export function ExitIntentPopup({ cms }: { cms?: ExitCMS }) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (typeof window !== "undefined" && sessionStorage.getItem("ep_popup_dismissed")) {
      setDismissed(true);
      return;
    }

    // Exit intent: mouse leaves viewport at top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) {
        setShow(true);
      }
    };

    // Fallback: show after scrolling 80% of page
    const handleScroll = () => {
      const scrollPercent = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
      if (scrollPercent > 0.8 && !dismissed) {
        setShow(true);
      }
    };

    // Delay listeners so popup doesn't fire immediately
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 10000); // 10s delay before activating

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dismissed]);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("ep_popup_dismissed", "1");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      handleDismiss();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {show && !dismissed && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={handleDismiss}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed z-[101] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[460px]"
          >
            <div className="relative bg-[#0A0A0A] border border-white/[0.08] rounded-2xl p-8 md:p-10 shadow-2xl shadow-black/40">
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.08] transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>

              {submitted ? (
                /* Success state */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6"
                >
                  <div className="w-12 h-12 rounded-full bg-[#6AD8D2]/10 border border-[#6AD8D2]/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-[#6AD8D2] text-xl">✓</span>
                  </div>
                  <h3 className="font-display text-xl font-medium text-white mb-2">Thank you!</h3>
                  <p className="text-[14px] text-white/50">We'll be in touch shortly.</p>
                </motion.div>
              ) : (
                /* Form state */
                <>
                  <div className="mb-6">
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#6AD8D2]/70 block mb-3">
                      {cms?.label || "Before you go"}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-medium text-white tracking-tight leading-tight mb-3">
                      {cms?.headline || "Let us find your"}
                      <br />
                      <span className="italic font-light text-white/50">{cms?.headlineAccent || "perfect venue."}</span>
                    </h3>
                    <p className="text-[14px] text-white/40 leading-relaxed">
                      {cms?.description || "Leave your details and we'll contact you with tailored proposals — within 24 hours."}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-[14px] placeholder:text-white/25 focus:outline-none focus:border-[#6AD8D2]/30 transition-colors duration-200"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-[14px] placeholder:text-white/25 focus:outline-none focus:border-[#6AD8D2]/30 transition-colors duration-200"
                    />
                    <input
                      type="text"
                      name="company"
                      placeholder="Company (optional)"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-[14px] placeholder:text-white/25 focus:outline-none focus:border-[#6AD8D2]/30 transition-colors duration-200"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#6AD8D2] text-[#0A0A0A] font-medium text-[14px] hover:bg-[#5EC4BA] transition-colors duration-200 mt-2"
                    >
                      {cms?.button || "Send inquiry →"}
                    </button>
                  </form>

                  <p className="text-[11px] text-white/20 text-center mt-4">
                    {cms?.privacy || "We never share your information. You can unsubscribe at any time."}
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
