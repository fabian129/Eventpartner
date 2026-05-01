# EventPartner & Pontus Todo-lista

Denna lista täcker samtliga punkter från Pontus senaste mejl (30 april), uppdelat i frontend, backend, innehåll och strategiska beslut.

## 1. Strategi & Estimering (Utanför avtal)
- [ ] Speca timmar för "design saken" (VPP Configurator) och andra extra funktioner.
- [ ] Skicka offert/estimat för godkännande innan utveckling av de tunga backend-delarna påbörjas (kan dras från 100k-krediten).

## 2. Struktur & Navigering (Fokus/Prio)
- [x] Ta bort 3 gamla sidor från navigeringen.
- [x] Uppdatera huvudmenyn till den nya strukturen:
  - **COMPANY:** About, Leadership, Careers
  - **SERVICES:** VIP, Webshop, AI Assistant
  - **SUPPORT:** FAQ, Help center, Security & Privacy
- [x] Sätt upp "skelett" för alla dessa sidor så Malin kan börja fylla på med copy.
- [x] **UPPGRADERAT:** Alla sidor nu premium-nivå med Navbar, Footer, DarkZone, Framer Motion-animationer, SEO-metadata.

## 3. Webshop & Produkter
- [ ] **Printify:** Se till att Printify fungerar med utvald merch (väntar på lista över produkter).
  - Printify → Shopify sync pipeline klar (Printify skapar produkter i Shopify)
  - Storefront API-klient klar (`src/lib/shopify.ts`)
  - Credentials konfigurerade i `.env.local`
- [ ] **Shopify:** Koppla in produkterna via Shopify Storefront API.
  - ✅ Full Storefront API-klient med getProducts, getProductByHandle
  - ✅ Cart mutations: createCart, addToCart, updateCartLine, removeFromCart
  - ✅ CartContext med localStorage-persistering
  - ✅ ProductCard med variant-väljare, pris, sale badges
  - ✅ CartDrawer med quantity controls, checkout URL redirect
  - ⚠️ Behöver produkter i Shopify-butiken (från Printify) för att verifiera flödet live
- [x] **Video Plus Print (VPP):** Lägg in bilder från VPP (endast statisk visning initialt).
- [x] **VPP Formulär:** Bygg ett offertformulär för VPP baserat på Scotts krav.

## 4. Countries (Anläggningar)
- [ ] **Databas/CMS Setup:** Skapa struktur för 36 länder.
- [ ] **Anläggningar:** Skapa struktur för 10 anläggningar per land (Totalt 360 anläggningar).
- [ ] **Innehåll:** Lägg in specifika bilder och information för varje unik anläggning (när detta skickas från EP).

## 5. First Page (Startsidan)
- [x] **Bakgrund/Hero:** Ta fram förslag på rörlig bakgrund (event/konferens-tema).
- [x] **Design:** Implementera den rörliga bakgrunden med premium-känsla.

## 6. Leadership & Team
- [x] **Frontend Sida:** Bygg Leadership-sida.
- [x] **Profiler:** Lägg till Pontus, Joakim och Malin.
- [x] **Länkar:** Koppla till respektive LinkedIn.
- [x] **Bilder:** Lägg in faktiska bilder (inväntar från Malin i tråden).
- [x] **UPPGRADERAT:** Premium-layout med Navbar/Footer, Framer Motion, LinkedIn-hover-overlays.
- [ ] **Dold Backend-flik ("Team"):** Bygg en gömd team-sektion i backend (används för kampanjer).

## 7. Övriga funktioner
- [x] **Careers:** Skapa sida med formulär för spontanansökan.
- [x] **UPPGRADERAT:** Premium Careers-sida med perks-grid, animationer, Navbar/Footer.
- [ ] **Help Center / Bot:** Lägg in en AI-bot på Help Center-sidan som ska svara på frågor.
  - ✅ Premium Help Center-sida med kontaktformulär, support-kanaler
  - ⚠️ AI-bot integration kvarstår (kräver separat AI-backend)
- [x] **Logotyp:** Få in den transparenta loggan och byt ut på sajten (EP har löst loggan, vi behöver bara ladda upp den).
- [x] **FAQ:** Premium FAQ-sida med accordion, sökning, CTA-sektion.
- [x] **AI Assistant:** Premium "Coming Soon"-sida med feature-grid och animerad bot-preview.
- [x] **Security & Privacy:** Fullständig sida med GDPR-pillars, compliance, DPO-kontakt.

## 8. Deadline & Mål
- [ ] Hemsidan ska vara "klar" för kunder att besöka till den **7:e maj**.
- [ ] Lansera skelettet för marknadsföringskampanjer.
