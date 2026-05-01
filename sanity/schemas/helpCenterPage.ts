import { defineField, defineType } from "sanity";

export const helpCenterPage = defineType({
  name: "helpCenterPage",
  title: "Help Center Page",
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

    // Stats
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string" },
            { name: "label", title: "Label", type: "localizedString" },
            { name: "icon", title: "Icon key", type: "string", description: "clock | globe | shield" },
          ],
          preview: {
            select: { title: "value", subtitle: "label.en" },
          },
        },
      ],
    }),

    // Channels
    defineField({
      name: "channelsLabel",
      title: "Channels Section Label",
      type: "localizedString",
    }),
    defineField({
      name: "channelsHeadline",
      title: "Channels Headline",
      type: "localizedString",
    }),
    defineField({
      name: "channels",
      title: "Contact Channels",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "localizedString" },
            { name: "desc", title: "Description", type: "localizedText" },
            { name: "action", title: "Action Text", type: "string" },
            { name: "href", title: "Link", type: "string" },
            { name: "icon", title: "Icon key", type: "string", description: "mail | phone | chat" },
          ],
          preview: {
            select: { title: "title.en", subtitle: "action" },
          },
        },
      ],
    }),

    // Contact form
    defineField({
      name: "formLabel",
      title: "Form Section Label",
      type: "localizedString",
    }),
    defineField({
      name: "formHeadline",
      title: "Form Headline",
      type: "localizedString",
    }),
    defineField({
      name: "formDescription",
      title: "Form Description",
      type: "localizedText",
    }),

    // Contact info
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
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
      return { title: "Help Center Page" };
    },
  },
});
