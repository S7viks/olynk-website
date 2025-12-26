/**
 * Home Page - Diagnostic-First Architecture
 * 
 * Purpose: Help user self-identify operational patterns, THEN show how OLynk thinks
 * User Intent: "Is this for me?" → "What does this do?"
 * 
 * Structure:
 * 0. Operational Diagnostic (4-step pattern recognition)
 * 1. Interactive Demo Container (contextualized by diagnostic)
 * 2. Orientation (What you just saw)
 * 3. Problem Context (Why this matters)
 * 4. What OLynk Is (High-level explanation)
 * 5. How It Fits (Mental safety)
 * 6. Who This Is For (Recognition)
 * 7. Next Steps (Conversion)
 */


import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, ArrowDown, Search, Brain, CreditCard, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import OlynkDashboard from '../components/OlynkDashboard';
import InfiniteMarquee from '../components/InfiniteMarquee';
import IntegrationsShowcase from '../components/IntegrationsShowcase';
import HowItWorks from '../components/HowItWorks';
import InteractiveBackground from '../components/InteractiveBackground';
import TestimonialsGrid from '../components/TestimonialsGrid';
import FAQ from '../components/FAQ';


const Home = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <InteractiveBackground />
      {/* HERO SECTION - Executive Daylight Theme */}
      <section className="group min-h-screen relative overflow-hidden">

        {/* Main Content Container - Centered Stack */}
        <div className="relative z-10 container-custom pt-24 pb-16 lg:pt-32 lg:pb-20 min-h-screen flex flex-col items-center justify-center">

          {/* 1. Header Copy Block (Centered) */}
          <div className="text-center max-w-4xl mx-auto space-y-8 mb-8 relative z-20">

            {/* Headline */}
            <h1 className="text-5xl lg:text-7xl font-black text-navy leading-[1.1] tracking-tightest">
              An AI that runs
              <span className="block mt-2 text-gradient">
                your operations.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-steel text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
              Not just numbers. <span className="text-navy font-semibold">An AI that does the work for you.</span> It spots problems, makes decisions, and fixes things before they cost you money.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Link
                to="/request-demo"
                className="px-8 py-4 bg-olynk text-white rounded-lg font-semibold hover:bg-olynk-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center justify-center btn-shine text-lg min-w-[180px]"
              >
                Request Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/platform"
                className="px-8 py-4 bg-transparent text-olynk border-2 border-olynk rounded-lg font-semibold hover:bg-olynk hover:text-white transition-all inline-flex items-center justify-center text-lg min-w-[180px]"
              >
                Explore Platform
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-4 text-sm font-bold text-steel">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>150+ Businesses</span>
              </div>
            </div>
          </div>

          {/* 2. Command Center Visual */}
          <div className="w-full max-w-full mx-auto relative px-4 lg:px-6">
            <OlynkDashboard />
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <ArrowDown className="w-6 h-6 text-tan" />
        </div>
      </section>

      {/* SECTION 2: Trust Bar */}
      <section className="group w-full bg-transparent border-t border-beige relative">
        <div className="absolute top-1/2 -translate-y-1/2 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 select-none pointer-events-none z-0">
          <span className="text-[80px] font-black font-mono text-beige leading-none tracking-tightest uppercase">NETWORK_HANDSHAKE_VALID</span>
        </div>
        <InfiniteMarquee />
      </section>

      {/* SECTION 3: The Diagnostic Matrix (Refined Clinical) */}
      <section className="group py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-cream border-t border-beige relative overflow-hidden">
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
          <span className="text-[120px] font-black font-mono text-beige leading-none tracking-tightest uppercase block">DIAGNOSTIC_SCAN</span>
          <span className="text-[120px] font-black font-mono text-beige leading-none tracking-tightest uppercase block opacity-40">RUNNING</span>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-navy mb-6 tracking-tightest leading-tight">
              Stop <span className="text-olynk italic font-serif font-normal">guessing</span> what's wrong.
            </h2>
            <p className="text-lg text-steel leading-relaxed font-medium">
              Most tools just show you what happened. Olynk is different—it actually <span className="text-olynk font-bold">runs the fixes for you</span>. We turn your data into direct action.
            </p>
          </div>

          {/* Staggered Diagnostic Vertical Stack */}
          <div className="space-y-16">
            {[
              {
                id: '01',
                icon: Search,
                symptom: "Your data is scattered everywhere",
                quote: "I check 12 tools every morning.",
                detail: "Shopify, ERP, Ads, and Logistics remain isolated. You're forced to be the only data bridge.",
                costLabel: "Wasted Time & Effort",
                costMetrics: [
                  { label: "Data Lag", val: "24-48 hrs", color: "text-red-600" },
                  { label: "Lost Time", val: "15 hrs/wk", color: "text-red-500" }
                ],
                intervention: "Get one master view",
                solution: "No more checking 12 tools. Just one screen that shows you exactly how much money you’re making.",
                accent: "navy"
              },
              {
                id: "02",
                icon: Brain,
                symptom: "Getting surprised by bad news",
                quote: "I keep getting surprises.",
                detail: "Stockouts and cash crunches happen suddenly. By the time you notice, it's already too late to fix.",
                costLabel: "Money Lost",
                costMetrics: [
                  { label: "Revenue Leak", val: "12-18%", color: "text-red-600" },
                  { label: "Current Risk", val: "High", color: "text-red-500" }
                ],
                intervention: "Prevent losses automatically",
                solution: "See problems 30 days before they hit. We fix them while you’re asleep.",
                accent: "olynk"
              },
              {
                id: '03',
                icon: CreditCard,
                symptom: "Drowning in boring busywork",
                quote: "I'm buried in admin.",
                detail: "Creating purchase orders and checking payments takes up 40% of your day.",
                costLabel: "Executive Burnout",
                costMetrics: [
                  { label: "Admin Work", val: "20+ hrs/wk", color: "text-red-600" },
                  { label: "Human Error", val: "Frequent", color: "text-red-500" }
                ],
                intervention: "AI handles the paperwork",
                solution: "Olynk handles the boring admin work so you can focus on growing your brand.",
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
                <div className="lg:col-span-7 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-beige">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center shrink-0 border border-beige/60">
                      <pattern.icon className="w-4 h-4 text-navy opacity-40" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg lg:text-xl font-black text-navy tracking-tight">{pattern.symptom}</h3>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <p className="text-lg lg:text-xl font-medium text-steel leading-tight italic font-serif">
                      "{pattern.quote}"
                    </p>
                    <p className="text-base text-steel max-w-xl leading-relaxed">
                      {pattern.detail}
                    </p>

                    {/* Multi-Metric Cost Indicator */}
                    <div className="pt-8 border-t border-beige flex flex-wrap gap-12">
                      <div className="space-y-4">
                        <span className="text-[10px] font-black text-tan uppercase tracking-widest block">{pattern.costLabel}</span>
                        <div className="flex gap-10">
                          {pattern.costMetrics.map((m, mi) => (
                            <div key={mi} className="space-y-1">
                              <span className="text-[10px] font-bold text-navy/20 block uppercase tracking-tighter">{m.label}</span>
                              <span className={`text-xl font-black ${m.color === 'text-red-400' ? 'text-red-600' : 'text-red-500'} font-mono tracking-tighter`}>{m.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side B: The Intervention (The Olynk Shift) */}
                <div className="lg:col-span-5 p-8 lg:p-12 bg-white flex flex-col justify-center relative border-l border-beige/40">
                  <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="p-1 rounded-full bg-olynk/5">
                        <Zap className="w-4 h-4 text-olynk" strokeWidth={3} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-2xl lg:text-4xl font-black text-navy leading-[0.95] tracking-tightest">
                        {pattern.intervention}
                      </h4>
                      <p className="text-base lg:text-lg text-steel font-medium leading-relaxed">
                        {pattern.solution}
                      </p>
                    </div>
                    <button className="flex items-center gap-3 group/btn text-navy font-black text-[12px] uppercase tracking-widest pt-4 border-b border-navy/20 hover:border-navy w-fit pb-1 hover:gap-5 transition-all">
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

      {/* SECTION 4.5: TESTIMONIALS */}
      <TestimonialsGrid />

      {/* SECTION 5: HOW IT WORKS (The Engine) */}
      <HowItWorks />


      {/* SECTION 6.5: FAQ */}
      <FAQ />

      {/* SECTION 7: NEXT STEPS */}
      <section className="group py-20 lg:py-32 px-4 bg-transparent border-t border-beige relative overflow-hidden">
        {/* Background Subtle Label */}
        <div className="absolute bottom-0 left-0 p-10 opacity-[0.02] group-hover:opacity-[0.1] transition-opacity duration-700 select-none pointer-events-none">
          <span className="text-[120px] font-black font-mono text-navy leading-none tracking-tighter uppercase">INITIATE_DEPLOYMENT</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="max-w-3xl mb-24">
            <h2 className="text-4xl lg:text-5xl font-black text-navy tracking-tighter leading-[0.95] mb-8">
              Ready to <span className="text-navy/20 underline decoration-navy/5 decoration-8 underline-offset-8">Take Control?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <Link
              to="/platform"
              className="group bg-white p-12 rounded-[40px] border border-beige/60 hover:border-navy transition-all duration-500 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] hover:shadow-2xl hover:-translate-y-2"
            >
              <span className="text-[10px] font-black text-navy/30 uppercase tracking-widest mb-6 block font-mono">Node_01: Capability_Scan</span>
              <h3 className="text-lg lg:text-2xl font-black text-navy mb-4 tracking-tightest">Explore the Platform</h3>
              <p className="text-navy/60 font-medium mb-12 text-base leading-relaxed">
                See how Olynk runs your operations from one central place.
              </p>
              <div className="inline-flex items-center text-navy font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                Learn_More <ArrowRight className="ml-3 h-5 w-5" />
              </div>
            </Link>

            <Link
              to="/how-it-works"
              className="group bg-white p-12 rounded-[40px] border border-beige/60 hover:border-navy transition-all duration-500 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] hover:shadow-2xl hover:-translate-y-2"
            >
              <span className="text-[10px] font-black text-navy/30 uppercase tracking-widest mb-6 block font-mono">Node_02: Implementation_Log</span>
              <h3 className="text-lg lg:text-2xl font-black text-navy mb-4 tracking-tightest">How to get started</h3>
              <p className="text-navy/60 font-medium mb-12 text-base leading-relaxed">
                Go from manual spreadsheets to automated action in 15 minutes.
              </p>
              <div className="inline-flex items-center text-navy font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                View_Protocol <ArrowRight className="ml-3 h-5 w-5" />
              </div>
            </Link>

            <Link
              to="/request-demo"
              className="group bg-navy p-12 rounded-[40px] border border-navy hover:bg-navy-light transition-all duration-500 shadow-2xl hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 opacity-10 transition-transform duration-700 group-hover:scale-150">
                <Zap className="w-44 h-44 text-white" />
              </div>
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-6 block font-mono relative z-10">Node_03: Live_Operation</span>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight relative z-10">See it in action</h3>
              <p className="text-white/60 font-medium mb-12 leading-relaxed relative z-10">
                Talk to us and see Olynk running with your own data.
              </p>
              <div className="inline-flex items-center text-emerald-400 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all relative z-10">
                Book_Live_Deployment <ArrowRight className="ml-3 h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div >
  );
};

export default Home;
