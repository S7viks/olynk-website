import { motion } from 'framer-motion';
import { Database, Network, Layers, Workflow, Zap, Activity, Box, Globe, BarChart3, Search } from 'lucide-react';

const DataPipeline = () => {
    return (
        <div className="relative w-full h-full bg-white overflow-hidden flex items-center justify-center p-4">
            {/* Blueprint Grid */}
            <div className="absolute inset-0 opacity-[0.15]" style={{
                backgroundImage: 'linear-gradient(#1E293B 1px, transparent 1px), linear-gradient(90deg, #1E293B 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />

            <svg viewBox="0 0 800 400" className="w-full h-full relative z-10">
                {/* Connection Lines (Static Background) */}
                <path d="M 150 100 L 400 200 M 150 200 L 400 200 M 150 300 L 400 200" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" className="opacity-30" />
                <path d="M 400 200 L 650 100 M 400 200 L 650 300" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" className="opacity-30" />

                {/* Animated Data Particles */}
                {[...Array(20)].map((_, i) => {
                    const pathD = i % 3 === 0 ? 'M 150 100 L 400 200 L 650 100' :
                        i % 3 === 1 ? 'M 150 200 L 400 200 L 650 300' :
                            'M 150 300 L 400 200 L 650 150';
                    return (
                        <motion.circle
                            key={i}
                            r="2.5"
                            fill="#2563EB"
                            initial={{ offsetDistance: "0%" }}
                            animate={{ offsetDistance: "100%" }}
                            transition={{
                                duration: 4 + Math.random() * 2,
                                repeat: Infinity,
                                ease: "linear",
                                delay: i * 0.5
                            }}
                            style={{
                                offsetPath: `path("${pathD}")`,
                                position: 'absolute'
                            } as any}
                        />
                    );
                })}

                {/* Input Nodes Cluster */}
                <g transform="translate(100, 200)">
                    {[
                        { y: -100, label: "SHOPIFY_API", icon: Globe },
                        { y: 0, label: "NETSUITE_ERP", icon: Database },
                        { y: 100, label: "META_ADS", icon: Zap }
                    ].map((node, i) => (
                        <g key={i} transform={`translate(0, ${node.y})`}>
                            <rect x="-45" y="-30" width="90" height="60" rx="12" className="fill-white stroke-navy/10" strokeWidth="1" />
                            <foreignObject x="-15" y="-15" width="30" height="30">
                                <node.icon className="w-7 h-7 text-navy/40" />
                            </foreignObject>
                            <text y="45" textAnchor="middle" className="text-[9px] font-mono font-black fill-navy/60 uppercase tracking-widest">{node.label}</text>
                            <motion.circle
                                r="4"
                                fill="#2563EB"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                                cx="55" cy="0"
                            />
                        </g>
                    ))}
                </g>

                {/* Central Fabric Core */}
                <g transform="translate(400, 200)">
                    <motion.circle
                        r="70"
                        className="fill-navy/5 stroke-navy/10"
                        strokeWidth="1"
                        strokeDasharray="8 4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                    <circle r="50" className="fill-white stroke-olynk" strokeWidth="2" />
                    <foreignObject x="-20" y="-20" width="40" height="40">
                        <Activity className="w-10 h-10 text-olynk animate-pulse" />
                    </foreignObject>
                    <text y="95" textAnchor="middle" className="text-[11px] font-mono font-black fill-navy uppercase tracking-[0.3em]">CORE_FABRIC_ENGINE</text>

                    {/* Scanning rings */}
                    <motion.circle
                        r="80"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="1"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.3, opacity: [0, 0.2, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </g>

                {/* Output Nodes Cluster */}
                <g transform="translate(700, 200)">
                    {[
                        { y: -100, label: "REAL_TIME_INV", icon: Box },
                        { y: 100, label: "UNIFIED_P&L", icon: BarChart3 }
                    ].map((node, i) => (
                        <g key={i} transform={`translate(0, ${node.y})`}>
                            <rect x="-45" y="-30" width="90" height="60" rx="12" className="fill-white stroke-emerald-500/20" strokeWidth="1" />
                            <foreignObject x="-15" y="-15" width="30" height="30">
                                <node.icon className="w-7 h-7 text-emerald-500/40" />
                            </foreignObject>
                            <text y="45" textAnchor="middle" className="text-[9px] font-mono font-black fill-emerald-600 uppercase tracking-widest">{node.label}</text>
                            <motion.circle
                                r="4"
                                fill="#10B981"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                                cx="-55" cy="0"
                            />
                        </g>
                    ))}
                </g>
            </svg>

            {/* Status Overlays */}
            <div className="absolute top-10 left-10 space-y-3">
                <div className="flex items-center gap-3 px-3 py-1.5 bg-navy/5 rounded-full border border-navy/10">
                    <div className="w-2 h-2 rounded-full bg-olynk animate-pulse" />
                    <span className="text-[10px] font-mono font-black text-navy uppercase tracking-widest">INGESTION_READY</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-1.5 bg-emerald-500/5 rounded-full border border-emerald-500/10">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono font-black text-emerald-600 uppercase tracking-widest">FABRIC_SYNC_LOCKED</span>
                </div>
            </div>

            <div className="absolute bottom-10 right-10 text-right space-y-1">
                <div className="text-[10px] font-mono font-black text-navy/60 uppercase tracking-[0.2em]">PROCESSING_LOAD: 14.2%</div>
                <div className="text-[10px] font-mono font-black text-navy/60 uppercase tracking-[0.2em]">LATENCY: 2.4MS</div>
            </div>
        </div>
    );
};

const Fabric = () => {
    return (
        <div className="min-h-screen bg-transparent relative z-10">
            {/* Hero Section */}
            <section className="pt-24 lg:pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center">
                <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-[0.03] select-none pointer-events-none">
                    <span className="text-[120px] lg:text-[200px] font-black font-mono text-navy tracking-tighter uppercase whitespace-nowrap">FABRIC_LAYER</span>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-olynk/5 rounded-full blur-3xl -z-10" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-xs font-mono font-bold text-navy uppercase tracking-widest mb-8">
                            <Database className="w-3 h-3" />
                            Data Layer
                        </div>
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-navy leading-[1.1] tracking-tight mb-8">
                            Connect and <br />
                            <span className="text-olynk">unify everything.</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-steel max-w-2xl mx-auto leading-relaxed font-medium mb-12">
                            Break down silos between Shopify, ERPs, and Logistics. Olynk Fabric creates a single, real-time blueprint of your entire multi-channel operation.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Architecture Pipeline Visual - BLUEPRINT */}
            <section className="pb-16 lg:pb-20 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-[0_32px_80px_-16px_rgba(30,41,59,0.1)] border border-beige bg-white aspect-auto lg:aspect-[21/9] min-h-[400px] lg:min-h-[500px]"
                    >
                        <DataPipeline />

                        {/* Blueprint overlay labels */}
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/80 backdrop-blur-md rounded-full border border-beige flex items-center gap-4 shadow-sm">
                            <span className="text-[10px] font-mono font-black text-navy/40 uppercase tracking-widest">SYST_BLUEPRINT://CORE_FABRIC_O1</span>
                            <div className="w-px h-4 bg-beige" />
                            <span className="text-[10px] font-mono font-black text-olynk uppercase tracking-widest flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-olynk animate-ping" />
                                LIVE_SYNC_ACTIVE
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Technical Capabilities Showcase */}
            <section className="py-20 lg:py-24 bg-cream border-t border-beige relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
                        {[
                            {
                                icon: Network,
                                title: "Dynamic Schema Evolution",
                                desc: "No more fixed databases. Our fabric adapts to new data fields from any source automatically.",
                                animation: (
                                    <div className="h-44 bg-navy/5 rounded-3xl relative overflow-hidden flex items-center justify-center">
                                        <div className="grid grid-cols-4 gap-2">
                                            {[...Array(8)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ scale: 0.8, opacity: 0.2 }}
                                                    animate={{ scale: [0.8, 1, 0.8], opacity: [0.2, 0.6, 0.2] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                                    className="w-10 h-10 bg-white border border-beige rounded-lg flex items-center justify-center shadow-sm"
                                                >
                                                    <div className="w-4 h-0.5 bg-navy/20 rounded-full" />
                                                </motion.div>
                                            ))}
                                        </div>
                                        <div className="absolute bottom-4 text-[8px] font-mono font-black text-navy/60 uppercase tracking-[0.2em]">SCHEMA_ADAPT_ACTIVE</div>
                                    </div>
                                )
                            },
                            {
                                icon: Layers,
                                title: "Global Knowledge Index",
                                desc: "Proprietary vector-sync ensures every SKU, location, and order is indexed for instant AI reasoning.",
                                animation: (
                                    <div className="h-44 bg-navy/5 rounded-3xl relative overflow-hidden flex items-center justify-center p-8">
                                        <div className="w-full space-y-3">
                                            {[...Array(3)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="h-2.5 bg-white border border-beige rounded-full overflow-hidden shadow-sm"
                                                >
                                                    <motion.div
                                                        initial={{ x: "-100%" }}
                                                        animate={{ x: "100%" }}
                                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                                        className="w-1/3 h-full bg-olynk/20"
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <Search className="w-4 h-4 text-navy/40" />
                                        </div>
                                    </div>
                                )
                            },
                            {
                                icon: Workflow,
                                title: "Event Stream Engine",
                                desc: "Real-time processing of signals. React to inventory changes or demand spikes in milliseconds.",
                                animation: (
                                    <div className="h-44 bg-navy/5 rounded-3xl relative overflow-hidden flex items-center justify-center">
                                        <div className="flex gap-6 items-center">
                                            <div className="w-14 h-14 rounded-2xl bg-white border border-beige flex items-center justify-center shadow-md">
                                                <Zap className="w-7 h-7 text-amber-500" />
                                            </div>
                                            <div className="w-20 h-px bg-gradient-to-r from-transparent via-beige to-transparent" />
                                            <div className="w-14 h-14 rounded-2xl bg-white border border-beige flex items-center justify-center shadow-md">
                                                <motion.div
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 0.5, repeat: Infinity }}
                                                >
                                                    <Activity className="w-7 h-7 text-olynk" />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        ].map((feature, i) => (
                            <div key={i} className="space-y-6 group">
                                {feature.animation}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white border border-beige flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                            <feature.icon className="w-6 h-6 text-olynk" />
                                        </div>
                                        <h3 className="text-xl font-black text-navy">{feature.title}</h3>
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

export default Fabric;
