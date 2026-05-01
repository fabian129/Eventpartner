import { defineField, defineType } from "sanity";

export const helpCenterPage = defineType({
  name: "helpCenterPage",
  title: "Help Center Page",
  type: "document",

  fields: [
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
  ],

  preview: {
    prepare() {
      return { title: "Help Center Page" };
    },
  },
});
