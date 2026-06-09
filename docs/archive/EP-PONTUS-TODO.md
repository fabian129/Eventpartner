# EventPartner & Pontus Todo-lista

Denna lista täcker samtliga punkter från Pontus senaste mejl (30 april), uppdelat i frontend, backend, innehåll och strategiska beslut.

**Senast uppdaterad:** 2026-05-01 20:40

---

## ✅ KLART — Performance Refactor (2026-05-01)
- [x] Design token system (`design-tokens.css` + `constraints.json`)
- [x] `prefers-reduced-motion` accessibility
- [x] filter:blur() borttagen ur 19 filer → GPU-composited only
- [x] Alla bilder JPG → WebP (365 MB → 9 MB, 97.6% reduktion)
- [x] Hero-bild 25.6 MB → 0.4 MB
- [x] Raw `<img>` → `<Image>` + alt-text fixar
- [x] 39 filer migrerade från hardcoded hex → theme tokens
- [x] Border-radius normaliserad (max 16px)
- [x] GSAP ScrollTrigger i Hero + ScrollSection
- [x] Hydration error fixad (Lenis wrapper config)

---

## 1. Strategi & Estimering (Utanför avtal)
- [ ] Speca timmar för "design saken" (VPP Configurator) och andra extra funktioner.
- [ ] Skicka offert/estimat för godkännande innan utveckling av de tunga backend-delarna påbörjas (kan dras från 100k-krediten).

## 2. Struktur & Navigering ✅
- [x] Ta bort 3 gamla sidor från navigeringen.
- [x] Uppdatera huvudmenyn till den nya strukturen.
- [x] Sätt upp "skelett" för alla sidor.
- [x] **UPPGRADERAT:** Alla sidor premium-nivå med Navbar, Footer, DarkZone, animationer, SEO.

## 3. Webshop & Produkter

### 3a. Shopify Storefront API
| Status | Uppgift |
|--------|---------|
| ✅ | Storefront API-klient (`src/lib/shopify.ts`) — getProducts, getProductByHandle |
| ✅ | Cart mutations: createCart, addToCart, updateCartLine, removeFromCart |
| ✅ | CartContext med localStorage-persistering |
| ✅ | ProductCard med variant-väljare, pris, sale badges |
| ✅ | CartDrawer med quantity controls, checkout URL redirect |
| ✅ | Graceful 401-fallback (visar "Coming Soon" istället för crash) |
| ⚠️ | **FIX KRÄVS:** Storefront Access Token ger `401 UNAUTHORIZED` |
| ⏳ | Verifiera live-flöde med riktiga produkter |

**Shopify Token Fix — steg:**
1. Logga in på [Shopify Admin](https://eventpartner.myshopify.com/admin)
2. Gå till **Settings → Apps and sales channels → Develop apps**
3. Klicka på den befintliga appen (eller skapa ny: "EventPartner Storefront")
4. Under **Configuration → Storefront API access scopes**, bocka i:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
5. **Install app** → kopiera den nya **Storefront API access token**
6. Uppdatera `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` i `.env.local`
7. Testa: besök `/shop` — produkter ska visas

### 3b. Printify → Shopify Pipeline
| Status | Uppgift |
|--------|---------|
| ⏳ | Koppla Printify till Shopify (Settings → Integrations → Shopify) |
| ⏳ | Skapa merch-produkter i Printify (väntar på lista från EP) |
| ⏳ | Publicera produkter till Shopify (Printify synkar automatiskt) |
| ⏳ | Verifiera att produkter syns i Storefront API |
| ⏳ | Testa komplett köpflöde: Browse → Add to Cart → Checkout → Printify order |

**Printify Setup — steg:**
1. Logga in på [Printify](https://printify.com)
2. Gå till **My Stores → Connect Store → Shopify**
3. Anslut till `eventpartner.myshopify.com`
4. Designa produkter (T-shirts, muggar, event-merch etc.)
5. Klicka **Publish to Shopify** på varje produkt
6. Printify hanterar automatiskt: printing, packing, shipping
7. Produkterna dyker automatiskt upp i EventPartner `/shop`

### 3c. VPP (Video Plus Print)
- [x] VPP-bilder inlagda (statisk visning)
- [x] VPP offertformulär byggt
- [ ] Backend-hantering av VPP-formuläret (e-post till EP)

## 4. Countries (Anläggningar)
- [ ] **Databas/CMS Setup:** Skapa struktur för 36 länder.
- [ ] **Anläggningar:** Skapa struktur för 10 anläggningar per land (360 totalt).
- [ ] **Innehåll:** Specifika bilder/info per anläggning (inväntar från EP).

## 5. First Page (Startsidan) ✅
- [x] Hero: rörlig bakgrund med slideshow
- [x] Premium design med GSAP stagger word reveal
- [x] WebP-optimerade bilder

## 6. Leadership & Team ✅
- [x] Leadership-sida med Pontus, Joakim, Malin
- [x] LinkedIn-kopplingar
- [x] Faktiska bilder
- [ ] **Dold Backend-flik ("Team"):** Bygg en gömd team-sektion (kampanjer)

## 7. Övriga funktioner
- [x] **Careers:** Premium med perks, formulär, animationer
- [x] **FAQ:** Premium med accordion, sökning
- [x] **AI Assistant:** "Coming Soon" med feature-grid
- [x] **Security & Privacy:** Fullständig GDPR-sida
- [x] **Help Center:** Premium med kontaktformulär, support-kanaler
- [x] **Logotyp:** Transparent logga inlagd
- [ ] **Help Center AI-bot:** Kräver separat AI-backend
- [ ] **VPP Formulär Backend:** E-postnotifiering vid inskickade formulär

## 8. Deadline & Mål
- [ ] Hemsidan "klar" för kunder att besöka till den **7:e maj**.
- [ ] Lansera skelettet för marknadsföringskampanjer.

---

## PRIORITETSORDNING (7 maj-deadline)

| Prio | Uppgift | Blocker? |
|------|---------|----------|
| 🔴 1 | Fixa Shopify Storefront Token | Kräver Shopify Admin-access |
| 🔴 2 | Koppla Printify → Shopify | Kräver Printify-konto + produktlista |
| 🟡 3 | Verifiera shop-flöde end-to-end | Beroende av prio 1+2 |
| 🟡 4 | Countries CMS-struktur (36 länder) | Kan påbörjas nu |
| 🟢 5 | VPP formulär backend (e-post) | Oberoende |
| 🟢 6 | Help Center AI-bot | Kan skjutas till v2 |
