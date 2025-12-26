# Demo Fallback Experience — LOCKED

**Version:** 1.0  
**Date:** 2025-12-15  
**Status:** ✅ All Fallback Scenarios Defined

---

## FALLBACK PRINCIPLE

Fallback is **NOT** punishment for skipping.

It's an **alternate path to same understanding**.

**Never:** Make skippers feel they missed out  
**Always:** Provide equal value through different format

---

## SCENARIO 1: USER SKIPS DEMO (INTENTIONAL)

**What Happened:**
- Clicked "Skip demo"
- Scrolled immediately
- Pressed Esc

**Fallback: STATIC INTELLIGENCE EXAMPLE**

Shows one complete reasoning chain:
- Scenario (demand spike)
- OLynk's reasoning (connections)
- Action taken (resolution)

**CTAs:** Try interactive OR Request demo

**Achieves:** Still shows "how OLynk thinks"

---

## SCENARIO 2: DEMO FAILS TO LOAD (TECHNICAL)

**What Happened:**
- JavaScript error
- Network timeout
- Assets failed

**Fallback: CONFIDENT HERO + ERROR RECOVERY**

```
The AI Brain for Business Operations
Predict. Automate. Run on autopilot.

⚠️ Interactive demo unavailable—see it live instead

[Request Live Demo]  [Learn How It Works]

150+ businesses • ₹450 Cr managed
```

**Tone:** Confident, not apologetic  
**Achieves:** Converts failure to opportunity

---

## SCENARIO 3: DEMO TIMEOUT (INACTIVE 60s)

**What Happened:**
- Demo started
- No interaction for 60s

**Fallback: GENTLE PROMPT OVERLAY**

```
Still interested?

[Continue Demo]
[Skip to Explanation]
[Request Live Demo]
```

**Behavior:**
- Overlay dismissible
- Demo paused in background
- No shame

**Achieves:** Recovers distracted users

---

## SCENARIO 4: MOBILE + SLOW CONNECTION

**What Happened:**
- Demo loads slowly (>3s)

**Fallback: PROGRESSIVE DISCLOSURE**

**Phase 1 (0-1s):**
```
The AI Brain for Business Operations
Loading intelligence demo...
Or scroll to explore ↓
```

**Phase 2 (3s+):**
```
Demo taking longer than expected

[Skip to Content]  [Request Live Demo]
```

**Achieves:** Never blank screen, always escape

---

## FALLBACK DECISION TREE

```
Demo Loads?
├─ YES
│  ├─ Engages? → Demo runs
│  └─ Skips? → Static example
│
└─ NO
   ├─ Error → Confident hero
   └─ Slow → Progressive disclosure
```

---

## ALL FALLBACKS MUST INCLUDE

1. Category definition (consistent)
2. Proof of intelligence (demo/example/offer)
3. Social proof metrics
4. Clear next steps (2+ options)
5. Scroll indicator

---

## FALLBACK COPY TONE

**❌ BAD:** "Sorry, demo isn't working"  
**✅ GOOD:** "Interactive demo unavailable—see it live"

**❌ BAD:** "Don't miss out!"  
**✅ GOOD:** "Choose your path"

---

## TESTING REQUIREMENTS

- [ ] Click skip button
- [ ] Scroll immediately
- [ ] Press Esc
- [ ] Disable JavaScript
- [ ] Throttle to 3G
- [ ] Idle for 60s
- [ ] Block assets
- [ ] Test with ad blocker

---

## SUCCESS CRITERIA

Each fallback must:
- Load <1 second
- Provide clear value
- Offer 2+ next steps
- Maintain confidence
- Work without JS

---

## ANALYTICS TRACKING

```
Event: demo_fallback_shown
Properties:
  - fallback_type: skip | error | timeout | slow
  - time_on_page: seconds
  - device: desktop | mobile
  - next_action: scroll | demo | navigate | bounce
```

**Why:** Identify issues (high skip = fix demo, high error = fix infra)

---

## FALLBACK PRIORITY

**Must Work:**
1. Static intelligence example (skip)
2. Confident hero (load failure)

**Should Work:**
3. Progressive disclosure (slow)
4. Gentle prompt (timeout)

---

**Next Step:** Translate complete demo + fallbacks to UI wireframe

---

**Document Owner:** Product + Engineering  
**Status:** Ready for wireframe translation

