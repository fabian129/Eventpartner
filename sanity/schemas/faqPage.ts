import { defineField, defineType } from "sanity";

export const faqPage = defineType({
  name: "faqPage",
  title: "FAQ Page",
  type: "document",

  groups: [
    { name: "hero", title: "Hero" },
    { name: "content", title: "Content" },
    { name: "cta", title: "CTA" },
  ],

  fields: [
    /* ─── HERO ─── */
    defineField({
      name: "heroLabel",
      title: "Section Label (left)",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroLabelRight",
      title: "Section Label (right)",
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
      title: "Hero Headline Accent (colored part)",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "localizedText",
      group: "hero",
    }),

    /* ─── CONTENT ─── */
    defineField({
      name: "headline",
      title: "Headline",
      type: "localizedString",
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
      group: "content",
    }),
    defineField({
      name: "faqs",
      title: "Frequently Asked Questions",
      type: "array",
      group: "content",
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

    /* ─── CTA ─── */
    defineField({
      name: "ctaHeadline",
      title: "CTA Headline",
      type: "localizedString",
      group: "cta",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Description",
      type: "localizedText",
      group: "cta",
    }),
  ],

  preview: {
    prepare() {
      return { title: "FAQ Page" };
    },
  },
});
