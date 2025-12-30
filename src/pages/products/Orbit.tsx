import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Lock, FileCheck, Globe, Server, ShieldCheck, UserCheck, Search, Activity } from 'lucide-react';

const GovernanceOrbit = () => (
    <div className="relative w-full h-full bg-white overflow-hidden flex items-center justify-center p-8">
        {/* Technical Blueprint Grid */}
        <div className="absolute inset-0 opacity-[0.15]" style={{
            backgroundImage: 'linear-gradient(#1E293B 1px, transparent 1px), linear-gradient(90deg, #1E293B 1px, transparent 1px)',
            backgroundSize: '20px 20px'
        }} />

        <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 px-8">
            {/* Security Radar Circles */}
            {[0.4, 0.7, 1.0].map((scale, i) => (
                <motion.circle
                    key={i}
                    cx="200" cy="200" r={150 * scale}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="1"
                    strokeOpacity="0.1"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: [0, 0.2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 1.3 }}
                />
            ))}

            {/* Central Secure Node */}
            <circle cx="200" cy="200" r="55" className="fill-white stroke-emerald-500" strokeWidth="2" />
            <foreignObject x="175" y="175" width="50" height="50">
                <div className="flex items-center justify-center w-full h-full">
                    <ShieldCheck className="w-10 h-10 text-emerald-500" />
                </div>
            </foreignObject>

            {/* Incoming "Threats" being deflected */}
            {[0, 45, 135, 225, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const dist = 180;
                return (
                    <motion.circle
                        key={angle}
                        r="3.5"
                        fill="#2563EB"
                        initial={{
                            cx: 200 + dist * Math.cos(rad),
                            cy: 200 + dist * Math.sin(rad),
                            opacity: 0
                        }}
                        animate={{
                            cx: 200 + 80 * Math.cos(rad),
                            cy: 200 + 80 * Math.sin(rad),
                            opacity: [0, 1, 0],
                            scale: [1, 1, 2]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "easeIn"
                        }}
                    />
                );
            })}

            {/* Protective Ring Ping */}
            <motion.circle
                cx="200" cy="200" r="75"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeOpacity="0.2"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.3, 0.1], strokeWidth: [3, 5, 3] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </svg>

        <div className="absolute bottom-4 left-4 font-mono text-[8px] font-black text-navy/40 uppercase tracking-widest">
            ENCRYPTION: AES_256_ACTIVE
        </div>
    </div>
);

const Orbit = () => {
    const [logs, setLogs] = useState([
        { time: "10:42:01", event: "User_Login: admin@olynk.ai", status: "SUCCESS" },
        { time: "10:41:55", event: "Policy_Check: PO_Approval > $10k", status: "ENFORCED" },
        { time: "10:40:22", event: "Data_Access: Inventory_Table", status: "LOGGED" },
        { time: "10:38:15", event: "Model_Inference: Stockout_Pred", status: "COMPLETE" }
    ]);

    useEffect(() => {
        const events = [
            "SQL_Query: Customer_Lifetime_Value",
            "Access_Granted: Partner_Node_B",
            "Model_Update: Logistic_Regression_v4",
            "Threat_Detected: IP_Shadow_Deflected",
            "Policy_Enforced: Personal_Data_Masking"
        ];

        const interval = setInterval(() => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
            const newLog = {
                time: timeStr,
                event: events[Math.floor(Math.random() * events.length)],
                status: Math.random() > 0.8 ? "WARNING" : "SUCCESS"
            };
            setLogs(prev => [newLog, ...prev.slice(0, 5)]);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-transparent">
            {/* Hero Section */}
            <section className="pt-24 lg:pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center">
                <div className="absolute top-20 right-1/2 translate-x-1/2 opacity-[0.03] select-none pointer-events-none whitespace-nowrap">
                    <span className="text-[120px] lg:text-[200px] font-black font-mono text-navy tracking-tighter uppercase">ORBIT_LAYER</span>
                </div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy/5 border border-navy/10 text-[11px] font-black font-mono text-navy uppercase tracking-widest mb-8">
                            <Eye className="w-3.5 h-3.5" />
                            Governance Layer
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-navy leading-[1.05] tracking-tightest mb-8">
                            Deploy, secure, <br /><span className="text-olynk">and monitor.</span>
                        </h1>
                        <p className="text-xl text-steel max-w-2xl mx-auto leading-relaxed font-medium mb-12">
                            Enterprise-grade control for your AI workforce. Monitor every decision, enforce compliance policies, and manage access with military-grade security.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Security Dashboard Visual - LIGHT BLUEPRINT */}
            <section className="py-16 lg:py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-[40px] p-6 lg:p-10 relative overflow-hidden shadow-[0_32px_80px_-16px_rgba(30,41,59,0.1)] border border-beige">
                        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">

                            {/* Left: Security Status */}
                            <div className="space-y-10">
                                <div className="flex items-center gap-8">
                                    <div className="w-56 h-56 rounded-3xl bg-navy/5 flex items-center justify-center border border-navy/5 overflow-hidden relative shadow-inner">
                                        <GovernanceOrbit />
                                    </div>
                                    <div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
                                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active_Guard</span>
                                        </div>
                                        <h2 className="text-4xl font-black text-navy uppercase tracking-tight">System Secure</h2>
                                        <p className="text-navy/60 font-mono text-[11px] font-black uppercase tracking-widest mt-2">Uptime: 99.9999%</p>
                                    </div>
                                </div>

                                <div className="space-y-4 max-w-md">
                                    {[
                                        { icon: Lock, label: "SOC 2 Type II Compliant", status: "VERIFIED" },
                                        { icon: Server, label: "Data Residency: US-East-1", status: "LOCKED" },
                                        { icon: FileCheck, label: "Audit Logs Immutability", status: "ENABLED" }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white border border-beige p-5 rounded-2xl flex items-center justify-between group transition-all hover:scale-[1.02] hover:shadow-md">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center">
                                                    <item.icon className="w-4 h-4 text-olynk" />
                                                </div>
                                                <span className="text-navy font-black text-sm tracking-tight">{item.label}</span>
                                            </div>
                                            <span className="text-[10px] font-black text-emerald-600 font-mono bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">
                                                {item.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Live Audit Feed - Light Blueprint */}
                            <div className="bg-navy/5 rounded-[32px] p-8 border border-navy/5 h-full min-h-[480px] flex flex-col relative overflow-hidden shadow-inner">
                                <div className="flex items-center justify-between mb-8 border-b border-navy/10 pb-6">
                                    <div>
                                        <h3 className="text-sm font-black text-navy uppercase tracking-widest flex items-center gap-2">
                                            <Activity className="w-4 h-4 text-emerald-600" />
                                            Live Audit Trail
                                        </h3>
                                        <p className="text-[10px] text-navy/60 font-mono mt-1 font-bold uppercase tracking-widest">REAL_TIME_STREAM_V2.0</p>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-navy/10" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-navy/10" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                                    </div>
                                </div>

                                <div className="space-y-4 font-mono text-[11px] flex-1">
                                    <AnimatePresence initial={false}>
                                        {logs.map((log, i) => (
                                            <motion.div
                                                key={`${log.time}-${log.event}`}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                className={`flex gap-4 p-4 rounded-xl border transition-all ${i === 0 ? 'bg-white border-beige text-navy shadow-sm' : 'bg-transparent border-navy/5 text-navy/40'}`}
                                            >
                                                <span className="opacity-40 font-black">{log.time}</span>
                                                <span className="flex-1 font-black uppercase tracking-tight">{log.event}</span>
                                                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${log.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                                                    {log.status}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                <div className="absolute bottom-8 left-8 text-emerald-600 group flex items-center gap-3 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                    <span className="text-[10px] font-black font-mono tracking-widest uppercase">Monitoring_Global_Node_Inference</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Showcase Grid */}
            <section className="py-16 lg:py-20 bg-cream border-t border-beige relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Globe,
                                title: "Global Compliance",
                                desc: "GDPR, CCPA, and SOC 2 ready out of the box.",
                                animation: (
                                    <div className="h-44 bg-white border border-beige rounded-3xl relative overflow-hidden flex flex-col items-center justify-center shadow-sm">
                                        <div className="relative">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                                className="w-20 h-20 border-2 border-dashed border-emerald-500/20 rounded-full flex items-center justify-center"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <ShieldCheck className="w-10 h-10 text-emerald-500" />
                                            </div>
                                        </div>
                                        <div className="mt-4 flex gap-2">
                                            {["GDPR", "SOC2", "CCPA"].map(tag => (
                                                <span key={tag} className="text-[8px] font-black px-2 py-0.5 bg-navy/5 rounded text-navy/40 uppercase tracking-widest">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                )
                            },
                            {
                                icon: Lock,
                                title: "Role-Based Access",
                                desc: "Granular permissions for Every team member.",
                                animation: (
                                    <div className="h-44 bg-white border border-beige rounded-3xl relative overflow-hidden flex items-center justify-center shadow-sm">
                                        <div className="grid grid-cols-3 gap-2.5 p-6">
                                            {[...Array(9)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className={`w-7 h-7 rounded-lg ${[1, 3, 7].includes(i) ? 'bg-emerald-500/20 border border-emerald-500/20' : 'bg-navy/5'}`}
                                                    animate={[1, 3, 7].includes(i) ? { opacity: [1, 0.4, 1] } : {}}
                                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                                                />
                                            ))}
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <UserCheck className="w-5 h-5 text-emerald-600" />
                                        </div>
                                    </div>
                                )
                            },
                            {
                                icon: Eye,
                                title: "Full Observability",
                                desc: "Every action is traced, logged, and explainable.",
                                animation: (
                                    <div className="h-44 bg-white border border-beige rounded-3xl relative overflow-hidden flex flex-col items-center justify-center shadow-sm">
                                        <div className="w-[85%] h-24 bg-navy/5 border border-navy/5 rounded-2xl p-4 flex flex-col gap-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-1.5">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]" />
                                                    <div className="w-10 h-2 rounded-full bg-navy/10" />
                                                </div>
                                                <Search className="w-4 h-4 text-navy/40" />
                                            </div>
                                            <div className="flex flex-col gap-2.5">
                                                {[...Array(3)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "100%" }}
                                                        transition={{ duration: 1.5, delay: i * 0.4, repeat: Infinity, repeatDelay: 2 }}
                                                        className="h-2 bg-navy/10 rounded-full overflow-hidden"
                                                    >
                                                        <div className="h-full bg-olynk/20 w-1/3" />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-[9px] font-mono mt-3 text-navy/60 font-black uppercase tracking-widest">TRACE_ID: 9X992-B</span>
                                    </div>
                                )
                            }
                        ].map((feature, i) => (
                            <div key={i} className="space-y-6 group">
                                {feature.animation}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white border border-beige flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                            <feature.icon className="w-6 h-6 text-emerald-600" />
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

export default Orbit;
