# Diagnostic Card UI Specification

## Design Philosophy
**"McKinsey clarity with modern product studio layout"**

A calm operational assessment surface that earns trust through restraint and clarity.

---

## 1. Card Container

### Dimensions
- **Width:** 900px max-width
- **Padding:** 64px (desktop), 32px (mobile)
- **Margin:** 120px top, 80px bottom

### Surface
- **Background:** Pure white (#FFFFFF)
- **Border:** 1px solid #E5E7EB (primary-200)
- **Border Radius:** 16px (consistent with system)
- **Shadow:** 0 4px 6px rgba(0, 0, 0, 0.05) (extremely subtle)

### Placement
- Centered horizontally
- Dominant focal element above fold
- Never full-width on desktop

---

## 2. Internal Structure (4 Vertical Zones)

```
┌─────────────────────────────────────┐
│  HEADER / CONTEXT                   │  ← 40px padding-top
│  (subtle, muted, never changes)     │
├─────────────────────────────────────┤
│                                     │
│  PRIMARY PROMPT                     │  ← 48px margin-bottom
│  (large, clear, left-aligned)       │
│                                     │
├─────────────────────────────────────┤
│  RESPONSE OPTIONS                   │
│  (vertical stack, full-width rows)  │  ← 32px between options
│  [ Option 1 ]                       │
│  [ Option 2 ]                       │
│  [ Option 3 ]                       │
│  [ Option 4 ]                       │
├─────────────────────────────────────┤
│  PROGRESS + NAVIGATION              │  ← 48px padding-top
│  [Step 2/4]          [Continue →]   │
└─────────────────────────────────────┘
```

---

## 3. Header Zone

### Content
- Label: "Operational diagnostic" or empty
- Style: text-sm (14px), text-primary-500, font-medium
- Alignment: Left
- Margin-bottom: 24px

### Rules
- Never animated
- Never clickable
- Never changes between steps
- Optional - can be omitted entirely

---

## 4. Primary Prompt Zone

### Typography
- **Size:** text-2xl (24px)
- **Weight:** font-semibold (600)
- **Color:** text-primary-900
- **Line Height:** leading-relaxed (1.625)
- **Max Width:** 600px
- **Alignment:** Left

### Spacing
- Margin-bottom: 48px from options
- Line length enforced (readable)

### Content Rules
- One sentence only
- No sub-questions
- No explanation text underneath
- Observational, not evaluative

---

## 5. Response Options Zone

### Option Container
- **Width:** 100%
- **Padding:** 24px horizontal, 20px vertical
- **Border:** 2px solid #E5E7EB (primary-200)
- **Border Radius:** 12px
- **Background:** white
- **Margin Between:** 16px

### Typography
- **Size:** text-base (16px)
- **Weight:** font-normal (400)
- **Color:** text-primary-800
- **Line Height:** leading-relaxed

### Interaction States

**Default:**
```
Background: white
Border: 2px solid #E5E7EB
Text: text-primary-800
```

**Hover:**
```
Background: #F9FAFB (primary-50)
Border: 2px solid #D1D5DB (primary-300)
Transition: 150ms ease
```

**Selected:**
```
Background: #EFF6FF (accent-50)
Border: 2px solid #3B82F6 (accent-500)
Icon: Checkmark visible (accent-500)
```

**Disabled (after selection on single-select):**
```
Opacity: 0.5
Cursor: not-allowed
```

### Checkbox/Radio Indicator
- **Size:** 20px × 20px
- **Position:** Right side, vertically centered
- **Border:** 2px solid #D1D5DB
- **Border Radius:** 4px (checkbox) or 50% (radio)
- **Selected:** Filled with accent-500, white checkmark
- **Transition:** Instant (no animation)

### Layout
- Vertical stack only (never grid)
- 3-4 options maximum
- Full-width selectable rows
- Generous padding (easy to click)

---

## 6. Progress & Navigation Zone

### Progress Indicator
- **Style:** "Step 2 of 4"
- **Typography:** text-sm, text-primary-600, font-medium
- **Position:** Bottom-left of card

### Alternative: Progress Dots
- 4 dots, 8px diameter each
- 8px gap between dots
- Current: accent-500
- Future: primary-300
- Transition: 200ms

### Continue Button
- **Width:** Auto (min 140px)
- **Padding:** 16px horizontal, 12px vertical
- **Typography:** text-base, font-semibold
- **Position:** Bottom-right

**States:**
```css
/* Enabled */
background: #3B82F6 (accent-600)
color: white
border-radius: 8px
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05)
hover: bg-accent-700, shadow-sm

/* Disabled */
background: #E5E7EB (primary-200)
color: #9CA3AF (primary-400)
cursor: not-allowed
```

### Spacing
- Padding-top: 48px from last option
- Button right-aligned
- Progress left-aligned
- 24px padding from card edges

---

## 7. Transitions Between Steps

### Timing
- **Duration:** 200ms
- **Easing:** ease-out
- **Method:** Fade + subtle vertical shift (8px)

### What Moves
- Content inside card fades out
- New content fades in
- Card container remains stable (no movement)

### Implementation
```css
animation: fadeIn 200ms ease-out
```

**Never:**
- Sliding carousels
- Horizontal motion
- Dramatic transforms
- Layout shifts

---

## 8. Auto-Advance Behavior

### Single-Select Steps (2 & 3)
- User clicks option
- 400ms delay (feedback time)
- Auto-advance to next step

### Multi-Select Steps (1 & 4)
- No auto-advance
- User must click "Continue"
- Button disabled until selection made

### Idle State
- After 6-8 seconds of inactivity: subtle pulse on continue button (optional)
- Never force progression
- Never show countdown

---

## 9. Error States (Minimal)

### Only Valid Error
- User clicks "Continue" without selecting (rare - button should be disabled)

### Error Behavior
- Button remains disabled
- No red text
- No warning messages
- **Silence > noise**

---

## 10. Mobile Adaptations

### Card Container
- **Width:** calc(100vw - 32px)
- **Padding:** 24px
- **Margin:** 80px top, 40px bottom

### Typography
- Prompt: text-xl (20px)
- Options: text-base (16px)

### Options
- Padding: 20px horizontal, 16px vertical
- Margin between: 12px

### Navigation
- Stack vertically if needed
- Button full-width on mobile

---

## 11. Accessibility Requirements

### Keyboard Navigation
- Tab through options
- Space/Enter to select
- Arrow keys to navigate (optional)
- Clear focus indicators

### Focus State
```css
outline: 2px solid #3B82F6
outline-offset: 2px
```

### Screen Reader
- Proper ARIA labels
- Step indicators announced
- Selection state announced
- No reliance on color alone

### Touch Targets
- Minimum 44px height
- Full-width clickable area
- Clear hover states on desktop

---

## 12. Handoff to Demo

### After Step 4 Complete
1. Card content fades out (300ms)
2. Transition message appears in same card
3. 2-second pause
4. Demo begins (card remains, content changes)

### Transition Message
```
"Patterns like these often lead to late detection

Here's what changes when causality becomes visible early"
```

### Visual Continuity
- Same card container
- No layout shift
- No page jump
- Smooth content replacement

---

## 13. What This Card Must NEVER Do

**Prohibited:**
- ❌ Show scores or percentages
- ❌ Show maturity levels
- ❌ Show "results" after completion
- ❌ Celebratory messages
- ❌ "You're doing great" encouragement
- ❌ Comparison to others
- ❌ Time pressure indicators
- ❌ Progress percentages
- ❌ Judgment language

**The card hands off quietly and with dignity.**

---

## 14. Emotional Check (Final Test)

**User should feel:**
- ✅ Calm
- ✅ Seen / understood
- ✅ Not judged
- ✅ Not rushed
- ✅ Slightly curious

**User should NOT feel:**
- ❌ Impressed
- ❌ Excited
- ❌ Pressured
- ❌ Tested
- ❌ Evaluated

**If the card feels clever, flashy, or playful — it has failed.**

---

## 15. Design Tokens Reference

```css
/* Card */
--card-width-max: 900px;
--card-padding-desktop: 64px;
--card-padding-mobile: 32px;
--card-border-radius: 16px;
--card-border: 1px solid #E5E7EB;
--card-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

/* Spacing */
--space-header-bottom: 24px;
--space-prompt-bottom: 48px;
--space-option-gap: 16px;
--space-navigation-top: 48px;

/* Options */
--option-padding-x: 24px;
--option-padding-y: 20px;
--option-border-radius: 12px;
--option-border-width: 2px;

/* Typography */
--prompt-size: 24px;
--prompt-weight: 600;
--option-size: 16px;
--option-weight: 400;

/* Colors */
--text-primary: #111827;
--text-secondary: #6B7280;
--border-default: #E5E7EB;
--border-hover: #D1D5DB;
--border-selected: #3B82F6;
--bg-hover: #F9FAFB;
--bg-selected: #EFF6FF;

/* Transitions */
--transition-fast: 150ms ease;
--transition-default: 200ms ease-out;
```

---

## Implementation Status

✅ Component structure created
✅ Language rules applied
✅ Interaction logic defined
⏳ Visual refinement (this spec)
⏳ Design tokens implementation
⏳ Mobile responsive polish

---

**This specification is final and ready for implementation.**

