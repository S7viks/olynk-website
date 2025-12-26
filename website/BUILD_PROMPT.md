# OLynk Website - Complete Build Prompt
**Version:** 1.1.0  
**Last Updated:** 2025-12-15

---

## 🎯 Project Brief

Build a high-converting, sophisticated marketing website for **OLynk** - an AI-native Operations Brain for growing businesses. The website should position OLynk as the #1 operational intelligence platform, combining the credibility of Operand.com with the problem-first approach of Chasi.co and the interactivity of Clay.com.

### Primary Goal
Convert 3-5% of visitors into demo requests through a lean, mysterious, high-conviction website that intrigues the right buyers and demonstrates clear value.

### Target Audience
- **Primary:** Growing businesses facing operational complexity (any size)
- **Industries:** E-commerce, D2C, Retail, Manufacturing, B2B Services, SaaS
- **Decision Makers:** Founders, CEOs, COOs, CFOs, Operations Managers
- **Pain Points:** Manual operational chaos, fragmented data, reactive firefighting, unpredictable cash flow

---

## 📚 Reference Documentation

All specifications are in the `/website` folder:

1. **WEBSITE_SPECIFICATION.md** - Complete technical spec (999 lines)
2. **COPY_MASTER.md** - All finalized copy, ready to implement
3. **COMPETITIVE_ANALYSIS.md** - Research from 16 competitor sites
4. **CHANGELOG.md** - Version history and updates
5. **README.md** - Navigation guide

**Read these files first before starting development.**

---

## 🎨 Design System

### Brand Colors

**Primary Palette:**
```css
--primary-blue: #2B5288;      /* Deep Blue - Primary brand */
--dark-navy: #223148;          /* Dark Navy - Headers, dark sections */
--warm-beige: #D2C7B8;         /* Warm Beige - Accents */
```

**Secondary Palette:**
```css
--soft-peach: #F5E0D9;         /* Soft Peach - Section backgrounds */
--cream: #F3EAE0;              /* Cream - Alternating sections */
--steel-blue: #2F486D;         /* Steel Blue - Professional accent */
```

**Functional Colors:**
```css
--success: #10B981;            /* Green - Positive metrics */
--warning: #F59E0B;            /* Amber - Alerts */
--error: #EF4444;              /* Red - Critical issues */
--white: #FFFFFF;              /* White - Primary background */
--charcoal: #1F2937;           /* Charcoal - Dark text */
```

### Typography

**Font Family:**
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

**Font Sizes:**
```css
--text-hero: 72px;             /* Hero headlines */
--text-h1: 56px;               /* Section headlines */
--text-h2: 40px;               /* Sub-sections */
--text-h3: 32px;               /* Card titles */
--text-body: 18px;             /* Body text */
--text-small: 16px;            /* Small text */
--text-tiny: 14px;             /* Captions */
--text-stat: 64px;             /* Big numbers */
```

**Font Weights:**
```css
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

**Line Heights:**
```css
--line-tight: 1.2;             /* Headlines */
--line-normal: 1.6;            /* Body text */
--line-relaxed: 1.8;           /* Long-form content */
```

### Spacing System

```css
--space-xs: 8px;
--space-sm: 16px;
--space-md: 24px;
--space-lg: 32px;
--space-xl: 48px;
--space-2xl: 64px;
--space-3xl: 80px;
--space-4xl: 120px;
```

**Vertical Section Spacing:** 80-120px between sections

### Border Radius

```css
--radius-sm: 4px;              /* Small elements */
--radius-md: 8px;              /* Cards, buttons */
--radius-lg: 16px;             /* Large cards */
--radius-xl: 24px;             /* Hero elements */
--radius-full: 9999px;         /* Pills, badges */
```

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

### Animation

```css
--transition-fast: 150ms ease;
--transition-base: 300ms ease;
--transition-slow: 500ms ease;
```

**Animation Principles:**
- Subtle, purposeful (no gratuitous motion)
- < 300ms for interactions
- Scroll-triggered fade-ins
- Smooth page transitions

---

## 🏗️ Technical Stack

### Frontend Framework

```json
{
  "framework": "Next.js 14 (App Router)",
  "ui": "React 18",
  "styling": "Tailwind CSS v3",
  "components": "Shadcn UI + Custom",
  "animation": "Framer Motion",
  "forms": "React Hook Form + Zod",
  "icons": "Lucide React",
  "state": "Zustand",
  "data-fetching": "TanStack Query (React Query)"
}
```

### Performance Requirements

```json
{
  "lighthouse-score": "> 90 (all metrics)",
  "LCP": "< 2.5s",
  "FID": "< 100ms",
  "CLS": "< 0.1",
  "bundle-size": "< 200KB (initial load)",
  "image-optimization": "Next.js Image component",
  "code-splitting": "Route-based + component lazy loading"
}
```

### Hosting & Deployment

```json
{
  "platform": "Vercel",
  "cdn": "Vercel Edge Network",
  "domain": "olynk.ai (or custom)",
  "ssl": "Auto-provisioned",
  "ci-cd": "GitHub Actions + Vercel"
}
```

### Analytics & Tracking

```json
{
  "analytics": "Google Analytics 4 + PostHog",
  "heatmaps": "Microsoft Clarity",
  "error-tracking": "Sentry",
  "a-b-testing": "Vercel Edge Config"
}
```

### SEO Requirements

```json
{
  "meta-tags": "Dynamic per page",
  "schema-markup": "Organization, Product, Article",
  "sitemap": "Auto-generated XML",
  "robots-txt": "Configured",
  "og-images": "Dynamic OpenGraph images",
  "structured-data": "JSON-LD format"
}
```

---

## 📄 Complete Homepage Structure

Build these 15 sections in order:

### **1. Hero Section**

**Layout:** Full-screen, centered content, dark background (#223148)

**Elements:**
- Navigation bar (fixed)
  - Logo (left)
  - Menu: Features, Pricing, Integrations, Case Studies, Resources
  - CTAs: "Book a Demo" (primary button)
  
- Hero content (center-aligned)
  - Headline: "The AI Brain for Business Operations" (72px, bold, white)
  - Sub-headline: "Predict problems. Automate decisions. Run your business on autopilot." (24px, white, 60% opacity)
  - 3 CTAs:
    - Primary: "Book a Demo" (solid blue button)
    - Secondary: "Talk to the AI" (outlined button)
    - Tertiary: "Try Free for 14 Days" (text link, appears on hover)
  - Trust bar: "150+ businesses • ₹450 Cr managed • 2.4M+ predictions" (16px, white, 40% opacity)

- Background visual:
  - Animated dashboard mockup
  - Subtle particle effects
  - Neural network visualization (subtle)
  - Dark gradient overlay

**Spacing:**
- Min height: 100vh
- Content padding: 120px vertical

**Animations:**
- Fade in on load
- Floating dashboard animation (subtle)
- Scroll indicator (bounce animation)

**Copy:** See COPY_MASTER.md - Hero Section

---

### **2. Problem Section**

**Headline:** "Your Best People Are Drowning in Operational Chaos"

**Layout:** 2x2 grid (desktop), stacked (mobile)

**4 Problem Cards:**

Each card structure:
- Icon (top, 64x64px, #2B5288)
- Large number/metric (48px, bold, #223148)
- Description (18px, #1F2937)
- White background, subtle shadow
- Padding: 40px
- Border radius: 16px

**Card 1:** 10-15 hrs lost per week
**Card 2:** Speed kills deals (4-24 hr wait)
**Card 3:** 40-70% revenue at risk
**Card 4:** ₹2-8 Lakhs leaked monthly

**Spacing:**
- Section padding: 120px vertical
- Grid gap: 32px
- Background: White

**Animations:**
- Scroll-triggered fade-in
- Cards slide up on scroll
- Stagger delay: 100ms between cards

**Copy:** See COPY_MASTER.md - Problem Section

---

### **3. Credibility Proof Section**

**Layout:** Centered, dark background (#223148)

**Elements:**

**Badge/Label:** "#1 in Operational Intelligence" (small label above)

**Main Statement:**
- "87.4% Average Forecast Accuracy" (64px, bold, white)
- "Across 2.4M+ predictions" (20px, white, 60% opacity)
- "certified operational data • 2025" (14px, white, 40% opacity)

**Certification Badges (4 badges in row):**
- SOC2 Type II (badge icon + text)
- GDPR Compliant (badge icon + text)
- ISO 27001 (badge icon + text)
- AES-256 Encryption (badge icon + text)
- Each badge: 120x80px, white background, subtle shadow

**3 Pillars (below badges, 3-column grid):**

Each pillar:
- Headline (20px, bold, white)
- Description (16px, white, 70% opacity)
- 200px width each
- 32px gap between

**Spacing:**
- Section padding: 100px vertical
- Content max-width: 1000px (centered)

**Copy:** See COPY_MASTER.md - Credibility Section

---

### **4. How It Works Section** ✨ NEW

**Headline:** "From Chaos to Intelligence in 3 Steps"

**Layout:** 3-column horizontal with connecting arrows

**3 Steps:**

Each step structure:
- Large icon (80x80px, #2B5288)
- Step label: "Step 1: Connect" (16px, bold, #2B5288)
- Headline: "Your existing tools in 24 hours" (24px, bold, #223148)
- Description: 2-3 sentences (16px, #1F2937)
- Timeline label: "Day 1" (14px, #2B5288, badge style)

**Connecting arrows:**
- → between steps
- Animated flow (subtle pulse)
- #2B5288 color

**Background:** Light peach (#F5E0D9)

**Spacing:**
- Section padding: 100px vertical
- Step width: 320px each
- Gap: 48px

**Animations:**
- Steps fade in on scroll (stagger)
- Arrows animate left-to-right
- Timeline badges pulse

**Copy:** See COPY_MASTER.md - How It Works Section

---

### **5. Product Video Section** ✨ NEW

**Headline:** "See OLynk in Action"
**Sub-headline:** "Watch how OLynk predicts stockouts, automates workflows, and answers questions in real-time."

**Layout:** Centered video player

**Video Element:**
- 16:9 aspect ratio
- Max width: 1200px
- Rounded corners (16px)
- Subtle shadow
- Controls visible
- Poster image: Clean dashboard screenshot
- Duration: 60 seconds

**Video Script (to produce):**
1. Dashboard overview (5 sec)
2. Predictions generating in real-time (15 sec)
3. Workflows auto-executing (15 sec)
4. Virtual COO answering questions (15 sec)
5. Results: Metrics improving (10 sec)

**CTAs Below Video:**
- "Book Your Demo" (primary button)
- "Talk to the AI" (secondary button)

**Background:** White

**Spacing:**
- Section padding: 120px vertical
- CTA margin-top: 48px

**Placeholder:**
Until video is produced, use:
- Static dashboard screenshot
- "Coming Soon" overlay
- Or interactive Loom/YouTube embed

**Copy:** See COPY_MASTER.md - Product Video Section

---

### **6. Solution Section**

**Headline:** "Automate the Chaos. Close More Deals with OLynk"
**Sub-headline:** "Give every team member a 24/7 AI brain. Built for operations—inventory, fulfillment, finance, marketing"

**Layout:** 2x2 grid of solution cards

**4 Solution Cards:**

Each card structure:
- Icon (48x48px, #2B5288)
- Title (24px, bold, #223148)
- Description (16px, #1F2937, 3-4 lines)
- White background
- Padding: 32px
- Border radius: 12px
- Hover: Lift effect + shadow

**Cards:**
1. 24/7 Prediction & Alerts
2. Eliminate Manual Work
3. Virtual COO on Demand
4. Proactive Workflows

**Background:** Light cream (#F3EAE0)

**Spacing:**
- Section padding: 100px vertical
- Grid gap: 24px
- Card hover lift: 8px

**Animations:**
- Hover: lift + shadow increase
- Scroll-triggered fade-in
- Icons can have subtle animations

**Copy:** See COPY_MASTER.md - Solution Section

---

### **7. Capabilities Section (Deep Dive)**

**Format:** 3 sections, each with "Applied in Practice" bullet list

**Each Capability Structure:**

- Large icon (64x64px)
- Category label: "#1 Predictive Intelligence" (16px, #2B5288)
- Headline: "Product Feature" (12px, uppercase, #1F2937, 60% opacity)
- Description paragraph (18px, #1F2937)
- "Applied in Practice" label (16px, bold, #223148)
- 7 bullet points (16px, #1F2937)
  - Each bullet: • Benefit → Result format
  - Example: "• Forecast demand 7-30 days ahead → prevent ₹2-5L stockout losses"

**3 Capabilities:**
1. Predictive Intelligence
2. Autonomous Operations
3. Virtual COO Interface

**Layout:** Alternating left-right (text | visual)

**Visuals:** 
- Dashboard screenshots
- Workflow diagrams
- Chat interface mockups

**Background:** White with subtle separators

**Spacing:**
- Section padding: 120px vertical
- Gap between capabilities: 80px
- Content max-width: 1200px

**Copy:** See COPY_MASTER.md - Capabilities Section

---

### **8. Interactive Demo Section** ✨ NEW

**Headline:** "Talk to Your Virtual COO"
**Sub-headline:** "Ask anything about your operations. Get instant, data-backed answers."

**Layout:** Embedded chat interface (center)

**Chat Interface:**
- Width: 800px max
- Height: 600px
- White background
- Subtle shadow
- Border radius: 16px

**Elements:**
- Header: "Virtual COO" with OLynk logo
- Sample questions (4 buttons):
  - "Why did revenue drop yesterday?"
  - "Which SKUs are at risk of stockout?"
  - "Show me my cash flow forecast"
  - "What's my RTO pattern by region?"
- Click to see pre-programmed response
- Response includes:
  - Natural language answer
  - Data visualization (chart/table)
  - Recommended actions (bullets)
  - "See this with your data →" CTA button

**Sample Response Format:**
```
Revenue dropped 18% yesterday (₹42K vs ₹51K).

Primary causes:
1. Campaign pause: Meta Ads...
2. Stockout: Top SKU...

[Chart visualization]

Recommended actions:
• Restart Meta campaign...
• Create PO for SKU...

[See this with your data →]
```

**Background:** Light peach (#F5E0D9)

**Spacing:**
- Section padding: 120px vertical
- Chat interface centered

**Animations:**
- Typing indicator when loading response
- Message slide-in animation
- Chart fade-in

**Implementation:**
- Static for MVP (pre-programmed responses)
- Phase 2: Connect to actual API

**Copy:** See COPY_MASTER.md - Interactive Demo Section

---

### **9. Template Library Section** ✨ NEW

**Headline:** "Pre-Built Solutions for Common Challenges"
**Sub-headline:** "Deploy proven workflows in minutes, not weeks."

**Layout:** 2x2 grid of template cards

**4 Template Cards:**

Each card structure:
- Icon (48x48px, #2B5288)
- Template name (20px, bold, #223148)
- Description (16px, #1F2937, 2-3 lines)
- Feature bullets (14px, #1F2937, 4 bullets)
- Result badge: "40-70% reduction" (pill shape, #10B981 background)
- CTA button: "Use This Template →" (#2B5288)
- White background
- Padding: 32px
- Border radius: 12px
- Hover: Lift + shadow

**Templates:**
1. Inventory Reorder Automation
2. RTO Prevention System
3. Campaign Performance Monitor
4. Cash Flow Alert System

**Footer:**
"+ 20 more templates available"
[Explore All Templates →] (link)

**Background:** White

**Spacing:**
- Section padding: 120px vertical
- Grid gap: 24px
- Card hover lift: 8px

**Animations:**
- Hover effects on cards
- Badge pulse animation
- Scroll-triggered fade-in

**Copy:** See COPY_MASTER.md - Template Library Section

---

### **10. Testimonials Section**

**Headline:** "What Operations Leaders Say About OLynk"

**Layout:** Carousel/rotating cards (auto-rotate every 5 seconds)

**4 Testimonial Cards:**

Each card structure:
- Quote (20px, #223148, italic)
- Customer name (16px, bold, #223148)
- Title + Company (14px, #1F2937, 70% opacity)
- Revenue/ARR (14px, #2B5288)
- Professional headshot (80x80px, circular, grayscale → color on hover)
- Company logo (120x40px, grayscale → color on hover)
- White background
- Padding: 40px
- Border radius: 16px
- Subtle shadow

**Testimonials:**
1. Ananya Desai, Kaira Clothing (₹18 Cr)
2. Rajesh Malhotra, Precision Engineering (₹42 Cr)
3. Michael Tan, CloudOps Technologies ($3.2M ARR)
4. Priya & Arjun Nair, Verde Home Living (₹25 Cr)

**Controls:**
- Navigation dots (bottom)
- Arrow buttons (left/right)
- Pause on hover
- Swipe-able on mobile

**Background:** Light cream (#F3EAE0)

**Spacing:**
- Section padding: 100px vertical
- Card max-width: 800px (centered)

**Animations:**
- Fade transition between cards
- Smooth carousel slide

**Images Needed:**
- 4 professional headshots (placeholder for now)
- 4 company logos (placeholder for now)

**Copy:** See COPY_MASTER.md - Testimonials Section

---

### **11. Integration Section**

**Headline:** "OLynk plugs into your existing tools"

**Layout:** 3-column explanation + logo grid

**3 Columns (above logos):**
- Connect: "Phone, email, web, Slack, WhatsApp"
- Automate: "Unify and automate all communications"
- Integrate: "CRM, ERP, DMS for smarter operations"

**Logo Grid:**
- 20 major integration logos
- 4 columns x 5 rows
- Each logo: 120x60px container
- Grayscale by default
- Color on hover
- Subtle scale on hover

**Top 20 Logos:**
- Shopify, WooCommerce, Magento
- Amazon, Flipkart, Myntra
- Razorpay, Stripe, PayPal, Square
- Shiprocket, FedEx, DHL, UPS
- Meta Ads, Google Ads
- Salesforce, HubSpot
- Tally, Zoho, QuickBooks

**Footer:**
"+ 30 more integrations"
[See All Integrations →] (link to /integrations page)

**Background:** White

**Spacing:**
- Section padding: 100px vertical
- Logo grid gap: 24px

**Animations:**
- Logos fade in on scroll (stagger)
- Hover: grayscale → color + scale 1.1

**Logo Assets:**
- Source from official brand kits
- SVG format preferred
- Fallback PNG @2x

---

### **12. Metrics Section**

**Headline:** "Built for Real-World Operations"

**Layout:** 4x2 grid of metric cards

**8 Metrics:**

Each metric structure:
- Large number (64px, bold, #2B5288)
- Description (18px, #1F2937, 2 lines)
- Light background (#F5E0D9)
- Padding: 32px
- Border radius: 12px
- Center-aligned text

**Metrics:**
Row 1:
- 10-15 hrs saved per week per user
- 3x faster response rate
- 40-70% fewer stockouts
- 90% fewer missed leads

Row 2:
- ₹2-8L saved monthly
- 87.4% forecast accuracy
- 99.9% uptime SLA
- 2.8 months average payback

**Background:** White

**Spacing:**
- Section padding: 100px vertical
- Grid gap: 24px

**Animations:**
- Number count-up on scroll into view
- Fade-in stagger effect

**Copy:** See COPY_MASTER.md - Metrics Section

---

### **13. FAQ Section**

**Headline:** "Frequently Asked Questions"

**Layout:** Accordion/expandable list

**6 Questions:**

Each accordion item:
- Question (18px, bold, #223148)
- Answer (16px, #1F2937, hidden by default)
- Expand/collapse icon (chevron)
- Padding: 24px
- Border-bottom: 1px solid #E5E7EB
- White background

**Behavior:**
- Click to expand/collapse
- One open at a time (accordion behavior)
- Smooth height transition
- Chevron rotates on open

**Questions:**
1. Who is OLynk for?
2. What systems does OLynk connect to?
3. Does OLynk replace my team?
4. How long does setup take?
5. What does it cost?
6. How is our data secured?

**Background:** Light cream (#F3EAE0)

**Spacing:**
- Section padding: 100px vertical
- Max-width: 800px (centered)

**Copy:** See COPY_MASTER.md - FAQ Section

---

### **14. Final CTA Section**

**Layout:** Full-width, bold background (#2B5288)

**Elements (center-aligned, white text):**
- Headline: "Try for 60 Days Risk-Free" (48px, bold)
- Sub-headline: "Book a quick call to see how OLynk transforms operations." (20px)
- Primary CTA: "Book a Demo" (large white button with blue text)
- 4 checkmarks:
  - ✓ See it live in 30 minutes
  - ✓ No credit card needed
  - ✓ 60-day money-back guarantee
  - ✓ Setup in 24 hours

**Spacing:**
- Section padding: 120px vertical
- Content max-width: 800px (centered)

**Animations:**
- Fade-in on scroll
- CTA button hover effect (scale 1.05)

**Copy:** See COPY_MASTER.md - Final CTA Section

---

### **15. Footer**

**Layout:** 5 columns + bottom bar

**Structure:**

**Column 1: Logo + Description**
- OLynk logo
- Short description (3-4 lines)
- Social icons (LinkedIn, Twitter, YouTube)

**Column 2: Product**
- Features
- Pricing
- Integrations
- Case Studies

**Column 3: Company**
- About
- Careers
- Contact
- Blog

**Column 4: Resources**
- Documentation
- API Reference
- Help Center
- Community
- Template Library ✨

**Column 5: Legal & Trust**
- Privacy Policy
- Terms of Service
- Security & Compliance
- Trust Center
- System Status ✨

**Bottom Bar:**
- Copyright: "© 2025 OLynk • Built in India 🇮🇳"
- Contact: "contact@olynk.ai"

**Background:** Dark navy (#223148)
**Text Color:** White (with varying opacity)

**Spacing:**
- Padding: 80px vertical, 120px horizontal
- Column gap: 48px

**Copy:** See COPY_MASTER.md - Footer Section

---

## 📱 Responsive Design Requirements

### Breakpoints

```css
--mobile: 0-640px         /* sm */
--tablet: 640-1024px      /* md */
--desktop: 1024-1536px    /* lg */
--large: 1536px+          /* xl */
```

### Mobile-Specific Changes

**Hero:**
- Headline: 40px (down from 72px)
- Remove background animations
- Stack CTAs vertically
- Full-width buttons

**Problem Cards:**
- Stack vertically (1 column)
- Reduce padding to 24px

**How It Works:**
- Stack steps vertically
- Remove connecting arrows
- Add step numbers (1, 2, 3)

**Solution Cards:**
- Stack vertically (1 column)

**Capabilities:**
- Remove alternating layout
- Stack all text, then visual

**Testimonials:**
- Full-width cards
- Remove headshots on mobile
- Swipe gesture enabled

**Integration Logos:**
- 2 columns (down from 4)
- Show top 12 logos only
- "+ 38 more" link

**Metrics:**
- 2x4 grid (down from 4x2)
- Reduce number size to 48px

**Footer:**
- Stack columns vertically
- Collapse to accordions

### Touch Targets

- Minimum size: 44x44px
- Adequate spacing between tappable elements
- Larger CTAs on mobile (56px height min)

---

## 🎬 Animations & Interactions

### Scroll-Triggered Animations

Use Framer Motion or Intersection Observer:

**Fade In:**
```jsx
// Elements fade in when 20% visible
opacity: 0 → 1
duration: 600ms
easing: ease-out
```

**Slide Up:**
```jsx
// Cards slide up from 40px below
y: 40 → 0
opacity: 0 → 1
duration: 600ms
stagger: 100ms (for multiple elements)
```

**Scale In:**
```jsx
// Logos, icons scale from 0.8
scale: 0.8 → 1
opacity: 0 → 1
duration: 400ms
```

### Hover Effects

**Buttons:**
```css
transition: all 200ms ease;
hover: {
  transform: scale(1.05);
  box-shadow: larger;
}
```

**Cards:**
```css
transition: all 300ms ease;
hover: {
  transform: translateY(-8px);
  box-shadow: xl;
}
```

**Logos:**
```css
transition: all 200ms ease;
hover: {
  filter: grayscale(0%);
  transform: scale(1.1);
}
```

### Loading States

**Page Load:**
- Hero fades in immediately
- Navigation slides down
- Content sections fade in on scroll

**Interactive Demo:**
- Typing indicator when "thinking"
- Message slide-in animation
- Chart/data fade-in

**Video:**
- Show poster image immediately
- Loading spinner while buffering

### Performance

- Use `will-change` sparingly
- Prefer `transform` and `opacity` for animations
- Debounce scroll events
- Use CSS animations where possible
- Lazy load off-screen animations

---

## 📝 Forms & CTAs

### Demo Request Form

**Fields:**
```
- Name (required, text)
- Work Email (required, email validation)
- Company Name (required, text)
- Phone (optional, tel)
- Company Size (optional, dropdown)
- Industry (optional, dropdown)
- Message (optional, textarea)
```

**Validation:**
- Real-time validation (on blur)
- Clear error messages
- Success state with checkmark

**Submission:**
```
- POST to /api/demo-request
- Show loading state
- Success: "Thank you! We'll contact you within 24 hours"
- Error: "Something went wrong. Please try again or email contact@olynk.ai"
```

### CTA Button Styles

**Primary:**
```css
background: #2B5288
color: white
padding: 16px 32px
border-radius: 8px
font-size: 16px
font-weight: 600
hover: darken 10%
```

**Secondary:**
```css
background: transparent
border: 2px solid #2B5288
color: #2B5288
padding: 14px 30px  /* Account for border */
border-radius: 8px
font-size: 16px
font-weight: 600
hover: background #2B5288, color white
```

**Tertiary:**
```css
background: transparent
color: #2B5288
text-decoration: underline
font-size: 16px
font-weight: 600
hover: color darken 20%
```

---

## 🔍 SEO Implementation

### Meta Tags (per page)

```html
<!-- Homepage -->
<title>OLynk - AI Operations Brain for Growing Businesses</title>
<meta name="description" content="Predict problems, automate decisions, run on autopilot. AI operations brain for e-commerce, retail & manufacturing. 87% forecast accuracy. Start free." />

<!-- Open Graph -->
<meta property="og:title" content="The AI Brain for Business Operations | OLynk" />
<meta property="og:description" content="Transform operational chaos into predictable growth. AI that predicts stockouts, automates workflows, and saves 10-15 hours weekly." />
<meta property="og:image" content="/og-image.png" />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="The AI Brain for Business Operations | OLynk" />
<meta name="twitter:description" content="Predict problems, automate decisions, run on autopilot." />
<meta name="twitter:image" content="/og-image.png" />
```

### Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "OLynk",
  "description": "AI-native Operations Brain for growing businesses",
  "url": "https://olynk.ai",
  "logo": "https://olynk.ai/logo.png",
  "sameAs": [
    "https://linkedin.com/company/olynk",
    "https://twitter.com/olynk"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-XXX-XXXX",
    "contactType": "Sales",
    "email": "contact@olynk.ai"
  }
}
```

### Sitemap Structure

```
/
/features
/pricing
/integrations
/case-studies
/about
/contact
/blog
/blog/[slug]
/privacy
/terms
/security
```

Generate dynamically with Next.js sitemap generation.

### Canonical URLs

Each page must have a canonical URL:
```html
<link rel="canonical" href="https://olynk.ai/[page]" />
```

---

## 📊 Analytics Events to Track

### Page Views
- All page navigations
- Time on page
- Scroll depth (25%, 50%, 75%, 100%)

### Engagement
- CTA clicks (all "Book Demo" buttons)
- Video plays (start, 25%, 50%, 75%, complete)
- Interactive demo interactions
- Template card clicks
- FAQ expansions

### Form Events
- Form starts
- Field completions
- Form submissions (success/error)
- Validation errors

### Navigation
- Menu clicks
- Footer link clicks
- Logo clicks (homepage)
- Integration logo clicks

### Conversion Funnel
1. Homepage view
2. Scroll past hero
3. Feature section view
4. CTA click
5. Form view
6. Form submission

---

## 🎨 Asset Requirements

### Images Needed

**Homepage:**
- Hero dashboard mockup/animation (1920x1080px)
- Certification badges (4x: SOC2, GDPR, ISO, AES-256)
- Step icons for "How It Works" (3x, 80x80px)
- Solution card icons (4x, 48x48px)
- Capability section screenshots (3x, 800x600px)
- Interactive demo chat interface mockup
- Template card icons (4x, 48x48px)
- Customer headshots (4x, 400x400px) - placeholder for now
- Customer company logos (4x) - placeholder for now
- Integration logos (20x, SVG preferred)

**Video:**
- Product demo video (60 seconds, 1920x1080px, MP4)
- Or video poster image if video not ready

**Icons:**
- All icons from Lucide React library
- Custom icons if needed (SVG format)

**Favicon:**
- favicon.ico (32x32px)
- apple-touch-icon.png (180x180px)
- og-image.png (1200x630px)

### Image Optimization

- Use Next.js `<Image>` component
- WebP format with PNG fallback
- Lazy loading for below-fold images
- Responsive images (multiple sizes)
- Blur placeholder while loading

---

## 🧪 Testing Requirements

### Cross-Browser Testing

Test on:
- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Edge (latest)
- Safari iOS (latest)
- Chrome Android (latest)

### Device Testing

- Desktop: 1920x1080, 1366x768, 1440x900
- Tablet: iPad (1024x768), iPad Pro (1366x1024)
- Mobile: iPhone 12/13/14 (390x844), Samsung Galaxy (360x640)

### Performance Testing

Run Lighthouse audits:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

### Accessibility Testing

- WCAG AA compliance
- Keyboard navigation
- Screen reader testing
- Color contrast ratios (minimum 4.5:1)
- Focus indicators visible
- Alt text for all images
- ARIA labels where appropriate

### Form Testing

- All validation scenarios
- Error message display
- Success message display
- Edge cases (special characters, long input)
- Mobile keyboard optimization

---

## 📦 Deliverables

### Phase 1: Core Website (Weeks 1-6)

**Week 1-2: Setup & Design System**
- [ ] Project setup (Next.js, Tailwind, dependencies)
- [ ] Design system implementation (colors, typography, components)
- [ ] Reusable component library
- [ ] Navigation component
- [ ] Footer component

**Week 3-4: Homepage Sections 1-8**
- [ ] Hero section
- [ ] Problem section
- [ ] Credibility section
- [ ] How It Works section
- [ ] Product Video section
- [ ] Solution section
- [ ] Capabilities section
- [ ] Interactive Demo section (static MVP)

**Week 5: Homepage Sections 9-15**
- [ ] Template Library section
- [ ] Testimonials section
- [ ] Integration section
- [ ] Metrics section
- [ ] FAQ section
- [ ] Final CTA section
- [ ] Footer

**Week 6: Polish & Testing**
- [ ] Responsive design refinement
- [ ] Animation implementation
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Accessibility audit
- [ ] Analytics implementation
- [ ] SEO optimization

### Phase 2: Secondary Pages (Weeks 7-8)

- [ ] /features page
- [ ] /pricing page
- [ ] /integrations page
- [ ] /case-studies page
- [ ] /about page
- [ ] /contact page
- [ ] Legal pages (privacy, terms, security)

### Phase 3: Advanced Features (Weeks 9-10)

- [ ] Interactive demo (API integration)
- [ ] Template library full page
- [ ] ROI calculator
- [ ] System status page
- [ ] Blog setup (if needed)
- [ ] Industry-specific landing pages

### Final Deliverables

- [ ] Source code (GitHub repository)
- [ ] Deployment to Vercel
- [ ] DNS configuration
- [ ] Analytics setup & verification
- [ ] Documentation (README, deployment guide)
- [ ] Handoff meeting & training

---

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] All content finalized and approved
- [ ] All images optimized and uploaded
- [ ] All forms tested and working
- [ ] Analytics tracking verified
- [ ] Cross-browser testing complete
- [ ] Lighthouse scores > 90
- [ ] Accessibility audit passed
- [ ] SEO meta tags verified
- [ ] Sitemap generated
- [ ] Robots.txt configured

### Deployment

- [ ] Push to main branch
- [ ] Vercel auto-deploys
- [ ] Verify production build
- [ ] Test all functionality on production
- [ ] Configure custom domain
- [ ] SSL certificate auto-provisioned
- [ ] CDN caching verified

### Post-Deployment

- [ ] Monitor error logs (Sentry)
- [ ] Check analytics data flow
- [ ] Verify form submissions working
- [ ] Test email notifications
- [ ] Monitor performance metrics
- [ ] Set up uptime monitoring
- [ ] Create status page

---

## 📞 Support & Questions

For questions during development:

**Product Questions:** Review WEBSITE_SPECIFICATION.md
**Content Questions:** Review COPY_MASTER.md
**Design Questions:** Review Design System section above
**Competitive Context:** Review COMPETITIVE_ANALYSIS.md

**Technical Issues:**
- Next.js docs: https://nextjs.org/docs
- Tailwind docs: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/

---

## ✅ Success Criteria

The website is complete and successful when:

1. **Performance**
   - ✓ Lighthouse score > 90 (all metrics)
   - ✓ Page load < 2.5 seconds
   - ✓ No console errors

2. **Functionality**
   - ✓ All 15 homepage sections implemented
   - ✓ All interactive elements working
   - ✓ Forms submitting successfully
   - ✓ Responsive on all devices

3. **Content**
   - ✓ All copy from COPY_MASTER.md implemented
   - ✓ All images optimized and displaying
   - ✓ Video embedded (or placeholder)

4. **SEO & Analytics**
   - ✓ Meta tags on all pages
   - ✓ Structured data implemented
   - ✓ Analytics tracking verified
   - ✓ Sitemap generated

5. **Polish**
   - ✓ Animations smooth and purposeful
   - ✓ Brand guidelines followed
   - ✓ Accessibility standards met
   - ✓ Cross-browser compatible

---

## 📄 Quick Start Commands

```bash
# Clone and setup
git clone [repo-url]
cd olynk-website
npm install

# Development
npm run dev          # Start dev server at localhost:3000

# Build
npm run build        # Production build
npm run start        # Start production server

# Testing
npm run lint         # ESLint
npm run type-check   # TypeScript check

# Deployment
git push origin main # Auto-deploys to Vercel
```

---

**Ready to build!** 🚀

All specifications, content, and design guidelines are provided above. Refer to the documentation files for complete details. Build the website section by section, test thoroughly, and deploy with confidence.

---

**Last Updated:** 2025-12-15  
**Version:** 1.1.0  
**Status:** Production-Ready Build Prompt

