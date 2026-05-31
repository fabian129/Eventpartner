"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

interface NewsletterCMS {
  headline?: string;
  description?: string;
  placeholder?: string;
  button?: string;
}

export function NewsletterInline({ cms }: { cms?: NewsletterCMS }) {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch {} finally {
      setLoading(false);
    }
  };

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
            {t('label')}
          </p>

          {/* Headline */}
          <h2 className="font-display text-2xl md:text-3xl font-medium text-white tracking-tight mb-3">
            {cms?.headline || t('headline')}
          </h2>

          <p className="text-[14px] text-white/35 leading-relaxed max-w-[380px] mx-auto mb-10">
            {cms?.description || t('description')}
          </p>

          {/* Form */}
          {subscribed ? (
            <div className="flex items-center justify-center gap-3 text-tiffany">
              <CheckCircle className="w-5 h-5" />
              <span className="text-[14px] font-medium">{t('success')}</span>
            </div>
          ) : (
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-[420px] mx-auto"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={cms?.placeholder || t('placeholder')}
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[14px] text-white placeholder:text-white/25 focus:outline-none focus:border-white/20 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="group px-6 py-3.5 rounded-xl bg-white text-[#111] text-[13px] font-semibold hover:bg-white/90 transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-60"
              >
                {loading ? (
                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /> {t('subscribing')}</>
                ) : (
                  <>
                    {cms?.button || t('button')}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
