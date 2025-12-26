# OLynk Website - Premium Lovable Build Prompt

Build a **sophisticated, high-converting marketing website** for **OLynk** - an AI-native Operations Brain. This should feel like a premium SaaS product with smooth animations, excellent usability, and polished interactions throughout.

---

## Tech Stack
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router with smooth scroll
- **Icons**: Lucide React
- **Animations**: Framer Motion (heavy use throughout)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts (for data visualizations)
- Build tool: Vite

---

## Design Philosophy

**Premium, Sophisticated, Trustworthy**
- Every interaction should feel polished and intentional
- Animations enhance understanding, never distract
- Usability is paramount - accessible, keyboard-friendly, intuitive
- Performance is critical - smooth 60fps animations, fast load times

---

## Animation System

### Core Principles
1. **Entrance animations**: Fade + slide up (50px) for all sections on scroll
2. **Stagger effects**: Items in grids/lists appear sequentially with 100ms delay
3. **Hover states**: Lift + shadow increase for all interactive elements
4. **Micro-interactions**: Button presses, form inputs, toggles all have feedback
5. **Timing**: 300-500ms for most transitions, 150ms for micro-interactions
6. **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` for smooth, natural feel

### Animation Library (Use Framer Motion)

**Scroll Animations** (apply to ALL sections):
```typescript
// Each section should fade in and slide up when entering viewport
variants={{
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
}}
initial="hidden"
whileInView="visible"
viewport={{ once: true, margin: "-100px" }}
```

**Stagger Children** (for grids, lists):
```typescript
// Parent container
variants={{
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}}

// Child items
variants={{
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}}
```

**Hover Effects** (for cards, buttons):
```typescript
whileHover={{ y: -8, transition: { duration: 0.2 } }}
whileTap={{ scale: 0.98 }}
```

**Number Counter Animation** (for metrics):
- Animate from 0 to target number when visible
- Use smooth easing
- Format with commas/decimals

---

## Usability Features (Critical)

### Keyboard Navigation
- All interactive elements focusable with Tab
- Focus indicators: 2px outline, #2B5288 color, 4px offset
- Escape key closes modals
- Enter/Space activates buttons
- Arrow keys navigate carousel/accordion

### Loading States
- Skeleton loaders for content
- Spinner for form submissions
- Progress bar for multi-step processes
- Optimistic UI updates where applicable

### Error Handling
- Inline form validation with clear messages
- Error states with red border + icon
- Success states with green checkmark
- Toast notifications for async actions

### Accessibility (WCAG 2.1 AA)
- Semantic HTML (nav, main, section, article)
- ARIA labels for icons and interactive elements
- Alt text for all images
- Sufficient color contrast (4.5:1 minimum)
- Skip to main content link
- Focus trap in modals

### Performance
- Lazy load images with blur placeholder
- Code split by route
- Debounce search/filter inputs
- Virtualize long lists (if applicable)
- Preload critical fonts

---

## Color System

```css
/* Primary Colors */
--primary-blue: #2B5288;
--dark-navy: #223148;
--steel-blue: #2F486D;

/* Neutral Colors */
--warm-beige: #D2C7B8;
--soft-peach: #F5E0D9;
--cream: #F3EAE0;

/* Functional Colors */
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--white: #FFFFFF;
--charcoal: #1F2937;
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-500: #6B7280;
--gray-900: #111827;
```

---

## Typography System

```css
/* Font Family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Font Sizes (with responsive scaling) */
--text-xs: 12px;    /* Captions */
--text-sm: 14px;    /* Small text */
--text-base: 16px;  /* Body mobile */
--text-lg: 18px;    /* Body desktop */
--text-xl: 20px;    /* Sub-headlines mobile */
--text-2xl: 24px;   /* Sub-headlines desktop */
--text-3xl: 32px;   /* Section headlines mobile */
--text-4xl: 40px;   /* Section headlines tablet */
--text-5xl: 56px;   /* Section headlines desktop */
--text-6xl: 72px;   /* Hero headline desktop */

/* Line Heights */
--leading-tight: 1.2;
--leading-normal: 1.5;
--leading-relaxed: 1.6;

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## Component Library

### Buttons

**Primary Button**:
```tsx
<motion.button
  whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(43, 82, 136, 0.3)" }}
  whileTap={{ scale: 0.98 }}
  className="bg-[#2B5288] text-white px-8 py-4 rounded-lg font-semibold text-lg
    shadow-md hover:bg-[#223148] transition-colors duration-300
    focus:outline-none focus:ring-2 focus:ring-[#2B5288] focus:ring-offset-2"
>
  Book a Demo
</motion.button>
```

**Secondary Button**:
```tsx
<motion.button
  whileHover={{ scale: 1.02, borderColor: "#223148", color: "#223148" }}
  whileTap={{ scale: 0.98 }}
  className="border-2 border-[#2B5288] text-[#2B5288] px-8 py-4 rounded-lg font-semibold text-lg
    hover:bg-[#2B5288] hover:text-white transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-[#2B5288] focus:ring-offset-2"
>
  Talk to the AI
</motion.button>
```

### Cards

```tsx
<motion.div
  variants={{
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }}
  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)" }}
  className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300
    border border-gray-100"
>
  {/* Card content */}
</motion.div>
```

### Form Inputs

```tsx
<div className="relative">
  <input
    type="email"
    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200
      focus:border-[#2B5288] focus:ring-4 focus:ring-[#2B5288]/10
      transition-all duration-200 outline-none
      placeholder:text-gray-400"
    placeholder="your.email@company.com"
  />
  {/* Error state: add border-red-500, show error message with slide-down animation */}
  {/* Success state: add border-green-500, show checkmark icon */}
</div>
```

---

## Navigation (Fixed Header with Smart Behavior)

### Structure
- Fixed position, top of viewport
- Initial: transparent background with white text (on dark hero)
- On scroll (after 100px): solid white background with shadow, text color changes to dark
- Smooth transition between states (300ms)
- Hide on scroll down, show on scroll up (auto-hide behavior for cleaner experience)

### Layout
```tsx
<motion.nav
  initial={{ y: 0 }}
  animate={{ 
    backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
    backdropFilter: scrolled ? 'blur(10px)' : 'none',
    boxShadow: scrolled ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none'
  }}
  className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
>
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    {/* Logo */}
    <div className="text-2xl font-bold">OLynk</div>
    
    {/* Desktop Menu */}
    <div className="hidden md:flex items-center gap-8">
      <a href="#features" className="hover:text-[#2B5288] transition-colors">Features</a>
      <a href="#pricing" className="hover:text-[#2B5288] transition-colors">Pricing</a>
      <a href="#integrations" className="hover:text-[#2B5288] transition-colors">Integrations</a>
      <a href="#case-studies" className="hover:text-[#2B5288] transition-colors">Case Studies</a>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#2B5288] text-white px-6 py-2 rounded-lg font-semibold"
      >
        Book a Demo
      </motion.button>
    </div>
    
    {/* Mobile Menu Button */}
    <button className="md:hidden">
      <Menu className="w-6 h-6" />
    </button>
  </div>
</motion.nav>
```

### Mobile Menu
- Slide in from right
- Full-screen overlay with blur backdrop
- Animated menu items (stagger in)
- Close on link click or outside tap

---

## Homepage Sections (15 Sections with Premium Animations)

---

### Section 1: Hero (Dark Background #223148)

**Layout**: Full viewport height (100vh), centered content, dramatic entrance

**Background**: 
- Gradient from #223148 to #2F486D (diagonal)
- Animated particles/dots (subtle, slow floating motion)
- Optional: Animated mesh gradient or subtle geometric patterns

**Content Animation Sequence**:
1. Headline fades in + scales from 0.9 to 1.0 (delay: 200ms)
2. Sub-headline fades in (delay: 500ms)
3. CTA buttons fade in + slide up (delay: 800ms, stagger: 100ms)
4. Trust bar fades in (delay: 1200ms)

```tsx
<section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#223148] to-[#2F486D] overflow-hidden">
  {/* Animated background particles */}
  <div className="absolute inset-0 opacity-20">
    {/* Generate 50 floating particles with random positions and animations */}
  </div>
  
  <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
    {/* Headline */}
    <motion.h1
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
      className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
    >
      The AI Brain for<br />Business Operations
    </motion.h1>
    
    {/* Sub-headline */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
    >
      Predict problems. Automate decisions. Run your business on autopilot.
    </motion.p>
    
    {/* CTAs */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
    >
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 12px 32px rgba(255, 255, 255, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-[#2B5288] px-8 py-4 rounded-lg font-semibold text-lg shadow-xl
          hover:shadow-2xl transition-all duration-300"
      >
        Book a Demo
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        whileTap={{ scale: 0.95 }}
        className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg
          hover:bg-white/10 transition-all duration-300"
      >
        Talk to the AI
      </motion.button>
      
      <motion.a
        whileHover={{ x: 4 }}
        href="#"
        className="text-white underline font-semibold text-lg hover:text-white/80 transition-colors"
      >
        Try Free for 14 Days →
      </motion.a>
    </motion.div>
    
    {/* Trust Bar */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="text-white/50 text-sm flex items-center justify-center gap-4 flex-wrap"
    >
      <span>150+ businesses</span>
      <span>•</span>
      <span>₹450 Cr managed</span>
      <span>•</span>
      <span>2.4M+ predictions</span>
    </motion.div>
  </div>
  
  {/* Scroll indicator (animated) */}
  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
  >
    <ChevronDown className="w-8 h-8 text-white/50" />
  </motion.div>
</section>
```

---

### Section 2: The Problem (White Background)

**Animation**: Cards appear with stagger effect, hover effects are prominent

```tsx
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="text-5xl md:text-6xl font-bold text-[#223148] text-center mb-16"
    >
      Your Best People Are Drowning<br />in Operational Chaos
    </motion.h2>
    
    {/* Grid with stagger animation */}
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 }
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid md:grid-cols-2 gap-8"
    >
      {/* Problem Card 1 */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        whileHover={{ 
          y: -12, 
          boxShadow: "0 24px 48px rgba(43, 82, 136, 0.15)",
          transition: { duration: 0.3 }
        }}
        className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-[#2B5288]/30 transition-colors duration-300"
      >
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <Clock className="w-16 h-16 text-[#2B5288] mb-6" />
        </motion.div>
        <div className="text-5xl font-bold text-[#223148] mb-2">10-15 hrs</div>
        <div className="text-xl text-gray-600 mb-4 font-medium">lost per week per user</div>
        <p className="text-gray-500 leading-relaxed">
          Chasing data across 10+ tools, manual reconciliation, Excel chaos
        </p>
      </motion.div>
      
      {/* Problem Card 2 */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        whileHover={{ 
          y: -12, 
          boxShadow: "0 24px 48px rgba(43, 82, 136, 0.15)" 
        }}
        className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-[#2B5288]/30 transition-colors duration-300"
      >
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <AlertCircle className="w-16 h-16 text-[#2B5288] mb-6" />
        </motion.div>
        <div className="text-4xl font-bold text-[#223148] mb-2">Speed kills deals</div>
        <div className="text-xl text-gray-600 mb-4 font-medium">Inquiries wait 4-24 hours</div>
        <p className="text-gray-500 leading-relaxed">
          Costing you customers and repeat business
        </p>
      </motion.div>
      
      {/* Problem Card 3 */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        whileHover={{ y: -12, boxShadow: "0 24px 48px rgba(43, 82, 136, 0.15)" }}
        className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-[#2B5288]/30 transition-colors duration-300"
      >
        <motion.div whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}>
          <TrendingDown className="w-16 h-16 text-[#2B5288] mb-6" />
        </motion.div>
        <div className="text-5xl font-bold text-[#223148] mb-2">40-70%</div>
        <div className="text-xl text-gray-600 mb-4 font-medium">of revenue at risk</div>
        <p className="text-gray-500 leading-relaxed">
          From stockouts you discover too late
        </p>
      </motion.div>
      
      {/* Problem Card 4 */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        whileHover={{ y: -12, boxShadow: "0 24px 48px rgba(43, 82, 136, 0.15)" }}
        className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-[#2B5288]/30 transition-colors duration-300"
      >
        <motion.div whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}>
          <DollarSign className="w-16 h-16 text-[#2B5288] mb-6" />
        </motion.div>
        <div className="text-5xl font-bold text-[#223148] mb-2">₹2-8 Lakhs</div>
        <div className="text-xl text-gray-600 mb-4 font-medium">leaked monthly</div>
        <p className="text-gray-500 leading-relaxed">
          From preventable RTO, stockouts, and delays
        </p>
      </motion.div>
    </motion.div>
  </div>
</section>
```

---

### Section 3: Credibility Proof (Dark Background #223148)

**Animation**: Scale in effect for main stat, badges slide up

```tsx
<section className="py-24 bg-[#223148]">
  <div className="max-w-5xl mx-auto px-6 text-center">
    {/* Badge */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="inline-block bg-[#D2C7B8]/20 text-[#D2C7B8] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide mb-8"
    >
      #1 in Operational Intelligence
    </motion.div>
    
    {/* Main Stat with Counter Animation */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-4"
    >
      <CountUp
        end={87.4}
        decimals={1}
        suffix="%"
        duration={2.5}
        className="text-7xl md:text-8xl font-bold text-white"
      />
    </motion.div>
    
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="text-2xl text-white/70 mb-2"
    >
      Average Forecast Accuracy
    </motion.p>
    
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="text-white/50 text-sm mb-12"
    >
      Across 2.4M+ predictions
    </motion.p>
    
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="text-white/40 text-xs uppercase tracking-wider mb-16"
    >
      certified operational data • 2025
    </motion.p>
    
    {/* Certification Badges */}
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delay: 0.8 } }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-wrap items-center justify-center gap-6 mb-20"
    >
      {['SOC2 Type II', 'GDPR', 'ISO 27001', 'AES-256'].map((cert, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          whileHover={{ scale: 1.1, y: -4 }}
          className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg flex items-center gap-3
            border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          <Shield className="w-5 h-5 text-white" />
          <span className="text-white font-medium">{cert}</span>
        </motion.div>
      ))}
    </motion.div>
    
    {/* 3 Pillars */}
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delay: 1 } }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid md:grid-cols-3 gap-8 text-left"
    >
      {[
        {
          title: "Built for Operations",
          text: "AI trained on operational problems—inventory, cash flow, fulfillment"
        },
        {
          title: "End-to-End Automation",
          text: "Connects, predicts, executes—continuously. Zero manual work."
        },
        {
          title: "Auditable & Explainable",
          text: "Every prediction backed by reasoning. Full transparency."
        }
      ].map((item, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          whileHover={{ y: -4 }}
          className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
          <p className="text-white/70 leading-relaxed">{item.text}</p>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>
```

---

### Section 4: How It Works (Light Background #F5E0D9)

**Animation**: Timeline with sequential reveal, arrows pulse

```tsx
<section className="py-24 bg-[#F5E0D9]">
  <div className="max-w-7xl mx-auto px-6">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-5xl md:text-6xl font-bold text-[#223148] text-center mb-20"
    >
      From Chaos to Intelligence in 3 Steps
    </motion.h2>
    
    {/* Timeline */}
    <div className="relative">
      {/* Connecting line (animated on scroll) */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="hidden md:block absolute top-32 left-0 right-0 h-0.5 bg-[#2B5288]/30 origin-left"
      />
      
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-12 relative z-10"
      >
        {/* Step 1 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="text-center"
        >
          {/* Icon with pulse animation */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <Plug className="w-12 h-12 text-[#2B5288]" />
          </motion.div>
          
          {/* Timeline Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-block bg-[#2B5288] text-white px-4 py-1 rounded-full text-sm font-bold mb-4"
          >
            Day 1
          </motion.div>
          
          <div className="text-sm font-semibold text-[#2B5288] mb-3 uppercase tracking-wide">
            Step 1: Connect
          </div>
          <h3 className="text-2xl font-bold text-[#223148] mb-4">
            Your tools in 24 hours
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Seamlessly integrate 50+ platforms. OAuth authentication, no code required.
          </p>
        </motion.div>
        
        {/* Arrow (animated) */}
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="hidden md:flex items-center justify-center absolute top-32 left-1/3 transform -translate-x-1/2"
        >
          <ArrowRight className="w-8 h-8 text-[#2B5288]" />
        </motion.div>
        
        {/* Step 2 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <Brain className="w-12 h-12 text-[#2B5288]" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: "spring" }}
            className="inline-block bg-[#2B5288] text-white px-4 py-1 rounded-full text-sm font-bold mb-4"
          >
            5-7 days
          </motion.div>
          
          <div className="text-sm font-semibold text-[#2B5288] mb-3 uppercase tracking-wide">
            Step 2: Learn
          </div>
          <h3 className="text-2xl font-bold text-[#223148] mb-4">
            AI analyzes your operations
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Syncs 30-90 days of data, builds your digital twin, trains on your patterns.
          </p>
        </motion.div>
        
        {/* Arrow (animated) */}
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="hidden md:flex items-center justify-center absolute top-32 left-2/3 transform -translate-x-1/2"
        >
          <ArrowRight className="w-8 h-8 text-[#2B5288]" />
        </motion.div>
        
        {/* Step 3 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <Zap className="w-12 h-12 text-[#2B5288]" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, type: "spring" }}
            className="inline-block bg-[#2B5288] text-white px-4 py-1 rounded-full text-sm font-bold mb-4"
          >
            Week 2+
          </motion.div>
          
          <div className="text-sm font-semibold text-[#2B5288] mb-3 uppercase tracking-wide">
            Step 3: Automate
          </div>
          <h3 className="text-2xl font-bold text-[#223148] mb-4">
            Predictions go live
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Start with alerts, then enable autonomous workflows. AI predicts, explains, fixes.
          </p>
        </motion.div>
      </motion.div>
    </div>
  </div>
</section>
```

---

### Section 5: Product Video (White Background)

**Animation**: Video container zooms in, play button pulses

```tsx
<section className="py-24 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-5xl md:text-6xl font-bold text-[#223148] text-center mb-6"
    >
      See OLynk in Action
    </motion.h2>
    
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto"
    >
      Watch how OLynk predicts stockouts, automates workflows, and answers questions in real-time.
    </motion.p>
    
    {/* Video Container */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gradient-to-br from-[#2B5288] to-[#223148] cursor-pointer group"
    >
      {/* Play Button */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl
            group-hover:bg-[#2B5288] group-hover:text-white transition-all duration-300"
        >
          <Play className="w-10 h-10 ml-1" fill="currentColor" />
        </motion.div>
      </motion.div>
      
      {/* Video Overlay Text */}
      <div className="absolute bottom-8 left-8 right-8">
        <div className="text-white text-2xl font-bold mb-2">Product Demo</div>
        <div className="text-white/70">60 seconds</div>
      </div>
    </motion.div>
    
    {/* CTAs Below */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#2B5288] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
      >
        Book Your Demo
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="border-2 border-[#2B5288] text-[#2B5288] px-8 py-4 rounded-lg font-semibold
          hover:bg-[#2B5288] hover:text-white transition-all"
      >
        Talk to the AI
      </motion.button>
    </motion.div>
  </div>
</section>
```

---

### Sections 6-15 Continue with Same Premium Polish

For brevity, I'll provide the key animation patterns for remaining sections:

**Section 6: Solution Cards**
- Grid items slide in from bottom with stagger
- Hover: lift + shadow + icon animation (rotate/scale)
- Icons pulse gently on page load

**Section 7: Interactive Demo**
- Chat interface slides up from bottom
- Sample questions appear with typewriter effect
- Response area has skeleton loader → content fade in
- Smooth scroll within chat area

**Section 8: Template Library**
- Cards flip on hover to show detailed info
- Feature bullets slide in sequentially
- Result badges have subtle shine animation
- "Use Template" button has arrow slide-in on hover

**Section 9: Testimonials**
- Carousel with smooth slide transitions (500ms)
- Auto-rotate every 6 seconds
- Drag/swipe support for mobile
- Avatar images have scale-up on load
- Quote marks animated

**Section 10: Integrations**
- Logos fade from grayscale to color on scroll
- Hover: scale up + color (if grayscale)
- Grid animates in with stagger
- "+ 30 more" has subtle pulse

**Section 11: Metrics**
- Number counter animations (count up)
- Cards slide in with stagger
- Hover: slight scale + shadow increase
- Progress bars animate width on scroll

**Section 12: FAQ**
- Accordion with smooth height transitions
- ChevronDown rotates 180° when open
- Answer content fades in while expanding
- Only one open at a time
- Keyboard accessible (Enter/Space)

**Section 13: Final CTA**
- Dramatic entrance (scale + fade)
- Checkmarks appear sequentially with slide-in
- Button has enhanced hover (lift + glow effect)
- Trust badges slide up from bottom

**Section 14: Footer**
- Fade in on scroll
- Links have underline animation on hover (slide from left)
- Social icons have rotation on hover
- Organized in clear columns

---

## Form Implementation (Demo Request Modal)

```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h3 className="text-3xl font-bold text-[#223148] mb-2">Book Your Demo</h3>
        <p className="text-gray-600 mb-8">See OLynk in action. No credit card required.</p>
        
        <form className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200
                focus:border-[#2B5288] focus:ring-4 focus:ring-[#2B5288]/10
                transition-all duration-200 outline-none"
              placeholder="John Doe"
            />
          </div>
          
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Work Email</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="email"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200
                focus:border-[#2B5288] focus:ring-4 focus:ring-[#2B5288]/10
                transition-all duration-200 outline-none"
              placeholder="you@company.com"
            />
            {/* Show checkmark icon when valid email */}
          </div>
          
          {/* Company Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200
                focus:border-[#2B5288] focus:ring-4 focus:ring-[#2B5288]/10
                transition-all duration-200 outline-none"
              placeholder="ACME Corp"
            />
          </div>
          
          {/* Industry Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <select className="w-full px-4 py-3 rounded-lg border-2 border-gray-200
              focus:border-[#2B5288] focus:ring-4 focus:ring-[#2B5288]/10
              transition-all duration-200 outline-none">
              <option>E-commerce / D2C</option>
              <option>Retail</option>
              <option>Manufacturing</option>
              <option>B2B Services</option>
              <option>SaaS</option>
              <option>Other</option>
            </select>
          </div>
          
          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(43, 82, 136, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#2B5288] text-white py-4 rounded-lg font-semibold text-lg
              shadow-md hover:bg-[#223148] transition-all duration-300"
          >
            Request Demo
          </motion.button>
          
          <p className="text-xs text-gray-500 text-center">
            By submitting, you agree to our Terms and Privacy Policy
          </p>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

---

## Performance Optimizations

1. **Lazy Loading**:
```tsx
const Section7 = lazy(() => import('./sections/Section7'));
const Section8 = lazy(() => import('./sections/Section8'));
// etc.

<Suspense fallback={<SkeletonLoader />}>
  <Section7 />
</Suspense>
```

2. **Image Optimization**:
- Use next-gen formats (WebP, AVIF)
- Blur placeholder while loading
- Responsive srcset for different screen sizes
- Lazy load images below fold

3. **Code Splitting**:
- Split by route
- Split heavy libraries (charts, animations)
- Dynamic imports for modals/overlays

---

## Mobile Responsiveness

### Breakpoints
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Mobile-Specific Adjustments
- Hero headline: 40px (from 72px)
- Section headlines: 32px (from 56px)
- Padding: 60px vertical (from 120px)
- All grids: 1 column (from 2-4)
- Navigation: Hamburger menu with slide-in drawer
- Cards: Full width with 16px margin
- Touch targets: Minimum 44x44px
- Font sizes: Scale down 20-30%

---

## Accessibility Checklist

- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible on all focusable elements
- [ ] ARIA labels for icon-only buttons
- [ ] Alt text for all images
- [ ] Semantic HTML structure
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Form inputs have associated labels
- [ ] Error messages are descriptive
- [ ] Skip to main content link
- [ ] Headings in logical order (h1 → h2 → h3)
- [ ] Reduced motion support for users who prefer it

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Testing Requirements

### Cross-Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Device Testing
- iPhone (Safari)
- Android phone (Chrome)
- iPad (Safari)
- Desktop (all browsers)

### Performance Targets
- Lighthouse Score: 90+ (all categories)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

---

## Final Notes

This website should feel **premium, polished, and performant**. Every interaction should delight the user. Animations should enhance understanding and guide attention. Usability should be flawless across all devices and input methods.

**Key Success Metrics:**
- Smooth 60fps animations throughout
- Zero layout shift during page load
- Clear visual hierarchy and flow
- Excellent keyboard navigation
- Responsive on all screen sizes
- Fast load times (< 3 seconds)
- High conversion on CTAs

Build this as a **world-class SaaS marketing site** that establishes OLynk as a category leader in autonomous operations.
