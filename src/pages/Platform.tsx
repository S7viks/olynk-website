import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Brain, Zap, Globe, Shield, Cpu, Activity } from 'lucide-react';

const Platform = () => {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-20 right-10 opacity-[0.03] select-none pointer-events-none">
          <span className="text-[150px] font-black font-mono text-navy tracking-tighter uppercase whitespace-nowrap">PLATFORM_PROTOCOL</span>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-8xl font-black text-navy leading-[1.05] tracking-tightest mb-8">
              The Neural Layer<br />
              <span className="text-olynk">for Commerce.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-steel max-w-3xl mx-auto leading-relaxed font-medium">
              OLynk isn't just a dashboard. It's an intelligent operating system that sits above your stack,
              orchestrating data into autonomous action.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Architectural Section - The Four Engines */}
      <section className="py-24 lg:py-32 px-4 border-t border-beige bg-white/30 backdrop-blur-sm relative overflow-hidden">
        {/* Background Labels */}
        <div className="absolute top-10 left-10 opacity-[0.02] select-none pointer-events-none">
          <span className="text-[80px] font-black font-mono text-navy uppercase block">ENGINE_CORE_CLUSTER</span>
          <span className="text-[80px] font-black font-mono text-navy uppercase block opacity-40">SYSTEMS_ACTIVE</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-[10px] font-black font-mono text-navy uppercase tracking-widest">
                <Cpu className="w-3 h-3" />
                Neural Architecture
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-navy tracking-tightest leading-[0.95]">
                Four Engines.<br />
                <span className="text-navy/40 italic font-serif font-normal">One Brain.</span>
              </h2>
              <p className="text-lg text-steel leading-relaxed font-medium">
                We've decoupled operational intelligence into four specialized engines,
                each handling a critical phase of the commerce lifecycle.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Database, name: "OLynk Fabric", label: "Unified Data", desc: "Connects Shopify, ERPs, and Logistics into a single neural thread." },
                { icon: Brain, name: "OLynk Insight", label: "Predictive AI", desc: "Spots stockouts and cash crunches before they happen." },
                { icon: Zap, name: "OLynk Core", label: "Workflow Logic", desc: "Executes POs and marketing pauses autonomously 24/7." },
                { icon: Globe, name: "OLynk Orbit", label: "Interface", desc: "Conversational control via natural language queries." }
              ].map((engine, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-beige/60 shadow-sm hover:shadow-md transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <engine.icon className="w-5 h-5 text-olynk" />
                  </div>
                  <div className="text-[10px] font-black font-mono text-tan uppercase tracking-widest mb-1">{engine.label}</div>
                  <h3 className="text-lg font-black text-navy mb-2">{engine.name}</h3>
                  <p className="text-sm text-steel leading-relaxed">{engine.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integration Layer - Where it Sits */}
      <section className="py-24 lg:py-32 px-4 border-t border-beige relative">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-black text-navy tracking-tightest mb-6">
            The Operating Layer.
          </h2>
          <p className="text-lg text-steel font-medium">
            OLynk doesn't replace your tools. It connects them into a singular, thinking organism.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="relative p-12 lg:p-20 rounded-[48px] bg-navy border border-navy overflow-hidden">
            {/* Decorative Background grid/lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />

            <div className="relative z-10 grid lg:grid-cols-3 gap-12 items-center">
              <div className="space-y-4 text-center lg:text-left">
                <div className="text-[10px] font-black font-mono text-white/40 uppercase tracking-widest">Input Layer</div>
                <h4 className="text-xl font-bold text-white uppercase tracking-tighter">Your Existing Stack</h4>
                <p className="text-white/60 text-sm">Shopify, NetSuite, Shiprocket, Razorpay, Meta Ads.</p>
              </div>

              <div className="flex flex-col items-center gap-6">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent lg:hidden" />
                <div className="p-8 rounded-[40px] bg-white border border-white/20 shadow-2xl relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-olynk to-blue-400 rounded-[40px] blur opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative flex flex-col items-center text-center px-6">
                    <Activity className="w-12 h-12 text-olynk mb-4 animate-pulse" />
                    <h4 className="text-2xl font-black text-navy mb-2 uppercase tracking-tighter">OLYNK AI</h4>
                    <p className="text-sm font-bold text-olynk font-mono uppercase tracking-[0.2em]">Active_Processing</p>
                  </div>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent lg:hidden" />
              </div>

              <div className="space-y-4 text-center lg:text-right">
                <div className="text-[10px] font-black font-mono text-white/40 uppercase tracking-widest">Output Layer</div>
                <h4 className="text-xl font-bold text-white uppercase tracking-tighter">Autonomous Results</h4>
                <p className="text-white/60 text-sm">Automated POs, Risk Mitigation, Real-time P&L.</p>
              </div>
            </div>

            <div className="mt-16 pt-12 border-t border-white/10 text-center">
              <p className="text-white/80 font-medium italic font-serif text-lg">
                "The difference between having data and having control."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-24 lg:py-32 px-4 border-t border-beige bg-cream/50 relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 border border-beige">
              <Shield className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-navy tracking-tightest mb-6">
              Clinical grade<br />security.
            </h2>
            <p className="text-lg text-steel leading-relaxed font-medium mb-8">
              Your operational data is your competitive advantage. We treat it with the same rigor
              as banking infrastructure.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-3xl font-black text-navy font-mono tracking-tighter mb-1">SOC 2</div>
                <div className="text-[10px] font-black text-tan uppercase tracking-widest">Type II Certified</div>
              </div>
              <div>
                <div className="text-3xl font-black text-navy font-mono tracking-tighter mb-1">AES 256</div>
                <div className="text-[10px] font-black text-tan uppercase tracking-widest">Bank-grade Encryption</div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 bg-white p-8 rounded-[40px] border border-beige shadow-sm relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-[0.4] select-none pointer-events-none">
              <span className="text-[40px] font-black font-mono text-beige uppercase">DATA_TRAINING_ISOLATION</span>
            </div>
            <h3 className="text-xl font-black text-navy mb-4 relative z-10">Privacy First Architecture</h3>
            <p className="text-steel leading-relaxed mb-6 relative z-10">
              We use custom LLM orchestration where your data is isolated in dedicated environments.
            </p>
            <ul className="space-y-4 relative z-10">
              {[
                "Zero public leak across customers",
                "Zero training on non-anonymized data",
                "Full audit logs for every AI decision",
                "Dedicated compute clusters for Enterprise"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-navy">
                  <div className="w-1.5 h-1.5 rounded-full bg-olynk" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-40 px-4 border-t border-beige text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-5xl lg:text-7xl font-black text-navy tracking-tightest leading-[0.95]">
            Ready to install<br />intelligence?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/request-demo"
              className="px-10 py-5 bg-olynk text-white rounded-2xl font-black text-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              Request Access Protocol
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/how-it-works"
              className="px-10 py-5 bg-transparent border-2 border-beige text-navy rounded-2xl font-black text-lg hover:border-navy transition-all flex items-center justify-center"
            >
              View Source Flow
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Platform;
