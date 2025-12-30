import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Network, Zap, ArrowDown, Database, Cpu, Activity } from 'lucide-react';

const DataStream = () => (
  <div className="relative w-full h-full flex items-center justify-center bg-navy overflow-hidden">
    <div className="absolute inset-0 opacity-20" style={{
      backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
      backgroundSize: '30px 30px'
    }} />
    <svg viewBox="0 0 400 400" className="w-64 h-64 relative z-10">
      {/* Background Nodes */}
      {[...Array(6)].map((_, i) => (
        <motion.circle
          key={`bg-${i}`}
          cx={200 + 150 * Math.cos(i * (Math.PI / 3))}
          cy={200 + 150 * Math.sin(i * (Math.PI / 3))}
          r="4"
          fill="white"
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
      {/* Connection Lines */}
      {[...Array(6)].map((_, i) => (
        <motion.path
          key={`line-${i}`}
          d={`M ${200 + 150 * Math.cos(i * (Math.PI / 3))} ${200 + 150 * Math.sin(i * (Math.PI / 3))} L 200 200`}
          stroke="white"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
      {/* Central Hub */}
      <motion.circle
        cx="200" cy="200" r="40"
        fill="none" stroke="#3B82F6" strokeWidth="2"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="200" cy="200" r="20"
        fill="#3B82F6"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <Network className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white z-20" />
    </svg>
  </div>
);

const InferenceGrid = () => (
  <div className="relative w-full h-full flex items-center justify-center bg-white overflow-hidden rounded-[60px] border border-beige shadow-2xl">
    <div className="absolute inset-0 opacity-5" style={{
      backgroundImage: 'linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(90deg, #2563EB 1px, transparent 1px)',
      backgroundSize: '40px 40px'
    }} />
    <div className="relative z-10 text-center space-y-4">
      <div className="grid grid-cols-4 gap-2">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
            className="w-3 h-3 bg-olynk rounded-sm"
          />
        ))}
      </div>
      <div className="space-y-1">
        <div className="text-5xl font-black text-navy font-mono">98.4%</div>
        <div className="text-[10px] font-black text-olynk uppercase tracking-widest">Model_Confidence</div>
      </div>
    </div>
    {/* Scanning Line */}
    <motion.div
      animate={{ left: ['0%', '100%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-olynk to-transparent z-20"
    />
  </div>
);

const ExecutionQueue = () => {
  const jobs = [
    { op: "PO_CREATE", status: "SUCCESS", color: "bg-emerald-500" },
    { op: "ADS_ADJUST", status: "EXECUTING", color: "bg-olynk" },
    { op: "STOCK_REORDER", status: "QUEUED", color: "bg-tan" }
  ];

  return (
    <div className="aspect-square rounded-[60px] bg-white text-navy flex flex-col items-center justify-center p-12 overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.1)] relative">
      <div className="absolute inset-0 bg-navy opacity-[0.02]" />
      <div className="text-[12px] font-black text-tan uppercase tracking-widest mb-10 font-mono relative z-10">Active_Workflow_Queue</div>
      <div className="space-y-4 w-full max-w-[280px] relative z-10">
        {jobs.map((job, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            className="flex items-center justify-between p-4 rounded-2xl bg-white border border-beige shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${job.color} ${job.status === 'EXECUTING' ? 'animate-pulse' : ''}`} />
              <span className="font-mono text-xs font-black">{job.op}</span>
            </div>
            <span className={`text-[10px] font-black px-2.5 py-1 rounded-md ${job.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-700' : 'bg-navy/5 text-navy/60'}`}>{job.status}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -right-20 w-64 h-64 border border-navy/[0.03] rounded-full flex items-center justify-center"
      >
        <div className="w-48 h-48 border border-navy/[0.03] rounded-full" />
      </motion.div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-transparent relative z-10">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
      <section className="py-16 lg:py-24 px-4 border-t border-beige bg-white/40 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-[0.2] select-none pointer-events-none group">
          <span className="text-[180px] font-black font-mono text-beige leading-none tracking-tightest uppercase group-hover:text-tan transition-colors">01</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
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
              <div className="aspect-square rounded-[60px] overflow-hidden shadow-2xl">
                <DataStream />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl border border-beige shadow-xl max-w-[200px] z-20">
                <Activity className="w-6 h-6 text-olynk mb-2" />
                <div className="text-xs font-black text-navy uppercase tracking-widest mb-1">Status</div>
                <div className="text-sm font-bold text-emerald-500 font-mono">LINK_ESTABLISHED</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2: THINK */}
      <section className="py-16 lg:py-24 px-4 border-t border-beige relative overflow-hidden">
        <div className="absolute top-0 left-0 p-10 opacity-[0.2] select-none pointer-events-none group">
          <span className="text-[180px] font-black font-mono text-beige leading-none tracking-tightest uppercase group-hover:text-tan transition-colors">02</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
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
              <div className="aspect-square">
                <InferenceGrid />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: ACT */}
      <section className="py-16 lg:py-24 px-4 border-t border-beige bg-navy text-white relative overflow-hidden">
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
              <ExecutionQueue />
            </div>
          </div>
        </div>
      </section>

      {/* Final Conversion Section */}
      <section className="py-16 lg:py-28 px-4 border-t border-beige text-center bg-cream/30">
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
    </div>
  );
};

export default HowItWorks;
