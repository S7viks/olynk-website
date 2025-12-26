# Language Audit - Diagnostic & Demo Complete

## What Was Fixed

### **Diagnostic Questions (OperationalDiagnostic.tsx)**

#### ✅ **Step 1 - Operational Visibility**
**Before:** "Which of these sound familiar?"
**After:** "Which of these patterns sound familiar?"

**Options - Before:**
- "We usually discover issues..." ❌ (Used "We")
- "Our systems don't..." ❌ (Used "Our")

**Options - After:**
- "Issues are usually discovered..." ✅ (Passive, observational)
- "Systems don't always agree..." ✅ (Neutral, no pronouns)
- "Teams spend time reconciling..." ✅ (Generic "teams")
- "Experience is trusted more than forecasts" ✅ (Passive)

---

#### ✅ **Step 2 - Cross-System Dependence**
**Before:** "When demand changes unexpectedly, what usually happens first?"
**After:** "When demand changes, what usually happens first?"
- Removed "unexpectedly" (unnecessary modifier)

**Options - Before/After:** Already good
- "Inventory mismatch surfaces later"
- "Fulfillment delays start appearing"
- "Finance discovers surprises in reports"
- "Nothing looks broken yet" (improved from "No immediate impact")

---

#### ✅ **Step 3 - Decision Timing**
**Before:** "How do operational decisions typically happen?"
**After:** "How do decisions typically happen?"
- Removed "operational" (redundant in context)

**Options - Before:**
- "We respond after..." ❌ (Used "We")
- "We rely on weekly..." ❌ (Used "We")
- "We try to anticipate..." ❌ (Used "We")

**Options - After:**
- "After an alert or issue surfaces" ✅ (Passive)
- "During weekly or monthly reviews" ✅ (No pronoun)
- "By trying to anticipate, but manually" ✅ (Passive)

---

#### ✅ **Step 4 - Consequence Awareness**
**Before:** "What hurts most when operations break?"
**After:** "What hurts most when things break?"
- More universal language

**Options:** Already clean
- "Lost revenue"
- "Customer dissatisfaction"
- "Internal firefighting" (removed "and stress" - cleaner)
- "Lack of confidence in numbers" (removed "our" - was implicit)

---

### **Transition Message**

**Before:**
```
"Based on patterns like these...
Here's how intelligence changes what happens next"
```

**After:**
```
"Patterns like these often lead to late detection
Here's what changes when causality becomes visible early"
```

**Improvements:**
- ❌ Removed "Based on..." (sounds evaluative)
- ✅ "Patterns like these often lead to..." (observational)
- ❌ Removed "intelligence" (no self-promotion)
- ✅ "causality becomes visible early" (systems language)

---

### **Demo Section**

#### **Headline**
**Before:** "Here's How OLynk Thinks"
**After:** "A Signal Appears Early"

**Why:** Removes brand name, focuses on what happens, not who does it

#### **Sub-headline**
**Before:** "Watch OLynk reason across systems in real-time"
**After:** "Here's what happens when dependencies become visible"

**Why:** Removes brand, removes "reason" (too AI-focused), focuses on outcome

---

#### **Demo Labels**

**Before:**
- SCENARIO
- OLYNK'S REASONING  
- ACTION TAKEN

**After:**
- SIGNAL
- DEPENDENCIES VISIBLE
- OUTCOME

**Why:** 
- Removes brand name from middle of demo
- "Dependencies Visible" > "Reasoning" (systems language)
- "Outcome" > "Action Taken" (neutral)

---

#### **Demo Content**

**Before:**
```
Demand spike detected → 3 days from potential stockout

OLynk's Reasoning:
- Current inventory: 340 units
- Velocity increased 23% vs forecast
- Supplier lead time: 6 days
- Reorder window: 48 hours remaining
```

**After:**
```
Velocity shift detected 3 days before stockout

Dependencies Visible:
- Current stock: 340 units
- Velocity increased 23%
- Supplier lead time: 6 days  
- Reorder window: 48 hours
```

**Improvements:**
- "Velocity shift" > "Demand spike" (more technical, less dramatic)
- Removed "OLynk's Reasoning" label
- "Dependencies Visible" (systems thinking language)
- Removed "vs forecast" and "remaining" (cleaner)

---

### **Orientation Section (After Demo)**

**Before:** "That Was Intelligence, Not Automation"
**After:** "That Was Early Detection, Not Reaction"

**Why:**
- Removes "intelligence" (self-promotional)
- "Early Detection" > more specific, systems-oriented
- "Reaction" > clearer contrast

**Body Copy - Before:**
```
It was OLynk reasoning across your systems—understanding cause and effect...
```

**Body Copy - After:**
```
It was dependencies becoming visible early—understanding what affects what...
```

**Improvements:**
- ❌ Removed "OLynk" and "your" pronouns
- ✅ "dependencies becoming visible" (passive, systems language)
- ✅ "what affects what" > "cause and effect" (simpler)
- ✅ "before variance becomes visible" > "before problems become visible" (more technical)

---

### **Problem Context Section**

**Before:** "Most businesses operate reactively..."
**After:** "Most operations discover issues late..."

**Why:** "Operations" > "businesses" (more specific, less accusatory)

#### **Problem Cards - Key Fixes:**

**Fragmented Systems:**
- ❌ "You're flying blind"
- ✅ "Visibility breaks at boundaries"

**Reactive Operations:**
- ❌ "RTO spikes you didn't see coming. Always firefighting."
- ✅ "Returns spike without warning. Issues discovered after impact."

**Manual Decision-Making:**
- ❌ "No time to analyze patterns"
- ✅ "Patterns remain hidden"

**Hidden Causality:**
- ❌ "Why did revenue drop?" (questions feel accusatory)
- ✅ "Revenue drops without clear cause" (observational)

---

## Language Rules Applied

### ✅ **Voice Character**
- Calm, neutral, observational
- Analytical without being technical
- Confident without enthusiasm
- No salesy or friendly tone

### ✅ **Pronoun Rules**
- Removed almost all "you" and "your"
- Removed all "we" and "our" from diagnostic
- Used "teams," "operations," "systems" instead
- Passive voice where appropriate

### ✅ **Banned Words Avoided**
None of these appear:
- AI-powered
- Cutting-edge
- Seamless  
- Powerful
- Unlock
- Leverage
- Transform
- Optimize
- Revolutionary
- Smart dashboards

### ✅ **Preferred Vocabulary Used**
- Signals
- Patterns
- Dependencies
- Visibility
- Causality
- Early/late
- Before/after
- Impact
- Variance

---

## Remaining Work (Manual Review Needed)

### **Sections Not Yet Audited:**

1. **"What OLynk Is" section** - May contain promotional language
2. **"How It Fits" section** - Check for "your" pronouns
3. **"Who This Is For" section** - Ensure no judgment language
4. **CTA buttons** - Verify calm, optional language

### **Recommended Next Passes:**

**Pass 1:** Search entire Home.tsx for:
- "you" / "your"
- "we" / "our" 
- "AI-powered" / "intelligent" / "smart"
- Exclamation marks

**Pass 2:** Read aloud test:
- Would this sound normal from a senior ops leader?
- Does it feel obvious in hindsight, not exciting?
- Is it observational, not persuasive?

**Pass 3:** Emotional temperature:
- If it makes user feel excited → too hot
- If it makes user feel pressured → too hot
- Correct feeling: "This feels obvious now"

---

## Copy Quality Checklist

### Diagnostic Questions ✅
- [x] No "you" pronouns
- [x] No judgment language
- [x] Reference lived experience
- [x] All options feel equally common
- [x] Passive voice where appropriate

### Demo Section ✅
- [x] No brand name in critical moments
- [x] Systems language ("dependencies," "signals")
- [x] Observational, not promotional
- [x] No "intelligence" self-promotion

### Transition Message ✅
- [x] No evaluation ("based on your answers")
- [x] Observational ("patterns like these")
- [x] No excitement or pressure
- [x] Calm, neutral tone

### Orientation/Explanation ✅
- [x] No "you" pronouns in key places
- [x] Systems thinking vocabulary
- [x] Focus on what happens, not who does it
- [x] Technical without jargon

---

## Testing Script

### **Tone Test:**
Read each section aloud and ask:
1. Does this sound like a senior operator?
2. Would this work in a closed-door meeting?
3. Does it feel obvious, not exciting?

**If "no" to any:** Rewrite it.

### **Pronoun Test:**
Search for:
- "you" / "your" - Should be rare
- "we" / "our" - Should be almost absent
- "I" - Should never appear

**If found:** Convert to passive or use "teams"/"operations"

### **Marketing Test:**
Ask: "Could this appear in a startup pitch deck?"

**If yes:** It's wrong. Rewrite it.

---

## What Success Looks Like

### **User Feedback We Want:**
- "This matched my reality"
- "They understand operations"
- "Felt like a conversation, not a sales pitch"
- "No pressure, just recognition"

### **User Feedback We DON'T Want:**
- "Impressive technology"
- "Smart AI"
- "Made me feel judged"
- "Felt like I was being sold to"

---

**Status:** ✅ **Core diagnostic and demo language fixed**

**Next:** Manual audit of remaining Home page sections using this checklist

**Test at:** http://localhost:5175/

