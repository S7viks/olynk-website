# Operational Diagnostic - Implementation Complete

## Overview
A **pattern recognition experience** that helps users self-identify operational characteristics before seeing the demo—making the demo feel personal without collecting real data.

---

## Core Principles (Non-Negotiable)

### 1. **No Typing Required**
- Click/tap only interaction
- Zero friction entry
- No forms, no data entry

### 2. **No Judgment Language**
- No scores shown
- No "maturity levels"
- No "you are behind" messaging
- Pattern recognition, not evaluation

### 3. **No Time Pressure**
- Auto-advance on single-select (smooth)
- Manual continue on multi-select
- Can skip entirely

### 4. **No Business Data**
- No company names
- No revenue numbers
- No system names
- Pure pattern recognition

---

## The 4-Step Flow

### **STEP 1: Operational Visibility**
**User's implicit question:** "Do they understand how my operations actually feel?"

**Prompt:** "Which of these sound familiar?"

**Options:**
- We usually discover issues after customers are affected
- Our systems don't always agree with each other
- Ops teams spend time reconciling data manually
- We trust experience more than forecasts
- *[None of these]*

**Type:** Multi-select
**Internal signal:** Establishes reactive vs proactive posture

---

### **STEP 2: Cross-System Dependence**
**User's implicit question:** "Do they understand complexity across systems?"

**Prompt:** "When demand changes unexpectedly, what usually happens first?"

**Options:**
- Inventory mismatch surfaces later
- Fulfillment delays start appearing
- Finance discovers surprises in reports
- No immediate impact—appears fine initially

**Type:** Single-select (auto-advances)
**Internal signal:** Maps how user experiences cause vs effect

---

### **STEP 3: Decision Timing**
**User's implicit question:** "Do they understand how decisions get made here?"

**Prompt:** "How do operational decisions typically happen?"

**Options:**
- We respond after an alert or issue
- We rely on weekly or monthly reviews
- We try to anticipate issues, but manually

**Type:** Single-select (auto-advances)
**Internal signal:** Establishes decision latency

---

### **STEP 4: Consequence Awareness**
**User's implicit question:** "Do they understand what actually hurts us?"

**Prompt:** "What hurts most when operations break?"

**Options:**
- Lost revenue
- Customer dissatisfaction
- Internal firefighting and stress
- Lack of confidence in our numbers

**Type:** Multi-select
**Internal signal:** Establishes what matters most

---

## Transition Experience

### After Step 4 Completes

**User sees:**
```
Based on patterns like these...
Here's how intelligence changes what happens next
```

**Duration:** 2 seconds
**Animation:** Fade in
**Tone:** Neutral, not celebratory

### What User Does NOT See
- ❌ "Your score: 42/100"
- ❌ "You are in the 'Reactive' category"
- ❌ "Your operational maturity is..."
- ❌ Any labels, scores, or judgments

---

## Handoff to Demo

### Demo Starts With Context

If diagnostic was completed:
- Top of demo shows: *"Based on patterns like yours, here's what intelligence does differently"*
- Demo scenario feels earned, not random
- User thinks: "Yes, this is exactly how things break for us"

If diagnostic was skipped:
- Demo starts normally
- No contextual message
- Still works perfectly fine

---

## Internal Profiling (Not User-Facing)

The diagnostic generates an internal profile:

```typescript
interface DiagnosticResults {
  step1: string[];      // Selected operational visibility patterns
  step2: string;        // Cross-system dependency pattern
  step3: string;        // Decision timing pattern
  step4: string[];      // Top consequences
  profile: {
    posture: 'reactive' | 'anticipatory';
    complexity: 'high' | 'low';
    latency: 'high' | 'low';
  };
}
```

### Profiling Logic

**Posture:**
- `anticipatory` if Step 3 includes "anticipate"
- Otherwise: `reactive`

**Complexity:**
- `high` if Step 1 has 2+ selections
- Otherwise: `low`

**Latency:**
- `high` if Step 3 mentions "weekly" or "monthly"
- Otherwise: `low`

### What This Profile Enables (Future)

**Short-term:**
- Demo can emphasize different aspects based on profile
- Sales can see patterns before first call
- Content can route to relevant resources

**Long-term:**
- Product can show relevant features first
- Onboarding can prioritize based on profile
- Case studies can match user patterns

**Never:**
- Shown to user on home page
- Used to create "maturity scores"
- Used for judgment or comparison

---

## UI/UX Details

### Visual Design

**Progress Indicators:**
- 4 horizontal bars
- Current + completed = accent-500
- Future = primary-300
- Subtle, not dominant

**Option Cards:**
- White background by default
- Border: primary-200
- Hover: border-accent-300, bg-primary-50
- Selected: border-accent-500, bg-accent-50, shadow
- Checkmark appears when selected (accent-500 background)

**Typography:**
- Prompt: text-2xl font-semibold text-primary-900
- Options: text-primary-800 leading-relaxed
- Helper text: text-sm text-primary-500

**Spacing:**
- Prompt to options: mb-8
- Between options: space-y-3
- Continue button: mt-8

### Interaction Behavior

**Multi-select steps:**
- Click to toggle selection
- Multiple selections allowed
- "Continue" button appears at bottom
- Button disabled until at least 1 selection

**Single-select steps:**
- Click to select
- Auto-advance after 400ms delay
- Delay allows user to see selection feedback
- No manual "Continue" needed

**Skip behavior:**
- "Skip to demo" button in top-left (fixed position)
- Skipping goes directly to demo
- No penalty for skipping
- Demo still works perfectly

### Animations

**Fade-in:**
- Used for transition message
- Duration: 300ms
- Easing: cubic-bezier(0, 0, 0.2, 1)

**Progress bars:**
- Transition: all 200ms
- Smooth fill animation

**Option selection:**
- Border color: 150ms transition
- Background: 150ms transition
- Checkmark: instant appearance

---

## Copy Principles

### What Makes Good Diagnostic Copy

**✓ Good:**
- "We usually discover issues after customers are affected"
- "Ops teams spend time reconciling data manually"
- "We trust experience more than forecasts"

**Why:** Concrete, operational language. No jargon. Immediately recognizable.

**✗ Bad:**
- "Our operational maturity is low"
- "We lack predictive capabilities"
- "Our systems are not integrated"

**Why:** Abstract, judgmental, consultant-speak.

### Tone Guidelines

- **Observational, not evaluative**
- **Specific, not abstract**
- **Operational, not strategic**
- **Familiar, not foreign**

---

## Edge Cases & Error Handling

### User Completes Diagnostic, Then Refreshes
- Diagnostic resets (expected behavior)
- No saved state (by design)
- User can skip on second visit

### User Skips, Then Wants to Go Back
- Currently: no back button (intentional)
- Diagnostic is optional—skipping is valid path
- Can refresh to restart

### User Selects Nothing on Multi-Select
- "Continue" button disabled
- No error message
- "None of these" option available when appropriate

### Mobile Behavior
- Full-screen experience
- Options stack vertically
- Touch-friendly hit areas (py-4, px-6)
- No pinch-zoom needed

---

## Testing Checklist

### Functional
- ✓ Multi-select allows multiple options
- ✓ Single-select auto-advances
- ✓ Progress bars update correctly
- ✓ Skip button works from any step
- ✓ Transition message appears
- ✓ Demo receives context after diagnostic

### Visual
- ✓ Selection states are clear
- ✓ Hover states work
- ✓ Checkmarks appear instantly
- ✓ Progress bars animate smoothly
- ✓ Transition is calm, not jarring

### Copy
- ✓ No judgment language
- ✓ No scoring references
- ✓ Prompts are clear
- ✓ Options are recognizable
- ✓ Transition message is neutral

### Accessibility
- ✓ Keyboard navigation works
- ✓ Focus states visible
- ✓ Screen reader friendly
- ✓ Touch targets 44px+

---

## Future Enhancements (Not v1)

### Short-term (Next Phase)
- Demo tailoring based on profile
- Analytics tracking (internal only)
- A/B testing different copy

### Medium-term
- Saved state for returning users (cookie-based)
- Ability to retake diagnostic
- Richer profiling logic

### Long-term
- AI-powered demo scenarios based on profile
- Dynamic content routing
- Personalized onboarding flows

---

## What Success Looks Like

### Quantitative
- 60%+ completion rate (of those who start)
- 45-60 second average completion time
- <10% skip rate (indicates good relevance)

### Qualitative
User feedback should include:
- "This matched my reality"
- "They understand operations"
- "Didn't feel like a quiz"
- "Made the demo more relevant"

### What We DON'T Want to Hear
- "I felt judged"
- "Seemed like a test"
- "Wanted to know my score"
- "Why did I need to do this?"

---

## Implementation Files

### Component
- `src/components/OperationalDiagnostic.tsx`

### Integration
- `src/pages/Home.tsx` (diagnostic → demo flow)

### Types
```typescript
interface DiagnosticResults {
  step1: string[];
  step2: string;
  step3: string;
  step4: string[];
  profile: {
    posture: 'reactive' | 'anticipatory';
    complexity: 'high' | 'low';
    latency: 'high' | 'low';
  };
}
```

---

**Status:** ✅ Implemented and ready for testing
**Next Step:** Test the full diagnostic → demo flow at http://localhost:5175/

