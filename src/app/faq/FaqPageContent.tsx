"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, ArrowRight, HelpCircle, Search } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const DEFAULT_FAQS = [
  {
    question: "How does EventPartner work?",
    answer: "Simply submit your event requirements through our request form. Within 24 hours, our team will provide you with a curated selection of at least 3 venue options, complete with pricing, availability, and our personal recommendations — all tailored to your specific needs."
  },
  {
    question: "Which countries do you cover?",
    answer: "We operate across 36 European countries with a network of 2,400+ venue partners. From Scandinavia to the Mediterranean, we can source the perfect venue for your event anywhere in Europe."
  },
  {
    question: "Is there a cost to use EventPartner's service?",
    answer: "Our venue sourcing and proposal service is completely free for event planners. We earn our commission from the venue side, which means you get expert guidance and multiple options at no additional cost."
  },
  {
    question: "How quickly can I get venue proposals?",
    answer: "We guarantee a response within 24 hours. For urgent requests, we often deliver proposals within a few hours. Our team understands that event planning is time-sensitive, and we prioritize speed without sacrificing quality."
  },
  {
    question: "What types of events do you handle?",
    answer: "We handle everything from intimate board dinners (10 guests) to large-scale corporate conferences (5,000+ attendees). Our expertise covers conferences, team-building events, product launches, galas, incentive trips, and more."
  },
  {
    question: "Can I visit venues before booking?",
    answer: "Absolutely. We arrange site visits and virtual tours for shortlisted venues. Our local contacts can facilitate walkthroughs, and we provide detailed photo galleries and 360° views to help you make an informed decision."
  },
  {
    question: "What is the VIP Programme?",
    answer: "Our VIP Programme offers priority service, exclusive pricing, dedicated account management, and access to premium venues not available through standard channels. It's designed for companies that host frequent events and want a long-term partnership."
  },
  {
    question: "How do I become a VIP member?",
    answer: "VIP membership is available by invitation or application. Visit our VIP page to learn more about the tiers and benefits, or contact our team directly to discuss your event volume and needs."
  },
];

interface FaqCMS {
  heroLabel?: string;
  heroLabelRight?: string;
  heroHeadline?: string;
  heroHeadlineAccent?: string;
  heroSubtitle?: string;
  faqs?: { question: string; answer: string }[];
  ctaHeadline?: string;
  ctaDescription?: string;
}

function AccordionItem({ faq, index, isOpen, onToggle }: { faq: { question: string; answer: string }; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.05 * index, ease: EASE }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 p-6 md:p-8 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl hover:border-[#6AD8D2]/20 transition-all duration-300 text-left group"
      >
        <div className="flex items-start gap-4 min-w-0">
          <span className="font-mono text-[10px] text-[#6AD8D2] mt-1.5 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-[17px] md:text-lg font-medium text-[var(--text-primary)] leading-snug">
            {faq.question}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="shrink-0 w-8 h-8 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center group-hover:border-[#6AD8D2]/30 transition-colors"
        >
          <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 ml-0 md:ml-[52px]">
              <p className="text-[15px] text-[var(--text-secondary)] leading-[1.8]">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqPageContent({ cms }: { cms?: FaqCMS }) {
  const faqs = cms?.faqs || DEFAULT_FAQS;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <main className="relative w-full pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid dot-grid-fade-from-right pointer-events-none opacity-50" />

      {/* Hero */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex justify-between items-center mb-10"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
            {cms?.heroLabel || "Frequently Asked Questions"}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
            {cms?.heroLabelRight || "Support"}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase tracking-[-0.02em] text-[var(--text-primary)] leading-[0.88] mb-10"
        >
          {cms?.heroHeadline || "Got"}<br />
          <span className="text-[#6AD8D2]">{cms?.heroHeadlineAccent || "questions?"}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="text-[clamp(1rem,2vw,1.25rem)] text-[var(--text-secondary)] leading-[1.7] max-w-2xl"
        >
          {cms?.heroSubtitle || "Everything you need to know about working with EventPartner. Can't find your answer? Our team is always just a message away."}
        </motion.p>
      </section>

      {/* Search */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="relative max-w-xl"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl pl-12 pr-4 py-4 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#6AD8D2]/40 transition-colors"
          />
        </motion.div>
      </section>

      {/* FAQ Accordion */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <HelpCircle className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4 opacity-40" />
              <p className="text-[var(--text-secondary)] text-lg">No matching questions found.</p>
              <p className="text-[var(--text-muted)] text-sm mt-1">Try a different search or contact our team directly.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <a
            href="/help"
            className="group flex items-center justify-between p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[#6AD8D2]/30 transition-all duration-300"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#6AD8D2]/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-[#6AD8D2]" />
              </div>
              <div>
                <p className="text-lg font-display font-medium text-[var(--text-primary)] mb-0.5">
                  Contact Support
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Reach out to our team for personalized help.
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center group-hover:bg-[#6AD8D2] group-hover:text-black text-[var(--text-muted)] transition-all duration-300 shrink-0 ml-4">
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>
          <a
            href="/vip"
            className="group flex items-center justify-between p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[#7851A9]/30 transition-all duration-300"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#7851A9]/10 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5 text-[#7851A9]" />
              </div>
              <div>
                <p className="text-lg font-display font-medium text-[var(--text-primary)] mb-0.5">
                  VIP Programme
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Priority support with dedicated account management.
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center group-hover:bg-[#7851A9] group-hover:text-white text-[var(--text-muted)] transition-all duration-300 shrink-0 ml-4">
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.a
          href="/#request"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="group flex items-center justify-between p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[#6AD8D2]/30 transition-all duration-300"
        >
          <div>
            <p className="text-xl md:text-2xl font-display font-medium text-[var(--text-primary)] mb-2">
              {cms?.ctaHeadline || "Still have questions?"}
            </p>
            <p className="text-[var(--text-secondary)] text-sm">
              {cms?.ctaDescription || "Send us your inquiry and we'll get back to you within 24 hours."}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#6AD8D2]/10 border border-[#6AD8D2]/20 flex items-center justify-center group-hover:bg-[#6AD8D2] group-hover:text-black text-[#6AD8D2] transition-all duration-300 shrink-0 ml-6">
            <ArrowRight className="w-5 h-5" />
          </div>
        </motion.a>
      </section>
    </main>
  );
}
