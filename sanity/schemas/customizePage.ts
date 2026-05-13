import { defineField, defineType } from "sanity";

export const customizePage = defineType({
  name: "customizePage",
  title: "Customize Page",
  type: "document",

  groups: [
    { name: "hero", title: "Hero" },
    { name: "form", title: "Form" },
    { name: "cta", title: "CTA" },
  ],

  fields: [
    /* ─── HERO ─── */
    defineField({
      name: "heroLabel",
      title: "Section Label (left)",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroLabelRight",
      title: "Section Label (right)",
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
      title: "Headline Accent (gradient line)",
      type: "localizedString",
      group: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Description",
      type: "localizedText",
      group: "hero",
    }),

    /* ─── FORM ─── */
    defineField({
      name: "submitButton",
      title: "Submit Button Text",
      type: "localizedString",
      group: "form",
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "localizedString",
      group: "form",
    }),
    defineField({
      name: "disclaimer",
      title: "Disclaimer Text",
      type: "localizedString",
      group: "form",
      description: "e.g. 'No obligations • Response within 24h • Completely free'",
    }),
    defineField({
      name: "backLink",
      title: "Back Link Text",
      type: "localizedString",
      group: "form",
    }),

    /* ─── SECTION HEADINGS ─── */
    defineField({
      name: "contactTitle",
      title: "Contact Section Title",
      type: "localizedString",
      group: "form",
    }),
    defineField({
      name: "contactSubtitle",
      title: "Contact Section Subtitle",
      type: "localizedString",
      group: "form",
    }),
    defineField({
      name: "eventTitle",
      title: "Event Details Section Title",
      type: "localizedString",
      group: "form",
    }),
    defineField({
      name: "eventSubtitle",
      title: "Event Details Section Subtitle",
      type: "localizedString",
      group: "form",
    }),
    defineField({
      name: "venueTitle",
      title: "Venue Section Title",
      type: "localizedString",
      group: "form",
    }),
    defineField({
      name: "venueSubtitle",
      title: "Venue Section Subtitle",
      type: "localizedString",
      group: "form",
    }),
    defineField({
      name: "cateringTitle",
      title: "Catering Section Title",
      type: "localizedString",
      group: "form",
    }),
    defineField({
      name: "cateringSubtitle",
      title: "Catering Section Subtitle",
      type: "localizedString",
      group: "form",
    }),
    defineField({
      name: "activitiesTitle",
      title: "Activities Section Title",
      type: "localizedString",
      group: "form",
    }),
    defineField({
      name: "activitiesSubtitle",
      title: "Activities Section Subtitle",
      type: "localizedString",
      group: "form",
    }),
    defineField({
      name: "anythingElseTitle",
      title: "Anything Else Section Title",
      type: "localizedString",
      group: "form",
    }),
    defineField({
      name: "anythingElseSubtitle",
      title: "Anything Else Section Subtitle",
      type: "localizedString",
      group: "form",
    }),
  ],

  preview: {
    prepare() {
      return { title: "Customize Page" };
    },
  },
});
