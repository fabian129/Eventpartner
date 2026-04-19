/**
 * Locale helper — determines which language to show.
 * Default: "en" (English) for tomorrow's meeting.
 *
 * Usage in components:
 *   const t = (field: { en?: string; sv?: string }) => localize(field);
 */

export type Locale = "en" | "sv";

/** Current default locale — change to "sv" for Swedish */
export const DEFAULT_LOCALE: Locale = "en";

/** Extract the right language from a localized field */
export function localize(
  field: { en?: string; sv?: string } | undefined | null,
  locale: Locale = DEFAULT_LOCALE
): string {
  if (!field) return "";
  return field[locale] || field.en || field.sv || "";
}
