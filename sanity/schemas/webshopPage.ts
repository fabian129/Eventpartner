import { defineField, defineType } from "sanity";

export const webshopPage = defineType({
  name: "webshopPage",
  title: "Webshop Page",
  type: "document",

  fields: [
    defineField({
      name: "heroLabel",
      title: "Hero Eyebrow Left",
      type: "localizedString",
    }),
    defineField({
      name: "heroLabelRight",
      title: "Hero Eyebrow Right",
      type: "localizedString",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "localizedString",
    }),
    defineField({
      name: "headlineAccent",
      title: "Headline Accent (colored line)",
      type: "localizedString",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
    }),
    defineField({
      name: "merchLabel",
      title: "Merchandise Section Label",
      type: "localizedString",
    }),
    defineField({
      name: "merchTitle",
      title: "Merchandise Section Title",
      type: "localizedString",
    }),
    defineField({
      name: "merchPendingMessage",
      title: "Merchandise Pending Message",
      type: "localizedText",
    }),
    defineField({
      name: "comingSoonTitle",
      title: "Coming Soon Title",
      type: "localizedString",
    }),
    defineField({
      name: "comingSoonDesc",
      title: "Coming Soon Description",
      type: "localizedText",
    }),
    defineField({
      name: "quoteTitle",
      title: "VPP Quote Section Title",
      type: "localizedString",
    }),
    defineField({
      name: "quoteButton",
      title: "VPP Quote Button Text",
      type: "localizedString",
    }),
    defineField({
      name: "vppHeadline",
      title: "VPP Headline",
      type: "localizedString",
    }),
    defineField({
      name: "vppHeadlineAccent",
      title: "VPP Headline Accent",
      type: "localizedString",
    }),
    defineField({
      name: "vppDescription",
      title: "VPP Description",
      type: "localizedText",
    }),
    defineField({
      name: "successTitle",
      title: "Success Title",
      type: "localizedString",
    }),
    defineField({
      name: "successDescription",
      title: "Success Description",
      type: "localizedText",
    }),
    defineField({
      name: "ctaHeadline",
      title: "Bottom CTA Headline",
      type: "localizedString",
    }),
    defineField({
      name: "ctaDescription",
      title: "Bottom CTA Description",
      type: "localizedText",
    }),
    defineField({
      name: "infoCard1Title",
      title: "Info Card 1 — Title",
      type: "localizedString",
    }),
    defineField({
      name: "infoCard1Label",
      title: "Info Card 1 — Subtitle",
      type: "localizedString",
    }),
    defineField({
      name: "infoCard2Title",
      title: "Info Card 2 — Title",
      type: "localizedString",
    }),
    defineField({
      name: "infoCard2Label",
      title: "Info Card 2 — Subtitle",
      type: "localizedString",
    }),
    defineField({
      name: "infoCard3Title",
      title: "Info Card 3 — Title",
      type: "localizedString",
    }),
    defineField({
      name: "infoCard3Label",
      title: "Info Card 3 — Subtitle",
      type: "localizedString",
    }),
  ],

  preview: {
    prepare() {
      return { title: "Webshop Page" };
    },
  },
});
