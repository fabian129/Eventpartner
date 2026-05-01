import { defineField, defineType } from "sanity";

export const aiAssistantPage = defineType({
  name: "aiAssistantPage",
  title: "AI Assistant Page",
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
      name: "botTitle",
      title: "Bot Section Title",
      type: "localizedString",
    }),
    defineField({
      name: "botDescription",
      title: "Bot Section Description",
      type: "localizedText",
    }),
  ],

  preview: {
    prepare() {
      return { title: "AI Assistant Page" };
    },
  },
});
