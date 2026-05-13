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
    videoBottomLabel, videoBottomText,
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
    aboutLabel, aboutLabelRight, aboutHeadline, aboutHeadlineAccent, aboutQuote, aboutBody, aboutBody2, aboutMotto, aboutStats,
    aboutTeamLabel, aboutTeamIntro, aboutTeam,
    // FAQ
    faqLabel, faqLabelRight, faqHeadline, faqDescription, faqItems, faqCtaText, faqCtaLink,
    // Request Form
    formBadge, formHeadline, formHeadlineAccent, formDescription,
    formButton, formDisclaimer,
    formInquiryLabel, formExtendedTitle, formExtendedDesc, formExtendedLink,
    formMeetingLabel, formMeetingTitle, formMeetingDesc, formMeetingButton,
    formSuccessMessage,
    // Footer
    footerBrandDesc, footerSocialLabel, footerNewsletterDesc,
    footerCtaTitle, footerCtaDesc, footerColumns,
    // Exit Intent
    exitLabel, exitHeadline, exitHeadlineAccent, exitDescription,
    exitButton, exitPrivacy,
    // Globe
    globeBadge, globeHeadline, globeHeadlineAccent, globeDescription,
    // Webshop Teaser
    webshopLabel, webshopLabelRight, webshopHeadline, webshopHeadlineAccent,
    webshopDescription, webshopComingSoonTitle, webshopComingSoonDesc, webshopCtaText,
    // Video overlay text
    videoBottomLabel, videoBottomText,
    // VIP Teaser
    vipLabel, vipHeadline, vipHeadlineMuted, vipBody1, vipBody2,
    vipInclusions, vipCtaText, vipCtaSub,
    // Logo Ticker
    logoTickerLabel, logoTickerLogos
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
    heroIntroText, videoLabel, videoText,
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

export const LEADERSHIP_PAGE_QUERY = defineQuery(
  `*[_type == "leadershipPage"][0]{
    headline, description, teamMembers,
    sectionLabel, sectionLabelRight,
    ctaHeadline, ctaDescription
  }`
);

export const CAREERS_PAGE_QUERY = defineQuery(
  `*[_type == "careersPage"][0]{
    heroLabel, heroLabelRight,
    headline, description,
    perks,
    openApplicationTitle, openApplicationDesc, formHeadline,
    successTitle, successDesc,
    ctaHeadline, ctaDescription
  }`
);

export const WEBSHOP_PAGE_QUERY = defineQuery(
  `*[_type == "webshopPage"][0]{
    heroLabel, heroLabelRight, headline, headlineAccent, description,
    merchLabel, merchTitle, merchPendingMessage, comingSoonTitle, comingSoonDesc,
    quoteTitle, quoteButton, vppHeadline, vppHeadlineAccent, vppDescription,
    successTitle, successDescription, ctaHeadline, ctaDescription,
    infoCard1Title, infoCard1Label, infoCard2Title, infoCard2Label,
    infoCard3Title, infoCard3Label
  }`
);

export const AI_ASSISTANT_PAGE_QUERY = defineQuery(
  `*[_type == "aiAssistantPage"][0]{
    heroLabel, heroLabelRight,
    heroHeadline, heroHeadlineAccent, heroSubtitle,
    botTitle, botDescription, botStatus, botLaunchDate,
    featuresLabel, featuresHeadline, features,
    ctaHeadline, ctaDescription
  }`
);

export const FAQ_PAGE_QUERY = defineQuery(
  `*[_type == "faqPage"][0]{
    // Hero
    heroLabel, heroLabelRight, heroHeadline, heroHeadlineAccent, heroSubtitle,
    // Content
    headline, description, faqs,
    // CTA
    ctaHeadline, ctaDescription
  }`
);

export const CUSTOMIZE_PAGE_QUERY = defineQuery(
  `*[_type == "customizePage"][0]{
    // Hero
    heroLabel, heroLabelRight, heroHeadline, heroHeadlineAccent, heroDescription,
    // Form
    submitButton, successMessage, disclaimer, backLink,
    contactTitle, contactSubtitle,
    eventTitle, eventSubtitle,
    venueTitle, venueSubtitle,
    cateringTitle, cateringSubtitle,
    activitiesTitle, activitiesSubtitle,
    anythingElseTitle, anythingElseSubtitle
  }`
);

export const HELP_CENTER_PAGE_QUERY = defineQuery(
  `*[_type == "helpCenterPage"][0]{
    heroLabel, heroLabelRight,
    heroHeadline, heroHeadlineAccent, heroSubtitle,
    stats,
    channelsLabel, channelsHeadline, channels,
    formLabel, formHeadline, formDescription,
    contactEmail, contactPhone,
    ctaHeadline, ctaDescription
  }`
);
