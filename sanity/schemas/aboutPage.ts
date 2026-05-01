import { defineField, defineType } from "sanity";

/**
 * About Page — singleton document for the /about page.
 * All text fields use localizedString/localizedText for EN + SV.
 * Grouped by section for easy editing.
 */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",

  groups: [
    { name: "hero", title: "Hero" },
    { name: "stats", title: "Stats" },
    { name: "story", title: "Story" },
    { name: "values", title: "Values" },
    { name: "team", title: "Team" },
    { name: "cta", title: "CTA" },
  ],

  fields: [
    /* ─── HERO ─── */
    defineField({
      name: "heroLabel",
      title: "Top Label (left)",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroLabelRight",
      title: "Top Label (right)",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroHeadline",
      title: "Headline (line 1)",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroHeadlineAccent",
      title: "Headline Accent (colored part)",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroHeadlineLine3",
      title: "Headline (line 3)",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Subtitle",
      type: "localizedText",
      group: "hero",
    }),

    /* ─── STATS ─── */
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      group: "stats",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string" },
            { name: "label", title: "Label", type: "localizedString" },
          ],
          preview: { select: { title: "value", subtitle: "label.en" } },
        },
      ],
    }),

    /* ─── STORY ─── */
    defineField({
      name: "storyLabel",
      title: "Section Label",
      type: "localizedString",
      group: "story",
    }),
    defineField({
      name: "storyHeadline",
      title: "Headline",
      type: "localizedString",
      group: "story",
    }),
    defineField({
      name: "storyHeadlineAccent",
      title: "Headline (line 2)",
      type: "localizedString",
      group: "story",
    }),
    defineField({
      name: "storyQuote",
      title: "Pull Quote",
      type: "localizedText",
      group: "story",
    }),
    defineField({
      name: "storyBody1",
      title: "Body Paragraph 1",
      type: "localizedText",
      group: "story",
    }),
    defineField({
      name: "storyBody2",
      title: "Body Paragraph 2",
      type: "localizedText",
      group: "story",
    }),

    /* ─── VALUES ─── */
    defineField({
      name: "valuesLabel",
      title: "Section Label",
      type: "localizedString",
      group: "values",
    }),
    defineField({
      name: "valuesHeadline",
      title: "Headline",
      type: "localizedString",
      group: "values",
    }),
    defineField({
      name: "valuesHeadlineAccent",
      title: "Headline (line 2)",
      type: "localizedString",
      group: "values",
    }),
    defineField({
      name: "valueCards",
      title: "Value Cards",
      type: "array",
      group: "values",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "localizedString" },
            { name: "description", title: "Description", type: "localizedText" },
            {
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Heart", value: "heart" },
                  { title: "Zap", value: "zap" },
                  { title: "Globe", value: "globe" },
                  { title: "Shield", value: "shield" },
                ],
              },
            },
          ],
          preview: { select: { title: "title.en" } },
        },
      ],
    }),

    /* ─── TEAM ─── */
    defineField({
      name: "teamLabel",
      title: "Section Label",
      type: "localizedString",
      group: "team",
    }),
    defineField({
      name: "teamIntro",
      title: "Intro Text",
      type: "localizedText",
      group: "team",
    }),
    defineField({
      name: "teamMembers",
      title: "Team Members",
      type: "array",
      group: "team",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "role", title: "Role", type: "localizedString" },
            { name: "bio", title: "Bio / Description", type: "localizedText" },
            { name: "linkedin", title: "LinkedIn URL", type: "url" },
            { name: "image", title: "Profile Image", type: "image", options: { hotspot: true } },
            { name: "initials", title: "Initials (fallback)", type: "string" },
          ],
          preview: { select: { title: "name", subtitle: "role.en", media: "image" } },
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
      return { title: "About Page" };
    },
  },
});
