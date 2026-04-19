# EventPartner — Sitemap & Page Plan

> **Senast uppdaterad:** 2026-04-19 18:37
> **Status:** Sidstruktur beslutad. Editorial moodboard-stil implementerad.
> **Nyckelprincip:** Moodboard-DNA i alla sektioner — mono-labels, stor typografi, asymmetriska headers, inga generiska pill-badges.

---

## Business Goal
Få företag att skicka in eventförfrågningar (boka event via formulär).

## Target Audience
B2B: eventansvariga på medelstora till stora företag.
Sidan ska känna maffig men välkomnande.

## Design DNA — "Moodboard-stil"
- **Mono-labels** top-left/right (`EVENTPARTNER — TJÄNSTER` / `FULLSERVICE LEVERANS`)
- **Stor heading** som ankare — ingen pill-badge ovanför
- **Bold description** text på display-font, inte liten muted text
- **Metrics-rad** utspridd med mono-labels ovanför värden
- **Mörka kort** med strukturerat innehåll (labels, stats, CTAs)
- **Grayscale → färg** på bilder vid hover
- **Bakgrundsstruktur** (grid/linjer) — implementeras globalt (ej per sektion)

---

## 🌐 Routing

```
/                  → Startsida (konvertering)
/om-oss            → Editorial storytelling (förtroende)
/vip               → EventPartner VIP / Förmånskund (premium)
/skraddarsy        → Utökat formulär (komplex eventplanering)
/land/[slug]       → Destination-sidor (finns)
```

**Navbar:** `Tjänster` · `Skräddarsy` · `Bli EventPartner VIP` · `Webbshop` · `Om oss`

---

## 📄 Startsidan `/` — Beslutad sektionsordning

### 1. Hero ✅
Stor rubrik, CTA, 3D-glob. `Hero.tsx`

### 2. Logo Banner ✅
Stilla logotyper, stora ikoner. `LogoTicker.tsx`

### 3. Video ✅
Venue-footage. Process (HowItWorks) ingår i videon. `VideoSection.tsx`

### 4. Country Flags ✅
Visa bredden — 36 länder. `CountryFlagsSection.tsx`

### 5. Formulär (TIDIGT!) ✅
Konvertera direkt. Mörkare bakgrund (#EAEAED), starkare inputkontrast. `RequestFormSection.tsx`

### 6. Tjänster — Moodboard-kort ✅
**Beslut: Bildkort (variant C) i moodboard-stil.**
- 3 kort-varianter: `image` (fullbleed bakgrundsbild), `stat` (stor siffra), `cta` (button + checkmarks)
- Moodboard-header: mono-labels, stor heading, bold description, metrics-rad
- Container 1400px
- `ServiceCardsPersonal.tsx`

### 7. CTA "Skapa ert nästa event" ✅
Fullbleed break med bakgrundsbild. `CinematicQuoteBreak.tsx`

### 8. Case Stories (mörk) ✅
Horisontell scroll, moodboard-header. `CaseStoriesSection.tsx`

### 9. Newsletter CTA ✅
Inline signup. `NewsletterInline.tsx`

### 10. Om oss (mini) ✅
Editorial manifesto + team. Länkar till `/om-oss`. `AboutSection.tsx`

### 11. FAQ ✅
Moodboard-header, accordion. `FAQSection.tsx`

### Footer ✅
`Footer.tsx`

### Exit-intent popup ✅
Mouse-leave / 80% scroll trigger. `ExitIntentPopup.tsx`

---

## 🗑️ Borttagna sektioner (beslutade)

| Sektion | Status |
|---|---|
| `TestimonialsSection` | ❌ Borttagen (kundmöte) |
| `HowItWorksSection` | ❌ Borttagen (process ingår i videon) |
| `ServiceShowcase` (bento) | ❌ Ej vald — bildkort vann |
| `ServiceListClean` (lista) | ❌ Ej vald — bildkort vann |
| `ImageBreaker` | ❌ Borttagen |
| `WebshopTeaser` | ❌ Borttagen från startsidan |
| `SectionTransitions` | ❌ Borttagen — ersätts av global grid/linjer |
| Extra `NewsletterSection` | ❌ Ersatt av `NewsletterInline` |

---

## 📄 `/om-oss` — Editorial Storytelling (EJ BYGGD)

1. Hero — "EVENTPARTNER" masthead + manifestotext
2. Bakgrund — Varför de startade, erfarenhet, vision
3. Stats — 36 länder, 2000+ events, 10+ år
4. Teamet — Porträtt + bio
5. Nyhetsbrev CTA
6. CTA — "Boka Event"

---

## 📄 `/vip` — EventPartner VIP (EJ BYGGD)

Rich Purple (#7851A9) accent. Exklusiva förmåner.

1. Hero — Purple-accent
2. Förmåner — VIP-benefits
3. Pricing/Tiers
4. Nyhetsbrev
5. CTA — "Ansök om VIP-status"

---

## 🎨 Kvarvarande polish — Globalt

| Uppgift | Status |
|---|---|
| Global bakgrundsstruktur (grid/linjer) | ⬜ Ej påbörjad |
| Logga — EP ikon + glob | ⬜ User gör |
| Bilder med lila toning (subtil) | ⬜ Ej påbörjad |
| Välkomnande bilder (människor, mingel) | ⬜ Behöver bildval |
| Sanity CMS-integration | ⬜ Ej påbörjad |
| Responsive fine-tuning | ⬜ Ej testad |
