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
