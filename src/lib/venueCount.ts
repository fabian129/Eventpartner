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

/**
 * Standard (non-VIP) inquiries: we don't promise a response time.
 * We start on every inquiry within 12h and the average response time is 23h.
 * Rewrites older CMS/default claims ("svar inom 24h", "från 48 timmar" …).
 * Also applies fixVenueCount.
 */
export function fixClaims(text: string, sv: boolean): string;
export function fixClaims(text: string | undefined, sv: boolean): string | undefined;
export function fixClaims(text: string | undefined, sv: boolean): string | undefined {
  if (!text) return text;
  let t = fixVenueCount(text, sv);
  t = t
    // FAQ: "Vår genomsnittliga svarstid är 23h, men vi återkommer alltid från 48 timmar"
    .replace(/Vår genomsnittliga svarstid är 23 ?h, men vi återkommer alltid (från|inom) (24|48) timmar/gi,
      "Vi påbörjar varje förfrågan inom 12 timmar och vår genomsnittliga svarstid är 23 timmar")
    .replace(/Our average response (rate|time) is 23 ?h, but we always (respond|get back to you) (from|within) (24|48) hours/gi,
      "We start working on every inquiry within 12 hours, and our average response time is 23 hours")
    .replace(/vi återkommer alltid (från|inom) (24|48) timmar/gi, "vi påbörjar varje förfrågan inom 12 timmar")
    .replace(/we always (respond|get back to you) (from|within) (24|48) hours/gi, "we start working on every inquiry within 12 hours")
    // About: "Förslag inom 24 timmar, alltid."
    .replace(/Förslag inom 24 timmar, alltid\./gi, "Vi påbörjar varje förfrågan inom 12 timmar.")
    .replace(/Proposals within 24 hours, always\./gi, "We start on every inquiry within 12 hours.")
    .replace(/alltid inom 24 timmar/gi, "med snitt-svarstid 23h")
    .replace(/always within 24 hours/gi, "with an average response time of 23h")
    // Service cards: "Alltid 3 förslag inom 24h."
    .replace(/(förslag|proposals)\s+(inom|within)\s+(24|48)\s?(h|timmar|hours)\b/gi, "$1")
    // Form disclaimer: "Svar inom 24h"
    .replace(/svar inom (24|48) ?h\b/gi, (m) => (m === m.toUpperCase() ? "PÅBÖRJAS INOM 12H" : "Påbörjas inom 12h"))
    .replace(/response within (24|48) ?h\b/gi, (m) => (m === m.toUpperCase() ? "STARTED WITHIN 12H" : "Started within 12h"))
    // "återkommer vi inom 23 timmar" → average
    .replace(/återkommer vi inom 23 timmar/gi, "återkommer vi i snitt inom 23 timmar")
    .replace(/get back to you within 23 hours/gi, "get back to you within 23 hours on average");
  return t;
}
