import { defineField, defineType } from "sanity";

/**
 * Security & Compliance Page — singleton document for the /security page.
 * All text fields use localizedString/localizedText for EN + SV.
 */
export const securityPage = defineType({
  name: "securityPage",
  title: "Security & Compliance",
  type: "document",

  groups: [
    { name: "hero", title: "Hero" },
    { name: "pillars", title: "Security Pillars" },
    { name: "compliance", title: "Compliance Framework" },
    { name: "rights", title: "Data Rights" },
    { name: "dpo", title: "DPO Contact" },
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
      name: "heroBadge",
      title: "Badge Text",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroHeadline",
      title: "Headline",
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
      name: "heroSubtitle",
      title: "Subtitle",
      type: "localizedText",
      group: "hero",
    }),

    /* ─── SECURITY PILLARS ─── */
    defineField({
      name: "pillarsLabel",
      title: "Section Label",
      type: "localizedString",
      group: "pillars",
    }),
    defineField({
      name: "pillarsHeadline",
      title: "Headline",
      type: "localizedString",
      group: "pillars",
    }),
    defineField({
      name: "pillarsHeadlineAccent",
      title: "Headline (line 2)",
      type: "localizedString",
      group: "pillars",
    }),
    defineField({
      name: "pillarCards",
      title: "Pillar Cards",
      type: "array",
      group: "pillars",
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
                  { title: "Lock", value: "lock" },
                  { title: "Server", value: "server" },
                  { title: "FileCheck", value: "fileCheck" },
                  { title: "UserCheck", value: "userCheck" },
                  { title: "Eye", value: "eye" },
                  { title: "AlertTriangle", value: "alertTriangle" },
                ],
              },
            },
          ],
          preview: { select: { title: "title.en" } },
        },
      ],
    }),

    /* ─── COMPLIANCE ─── */
    defineField({
      name: "complianceLabel",
      title: "Section Label",
      type: "localizedString",
      group: "compliance",
    }),
    defineField({
      name: "complianceHeadline",
      title: "Headline",
      type: "localizedString",
      group: "compliance",
    }),
    defineField({
      name: "complianceHeadlineAccent",
      title: "Headline (line 2)",
      type: "localizedString",
      group: "compliance",
    }),
    defineField({
      name: "complianceSections",
      title: "Compliance Sections",
      type: "array",
      group: "compliance",
      of: [
        {
          type: "object",
          fields: [
            { name: "category", title: "Category", type: "localizedString" },
            {
              name: "items",
              title: "Items",
              type: "array",
              of: [{ type: "localizedString" }],
            },
          ],
          preview: { select: { title: "category.en" } },
        },
      ],
    }),

    /* ─── DATA RIGHTS ─── */
    defineField({
      name: "rightsLabel",
      title: "Section Label",
      type: "localizedString",
      group: "rights",
    }),
    defineField({
      name: "rightsHeadline",
      title: "Headline",
      type: "localizedString",
      group: "rights",
    }),
    defineField({
      name: "rightsHeadlineAccent",
      title: "Headline (line 2)",
      type: "localizedString",
      group: "rights",
    }),
    defineField({
      name: "rightsIntro",
      title: "Intro Text",
      type: "localizedText",
      group: "rights",
    }),
    defineField({
      name: "rightsList",
      title: "Data Rights",
      type: "array",
      group: "rights",
      of: [
        {
          type: "object",
          fields: [
            { name: "right", title: "Right Title", type: "localizedString" },
            { name: "description", title: "Description", type: "localizedText" },
          ],
          preview: { select: { title: "right.en" } },
        },
      ],
    }),

    /* ─── DPO ─── */
    defineField({
      name: "dpoTitle",
      title: "DPO Section Title",
      type: "localizedString",
      group: "dpo",
    }),
    defineField({
      name: "dpoSubtitle",
      title: "DPO Subtitle",
      type: "localizedString",
      group: "dpo",
    }),
    defineField({
      name: "dpoDescription",
      title: "DPO Description",
      type: "localizedText",
      group: "dpo",
    }),
    defineField({
      name: "dpoEmail",
      title: "DPO Email",
      type: "string",
      group: "dpo",
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
      return { title: "Security & Compliance" };
    },
  },
});
