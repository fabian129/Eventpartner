import { defineField, defineType } from "sanity";

export const webshopPage = defineType({
  name: "webshopPage",
  title: "Webshop Page",
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
      name: "quoteTitle",
      title: "VPP Quote Section Title",
      type: "localizedString",
    }),
    defineField({
      name: "quoteButton",
      title: "VPP Quote Button Text",
      type: "localizedString",
    }),
  ],

  preview: {
    prepare() {
      return { title: "Webshop Page" };
    },
  },
});
