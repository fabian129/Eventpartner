"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { useLocale } from 'next-intl';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * EnterpriseSection — Stripe-style enterprise CTA.
 *
 * Structure:
 * 1. Top: Headline left + description right
 * 2. Middle: Client testimonial bar (logo + quote)
 * 3. Bottom: Fullbleed image
 * 4. Stats bar at very bottom
 */

const STATS = [
  { value: 175, suffix: "", labelEn: "countries", labelSv: "länder" },
  { value: 340000, suffix: "+", labelEn: "venues globally", labelSv: "venues globalt" },
  { value: 23, suffix: "h", labelEn: "avg. response", labelSv: "snitt-svar" },
];

export function EnterpriseSection() {
  const sv = useLocale() === 'sv';
  return (
    <section className="relative w-full bg-[var(--bg-primary)] overflow-hidden">
      {/* Top: Headline + description */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="md:max-w-[50%]"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.8rem] font-medium tracking-tight text-[var(--text-primary)] leading-[1.15]">
              {sv ? (
                <>Eventleverans i<br /><span className="italic font-light text-purple">världsklass.</span></>
              ) : (
                <>World-class<br /><span className="italic font-light text-purple">event delivery.</span></>
              )}
            </h2>
            <div className="mt-6">
              <Link
                href="#request"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-tiffany hover:bg-[#74CCC4] text-[#0A0A0A] font-semibold text-[14px] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(129,216,208,0.2)]"
              >
                {sv ? "Boka Event" : "Book Event"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="text-[15px] text-[var(--text-muted)] leading-relaxed md:max-w-[380px]"
          >
            {sv ? "Ledande företag använder EventPartner för att leverera konferenser, kickoffs och galor — från lokalsökning till genomförande i 175 länder." : "Leading companies use EventPartner to deliver conferences, kick-offs and galas — from venue sourcing to execution in 175 countries."}
          </motion.p>
        </div>
      </div>

      {/* Middle: Client testimonial bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
        className="max-w-[1200px] mx-auto px-6 md:px-10 pb-6"
      >
        <div className="flex items-center justify-between py-4 px-6 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-[var(--text-primary)] flex items-center justify-center">
              <span className="text-[var(--bg-primary)] font-bold text-[13px]">E</span>
            </div>
            <p className="text-[14px] text-[var(--text-primary)] font-medium">
              {sv ? "Ericsson levererar konferenser med EventPartner." : "Ericsson delivers conferences with EventPartner."}
            </p>
          </div>
          <Link
            href="#"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-default)] text-[13px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-dim)] transition-all duration-300"
          >
            {sv ? "Läs berättelsen" : "Read the story"}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>

      {/* Bottom: Fullbleed image */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        className="relative w-full h-[45vh] md:h-[55vh] min-h-[300px]"
      >
        <Image
          src="/Images/venue-dark-modern.webp"
          alt="Conference presentation"
          fill
          className="object-cover grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-[1]" />
      </motion.div>

      {/* Stats bar */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-6 md:py-8">
        <div className="flex items-center justify-start gap-12 md:gap-20">
          {STATS.map((stat) => (
            <div key={stat.labelEn} className="flex items-baseline gap-1.5">
              <span className="text-[15px] md:text-[16px] font-display font-semibold text-[var(--text-primary)]">
                <CountUp value={stat.value} suffix={stat.suffix} duration={2} />
              </span>
              <span className="text-[13px] text-[var(--text-muted)]">
                {sv ? stat.labelSv : stat.labelEn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
