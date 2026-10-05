"use client";

/**
 * On-site meeting booking (Cal.com popup) — the visitor never leaves the site.
 *
 *  - openBookingPicker()        → our modal "Vem vill du prata med?" with the
 *                                 team members that have a calLink, then
 *                                 that person's Cal.com calendar as a popup.
 *  - openCalBooking(calLink)    → straight to one person's Cal.com popup.
 *
 * <BookingModal /> is mounted once in the locale layout.
 * Cal.com is loaded with its official vanilla embed snippet (no npm package).
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useLocale } from "next-intl";
import { useTheme } from "@/components/utils/ThemeProvider";
import { TEAM_MEMBERS } from "@/lib/teamMembers";

const EASE = [0.16, 1, 0.3, 1] as const;
const OPEN_EVENT = "ep:open-booking-picker";

export const BOOKING_HOSTS = TEAM_MEMBERS.filter((m) => m.calLink);

const COPY = {
  sv: {
    label: "Direktkontakt",
    title: "Vem vill du prata med?",
    description: "Välj en av oss och boka ett 15-minuterssamtal direkt i kalendern.",
    pick: "Välj tid",
    close: "Stäng",
  },
  en: {
    label: "Direct contact",
    title: "Who would you like to talk to?",
    description: "Pick one of us and book a 15-min call straight in the calendar.",
    pick: "Pick a time",
    close: "Close",
  },
} as const;

/* ---------- Cal.com embed (vanilla snippet) ---------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CalFn = ((...args: any[]) => void) & { loaded?: boolean; ns?: Record<string, unknown>; q?: unknown[] };

function getCal(): CalFn | null {
  if (typeof window === "undefined") return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (!w.Cal) {
    (function (C: any, A: string, L: string) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const p = function (a: any, ar: any) { a.q.push(ar); };
      const d = C.document;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      C.Cal = C.Cal || function (...ar: any[]) {
        const cal = C.Cal;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const api: any = function (...a: any[]) { p(api, a); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(w, "https://app.cal.com/embed/embed.js", "init");
    w.Cal("init", { origin: "https://cal.com" });
    w.Cal("ui", {
      styles: { branding: { brandColor: "#7851A9" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }
  return w.Cal as CalFn;
}

function currentTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function openCalBooking(calLink: string) {
  const cal = getCal();
  if (!cal) return;
  cal("modal", {
    calLink,
    config: { layout: "month_view", theme: currentTheme() },
  });
}

export function openBookingPicker() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/* ---------- Picker modal ---------- */

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = COPY[locale === "sv" ? "sv" : "en"];
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onOpen = () => {
      getCal(); // start loading the Cal.com script while the visitor picks
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (calLink: string) => {
    setOpen(false);
    openCalBooking(calLink);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="booking-picker"
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={t.title}
          data-lenis-prevent
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative w-full max-w-[720px] max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-default)] p-6 md:p-10"
            style={{ boxShadow: isDark ? "0 30px 80px rgba(0,0,0,0.5)" : "0 30px 80px rgba(0,0,0,0.18)" }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-purple mb-2">{t.label}</p>
            <h2 className="font-display text-2xl md:text-3xl font-medium text-[var(--text-primary)]">{t.title}</h2>
            <p className="text-[14px] text-[var(--text-muted)] mt-2 leading-relaxed">{t.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {BOOKING_HOSTS.map((host, i) => (
                <motion.button
                  key={host.name}
                  type="button"
                  onClick={() => pick(host.calLink as string)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 * i + 0.1, ease: EASE }}
                  className="group text-left rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-3 hover:border-purple/40 transition-colors duration-300 flex sm:block items-center gap-4"
                >
                  <div className="relative w-20 h-20 sm:w-full sm:h-auto sm:aspect-[4/5] shrink-0 rounded-xl overflow-hidden bg-[#1a1a1a]">
                    <Image
                      src={host.image}
                      alt={host.name}
                      fill
                      sizes="(max-width: 640px) 80px, 220px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="sm:pt-4 sm:px-1 sm:pb-1">
                    <p className="font-display text-[16px] font-medium text-[var(--text-primary)] leading-tight">{host.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--text-muted)] mt-1">{host.role}</p>
                    <span className="inline-flex items-center gap-1.5 mt-3 text-[12px] font-medium text-purple">
                      {t.pick}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
