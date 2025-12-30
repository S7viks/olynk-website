import { motion } from 'framer-motion';
import {
    Activity, Brain, Zap,
    ArrowUpRight, BarChart3, Clock, Cpu, Layout,
    CheckCircle2, Gauge, Target, Repeat, Network,
    Layers, LineChart, BarChart
} from 'lucide-react';

const OlynkDashboard = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as const }
        }
    };

    const Sparkline = ({ color = "#2B5288", data = [30, 45, 32, 50, 42, 60, 55, 78] }) => (
        <svg viewBox="0 0 100 30" className="w-full h-8 opacity-60">
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={data.map((val, i) => `${(i / (data.length - 1)) * 100},${30 - (val / 100) * 30}`).join(' ')}
            />
        </svg>
    );

    return (
        <motion.div
            className="w-full max-w-full mx-auto p-2 sm:p-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
        >
            <div className="relative bg-white border border-beige shadow-[0_40px_80px_-20px_rgba(0,27,61,0.15)] rounded-3xl overflow-hidden">

                {/* 1. TOP INTEGRATED STATUS BAR */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-8 py-3 border-b border-beige bg-cream gap-4 sm:gap-0">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.2)]" />
                            <span className="text-[10px] font-black text-navy uppercase tracking-widest font-mono">System_Active</span>
                        </div>
                        <div className="hidden sm:block h-3 w-[1px] bg-beige" />
                        <div className="flex items-center gap-2">
                            <Cpu className="w-3.5 h-3.5 text-navy opacity-40" />
                            <span className="text-[10px] font-black text-navy uppercase tracking-widest font-mono">Model:A9-D3</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-6">
                        <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-tan" />
                            <span className="text-[10px] font-black text-tan uppercase tracking-widest font-mono">14:02:11</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-600">
                            <Activity className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest font-mono">0.04ms</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-0 lg:min-h-[460px]">

                    {/* 2. LEFT PANEL: COMPRESSED HEALTH TELEMETRY */}
                    <aside className="lg:col-span-3 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-beige space-y-4 bg-cream">
                        <div className="space-y-8">
                            <div className="flex items-center justify-between border-b border-beige pb-2">
                                <h3 className="text-[10px] font-black text-tan uppercase tracking-widest">Health Telemetry</h3>
                                <BarChart3 className="w-3.5 h-3.5 text-tan" />
                            </div>

                            <div className="space-y-4">
                                {[
                                    { label: 'Inventory', status: 'ALERT', val: 65, color: '#D97706' },
                                    { label: 'Capital', status: 'STABLE', val: 92, color: '#059669' },
                                    { label: 'Fulfillment', status: 'NOMINAL', val: 45, color: '#001B3D' },
                                    { label: 'Node Status', status: 'ACTIVE', val: 98, color: '#2B5288' }
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-2.5">
                                        <div className="flex items-center justify-between text-[11px]">
                                            <span className="text-navy font-black uppercase tracking-tight">{item.label}</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="font-black uppercase tracking-widest text-[9px]" style={{ color: item.color }}>{item.status}</span>
                                            </div>
                                        </div>
                                        <div className="h-[2px] w-full bg-beige/20 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full"
                                                style={{ backgroundColor: item.color }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.val}%` }}
                                                transition={{ duration: 1.5, delay: idx * 0.1 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8 border-t border-beige flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-cream border border-beige/40 flex items-center justify-center">
                                <Layout className="w-4 h-4 text-tan" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black text-tan uppercase tracking-widest">Environment</span>
                                <span className="text-[10px] font-black text-navy">GLOBAL_OPERATIONS</span>
                            </div>
                        </div>
                    </aside>

                    {/* 3. CENTER: HERO DECISION WINDSHIELD */}
                    <main className="lg:col-span-6 p-4 sm:p-6 bg-white flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-beige/30">
                        <div className="max-w-xl mx-auto w-full space-y-6">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-navy flex items-center justify-center shadow-lg shadow-navy/10">
                                        <Brain className="w-4.5 h-4.5 text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-navy uppercase tracking-[0.4em] leading-none mb-1">Automatic problem solving</span>
                                        <span className="text-[9px] text-navy/20 font-mono font-bold uppercase tracking-tight">SOLVER_MODE</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-navy uppercase tracking-[0.3em] font-mono bg-cream px-2 py-0.5 rounded border border-beige">Action Required</span>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-navy leading-tight tracking-tightest">
                                        SKU-214 will run out of stock in <span className="text-olynk italic font-serif">6 days.</span>
                                    </h2>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.2em] font-mono">Status: Fixing it now</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-5 rounded-2xl bg-white border border-beige shadow-sm">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Zap className="w-4 h-4 text-olynk" strokeWidth={3} />
                                        <span className="text-[9px] font-black text-tan uppercase tracking-widest">OP_CORE_A</span>
                                    </div>
                                    <p className="text-navy text-sm font-black leading-tight">
                                        Reallocating 450 units from <span className="text-olynk">WH-B</span> to <span className="text-olynk">WH-A</span>
                                    </p>
                                </div>
                                <div className="p-5 rounded-2xl bg-white border border-beige shadow-sm">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Activity className="w-4 h-4 text-olynk" strokeWidth={3} />
                                        <span className="text-[9px] font-black text-tan uppercase tracking-widest">OP_CORE_B</span>
                                    </div>
                                    <p className="text-navy text-sm font-black leading-tight">
                                        Partial Reorder: 2.5k units [Supplier-2]
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between text-[10px] font-black text-navy/20 uppercase tracking-[0.4em]">
                                    <span>Deployment Sequence</span>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5 text-emerald-600">
                                            <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
                                            <span>SH_ACK</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-emerald-600">
                                            <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
                                            <span>EDI_OK</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative h-1 w-full bg-beige/20 rounded-full overflow-hidden">
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-olynk shadow-[0_0_10px_#2B5288]"
                                        initial={{ width: 0 }}
                                        animate={{ width: "66%" }}
                                        transition={{ duration: 2, ease: "easeInOut" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* 4. RIGHT PANEL: ENRICHED LOGIC STACK (NOW WITH CHARTS) */}
                    <aside className="lg:col-span-3 p-4 sm:p-6 space-y-4 bg-cream overflow-y-auto">
                        <div className="space-y-4">
                            {/* Logic Stack Header */}
                            <div className="flex items-center justify-end gap-3 border-b border-beige pb-2">
                                <span className="text-[10px] font-black text-tan uppercase tracking-widest">Logic Stack</span>
                                <Layers className="w-3.5 h-3.5 text-tan" />
                            </div>

                            {/* Trigger Data Section */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-end gap-2">
                                    <span className="text-[9px] font-black text-navy/40 uppercase tracking-widest">Trigger Data</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-olynk" />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[11px] font-black text-navy tracking-tight">Marketplace (+22.4%)</span>
                                        <div className="w-full mt-2">
                                            <Sparkline color="#2B5288" data={[20, 25, 30, 45, 42, 50, 65, 78]} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end opacity-60">
                                        <span className="text-[11px] font-black text-navy tracking-tight">Transit Latency: Z3</span>
                                        <div className="w-full mt-2">
                                            <Sparkline color="#D97706" data={[10, 15, 12, 18, 25, 32, 45, 55]} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Simulation Chart */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-end gap-2">
                                    <span className="text-[9px] font-black text-navy/40 uppercase tracking-widest">Simulation Model</span>
                                    <LineChart className="w-3.5 h-3.5 text-navy opacity-20" />
                                </div>
                                <div className="space-y-3 font-mono text-[10px] border border-beige/40 p-4 rounded-xl bg-white shadow-sm">
                                    {[
                                        { label: 'Wait', val: '-14.2%', color: 'text-navy', opacity: 'opacity-30' },
                                        { label: 'Reactive', val: 'CAP_LMT', color: 'text-amber-500', opacity: 'opacity-30' },
                                        { label: 'Optimal', val: '+6.4%', color: 'text-emerald-600', opacity: 'opacity-100' }
                                    ].map((item, i) => (
                                        <div key={i} className={`flex justify-between items-center ${item.opacity} ${i > 0 ? 'pt-2 border-t border-beige/20' : ''}`}>
                                            <span className="text-[8px] font-sans font-black uppercase tracking-widest">{item.label}</span>
                                            <span className={`font-black ${item.color}`}>{item.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Resource Constraints (Bar Chart Style) */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-end gap-2">
                                    <span className="text-[9px] font-black text-navy/40 uppercase tracking-widest">Model Constraints</span>
                                    <BarChart className="w-3.5 h-3.5 text-navy opacity-20" />
                                </div>
                                <div className="space-y-4 bg-white/50 p-4 rounded-xl border border-beige/30">
                                    {[
                                        { label: 'Risk', val: 30 },
                                        { label: 'Budget', val: 75 },
                                        { label: 'Velocity', val: 90 }
                                    ].map((c, i) => (
                                        <div key={i} className="space-y-1.5 flex flex-col items-end">
                                            <div className="flex justify-between w-full text-[8px] font-black uppercase tracking-tighter text-navy/50">
                                                <span>{c.val}%</span>
                                                <span>{c.label}</span>
                                            </div>
                                            <div className="h-[3px] w-full bg-beige/20 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-navy/40 rounded-full"
                                                    style={{ width: `${c.val}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Integrity Score */}
                            <div className="pt-8 border-t border-beige/30 flex flex-col items-end">
                                <span className="text-[9px] font-black text-navy/30 uppercase tracking-widest mb-4">Integrity Index</span>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <span className="block text-xl font-black text-navy font-mono">94.8<span className="text-[10px] opacity-20">%</span></span>
                                        <span className="block text-[8px] font-black text-navy/20 uppercase tracking-tight">CONFIDENCE</span>
                                    </div>
                                    <div className="relative w-12 h-12 flex items-center justify-center">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="24" cy="24" r="21" stroke="rgba(0,0,0,0.03)" strokeWidth="3" fill="transparent" />
                                            <motion.circle
                                                cx="24" cy="24" r="21" stroke="#2B5288" strokeWidth="3" fill="transparent"
                                                strokeDasharray="131.9"
                                                initial={{ strokeDashoffset: 131.9 }}
                                                animate={{ strokeDashoffset: 7 }}
                                                transition={{ duration: 2, ease: "easeOut" }}
                                            />
                                        </svg>
                                        <span className="absolute">
                                            <Network className="w-3 h-3 text-olynk/40" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* 5. BOTTOM IMPACT STRIP */}
                <div className="px-4 sm:px-10 py-6 bg-navy flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 border-t border-white/5">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:items-center gap-8 lg:gap-16 w-full lg:w-auto">

                        <div className="space-y-1.5 flex flex-col">
                            <span className="text-[9px] lg:text-[10px] font-black text-white/30 uppercase tracking-[0.3em] font-mono">Impact_Rescued</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl lg:text-3xl font-black text-emerald-400 font-mono tracking-tighter">₹8.4L</span>
                                <ArrowUpRight className="w-4 h-4 text-emerald-400 opacity-40" />
                            </div>
                        </div>

                        <div className="space-y-1.5 flex flex-col">
                            <span className="text-[9px] lg:text-[10px] font-black text-white/30 uppercase tracking-[0.3em] font-mono">Efficiency_Gain</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl lg:text-3xl font-black text-emerald-400 font-mono tracking-tighter">+22.4%</span>
                                <Activity className="w-4 h-4 text-emerald-400 opacity-40" />
                            </div>
                        </div>

                        <div className="space-y-1.5 flex flex-col">
                            <span className="text-[9px] lg:text-[10px] font-black text-white/30 uppercase tracking-[0.3em] font-mono">Precision_Score</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl lg:text-3xl font-black text-emerald-400 font-mono tracking-tighter">94.8%</span>
                                <Target className="w-4 h-4 text-emerald-400 opacity-40" />
                            </div>
                        </div>

                        <div className="space-y-1.5 flex flex-col">
                            <span className="text-[9px] lg:text-[10px] font-black text-white/30 uppercase tracking-[0.3em] font-mono">Capital_Velocity</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl lg:text-3xl font-black text-emerald-400 font-mono tracking-tighter">1.8x</span>
                                <Repeat className="w-4 h-4 text-emerald-400 opacity-40" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-6 w-full lg:w-auto bg-white/5 p-4 rounded-2xl border border-white/10 overflow-hidden">
                        <div className="flex flex-col items-start lg:items-end flex-1 lg:flex-none">
                            <span className="text-[8px] lg:text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Forecast_Scope</span>
                            <span className="text-[10px] lg:text-xs font-black text-white uppercase tracking-tighter px-2 lg:px-3 py-1 bg-white/10 rounded-md whitespace-nowrap">14-DAY_WINDOW</span>
                        </div>
                        <div className="h-10 w-[1px] bg-white/10 shrink-0"></div>
                        <div className="flex items-center gap-3 shrink-0">
                            <Gauge className="w-4 h-4 lg:w-5 h-5 text-emerald-400" />
                            <span className="text-[9px] lg:text-[10px] font-black text-white uppercase tracking-widest leading-none">Optimal<br />Status</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default OlynkDashboard;
