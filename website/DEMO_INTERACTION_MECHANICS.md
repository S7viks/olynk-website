# Demo Interaction Mechanics — LOCKED

**Version:** 1.0  
**Date:** 2025-12-15  
**Status:** ✅ Interaction Rules Defined

---

## INTERACTION PRINCIPLE

Demo must feel like:
- **Guided observation** (not gameplay)
- **Self-paced discovery** (not forced sequence)
- **Calm revelation** (not flashy animation)

---

## INTERACTION MODE: HYBRID

**Auto-advance + Click-through:**
- Auto-advances with comfortable timing
- User can click to skip ahead
- Clear progress indicator
- Can pause on any phase

---

## PHASE-BY-PHASE RULES

### PHASE 1: THE WORLD
- **Entry:** Fades in on page load
- **Duration:** 3 seconds
- **User can:** Click to skip, scroll to exit, wait for auto-advance
- **Feedback:** Progress dots (1/5), subtle pulse

### PHASE 2: THE SIGNAL
- **Entry:** Smooth transition
- **Duration:** 5 seconds
- **What happens:** Subtle change (gray → amber)
- **User can:** Click highlight for detail, click anywhere to skip
- **Feedback:** Amber highlight, progress (2/5)

### PHASE 3: THE REASONING ⭐ MOST IMPORTANT
- **Entry:** After Phase 2
- **Duration:** 8 seconds
- **What happens:** Cause→effect chains animate sequentially
- **Animation:** Each connection 1.5s, total 6s + 2s hold
- **User can:** Click connections for reasoning, expand all, skip
- **Feedback:** Lines draw smoothly, progress (3/5), "OLynk is connecting patterns"

### PHASE 4: THE SIMULATION
- **Entry:** After Phase 3
- **Duration:** 6 seconds
- **What happens:** 3 action cards appear with outcomes
- **Animation:** Sequential fade-in (0.5s each), outcomes after 1s
- **User can:** Hover for detail, click to highlight, skip
- **Feedback:** Cards with borders, progress (4/5), "OLynk is simulating outcomes"

### PHASE 5: THE ACTION
- **Entry:** After Phase 4
- **Duration:** 5 seconds
- **What happens:** Selected action expands, shows reasoning, system stabilizes
- **User can:** Click for detailed reasoning, advance to exit
- **Feedback:** Progress (5/5), "Problem prevented"

---

## DEMO EXIT STATE

**After Phase 5:**
- Demo fades to background
- Overlay with 3 options:
  1. "What did I just see?" → Scroll down
  2. "How does this work?" → /how-it-works
  3. "Show me a real demo" → /request-demo

---

## PROGRESS INDICATORS

**Throughout:**
- 5 progress dots (bottom center or top right)
- Phase label (subtle)
- Skip option always visible (corner)

---

## PAUSE/RESUME

**Hover over demo:**
- Timer stops
- User explores freely
- Clicking resumes

**Scroll away:**
- Demo pauses
- Scroll back = resume from same phase

---

## MOBILE ADJUSTMENTS

- Cards stack vertically
- Tap instead of hover
- Add 2 seconds per phase
- Dots at top
- Skip button sticky

---

## ACCESSIBILITY

**Keyboard:**
- Tab = Next phase
- Shift+Tab = Previous
- Enter = Select/expand
- Esc = Skip demo

**Screen readers:**
- Phase announcements
- Connection descriptions
- Action summaries

**Motion:**
- Prefers-reduced-motion: Instant transitions

---

## FALLBACK

**If demo fails:**
- Static hero with CTA
- "Demo experiencing issues"
- Offer live demo instead

**If timeout (60s inactive):**
- Prompt: "Continue or explore?"

---

## PERFORMANCE

- Load: Interactive within 2 seconds
- Animation: 60fps
- Assets: <500KB
- No video files
- SVG animations

---

## TESTING CHECKLIST

- [ ] Auto-advance timing natural
- [ ] Click-to-advance works all phases
- [ ] Progress dots accurate
- [ ] Skip always visible
- [ ] Mobile stacking works
- [ ] Keyboard navigation complete
- [ ] Screen reader works
- [ ] Reduced motion fallback
- [ ] Pause/resume on scroll
- [ ] Exit options clear

---

**Next Step:** Define fallback experience OR translate to UI wireframe

---

**Document Owner:** Product + Engineering  
**Status:** Ready for wireframe translation

