import { defineField, defineType } from "sanity";

export const aiAssistantPage = defineType({
  name: "aiAssistantPage",
  title: "AI Assistant Page",
  type: "document",

  fields: [
    // Hero
    defineField({
      name: "heroLabel",
      title: "Hero Label (left)",
      type: "localizedString",
    }),
    defineField({
      name: "heroLabelRight",
      title: "Hero Label (right)",
      type: "localizedString",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "localizedString",
    }),
    defineField({
      name: "heroHeadlineAccent",
      title: "Hero Headline Accent",
      type: "localizedString",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "localizedText",
    }),

    // Bot section
    defineField({
      name: "botTitle",
      title: "Bot Section Title",
      type: "localizedString",
    }),
    defineField({
      name: "botDescription",
      title: "Bot Section Description",
      type: "localizedText",
    }),
    defineField({
      name: "botStatus",
      title: "Bot Status Text",
      type: "localizedString",
      description: "e.g. 'Training in progress...'",
    }),
    defineField({
      name: "botLaunchDate",
      title: "Expected Launch Date",
      type: "localizedString",
      description: "e.g. 'Expected launch Q3 2025'",
    }),

    // Features
    defineField({
      name: "featuresLabel",
      title: "Features Section Label",
      type: "localizedString",
    }),
    defineField({
      name: "featuresHeadline",
      title: "Features Headline",
      type: "localizedString",
    }),
    defineField({
      name: "features",
      title: "Feature Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "localizedString" },
            { name: "desc", title: "Description", type: "localizedText" },
            { name: "icon", title: "Icon key", type: "string", description: "zap | globe | shield | chat" },
          ],
          preview: {
            select: { title: "title.en" },
          },
        },
      ],
    }),

    // CTA
    defineField({
      name: "ctaHeadline",
      title: "CTA Headline",
      type: "localizedString",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Description",
      type: "localizedText",
    }),
  ],

  preview: {
    prepare() {
      return { title: "AI Assistant Page" };
    },
  },
});
