# Demo Phase 3 (Reasoning) — Implementation Specification

**Version:** 1.0  
**Date:** 2025-12-15  
**Status:** Ready for Engineering Implementation

---

## CRITICAL IMPORTANCE

**Phase 3 is the entire demo.**

All other phases exist to set up and resolve Phase 3.

If Phase 3 fails, the demo fails.

---

## WHAT PHASE 3 MUST ACHIEVE

After seeing Phase 3, the user must think:

> "This system understands how my business actually works."

Not:
- "Cool animation"
- "Nice dashboard"
- "Interesting data viz"

**Pure cognitive goal:** Prove cross-system causal reasoning.

---

## PHASE 3 STRUCTURE (8 SECONDS)

### Timeline Breakdown

```
0.0s - 0.5s:  Transition from Phase 2 (signal highlighted)
0.5s - 2.0s:  Connection 1 draws (Demand → Inventory)
2.0s - 3.5s:  Connection 2 draws (Inventory → Supplier)
3.5s - 5.0s:  Connection 3 draws (Supplier → Timeline)
5.0s - 6.5s:  Connection 4 draws (Timeline → Impact)
6.5s - 8.0s:  Hold complete diagram, pulse reasoning text
```

**Total:** 8 seconds
**Each connection:** 1.5 seconds to draw
**Hold time:** 1.5 seconds at end

---

## VISUAL LAYOUT (600×400 CANVAS)

### System Icons (Top Row)

```
┌────────────────────────────────────────────────┐
│                                                │
│   [EC]      [INV]      [SUP]      [LOG]       │  ← 4 system boxes
│   E-comm    Inventory  Supplier   Logistics   │    80×60px each
│                                                │    Spacing: 40px
│                                                │
│            [Connection Lines Below]            │
│                                                │
│   ┌─────────────────────────────────────┐     │
│   │  Reasoning Text (Dynamic)           │     │  ← Text box
│   │  "If demand continues..."           │     │    400×80px
│   └─────────────────────────────────────┘     │
│                                                │
└────────────────────────────────────────────────┘
```

### System Box Specs

**Dimensions:** 80×60px
**Background:** #F9FAFB (light gray)
**Border:** 2px solid #E5E7EB
**Border-radius:** 8px
**Icon:** 32×32px, centered
**Label:** 12px, centered below icon, #6B7280

**Positions (600px width canvas):**
- EC: x=60, y=40
- INV: x=200, y=40
- SUP: x=340, y=40
- LOG: x=480, y=40

---

## CONNECTION LINES (SVG PATHS)

### Connection 1: Demand Spike → Inventory Risk

**Path:** EC (bottom-center) → INV (top-center)

**SVG Path:**
```
M 100,100  (EC bottom-center)
C 100,150  200,150  200,100  (Bezier curve down and right)
(INV top-center)
```

**Animation:**
- stroke-dasharray: 1000
- stroke-dashoffset: 1000 → 0
- duration: 1500ms
- easing: ease-in-out

**Style:**
- stroke: #3B82F6 (blue)
- stroke-width: 3px
- fill: none

**Arrow:** 10px triangle at end (INV)

**Reasoning Text (appears when line completes):**
```
"Demand up 23% → Inventory depletes in 4 days"
```

---

### Connection 2: Inventory Risk → Supplier Lead Time

**Path:** INV (bottom-center) → SUP (top-center)

**SVG Path:**
```
M 240,100
C 240,150  380,150  380,100
```

**Animation:** Same specs as Connection 1

**Style:**
- stroke: #3B82F6
- stroke-width: 3px

**Reasoning Text:**
```
"Current supplier lead time: 6 days"
```

---

### Connection 3: Supplier → Timeline Constraint

**Path:** SUP (bottom-center) → Reorder Timeline (new node, appears)

**New Node "Timeline":**
- Position: x=260, y=200 (center-bottom)
- Size: 100×40px
- Background: #FEF3C7 (amber/50)
- Border: 2px solid #F59E0B (amber)
- Text: "Reorder by tomorrow" (14px, bold)

**SVG Path:**
```
M 380,100
C 380,150  300,150  300,200
```

**Reasoning Text:**
```
"Inventory runway < supplier lead time → Reorder now"
```

---

### Connection 4: Timeline → Revenue Impact

**Path:** Timeline node → Impact badge (new node)

**New Node "Impact":**
- Position: x=400, y=280 (bottom-right)
- Size: 120×50px
- Background: #FEE2E2 (red/50)
- Border: 2px solid #EF4444 (red)
- Text: "₹2.3L at risk" (16px, bold)

**SVG Path:**
```
M 310,220
C 350,250  360,250  400,280
```

**Reasoning Text:**
```
"If nothing changes, stockout in 4 days = ₹2.3L revenue loss"
```

---

## REASONING TEXT BOX

**Position:** Bottom of canvas (y=320)
**Dimensions:** 400×80px, centered
**Background:** #FFFFFF
**Border:** 1px solid #E5E7EB
**Border-radius:** 8px
**Padding:** 12px

**Text Style:**
- Font-size: 14px
- Line-height: 1.4
- Color: #374151
- Text-align: left

**Behavior:**
- Fades in when each connection completes (300ms fade)
- Previous text fades out, new text fades in
- Final text (Connection 4) remains visible during hold

---

## ANIMATION SEQUENCE (DETAILED)

### Phase 3.1: Connection 1 (0.5s - 2.0s)

**Trigger:** Phase 2 completes
**Action:**
1. Draw line from EC to INV (1500ms)
2. When line completes: Fade in reasoning text (300ms)
3. INV box pulses (scale 1.0 → 1.05 → 1.0, 500ms)

**State:**
- EC: normal (from Phase 2)
- INV: highlighted (#FEF3C7 background)
- Others: dimmed (opacity 0.5)

---

### Phase 3.2: Connection 2 (2.0s - 3.5s)

**Trigger:** Connection 1 complete
**Action:**
1. Fade out previous reasoning text (300ms)
2. Draw line from INV to SUP (1500ms)
3. When line completes: Fade in reasoning text (300ms)
4. SUP box pulses

**State:**
- EC: normal
- INV: normal
- SUP: highlighted
- Others: dimmed

---

### Phase 3.3: Connection 3 (3.5s - 5.0s)

**Trigger:** Connection 2 complete
**Action:**
1. Fade in "Timeline" node (300ms)
2. Fade out previous reasoning text (300ms)
3. Draw line from SUP to Timeline (1500ms)
4. When line completes: Fade in reasoning text (300ms)
5. Timeline node pulses (amber glow)

**State:**
- All system boxes: dimmed
- Timeline node: highlighted (amber)

---

### Phase 3.4: Connection 4 (5.0s - 6.5s)

**Trigger:** Connection 3 complete
**Action:**
1. Fade in "Impact" node (300ms)
2. Fade out previous reasoning text (300ms)
3. Draw line from Timeline to Impact (1500ms)
4. When line completes: Fade in final reasoning text (300ms)
5. Impact node pulses (red glow)

**State:**
- Timeline: normal (amber)
- Impact: highlighted (red, urgent)

---

### Phase 3.5: Hold & Pulse (6.5s - 8.0s)

**Trigger:** All connections complete
**Action:**
1. All 4 lines pulse gently (opacity 1.0 → 0.7 → 1.0, 1000ms loop)
2. Reasoning text remains visible
3. Phase label changes to "OLynk predicted the problem"

**State:**
- Complete causal diagram visible
- All connections active
- User can click any connection to see detail

---

## INTERACTION DURING PHASE 3

### Hover States

**Hover over connection line:**
- Line: stroke-width 3px → 5px
- Cursor: pointer
- Tooltip appears with full reasoning

**Hover over system box:**
- Box: border color → #3B82F6
- Shows system name + current state

**Hover over Timeline/Impact node:**
- Node: scale 1.0 → 1.05
- Shows detail tooltip

---

### Click States

**Click on connection line:**
- Pause animation
- Expand reasoning text to full explanation
- Show "X" to close
- Resume animation when closed

**Click "See full reasoning" button:**
- Expand all connections
- Show complete causal chain in text
- Pause auto-advance

---

## MOBILE ADAPTATION (320×240 CANVAS)

### Layout Changes

**System boxes:** 60×50px (smaller)
**Positions:**
- Row 1: EC (x=30), INV (x=130)
- Row 2: SUP (x=30), LOG (x=130)

**Connection lines:** Adjusted paths for 2×2 grid

**Reasoning text:** 280×60px, font-size 12px

**Timeline/Impact nodes:** Stack vertically below grid

---

## FALLBACK (IF ANIMATION FAILS)

**Static view:**
- All 4 system boxes visible
- All 4 lines visible (no animation)
- Final reasoning text visible
- No interaction

**Still communicates:** "OLynk connects systems and reasons causally"

---

## PERFORMANCE REQUIREMENTS

**Animation frame rate:** 60fps minimum
**SVG rendering:** Use `requestAnimationFrame`
**Canvas size:** Responsive (scale for retina displays)
**Load time:** <500ms for all assets

**Optimization:**
- Preload all SVG paths
- Use CSS transforms (GPU-accelerated)
- Debounce hover/click events
- Lazy load for mobile (static first, animate on scroll into view)

---

## ACCESSIBILITY

**Screen reader:**
- Announce each connection as it draws
- Text: "OLynk is connecting demand spike to inventory depletion"
- Final state: "OLynk has identified the causal chain and predicted stockout"

**Keyboard navigation:**
- Tab through connections (after animation completes)
- Enter to expand reasoning
- Esc to close expanded view

**Reduced motion:**
- No line drawing animation
- Instant appearance (fade-in only, 300ms)
- Still shows complete diagram

---

## TESTING CHECKLIST

**Animation:**
- [ ] Lines draw smoothly at 60fps
- [ ] Timing is exact (1.5s per connection)
- [ ] Bezier curves are smooth
- [ ] Arrows appear at correct endpoints
- [ ] Pulses are subtle (not jarring)

**Interaction:**
- [ ] Hover states work on all elements
- [ ] Click to expand reasoning works
- [ ] Pause/resume on interaction works
- [ ] Mobile touch events work

**Reasoning Text:**
- [ ] Fades in/out smoothly
- [ ] Text is readable (contrast ratio >4.5:1)
- [ ] Updates at correct timing
- [ ] Final text remains visible

**Fallback:**
- [ ] Static version displays if animation fails
- [ ] Reduced motion respected
- [ ] Mobile scales correctly

**Accessibility:**
- [ ] Screen reader announces connections
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Color not sole indicator (has text too)

---

## IMPLEMENTATION NOTES

**Tech Stack:**
- React + SVG (not Canvas element)
- Framer Motion for animations
- Tailwind for styling
- React state for phase management

**File Structure:**
```
components/
  Demo/
    DemoCanvas.tsx           (Main container)
    Phase3Reasoning.tsx      (This component)
    SystemBox.tsx            (Reusable system icon)
    ConnectionLine.tsx       (Animated SVG line)
    ReasoningText.tsx        (Text box component)
    utils/
      svgPaths.ts            (Path calculations)
      animationTimings.ts    (Timing constants)
```

**State Management:**
```typescript
interface Phase3State {
  currentConnection: 1 | 2 | 3 | 4 | 'complete';
  isPaused: boolean;
  expandedConnection: number | null;
}
```

---

## PHASE 3 IS THE DEMO

Everything else is setup or resolution.

**If this is right, the demo is right.**  
**If this fails, the demo fails.**

Build this first. Build this well.

---

**Document Owner:** Engineering  
**Priority:** P0 (Highest)  
**Status:** Ready for implementation

