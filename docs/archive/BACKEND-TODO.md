# EventPartner Backend Implementation TODO

This document tracks the technical roadmap for the EventPartner backend, specifically covering the Shopify integration, Printify sync, Video Plus Print quoting/design logic, and the administrative dashboard.

## 1. Shopify & Printify Integration (Webshop)
- [ ] **Shopify Storefront API Setup:**
  - [ ] Configure private app/access token in Shopify admin.
  - [ ] Implement GraphQL client for Next.js to fetch products, variants, and create checkout sessions.
- [ ] **Printify Sync:**
  - [ ] Map Printify products to Shopify.
  - [ ] Test webhook logic so orders placed via Shopify automatically trigger Printify fulfillment.
- [ ] **Frontend Cart Drawer & Checkout (Next.js):**
  - [ ] Build global Cart context/state.
  - [ ] Implement slide-out Cart Drawer.
  - [ ] Integrate Shopify checkout redirect / native checkout.

## 2. Video Plus Print (VPP) Quote & Design Flow
- [ ] **Phase 1: Lead Capture (Completed)**
  - [x] Basic quote request form built.
  - [ ] Connect form to internal CRM or email system (send to Scott/Pontus).
- [ ] **Phase 2: Custom Configurator (Pending Estimate Approval)**
  - [ ] Build product configurator (screen size, memory, paper type, print finish).
  - [ ] Implement interactive pricing engine based on volume/specs.
- [ ] **Phase 3: Video & Design Upload Validation**
  - [ ] Implement secure file upload (AWS S3 or similar).
  - [ ] Implement video transcoding/validation (MP4 format, resolution checks, size limits).
  - [ ] Build design previewer for the brochure templates.

## 3. Countries & Dynamic Content Architecture
- [ ] **Dynamic Locations Database (CMS / Supabase)**
  - [ ] Create schema for 36 Countries.
  - [ ] Create schema for Facilities (Top 10 per country).
  - [ ] Configure relational mapping (Country -> Facilities).
- [ ] **Frontend Integration**
  - [ ] Build dynamic route `/destinations/[country]/[facility]` or similar.
  - [ ] Populate dummy data to verify the architecture.

## 4. Admin Dashboard (Backend Team View)
- [ ] **Internal Team Tab**
  - [ ] Build hidden `/admin/team` dashboard.
  - [ ] Set up secure authentication (NextAuth/Supabase).
- [ ] **Order Management**
  - [ ] Pull Shopify order status via Admin API to display internally.
  - [ ] Track VPP quote status and fulfillment stages.
- [ ] **Content Management**
  - [ ] Allow admin editing of Leadership team, FAQs, and Careers.
  - [ ] Manage the 36 countries and their facilities.

## 5. Security & Deployment
- [ ] **API Security**
  - [ ] Rate limiting on forms.
  - [ ] Secure environment variables for Shopify/Printify.
- [ ] **Database & RLS**
  - [ ] Row Level Security (RLS) on Supabase if used.
- [ ] **Deployment Verification**
  - [ ] Verify Vercel builds with all new routes.
  - [ ] Check Shopify webhooks in production environment.
