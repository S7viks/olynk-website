import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Network, Brain, Zap, ArrowDown, Database, Cpu, Activity } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-20 right-10 opacity-[0.03] select-none pointer-events-none">
          <span className="text-[150px] font-black font-mono text-navy tracking-tighter uppercase whitespace-nowrap">OPERATIONAL_PROTOCOL</span>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-8xl font-black text-navy leading-[1.05] tracking-tightest mb-8">
              LINK. THINK.<br />
              <span className="text-olynk">ACT.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-steel max-w-3xl mx-auto leading-relaxed font-medium">
              How fragmentation becomes intelligence. The three-phase architecture that powers
              autonomous commerce operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Step 1: LINK */}
      <section className="py-24 lg:py-40 px-4 border-t border-beige bg-white/40 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-[0.2] select-none pointer-events-none group">
          <span className="text-[180px] font-black font-mono text-beige leading-none tracking-tightest uppercase group-hover:text-tan transition-colors">01</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-[10px] font-black font-mono text-navy uppercase tracking-widest">
                <Database className="w-3 h-3" />
                Phase_01: Unification
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-navy tracking-tightest leading-[0.95]">
                The Neural<br />
                <span className="text-olynk italic font-serif font-normal">Link.</span>
              </h2>
              <p className="text-lg text-steel leading-relaxed font-medium">
                We connect your entire stack into a single, high-fidelity data fabric.
                No more manual exports or checking multiple dashboards.
              </p>
              <div className="p-6 rounded-3xl bg-cream/30 border border-beige/40">
                <div className="text-[10px] font-black text-tan uppercase tracking-widest mb-4">Integrated Nodes</div>
                <div className="flex flex-wrap gap-3">
                  {["Shopify", "NetSuite", "Shiprocket", "Razorpay", "Meta Ads", "Google Ads"].map((tool, i) => (
                    <div key={i} className="px-4 py-2 rounded-xl bg-white border border-beige/60 text-xs font-bold text-navy shadow-sm">
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[60px] bg-navy flex items-center justify-center p-12 overflow-hidden">
                <Network className="w-48 h-48 text-white/20 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-tr from-olynk/20 to-transparent" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl border border-beige shadow-xl max-w-[200px]">
                <Activity className="w-6 h-6 text-olynk mb-2" />
                <div className="text-xs font-black text-navy uppercase tracking-widest mb-1">Status</div>
                <div className="text-sm font-bold text-emerald-500 font-mono">LINK_ESTABLISHED</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2: THINK */}
      <section className="py-24 lg:py-40 px-4 border-t border-beige relative overflow-hidden">
        <div className="absolute top-0 left-0 p-10 opacity-[0.2] select-none pointer-events-none group">
          <span className="text-[180px] font-black font-mono text-beige leading-none tracking-tightest uppercase group-hover:text-tan transition-colors">02</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="lg:order-2 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-[10px] font-black font-mono text-navy uppercase tracking-widest">
                <Cpu className="w-3 h-3" />
                Phase_02: Orchestration
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-navy tracking-tightest leading-[0.95]">
                The Neural<br />
                <span className="text-olynk italic font-serif font-normal">Think.</span>
              </h2>
              <p className="text-lg text-steel leading-relaxed font-medium">
                Our models don't just process data—they understand causality.
                We map the relationship between ads, inventory, and cash flow.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-[10px] font-black text-tan uppercase tracking-widest">Processing Logic</div>
                  <div className="text-sm font-bold text-navy">Demand Forecasting</div>
                  <div className="text-sm font-bold text-navy">Risk Analysis</div>
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-black text-tan uppercase tracking-widest">Outcomes</div>
                  <div className="text-sm font-bold text-emerald-500 font-mono">P&L_PREDICTION</div>
                  <div className="text-sm font-bold text-emerald-500 font-mono">STOCK_VELOCITY</div>
                </div>
              </div>
            </div>
            <div className="lg:order-1 relative">
              <div className="aspect-square rounded-[60px] bg-white border border-beige flex items-center justify-center p-12 overflow-hidden shadow-2xl">
                <Brain className="w-48 h-48 text-olynk/10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-6xl font-black text-navy font-mono animate-pulse">98.4%</div>
                  <div className="text-[10px] font-black text-olynk uppercase tracking-widest">Model_Confidence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: ACT */}
      <section className="py-24 lg:py-40 px-4 border-t border-beige bg-navy text-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 p-10 opacity-[0.1] select-none pointer-events-none group">
          <span className="text-[180px] font-black font-mono text-white leading-none tracking-tightest uppercase">03</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black font-mono text-white uppercase tracking-widest">
                <Zap className="w-3 h-3" />
                Phase_03: Autonomous Execution
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tightest leading-[0.95]">
                The Neural<br />
                <span className="text-emerald-400 italic font-serif font-normal">Act.</span>
              </h2>
              <p className="text-lg text-white/60 leading-relaxed font-medium">
                Insight without action is just overhead. OLynk executes fixes directly
                in your systems—while you're asleep.
              </p>
              <ul className="space-y-4">
                {[
                  "Auto-Adjust Ad Spends",
                  "Trigger Supplier POs",
                  "Execute RTO Blocks",
                  "Notify Warehouse Priorities"
                ].map((action, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[60px] bg-white text-navy flex flex-col items-center justify-center p-12 overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.1)]">
                <div className="text-[12px] font-black text-tan uppercase tracking-widest mb-6 font-mono">Active_Workflow_Queue</div>
                <div className="space-y-3 w-full max-w-[280px]">
                  {[
                    { op: "PO_CREATE", status: "SUCCESS" },
                    { op: "ADS_ADJUST", status: "EXECUTING" },
                    { op: "STOCK_BALANCING", status: "QUEUED" }
                  ].map((job, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-cream border border-beige">
                      <span className="font-mono text-xs font-black">{job.op}</span>
                      <span className={`text-[10px] font-black px-2 py-1 rounded-md ${job.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' : 'bg-navy/10 text-navy'}`}>{job.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Conversion Section */}
      <section className="py-24 lg:py-40 px-4 border-t border-beige text-center bg-cream/30">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center mx-auto mb-8 shadow-xl">
            <ArrowDown className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-navy tracking-tightest leading-[0.95]">
            Experience the<br />
            <span className="text-olynk">Intelligence Gap.</span>
          </h2>
          <p className="text-xl text-steel font-medium max-w-2xl mx-auto">
            See how your business operates when every system is connected by a singular,
            thinking layer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/request-demo"
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
    </div>
  );
};

export default HowItWorks;
