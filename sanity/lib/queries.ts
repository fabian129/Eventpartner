import { defineQuery } from "next-sanity";

export const HOMEPAGE_QUERY = defineQuery(
  `*[_type == "homePage"][0]{
    // Navbar
    navLinks, navCta,
    // Hero
    heroBadge, heroHeadline, heroHeadlineAccent, heroSubheadline,
    heroCta1, heroCta2,
    // Video
    videoLabel, videoHeadline, videoHeadlineAccent, videoDescription,
    // Services
    servicesLabel, servicesLabelRight, servicesHeadline, servicesDescription,
    servicesStats, serviceCards, servicesFullserviceTitle, servicesFullserviceDesc,
    // Country Flags
    flagsLabel, flagsLabelRight, flagsHeadline, flagsDescription,
    // Case Stories
    casesLabel, casesLabelRight, casesHeadline, casesDescription,
    caseCards, casesCta,
    // CTA
    ctaLabel, ctaLabelRight, ctaHeadline, ctaSubheadline,
    ctaCard1Title, ctaCard1Desc, ctaCard2Title, ctaCard2Headline, ctaCard2Sub,
    // Newsletter
    newsletterHeadline, newsletterDescription, newsletterPlaceholder, newsletterButton,
    // About
    aboutLabel, aboutHeadline, aboutHeadlineAccent, aboutQuote, aboutBody, aboutBody2, aboutMotto, aboutStats,
    aboutTeamLabel, aboutTeamIntro, aboutTeam,
    // FAQ
    faqHeadline, faqDescription, faqItems, faqCtaText, faqCtaLink,
    // Request Form
    formBadge, formHeadline, formHeadlineAccent, formDescription,
    formButton, formDisclaimer,
    // Footer
    footerBrandDesc, footerSocialLabel, footerNewsletterDesc,
    footerCtaTitle, footerCtaDesc, footerColumns,
    // Exit Intent
    exitLabel, exitHeadline, exitHeadlineAccent, exitDescription,
    exitButton, exitPrivacy
  }`
);

export const ABOUT_PAGE_QUERY = defineQuery(
  `*[_type == "aboutPage"][0]{
    // Hero
    heroLabel, heroLabelRight, heroHeadline, heroHeadlineAccent, heroHeadlineLine3, heroSubtitle,
    // Stats
    stats,
    // Story
    storyLabel, storyHeadline, storyHeadlineAccent, storyQuote, storyBody1, storyBody2,
    // Values
    valuesLabel, valuesHeadline, valuesHeadlineAccent, valueCards,
    // Team
    teamLabel, teamIntro, teamMembers,
    // CTA
    ctaHeadline, ctaDescription
  }`
);

export const SECURITY_PAGE_QUERY = defineQuery(
  `*[_type == "securityPage"][0]{
    // Hero
    heroLabel, heroLabelRight, heroBadge, heroHeadline, heroHeadlineAccent, heroSubtitle,
    // Pillars
    pillarsLabel, pillarsHeadline, pillarsHeadlineAccent, pillarCards,
    // Compliance
    complianceLabel, complianceHeadline, complianceHeadlineAccent, complianceSections,
    // Rights
    rightsLabel, rightsHeadline, rightsHeadlineAccent, rightsIntro, rightsList,
    // DPO
    dpoTitle, dpoSubtitle, dpoDescription, dpoEmail,
    // CTA
    ctaHeadline, ctaDescription
  }`
);

export const VIP_PAGE_QUERY = defineQuery(
  `*[_type == "vipPage"][0]{
    // Hero
    heroLabel, heroLabelRight, heroHeadline, heroHeadlineAccent, heroStats, heroAnchorText,
    // Manifesto
    manifestoLabel, manifestoHeadline, manifestoHeadlineAccent,
    manifestoQuote, manifestoBody1, manifestoBody2, manifestoMotto, manifestoStats,
    // Tiers
    tiersLabel, tiersLabelRight, tiersHeadline, tiersDescription, tierCards,
    // Steps
    stepsLabel, stepsLabelRight, stepsHeadline, steps,
    // CTA
    ctaCard1Title, ctaCard1Desc, ctaCard2Title, ctaCard2Headline, ctaCard2Sub
  }`
);
