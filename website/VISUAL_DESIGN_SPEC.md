# Visual Design Specification — Demo-First Home Page

**Version:** 1.0  
**Date:** 2025-12-15  
**Status:** Design System + Component Specs

---

## DESIGN PHILOSOPHY

**Core Principle:**
> "Intelligence should feel calm, not flashy. Authoritative, not aggressive."

**NOT:**
- Neon gradients
- Heavy animations
- Trendy maximalism
- Gamification

**YES:**
- Clean lines
- Subtle depth
- Purposeful motion
- Professional confidence

---

## COLOR SYSTEM

### Primary Palette

**Brand Colors:**
```
Primary:   #1F2937  (Gray-900, near-black)
Accent:    #3B82F6  (Blue-500, intelligence blue)
```

**Why these:**
- Gray-900: Authority, seriousness, intelligence
- Blue-500: Tech-forward, trustworthy, not aggressive

---

### Functional Colors

**Backgrounds:**
```
Canvas:     #FFFFFF  (White, main background)
Surface:    #F9FAFB  (Gray-50, cards/sections)
Elevated:   #FFFFFF  (White with shadow)
```

**Text:**
```
Primary:    #111827  (Gray-900, headlines)
Secondary:  #374151  (Gray-700, body)
Tertiary:   #6B7280  (Gray-500, labels/meta)
Inverse:    #FFFFFF  (White, on dark backgrounds)
```

**Borders & Dividers:**
```
Subtle:     #F3F4F6  (Gray-100)
Default:    #E5E7EB  (Gray-200)
Strong:     #D1D5DB  (Gray-300)
```

---

### State Colors

**Interactive States:**
```
Hover:      #374151  (Gray-700, darkened)
Active:     #1F2937  (Gray-900, pressed)
Focus:      #3B82F6  (Blue-500, keyboard outline)
Disabled:   #9CA3AF  (Gray-400, muted)
```

**Semantic Colors:**
```
Success:    #10B981  (Green-500, completed)
Warning:    #F59E0B  (Amber-500, attention)
Error:      #EF4444  (Red-500, critical)
Info:       #3B82F6  (Blue-500, neutral info)
```

---

### Demo-Specific Colors

**Connection Lines:**
```
Primary:    #3B82F6  (Blue-500, causal connections)
Active:     #2563EB  (Blue-600, hover state)
Complete:   #1E40AF  (Blue-700, fully drawn)
```

**Highlight States:**
```
Neutral:    #F9FAFB  (Gray-50, default)
Attention:  #FEF3C7  (Amber-50, signal detected)
Urgent:     #FEE2E2  (Red-50, action needed)
```

---

## TYPOGRAPHY

### Font Family

**Primary:** Inter (system font stack)
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', sans-serif;
```

**Why Inter:**
- Highly readable at all sizes
- Professional without being corporate
- Excellent number rendering (tabular figures)
- Variable font support

---

### Type Scale

**Headlines:**
```
H1: 48px / 56px line-height, weight 700 (bold)
    Desktop only, mobile: 36px / 44px

H2: 36px / 44px line-height, weight 700
    Section headlines

H3: 24px / 32px line-height, weight 600 (semibold)
    Subsection headlines

H4: 20px / 28px line-height, weight 600
    Card headlines
```

**Body Text:**
```
Large:   18px / 28px line-height, weight 400 (regular)
         Hero sub-headlines, important text

Default: 16px / 24px line-height, weight 400
         Standard body copy

Small:   14px / 20px line-height, weight 400
         Labels, captions, helper text

Tiny:    12px / 16px line-height, weight 500 (medium)
         Uppercase labels, metadata
```

**Mono (for data/numbers):**
```
JetBrains Mono: 14px / 20px, weight 400
Use for: Metrics, code, technical specs
```

---

### Font Weights

```
Regular:  400  (body text, default)
Medium:   500  (labels, emphasis)
Semibold: 600  (subheadings, card titles)
Bold:     700  (main headlines)
```

**Never use:**
- Light (300) — poor readability
- Extra-bold (800+) — too aggressive

---

## SPACING SYSTEM

**Base unit:** 4px

**Scale (Tailwind-aligned):**
```
1  → 4px    (tight spacing)
2  → 8px    (minimal gap)
3  → 12px   (small padding)
4  → 16px   (standard spacing)
5  → 20px   
6  → 24px   (card padding)
8  → 32px   (section spacing)
10 → 40px   
12 → 48px   (large gaps)
16 → 64px   
20 → 80px   (section padding desktop)
24 → 96px   
32 → 128px  (hero spacing)
```

---

### Component Spacing

**Cards:**
- Padding: 24px (desktop), 20px (mobile)
- Gap between cards: 24px (grid)
- Border-radius: 12px

**Sections:**
- Vertical padding: 80px (desktop), 48px (mobile)
- Horizontal padding: 24px (max-width containers)
- Section gaps: 0 (distinct backgrounds instead)

**Buttons:**
- Padding: 12px 24px (default)
- Padding: 16px 32px (large/CTA)
- Gap between buttons: 16px
- Border-radius: 8px

---

## SHADOWS & DEPTH

**Shadow Scale:**
```
None:       none
Subtle:     0 1px 2px rgba(0,0,0,0.05)
Small:      0 1px 3px rgba(0,0,0,0.1), 
            0 1px 2px rgba(0,0,0,0.06)
Default:    0 4px 6px rgba(0,0,0,0.07), 
            0 2px 4px rgba(0,0,0,0.06)
Medium:     0 10px 15px rgba(0,0,0,0.1), 
            0 4px 6px rgba(0,0,0,0.05)
Large:      0 20px 25px rgba(0,0,0,0.15), 
            0 10px 10px rgba(0,0,0,0.04)
```

**Usage:**
- Cards at rest: Small
- Cards on hover: Default
- Demo canvas: Default
- Exit overlay: Large
- Buttons: Subtle → Small on hover

---

## COMPONENT SPECIFICATIONS

### Demo Canvas

**Dimensions:** 600×400px (desktop), 320×240px (mobile)
**Background:** #FFFFFF
**Border:** 1px solid #E5E7EB
**Border-radius:** 12px
**Shadow:** 0 4px 6px rgba(0,0,0,0.07)

**System Boxes:**
- Size: 80×60px
- Background: #F9FAFB
- Border: 2px solid #E5E7EB
- Border-radius: 8px
- Icon: 32×32px, #6B7280
- Label: 12px, weight 500, #6B7280

**Connection Lines:**
- Stroke: #3B82F6
- Stroke-width: 3px
- Stroke-dasharray: 6 4 (dashed while drawing)
- Stroke-dasharray: none (solid when complete)
- Arrow: 10px triangle, same color

**Reasoning Text Box:**
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border-radius: 8px
- Padding: 16px
- Font-size: 14px
- Line-height: 20px
- Color: #374151

---

### Static Intelligence Example Card

**Container:**
- Width: 600px max
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border-radius: 12px
- Padding: 32px
- Shadow: 0 4px 6px rgba(0,0,0,0.05)

**Section Headers:**
- Font-size: 12px
- Weight: 700
- Color: #111827
- Letter-spacing: 0.5px
- Text-transform: uppercase
- Margin-bottom: 12px

**Content:**
- Font-size: 16px
- Line-height: 24px
- Color: #374151

**Internal Sections:**
- Background: #F9FAFB
- Border-radius: 8px
- Padding: 16px
- Gap: 16px between sections

---

### CTA Buttons

**Primary (Request Demo):**
```
Background:     #1F2937
Text:           #FFFFFF
Padding:        16px 32px
Border-radius:  8px
Font-size:      16px
Font-weight:    600
Shadow:         0 1px 2px rgba(0,0,0,0.05)

Hover:
  Background:   #374151
  Shadow:       0 4px 6px rgba(0,0,0,0.1)
  Transform:    translateY(-1px)

Active:
  Transform:    translateY(0)
```

**Secondary (Outlined):**
```
Background:     transparent
Text:           #1F2937
Border:         2px solid #E5E7EB
Padding:        14px 30px (account for border)
Border-radius:  8px
Font-size:      16px
Font-weight:    600

Hover:
  Border:       2px solid #1F2937
  Background:   #F9FAFB
```

**Text Link:**
```
Text:           #3B82F6
Font-size:      14px
Font-weight:    500
Text-decoration: none

Hover:
  Text-decoration: underline
  Color:        #2563EB
```

---

### Cards (Problem, Capability, Recognition)

**Default Card:**
```
Background:     #FFFFFF
Border:         1px solid #E5E7EB
Border-radius:  12px
Padding:        24px
Shadow:         0 1px 3px rgba(0,0,0,0.1)

Hover:
  Border:       1px solid #D1D5DB
  Shadow:       0 4px 6px rgba(0,0,0,0.07)
  Transform:    translateY(-2px)

Transition:     all 200ms ease
```

**Elevated Card (Section backgrounds):**
```
Background:     #F9FAFB
Border:         none
Border-radius:  16px
Padding:        32px
Shadow:         none
```

---

### Section Backgrounds

**Pattern:**
- Alternate: White → Gray-50 → White → Gray-50
- Exception: Final CTA section (Gray-900, white text)

**Section 1 (Demo):** #F9FAFB (Gray-50)
**Section 2 (Orientation):** #FFFFFF
**Section 3 (Problems):** #F9FAFB
**Section 4 (What OLynk Is):** #FFFFFF
**Section 5 (How It Fits):** #F9FAFB
**Section 6 (Who For):** #FFFFFF
**Section 7 (Next Steps):** #1F2937 (Dark, special treatment)

---

## ANIMATION SPECIFICATIONS

### Transition Timing

**Speed:**
```
Fast:    150ms  (hover states, small changes)
Default: 200ms  (most interactions)
Slow:    300ms  (fade-ins, page transitions)
Demo:    1500ms (connection line drawing)
```

**Easing:**
```
Default:  ease-in-out  (most animations)
Ease-out: cubic-bezier(0, 0, 0.2, 1)  (entrances)
Ease-in:  cubic-bezier(0.4, 0, 1, 1)  (exits)
Spring:   cubic-bezier(0.34, 1.56, 0.64, 1)  (playful, buttons)
```

---

### Hover Animations

**Cards:**
```css
transition: all 200ms ease-in-out;
transform: translateY(-2px);
box-shadow: 0 4px 6px rgba(0,0,0,0.07);
```

**Buttons:**
```css
transition: all 150ms cubic-bezier(0.34, 1.56, 0.64, 1);
transform: translateY(-1px);
box-shadow: 0 4px 6px rgba(0,0,0,0.1);
```

**Links:**
```css
transition: color 150ms ease;
text-decoration: underline;
```

---

### Entrance Animations

**Fade-in (default):**
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

animation: fadeIn 300ms cubic-bezier(0, 0, 0.2, 1);
```

**Slide-up (sections on scroll):**
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

animation: slideUp 400ms cubic-bezier(0, 0, 0.2, 1);
```

---

### Demo-Specific Animations

**Line Drawing:**
```css
stroke-dasharray: 1000;
stroke-dashoffset: 1000;

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

animation: draw 1500ms ease-in-out forwards;
```

**Pulse (system boxes):**
```css
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

animation: pulse 500ms ease-in-out;
```

---

## RESPONSIVE DESIGN

### Breakpoints

```
Mobile:   < 768px
Tablet:   768px - 1024px
Desktop:  > 1024px
```

### Mobile Adjustments

**Typography:**
- H1: 36px → 32px
- H2: 36px → 28px
- H3: 24px → 20px
- Body: 18px → 16px

**Spacing:**
- Section padding: 80px → 48px
- Card padding: 24px → 20px
- Grid gaps: 24px → 16px

**Components:**
- Demo canvas: 600×400 → 320×240
- Cards: Grid → Stack (1 column)
- Buttons: Full width on mobile

---

## ACCESSIBILITY

### Color Contrast

**Minimum ratios (WCAG AA):**
- Body text: 7:1 (exceeds 4.5:1)
- Large text: 4.5:1 (exceeds 3:1)
- UI elements: 3:1 minimum

**Verified pairs:**
- #111827 on #FFFFFF: 16:1 ✓
- #374151 on #FFFFFF: 9:1 ✓
- #6B7280 on #FFFFFF: 4.5:1 ✓

---

### Focus States

**All interactive elements:**
```css
outline: 2px solid #3B82F6;
outline-offset: 2px;
border-radius: inherit;
```

**Keyboard navigation:**
- Visible focus on Tab
- Logical tab order
- Skip links for sections

---

## DESIGN TOKENS (CSS Variables)

```css
:root {
  /* Colors */
  --color-primary: #1F2937;
  --color-accent: #3B82F6;
  --color-text: #374151;
  --color-bg: #FFFFFF;
  --color-surface: #F9FAFB;
  
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-20: 80px;
  
  /* Typography */
  --font-sans: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg: 0 20px 25px rgba(0,0,0,0.15);
  
  /* Timing */
  --timing-fast: 150ms;
  --timing-default: 200ms;
  --timing-slow: 300ms;
}
```

---

## IMPLEMENTATION CHECKLIST

**Colors:**
- [ ] Primary palette applied consistently
- [ ] Text contrast meets WCAG AA
- [ ] State colors defined and used
- [ ] Dark mode considered (future)

**Typography:**
- [ ] Inter font loaded correctly
- [ ] Type scale applied consistently
- [ ] Line-heights comfortable (1.5-1.6 for body)
- [ ] Font weights not overused

**Spacing:**
- [ ] Base 4px unit respected
- [ ] Consistent padding on similar elements
- [ ] Section spacing creates clear hierarchy
- [ ] Mobile spacing adjusted

**Components:**
- [ ] All component specs followed
- [ ] Hover states smooth (200ms)
- [ ] Focus states visible
- [ ] Mobile versions implemented

**Animations:**
- [ ] Prefers-reduced-motion respected
- [ ] 60fps maintained
- [ ] Easing curves appropriate
- [ ] Demo animations smooth

---

## DESIGN SYSTEM STATUS

✅ **Complete:**
- Color system
- Typography scale
- Spacing system
- Shadow scale
- Component specs
- Animation rules
- Responsive rules

**Ready for:** Figma design file + development handoff

---

**Document Owner:** Design Team  
**Status:** Complete specification, ready for visual design  
**Next:** Create Figma mockups using this system

