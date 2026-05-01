import { defineField, defineType } from "sanity";

export const leadershipPage = defineType({
  name: "leadershipPage",
  title: "Leadership Page",
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
      name: "teamMembers",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "role", title: "Role", type: "localizedString" },
            { name: "linkedin", title: "LinkedIn URL", type: "url" },
            { name: "image", title: "Profile Image", type: "image", options: { hotspot: true } },
          ],
          preview: { select: { title: "name", subtitle: "role.en", media: "image" } },
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return { title: "Leadership Page" };
    },
  },
});
