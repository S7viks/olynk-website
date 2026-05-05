/**
 * Home Page - Diagnostic-First Architecture
 * 
 * Purpose: Help user self-identify operational patterns, THEN show how Trita thinks
 * User Intent: "Is this for me?" → "What does this do?"
 * 
 * Structure:
 * 0. Operational Diagnostic (4-step pattern recognition)
 * 1. Interactive Demo Container (contextualized by diagnostic)
 * 2. Orientation (What you just saw)
 * 3. Problem Context (Why this matters)
 * 4. What Trita Is (High-level explanation)
 * 5. How It Fits (Mental safety)
 * 6. Who This Is For (Recognition)
 * 7. Next Steps (Conversion)
 */


import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, ArrowDown, Search, Brain, CreditCard, Zap, Play, X } from 'lucide-react';
import TritaDashboard from '../components/TritaDashboard';
import IntegrationsShowcase from '../components/IntegrationsShowcase';
import HowItWorks from '../components/HowItWorks';
import TestimonialsGrid from '../components/TestimonialsGrid';
import FAQ from '../components/FAQ';
import FixMechanismModal from '../components/FixMechanismModal';

const operationalProblems = [
  "Stockouts",
  "Production delays",
  "RTO failures",
  "Supply chain shocks",
  "Dead stock",
  "BOM shortages"
];

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState<{ title: string; layers: any[] }>({ title: 'Operational Intelligence', layers: [] });
  const [problemIndex, setProblemIndex] = useState(0);
  const diagnosticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProblemIndex((current) => (current + 1) % operationalProblems.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const scrollToDiagnostic = () => {
    diagnosticRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const homeLayers = [
    {
      id: 'MULTI_CHANNEL_SYNC',
      title: 'Fabric Layer',
      desc: 'Unifies all your data streams into a single, high-fidelity source of truth. No more manual reconciliation.'
    },
    {
      id: 'DEMAND_PREDICTION',
      title: 'Insight Layer',
      desc: 'Analyzes patterns across your entire operation to predict stock-outs, revenue leaks, and demand spikes before they happen.'
    },
    {
      id: 'SUPPLY_CHAIN_LOGIC',
      title: 'Core Engine',
      desc: 'Automatically executes the best operational decisions - from inventory reallocation to supplier reordering - without human intervention.'
    }
  ];

  const openModal = () => {
    setActiveIndustry({
      title: 'Operational Intelligence',
      layers: homeLayers
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-transparent relative z-10">
      {/* HERO SECTION - Executive Daylight Theme */}
      <section className="group min-h-screen relative overflow-hidden">

        {/* Main Content Container - Natural Flow */}
        <div className="relative z-10 container-custom pt-32 pb-16 lg:pt-40 lg:pb-20 flex flex-col items-center">

          {/* 1. Header Copy Block (Centered) */}
          <div className="text-center max-w-5xl mx-auto space-y-10 mb-12 relative z-20">

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-navy leading-[1.1] tracking-tightest">
              <span className="block mb-2">Predict</span>
              <div className="flex w-full items-center justify-center overflow-hidden relative h-[1.3em] text-5xl sm:text-7xl lg:text-8xl my-2">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={problemIndex}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -80, opacity: 0 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
                    className="text-olynk whitespace-nowrap block font-sanskrit"
                  >
                    {operationalProblems[problemIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="block mt-2">10 days early.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-navy text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto font-medium">
              Trita connects your entire operation - <span className="font-bold">ERP, Production, Warehouse, and Sales</span> - into one system that spots supply chain risks, prevents Stockouts, and executes fixes across your stack without waiting for a human in the loop.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Link
                to="/waitlist"
                className="px-8 py-4 bg-olynk text-white rounded-lg font-semibold hover:bg-olynk-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center justify-center btn-shine text-lg min-w-[180px]"
              >
                Request Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button
                onClick={() => setShowWalkthrough(true)}
                className="px-8 py-4 bg-transparent text-olynk border-2 border-olynk rounded-lg font-semibold hover:bg-olynk/5 transition-all inline-flex items-center justify-center text-lg min-w-[180px]"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch 2-Min Walkthrough
              </button>
            </div>

            {/* Trust Indicators - avoid unverifiable claims */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-4 text-sm font-bold text-steel">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Security-first · audit-friendly execution logs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Pilot programs with scaled operators in India</span>
              </div>
            </div>
          </div>

          {/* 2. Command Center Visual */}
          <div className="w-full max-w-full mx-auto relative px-4 lg:px-6">
            <TritaDashboard />
          </div>

        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToDiagnostic}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer hover:scale-110 transition-transform"
          aria-label="Scroll to content"
        >
          <ArrowDown className="w-6 h-6 text-tan" />
        </button>
      </section>

      {/* SECTION 2: The Diagnostic Matrix (Refined Clinical) */}
      <section ref={diagnosticRef} className="group py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-cream border-t border-beige relative overflow-hidden">
        {/* 1. Dynamic Background Layer (Blur Blobs) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] bg-olynk/5 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ x: [0, -80, 0], y: [0, 100, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[10%] right-[0%] w-[45%] h-[45%] bg-navy/5 rounded-full blur-[110px]"
          />
        </div>

        {/* 2. Complex Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.6),rgba(243,234,224,0.1))] z-0" />

        {/* 3. Subtle Grain Texture */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none z-0"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        {/* Background Subtle Labels - Tone-on-Tone Reveal */}
        <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 select-none pointer-events-none text-right z-0">
          <span className="text-[120px] font-black font-mono text-beige leading-none tracking-tightest uppercase block">OPERATIONS</span>
          <span className="text-[120px] font-black font-mono text-beige leading-none tracking-tightest uppercase block opacity-40">OVERVIEW</span>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-navy mb-6 tracking-tightest leading-tight">
              Stop <span className="text-olynk italic font-serif font-normal">guessing</span> what's wrong.
            </h2>
            <p className="text-lg text-steel leading-relaxed font-medium">
              Most tools only report the past. Trita is an <span className="text-olynk font-bold">execution layer</span> - it aligns procurement, inventory, finance, and fulfillment under one governed policy engine so decisions ship with audit trails, not ad hoc heroics.
            </p>
          </div>

          {/* Staggered Diagnostic Vertical Stack */}
          <div className="space-y-16">
            {[
              {
                id: '01',
                icon: Search,
                symptom: "Fragmented systems obscure the real picture",
                quote: "We reconcile three ERPs and still debate which number is authoritative.",
                detail: "Commerce, ERP, WMS, and finance systems stay out of sync. Leadership lacks one governed view of margin, service level, and exposure across regions and business units.",
                costLabel: "Governance & latency",
                costMetrics: [
                  { label: "Decision lag", val: "24–48 hrs", color: "text-red-600" },
                  { label: "Manual bridges", val: "High", color: "text-red-500" }
                ],
                intervention: "Unified intelligence layer",
                solution: "Eliminate operational blind spots across your supply chain - one control plane with lineage from signal to action, so your leadership team debates strategy, not spreadsheets.",
                accent: "navy"
              },
              {
                id: "02",
                icon: Brain,
                symptom: "Risk surfaces too late for orderly response",
                quote: "By the time the board sees it, we are already in firefight mode.",
                detail: "Exceptions show up as supply chain risk, Stockouts, or production bottlenecks without enough lead time to align procurement, plant schedules, and commercial plans.",
                costLabel: "Strategic exposure",
                costMetrics: [
                  { label: "Revenue at risk", val: "12–18%", color: "text-red-600" },
                  { label: "Forecast horizon", val: "Short", color: "text-red-500" }
                ],
                intervention: "Early, governed intervention",
                solution: "Surface cross-functional risk with 30/60/90-day context, confidence scores, and policy-based playbooks so teams coordinate before commitments harden - not after.",
                accent: "olynk"
              },
              {
                id: '03',
                icon: CreditCard,
                symptom: "Manual coordination taxes scale",
                quote: "Our teams chase status across email, tickets, and side channels.",
                detail: "High-scale operations still depend on tribal knowledge and handoffs between procurement, finance, and fulfillment - slowing execution and weakening auditability.",
                costLabel: "Coordination load",
                costMetrics: [
                  { label: "Handoffs / wk", val: "100+", color: "text-red-600" },
                  { label: "Policy drift", val: "Elevated", color: "text-red-500" }
                ],
                intervention: "Autonomous execution across systems",
                solution: "Eliminate manual coordination overhead - Trita orchestrates approved actions across your stack with roles, thresholds, and immutable logs so the organization scales without adding coordination tax.",
                accent: "navy"
              }
            ].map((pattern, idx) => (
              <motion.div
                key={pattern.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group/item relative grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[32px] overflow-hidden border border-beige shadow-sm bg-white/60 backdrop-blur-xl"
              >
                {/* Side A: The Symptom (Clinical Pain) */}
                <div className="lg:col-span-7 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-beige">
                  <div className="flex items-start gap-4 lg:gap-6 mb-6 lg:mb-8">
                    <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center shrink-0 border border-beige/60">
                      <pattern.icon className="w-4 h-4 text-navy opacity-40" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg lg:text-xl font-black text-navy tracking-tight">{pattern.symptom}</h3>
                    </div>
                  </div>

                  <div className="space-y-6 lg:space-y-8">
                    <p className="text-base lg:text-xl font-medium text-steel leading-tight italic font-serif">
                      "{pattern.quote}"
                    </p>
                    <p className="text-sm lg:text-base text-steel max-w-xl leading-relaxed">
                      {pattern.detail}
                    </p>

                    {/* Multi-Metric Cost Indicator */}
                    <div className="pt-6 lg:pt-8 border-t border-beige flex flex-wrap gap-8 lg:gap-12">
                      <div className="space-y-3 lg:space-y-4">
                        <span className="text-[9px] lg:text-[10px] font-black text-tan uppercase tracking-widest block">{pattern.costLabel}</span>
                        <div className="flex gap-8 lg:gap-10">
                          {pattern.costMetrics.map((m, mi) => (
                            <div key={mi} className="space-y-1">
                              <span className="text-[9px] lg:text-[10px] font-bold text-navy/50 block uppercase tracking-tighter">{m.label}</span>
                              <span className={`text-lg lg:text-xl font-black ${m.color === 'text-red-400' ? 'text-red-600' : 'text-red-500'} font-mono tracking-tighter`}>{m.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side B: The Intervention (The Trita Shift) */}
                <div className="lg:col-span-5 p-6 lg:p-10 bg-white flex flex-col justify-center relative lg:border-l border-beige/40">
                  <div className="relative z-10 space-y-6 lg:space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="p-1 rounded-full bg-olynk/5">
                        <Zap className="w-4 h-4 text-olynk" strokeWidth={3} />
                      </div>
                    </div>
                    <div className="space-y-3 lg:space-y-4">
                      <h4 className="text-xl lg:text-4xl font-black text-navy leading-[0.95] tracking-tightest">
                        {pattern.intervention}
                      </h4>
                      <p className="text-sm lg:text-lg text-steel font-medium leading-relaxed">
                        {pattern.solution}
                      </p>
                    </div>
                    <button
                      onClick={openModal}
                      className="flex items-center gap-3 group/btn text-navy font-black text-[10px] lg:text-[12px] uppercase tracking-widest pt-4 border-b border-navy/20 hover:border-navy w-fit pb-1 hover:gap-5 transition-all"
                    >
                      Review Fix Mechanism
                      <ArrowRight className="w-4 h-4 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Integrations Showcase */}
      <IntegrationsShowcase />

      {/* SECTION 4.5: ICP QUALIFIER - Who This Is For */}
      <section className="py-20 lg:py-28 px-4 border-t border-beige bg-white/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #001B3D 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-4">
            <span className="text-[10px] font-black text-olynk uppercase tracking-[0.5em] font-mono">Ideal Customer Profile</span>
            <h2 className="text-3xl lg:text-4xl font-black text-navy tracking-tightest">
              Built for operations teams doing<br />
              <span className="text-olynk">₹50Cr+ in annual GMV.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="p-8 rounded-2xl border border-beige bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all">
              <div className="text-4xl font-black text-navy mb-3">5+</div>
              <div className="text-sm text-steel font-bold leading-relaxed">
                Connected systems - ERP, WMS, marketplace, payments
              </div>
            </div>
            <div className="p-8 rounded-2xl border border-beige bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all">
              <div className="text-4xl font-black text-navy mb-3">₹50Cr+</div>
              <div className="text-sm text-steel font-bold leading-relaxed">
                Annual GMV with multi-channel or multi-warehouse operations
              </div>
            </div>
            <div className="p-8 rounded-2xl border border-beige bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all">
              <div className="text-4xl font-black text-navy mb-3">10+</div>
              <div className="text-sm text-steel font-bold leading-relaxed">
                Ops team members coordinating across tools daily
              </div>
            </div>
          </div>
          <p className="text-steel text-base max-w-2xl mx-auto">
            Starting at <span className="font-black text-navy">₹20,000/month</span>. Enterprise plans with custom SLAs available.
          </p>
        </div>
      </section>

      {/* SECTION 5: TESTIMONIALS */}
      <TestimonialsGrid />

      {/* SECTION 5: HOW IT WORKS (The Engine) */}
      <HowItWorks />


      {/* SECTION 6.5: FAQ */}
      <FAQ />

      {/* SECTION 7: NEXT STEPS */}
      {/* SECTION 7: FINAL CTA (Experience the Intelligence Gap) */}
      <section className="py-24 lg:py-40 px-4 border-t border-beige text-center bg-cream/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #001B3D 1px, transparent 0)', backgroundSize: '24px 24px' }} />

        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center mx-auto mb-8 shadow-xl">
            <ArrowDown className="w-8 h-8 text-white animate-bounce" />
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-navy tracking-tightest leading-[0.95]">
            Experience the<br />
            <span className="text-olynk">Intelligence Gap.</span>
          </h2>
          <p className="text-xl text-steel font-medium max-w-2xl mx-auto leading-relaxed">
            See how your business operates when every system is connected by a singular,
            thinking layer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/waitlist"
              className="px-10 py-5 bg-olynk text-white rounded-2xl font-black text-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              Start Live Pilot
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/solutions"
              className="px-10 py-5 bg-white border-2 border-beige text-navy rounded-2xl font-black text-lg hover:border-navy transition-all flex items-center justify-center"
            >
              View Sector Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Fix Mechanism Modal */}
      <FixMechanismModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        layers={activeIndustry.layers}
        industryTitle={activeIndustry.title}
      />

      {/* Walkthrough Video Modal */}
      {showWalkthrough && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/80 backdrop-blur-sm" onClick={() => setShowWalkthrough(false)}>
          <div className="relative w-full max-w-4xl mx-4 aspect-video bg-navy rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowWalkthrough(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center space-y-6 p-8">
                <div className="w-20 h-20 rounded-full bg-olynk/20 flex items-center justify-center mx-auto">
                  <Play className="w-8 h-8 text-olynk" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">Walkthrough Coming Soon</h3>
                  <p className="text-white/60 text-base max-w-md mx-auto">
                    We're recording a 2-minute product walkthrough. In the meantime, 
                    <Link to="/waitlist" className="text-olynk font-bold hover:underline ml-1" onClick={() => setShowWalkthrough(false)}>request a live demo</Link> to see Trita in action.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div >
  );
};

export default Home;
