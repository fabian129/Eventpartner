import Image from "next/image";
import { sanityFetch } from "@/../sanity/lib/live";
import { LEADERSHIP_PAGE_QUERY } from "@/../sanity/lib/queries";
import { localize } from "@/../sanity/lib/locale";
import { urlFor } from "@/../sanity/lib/image";

const FALLBACK_TEAM_MEMBERS = [
  {
    name: "Pontus Bredal-Hansen",
    role: "CEO & Co-founder",
    linkedin: "https://linkedin.com/in/pontus",
    image: "/Images/team/pontus.jpg"
  },
  {
    name: "Joakim",
    role: "Co-founder",
    linkedin: "https://linkedin.com/in/joakim",
    image: "/Images/team/joakim.jpg"
  },
  {
    name: "Malin",
    role: "Head of Marketing",
    linkedin: "https://linkedin.com/in/malin",
    image: "/Images/team/malin-farg.jpeg"
  }
];

export default async function LeadershipPage() {
  const { data } = await sanityFetch({ query: LEADERSHIP_PAGE_QUERY });
  const t = (field: { en?: string; sv?: string } | undefined | null) => localize(field);

  const headline = t(data?.headline) || "Leadership";
  const description = t(data?.description) || "Meet the team driving the future of event experiences.";
  
  const teamMembers = data?.teamMembers?.map((m: any) => ({
    name: m.name,
    role: t(m.role),
    linkedin: m.linkedin,
    image: m.image ? urlFor(m.image).url() : null
  })) || FALLBACK_TEAM_MEMBERS;

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[var(--bg-primary)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-display font-semibold text-[var(--text-primary)] mb-6">
            {headline}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] whitespace-pre-line">
            {description}
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member: any) => (
            <div key={member.name} className="group cursor-pointer">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-default)] mb-6">
                <Image src={member.image || "/Images/team/pontus.jpg"} alt={member.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="text-xl font-display font-semibold text-[var(--text-primary)]">
                {member.name}
              </h3>
              <p className="text-[var(--text-secondary)] mt-1">{member.role}</p>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-[13px] font-medium text-[#6AD8D2] hover:text-[#5EC4BA] transition-colors"
                >
                  Connect on LinkedIn →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
