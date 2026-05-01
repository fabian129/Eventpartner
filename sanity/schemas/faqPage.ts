import { defineField, defineType } from "sanity";

export const faqPage = defineType({
  name: "faqPage",
  title: "FAQ Page",
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
      name: "faqs",
      title: "Frequently Asked Questions",
      type: "array",
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
  ],

  preview: {
    prepare() {
      return { title: "FAQ Page" };
    },
  },
});
