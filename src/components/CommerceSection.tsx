import { motion } from 'framer-motion';
import { Package, Users, Waypoints, Search, Activity, Zap } from 'lucide-react';
import { useState } from 'react';

const problemsData = [
  {
    number: "1",
    title: "Inventory Drift",
    description: "Sales data from digital channels, physical nodes, and ERP systems rarely sync in real-time. This leads to overselling, stock-outs, and significant revenue leakage across nodes.",
    solution: "A unified cognitive layer that creates a single source of truth across all operational endpoints.",
    icon: Package
  },
  {
    number: "2",
    title: "Operational Blindspots",
    description: "Supply chain disruptions and demand spikes often go unnoticed until they impact the bottom line. Traditional systems lack the predictive capacity to flag these risks before they manifest.",
    solution: "Predictive inference engines that identify disruption patterns 10 days before they affect service levels.",
    icon: Search
  },
  {
    number: "3",
    title: "Reactive Customer Ops",
    description: "Teams spend significant resources responding to status queries that existing systems should resolve proactively. This manual overhead slows down overall organizational velocity.",
    solution: "Autonomous agents that monitor order lifecycles and resolve delays before the user is aware of them.",
    icon: Users
  },
  {
    number: "4",
    title: "System Fragmentation",
    description: "Moving data manually between legacy ERPs, shipping portals, and ad stacks creates critical bottlenecks. This operational friction costs hundreds of hours in high-value leadership time.",
    solution: "A universal commerce fabric that connects disparate systems into a single intelligent control center.",
    icon: Waypoints
  },
  {
    number: "5",
    title: "Invisible Inefficiencies",
    description: "Complex correlations between returns, logistics performance, and ad efficiency are invisible to human analysis. Modern commerce operations lose millions to these hidden patterns.",
    solution: "Pattern recognition models that identify optimization opportunities within high-volume operational data.",
    icon: Activity
  }
];

const DiagnosticVisual = ({ activeIndex }: { activeIndex: number }) => {
  return (
    <div className="relative w-full h-full bg-cream/30 p-8 lg:p-12 flex flex-col justify-between overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'linear-gradient(#1E293B 1px, transparent 1px), linear-gradient(90deg, #1E293B 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start">
        <div className="p-3 bg-white border border-beige rounded-2xl shadow-sm">
          <Activity className="w-6 h-6 text-navy" />
        </div>
        <div className="text-[10px] font-mono font-black text-tan uppercase tracking-widest bg-white border border-beige px-4 py-2 rounded-xl">
          DIAGNOSTIC_MODE // ACTIVE
        </div>
      </div>

      {/* Central Architecture Visualization */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-8">
        <div className="relative w-full max-w-[450px] aspect-square">
          {/* Static Central Core Layers */}
          <div className="absolute inset-0 border border-beige/40 rounded-full" />
          <div className="absolute inset-[10%] border border-beige/60 rounded-full" />
          <div className="absolute inset-[20%] border border-dashed border-navy/10 rounded-full" />
          <div className="absolute inset-[5%] border border-dashed border-navy/5 rounded-full animate-spin-slow" style={{ animationDuration: '60s' }} />
          <div className="absolute inset-[15%] border border-dashed border-olynk/10 rounded-full animate-spin-slow" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />

          {/* Dynamic Problem Indicator */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Active Area Glow */}
            <div className="absolute w-64 h-64 bg-olynk/5 rounded-full blur-3xl animate-pulse" />

            <div className="w-36 h-36 bg-white border-2 border-navy shadow-[0_0_40px_rgba(0,0,0,0.1)] rounded-[40px] flex items-center justify-center relative z-20">
              <Zap className="w-14 h-14 text-navy transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
              {/* Pulse Effect */}
              <div className="absolute inset-0 bg-navy/5 rounded-[40px] animate-ping" style={{ animationDuration: '3s' }} />
            </div>

            {/* Connecting Nodes with Labels */}
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  opacity: i === activeIndex ? 1 : 0.15,
                  scale: i === activeIndex ? 1.25 : 0.9,
                  x: Math.cos((angle - 90) * (Math.PI / 180)) * 160,
                  y: Math.sin((angle - 90) * (Math.PI / 180)) * 160,
                }}
                className="absolute flex flex-col items-center gap-2"
              >
                <div className={`w-5 h-5 rounded-full border-2 transition-colors duration-500 ${i === activeIndex ? 'bg-olynk border-navy' : 'bg-white border-beige'}`}
                  style={{
                    boxShadow: i === activeIndex ? '0 0 25px rgba(59,130,246,0.6)' : 'none'
                  }}
                />
                {i === activeIndex && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[8px] font-mono font-black text-navy bg-white border border-navy px-2 py-0.5 rounded shadow-sm whitespace-nowrap uppercase tracking-tighter"
                  >
                    NODE_{i + 1}_ACTIVE
                  </motion.span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Analysis Footer */}
      <div className="relative z-10 bg-white border border-beige rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 rounded-full bg-olynk animate-pulse" />
          <span className="text-xs font-black text-navy uppercase tracking-widest">System Analysis</span>
        </div>
        <div className="h-1 w-full bg-cream rounded-full overflow-hidden">
          <motion.div
            key={activeIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "circOut" }}
            className="h-full bg-navy"
          />
        </div>
        <div className="mt-3 flex justify-between text-[10px] font-mono text-steel uppercase">
          <span>Detecting Anomalies...</span>
          <span>{problemsData[activeIndex].title}</span>
        </div>
      </div>

    </div>
  );
};

const CommerceSection = () => {
  const [activeProblem, setActiveProblem] = useState(0);

  return (
    <section className="py-24 lg:py-32 px-6 bg-cream border-t border-beige relative">
      {/* Container for background decorative elements - limited overflow here so it doesn't break sticky */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-olynk/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Header + Problem List */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="mb-20 max-w-3xl">
              <span className="text-[10px] font-mono font-black text-tan uppercase tracking-[0.3em] block mb-4">REVENUE_LEAKAGE_ANALYSIS</span>
              <h2 className="text-4xl lg:text-5xl font-black text-navy mb-6 tracking-tightest">
                The Hidden Costs of <br />
                <span className="text-olynk italic font-serif font-normal">Operational Friction.</span>
              </h2>
              <p className="text-xl text-steel leading-relaxed">
                Modern commerce operations are bleeding revenue through inventory drift, blindspots, and manual overhead. Olynk identifies and stops this leakage.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {problemsData.map((problem, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0.5 }}
                  whileInView={{ opacity: 1 }}
                  onViewportEnter={() => setActiveProblem(idx)}
                  viewport={{ amount: 0.6, margin: "-10% 0px -40% 0px" }}
                  className={`group cursor-pointer rounded-[32px] border transition-all duration-500 overflow-hidden ${activeProblem === idx
                    ? 'bg-white border-navy shadow-xl scale-[1.02]'
                    : 'bg-white/40 border-beige hover:border-navy/30 hover:bg-white/80 backdrop-blur-sm'
                    }`}
                >
                  <div className="p-8 lg:p-10 flex gap-6 lg:gap-8">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-colors ${activeProblem === idx ? 'bg-navy border-navy' : 'bg-white border-beige'
                      }`}>
                      <span className={`text-sm font-black font-mono ${activeProblem === idx ? 'text-white' : 'text-tan'
                        }`}>0{idx + 1}</span>
                    </div>

                    <div className="space-y-4">
                      <h3 className={`text-xl font-black transition-colors tracking-tight ${activeProblem === idx ? 'text-navy' : 'text-steel'
                        }`}>
                        {problem.title}
                      </h3>
                      <p className="text-steel leading-relaxed font-medium">
                        {problem.description}
                      </p>
                      <div className={`overflow-hidden transition-all duration-500 ${activeProblem === idx ? 'max-h-40 opacity-100 pt-4' : 'max-h-0 opacity-0'
                        }`}>
                        <div className="flex items-start gap-4 p-5 bg-olynk/5 rounded-2xl border border-olynk/10">
                          <Zap className="w-5 h-5 text-olynk shrink-0 mt-0.5" fill="currentColor" fillOpacity={0.1} />
                          <div>
                            <span className="text-[10px] font-black font-mono text-olynk uppercase tracking-widest block mb-1">LYNK_INTERVENTION</span>
                            <p className="text-sm font-bold text-navy leading-relaxed">
                              {problem.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Diagnostic Visual - Sticky */}
          <div className="hidden lg:block lg:col-span-6 sticky top-32 self-start">
            <div className="aspect-square rounded-[48px] bg-white border border-beige shadow-2xl overflow-hidden relative">
              <DiagnosticVisual activeIndex={activeProblem} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommerceSection;