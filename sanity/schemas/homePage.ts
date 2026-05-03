import { defineField, defineType } from "sanity";

/**
 * Homepage — singleton document for the EventPartner landing page.
 * All text fields use localizedString/localizedText for EN + SV.
 * Grouped by section for easy editing.
 */
export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",

  groups: [
    { name: "navbar", title: "Navbar" },
    { name: "hero", title: "Hero" },
    { name: "video", title: "Video" },
    { name: "services", title: "Services" },
    { name: "countryFlags", title: "Country Flags" },
    { name: "caseStories", title: "Case Stories" },
    { name: "cta", title: "CTA" },
    { name: "newsletter", title: "Newsletter" },
    { name: "about", title: "About" },
    { name: "faq", title: "FAQ" },
    { name: "requestForm", title: "Request Form" },
    { name: "footer", title: "Footer" },
    { name: "exitIntent", title: "Exit Intent Popup" },
    { name: "globe", title: "Globe Section" },
    { name: "webshop", title: "Webshop Teaser" },
  ],

  fields: [
    /* ─── NAVBAR ─── */
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      group: "navbar",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "localizedString" },
            { name: "href", title: "URL", type: "string" },
          ],
          preview: { select: { title: "label.en", subtitle: "href" } },
        },
      ],
    }),
    defineField({
      name: "navCta",
      title: "CTA Button Text",
      type: "localizedString",
      group: "navbar",
    }),

    /* ─── HERO ─── */
    defineField({
      name: "heroBadge",
      title: "Hero Badge Text",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroHeadlineAccent",
      title: "Hero Headline Accent (italic part)",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "localizedText",
      group: "hero",
    }),
    defineField({
      name: "heroCta1",
      title: "Hero CTA Primary",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroCta2",
      title: "Hero CTA Secondary",
      type: "localizedString",
      group: "hero",
    }),

    /* ─── VIDEO ─── */
    defineField({
      name: "videoLabel",
      title: "Section Label",
      type: "localizedString",
      group: "video",
    }),
    defineField({
      name: "videoHeadline",
      title: "Headline",
      type: "localizedString",
      group: "video",
    }),
    defineField({
      name: "videoHeadlineAccent",
      title: "Headline Accent (muted part)",
      type: "localizedString",
      group: "video",
    }),
    defineField({
      name: "videoDescription",
      title: "Description",
      type: "localizedText",
      group: "video",
    }),

    /* ─── SERVICES ─── */
    defineField({
      name: "servicesLabel",
      title: "Section Label",
      type: "localizedString",
      group: "services",
    }),
    defineField({
      name: "servicesLabelRight",
      title: "Section Label Right",
      type: "localizedString",
      group: "services",
    }),
    defineField({
      name: "servicesHeadline",
      title: "Section Headline",
      type: "localizedString",
      group: "services",
    }),
    defineField({
      name: "servicesDescription",
      title: "Section Description",
      type: "localizedText",
      group: "services",
    }),
    defineField({
      name: "servicesStats",
      title: "Stats Row",
      type: "array",
      group: "services",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string" },
            { name: "label", title: "Label", type: "localizedString" },
          ],
          preview: { select: { title: "value", subtitle: "label.en" } },
        },
      ],
    }),
    defineField({
      name: "serviceCards",
      title: "Service Cards",
      type: "array",
      group: "services",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "localizedString" },
            { name: "desc", title: "Description", type: "localizedText" },
            {
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Mic", value: "mic" },
                  { title: "Users", value: "users" },
                  { title: "Glass", value: "glass" },
                  { title: "Globe", value: "globe" },
                ],
              },
            },
          ],
          preview: { select: { title: "title.en" } },
        },
      ],
    }),
    defineField({
      name: "servicesFullserviceTitle",
      title: "Fullservice Card Title",
      type: "localizedString",
      group: "services",
    }),
    defineField({
      name: "servicesFullserviceDesc",
      title: "Fullservice Card Description",
      type: "localizedText",
      group: "services",
    }),

    /* ─── COUNTRY FLAGS ─── */
    defineField({
      name: "flagsLabel",
      title: "Section Label",
      type: "localizedString",
      group: "countryFlags",
    }),
    defineField({
      name: "flagsLabelRight",
      title: "Section Label Right",
      type: "localizedString",
      group: "countryFlags",
    }),
    defineField({
      name: "flagsHeadline",
      title: "Headline",
      type: "localizedString",
      group: "countryFlags",
    }),
    defineField({
      name: "flagsDescription",
      title: "Description",
      type: "localizedText",
      group: "countryFlags",
    }),
    defineField({
      name: "flagsMetrics",
      title: "Metrics Row",
      type: "array",
      group: "countryFlags",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Numeric Value (for counter)", type: "number" },
            { name: "stringValue", title: "String Value (if not a counter, e.g. '24/7')", type: "string" },
            { name: "suffix", title: "Suffix (e.g. K+, %)", type: "string" },
            { name: "label", title: "Label", type: "localizedString" },
          ],
          preview: { select: { title: "label.en", subtitle: "value" } },
        },
      ],
    }),

    /* ─── CASE STORIES ─── */
    defineField({
      name: "casesLabel",
      title: "Section Label",
      type: "localizedString",
      group: "caseStories",
    }),
    defineField({
      name: "casesLabelRight",
      title: "Section Label Right",
      type: "localizedString",
      group: "caseStories",
    }),
    defineField({
      name: "casesHeadline",
      title: "Section Headline",
      type: "localizedString",
      group: "caseStories",
    }),
    defineField({
      name: "casesDescription",
      title: "Section Description",
      type: "localizedText",
      group: "caseStories",
    }),
    defineField({
      name: "caseCards",
      title: "Case Story Cards",
      type: "array",
      group: "caseStories",
      of: [
        {
          type: "object",
          fields: [
            { name: "client", title: "Client Name", type: "string" },
            { name: "event", title: "Event Name", type: "localizedString" },
            { name: "description", title: "Description", type: "localizedText" },
            { name: "guests", title: "Guests", type: "string" },
            { name: "location", title: "Location", type: "localizedString" },
            { name: "duration", title: "Duration", type: "localizedString" },
          ],
          preview: { select: { title: "client", subtitle: "event.en" } },
        },
      ],
    }),
    defineField({
      name: "casesCta",
      title: "Card CTA Text",
      type: "localizedString",
      group: "caseStories",
    }),

    /* ─── CTA (Cinematic Quote Break) ─── */
    defineField({
      name: "ctaLabel",
      title: "Section Label",
      type: "localizedString",
      group: "cta",
    }),
    defineField({
      name: "ctaLabelRight",
      title: "Section Label Right",
      type: "localizedString",
      group: "cta",
    }),
    defineField({
      name: "ctaHeadline",
      title: "CTA Headline",
      type: "localizedString",
      group: "cta",
    }),
    defineField({
      name: "ctaSubheadline",
      title: "CTA Subheadline",
      type: "localizedString",
      group: "cta",
    }),
    defineField({
      name: "ctaCard1Title",
      title: "Card 1 Title",
      type: "localizedString",
      group: "cta",
    }),
    defineField({
      name: "ctaCard1Desc",
      title: "Card 1 Description",
      type: "localizedString",
      group: "cta",
    }),
    defineField({
      name: "ctaCard2Title",
      title: "Card 2 Title",
      type: "localizedString",
      group: "cta",
    }),
    defineField({
      name: "ctaCard2Headline",
      title: "Card 2 Headline",
      type: "localizedString",
      group: "cta",
    }),
    defineField({
      name: "ctaCard2Sub",
      title: "Card 2 Sub-text",
      type: "localizedString",
      group: "cta",
    }),

    /* ─── NEWSLETTER ─── */
    defineField({
      name: "newsletterHeadline",
      title: "Headline",
      type: "localizedString",
      group: "newsletter",
    }),
    defineField({
      name: "newsletterDescription",
      title: "Description",
      type: "localizedText",
      group: "newsletter",
    }),
    defineField({
      name: "newsletterPlaceholder",
      title: "Input Placeholder",
      type: "localizedString",
      group: "newsletter",
    }),
    defineField({
      name: "newsletterButton",
      title: "Button Text",
      type: "localizedString",
      group: "newsletter",
    }),

    /* ─── ABOUT ─── */
    defineField({
      name: "aboutLabel",
      title: "Section Label",
      type: "localizedString",
      group: "about",
    }),
    defineField({
      name: "aboutLabelRight",
      title: "Section Label Right",
      type: "localizedString",
      group: "about",
    }),
    defineField({
      name: "aboutHeadline",
      title: "Headline (line 1)",
      type: "localizedString",
      group: "about",
    }),
    defineField({
      name: "aboutHeadlineAccent",
      title: "Headline (line 2)",
      type: "localizedString",
      group: "about",
    }),
    defineField({
      name: "aboutQuote",
      title: "Quote / Pull text",
      type: "localizedText",
      group: "about",
    }),
    defineField({
      name: "aboutBody",
      title: "Body Text (paragraph 1)",
      type: "localizedText",
      group: "about",
    }),
    defineField({
      name: "aboutBody2",
      title: "Body Text (paragraph 2)",
      type: "localizedText",
      group: "about",
    }),
    defineField({
      name: "aboutMotto",
      title: "Motto (italic quote)",
      type: "localizedString",
      group: "about",
    }),
    defineField({
      name: "aboutStats",
      title: "Stats",
      type: "array",
      group: "about",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string" },
            { name: "label", title: "Label", type: "localizedString" },
          ],
          preview: {
            select: { title: "value", subtitle: "label.en" },
          },
        },
      ],
    }),
    defineField({
      name: "aboutTeamLabel",
      title: "Team Section Label",
      type: "localizedString",
      group: "about",
    }),
    defineField({
      name: "aboutTeamIntro",
      title: "Team Intro Text",
      type: "localizedText",
      group: "about",
    }),
    defineField({
      name: "aboutTeam",
      title: "Team Members",
      type: "array",
      group: "about",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "role", title: "Role", type: "localizedString" },
            { name: "bio", title: "Bio / Description", type: "localizedText" },
            { name: "linkedin", title: "LinkedIn URL", type: "url" },
            { name: "image", title: "Profile Image", type: "image", options: { hotspot: true } },
            { name: "initials", title: "Initials (fallback)", type: "string" },
          ],
          preview: { select: { title: "name", subtitle: "role.en", media: "image" } },
        },
      ],
    }),

    /* ─── FAQ ─── */
    defineField({
      name: "faqLabel",
      title: "Section Label",
      type: "localizedString",
      group: "faq",
    }),
    defineField({
      name: "faqLabelRight",
      title: "Section Label Right",
      type: "localizedString",
      group: "faq",
    }),
    defineField({
      name: "faqHeadline",
      title: "Headline",
      type: "localizedString",
      group: "faq",
    }),
    defineField({
      name: "faqDescription",
      title: "Description",
      type: "localizedText",
      group: "faq",
    }),
    defineField({
      name: "faqItems",
      title: "FAQ Items",
      type: "array",
      group: "faq",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "localizedString" },
            { name: "answer", title: "Answer", type: "localizedText" },
          ],
          preview: { select: { title: "question.en" } },
        },
      ],
    }),
    defineField({
      name: "faqCtaText",
      title: "CTA text below FAQ",
      type: "localizedString",
      group: "faq",
    }),
    defineField({
      name: "faqCtaLink",
      title: "CTA link text",
      type: "localizedString",
      group: "faq",
    }),

    /* ─── REQUEST FORM (visible text only) ─── */
    defineField({
      name: "formBadge",
      title: "Badge Text",
      type: "localizedString",
      group: "requestForm",
    }),
    defineField({
      name: "formHeadline",
      title: "Headline",
      type: "localizedString",
      group: "requestForm",
    }),
    defineField({
      name: "formHeadlineAccent",
      title: "Headline Accent (italic part)",
      type: "localizedString",
      group: "requestForm",
    }),
    defineField({
      name: "formDescription",
      title: "Description",
      type: "localizedText",
      group: "requestForm",
    }),
    defineField({
      name: "formButton",
      title: "Submit Button Text",
      type: "localizedString",
      group: "requestForm",
    }),
    defineField({
      name: "formDisclaimer",
      title: "Disclaimer Text",
      type: "localizedString",
      group: "requestForm",
    }),
    defineField({
      name: "formInquiryLabel",
      title: "Inquiry Eyebrow Label",
      type: "localizedString",
      group: "requestForm",
      description: "e.g. 'EventPartner — Inquiry'",
    }),
    defineField({
      name: "formExtendedTitle",
      title: "Extended Form Card Title",
      type: "localizedString",
      group: "requestForm",
    }),
    defineField({
      name: "formExtendedDesc",
      title: "Extended Form Card Description",
      type: "localizedText",
      group: "requestForm",
    }),
    defineField({
      name: "formExtendedLink",
      title: "Extended Form Link Text",
      type: "localizedString",
      group: "requestForm",
    }),
    defineField({
      name: "formMeetingLabel",
      title: "Meeting Card Eyebrow",
      type: "localizedString",
      group: "requestForm",
    }),
    defineField({
      name: "formMeetingTitle",
      title: "Meeting Card Title",
      type: "localizedString",
      group: "requestForm",
    }),
    defineField({
      name: "formMeetingDesc",
      title: "Meeting Card Description",
      type: "localizedText",
      group: "requestForm",
    }),
    defineField({
      name: "formMeetingButton",
      title: "Meeting Button Text",
      type: "localizedString",
      group: "requestForm",
    }),
    defineField({
      name: "formSuccessMessage",
      title: "Success Message",
      type: "localizedString",
      group: "requestForm",
    }),

    /* ─── FOOTER ─── */
    defineField({
      name: "footerBrandDesc",
      title: "Brand Description",
      type: "localizedText",
      group: "footer",
    }),
    defineField({
      name: "footerSocialLabel",
      title: "Social Media Label",
      type: "localizedString",
      group: "footer",
    }),
    defineField({
      name: "footerNewsletterDesc",
      title: "Newsletter Description",
      type: "localizedText",
      group: "footer",
    }),
    defineField({
      name: "footerCtaTitle",
      title: "CTA Banner Title",
      type: "localizedString",
      group: "footer",
    }),
    defineField({
      name: "footerCtaDesc",
      title: "CTA Banner Description",
      type: "localizedText",
      group: "footer",
    }),
    defineField({
      name: "footerColumns",
      title: "Footer Link Columns",
      type: "array",
      group: "footer",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Column Title", type: "localizedString" },
            {
              name: "links",
              title: "Links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", title: "Label", type: "localizedString" },
                    { name: "href", title: "URL", type: "string" },
                  ],
                  preview: { select: { title: "label.en", subtitle: "href" } },
                },
              ],
            },
          ],
          preview: { select: { title: "title.en" } },
        },
      ],
    }),

    /* ─── EXIT INTENT ─── */
    defineField({
      name: "exitLabel",
      title: "Label",
      type: "localizedString",
      group: "exitIntent",
    }),
    defineField({
      name: "exitHeadline",
      title: "Headline",
      type: "localizedString",
      group: "exitIntent",
    }),
    defineField({
      name: "exitHeadlineAccent",
      title: "Headline Accent (italic part)",
      type: "localizedString",
      group: "exitIntent",
    }),
    defineField({
      name: "exitDescription",
      title: "Description",
      type: "localizedText",
      group: "exitIntent",
    }),
    defineField({
      name: "exitButton",
      title: "Button Text",
      type: "localizedString",
      group: "exitIntent",
    }),
    defineField({
      name: "exitPrivacy",
      title: "Privacy Disclaimer",
      type: "localizedText",
      group: "exitIntent",
    }),

    /* ─── GLOBE SECTION ─── */
    defineField({
      name: "globeBadge",
      title: "Badge Text",
      type: "localizedString",
      group: "globe",
    }),
    defineField({
      name: "globeHeadline",
      title: "Headline (e.g. '360,000+ Venues')",
      type: "localizedString",
      group: "globe",
    }),
    defineField({
      name: "globeHeadlineAccent",
      title: "Headline Accent (e.g. 'in 36 Countries')",
      type: "localizedString",
      group: "globe",
    }),
    defineField({
      name: "globeDescription",
      title: "Description",
      type: "localizedText",
      group: "globe",
    }),

    /* ─── WEBSHOP TEASER ─── */
    defineField({
      name: "webshopLabel",
      title: "Section Label (left)",
      type: "localizedString",
      group: "webshop",
    }),
    defineField({
      name: "webshopLabelRight",
      title: "Section Label (right)",
      type: "localizedString",
      group: "webshop",
    }),
    defineField({
      name: "webshopHeadline",
      title: "Headline",
      type: "localizedString",
      group: "webshop",
    }),
    defineField({
      name: "webshopHeadlineAccent",
      title: "Headline Accent (muted part)",
      type: "localizedString",
      group: "webshop",
    }),
    defineField({
      name: "webshopDescription",
      title: "Description",
      type: "localizedText",
      group: "webshop",
    }),
    defineField({
      name: "webshopComingSoonTitle",
      title: "Coming Soon Title",
      type: "localizedString",
      group: "webshop",
    }),
    defineField({
      name: "webshopComingSoonDesc",
      title: "Coming Soon Description",
      type: "localizedText",
      group: "webshop",
    }),
    defineField({
      name: "webshopCtaText",
      title: "CTA Button Text",
      type: "localizedString",
      group: "webshop",
    }),

    /* ─── VIDEO TEXT OVERLAY ─── */
    defineField({
      name: "videoBottomLabel",
      title: "Video Bottom Label",
      type: "localizedString",
      group: "video",
      description: "e.g. 'EventPartner — Introduction'",
    }),
    defineField({
      name: "videoBottomText",
      title: "Video Bottom Text",
      type: "localizedString",
      group: "video",
      description: "e.g. 'See how it works'",
    }),
  ],

  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});

