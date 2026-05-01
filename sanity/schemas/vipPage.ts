import { defineField, defineType } from "sanity";

/**
 * VIP Page — singleton document for the /vip page.
 * All text fields use localizedString/localizedText for EN + SV.
 */
export const vipPage = defineType({
  name: "vipPage",
  title: "VIP Programme",
  type: "document",

  groups: [
    { name: "hero", title: "Hero" },
    { name: "manifesto", title: "Manifesto" },
    { name: "tiers", title: "Membership Tiers" },
    { name: "howItWorks", title: "How It Works" },
    { name: "cta", title: "CTA" },
  ],

  fields: [
    /* ─── HERO ─── */
    defineField({
      name: "heroLabel",
      title: "Top Label (left)",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroLabelRight",
      title: "Top Label (right)",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroHeadline",
      title: "Headline",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroHeadlineAccent",
      title: "Headline Accent (gradient part)",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroStats",
      title: "Stats Row",
      type: "array",
      group: "hero",
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
      name: "heroAnchorText",
      title: "Anchor Text (gradient text above video)",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroIntroText",
      title: "Intro Manifesto (animated word reveal)",
      type: "localizedText",
      group: "hero",
      description: "e.g. 'We connect ambitious companies with extraordinary venues — rejecting the ordinary, prioritising precision, and delivering events that genuinely elevate.'",
    }),
    defineField({
      name: "videoLabel",
      title: "Video Overlay Label",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "videoText",
      title: "Video Overlay Text",
      type: "localizedString",
      group: "hero",
    }),

    /* ─── MANIFESTO ─── */
    defineField({
      name: "manifestoLabel",
      title: "Section Label",
      type: "localizedString",
      group: "manifesto",
    }),
    defineField({
      name: "manifestoHeadline",
      title: "Headline",
      type: "localizedString",
      group: "manifesto",
    }),
    defineField({
      name: "manifestoHeadlineAccent",
      title: "Headline (line 2)",
      type: "localizedString",
      group: "manifesto",
    }),
    defineField({
      name: "manifestoQuote",
      title: "Pull Quote",
      type: "localizedText",
      group: "manifesto",
    }),
    defineField({
      name: "manifestoBody1",
      title: "Body Paragraph 1",
      type: "localizedText",
      group: "manifesto",
    }),
    defineField({
      name: "manifestoBody2",
      title: "Body Paragraph 2",
      type: "localizedText",
      group: "manifesto",
    }),
    defineField({
      name: "manifestoMotto",
      title: "Motto (italic quote)",
      type: "localizedString",
      group: "manifesto",
    }),
    defineField({
      name: "manifestoStats",
      title: "Mini Stats",
      type: "array",
      group: "manifesto",
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

    /* ─── TIERS ─── */
    defineField({
      name: "tiersLabel",
      title: "Section Label",
      type: "localizedString",
      group: "tiers",
    }),
    defineField({
      name: "tiersLabelRight",
      title: "Section Label (right)",
      type: "localizedString",
      group: "tiers",
    }),
    defineField({
      name: "tiersHeadline",
      title: "Headline",
      type: "localizedString",
      group: "tiers",
    }),
    defineField({
      name: "tiersDescription",
      title: "Description",
      type: "localizedText",
      group: "tiers",
    }),
    defineField({
      name: "tierCards",
      title: "Tier Cards",
      type: "array",
      group: "tiers",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Tier Name", type: "localizedString" },
            { name: "badge", title: "Badge", type: "localizedString" },
            { name: "price", title: "Price", type: "localizedString" },
            { name: "priceSub", title: "Price Subtitle", type: "localizedString" },
            {
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "localizedString" }],
            },
            { name: "cta", title: "CTA Text", type: "localizedString" },
            { name: "highlight", title: "Highlighted?", type: "boolean" },
          ],
          preview: { select: { title: "name.en" } },
        },
      ],
    }),

    /* ─── HOW IT WORKS ─── */
    defineField({
      name: "stepsLabel",
      title: "Section Label",
      type: "localizedString",
      group: "howItWorks",
    }),
    defineField({
      name: "stepsLabelRight",
      title: "Section Label (right)",
      type: "localizedString",
      group: "howItWorks",
    }),
    defineField({
      name: "stepsHeadline",
      title: "Headline",
      type: "localizedString",
      group: "howItWorks",
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      group: "howItWorks",
      of: [
        {
          type: "object",
          fields: [
            { name: "step", title: "Step Number", type: "string" },
            { name: "title", title: "Title", type: "localizedString" },
            { name: "description", title: "Description", type: "localizedText" },
          ],
          preview: { select: { title: "title.en", subtitle: "step" } },
        },
      ],
    }),

    /* ─── CTA ─── */
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
  ],

  preview: {
    prepare() {
      return { title: "VIP Programme" };
    },
  },
});
