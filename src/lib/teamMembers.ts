/**
 * Shared team member data — single source of truth
 * 
 * Images are local files in /public/Images/team/
 * These were provided by the client and are NOT managed through CMS.
 */

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  image: string;
  linkedin: string;
  bio?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Pontus Bredal Hansen",
    role: "Co-Founder & CEO",
    initials: "PH",
    image: "/Images/Team/pontus.webp",
    linkedin: "https://www.linkedin.com/in/pontus-bredal-hansen-51a07a110",
  },
  {
    name: "Malin Berlin",
    role: "Co-Founder & COO",
    initials: "MB",
    image: "/Images/Team/malin-farg.webp",
    linkedin: "https://www.linkedin.com/in/malinberlins",
  },
  {
    name: "Joakim Ström",
    role: "Head of Partnerships",
    initials: "JS",
    image: "/Images/Team/joakim.webp",
    linkedin: "https://www.linkedin.com/in/joakim-strom-ab5aaa13a",
  },
];

/** Quick lookup by name */
export const TEAM_BY_NAME = Object.fromEntries(
  TEAM_MEMBERS.map((m) => [m.name, m])
);
