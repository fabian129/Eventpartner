/**
 * Cvent states its network has "nearly 340,000" venues (press release, May 2026),
 * so "340,000+" overstates it. Some CMS (Sanity) texts still say "340 000+" —
 * this normalises them wherever they are rendered.
 *
 *  - A stat value on its own ("340,000+")  → "~340 000" / "~340,000"
 *  - Inside a sentence                     → "närmare 340 000" / "nearly 340,000"
 */
const PATTERN = /340[\s,. ]000\+/g;

export function fixVenueCount(text: string, sv: boolean): string;
export function fixVenueCount(text: string | undefined, sv: boolean): string | undefined;
export function fixVenueCount(text: string | undefined, sv: boolean): string | undefined {
  if (!text) return text;
  if (/^\s*340[\s,. ]000\+\s*$/.test(text)) return sv ? "~340 000" : "~340,000";
  return text.replace(PATTERN, (_m, offset: number, whole: string) => {
    const before = whole.slice(0, offset);
    const startOfSentence = /(^|[.!?]\s+)$/.test(before);
    const word = sv ? "närmare 340 000" : "nearly 340,000";
    return startOfSentence ? word.charAt(0).toUpperCase() + word.slice(1) : word;
  });
}
