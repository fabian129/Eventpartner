# EventPartner MVP - Agent Instructions

## 🎯 Quick Project Brief

**What:** Single-page MVP landing site for EventPartner (B2B event venue booking platform)  
**Goal:** Win the client with first impression - focus on structure, rhythm, and premium feel  
**Timeline:** 1-2 weeks  
**Approach:** Build 3-4 sections showing page flow first, then enhance with interactions  
**Tech Stack:** Already configured and ready  
**Priority:** Structure & rhythm > Complex features  

**Success = Client feels:**
- "This looks premium and modern"
- "I understand the page flow"
- "This matches our brand vision"
- "Let's move forward with you"

---

## Project Overview

You are building the **first MVP landing page** for EventPartner, a B2B event and conference venue booking platform. This is a **client pitch project** with a **1-2 week timeline**. The goal is to create a "WOW" first impression that makes the client want to sign immediately.

**Key Context:**
- This is the FIRST draft to win the client
- Single landing page with 3-4 sections
- **Priority: Structure and rhythm first, then polish**
- Must feel premium, modern, and tech-forward
- Target audience: B2B enterprise clients
- Geographic focus: 35 European countries

**Build Philosophy:**
Focus on getting the **page rhythm and flow** right before adding complex interactive elements. The client needs to feel the structure, pacing, and visual hierarchy. Interactive features like the map can be enhanced in Phase 2.

---

## Brand Identity

### Company: EventPartner

**Positioning:**
- "The World's Largest Selection of Event & Conference Venues"
- B2B-focused platform
- Enterprise-grade, tech-forward, premium positioning
- NOT a "broker feel" - this is a modern tech platform

**Brand Personality:**
- Professional / Corporate
- Modern / Innovative  
- Exclusive / Premium
- Trustworthy / Secure
- International

**Languages:**
- English (Business English - primary)
- Swedish (secondary)

---

## Visual Identity

### Color System

**Primary Accent:**
- Tiffany Blue: `#0ABAB5` (main accent color)
- Alternative: `#1BD4D0` (brighter variant)
- Deeper: `#00A699` (sophisticated variant)

**Secondary Accent:**
- Royal Purple: `#6B46C1` or `#7C3AED`

**Approach: DARK + TIFFANY (Premium Tech)**
```
Dark Base: #0F172A (Slate 900)
Card/Sections: #1E293B (Slate 800)
Primary Accent: #0ABAB5 (Tiffany Blue)
Secondary: #6B46C1 (Royal Purple)
Light Text: #F8FAFC (Slate 50)
Subtle Text: #64748B (Slate 500)
```

**Design Philosophy:**
- Dark backgrounds with Tiffany Blue accents (like Stripe/Vercel/Linear)
- High contrast for premium tech feel
- Tiffany Blue should GLOW against dark backgrounds
- Can use light sections (white/off-white) for content-heavy areas

---

## Page Structure - 4 Sections

### SECTION 1: HERO (100vh)
**Purpose:** Instant WOW + Clear value proposition

**Layout:**
```
┌─────────────────────────────────────┐
│  "The World's Largest Selection of  │
│   Event & Conference Venues"        │
│         Across Europe               │
│                                     │
│    [Europe Visual Element]          │
│   (Static map or illustration)      │
│                                     │
│  [Request Venue] [Book Meeting]     │
│                                     │
│  ────────────────────────────────   │
│  Partner logos scrolling →          │
└─────────────────────────────────────┘
```

**Key Elements:**
- Full viewport height
- Dark gradient background
- Animated headline (typewriter or fade-in sequence)
- **Europe visual element** (CENTERPIECE):
  - **Phase 1:** Static SVG map of Europe with subtle glow
  - Can be simple, elegant illustration showing 35 countries
  - Focus on visual impact and composition first
  - **Phase 2 (optional):** Add interactivity (hover states, venue counts, etc.)
- Dual CTA buttons:
  - Primary: "Request Venue" (Tiffany Blue, glowing hover)
  - Secondary: "Book a Meeting" (outline, Royal Purple accent)
- Trust bar: Subtle scrolling partner logos at bottom

**Phase 1 Implementation:**
Keep it simple. A beautiful static map with the right composition and glow effects will be impressive. The rhythm and feel of the page matters more than complex interactions at this stage.

**Countries to Reference (35 total):**
Ireland, United Kingdom, Iceland, Portugal, Spain, France, Belgium, Netherlands, Luxembourg, Germany, Switzerland, Austria, Italy, Malta, Denmark, Norway, Finland, Estonia, Latvia, Lithuania, Poland, Czech Republic, Slovakia, Hungary, Slovenia, Croatia, Bosnia and Herzegovina, Serbia, Montenegro, North Macedonia, Albania, Romania, Bulgaria, Greece, Cyprus

---

### SECTION 2: VALUE PROPOSITION (~80vh)
**Purpose:** Explain USP with visual impact

**Layout:**
```
┌─────────────────────────────────────┐
│       "Why EventPartner"            │
│                                     │
│  ┌────────┐ ┌────────┐ ┌────────┐ │
│  │ Icon   │ │ Icon   │ │ Icon   │ │
│  │ ────   │ │ ────   │ │ ────   │ │
│  │ Title  │ │ Title  │ │ Title  │ │
│  │ Text   │ │ Text   │ │ Text   │ │
│  └────────┘ └────────┘ └────────┘ │
└─────────────────────────────────────┘
```

**Content Examples:**
1. **Global Scale, Local Expertise**
   - Icon: Globe with pulsating points
   - "35 countries, 10,000+ venues, one platform"

2. **Enterprise-Grade Security**
   - Icon: Shield with checkmark
   - "ISO 27001 certified processes, GDPR compliant"

3. **White-Glove Service**
   - Icon: Concierge bell
   - "Dedicated account managers for every booking"

**Design Notes:**
- 3-column layout (desktop) / stacked (mobile)
- Icons in Tiffany Blue with animation
- Scroll-triggered fade + slide up
- Hover: subtle lift + glow effect
- Background: Light/off-white for readability

---

### SECTION 3: HOW IT WORKS (~100vh)
**Purpose:** Show the process visually

**Layout Option A - Timeline (Recommended for Phase 1):**
```
┌─────────────────────────────────────┐
│    "Book in 4 Simple Steps"         │
│                                     │
│  ┌────┐    ┌────┐    ┌────┐  ┌────┐
│  │ 1  │ ─→ │ 2  │ ─→ │ 3  │→│ 4  │
│  │Icon│    │Icon│    │Icon│  │Icon│
│  │────│    │────│    │────│  │────│
│  │Req │    │Match   │Review│ │Book│
│  │    │    │    │    │    │  │    │
│  └────┘    └────┘    └────┘  └────┘
│                                     │
│  Short description of process below │
└─────────────────────────────────────┘
```

**Layout Option B - Split Visual:**
```
┌─────────────────────────────────────┐
│    "Simple, Fast, Efficient"        │
│                                     │
│  ┌─────────┬────────────────────┐  │
│  │ LEFT    │  RIGHT             │  │
│  │ (40%)   │  (60%)             │  │
│  │         │                    │  │
│  │ • Point │  [Visual element   │  │
│  │ • Point │   representing     │  │
│  │ • Point │   the platform]    │  │
│  │ • Point │                    │  │
│  │         │  Could be:         │  │
│  │         │  - Mock interface  │  │
│  │         │  - Illustration    │  │
│  │         │  - Stats display   │  │
│  └─────────┴────────────────────┘  │
└─────────────────────────────────────┘
```

**Phase 1 Implementation:**
Choose the approach that best shows the **rhythm and pacing** of your design. Don't worry about making forms functional or adding complex interactions. Focus on:
- Visual hierarchy
- Clear process communication  
- Consistent spacing and typography
- Smooth scroll experience

**Phase 2 (Optional Enhancement):**
- Add interactive form elements
- Live preview/feedback
- Animated transitions between steps

**Mobile:**
- Stack all elements vertically
- Maintain clear visual progression

---

### SECTION 4: FINAL CTA & TRUST (~80vh)
**Purpose:** Social proof + conversion

**Layout:**
```
┌─────────────────────────────────────┐
│  "Ready to Transform Your Event     │
│        Planning?"                   │
│                                     │
│  Join 500+ companies using EP       │
│                                     │
│    [Schedule Your Demo - LARGE]     │
│                                     │
│  Client  Client  │  €50M+ Events    │
│  Logos   Logos   │  Booked          │
│                  │                  │
│                  │  ISO 27001       │
│                  │  Certified       │
│                                     │
│  ○ ○ ○ ○  "Meet Our Team" →        │
│  (circular team photos)             │
│                                     │
│ ──────────────────────────────────  │
│  FOOTER (minimal, dark)             │
│  Links | Social | Contact      [💬]│
└─────────────────────────────────────┘
```

**Key Elements:**
- Hero-style CTA block (centered, dramatic)
- Large headline + subtext
- Prominent CTA button with gradient (Tiffany → Purple)
- Trust elements:
  - Client logos
  - "ISO 27001 Certified" badge (note: process started, not yet certified)
  - Stats: "€50M+ Events Booked"
  - Team preview: 3-4 circular photos linking to About page
- Minimal footer
- Chatbot trigger (bottom-right, discreet)
- Background: Can return to dark for dramatic bookend effect

---

## Design System Specifications

### Typography
```
Headings Font: Inter, Sohne, or Cabinet Grotesk
Body Font: Inter or System UI

H1: 64px desktop / 40px mobile (hero)
H2: 48px desktop / 32px mobile
H3: 32px desktop / 24px mobile
Body: 16px / 18px
Small: 14px
Line-height: 1.6

Weights:
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
```

### Spacing
```
Base unit: 4px
Scale: 8, 12, 16, 24, 32, 48, 64, 96, 128px

Between sections: 0px (seamless scroll)
Inside sections: 64-128px vertical padding
Between elements: 24-48px
Mobile: Reduce padding by 50%
```

### Border Radius
```
Small: 8px
Medium: 12px
Large: 16px
XL: 24px
Cards: 16px
Buttons: 8px
```

### Shadows (Premium Feel)
```
Subtle: 0 2px 8px rgba(0,0,0,0.04)
Medium: 0 4px 16px rgba(0,0,0,0.08)
Strong: 0 8px 32px rgba(0,0,0,0.12)
Glow (Tiffany): 0 0 24px rgba(10,186,181,0.3)
Glow (Purple): 0 0 24px rgba(107,70,193,0.3)
```

---

## Animations & Interactions

### Page Load Sequence (First 2 seconds)
```
0.0s: Background fades in (0.3s duration)
0.3s: Hero headline typewriter/fade (0.8s duration)
0.8s: CTA buttons fade + slide up (0.4s duration)
1.2s: Map fades in with scale effect (0.6s duration)
1.4s: Trust bar slides in from bottom (0.4s duration)
```

### Scroll Animations
- Parallax on hero background (subtle)
- Section fade-in + slide-up when entering viewport
- Stagger delay: 0.1s between elements
- Counter animations for stats (when visible)

### Hover States
- Buttons: glow effect + subtle lift (transform: translateY(-2px))
- Cards: lift + shadow increase
- Countries on map: highlight + scale(1.05)
- Team photos: grayscale → color + zoom
- Transition duration: 0.3s ease

### Cursor (Desktop Only - Optional)
- Custom cursor on hero section
- Grows on hover over interactive elements

---

## Technical Requirements

### Responsive Breakpoints
```
Mobile: 320px - 767px
Tablet: 768px - 1023px
Desktop: 1024px+
Large Desktop: 1440px+
```

### Mobile Optimizations
- Hero text 40% smaller
- Map = simplified version (tap to zoom)
- All horizontal layouts stack vertically
- CTA buttons fullwidth on <768px
- Reduced animations (respect prefers-reduced-motion)
- Touch-friendly: min 44px touch targets

### Performance Targets
- Lighthouse score: >90
- First render: <2s
- Animations: 60fps smooth
- Accessibility: WCAG AA compliant

---

## Tech Stack Recommendations

### Framework & Styling
```
Framework: Next.js 14 (App Router)
Styling: Tailwind CSS + CSS Modules
Animations: Framer Motion
Maps: Mapbox GL JS or react-simple-maps
Icons: Lucide React or Heroicons
Fonts: Google Fonts (Inter) or local hosting
Hosting: Vercel
```

### Key Libraries
```bash
npm install framer-motion
npm install react-intersection-observer
npm install react-countup
npm install @radix-ui/react-dialog
npm install lucide-react
```

---

## Component Hierarchy

### Reusable Components Needed
```
<Button variant="primary|secondary|outline" />
<Card elevated={boolean} />
<Container maxWidth="sm|md|lg|xl" />
<Section background="dark|light" />
<Icon name="..." size="sm|md|lg" animated={boolean} />
<AnimatedText type="typewriter|fade" />
<CountUp end={number} />
```

---

## Key Features

### Phase 1 Must-Haves (Structure & Rhythm)
- ✅ Clean 3-4 section layout with clear hierarchy
- ✅ Dark theme with Tiffany Blue accents
- ✅ Hero with Europe visual element (static is fine)
- ✅ Smooth scroll experience
- ✅ Value proposition section (3 columns)
- ✅ Process/How It Works section
- ✅ Final CTA section with trust elements
- ✅ Mobile-first responsive design
- ✅ Basic scroll animations (fade-in)
- ✅ Strong typography system
- ✅ Fast load times (<2s)

### Phase 2 Nice-to-Haves (Enhancement)
- Interactive Europe map with hover states
- Advanced animations (parallax, 3D tilts)
- Functional interactive forms
- Counter animations for stats
- Custom loading animation
- Sound effects (toggleable)
- Easter eggs (e.g., click 5 countries = confetti)
- Advanced micro-interactions

---

## Content Guidelines

### Tone of Voice
- Professional but approachable
- Confident but not arrogant
- Tech-forward but not jargon-heavy
- International, not region-specific

### Key Messaging
- Primary: "World's largest selection"
- Secondary: "Enterprise-grade" + "Secure"
- Tertiary: "Simple" + "Fast"

### Copy Length
- Headlines: 5-10 words max
- Subheadings: 10-15 words
- Body: 15-25 words per paragraph
- CTA buttons: 2-3 words

---

## Build Priority Order

### **PHASE 1: STRUCTURE & RHYTHM** (Primary Focus)
**Goal:** Show the client the flow, pacing, and visual hierarchy of the page

**Days 1-3: Foundation & Hero**
- [ ] Setup Next.js project with Tailwind
- [ ] Configure color system (Tiffany Blue + Dark theme)
- [ ] Typography setup
- [ ] Hero section with dark gradient
- [ ] Animated headline
- [ ] Static Europe visual (SVG map with glow)
- [ ] CTA buttons with basic hover states
- [ ] Trust bar (can use placeholder logos)

**Days 4-5: Core Sections**
- [ ] Section 2: Value proposition (3 columns)
- [ ] Basic scroll animations (fade-in)
- [ ] Icon system
- [ ] Section 3: Process/How It Works
- [ ] Choose timeline OR split layout approach
- [ ] Keep it visual, simple, clear

**Days 6-7: Final Section & Polish**
- [ ] Section 4: Final CTA block
- [ ] Trust elements and stats
- [ ] Footer
- [ ] Mobile responsive adjustments
- [ ] Smooth scroll between sections
- [ ] Basic performance optimization

**Deliverable:** A clean, flowing page that shows rhythm, spacing, and visual hierarchy. Client can feel the premium vibe and understand the structure.

---

### **PHASE 2: ENHANCEMENT** (If time permits / After client approval)
**Goal:** Add the "wow" interactive elements

- [ ] Interactive Europe map (hover states, venue counts)
- [ ] Advanced animations (parallax, 3D tilts)
- [ ] Interactive form in Section 3
- [ ] Counter animations for stats
- [ ] Micro-interactions and Easter eggs
- [ ] Advanced performance optimization
- [ ] Accessibility audit

---

### What Matters Most in Phase 1:

✅ **DO Focus On:**
- Clean, consistent spacing
- Strong typography hierarchy  
- Smooth scroll experience
- Color system applied correctly (Tiffany + Dark)
- Mobile responsiveness
- Page rhythm (how sections flow)
- Visual "weight" distribution
- Fast load times

❌ **DON'T Worry About:**
- Complex map interactions
- Functional forms
- Advanced animations
- Perfect pixel details
- Every single micro-interaction

**Remember:** The client needs to see that you understand:
1. Their brand (premium, modern, tech)
2. Structure (how to pace a landing page)
3. Execution (clean code, good performance)

Interactive flourishes come after they approve the foundation.

---

## Success Criteria

### Client Should Feel:
1. **WOW** - "This looks expensive and premium"
2. **TRUST** - "This feels secure and professional"
3. **DESIRE** - "I want this platform for my business"
4. **URGENCY** - "Let's sign this now"

### Technical Deliverables:
1. Live staging URL
2. Source code (GitHub)
3. Design system documentation
4. Performance report (Lighthouse)
5. Mobile demo video

---

## Common Pitfalls to Avoid

❌ **Don't:**
- Start with complex interactions before structure is solid
- Over-engineer the first version
- Make it feel like a generic booking site
- Use stock photos heavily
- Over-animate (subtle > flashy)
- Ignore mobile experience
- Use too many colors
- Make text too small
- Forget about load performance
- Build everything at once without showing progress

✅ **Do:**
- Get the rhythm and pacing right first
- Use Tiffany Blue strategically (not everywhere)
- Keep animations smooth (60fps)
- Test on actual mobile devices
- Ensure high contrast for readability
- Make CTAs obvious and compelling
- Optimize images and assets
- Show the client incremental progress
- Focus on visual hierarchy
- Build mobile-first
- Use consistent spacing throughout

---

## Final Notes

**Project Philosophy:**
This is about demonstrating that you understand how to build a premium landing page with the right rhythm and flow. The client needs to see:

1. **Structure** - Clean sections that flow naturally
2. **Visual hierarchy** - Clear importance of elements
3. **Brand execution** - Tiffany Blue + Dark done right
4. **Professional delivery** - Fast, responsive, polished

Interactive features are impressive, but **foundation comes first**. A beautifully structured page with simple animations will win the client more than a janky page with complex features.

**Think of it like:**
- Phase 1 = Showing them the architecture and interior design
- Phase 2 = Adding the smart home features and decorations

**Timeline:**
Week 1: Build structure, get client feedback
Week 2: Refine and enhance based on their response

**Success Metric:**
Client says "I can see exactly where this is going - let's work together" after seeing the structure and rhythm.

---

## Questions to Clarify Before Building

1. Do you have actual partner logos to use, or should I use placeholders?
2. Do you have team photos (9 people mentioned), or should I use placeholder avatars?
3. Is there a specific domain/staging URL to deploy to?
4. Do you have actual client stats, or should I use example numbers?
5. Should the chatbot be functional or just a visual placeholder?
6. Any specific sections you want to prioritize showing first?

---

**Remember:** You're not building the final product. You're building the first impression that wins the contract. Focus on structure, rhythm, and premium feel. Everything else can be enhanced later.

---

**Last Updated:** February 2026  
**Project Code:** EP-MVP-001  
**Status:** Ready to Build - Structure First Approach
