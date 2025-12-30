
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, Brain, Zap, MessageSquare } from 'lucide-react';

const Platform = () => {
    return (
        <div className="min-h-screen bg-transparent pt-24">

            {/* SECTION 1: HERO - Category Clarity */}
            <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
                <div className="absolute top-10 left-10 opacity-[0.03] select-none pointer-events-none">
                    <span className="text-[150px] font-black font-mono text-navy tracking-tighter uppercase whitespace-nowrap">SYSTEM_ARCH</span>
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-olynk/30 bg-cream">
                            <span className="text-[10px] font-black text-tan uppercase tracking-[0.2em] font-mono">Architecture_Schema // v2.04</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-navy leading-[1.05] tracking-tightest mb-8 uppercase">
                            One Platform. <br />
                            <span className="text-olynk">Four Engines.</span> <br />
                            Total Intelligence.
                        </h1>
                        <p className="text-lg sm:text-xl lg:text-2xl text-steel max-w-3xl mx-auto leading-relaxed font-medium mb-12">
                            The enterprise-grade AI operating system for modern commerce.
                            No fragmentation. <span className="text-navy font-black">Just Unified Performance.</span>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2: THE FOUR ENGINES (Overview) */}
            <section className="py-16 px-4 bg-white/50 border-t border-beige backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {[
                            {
                                id: 'fabric',
                                name: 'Olynk Fabric',
                                role: 'Unified Data Infrastructure',
                                desc: 'Eliminates data fragmentation across 50+ enterprise protocols.',
                                icon: Database,
                                color: 'text-navy',
                                bg: 'bg-cream'
                            },
                            {
                                id: 'insight',
                                name: 'Olynk Insight',
                                role: 'Predictive Intelligence Layer',
                                desc: '87.4% accuracy in high-velocity demand forecasting.',
                                icon: Brain,
                                color: 'text-olynk',
                                bg: 'bg-beige'
                            },
                            {
                                id: 'core',
                                name: 'Olynk Core',
                                role: 'Autonomous Execution',
                                desc: 'Executes thousands of operational decisions daily.',
                                icon: Zap,
                                color: 'text-tan',
                                bg: 'bg-cream'
                            },
                            {
                                id: 'orbit',
                                name: 'Olynk Orbit',
                                role: 'Operational Governance',
                                desc: 'Unified interface for total operational control.',
                                icon: MessageSquare,
                                color: 'text-navy',
                                bg: 'bg-beige'
                            }
                        ].map((engine) => (
                            <a href={`#${engine.id}`} key={engine.name} className="group p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-beige hover:border-navy hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                                <div className={`w-14 h-14 rounded-2xl ${engine.bg} border border-beige/40 flex items-center justify-center mb-6 group-hover:bg-white transition-colors`}>
                                    <engine.icon className={`w-7 h-7 ${engine.color}`} />
                                </div>
                                <h3 className="text-lg font-black text-navy mb-2 tracking-tight">{engine.name}</h3>
                                <div className="text-[10px] font-black text-tan uppercase tracking-widest mb-4 font-mono">{engine.role}</div>
                                <p className="text-steel text-sm font-medium leading-relaxed">
                                    {engine.desc}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: FABRIC (Deep Dive) */}
            <section id="fabric" className="py-16 lg:py-24 px-4 border-t border-beige relative overflow-hidden group">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 relative">
                        {/* Real Data Unification Image */}
                        <div className="aspect-square rounded-[40px] bg-white border border-beige shadow-xl flex items-center justify-center relative overflow-hidden group/img">
                            <div className="relative w-full h-full bg-cream/30 overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-y-0 left-1/2 w-px bg-navy/5 z-20" />
                                <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 p-8">
                                    {/* Data Grid Grid Lines */}
                                    <path d="M 0 100 L 400 100 M 0 200 L 400 200 M 0 300 L 400 300 M 100 0 L 100 400 M 200 0 L 200 400 M 300 0 L 300 400" stroke="rgba(0,27,61,0.03)" strokeWidth="1" />

                                    {[...Array(6)].map((_, i) => (
                                        <motion.rect
                                            key={i} width="12" height="12" rx="2" fill="#001B3D"
                                            initial={{ x: -20, y: 50 + i * 60, opacity: 0 }}
                                            animate={{
                                                x: [null, 194, 194, 250 + (i % 2) * 40],
                                                y: [null, 50 + i * 60, 200, 180 + Math.floor(i / 2) * 40],
                                                opacity: [0, 1, 1, 1]
                                            }}
                                            transition={{ duration: 4, repeat: Infinity, delay: i * 0.6, ease: "anticipate" }}
                                        />
                                    ))}

                                    {/* Unified Hub */}
                                    <circle cx="200" cy="200" r="40" fill="none" stroke="#2B5288" strokeWidth="1" strokeDasharray="4 4" />
                                    <motion.circle
                                        cx="200" cy="200" r="10" fill="#2B5288"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </svg>

                                <div className="absolute inset-x-0 bottom-0 p-6 bg-navy/90 backdrop-blur-sm transform translate-y-full group-hover/img:translate-y-0 transition-transform duration-500">
                                    <p className="text-white text-[10px] font-mono font-black uppercase tracking-[0.3em]">LAYER_01 // UNIFIED_FABRIC_SYNC</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 space-y-8">
                        <div className="flex items-center gap-3 text-navy font-black uppercase tracking-widest text-xs font-mono">
                            <Database className="w-4 h-4 text-tan" />
                            Unified Data Layer
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-navy tracking-tightest leading-none uppercase">
                            Olynk Fabric
                        </h2>
                        <h3 className="text-xl lg:text-2xl text-steel font-medium leading-tight">
                            The end of scattered spreadsheets.
                        </h3>
                        <p className="text-lg text-steel/80 leading-relaxed">
                            Your data is currently trapped in Shopify, ERPs, Ad Managers, and logistics portals.
                            Fabric connects them all in real-time, creating a single source of truth without manual exports or CSV hell.
                        </p>
                        <ul className="space-y-4 pt-4">
                            {[
                                "Real-time bi-directional sync",
                                "Connects 50+ enterprise tools",
                                "No-code integration setup"
                            ].map(item => (
                                <li key={item} className="flex items-center gap-3 text-navy font-black text-sm uppercase tracking-wide">
                                    <div className="w-6 h-6 rounded-full bg-cream border border-beige flex items-center justify-center">
                                        <ArrowRight className="w-3 h-3 text-navy" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="pt-6">
                            <Link to="/platform/fabric" className="inline-flex items-center gap-2 text-navy font-black hover:gap-4 transition-all group uppercase tracking-widest text-xs font-mono">
                                Deep Dive: Olynk Fabric
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: INSIGHT (Deep Dive) */}
            <section id="insight" className="py-16 lg:py-24 px-4 border-t border-beige bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 text-olynk font-black uppercase tracking-widest text-xs font-mono">
                            <Brain className="w-4 h-4 text-tan" />
                            Intelligence Layer
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-navy tracking-tightest leading-none uppercase">
                            Olynk Insight
                        </h2>
                        <h3 className="text-xl lg:text-2xl text-steel font-medium leading-tight">
                            Predict problems before they happen.
                        </h3>
                        <p className="text-lg text-steel/80 leading-relaxed">
                            Most tools show you what happened yesterday. Insight tells you what will happen next month.
                            It predicts stockouts, cash flow dips, and delivery risks with causal reasoning, not just correlation.
                        </p>
                        <div className="flex items-center gap-6 pt-4">
                            <div className="pr-6 border-r border-beige">
                                <div className="text-3xl font-black text-navy">87.4%</div>
                                <div className="text-xs font-bold text-steel uppercase tracking-wider">Forecast Accuracy</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-navy">2.4M+</div>
                                <div className="text-xs font-bold text-steel uppercase tracking-wider">Predictions Run</div>
                            </div>
                        </div>
                        <div className="pt-6">
                            <Link to="/platform/insight" className="inline-flex items-center gap-2 text-olynk font-black hover:gap-4 transition-all group uppercase tracking-widest text-xs font-mono">
                                Explore Olynk Insight
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        {/* Premium Code-Based Predictive Visual */}
                        <div className="aspect-video rounded-[40px] bg-white border border-beige shadow-xl flex items-center justify-center relative overflow-hidden group/img">
                            <div className="relative w-full h-full bg-beige/30 overflow-hidden flex items-center justify-center p-4 group-hover:bg-beige/40 transition-colors duration-500">
                                {/* Technical Grid Background */}
                                <div className="absolute inset-0 opacity-20" style={{
                                    backgroundImage: 'linear-gradient(rgba(43, 82, 136, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(43, 82, 136, 0.1) 1px, transparent 1px)',
                                    backgroundSize: '20px 20px'
                                }} />

                                {/* Animated Insight Line */}
                                <svg viewBox="0 0 800 300" className="w-full h-full relative z-10 px-8">
                                    {/* Confidence Interval Area */}
                                    <motion.path
                                        d="M400,150 L800,50 L800,250 L400,150"
                                        fill="rgba(43, 82, 136, 0.05)"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 2 }}
                                    />
                                    {/* Main Historical Line */}
                                    <motion.path
                                        d="M0,200 C100,220 200,100 300,150 S400,150 400,150"
                                        fill="none"
                                        stroke="#001B3D"
                                        strokeWidth="3"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1.5, ease: "linear" }}
                                    />
                                    {/* Predictive Dotted Extension */}
                                    <motion.path
                                        d="M400,150 L600,100 L800,120"
                                        fill="none"
                                        stroke="#2B5288"
                                        strokeWidth="3"
                                        strokeDasharray="8 8"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.5, duration: 1 }}
                                    />
                                    {/* Event Markers */}
                                    <motion.circle
                                        cx="400" cy="150" r="5" fill="#2B5288"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [0, 1.5, 1] }}
                                        transition={{ delay: 1.5, duration: 0.5 }}
                                    />
                                    <motion.text x="410" y="140" fill="#2B5288" className="text-[10px] font-black font-mono uppercase tracking-widest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>PREDICTION_NODE</motion.text>
                                </svg>

                                <div className="absolute inset-x-0 bottom-0 p-6 bg-navy/90 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-white text-[10px] font-mono font-black uppercase tracking-[0.3em]">LAYER_02 // CAUSAL_FORECAST_ENGINE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: CORE (Deep Dive) */}
            <section id="core" className="py-16 lg:py-24 px-4 border-t border-beige relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 relative">
                        {/* Real Automation Flow Image */}
                        <div className="aspect-square rounded-[40px] bg-white border border-beige shadow-xl flex items-center justify-center relative overflow-hidden group/img">
                            <div className="relative w-full h-full bg-cream/30 overflow-hidden flex items-center justify-center p-6">
                                <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
                                    {/* Logic Gate Visual */}
                                    <rect x="150" y="150" width="100" height="100" rx="12" fill="none" stroke="#A88B71" strokeWidth="2" strokeDasharray="4 4" />
                                    <motion.path
                                        d="M 50 200 L 150 200" stroke="#A88B71" strokeWidth="2" strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <motion.path
                                        d="M 250 200 L 350 200" stroke="#001B3D" strokeWidth="3" strokeLinecap="round"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: [0, 0, 1, 1], opacity: [0, 0, 1, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, times: [0, 0.5, 0.8, 1] }}
                                    />
                                    {/* Verified Signal Pulse */}
                                    <motion.circle
                                        r="6" fill="#A88B71"
                                        animate={{
                                            cx: [50, 150, 250, 350],
                                            opacity: [1, 1, 1, 0],
                                            scale: [1, 1, 1.5, 1]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />
                                    <text x="200" y="140" textAnchor="middle" fill="#A88B71" className="text-[10px] font-black font-mono tracking-widest uppercase">LOGIC_GATE_AC-9</text>
                                </svg>

                                <div className="absolute inset-x-0 bottom-0 p-6 bg-navy/90 backdrop-blur-sm transform translate-y-full group-hover/img:translate-y-0 transition-transform duration-500">
                                    <p className="text-white text-[10px] font-mono font-black uppercase tracking-[0.3em]">LAYER_03 // AUTONOMOUS_ACTION_PROTOCOL</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 space-y-8">
                        <div className="flex items-center gap-3 text-tan font-black uppercase tracking-widest text-xs font-mono">
                            <Zap className="w-4 h-4 text-navy" />
                            Execution Layer
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-navy tracking-tightest leading-none uppercase">
                            Olynk Core
                        </h2>
                        <h3 className="text-xl lg:text-2xl text-steel font-medium leading-tight">
                            Autonomous action, 24/7.
                        </h3>
                        <p className="text-lg text-steel/80 leading-relaxed">
                            Why just see the problem? Core fixes it. Based on Insight's predictions, Core runs independent workflows to reorder stock, adjust ad spend, or flag risks—while you sleep.
                        </p>
                        <ul className="space-y-4 pt-4">
                            {[
                                "Simulates outcomes before acting",
                                "Fully auditable decision logs",
                                "Human-in-the-loop controls"
                            ].map(item => (
                                <li key={item} className="flex items-center gap-3 text-navy font-black text-sm uppercase tracking-wide">
                                    <div className="w-6 h-6 rounded-full bg-cream border border-beige flex items-center justify-center">
                                        <ArrowRight className="w-3 h-3 text-tan" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="pt-6">
                            <Link to="/platform/core" className="inline-flex items-center gap-2 text-tan font-black hover:gap-4 transition-all group uppercase tracking-widest text-xs font-mono">
                                See Olynk Core in Action
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6: ORBIT (Deep Dive) */}
            <section id="orbit" className="py-16 lg:py-24 px-4 border-t border-beige bg-navy relative overflow-hidden text-white">
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 text-cream font-black uppercase tracking-widest text-xs font-mono">
                            <MessageSquare className="w-4 h-4 text-olynk" />
                            Interface Layer
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white tracking-tightest leading-none uppercase">
                            Olynk Orbit
                        </h2>
                        <h3 className="text-xl lg:text-2xl text-white/80 font-medium leading-tight">
                            Just ask.
                        </h3>
                        <p className="text-lg text-white/60 leading-relaxed">
                            Conversational intelligence that understands your business context. Ask questions like "Why did margins drop yesterday?" or "Show cash flow forecast" and get instant, visualized answers.
                        </p>
                        <div className="pt-6">
                            <Link to="/platform/orbit" className="inline-flex items-center gap-2 text-cream font-black hover:gap-4 transition-all group uppercase tracking-widest text-xs font-mono">
                                Talk to Olynk Orbit
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        {/* Real Chat Interface Image */}
                        <div className="aspect-video rounded-[40px] bg-navy border border-white/10 shadow-2xl flex items-center justify-center relative overflow-hidden group/img">
                            <div className="relative w-full h-full bg-navy/20 overflow-hidden flex items-center justify-center p-6">
                                <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
                                    {/* Central Brain Pulse */}
                                    <motion.circle
                                        cx="200" cy="200" r="60" fill="none" stroke="#2B5288" strokeWidth="2" strokeDasharray="4 4"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    />
                                    <motion.circle
                                        cx="200" cy="200" r="20" fill="#2B5288"
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />

                                    {/* Response Nodes */}
                                    {[0, 120, 240].map((angle, i) => {
                                        const rad = (angle * Math.PI) / 180;
                                        const x = 200 + Math.cos(rad) * 100;
                                        const y = 200 + Math.sin(rad) * 100;
                                        return (
                                            <g key={i}>
                                                <motion.line
                                                    x1="200" y1="200" x2={x} y2={y} stroke="#2B5288" strokeWidth="1" strokeDasharray="2 2"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: [0, 0.5, 0] }}
                                                    transition={{ duration: 4, repeat: Infinity, delay: i * 1.3 }}
                                                />
                                                <motion.circle
                                                    cx={x} cy={y} r="4" fill="#A88B71"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                                                    transition={{ duration: 4, repeat: Infinity, delay: i * 1.3 }}
                                                />
                                            </g>
                                        );
                                    })}
                                </svg>

                                <div className="absolute inset-x-0 bottom-0 p-6 bg-white/10 backdrop-blur-md transform translate-y-full group-hover/img:translate-y-0 transition-transform duration-500">
                                    <p className="text-white text-[10px] font-mono font-black uppercase tracking-[0.3em]">LAYER_04 // CROSS_DOMAIN_GOVERNANCE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 7: STACK POSITIONING */}
            <section className="py-16 px-4 bg-cream border-t border-beige">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl lg:text-4xl font-black text-navy tracking-tight">
                        It sits above your tools.
                    </h2>
                    <p className="text-lg text-steel leading-relaxed">
                        OLynk doesn't replace your ERP, CRM, or shop system. It connects them to form a higher-level intelligence layer. No rip-and-replace required.
                    </p>
                    {/* Tech Stack Visual */}
                    <div className="relative max-w-3xl mx-auto">
                        <div className="space-y-4">
                            {/* OLynk Intelligence Layer */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="p-6 rounded-2xl bg-gradient-to-r from-olynk to-navy text-white relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <div className="text-xs font-mono font-black uppercase tracking-widest opacity-80 mb-1">Intelligence Layer</div>
                                        <div className="text-2xl font-black tracking-tight">OLynk AI Platform</div>
                                    </div>
                                    <Brain className="w-10 h-10 opacity-40" />
                                </div>
                            </motion.div>

                            {/* Connection Arrows */}
                            <div className="flex justify-center">
                                <div className="flex flex-col items-center">
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 1, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                            className="w-0.5 h-3 bg-navy/20"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Existing Tools Grid */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                            >
                                {[
                                    { name: 'Shopify', label: 'eCommerce' },
                                    { name: 'NetSuite', label: 'ERP' },
                                    { name: 'Salesforce', label: 'CRM' },
                                    { name: 'Meta Ads', label: 'Marketing' },
                                    { name: 'ShipRocket', label: 'Logistics' },
                                    { name: 'Razorpay', label: 'Payments' }
                                ].map((tool, i) => (
                                    <motion.div
                                        key={tool.name}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                                        className="p-4 rounded-xl bg-white border border-beige hover:border-navy/20 transition-all group/tool"
                                    >
                                        <div className="text-xs font-mono font-black text-tan uppercase tracking-wider mb-1">{tool.label}</div>
                                        <div className="text-sm font-black text-navy group-hover/tool:text-olynk transition-colors">{tool.name}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Side Label */}
                        <div className="absolute -right-4 top-1/2 -translate-y-1/2 rotate-90 origin-center">
                            <span className="text-[10px] font-mono font-black text-steel/30 uppercase tracking-[0.3em]">Integration_Architecture</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 8: FINAL CTA */}
            <section className="py-20 lg:py-24 px-4 border-t border-beige relative overflow-hidden">
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-navy tracking-tightest leading-[0.95] mb-12">
                        Ready to deploy <br />
                        <span className="text-olynk">True Intelligence?</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            to="/how-it-works"
                            className="px-8 py-4 bg-white text-navy border-2 border-beige rounded-xl font-bold hover:border-navy transition-all"
                        >
                            See How It Works
                        </Link>
                        <Link
                            to="/waitlist"
                            className="px-8 py-4 bg-navy text-white rounded-xl font-black uppercase tracking-widest text-xs font-mono hover:bg-olynk transition-all shadow-xl hover:-translate-y-1 flex items-center gap-2 justify-center"
                        >
                            Request Access
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Platform;
