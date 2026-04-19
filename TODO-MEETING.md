# EventPartner — Post-möte TODO

> **Möte:** 2026-04-19 | **Deadline:** Live imorgon (2026-04-20)
> **Status:** Kunden var "tok nöjda" med grunden. Behöver polish, identitet, och nya sidor.

---

## 🔴 Kritiskt — Måste göras före live

### Identitet & Visuell röd tråd
- [ ] **Minimalistisk logga** — "EP" som ikon + globen för sig
- [ ] **Byta Tiffany accent** — `#81D8D0` → `#6AD8D2` (global find/replace i hela kodbasen)
- [ ] **Bildspråk med lila drag** — bilder ska ha subtil lila/purple toning
- [ ] **Svartvita bilder → färg vid hover** — grayscale default, färg vid hover
- [ ] **Mörka sektioner med liv** — bento-bildgrids i bakgrunden (strukturerade bilder bakom content)
- [ ] **Mindre "kalt"** — subtila detaljer: gradient accents, texturer, micro-animations

### Bildval & Känsla
- [ ] **Mix av storslagna events OCH trevliga firmafester** — visa bredden
- [ ] **Välkomnande bilder** — människor som är glada, värme. "Åkes Bygg ska känna sig välkomna"
- [ ] **Uppdatera bildbiblioteket** — konferenser, kickoffs, mingel, middagar, teambuilding, firande

### Sektioner att ändra
- [ ] **Ta bort TestimonialsSection** — helt bort från sidan
- [ ] **Case Stories = mörk sektion** — scrollar man in i den → transition ljus→mörk
- [ ] **Logo Banner** — stå still, stora ikoner (inte scrollande ticker)
- [ ] **Pop-up ruta** — exit-intent / bottom-of-page. Samla in email/namn

### Navbar
- [ ] **Uppdatera navigation:**
  - Tjänster
  - Skräddarsy
  - Bli EventPartner VIP
  - Webbshop
  - Om oss

### Nyhetsbrev
- [ ] **Nyhetsbrev-CTA på fler ställen** — väv in signup i fler sektioner
- [ ] **Även inne i VIP-sidan**

---

## 🟡 Viktigt — Bör göras före live om tid finns

### Nya sidor
- [ ] **Om oss-sida** (`/om-oss`) — Editorial storytelling
  - Varför de startade, erfarenhet, vision
  - Info om varje teammedlem (bio + bild)
  - Manifesto-stil, tidningskänsla

- [ ] **Förmånskund/VIP-sida** (`/vip`) — Premium membership
  - Testa med Rich Purple (#7851A9)
  - Nyhetsbrev-signup integrerad

### Video
- [ ] **Planera in videoplacering** — Hero? Case stories? Om oss?

### CMS (Sanity)
- [ ] **Koppla Sanity** — så Malin kan gå in och ändra text själv
  - Schemas för: Hero, Services, Case Stories, About, FAQ, etc.
  - Alla texter redigerbara från Sanity Studio
  - Vi har en skill för detta → följ `sanity-integration` workflow

---

## 🟢 Nice to have — Framtida

- [ ] Bildspråk med lila toning — avancerad color grading
- [ ] Fler case stories med riktigt content
- [ ] SEO-sidor per destination
- [ ] i18n (SV/EN)
- [ ] PDF-generering

---

## 📐 Design-beslut från mötet

| Beslut | Status | Notering |
|---|---|---|
| Grundstil (clean, tech) | ✅ Godkänd | Behåll men gör mindre kalt |
| Bilder: grayscale → färg hover | ✅ Beslutad | Alla bildgrids |
| Testimonials | ❌ Bort | Ta bort helt |
| Case Stories | ✅ Behåll | Mörk sektion med scroll-transition |
| Logo Banner | 🔄 Ändra | Stilla, stora ikoner |
| Navbar | 🔄 Ändra | 5 items: Tjänster, Skräddarsy, VIP, Webbshop, Om oss |
| Nyhetsbrev | 🔄 Utöka | Fler placements + i VIP-sida |
| Pop-up CTA | ✅ Ny | Exit-intent |
| Om oss-sida | ✅ Ny | Editorial storytelling |
| VIP-sida | ✅ Ny | Rich purple, premium |
