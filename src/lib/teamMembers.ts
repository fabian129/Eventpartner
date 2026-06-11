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
    role: "Co-Founder & Managing Director",
    initials: "MB",
    image: "/Images/Team/malin-farg.webp",
    linkedin: "https://www.linkedin.com/in/malinberlins",
  },
  {
    name: "Joakim Ström",
    role: "Co-Founder & CRO",
    initials: "JS",
    image: "/Images/Team/joakim.webp",
    linkedin: "https://www.linkedin.com/in/joakim-strom-ab5aaa13a",
  },
  {
    name: "Berivan Batak",
    role: "Head of Digital Marketing",
    initials: "BB",
    image: "/Images/Team/berivan.webp",
    linkedin: "https://www.linkedin.com/in/berivan-batak/",
  },
  {
    name: "Karolina Schauerova",
    role: "Event Specialist",
    initials: "KS",
    image: "/Images/Team/karolina.webp",
    linkedin: "https://www.linkedin.com/in/karolina-schauerova/",
  },
  {
    name: "Jennifer Ström",
    role: "Event Specialist",
    initials: "JS",
    image: "/Images/Team/jennifer.webp",
    linkedin: "https://www.linkedin.com/in/jennifer-stroem/",
  },
  {
    name: "Johanna Glaad",
    role: "Head of HR & Event",
    initials: "JG",
    image: "/Images/Team/johanna.webp",
    linkedin: "https://www.linkedin.com/in/johanna-glaad-635288156/",
  },
  {
    name: "Joakim Lundin",
    role: "AI Business Development & IT Manager",
    initials: "JL",
    image: "/Images/Team/joakim-lundin.webp",
    linkedin: "https://www.linkedin.com/in/joakim-lundin-44b76410b/",
  },
  {
    name: "Luna",
    role: "Mood Manager",
    initials: "L",
    image: "/Images/Team/luna.webp",
    linkedin: "",
  },
];

/** Quick lookup by name */
export const TEAM_BY_NAME = Object.fromEntries(
  TEAM_MEMBERS.map((m) => [m.name, m])
);
