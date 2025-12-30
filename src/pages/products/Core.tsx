import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, GitBranch, Play, Search, Activity, MessageSquare } from 'lucide-react';

const DecisionEngine = ({ isThinking }: { isThinking: boolean }) => (
    <div className="relative w-full h-full bg-white overflow-hidden flex items-center justify-center p-8">
        {/* Technical Blueprint Grid */}
        <div className="absolute inset-0 opacity-[0.15]" style={{
            backgroundImage: 'linear-gradient(#1E293B 1px, transparent 1px), linear-gradient(90deg, #1E293B 1px, transparent 1px)',
            backgroundSize: '20px 20px'
        }} />

        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 px-8">
            {/* Path Guide */}
            <path d="M 50 150 L 350 150" stroke="rgba(30, 41, 59, 0.25)" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M 200 50 L 200 150" stroke="rgba(30, 41, 59, 0.25)" strokeWidth="1" strokeDasharray="4 4" />

            {/* Labels */}
            <text x="50" y="140" className="text-[10px] font-mono font-black fill-navy/40 uppercase tracking-widest">OBSERVE</text>
            <text x="200" y="40" textAnchor="middle" className="text-[10px] font-mono font-black fill-navy/40 uppercase tracking-widest">PROBLEM</text>
            <text x="350" y="140" textAnchor="end" className="text-[10px] font-mono font-black fill-amber-600 uppercase tracking-widest">ACTION</text>

            {/* Flow dots */}
            <motion.circle
                r="6"
                fill="#F59E0B"
                initial={{ cx: 200, cy: -20, opacity: 0 }}
                animate={isThinking ? {
                    cx: [200, 200, 380],
                    cy: [0, 150, 150],
                    opacity: [0, 1, 0],
                    scale: [1, 1.5, 0.5]
                } : { opacity: 0 }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    times: [0, 0.4, 1],
                    ease: "easeInOut"
                }}
            />

            {/* Central Processing Node (Brain) */}
            <motion.g
                initial={{ scale: 1 }}
                animate={isThinking ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <circle cx="200" cy="150" r="45" fill="white" stroke="#F59E0B" strokeWidth="2" className="shadow-sm" />
                <foreignObject x="180" y="130" width="40" height="40">
                    <div className="flex items-center justify-center w-full h-full">
                        <Brain className={`w-8 h-8 text-amber-600 transition-transform ${isThinking ? 'scale-110' : ''}`} />
                    </div>
                </foreignObject>
            </motion.g>

            {/* Checkmark Action (Revealed at the end of flow) */}
            <motion.path
                d="M 330 145 L 340 155 L 360 135"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isThinking ? { pathLength: [0, 0, 1, 0], opacity: [0, 0, 1, 0] } : { opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, times: [0, 0.6, 0.8, 1] }}
            />
        </svg>

        <div className="absolute bottom-4 left-4 font-mono text-[8px] font-black text-navy/40 uppercase tracking-widest">
            STATE: {isThinking ? 'LOGIC_STREAM_ENGAGED' : 'STANDBY'}
        </div>
    </div>
);

const Core = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % 4);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const thinkingSteps = [
        { label: "OBSERVE", text: "Inventory for SKU-991 is below 20 day coverage." },
        { label: "THINK", text: "Q4 surge expected. Supplier lead time is 14 days. Reorder risk is High." },
        { label: "ACT", text: "Drafted PO #4002 for 500 units. Sent to Slack for approval." }
    ];

    const outputActions = ['Slack Notification', 'NetSuite PO', 'Email Vendor'];

    return (
        <div className="min-h-screen bg-transparent">
            {/* Hero Section */}
            <section className="pt-24 lg:pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 opacity-[0.03] select-none pointer-events-none whitespace-nowrap">
                    <span className="text-[120px] lg:text-[200px] font-black font-mono text-navy tracking-tighter uppercase">CORE_LAYER</span>
                </div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy/5 border border-navy/10 text-[11px] font-black font-mono text-navy uppercase tracking-widest mb-8">
                            <Brain className="w-3.5 h-3.5" />
                            Cognitive Layer
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-navy leading-[1.05] tracking-tightest mb-8">
                            Reason, learn, <br /><span className="text-olynk">and automate.</span>
                        </h1>
                        <p className="text-xl text-steel max-w-2xl mx-auto leading-relaxed font-medium mb-12">
                            AI that thinks through problems with human-like reasoning. Olynk Core creates autonomous agents to execute complex workflows.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* AI Reasoning Visual */}
            <section className="py-16 lg:py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="relative">
                        {/* Central Brain Anchor */}
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1 bg-gradient-to-b from-navy/5 to-navy/20 h-20" />

                        <div className="bg-white rounded-[40px] p-6 lg:p-10 text-navy relative overflow-hidden shadow-[0_32px_80px_-16px_rgba(30,41,59,0.1)] border border-beige max-w-5xl mx-auto z-10">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">

                                <div className="space-y-8">
                                    <div className="mx-auto lg:mx-0 w-full aspect-square max-w-[400px] bg-navy/5 rounded-3xl flex items-center justify-center overflow-hidden border border-navy/5 group relative shadow-inner">
                                        <DecisionEngine isThinking={step < 3} />
                                    </div>

                                    <div className="text-center lg:text-left">
                                        <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-navy">Cognitive Execution</h2>
                                        <div className="font-mono text-[10px] text-navy/60 mb-4 bg-navy/5 inline-block px-3 py-1 rounded-full border border-navy/10 uppercase tracking-widest font-black">AGENT_ID: CORE_V1_ALPHA</div>
                                        <p className="text-steel font-medium leading-relaxed max-w-md">Our autonomous logic engine maps complex business dependencies and executes multi-step plans in milliseconds.</p>
                                    </div>
                                </div>

                                {/* Synchronized Terminal - Light Theme */}
                                <div className="bg-navy/[0.02] rounded-[32px] p-8 border border-navy/5 h-full min-h-[400px] flex flex-col relative overflow-hidden">
                                    <div className="flex items-center justify-between mb-8 border-b border-navy/10 pb-6">
                                        <div>
                                            <h3 className="text-sm font-black text-navy uppercase tracking-widest flex items-center gap-2">
                                                <Activity className="w-4 h-4 text-amber-500" />
                                                Logic Output
                                            </h3>
                                            <p className="text-[10px] text-navy/60 font-mono mt-1 font-bold uppercase tracking-widest">REASONING_STREAM_V1</p>
                                        </div>
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-navy/10" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-navy/10" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-olynk/40" />
                                        </div>
                                    </div>

                                    <div className="space-y-4 font-mono text-[11px] flex-1">
                                        <AnimatePresence>
                                            {thinkingSteps.slice(0, step + 1).map((item, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="flex gap-4 items-start bg-white p-4 rounded-xl border border-beige shadow-sm"
                                                >
                                                    <div className={`text-[10px] font-black px-2 py-0.5 rounded min-w-[70px] text-center ${item.label === 'ACT' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                                                        {item.label}
                                                    </div>
                                                    <p className="text-[12px] font-bold text-navy/70 leading-snug">
                                                        {item.text}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                        {step < 3 && (
                                            <div className="pl-[86px]">
                                                <motion.div
                                                    animate={{ opacity: [0, 1, 0] }}
                                                    transition={{ duration: 0.8, repeat: Infinity }}
                                                    className="h-4 w-2 bg-olynk"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="absolute bottom-6 left-8 text-navy/60 flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-widest">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                        Thinking...
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Output Actions Pulse */}
                        <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
                            {outputActions.map((action, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={step === 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="flex flex-col items-center gap-4"
                                >
                                    <div className="h-12 w-px bg-gradient-to-b from-navy/20 to-transparent" />
                                    <div className="bg-white border border-beige px-6 py-3 rounded-2xl text-[11px] font-black text-navy shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-3 uppercase tracking-tighter">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        {action}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Functional Showcase */}
            <section className="py-16 lg:py-20 bg-cream border-t border-beige relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Sparkles,
                                title: "Self-Healing Ops",
                                desc: "Automated intervention when KPIs drift.",
                                animation: (
                                    <div className="h-44 bg-white border border-beige rounded-3xl relative overflow-hidden flex flex-col items-center justify-center p-6 shadow-sm">
                                        <div className="flex gap-1.5 mb-6">
                                            {[...Array(8)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className={`w-2.5 h-8 rounded-full ${i === 4 ? 'bg-red-500' : 'bg-navy/10'}`}
                                                    animate={i === 4 ? { opacity: [1, 0.4, 1], height: [32, 20, 32] } : {}}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                />
                                            ))}
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                                            className="bg-navy text-white text-[9px] font-mono font-black px-4 py-1.5 rounded-full flex items-center gap-2 uppercase tracking-widest shadow-lg"
                                        >
                                            <Play className="w-2 h-2 fill-emerald-500 text-emerald-500" />
                                            ACTION: PAUSE_CAMPAIGN
                                        </motion.div>
                                    </div>
                                )
                            },
                            {
                                icon: GitBranch,
                                title: "Adaptive Workflows",
                                desc: "Logic that evolves with your business.",
                                animation: (
                                    <div className="h-44 bg-white border border-beige rounded-3xl relative overflow-hidden flex items-center justify-center shadow-sm">
                                        <svg viewBox="0 0 100 60" className="w-full h-full p-6">
                                            <motion.path
                                                d="M 10 30 L 30 30 L 50 10 L 70 10 L 90 30"
                                                fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="2"
                                            />
                                            <motion.path
                                                d="M 30 30 L 50 50 L 70 50 L 90 30"
                                                fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="2"
                                            />
                                            <motion.circle
                                                r="4" fill="#F59E0B"
                                                animate={{
                                                    offsetDistance: ["0%", "100%"],
                                                }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                style={{ offsetPath: "path('M 10 30 L 30 30 L 50 50 L 70 50 L 90 30')" }}
                                            />
                                            <text x="50" y="5" className="text-[6px] font-mono fill-navy/60 font-bold uppercase tracking-widest">OPTIMIZING_PATH...</text>
                                        </svg>
                                    </div>
                                )
                            },
                            {
                                icon: MessageSquare,
                                title: "Conversational BI",
                                desc: "Natural language to complex execution.",
                                animation: (
                                    <div className="h-44 bg-white border border-beige rounded-3xl relative overflow-hidden flex flex-col items-center justify-center p-6 shadow-sm">
                                        <div className="w-full bg-navy/5 border border-navy/5 rounded-xl p-3 flex items-center gap-3 mb-6">
                                            <Search className="w-4 h-4 text-navy/40" />
                                            <motion.div className="text-[11px] text-navy font-bold">
                                                <motion.span
                                                    animate={{ opacity: [0, 1] }}
                                                    transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
                                                >
                                                    "What is my CAC..."
                                                </motion.span>
                                            </motion.div>
                                        </div>
                                        <div className="flex gap-3">
                                            {[...Array(3)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.5 + i * 0.2, repeat: Infinity, repeatDelay: 2 }}
                                                    className="w-12 h-8 bg-olynk/10 border border-olynk/20 rounded-lg flex items-center justify-center"
                                                >
                                                    <div className="w-5 h-1 bg-olynk/30 rounded-full" />
                                                </motion.div>
                                            ))}
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
                                            <feature.icon className="w-6 h-6 text-amber-600" />
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


export default Core;
