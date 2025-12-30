import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingCart, Package, TrendingUp, CheckCircle2, BarChart3, Users2, Zap, Activity } from 'lucide-react';

const Solutions = () => {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-20 left-10 opacity-[0.03] select-none pointer-events-none">
          <span className="text-[150px] font-black font-mono text-navy tracking-tighter uppercase whitespace-nowrap">SOLUTION_MATRIX</span>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-8xl font-black text-navy leading-[1.05] tracking-tightest mb-8">
              Built for<br />
              <span className="text-olynk">High-Velocity Operations.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-steel max-w-3xl mx-auto leading-relaxed font-medium">
              If operational complexity is your biggest bottleneck, OLynk is your unfair advantage.
              Built for enterprises that have outgrown spreadsheets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Diagnostic/Self-Identification Section */}
      <section className="py-24 lg:py-32 px-4 border-t border-beige bg-white/40 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute bottom-10 right-10 opacity-[0.02] select-none pointer-events-none">
          <span className="text-[100px] font-black font-mono text-navy uppercase">IDENT_PROTOCOL_V2</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Column 1: The Threshold */}
            <div className="bg-white p-10 rounded-[40px] border border-beige/60 shadow-sm space-y-8">
              <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center">
                <Activity className="w-6 h-6 text-navy" />
              </div>
              <h3 className="text-2xl font-black text-navy tracking-tight">The "I Need This" Moment</h3>
              <ul className="space-y-4">
                {[
                  "Stockouts are costing you >$10k/mo",
                  "Your team spends 4+ hours/day in Excel",
                  "You sell on 3+ channels simultaneously",
                  "Cash flow feels like a black box"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-steel font-medium text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Industries */}
            <div className="bg-navy p-10 rounded-[40px] border border-navy shadow-xl space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-[0.1] text-white">
                <Users2 className="w-20 h-20" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight relative z-10">Industries We Scale</h3>
              <div className="space-y-2 relative z-10">
                {[
                  "Digital-First Commerce",
                  "Multi-channel Retail",
                  "B2B Distribution",
                  "Marketplace Conglomerates",
                  "Digital-First Manufacturing"
                ].map((item, i) => (
                  <div key={i} className="py-3 border-b border-white/10 text-white/80 font-bold text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Decision Makers */}
            <div className="bg-white p-10 rounded-[40px] border border-beige/60 shadow-sm space-y-8">
              <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-olynk" />
              </div>
              <h3 className="text-2xl font-black text-navy tracking-tight">Built for Leaders</h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { role: "Executives", impact: "Zero Firefighting" },
                  { role: "COOs", impact: "Operational Clarity" },
                  { role: "CFOs", impact: "Capital Efficiency" },
                  { role: "Ops Managers", impact: "Total Automation" }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-cream/50 border border-beige/40">
                    <div className="text-xs font-black text-tan uppercase tracking-widest">{item.role}</div>
                    <div className="text-sm font-bold text-navy">{item.impact}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capability Matrix */}
      <section className="py-24 lg:py-32 px-4 border-t border-beige relative">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-4xl lg:text-7xl font-black text-navy tracking-tightest leading-[0.95] mb-8">
            The End of<br />
            <span className="text-navy/40 italic font-serif font-normal text-5xl lg:text-6xl">Information Gaps.</span>
          </h2>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-0 rounded-[48px] overflow-hidden border border-beige shadow-2xl bg-white">
            {/* Solution 1 */}
            <div className="p-12 border-b md:border-b-0 md:border-r border-beige hover:bg-cream/20 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-7 h-7 text-olynk" />
              </div>
              <h3 className="text-2xl font-black text-navy mb-4 tracking-tight">Channel Synchronization</h3>
              <p className="text-steel leading-relaxed mb-8">
                Selling everywhere but seeing nowhere? We unify inventory, orders, and pricing across every sales touchpoint.
              </p>
              <div className="space-y-3">
                <div className="text-[10px] font-black text-tan uppercase tracking-widest">Key Outcomes:</div>
                <div className="text-sm font-bold text-navy flex items-center gap-2">
                  <Zap className="w-3 h-3 text-olynk" /> Zero Overselling
                </div>
                <div className="text-sm font-bold text-navy flex items-center gap-2">
                  <Zap className="w-3 h-3 text-olynk" /> Real-time Price Sync
                </div>
              </div>
            </div>

            {/* Solution 2 */}
            <div className="p-12 border-b md:border-b-0 md:border-r border-beige hover:bg-cream/20 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Package className="w-7 h-7 text-olynk" />
              </div>
              <h3 className="text-2xl font-black text-navy mb-4 tracking-tight">Supply Elasticity</h3>
              <p className="text-steel leading-relaxed mb-8">
                Prediction is better than reaction. We automate procurement cycles based on demand velocity and lead times.
              </p>
              <div className="space-y-3">
                <div className="text-[10px] font-black text-tan uppercase tracking-widest">Key Outcomes:</div>
                <div className="text-sm font-bold text-navy flex items-center gap-2">
                  <Zap className="w-3 h-3 text-olynk" /> -40% Stockouts
                </div>
                <div className="text-sm font-bold text-navy flex items-center gap-2">
                  <Zap className="w-3 h-3 text-olynk" /> Auto-Generated POs
                </div>
              </div>
            </div>

            {/* Solution 3 */}
            <div className="p-12 hover:bg-cream/20 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-olynk" />
              </div>
              <h3 className="text-2xl font-black text-navy mb-4 tracking-tight">Capital Intelligence</h3>
              <p className="text-steel leading-relaxed mb-8">
                Unlock cash trapped in inventory. We optimize working capital through precision forecasting and RTO mitigation.
              </p>
              <div className="space-y-3">
                <div className="text-[10px] font-black text-tan uppercase tracking-widest">Key Outcomes:</div>
                <div className="text-sm font-bold text-navy flex items-center gap-2">
                  <Zap className="w-3 h-3 text-olynk" /> +25% Working Capital
                </div>
                <div className="text-sm font-bold text-navy flex items-center gap-2">
                  <Zap className="w-3 h-3 text-olynk" /> Automated Reconciliation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-40 px-4 border-t border-beige bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '60px 60px' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tightest leading-[0.95] mb-12">
            Stop firefighting.<br />
            <span className="text-emerald-400">Start scaling.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/waitlist"
              className="px-12 py-6 bg-white text-navy rounded-2xl font-black text-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-4"
            >
              Request Access Protocol
              <ArrowRight className="w-6 h-6 text-olynk" />
            </Link>
          </div>
          <p className="mt-8 text-white/40 font-mono text-[10px] uppercase tracking-widest">
            DEPLOYMENT_READY // NODE_AVAILABILITY: HIGH
          </p>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
