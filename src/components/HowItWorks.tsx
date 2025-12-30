import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Brain, Zap, ArrowRight, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

const PROTOCOLS = [
    {
        id: "LINK",
        label: "Unified feed",
        title: "Connect your apps in 15 minutes.",
        description: "Plug into Shopify, your ERP, and ad platforms effortlessly. We see everything without changing your existing tools.",
        icon: Database,
        status: "READY",
        statusLight: "bg-emerald-500",
        systemText: "System_Status: Optimal"
    },
    {
        id: "THINK",
        label: "Live mapping",
        title: "Build a live map of your business.",
        description: "We connect the dots between your sales and operations to spot risks and opportunities before they happen.",
        icon: Brain,
        status: "ACTIVE",
        statusLight: "bg-blue-500",
        systemText: "Automated_Check_Passed"
    },
    {
        id: "ACT",
        label: "Instant action",
        title: "Approve decisions in one click.",
        description: "Wake up to ready-to-execute actions. Approve a restock or pause a campaign—we handle the paperwork and execution.",
        icon: Zap,
        status: "WAITING",
        statusLight: "bg-tan",
        systemText: "Automated_Check_Passed"
    }
];

const HowItWorks = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const pathLength = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

    return (
        <section ref={containerRef} className="relative group py-24 lg:py-40 bg-transparent overflow-hidden border-t border-beige">
            {/* 1. Technical Background Layer */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Dynamic Blur Blobs */}
                <motion.div
                    animate={{ x: [0, 150, 0], y: [0, -70, 0], scale: [1, 1.3, 1] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[5%] left-[5%] w-[60%] h-[60%] bg-olynk/5 rounded-full blur-[140px]"
                />
                <motion.div
                    animate={{ x: [0, -120, 0], y: [0, 90, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[0%] right-[0%] w-[50%] h-[50%] bg-navy/5 rounded-full blur-[120px]"
                />

                {/* Technical Grid Overlay */}
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #223148 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* 2. Grain Texture */}
            <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="mb-24 flex flex-col items-center text-center">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-[1px] bg-olynk/40 font-mono" />
                        <span className="text-[10px] font-black text-olynk uppercase tracking-[0.5em] font-mono">Platform Architecture</span>
                        <div className="w-12 h-[1px] bg-olynk/40 font-mono" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy mb-6 tracking-tightest leading-[0.95] max-w-4xl">
                        From chaos to <br />
                        <span className="text-olynk italic font-serif font-normal text-4xl sm:text-5xl lg:text-6xl">autonomous order.</span>
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-steel font-medium leading-relaxed max-w-2xl px-2 sm:px-0">
                        Olynk is an intelligent operating layer that sits above your apps. We <span className="text-navy font-bold underline decoration-beige decoration-4 underline-offset-4">link</span> your data, <span className="text-navy font-bold underline decoration-beige decoration-4 underline-offset-4">think</span> through your problems, and <span className="text-navy font-bold underline decoration-beige decoration-4 underline-offset-4">execute</span> the fixes.
                    </p>
                </div>

                {/* The Architecture Flow */}
                <div className="relative pt-12">

                    {/* Animated Connection Path (Desktop) */}
                    <div className="hidden lg:block absolute top-[120px] left-0 right-0 h-[1px] bg-beige/60 overflow-hidden">
                        <motion.div
                            className="h-full bg-olynk origin-left shadow-[0_0_15px_rgba(34,49,72,0.3)]"
                            style={{ scaleX: pathLength }}
                        />
                    </div>

                    {/* Nodes Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 relative">
                        {PROTOCOLS.map((protocol, idx) => (
                            <motion.div
                                key={protocol.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, delay: idx * 0.2, ease: [0.21, 1.11, 0.81, 0.99] }}
                                className="relative lg:pt-32 flex flex-col h-full"
                            >
                                {/* Node Visual */}
                                <div className="absolute top-0 left-0 hidden lg:flex items-center justify-center w-24 h-24">
                                    <div className="absolute inset-0 bg-white border border-beige rounded-full shadow-sm" />
                                    {/* Pulse Effect */}
                                    <div className={`absolute inset-0 ${protocol.statusLight} opacity-5 rounded-full animate-ping`} />
                                    <protocol.icon className="w-10 h-10 text-navy relative z-10" />

                                    {/* Vertical Connector to Phase Label */}
                                    <div className="absolute top-full left-1/2 w-[1px] h-8 bg-beige" />
                                </div>

                                {/* Content Card */}
                                <div className="bg-white/40 backdrop-blur-xl border border-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 shadow-sm hover:shadow-2xl hover:border-olynk/10 transition-all duration-700 group/card relative overflow-hidden flex flex-col flex-1 h-full">
                                    {/* Card ID Mask */}
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/card:opacity-10 transition-opacity">
                                        <span className="text-6xl font-black font-mono tracking-tighter">{protocol.id}</span>
                                    </div>

                                    {/* Mobile Icon */}
                                    <div className="lg:hidden w-16 h-16 rounded-2xl bg-cream flex items-center justify-center mb-8">
                                        <protocol.icon className="w-8 h-8 text-navy" />
                                    </div>

                                    <div className="space-y-8 relative z-10 flex flex-col flex-1">
                                        {/* Header Row */}
                                        <div className="flex items-center justify-between border-b border-beige/40 pb-6">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-olynk uppercase tracking-[0.4em] font-mono mb-2">{protocol.id}</span>
                                                <span className="text-lg font-black text-navy tracking-tight">{protocol.label}</span>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${protocol.statusLight} animate-pulse`} />
                                                    <span className="text-[9px] font-black text-navy tracking-widest">{protocol.status}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Main Copy */}
                                        <div className="space-y-4 flex-1">
                                            <h3 className="text-2xl lg:text-3xl font-black text-navy leading-tight tracking-tightest">
                                                {protocol.title}
                                            </h3>
                                            <p className="text-base lg:text-lg text-steel font-medium leading-relaxed">
                                                {protocol.description}
                                            </p>
                                        </div>

                                        {/* Technical Metadata Reveal */}
                                        <div className="pt-6 border-t border-beige/40 flex items-center justify-between mt-auto">
                                            <div className="flex items-center gap-3">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                <span className="text-[10px] font-bold text-tan-dark uppercase tracking-widest font-mono">{protocol.systemText}</span>
                                            </div>
                                            <span className="text-[10px] font-black text-navy/20 uppercase tracking-[0.2em] font-mono">0{idx + 1}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom Specification Pods */}
                <div className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {/* Time Pod */}
                    <div className="flex items-center gap-10 p-10 bg-navy rounded-[40px] text-white shadow-2xl relative overflow-hidden group/pod">
                        <div className="flex flex-col">
                            <span className="text-5xl sm:text-7xl font-black tracking-tightest leading-none mb-2">15:00</span>
                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] font-mono">Minutes_to_deploy</span>
                        </div>
                        <div className="h-20 w-[1px] bg-white/20" />
                        <div className="max-w-[180px]">
                            <p className="text-base font-bold leading-tight opacity-70 group-hover/pod:opacity-100 transition-opacity">
                                Zero-friction setup. Start linking your datasets instantly.
                            </p>
                        </div>
                        {/* Decorative Background Icon */}
                        <Clock className="absolute -right-8 -bottom-8 w-40 h-40 opacity-[0.03] group-hover/pod:scale-110 transition-transform duration-700" />
                    </div>

                    {/* Security Pod */}
                    <div className="flex items-center gap-10 p-10 bg-white border border-beige rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 group/pod relative overflow-hidden">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                            <h4 className="text-lg sm:text-xl font-black text-navy tracking-tight">Enterprise-grade security.</h4>
                            <p className="text-sm sm:text-base text-steel font-medium">
                                Your data is protected by bank-level encryption. <span className="text-navy font-bold">SOC 2 Type II Certified.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Explorer Call-to-Action */}
            <div className="mt-24 flex justify-center">
                <button className="group px-12 py-6 bg-transparent border-2 border-beige hover:border-navy rounded-2xl transition-all duration-500 flex items-center gap-6 active:scale-95 shadow-sm">
                    <div className="flex flex-col items-start">
                        <span className="text-[10px] font-black text-tan uppercase tracking-[0.3em] font-mono mb-1">Scroll_to_explore</span>
                        <span className="text-lg font-black text-navy tracking-tightest">View Platform Stack</span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-navy group-hover:translate-x-3 transition-transform duration-500" />
                </button>
            </div>
            {/* Background Subtle Labels - Tone-on-Tone Reveal */}
            <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 select-none pointer-events-none">
                <span className="text-[120px] font-black font-mono text-beige leading-none tracking-tightest uppercase">AUTONOMOUS_LOGIC_ACTIVE</span>
            </div>

            {/* Background Narrative Strip */}
            <div className="absolute bottom-0 left-0 w-full p-10 opacity-[0.02] select-none pointer-events-none border-t border-navy/10 flex justify-between items-center whitespace-nowrap overflow-hidden">
                <span className="text-[14px] font-black text-navy font-mono tracking-[1em] uppercase">
                    LINK_PROCESSOR_v4.2 // THINK_ENGINE_ENABLED // ACT_PROTOCOL_ACTIVE // READY_FOR_DEPLOYMENT
                </span>
            </div>
        </section>
    );
};

export default HowItWorks;
