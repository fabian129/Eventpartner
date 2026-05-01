import { sanityFetch } from "@/../sanity/lib/live";
import { AI_ASSISTANT_PAGE_QUERY } from "@/../sanity/lib/queries";
import { localize } from "@/../sanity/lib/locale";

export default async function AiAssistantPage() {
  const { data } = await sanityFetch({ query: AI_ASSISTANT_PAGE_QUERY });
  const t = (field: { en?: string; sv?: string } | undefined | null) => localize(field);

  const headline = t(data?.headline) || "AI Assistant";
  const description = t(data?.description) || "Our intelligent assistant is here to help.";
  const botTitle = t(data?.botTitle) || "Chat with EP Bot";
  const botDescription = t(data?.botDescription) || "The assistant is currently offline. Check back soon.";

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[var(--bg-primary)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-display font-semibold text-[var(--text-primary)] mb-6">
            {headline}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] whitespace-pre-line">
            {description}
          </p>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-3xl p-8 lg:p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-[#6AD8D2]/10 text-[#6AD8D2] rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-display font-semibold text-[var(--text-primary)] mb-2">{botTitle}</h2>
          <p className="text-[var(--text-secondary)] max-w-sm whitespace-pre-line">{botDescription}</p>
        </div>

      </div>
    </main>
  );
}
