# Demo-First Home Page — UI Wireframe

**Version:** 1.0 (Grayscale Structure Only)  
**Date:** 2025-12-15  
**Status:** ✅ Layout Specification

---

## WIREFRAME RULES

**This document defines:**
- Component positioning
- Spacing and hierarchy
- Layout structure
- Interaction zones

**This document does NOT define:**
- Colors (except grayscale for hierarchy)
- Final copy
- Animations (those are in mechanics doc)
- Visual design

**All measurements:** Desktop first, mobile adjustments noted

---

## SECTION 1: DEMO CONTAINER (FULL-WIDTH)

### **Layout Structure**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [SKIP DEMO]                                    [● ○ ○ ○ ○]    │ ← Header bar
│                                                                 │
│                                                                 │
│                    ┌─────────────────┐                          │
│                    │                 │                          │
│                    │   DEMO CANVAS   │                          │ ← Main demo area
│                    │   (Interactive) │                          │
│                    │    600×400px    │                          │
│                    │                 │                          │
│                    └─────────────────┘                          │
│                                                                 │
│              Phase Label: "Understanding the signal"            │ ← Context label
│                                                                 │
│                  [Click to continue or wait]                    │ ← Helper text (fade after first use)
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Height: 100vh (full viewport)
Background: #F9FAFB (very light gray)
Content: Vertically + horizontally centered
```

---

### **Component Breakdown**

**1. Header Bar (Top)**
- Position: Absolute, top-right
- Height: 48px
- Padding: 16px 24px

**Skip Button:**
- Position: Top-left
- Size: Text link, 14px
- Color: #6B7280 (medium gray)
- Hover: #374151 (darker gray)
- Click: Scrolls to Section 2

**Progress Dots:**
- Position: Top-right
- 5 dots: 8px diameter each
- Spacing: 8px between
- Active: #1F2937 (dark gray)
- Inactive: #D1D5DB (light gray)
- Completed: #1F2937 with checkmark

---

**2. Demo Canvas (Center)**
- Dimensions: 600×400px (desktop)
- Background: #FFFFFF (white)
- Border: 1px solid #E5E7EB
- Border-radius: 12px
- Shadow: 0 4px 6px rgba(0,0,0,0.05)
- Contains: Interactive demo phases

**Canvas Content Zones:**
```
┌──────────────────────────────────┐
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐ │ ← Top: System icons
│  │ EC │  │ PM │  │ LG │  │ ER │ │   (E-comm, Payments, Logistics, ERP)
│  └────┘  └────┘  └────┘  └────┘ │
│                                  │
│         [Connection Lines]       │ ← Middle: Reasoning connections
│                                  │
│  ┌─────────┐  ┌─────────┐       │ ← Bottom: Action cards
│  │ Option  │  │ Option  │  ...  │   (Phase 4 only)
│  └─────────┘  └─────────┘       │
└──────────────────────────────────┘
```

---

**3. Phase Label (Below Canvas)**
- Position: Center, 24px below canvas
- Font-size: 14px
- Color: #6B7280
- Examples: "Understanding the signal" / "OLynk is connecting patterns"
- Fades in/out on phase change

---

**4. Helper Text (Below Label)**
- Position: Center, 12px below label
- Font-size: 12px
- Color: #9CA3AF (light gray)
- Text: "Click to continue or wait"
- Opacity: Fades to 0 after Phase 1

---

### **Mobile Adjustments (< 768px)**

```
┌─────────────────────────────┐
│                             │
│ [SKIP]          [● ○ ○ ○ ○] │
│                             │
│    ┌───────────────────┐    │
│    │                   │    │
│    │   DEMO CANVAS     │    │
│    │   320×240px       │    │
│    │                   │    │
│    └───────────────────┘    │
│                             │
│  Phase Label (centered)     │
│                             │
└─────────────────────────────┘

Canvas: 320×240px
Progress dots: Top-right, 6px diameter
Skip button: Top-left
All else same logic
```

---

## SECTION 2: DEMO EXIT OVERLAY

### **Appears After Phase 5 Completes**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                   [Demo faded to background]                    │
│                                                                 │
│              ┌─────────────────────────────────┐                │
│              │                                 │                │
│              │  That was OLynk thinking.       │                │
│              │                                 │                │
│              │  ┌───────────────────────────┐  │                │
│              │  │ What did I just see?      │  │ ← Option 1    │
│              │  │ ↓ Scroll to explanation   │  │   (elevated)  │
│              │  └───────────────────────────┘  │                │
│              │                                 │                │
│              │  ┌───────────────────────────┐  │                │
│              │  │ How does this work?       │  │ ← Option 2    │
│              │  │ → How It Works page       │  │                │
│              │  └───────────────────────────┘  │                │
│              │                                 │                │
│              │  ┌───────────────────────────┐  │                │
│              │  │ Show me a real demo       │  │ ← Option 3    │
│              │  │ → Request Demo page       │  │                │
│              │  └───────────────────────────┘  │                │
│              │                                 │                │
│              └─────────────────────────────────┘                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### **Overlay Specifications**

**Container:**
- Position: Fixed, centered
- Width: 480px
- Background: #FFFFFF
- Border-radius: 16px
- Shadow: 0 20px 25px rgba(0,0,0,0.15)
- Padding: 40px

**Headline:**
- Font-size: 24px
- Weight: 600
- Color: #111827
- Margin-bottom: 32px
- Text-align: center

**Option Buttons:**
- Width: 100%
- Height: 64px
- Margin-bottom: 16px
- Border: 2px solid #E5E7EB
- Border-radius: 8px
- Padding: 16px
- Background: #FFFFFF
- Hover: Border → #374151, Background → #F9FAFB

**Option 1 (Elevated):**
- Background: #F9FAFB (pre-hover state)
- Border: 2px solid #9CA3AF

**Button Text:**
- Primary: 16px, weight 600, #111827
- Secondary: 14px, weight 400, #6B7280

**Mobile Overlay:**
- Width: 90vw (max 400px)
- Padding: 32px 24px
- Button height: 56px

---

## FALLBACK: STATIC INTELLIGENCE EXAMPLE

### **When Demo is Skipped**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    The AI Brain for Business Operations         │ ← Headline
│                                                                 │
│                       Here's how OLynk thinks:                  │ ← Subhead
│                                                                 │
│              ┌─────────────────────────────────────┐            │
│              │                                     │            │
│              │  SCENARIO                           │            │
│              │  Demand spike detected → 3 days    │            │
│              │  from potential stockout            │            │
│              │                                     │            │
│              │  OLYNK'S REASONING                  │            │
│              │  • Current inventory: 340 units     │            │
│              │  • Velocity increased 23%           │            │
│              │  • Supplier lead time: 6 days       │            │
│              │  • Reorder needed in 48 hours       │            │
│              │                                     │            │
│              │  ACTION TAKEN                       │            │
│              │  Created PO + reallocated stock     │            │
│              │  Problem prevented                  │            │
│              │                                     │            │
│              └─────────────────────────────────────┘            │
│                                                                 │
│           [See Interactive Demo]  [Request Demo]                │ ← CTAs
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Height: 100vh
Background: #F9FAFB
Content: Centered
```

---

### **Static Example Card Specs**

**Container:**
- Width: 600px
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border-radius: 12px
- Padding: 32px
- Shadow: 0 4px 6px rgba(0,0,0,0.05)

**Section Headers:**
- Font-size: 14px
- Weight: 700
- Color: #111827
- Letter-spacing: 0.5px
- Text-transform: uppercase
- Margin-bottom: 12px

**Content Text:**
- Font-size: 16px
- Line-height: 1.6
- Color: #374151
- Margin-bottom: 20px

**Bullets:**
- List-style: Disc
- Padding-left: 20px
- Color: #6B7280

**CTA Buttons:**
- Display: Inline-block
- Margin-right: 16px
- Padding: 12px 24px
- Border-radius: 8px

**Primary CTA:**
- Background: #111827
- Color: #FFFFFF
- Hover: Background → #374151

**Secondary CTA:**
- Border: 2px solid #E5E7EB
- Color: #111827
- Hover: Border → #374151

---

## SECTION 3-7: STANDARD CONTENT SECTIONS

### **After Demo Container / Exit Overlay**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  SECTION 2: ORIENTATION (What You Just Saw)                    │
│  Max-width: 800px, centered                                    │
│  Padding: 80px 24px                                            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SECTION 3: PROBLEM CONTEXT                                    │
│  Max-width: 1200px, centered                                   │
│  Padding: 80px 24px                                            │
│  Layout: Grid 2×2 (4 problem cards)                            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SECTION 4: WHAT OLYNK IS                                      │
│  Max-width: 1000px, centered                                   │
│  Padding: 80px 24px                                            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SECTION 5: HOW IT FITS                                        │
│  Max-width: 1000px, centered                                   │
│  Padding: 80px 24px                                            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SECTION 6: WHO THIS IS FOR                                    │
│  Max-width: 1200px, centered                                   │
│  Padding: 80px 24px                                            │
│  Layout: Grid 1×3 (3 recognition cards)                        │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SECTION 7: NEXT STEPS                                         │
│  Max-width: 1200px, centered                                   │
│  Padding: 80px 24px                                            │
│  Layout: Grid 1×3 (3 CTA cards)                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### **Standard Content Section Specs**

**Section Padding:**
- Desktop: 80px vertical, 24px horizontal
- Tablet: 60px vertical, 24px horizontal
- Mobile: 48px vertical, 16px horizontal

**Max-widths:**
- Narrow (text-heavy): 800px
- Standard: 1000px
- Wide (cards/grid): 1200px

**Typography Hierarchy:**
- H2 (Section titles): 36px, weight 700, #111827
- H3 (Card titles): 20px, weight 600, #111827
- Body: 18px, line-height 1.6, #374151
- Caption: 14px, #6B7280

**Card Spacing:**
- Gap between cards: 24px
- Card padding: 24px
- Card border-radius: 8px
- Card border: 1px solid #E5E7EB

---

## RESPONSIVE BREAKPOINTS

```
Desktop:  > 1024px  (full layout)
Tablet:   768-1024px (adjusted spacing)
Mobile:   < 768px   (stacked layout)
```

**Key Changes at Mobile:**
- Demo canvas: 320×240px
- All grids: 1 column
- Section padding: Reduced
- Card spacing: Reduced to 16px
- Typography: Slightly smaller (H2 → 28px)

---

## Z-INDEX HIERARCHY

```
Demo exit overlay:     100
Demo timeout prompt:   90
Demo canvas:           10
Skip button:           20
Progress dots:         20
Standard content:      1
```

---

## SPACING SYSTEM

**Base unit:** 8px

Common spacing values:
- 8px (1×): Tight spacing
- 16px (2×): Standard element spacing
- 24px (3×): Card padding, section spacing
- 32px (4×): Large element spacing
- 48px (6×): Section padding (mobile)
- 64px (8×): Section padding (tablet)
- 80px (10×): Section padding (desktop)

---

## INTERACTION ZONES

**Clickable areas:**
- Minimum: 44×44px (WCAG AA)
- Preferred: 48×48px
- Touch targets: 8px padding around visible element

**Hover states:**
- Transition: 200ms ease
- Color changes: Subtle (one shade darker)
- Border changes: 2px → accent color

---

## ACCESSIBILITY ANNOTATIONS

**Focus states:**
- All interactive elements: 2px solid #3B82F6 (blue)
- Offset: 2px from element
- Border-radius: Matches element

**Skip links:**
- "Skip to content" (invisible until focused)
- Positioned: Top-left, z-index 200

**Semantic HTML:**
- Demo container: `<section role="region" aria-label="Interactive Demo">`
- Exit overlay: `<dialog>`
- Fallback: `<section>`

---

## WIREFRAME COMPLETE — READY FOR IMPLEMENTATION

**What's Defined:**
- ✅ Demo container layout (full-width, centered)
- ✅ Demo canvas dimensions (600×400 desktop, 320×240 mobile)
- ✅ Progress indicators (5 dots, top-right)
- ✅ Exit overlay structure (3 options, centered)
- ✅ Static fallback layout (when skipped)
- ✅ Standard content sections (2-7)
- ✅ Responsive breakpoints
- ✅ Spacing system
- ✅ Z-index hierarchy
- ✅ Accessibility requirements

**What's NOT Defined (Yet):**
- Colors (except grayscale structure)
- Final copy
- Icon designs
- Animations (see mechanics doc)
- Demo canvas internal visuals

---

**Next Step:** Implement Home.tsx with demo-first structure

---

**Document Owner:** Design + Engineering  
**Status:** Ready for component implementation

