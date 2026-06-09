# EventPartner — LAUNCH-TODO

> **Single source of truth inför lansering.** Skapad 2026-06-08 efter full kodbas-audit (8 delsystem).
> Ersätter de gamla listorna (`TODO.md`, `EP-PONTUS-TODO.md`, `BACKEND-TODO.md`, `TODO-MEETING.md` → flyttade till `docs/archive/`).

## Bekräftad lanseringsmodell
- **Ingen betalning / ingen kund-checkout.** Webshoppen är en **offertfunnel**.
- Kunden designar merch (Printful EDM) → väljer antal per storlek → **"Request Quote"**.
- Vid offertförfrågan:
  1. Mejl till EP-teamet (Resend, `merch-quote`) — som idag.
  2. **En Printful-draft-order skapas på EP:s konto** (`confirm:false`) med rätt varianter + designtemplate.
  3. EP fyller i adress/detaljer i Printful, lägger ordern själva och skickar offert/faktura till kunden.
- Den kund-vända `/checkout`-sidan (adress + "Payment integration coming soon") **tas bort** — den behövs inte i denna modell och är en footgun.

**Stack:** Next.js 16 (App Router) · next-intl (en/sv) · Sanity CMS (`fikqs32e`) · Printful v2 · Resend · GSAP/Framer/Lenis/cobe · Vercel.

---

## Statuslegend
`[ ]` att göra · `[~]` påbörjad · `[x]` klar · 🔴 blocker · 🟠 high · 🟡 medium · 🟢 low

---

## 📨 Klientfeedback — go-live-checklista (från Supabase: EventPartner-klienten)

> Källa: `inbound_emails` (Pontus/Malin/Joakim @hardcallsales.se), hämtat av email-agenten. Betalningsmodell **bekräftad av Pontus: "Alternativ A — Offertflöde"** = det vi byggt. ✅

### A. Malins sidogranskning — 15 punkter (2026-05-29)
| # | Status | Punkt |
|---|--------|-------|
| 1 | `[ ]` | **VIP-sidan:** alla CTA går till förfrågningsformuläret. Ska istället vara ett **eget pop-up-formulär** där man fyller i uppgifter och **bokar möte** om VIP-programmet. |
| 2 | `[ ]` | **Event-förfrågan:** budget ska vara **fritt textfält**, inte dropdown. |
| 3 | `[ ]` | **Flexibla datum** förvirrar. Under "exact dates": välj datum från→till + möjlighet till "extended" från ursprungsdatumet (ett val = hela månaden funkar). |
| 4 | `[ ]` | **VIP-medlemskap:** lägg till "**33% extra discount in our webshop — on everything**" + att VIP-medlemmar erbjuds **årlig ESG-/hållbarhetsrapportering** (ESG, CSRD, NIS2-liknande governance, sustainability procurement, travel management). Vid de 8 sektionerna till höger + på VIP-sidan. |
| 5.1 | `[~]` | **Säkerhetspåståenden:** verifiera att de är sanna, annars formulera "arbetar ständigt mot att följa". → **Löst av Pontus nya text** (se B4). |
| 5.2 | `[ ]` | **Compliance-loggor:** lägg upp (egengjorda, kommer från klient) och låt rulla som loggorna vid videokorten. Tillåtna citat: *"Designed with GDPR principles"*, *"Security framework aligned with ISO 27001"*, *"Following SOC 2 best practices"*, *"Enterprise-grade security"*. Finstilt längst ner på säkerhetssidan: *"Security and privacy practices are internally implemented and continuously improved based on industry frameworks."* |
| 6 | `[ ]` | Mejladress ska vara **privacy@eventpartner.io**. |
| 7 | `[ ]` | **Säkerhets-CTA** ("boka event") → ska istället gå till formulär/mejl till privacy@. (matchar audit: ta bort stora säkerhets-CTA:n) |
| 8 | `[ ]` | **Live-chat** på sidan? + i Help Center: lägg till "**boka 15 min möte**" längst ner. (cal.com) |
| 9 | `[ ]` | **Video** på Video-boxen (med filmerna på EP-loggan) — väntar på material. |
| 10 | `[ ]` | **Ta bort "94% kundnöjdhet" helt.** |
| 11 | `[ ]` | Skriv att vi är **baserade i Medelhavet och Skandinavien**. |
| 12 | `[ ]` | **Gamla webshoppen visas på förstasidan**, inte Printful-produkterna — verifiera/byt. |
| 13 | `[ ]` | **Ta bort "vi tar en fee när de bokar"** (längst ner på förstasidan) — stämmer ej. + fel siffror: **300,000+ / 175 länder**. |
| 14 | `[ ]` | Visar **169 länder, inte 175** — USA saknas t.ex. (matchar audit: `united-states` trasig + 30 länder utan koordinater). **HIGH.** |
| 15 | `[ ]` | Bolaget heter nu **EventPartner Global AB** — står fel längst ner (footer). |

### B. Färdig copy levererad av klienten (klart att klistra in — full text i `inbound_emails`)
| # | Status | Innehåll |
|---|--------|----------|
| B1 | `[ ]` | **Ny hero (Pontus 06-08):** SV *"Allt ditt event behöver. En partner — EventPartner."* / EN *"Everything your event needs. One partner — EventPartner."* + subline (SV) *"Beskriv ert event. Vi hittar de bästa lokalerna och leverantörerna, jämför alternativen, förhandlar priserna och hanterar hela bokningsprocessen från start till mål."* / (EN) *"Tell us what you need. We'll source venues and event services, compare options, negotiate rates and manage the entire booking process."* Ersätt "world's largest selection of venues". |
| B2 | `[ ]` | **Förstaside-stats (Malin 06-08):** ersätt "300,000+ venues · 175 countries · 24h response" med sublinen ovan. 5 roterande bilder ska beskriva vad de gör; **autentiska bilder, ej AI-look**. På 5:e bilden: byt "175 länder" → "300,000+ venues". |
| B3 | `[ ]` | **AI-assistent-sidan (Malin 06-03):** full SV-copy levererad ("EventPartner AI – Event Assistant…"). Lägg in snyggt. |
| B4 | `[ ]` | **Säkerhet/Privacy-sidan (Pontus 06-08):** full **SV + EN**-text levererad (juridiskt säker — säger ISO 27001-*principer*, ej certifierad). Ersätt nuvarande säkerhetssida. Kontakt: privacy@eventpartner.io. |

### C. Integrationer klienten väntar på
| Status | Punkt |
|--------|-------|
| `[ ]` | **Cal.com:** koppla "Boka möte"-knappar. `cal.com/eventpartner` finns; videokort → `cal.eu/premium-videobrochures`. Behöver ev. Pontus/Malin/Joakim-användarnamn. |
| `[x]` | **Betalning = Alternativ A (offertflöde)** — bekräftat av Pontus, byggt i batch 1. |

---

## 🔴 BLOCKERS — måste vara klara före lansering

| Status | Uppgift | Detalj / fil |
|--------|---------|--------------|
| `[x]` | **Koppla offert → Printful-draft** | ✅ Klart 2026-06-08. `handleMerchQuote` i [`api/contact/route.ts`](src/app/api/contact/route.ts) skapar nu draft via `createOrder(recipient, orderItems, {confirm:false})` server-side, klistrar in Printful order-ID + leveransadress i offertmejlet, och returnerar `draftOrderId`. Degraderar tryggt: om draften fallerar skickas mejlet ändå (leaden tappas aldrig). |
| `[x]` | **Adresshantering för draft** | ✅ Klart — adressfält (adress, ev. rad 2, stad, postnr, delstat, **land som select från 175-listan**) tillagda i offert-drawern [`PrintfulCartDrawer.tsx`](src/components/shop/PrintfulCartDrawer.tsx) + i18n-nycklar i en/sv. Validering kräver adress/stad/postnr/land. |
| `[ ]` | **⚠️ Live-testa draft + sätt `PRINTFUL_STORE_ID`** | Draft-skapandet behöver verifieras mot live Printful (ej testat — vill inte skapa testorder på ert konto utan klartecken). Order-endpoints kan kräva `PRINTFUL_STORE_ID` (saknas i `.env.local`). Lägg till den + gör en testförfrågan och kontrollera att draften dyker upp i Printful → Orders. |
| `[x]` | **3 fejk-formulär som tappar leads** | ✅ Klart 2026-06-08. Per-lands-formuläret [`CountryPageClient.tsx`](src/app/[locale]/land/[slug]/CountryPageClient.tsx) → `event-inquiry` (controlled + telefonfält + land auto). [`NewsletterSection.tsx`](src/components/layout/NewsletterSection.tsx) → `newsletter`. [`ExitIntentPopup.tsx`](src/components/ui/ExitIntentPopup.tsx) → ny `popup-lead`-handler (namn/e-post/företag). Alla med loading/error/success-UX. tsc rent. |
| `[ ]` | **CONTACT_EMAIL i prod** | `.env.local` pekar på `fabian@zaitex.net` (test). Sätt rätt mottagare i Vercel (eller lämna osatt → default `pontus@/malin@/joakim@eventpartner.io`). |
| `[ ]` | **Verifiera Resend-domän** | `eventpartner.io` (SPF/DKIM) måste vara verifierad i Resend-kontot som äger prod-`RESEND_API_KEY`, annars skickas inga mejl. |
| `[ ]` | **Env-vars i Vercel prod** | Sätt alla: `NEXT_PUBLIC_SANITY_*`, `SANITY_WRITE_TOKEN`, `SANITY_REVALIDATION_SECRET`, `PRINTFUL_API_KEY`, `RESEND_API_KEY`, `CONTACT_EMAIL`. (Shopify-varianterna kan tas bort.) |

---

## 🟠 HIGH — bör vara klart före lansering

| Status | Uppgift | Detalj / fil |
|--------|---------|--------------|
| `[ ]` | **Ta bort död Shopify-kod** | Avmontera Shopify `CartProvider`/`CartDrawer` i [`ShopProvider.tsx`](src/components/shop/ShopProvider.tsx). Radera `shopify.ts`, `CartContext.tsx`, `ProductCard.tsx`, `ProductDesigner*.tsx`, `CartDrawer.tsx`. Återkalla Shopify-token. |
| `[ ]` | **Ta bort `/checkout`** | Kund-checkout behövs ej (ingen betalning). Behåll `api/printful/order` (används av draft-flödet). |
| `[ ]` | **Säkerhetsheaders** | Lägg `headers()` i [`next.config.ts`](next.config.ts): CSP (måste tillåta Printful EDM-iframe), HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. |
| `[ ]` | **Rate-limit + spam-skydd på `/api/contact`** | Honeypot + IP-rate-limit (Upstash/Vercel KV). Newsletter-handlern kan idag mejl-bomba valfri adress. |
| `[ ]` | **`robots.ts` + `sitemap.ts`** | Saknas helt. ~350 land-sidor × 2 språk utan sitemap. Lägg i `src/app/`. |
| `[ ]` | **`not-found.tsx` + `error.tsx`** | Branded 404/500 saknas (bara `studio/loading.tsx` finns). |
| `[ ]` | **OG/social-metadata + `metadataBase`** | Ingen OpenGraph/Twitter/`metadataBase` någonstans → trasiga länkförhandsvisningar (LinkedIn/Slack). Lägg i [`[locale]/layout.tsx`](src/app/[locale]/layout.tsx) + `opengraph-image`. |
| `[ ]` | **Juridiska sidor saknas** | Footer länkar till `/privacy`, `/terms`, `/cookies`, `/gdpr` → 404. Skapa sidorna (eller ta bort länkarna). GDPR/trust för en sajt som marknadsför dataskydd. |
| `[ ]` | **Sanity: registrera revalidate-webhook** | Skapa GROQ-webhook i sanity.io/manage → prod `/api/revalidate` med `SANITY_REVALIDATION_SECRET`. Utöka [`revalidate/route.ts`](src/app/api/revalidate/route.ts) att mappa alla `_type` → rätt path (faqPage→/faq osv.), inte bara `/`. |
| `[ ]` | **Sanity: seeda alla 11 sidor i prod** | Bara `homePage` är säkert seedad. Kör seed-skripten mot prod-datasetet och verifiera i `/studio`, annars faller subsidor tyst tillbaka på hårdkodad engelska. |
| `[ ]` | **Fixa trasiga venue-bilder (5 länder)** | Slug↔mapp-glapp: `united-states`→mapp heter `usa`; `cuba/haiti/martinique/guadeloupe` saknar mappar. Döp om/lägg till + uppdatera `IMAGE_COUNTS`. |

---

## 🟡 MEDIUM

| Status | Uppgift | Detalj / fil |
|--------|---------|--------------|
| `[ ]` | **`customizePage` saknas i Studio** | Finns i schema men inte i `PAGE_SINGLETONS` ([`sanity.config.ts`](sanity.config.ts)) → klienten kan inte redigera Customize-sidan. |
| `[ ]` | **Dedikerad Sanity läs-token** | Skapa `SANITY_API_READ_TOKEN` för live/preview istället för att återanvända write-token. |
| `[ ]` | **Städa korrupt seed-text** | "European"→"the globean"-korruption + inkonsekventa siffror (36 vs 175 länder, 300k vs 360k) i seed-skript blir klientens startinnehåll. |
| `[ ]` | **Lokalisera hårdkodad engelska på `/sv`** | `CheckoutContent` (tas bort), `CountryPageClient`, Customize-optionsarrayer renderar engelska även på `/sv`. |
| `[ ]` | **Lokaliserad per-sid-metadata** | Statisk `metadata` är hårdkodad engelska; använd `generateMetadata` + `alternates.languages` (hreflang en↔sv). |
| `[ ]` | **Locale-aware interna länkar** | 17 filer använder vanlig `next/link` → tappar språkprefix vid navigering. Byt till `@/i18n/navigation`. |
| `[ ]` | **Globe-perf** | Två duplicerade cobe-globber i bundlen (`GlobeHero` används, `GlobeSection` är död). Radera den döda. Lägg `prefers-reduced-motion` + paus när offscreen/flik dold. |
| `[ ]` | **Montera analytics** | `@vercel/analytics` installerat men aldrig monterat. Lägg `<Analytics/>` i layout (eller ta bort beroendet). |
| `[ ]` | **HTML-escape i 2 handlers** | `handleEventInquiry` + `handleVPPQuote` interpolerar oescapad input i mejl-HTML. `esc()` finns redan — applicera. |
| `[ ]` | **Printful cache-write fungerar ej i prod** | `fs.writeFile` i [`products/route.ts`](src/app/api/printful/products/route.ts:124) → `?revalidate=true` skriver inte i prod (read-only FS). Cachen *läses* fint; flytta refresh till build-steg eller KV om katalogen ska kunna uppdateras live. |
| `[ ]` | **Hjälp-sida fel e-post/telefon** | [`HelpCenterContent.tsx`](src/app/[locale]/help/HelpCenterContent.tsx) listar `support@eventpartner.com` (fel TLD, .io används) + platshållartelefon. |
| `[ ]` | **Dubbletter länder på startsida** | `CountryFlagsSection` hårdkodar Austria + Cyprus som saknas i COUNTRIES → döda kort. Lägg till i data eller ta bort. |
| `[ ]` | **30 länder saknar globe-koordinater** | Inkl. `united-states` + `new-zealand` → ingen globe-prick. |

---

## 🟢 LOW / polish

| Status | Uppgift |
|--------|---------|
| `[ ]` | Ta bort död `ThemeProvider`/`.dark`-palett (ingen toggle finns) |
| `[ ]` | Dubbel font-laddning (Google `@import` + `next/font`) — ta bort `@import` i `globals.css` |
| `[ ]` | Riktiga sociala länkar i Footer (nu bara `instagram.com`/`linkedin.com`/`facebook.com`) |
| `[ ]` | Beskrivande alt-text på hero-bilder (alla = "Premium Event") |
| `[ ]` | Ta bort 2 kvarvarande `console.log` ([`PrintfulDesignMaker.tsx:161`](src/components/shop/PrintfulDesignMaker.tsx:161), [`products/route.ts:125`](src/app/api/printful/products/route.ts:125)) |
| `[ ]` | Ta bort `sanity_doc_dump.json` ur repo-roten (eller gitignore) |
| `[ ]` | Careers-formulär mappar LinkedIn-URL till `phone`-fältet → eget fält |
| `[ ]` | Reduced-motion-guards för GSAP/Framer/cobe/Lenis (inte bara CSS) |
| `[ ]` | A11y: `role="dialog"`/Esc/focus-trap på ExitIntentPopup + mobilmeny, skip-to-content |

---

## ❓ Beslut / access som behövs från Fabian

1. **Resend:** är `eventpartner.io` verifierad (SPF/DKIM) i kontot för prod-nyckeln?
2. **Vercel:** är alla env-vars satta i prod? Vilken adress ska leads gå till?
3. **Draft-adress:** ska offertformuläret samla in land/adress, eller skapar vi draft med EP-adress som platshållare?
4. **Språk:** ska `sv` vara default för svenska marknaden (nu `en`)?
5. **Juridik:** finns privacy/terms/cookies-texter någonstans, eller skrivs de från scratch?
6. **Domän:** vad är den kanoniska prod-domänen (behövs för `metadataBase`/sitemap/canonical/hreflang)?
7. **Sociala medier + support:** riktiga handles + korrekt support-e-post/telefon.

---

## Föreslagen arbetsordning
1. **Lead-flödet** (blockers): 3 fejk-formulär + offert→Printful-draft. *(störst affärsvärde)*
2. **Städning:** ta bort Shopify-kod + `/checkout`.
3. **SEO/infra:** `robots`/`sitemap`/`not-found`/`error` + OG-metadata + säkerhetsheaders.
4. **Sanity prod:** seeda 11 sidor, registrera webhook, `customizePage`-singleton.
5. **Content/legal:** juridiska sidor, venue-bildfixar, lokaliseringsluckor.
6. **Polish:** låg-prio-listan.
