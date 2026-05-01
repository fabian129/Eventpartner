import { defineField, defineType } from "sanity";

export const careersPage = defineType({
  name: "careersPage",
  title: "Careers Page",
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
      name: "headline",
      title: "Headline",
      type: "localizedString",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
    }),

    // Perks
    defineField({
      name: "perks",
      title: "Perks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "localizedString" },
            { name: "desc", title: "Description", type: "localizedText" },
            { name: "icon", title: "Icon key", type: "string", description: "globe | users | briefcase" },
          ],
          preview: {
            select: { title: "title.en" },
          },
        },
      ],
    }),

    // Application form
    defineField({
      name: "openApplicationTitle",
      title: "Open Application Title",
      type: "localizedString",
    }),
    defineField({
      name: "openApplicationDesc",
      title: "Open Application Description",
      type: "localizedText",
    }),
    defineField({
      name: "formHeadline",
      title: "Form Headline",
      type: "localizedString",
    }),
    defineField({
      name: "successTitle",
      title: "Success Message Title",
      type: "localizedString",
    }),
    defineField({
      name: "successDesc",
      title: "Success Message Description",
      type: "localizedText",
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
      return { title: "Careers Page" };
    },
  },
});
