# EventPartner — TODO

> **Senast uppdaterad:** 2026-05-06

---

## Shop (Prio 1)
- [x] Shopify produkter laddas och visas
- [x] Customize & Order — designer modal med canvas
- [x] Lokala produktbilder (CORS fix)
- [x] Blank mockup som canvas-bakgrund (bild 2)
- [x] Special Instructions-fält → bifogas till order
- [ ] **Molnlagring för design-PNG** — byt `/api/upload-design` från `public/uploads/` till Vercel Blob eller Supabase Storage (lokala filer försvinner vid deploy)
- [ ] **Blanka framsidesmockups** — nuvarande bild 2 är baksidan. Hämta rena front-mockups från Printify
- [ ] **Produktkatalog** — Malin/Pontus behöver rensa irrelevanta Printify-produkter (yoga mat, kimono etc.)
- [ ] **Cart → Checkout** — verifiera att Shopify checkout visar design-attributen korrekt
- [ ] **Order confirmation** — verifiera att EP-teamet ser design-PNG i Shopify admin

---

## Identitet & Visuell röd tråd
- [ ] **Minimalistisk logga** — "EP" som ikon + globen för sig
- [x] **Byta Tiffany accent** — `#81D8D0` → `#6AD8D2`
- [ ] **Bildspråk med lila drag** — bilder ska ha subtil lila/purple toning
- [ ] **Svartvita bilder → färg vid hover** — grayscale default, färg vid hover
- [ ] **Mörka sektioner med liv** — bento-bildgrids i bakgrunden
- [ ] **Mindre "kalt"** — subtila detaljer: gradient accents, texturer, micro-animations

---

## Bildval & Känsla
- [ ] **Mix av storslagna events OCH trevliga firmafester** — visa bredden
- [ ] **Välkomnande bilder** — människor som är glada, värme
- [ ] **Uppdatera bildbiblioteket** — konferenser, kickoffs, mingel, middagar, teambuilding

---

## Sektioner
- [x] **Ta bort TestimonialsSection**
- [x] **Case Stories = mörk sektion** med scroll-transition
- [x] **Logo Banner** — stilla, stora ikoner
- [x] **Pop-up ruta** — exit-intent + 80% scroll trigger
- [x] **VIP-sektion** — editorial, ansökan-baserad, guld-accenter
- [x] **Newsletter** — mellan About och Webshop, mörk kontrast

---

## Nya sidor
- [ ] **Om oss-sida** (`/om-oss`) — Editorial storytelling
  - Varför de startade, erfarenhet, vision
  - Info om varje teammedlem (bio + bild)
  - Manifesto-stil, tidningskänsla
- [x] **VIP-sida** (`/vip`) — Premium membership, Rich Purple
- [ ] **Nyhetsbrev i VIP-sidan** — signup integrerad

---

## Navbar
- [x] **Navigation uppdaterad:** VIP, Customize, Shop, About

---

## Länder & Regioner
- [ ] Ladda ner 175 globala länder från Google Drive (.docx-filer)
- [ ] Parsa och integrera i `countries.ts`
- [ ] Verifiera att globe + sök fungerar med alla länder

---

## Branding & Assets
- [ ] Byt placeholder-loggor (Samsung, Volvo etc.) mot officiella assets
- [ ] Uppdatera EP-logotyp till hög-kvalitetsversion

---

## Video
- [ ] **Planera in videoplacering** — Hero? Case stories? Om oss?

---

## CMS (Sanity)
- [ ] Synka alla statiska strängar till Sanity
- [ ] Onboarda Malin/Pontus i Sanity Studio
- [ ] Schemas för: Hero, Services, Case Stories, About, FAQ

---

## Nice to have — Framtida
- [ ] Bildspråk med lila toning — avancerad color grading
- [ ] Fler case stories med riktigt content
- [ ] SEO-sidor per destination
- [ ] i18n (SV/EN)
- [ ] PDF-generering
