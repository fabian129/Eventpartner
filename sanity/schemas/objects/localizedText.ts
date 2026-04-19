import { defineType } from "sanity";

/** Reusable localized text (multiline) */
export const localizedText = defineType({
  name: "localizedText",
  title: "Localized Text",
  type: "object",
  fields: [
    { name: "en", title: "English", type: "text", rows: 3 },
    { name: "sv", title: "Svenska", type: "text", rows: 3 },
  ],
});
