import { sanityFetch } from "@/../sanity/lib/live";
import { HELP_CENTER_PAGE_QUERY } from "@/../sanity/lib/queries";
import { localize } from "@/../sanity/lib/locale";

export default async function HelpCenterPage() {
  const { data } = await sanityFetch({ query: HELP_CENTER_PAGE_QUERY });
  const t = (field: { en?: string; sv?: string } | undefined | null) => localize(field);

  const headline = t(data?.headline) || "Help Center";
  const description = t(data?.description) || "Need assistance? Our support team is here for you.";
  const contactEmail = data?.contactEmail || "support@eventpartner.com";
  const contactPhone = data?.contactPhone || "+46 8 123 456 78";

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

        <div className="space-y-6">
          <div className="p-8 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-3xl">
            <h3 className="text-xl font-display font-semibold text-[var(--text-primary)] mb-4">Contact Support</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[var(--text-secondary)] mb-1">Email</p>
                <a href={`mailto:${contactEmail}`} className="text-lg font-medium text-[var(--text-primary)] hover:text-[#6AD8D2] transition-colors">
                  {contactEmail}
                </a>
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)] mb-1">Phone</p>
                <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="text-lg font-medium text-[var(--text-primary)] hover:text-[#6AD8D2] transition-colors">
                  {contactPhone}
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
