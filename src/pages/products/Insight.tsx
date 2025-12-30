import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, TrendingUp, Zap, BarChart3, Search, Activity, ArrowUpRight, Cloud, DollarSign, AlertTriangle } from 'lucide-react';

const PredictivePulse = () => {
    return (
        <div className="relative w-full h-full bg-white overflow-hidden flex items-center justify-center">
            {/* Technical Blueprint Grid */}
            <div className="absolute inset-0 opacity-[0.15]" style={{
                backgroundImage: 'linear-gradient(#1E293B 1px, transparent 1px), linear-gradient(90deg, #1E293B 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />

            {/* Scanning Laser Line */}
            <motion.div
                animate={{
                    top: ['0%', '100%', '0%'],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-olynk/40 to-transparent z-10"
            />

            <svg viewBox="0 0 800 300" className="w-full h-full relative z-0 p-8">
                {/* Main Forecast Path with subtle oscillation */}
                <motion.path
                    d="M0,200 C100,220 200,100 300,150 S450,50 600,120 S750,20 800,40"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* Oscillation Overlay */}
                <motion.path
                    d="M0,200 C100,220 200,100 300,150 S450,50 600,120 S750,20 800,40"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="3"
                    className="opacity-10"
                    animate={{
                        d: [
                            "M0,200 C100,220 200,100 300,150 S450,50 600,120 S750,20 800,40",
                            "M0,205 C100,215 200,105 300,155 S450,55 600,125 S750,25 800,45",
                            "M0,200 C100,220 200,100 300,150 S450,50 600,120 S750,20 800,40"
                        ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Confidence Interval Fill */}
                <motion.path
                    d="M0,220 C100,240 200,120 300,170 S450,70 600,140 S750,40 800,60 L800,20 C750,0 600,100 450,30 S300,130 200,80 S100,200 0,180 Z"
                    fill="#2563EB"
                    className="opacity-[0.03]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.03 }}
                    transition={{ delay: 1, duration: 1 }}
                />

                {/* Pulsing Data Nodes */}
                {[
                    { x: 300, y: 150, label: "DEMAND_SPIKE" },
                    { x: 600, y: 120, label: "STOCKOUT_RISK" }
                ].map((node, i) => (
                    <g key={i}>
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r="6"
                            fill="#2563EB"
                            initial={{ scale: 0 }}
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                        />
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r="12"
                            stroke="#2563EB"
                            strokeWidth="1"
                            fill="none"
                            initial={{ scale: 1, opacity: 1 }}
                            animate={{ scale: 3, opacity: 0 }}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                        />
                        <text x={node.x + 15} y={node.y - 15} className="text-[10px] font-mono font-black fill-navy/60 uppercase tracking-widest">
                            {node.label}
                        </text>
                    </g>
                ))}
            </svg>

            {/* Static Overlay Labels */}
            <div className="absolute top-6 left-6 font-mono text-[9px] font-black text-navy/60 uppercase tracking-[0.2em] space-y-1.5">
                <div>MODE: PREDICTIVE_INFERENCE</div>
                <div>PRECISION: 98.42%</div>
                <div>SAMPLING: REAL_TIME</div>
            </div>
        </div>
    );
};

const Insight = () => {
    const [signals, setSignals] = useState([
        { id: 1, type: 'risk', time: 'Just now', title: 'Stockout Risk: SKU-124', desc: 'Inventory < 2 days coverage', icon: Activity, color: 'text-red-500', bg: 'bg-red-50' },
        { id: 2, type: 'trend', time: '15 min ago', title: 'Demand Spike Detected', desc: '+45% vs avg in West Coast', icon: ArrowUpRight, color: 'text-emerald-600', bg: 'bg-emerald-50' }
    ]);

    useEffect(() => {
        const AVAILABLE_SIGNALS = [
            { type: 'trend', title: 'Price Optimization', desc: 'Suggest +4% Margin Increase', icon: DollarSign, color: 'text-olynk', bg: 'bg-blue-50' },
            { type: 'risk', title: 'Logistics Alert', desc: 'Delay at Port_Mumbai', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
            { type: 'trend', title: 'Ad Spend Efficiency', desc: 'ROAS dropped below 2.5x', icon: TrendingUp, color: 'text-red-500', bg: 'bg-red-50' },
            { type: 'trend', title: 'Competitor Insight', desc: 'Competitor dropped price by 10%', icon: Target, color: 'text-navy', bg: 'bg-gray-100' },
            { type: 'risk', title: 'Payment Gateway', desc: 'High failure rate detected (2%)', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
            { type: 'trend', title: 'Conversion Spike', desc: 'Mobile conversion up by 12%', icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-50' }
        ];

        const interval = setInterval(() => {
            setSignals(prev => {
                // Filter out signals that are ALREADY in the visible list
                const visibleTitles = new Set(prev.map(s => s.title));
                const candidates = AVAILABLE_SIGNALS.filter(s => !visibleTitles.has(s.title));

                // If we somehow ran out of candidates (unlikely with this pool/list size), fallback to random
                const pool = candidates.length > 0 ? candidates : AVAILABLE_SIGNALS;
                const signalTemplate = pool[Math.floor(Math.random() * pool.length)];

                const newSignal = {
                    id: Date.now(),
                    ...signalTemplate,
                    time: 'Just now'
                };

                return [newSignal, ...prev.slice(0, 3)];
            });
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-transparent relative z-10">
            {/* Hero Section */}
            <section className="pt-24 lg:pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center">
                <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-[0.03] select-none pointer-events-none">
                    <span className="text-[120px] lg:text-[200px] font-black font-mono text-navy tracking-tighter uppercase whitespace-nowrap">INSIGHT_LAYER</span>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-olynk/5 rounded-full blur-3xl -z-10" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-xs font-mono font-bold text-navy uppercase tracking-widest mb-8">
                            <Zap className="w-3 h-3" />
                            Intelligence Layer
                        </div>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-navy leading-[1.1] tracking-tight mb-8">
                            See clearly. <br />
                            <span className="text-olynk">Decide confidently.</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-steel max-w-2xl mx-auto leading-relaxed font-medium mb-12">
                            Transform scattered data into a single source of truth. Detect anomalies, predict demand, and optimize operations with surgical precision.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* UI Visualization - BLUEPRINT DASHBOARD */}
            <section className="pb-16 lg:pb-20 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative rounded-[40px] overflow-hidden shadow-[0_32px_80px_-16px_rgba(30,41,59,0.1)] border border-beige bg-white"
                    >
                        {/* Browser/Window Header */}
                        <div className="h-16 border-b border-beige bg-cream/30 backdrop-blur-md flex items-center px-6 lg:px-8 justify-between">
                            <div className="flex gap-2.5">
                                <div className="w-3.5 h-3.5 rounded-full bg-beige border border-navy/10" />
                                <div className="w-3.5 h-3.5 rounded-full bg-beige border border-navy/10" />
                                <div className="w-3.5 h-3.5 rounded-full bg-beige border border-navy/10" />
                            </div>
                            <div className="flex items-center gap-3 text-xs font-black font-mono text-steel/60 bg-white/50 px-5 py-2 rounded-full border border-beige shadow-sm">
                                <Search className="w-3.5 h-3.5" />
                                insight_engine_v2.0
                            </div>
                            <div className="flex items-center gap-4">
                                <Activity className="w-4 h-4 text-olynk animate-pulse" />
                                <div className="w-9 h-9 rounded-full bg-navy/5 border border-beige" />
                            </div>
                        </div>

                        {/* Dashboard Content */}
                        <div className="p-6 lg:p-10">
                            <div className="grid lg:grid-cols-3 gap-8">

                                {/* Main Chart Area */}
                                <div className="lg:col-span-2 space-y-10">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1.5">
                                            <h3 className="text-xs font-black text-navy/60 uppercase tracking-widest">Revenue Forecast</h3>
                                            <div className="text-5xl font-mono font-black text-navy tracking-tighter">$2,482,190 <span className="text-emerald-500 text-xl align-top font-bold ml-2">+12.4%</span></div>
                                        </div>
                                        <div className="flex gap-2 bg-navy/5 p-1 rounded-xl">
                                            {['1D', '1W', '1M', '1Y'].map(t => (
                                                <span key={t} className={`text-[10px] font-black px-4 py-2 rounded-lg cursor-pointer transition-all ${t === '1M' ? 'bg-white text-navy shadow-sm border border-beige' : 'text-navy/60 hover:text-navy'}`}>{t}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Code-based Predictive Pulse Visual - Light Theme */}
                                    <div className="h-[400px] w-full bg-white rounded-[32px] border border-beige overflow-hidden relative group shadow-inner">
                                        <PredictivePulse />
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="bg-white border border-beige p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="text-[10px] font-black text-navy/60 uppercase tracking-widest mb-2">Model Accuracy</div>
                                            <div className="text-3xl font-mono font-black text-navy">98.4%</div>
                                        </div>
                                        <div className="bg-white border border-beige p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="text-[10px] font-black text-navy/60 uppercase tracking-widest mb-2">Anomalies Detected</div>
                                            <div className="text-3xl font-mono font-black text-olynk">12 Active</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Side Panel - Dynamic Insights */}
                                <div className="space-y-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xs font-black text-navy/60 uppercase tracking-widest">Live Signals</h3>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/5 rounded-full border border-emerald-500/10">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-black text-emerald-600 font-mono tracking-widest">LIVE</span>
                                        </div>
                                    </div>

                                    <div className="space-y-5">
                                        <AnimatePresence mode="popLayout">
                                            {signals.map((sig) => (
                                                <motion.div
                                                    key={sig.id}
                                                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9, x: 20 }}
                                                    className="p-6 rounded-[24px] bg-white border border-beige shadow-sm hover:border-olynk/30 hover:shadow-lg transition-all cursor-default group"
                                                >
                                                    <div className="flex items-start gap-5">
                                                        <div className={`p-3 rounded-xl ${sig.bg} ${sig.color} shadow-sm`}>
                                                            <sig.icon className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className="text-[10px] font-mono font-black text-navy/60 uppercase tracking-widest">{sig.time}</span>
                                                                <ArrowUpRight className="w-4 h-4 text-navy/40 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                                            </div>
                                                            <div className="text-sm font-black text-navy uppercase tracking-tight">{sig.title}</div>
                                                            <div className="text-xs text-steel font-medium mt-1.5 leading-relaxed">{sig.desc}</div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>

                                    <div className="p-8 rounded-[32px] bg-navy text-white relative overflow-hidden group shadow-xl">
                                        <div className="absolute top-0 right-0 p-6 opacity-10">
                                            <Zap className="w-16 h-16" />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="text-[10px] font-black text-olynk uppercase tracking-[0.2em] mb-3">Proactive Guard</div>
                                            <p className="text-xs font-bold leading-relaxed mb-6">Core engine is standing by to execute remediation for Stockout Risk.</p>
                                            <button className="w-full text-[11px] font-black py-3 bg-white text-navy rounded-xl uppercase tracking-widest hover:bg-olynk hover:text-white transition-all shadow-lg active:scale-95">Apply Remediation</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Feature Capabilities Showcase */}
            <section className="py-16 lg:py-24 bg-cream border-t border-beige relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-16">
                        {[
                            {
                                icon: TrendingUp,
                                title: "Demand Forecasting",
                                desc: "Models that ingest weather and ad spend to predict sales.",
                                animation: (
                                    <div className="h-48 bg-white border border-beige rounded-[32px] relative overflow-hidden flex flex-col items-center justify-center shadow-sm">
                                        <div className="flex gap-6 mb-6">
                                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                                                <Cloud className="w-7 h-7 text-navy/40" />
                                            </motion.div>
                                            <motion.div animate={{ y: [-5, 0, -5] }} transition={{ duration: 2.5, repeat: Infinity }}>
                                                <DollarSign className="w-7 h-7 text-olynk/40" />
                                            </motion.div>
                                        </div>
                                        <svg viewBox="0 0 100 40" className="w-4/5 h-14">
                                            <motion.path
                                                d="M 0 35 Q 25 35 50 15 T 100 5"
                                                fill="none" stroke="#2563EB" strokeWidth="4"
                                                strokeLinecap="round"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 2.5, repeat: Infinity }}
                                            />
                                        </svg>
                                        <div className="mt-4 text-[9px] font-mono font-black text-navy/60 uppercase tracking-widest">MERGING_INPUTS...</div>
                                    </div>
                                )
                            },
                            {
                                icon: Target,
                                title: "Contribution Margin",
                                desc: "See the true profitability of every SKU in real-time.",
                                animation: (
                                    <div className="h-48 bg-white border border-beige rounded-[32px] relative overflow-hidden flex items-end justify-center p-10 gap-2.5 shadow-sm">
                                        {[
                                            { h: 32, label: "GROSS", color: "bg-navy/5" },
                                            { h: 24, label: "SHIP", color: "bg-red-400/10" },
                                            { h: 16, label: "COGS", color: "bg-red-400/10" },
                                            { h: 12, label: "NET", color: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" }
                                        ].map((bar, i) => (
                                            <div key={i} className="flex flex-col items-center gap-3">
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: bar.h * 3 }}
                                                    transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity, repeatDelay: 2 }}
                                                    className={`w-6 rounded-t-lg ${bar.color} border border-black/5`}
                                                />
                                                <span className="text-[8px] font-black text-navy/60 uppercase tracking-tighter">{bar.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )
                            },
                            {
                                icon: BarChart3,
                                title: "Anomaly Detection",
                                desc: "Insight alerts you when a KPI deviates from the norm.",
                                animation: (
                                    <div className="h-48 bg-white border border-beige rounded-[32px] relative overflow-hidden flex items-center justify-center shadow-sm">
                                        <div className="w-full px-10">
                                            <svg viewBox="0 0 100 40" className="w-full h-14">
                                                <path d="M 0 20 L 40 20 L 50 5 L 60 35 L 70 20 L 100 20" fill="none" stroke="rgba(30,41,59,0.05)" strokeWidth="2" />
                                                <motion.path
                                                    d="M 40 20 L 50 5 L 60 35 L 70 20"
                                                    fill="none" stroke="#EF4444" strokeWidth="3"
                                                    strokeLinecap="round"
                                                    animate={{ opacity: [0, 1, 0], strokeWidth: [3, 5, 3] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                />
                                            </svg>
                                        </div>
                                        <div className="absolute top-6 right-6">
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 0.5, repeat: Infinity }}
                                            >
                                                <AlertTriangle className="w-6 h-6 text-red-500" />
                                            </motion.div>
                                        </div>
                                        <div className="absolute inset-0 bg-red-500/[0.02] animate-pulse" />
                                    </div>
                                )
                            }
                        ].map((feature, i) => (
                            <div key={i} className="space-y-6 group">
                                {feature.animation}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white border border-beige flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm">
                                            <feature.icon className="w-6 h-6 text-olynk" />
                                        </div>
                                        <h3 className="text-xl font-black text-navy uppercase tracking-tight">{feature.title}</h3>
                                    </div>
                                    <p className="text-steel font-medium leading-relaxed text-sm">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Insight;
