# EventPartner — TODO

> **Senast uppdaterad:** 2026-05-10

---

## ✅ KLART

### Grundplattform
- [x] Next.js App Router + TypeScript setup
- [x] Design token system + constraints
- [x] Alla bilder WebP-optimerade (365 MB → 9 MB)
- [x] GSAP ScrollTrigger + Framer Motion animationer
- [x] `prefers-reduced-motion` accessibility
- [x] Hydration error fixad (Lenis wrapper)

### Sidor (alla premium-nivå)
- [x] Startsida med Hero slideshow, Globe, Case Stories, VIP, Newsletter
- [x] VIP-sida (`/vip`)
- [x] Shop-sida (`/shop`)
- [x] Leadership med Pontus, Joakim, Malin + LinkedIn
- [x] Careers med perks + ansökningsformulär
- [x] FAQ med accordion + sökning
- [x] AI Assistant ("Coming Soon")
- [x] Security & Privacy (GDPR)
- [x] Help Center med kontaktformulär
- [x] Logotyp i transparent format

### Navigering
- [x] Uppdaterad navbar: VIP, Customize, Shop, About
- [x] Gamla sidor borttagna

### Shop — Frontend
- [x] Shopify Storefront API-klient (`shopify.ts`)
- [x] Cart mutations (create, add, update, remove)
- [x] CartContext med localStorage-persistering
- [x] ProductCard med variant-väljare, pris, badges
- [x] CartDrawer med quantity controls + checkout redirect
- [x] Graceful 401-fallback ("Coming Soon")
- [x] Product Designer med canvas
- [x] Lokala produktbilder (CORS fix)
- [x] Special Instructions-fält

### VPP (Video Plus Print)
- [x] VPP-bilder inlagda
- [x] VPP offertformulär byggt

### Länder & Regioner ✅ NY
- [x] 169 länder med venue-data (29 EU + 140 globala)
- [x] 5 venues per land med namn, stad, kapacitet, typ
- [x] Modulär filstruktur (europe/africa/asia-pacific/americas/middle-east)
- [x] 10 aktiva regioner (5 EU + 5 globala)
- [x] countryCoords.ts med koordinater för alla länder
- [x] Globe-rendering med alla landpunkter

---

## 🟡 PRIO 1 — Shopify Live

| Status | Uppgift | Notering |
|--------|---------|----------|
| ✅ | **Shopify Storefront Token** — fungerar, ingen 401 | Verifierad 2026-05-10 |
| ✅ | **Printify → Shopify koppling** — 7 produkter synkade | Crewneck, Cap, Long Sleeve, T-shirt, Mugg, Acrylic Sign |
| ✅ | **Produktbilder, priser, varianter** — laddas korrekt | SEK-priser, variant-väljare, Shopify CDN-bilder |
| 🟡 | **Verifiera end-to-end köpflöde** — Browse → Cart → Checkout | Kan testas nu — ingen blocker |
| ⏳ | **Produktkatalog-rensning** — ta bort irrelevanta produkter | Pontus/Malin |
| ⏳ | **Blanka framsidesmockups** — hämta rena front-mockups från Printify | Pontus/Malin |

---

## 🟡 PRIO 2 — Formulär & Backend

| Status | Uppgift | Beskrivning |
|--------|---------|-------------|
| ⏳ | **VPP Formulär Backend** | E-post till Scott/Pontus vid inskickad offertförfrågan |
| ⏳ | **Careers Formulär Backend** | E-post vid inskickad ansökan |
| ⏳ | **Help Center Formulär Backend** | E-post vid supportförfrågan |
| ⏳ | **Molnlagring för design-PNG** | Byt `/api/upload-design` från `public/uploads/` → Vercel Blob |

---

## 🟡 PRIO 3 — Innehåll & Design

| Status | Uppgift | Beskrivning |
|--------|---------|-------------|
| ⏳ | **Om oss-sida** (`/om-oss`) | Editorial storytelling, teammedlemmar, manifesto |
| ⏳ | **Bildspråk** | Mix av storslagna events + firmafester, välkomnande bilder |
| ⏳ | **Visuell polish** | Lila toning, grayscale→färg hover, gradient accents |
| ⏳ | **Blanka framsidesmockups** | Hämta rena front-mockups från Printify |
| ⏳ | **Byt placeholder-loggor** | Samsung, Volvo etc. → officiella eller bort |
| ⏳ | **Video** | Planera in videoplacering (Hero / Case Stories / Om oss) |
| ⏳ | **Svensk affärsordlista** | Ha en annan ordlista för Sverige som är bättre anpassad för professionellt affärsspråk (business Swedish) |
| ⏳ | **Datumflexibilitet (± 2 veckor)** | Lägg till "± 2 veckor" (± 2 weeks) som ett alternativ i datumväljarens flexibilitetsrad i offertförfrågan |
| ⏳ | **FAQ Layout-förbättring** | Skapa en tillhörande layoutsektion under FAQ-frågorna (det saknas en bra layout där nu) |
| ✅ | **FAQ Botten-CTA länk** | Fixa botten-CTA i FAQ så att den går till Help Center (`/help`) istället för startsidan |
| ⏳ | **Säkerhets-CTA borttagning** | Ta bort den stora säkerhets-CTA-knappen på säkerhetssidan |
| ⏳ | **Verksamhetsområde text-uppdatering** | Ändra "verksamt i hela Europa" till "verksamt i 175 länder" |
| ⏳ | **Uppdatera team-roller** | Ändra teammedlemmarnas roller: alla är medgrundare / co-founders (Pontus: VD, Malin: Managing Director, Joakim: CRO) |
| ⏳ | **Shop "Så fungerar det" steg** | Uppdatera stegen på shop-sidan: Steg 4 ska vara "Lägg order", och lägg till Steg 5: "När fakturan är betald printas dina produkter och levereras till din adress" |

---

## 🟢 PRIO 4 — CMS & Admin

| Status | Uppgift | Beskrivning |
|--------|---------|-------------|
| ⏳ | **Sanity CMS — statiska strängar** | Synka Hero, Services, Case Stories, FAQ till Sanity |
| ⏳ | **Sanity onboarding** | Visa Malin/Pontus hur de redigerar i Sanity Studio |
| ⏳ | **Länder i CMS** | Flytta venue-data till Sanity för enkel redigering |
| ⏳ | **Admin Dashboard** | Gömd `/admin` med orderstatus, team, content |

---

## 🔵 NICE TO HAVE — V2

- [ ] Help Center AI-bot (separat AI-backend)
- [ ] VPP Custom Configurator (pris-motor, specifikationer)
- [ ] VPP filuppladdning + video-validering
- [ ] SEO-sidor per destination
- [ ] i18n (SV/EN)
- [ ] PDF-generering
- [ ] Fler case stories med riktigt content
- [ ] Avancerad bildspråk med lila color grading
- [ ] Dold Team-flik (kampanjhantering)

---

## Snabb-sammanfattning

| Kategori | Klart | Kvar |
|----------|-------|------|
| Sidor & Navigation | ✅ 10/10 | — |
| Shop Frontend | ✅ 9/9 | — |
| Länder & Globe | ✅ 169 länder | — |
| **Shopify Live** | ✅ Token + produkter | **E2E-test + katalog-rensning** |
| **Formulär Backend** | ❌ | **3 formulär + molnlagring** |
| Innehåll & Design | ⏳ | 6 uppgifter |
| CMS & Admin | ⏳ | 4 uppgifter |
| V2 Features | ⏳ | 9 uppgifter |
