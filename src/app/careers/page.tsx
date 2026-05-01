"use client";

import { useState, useEffect } from "react";
import { client } from "@/../sanity/lib/client";
import { CAREERS_PAGE_QUERY } from "@/../sanity/lib/queries";
import { localize } from "@/../sanity/lib/locale";

export default function CareersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [cms, setCms] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await client.fetch(CAREERS_PAGE_QUERY);
        setCms(data);
      } catch (err) {
        console.error("Failed to fetch careers page data:", err);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const t = (field: { en?: string; sv?: string } | undefined | null) => localize(field);

  const headline = t(cms?.headline) || "Join the team";
  const description = t(cms?.description) || "We are always looking for passionate people to join us on our mission to revolutionize event experiences globally. Send us your application.";
  const openAppTitle = t(cms?.openApplicationTitle) || "Open Application";
  const openAppDesc = t(cms?.openApplicationDesc) || "Can't find a role that fits? Send us an open application and we'll keep you in mind for future openings.";

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[var(--bg-primary)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <div>
          <h1 className="text-4xl md:text-6xl font-display font-semibold text-[var(--text-primary)] mb-6">
            {headline}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] mb-8 whitespace-pre-line">
            {description}
          </p>
          <div className="space-y-6">
            <div className="p-6 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl">
              <h3 className="text-lg font-display font-semibold text-[var(--text-primary)]">{openAppTitle}</h3>
              <p className="text-[var(--text-secondary)] mt-2">{openAppDesc}</p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-3xl p-8 lg:p-12">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-[#6AD8D2]/10 text-[#6AD8D2] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-display font-semibold text-[var(--text-primary)] mb-2">Application Received</h2>
              <p className="text-[var(--text-secondary)]">Thank you for your interest. We will be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[#6AD8D2] transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[#6AD8D2] transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">LinkedIn Profile URL</label>
                <input 
                  type="url" 
                  required
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[#6AD8D2] transition-colors"
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Cover Letter / Message</label>
                <textarea 
                  rows={4}
                  required
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[#6AD8D2] transition-colors resize-none"
                  placeholder="Tell us why you'd be a great fit..."
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#111] border border-[#333] text-white font-medium rounded-xl py-4 hover:bg-[#222] hover:border-[#444] transition-all"
              >
                Submit Application
              </button>
            </form>
          )}
        </div>

      </div>
    </main>
  );
}
