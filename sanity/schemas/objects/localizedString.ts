import { defineType } from "sanity";

/** Reusable localized string (single line) */
export const localizedString = defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fields: [
    { name: "en", title: "English", type: "string" },
    { name: "sv", title: "Svenska", type: "string" },
  ],
});
