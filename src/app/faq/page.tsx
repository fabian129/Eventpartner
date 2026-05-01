import { sanityFetch } from "@/../sanity/lib/live";
import { FAQ_PAGE_QUERY } from "@/../sanity/lib/queries";
import { localize } from "@/../sanity/lib/locale";

export default async function FaqPage() {
  const { data } = await sanityFetch({ query: FAQ_PAGE_QUERY });
  const t = (field: { en?: string; sv?: string } | undefined | null) => localize(field);

  const headline = t(data?.headline) || "FAQ";
  const description = t(data?.description) || "Frequently Asked Questions.";
  const faqs = data?.faqs || [];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[var(--bg-primary)]">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-semibold text-[var(--text-primary)] mb-6">
            {headline}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] whitespace-pre-line">
            {description}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.length > 0 ? (
            faqs.map((faq: any, i: number) => (
              <div key={i} className="p-6 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl">
                <h3 className="text-xl font-display font-semibold text-[var(--text-primary)] mb-2">
                  {t(faq.question)}
                </h3>
                <p className="text-[var(--text-secondary)] whitespace-pre-line">
                  {t(faq.answer)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-[var(--text-secondary)]">Content coming soon...</p>
          )}
        </div>
      </div>
    </main>
  );
}
