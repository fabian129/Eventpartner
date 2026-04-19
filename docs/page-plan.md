# EventPartner — Sitemap & Page Plan

> Baserat på kundmöte 2026-04-19 + page-planner skill
> **Nyckelprincip:** Varje sektion måste ha ett klart "varför" — om du inte kan förklara varför den finns, skär bort den.

---

## Business Goal
Få företag att skicka in eventförfrågningar (boka event via formulär).

## Target Audience
B2B: eventansvariga på medelstora till stora företag (Åkes Bygg → Ericsson).
Blandning av "wow"-kunder och "välkomnande"-kunder. Sidan måste kännas maffig men icke-exkluderande.

## Tone & Feel
- Clean tech-estetik (behåll) + subtilt liv (bakgrundslinjer, grid-dots, struktur)
- Svartvita bilder → färg vid hover
- Lila bildtoning (subtil, EJ gradient-overlay)
- Välkomnande: bilder med människor, mingel, firande — inte bara tomma salar

---

## 🌐 Sidstruktur (Routing)

```
/                  → Startsida (konvertering)
/om-oss            → Editorial storytelling (förtroende)
/vip               → EventPartner VIP / Förmånskund (premium)
/land/[slug]       → Destination-sidor (redan finns)
```

**Navbar:** `Tjänster` · `Skräddarsy` · `Bli EventPartner VIP` · `Webbshop` · `Om oss`

---

## 📄 Startsidan `/` — Section Flow

### 1. Hero
- **Mål:** Hook + kommunicera vad EP gör
- **Innehåll:** Stor rubrik, CTA "Boka Event", 3D-glob
- **Komponent:** `Hero.tsx` ✅ (finns)

### 2. Logo Banner
- **Mål:** Social proof — "stora företag litar på oss"
- **Innehåll:** Stilla logotyper, stora ikoner
- **Komponent:** `LogoTicker.tsx` ✅ (uppdaterad)

### 3. Video
- **Mål:** Visa stämning/känsla — "så här ser ett EP-event ut"
- **Innehåll:** Embedded video med venue-footage
- **Komponent:** `VideoSection.tsx` ✅

### 4. Tjänster (välj EN av tre alternativ)
- **Mål:** Förklara vad EP erbjuder
- **Alternativ A:** `ServiceShowcase` — Bento grid, editorial (mest "designad")
- **Alternativ B:** `ServiceListClean` — Clean lista med levande ikoner (renast)
- **Alternativ C:** `ServiceCardsPersonal` — Bildkort i glasmorph container (varmast)
- **BESLUT KRÄVS:** Vilken behåller vi? De andra tas bort.

### 5. Hur det fungerar
- **Mål:** Demystifiera processen — "det är enkelt att jobba med oss"
- **Innehåll:** 3-stegs process
- **Komponent:** `HowItWorksSection.tsx` ✅

### 6. Skräddarsy ditt event (Formulär)
- **Mål:** KONVERTERA — primär CTA
- **Innehåll:** Namn, email, eventtyp, antal gäster, datum
- **Komponent:** `RequestFormSection.tsx` ✅

### 7. Case Stories (DARK)
- **Mål:** Bevisa kvalitet — "vi har levererat åt Ericsson, Spotify..."
- **Innehåll:** Horisontell scroll med stora bildkort, stats per event
- **Komponent:** `CaseStoriesSection.tsx` ✅ (mörk, rounded top)

### 8. Om oss (mini)
- **Mål:** Bygga förtroende — "det här är människorna bakom EP"
- **Innehåll:** Manifesto-text + teamgrid (länka till /om-oss för fullversion)
- **Komponent:** `AboutSection.tsx` ✅

### 9. FAQ
- **Mål:** Övervinna invändningar
- **Innehåll:** Vanliga frågor om priser, process, leverans
- **Komponent:** `FAQSection.tsx` ✅

### 10. Nyhetsbrev (footer-area)
- **Mål:** Fånga leads som inte är redo att konvertera
- **Innehåll:** Email signup
- **Komponent:** `NewsletterSection.tsx` ✅

### Footer
- **Komponent:** `Footer.tsx` ✅

### Övrigt (popup)
- **Exit-intent popup** — triggas vid mouse-leave eller 80% scroll
- **Komponent:** `ExitIntentPopup.tsx` ✅

---

## 🗑️ Sektioner att TA BORT från startsidan

| Sektion | Anledning |
|---|---|
| `TestimonialsSection` | ❌ Borttagen per kundbeslut |
| `CountryFlagsSection` | ❓ Oklart syfte — kan flyttas till destination-sidor |
| `ImageBreaker` | ❓ Fullbleed-bild utan tydlig funktion |
| `CinematicQuoteBreak` | ❓ "Quote break" — kan ersättas av casen |
| `WebshopTeaser` | ❓ Behövs den på startsidan? Navbar har "Webbshop"-länk |
| `SectionTransition` (line/diamond) | ❓ Visuellt element — behåll om det ger "liv" |
| Extra tjänstesektioner (2 av 3) | ❌ Behåll 1, ta bort resten |

---

## 📄 `/om-oss` — Editorial Storytelling

### Section Flow
1. **Hero** — "EVENTPARTNER" masthead + stor manifestotext
2. **Bakgrund** — Varför de startade, erfarenhet, vision (stor editorial text)
3. **Stats** — 36 länder, 2000+ events, 10+ år
4. **Teamet** — Porträtt + bio per person (Pontus, Malin, Joakim + ev. fler)
5. **Nyhetsbrev CTA** — inline signup
6. **CTA** — "Boka Event" eller "Kontakta oss"

---

## 📄 `/vip` — EventPartner VIP / Förmånskund

### Koncept
Premium-sida med Rich Purple (#7851A9) som accentfärg.
Visar exklusiva förmåner för återkommande kunder.

### Section Flow
1. **Hero** — Purple-accent, "Bli EventPartner VIP"
2. **Förmåner** — Lista med VIP-benefits (prioriterad service, rabatter, dedikerad kontakt)
3. **Pricing/Tiers** — Om relevant (Guld/Platinum)
4. **Nyhetsbrev** — Signup som del av VIP-upplevelsen
5. **CTA** — "Ansök om VIP-status"

---

## 🎨 Globalt: "Liv" i sektionerna

Istället för att lägga "saker" i bakgrunden, använd **subtila strukturelement**:

| Element | Var | Hur |
|---|---|---|
| **Grid-dots** | Ljusa sektioner | Subtila prickar i bakgrunden (opacity 0.03-0.05) |
| **Linjer** | Section-transitions | Animerade vertikala/horisontella linjer |
| **Gradient mesh** | Hero, CTA-sektioner | Mjuka färgfält i bakgrunden |
| **Grayscale→färg** | Alla bilder | CSS filter: `grayscale(1)` → `grayscale(0)` on hover |

**INTE:** Gradient-overlays på bilder, lila toning som overlay, flashiga partiklar.

---

## ✅ Beslut som behövs från dig

1. **Vilken tjänstesektion?** A (bento), B (lista), eller C (bildkort)?
2. **CountryFlags** — behåll på startsidan eller flytta till /land?
3. **ImageBreaker + CinematicQuoteBreak** — behåll eller bort?
4. **WebshopTeaser** — startsidan eller egen sida?
5. **SectionTransitions** — behåll linjer/diamonds?
