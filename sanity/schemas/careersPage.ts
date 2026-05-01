import { defineField, defineType } from "sanity";

export const careersPage = defineType({
  name: "careersPage",
  title: "Careers Page",
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
      name: "openApplicationTitle",
      title: "Open Application Title",
      type: "localizedString",
    }),
    defineField({
      name: "openApplicationDesc",
      title: "Open Application Description",
      type: "localizedText",
    }),
  ],

  preview: {
    prepare() {
      return { title: "Careers Page" };
    },
  },
});
