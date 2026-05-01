"use client";

import { useState, useEffect } from "react";
import { sanityFetch } from "@/../sanity/lib/live";
import { WEBSHOP_PAGE_QUERY } from "@/../sanity/lib/queries";
import { localize } from "@/../sanity/lib/locale";

export default function ShopPage() {
  const [submitted, setSubmitted] = useState(false);
  const [cms, setCms] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await sanityFetch({ query: WEBSHOP_PAGE_QUERY });
        setCms(data);
      } catch (err) {
        console.error("Failed to fetch webshop page data:", err);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const t = (field: { en?: string; sv?: string } | undefined | null) => localize(field);

  const headline = t(cms?.headline) || "Merchandise & Video Brochures";
  const description = t(cms?.description) || "Explore our curated selection of event merchandise and request a quote for our premium Video Plus Print brochures.";
  const merchTitle = t(cms?.merchTitle) || "Standard Merchandise";
  const merchPendingMessage = t(cms?.merchPendingMessage) || "Our standard merchandise catalog powered by Printify will be available here soon.";
  const quoteTitle = t(cms?.quoteTitle) || "Video Plus Print Quote";
  const quoteButton = t(cms?.quoteButton) || "Request Quote";

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[var(--bg-primary)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-semibold text-[var(--text-primary)] mb-6">
            {headline}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] whitespace-pre-line">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Printify Merch Section (Placeholder for Shopify Storefront API) */}
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-display font-semibold text-[var(--text-primary)] mb-6">{merchTitle}</h2>
            <div className="flex-1 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-3xl p-8 flex flex-col items-center justify-center text-center">
               <div className="w-16 h-16 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-full flex items-center justify-center mb-6">
                 <svg className="w-8 h-8 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                 </svg>
               </div>
               <h3 className="text-xl font-display font-semibold text-[var(--text-primary)] mb-2">Shopify Integration Pending</h3>
               <p className="text-[var(--text-secondary)] max-w-sm whitespace-pre-line">
                 {merchPendingMessage}
               </p>
            </div>
          </div>

          {/* VPP Quote Form */}
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-display font-semibold text-[var(--text-primary)] mb-6">{quoteTitle}</h2>
            <div className="flex-1 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-3xl p-8 lg:p-10">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-[#6AD8D2]/10 text-[#6AD8D2] rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-[var(--text-primary)] mb-2">Quote Request Sent</h3>
                  <p className="text-[var(--text-secondary)]">We will get back to you with a custom Video Plus Print quote within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">First Name</label>
                      <input type="text" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[#6AD8D2] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Last Name</label>
                      <input type="text" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[#6AD8D2] transition-colors" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email Address</label>
                    <input type="email" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[#6AD8D2] transition-colors" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Company</label>
                    <input type="text" required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[#6AD8D2] transition-colors" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Estimated Quantity</label>
                    <select required className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[#6AD8D2] transition-colors">
                      <option value="">Select quantity...</option>
                      <option value="50-100">50 - 100 units</option>
                      <option value="100-500">100 - 500 units</option>
                      <option value="500-1000">500 - 1000 units</option>
                      <option value="1000+">1000+ units</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Additional Details</label>
                    <textarea rows={3} className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[#6AD8D2] transition-colors resize-none" placeholder="Tell us about your event and requirements..."></textarea>
                  </div>

                  <button type="submit" className="w-full bg-[#111] border border-[#333] text-white font-medium rounded-xl py-4 hover:bg-[#222] hover:border-[#444] transition-all">
                    {quoteButton}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
