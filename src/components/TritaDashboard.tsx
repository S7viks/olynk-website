import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity,
    ArrowUpRight,
    CheckCircle2,
    Gauge,
    IndianRupee,
    Layers,
    Radio,
    Share2,
    TrendingDown,
    Zap,
} from 'lucide-react';

type IndustryKey = 'd2c' | 'manufacturing';

type DecisionStatus = 'open' | 'accepted' | 'rejected' | 'snoozed';

interface DecisionItem {
    id: string;
    band: string;
    title: string;
    exposure: string;
    detail: string;
    supplier: string;
}

const INDUSTRY_PRESETS: Record<
    IndustryKey,
    {
        label: string;
        sub: string;
        revenueAtRiskCr: number;
        workingCapPct: number;
        serviceLevelPct: number;
        openDecisions: number;
        baseRtoPct: number;
        ndrCarrier: string;
        ndrScore: number;
        recoveryLakh90: number;
    }
> = {
    d2c: {
        label: 'D2C / commerce',
        sub: 'Pilot dataset · multi-market fulfilment',
        revenueAtRiskCr: 42,
        workingCapPct: -8.2,
        serviceLevelPct: 97.2,
        openDecisions: 14,
        baseRtoPct: 14.2,
        ndrCarrier: 'Delhivery',
        ndrScore: 62,
        recoveryLakh90: 238,
    },
    manufacturing: {
        label: 'Manufacturing',
        sub: 'Pilot dataset · BOM + network',
        revenueAtRiskCr: 31,
        workingCapPct: -5.4,
        serviceLevelPct: 95.6,
        openDecisions: 11,
        baseRtoPct: 4.1,
        ndrCarrier: 'Blue Dart',
        ndrScore: 71,
        recoveryLakh90: 185,
    }
};

function formatCr(n: number): string {
    return `₹${n.toFixed(1)}Cr`;
}

const TritaDashboard = () => {
    const [industry, setIndustry] = useState<IndustryKey>('d2c');
    const [riskAppetite, setRiskAppetite] = useState(52);
    const [budgetCeiling, setBudgetCeiling] = useState(68);
    const [velocityPriority, setVelocityPriority] = useState(74);
    const [decisions, setDecisions] = useState<Record<string, DecisionStatus>>({});
    const [activeLogIndex, setActiveLogIndex] = useState(0);
    const [shareHint, setShareHint] = useState<string | null>(null);
    const [isSimulating, setIsSimulating] = useState(false);

    // Trigger simulation effect when knobs change
    useEffect(() => {
        setIsSimulating(true);
        const timer = setTimeout(() => setIsSimulating(false), 800);
        return () => clearTimeout(timer);
    }, [riskAppetite, budgetCeiling, velocityPriority]);

    const reasoningLogs = useMemo(() => [
        "Analyzing NCR cluster SKU-047 velocity...",
        "Cross-referencing Delhivery NDR with Tally AP...",
        "Simulating inventory buffer for West DC...",
        "Verifying Razorpay payout integrity...",
        "Optimizing RM-AL-12 lead time vectors...",
        "Scanning Maharashtra factory OEE delta...",
        "Recalculating capital waterfall policy..."
    ], []);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveLogIndex(prev => (prev + 1) % reasoningLogs.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [reasoningLogs.length]);

    const preset = INDUSTRY_PRESETS[industry];

    const kpis = useMemo(() => {
        const riskAdj = (riskAppetite - 50) / 200;
        const budgetAdj = (budgetCeiling - 50) / 250;
        const velAdj = (velocityPriority - 50) / 200;

        const revenueRisk = Math.max(8, preset.revenueAtRiskCr * (1 - riskAdj * 0.35 - budgetAdj * 0.12));
        const workingCap = preset.workingCapPct + riskAdj * 2.2 + budgetAdj * 1.4;
        const serviceLevel = Math.min(99.5, Math.max(88, preset.serviceLevelPct + velAdj * 1.8 + riskAdj * 0.4));
        const openCount = Math.max(3, Math.round(preset.openDecisions - velAdj * 4 + riskAdj * 2));

        const rto = Math.max(4, preset.baseRtoPct - velAdj * 1.2 + (1 - riskAppetite / 100) * 1.5);
        const recovery =
            preset.recoveryLakh90 +
            Math.round((riskAppetite / 100) * 42) +
            Math.round((budgetCeiling / 100) * 28) +
            Math.round((velocityPriority / 100) * 36) +
            Object.values(decisions).filter((s) => s === 'accepted').length * 18 -
            Object.values(decisions).filter((s) => s === 'rejected').length * 6 +
            Object.values(decisions).filter((s) => s === 'snoozed').length * 6;

        return {
            revenueAtRiskCr: revenueRisk,
            workingCapPct: workingCap,
            serviceLevelPct: serviceLevel,
            openDecisions: openCount,
            rtoPct: rto,
            recoveryLakh90: Math.max(96, recovery),
        };
    }, [preset, riskAppetite, budgetCeiling, velocityPriority, decisions]);

    const decisionDeck: DecisionItem[] = useMemo(
        () =>
            industry === 'd2c'
                ? [
                      {
                          id: 'd1',
                          band: 'Urgent',
                          title: 'Reorder SKU-047 · Oat Milk 1L',
                          exposure: '₹2.3L exposure · 11 days of cover',
                          detail: 'Demand spike on Meta + creator push; safety stock breached in NCR.',
                          supplier: 'Pristine Organics · Lead 8d',
                      },
                      {
                          id: 'd2',
                          band: 'High',
                          title: 'Pause dispatch · 23 COD orders',
                          exposure: 'Predicted RTO 78%+ · ₹4.1L recoverable',
                          detail: 'Repeat NDR pin codes + velocity mismatch on prepaid incentives.',
                          supplier: 'Carrier: Delhivery · NDR queue',
                      },
                      {
                          id: 'd3',
                          band: 'Standard',
                          title: 'Working capital release · AP pool',
                          exposure: '−6.2 days DPO opportunity · ₹1.1Cr',
                          detail: 'Three vendors inside policy for early settlement discount.',
                          supplier: 'Tally + Razorpay payouts',
                      },
                  ]
                : [
                        {
                            id: 'm1',
                            band: 'Urgent',
                            title: 'Expedite RM-AL-12 · alloy feed',
                            exposure: 'Plant risk in 6 MRP runs · ₹6.8L',
                            detail: 'Supplier SL slip; alternate source 4% premium within budget guardrail.',
                            supplier: 'JM alloys · PO draft ready',
                        },
                        {
                            id: 'm2',
                            band: 'High',
                            title: 'Rebalance DC-West · slow movers',
                            exposure: 'Working capital drag · ₹38L',
                            detail: 'Freight-optimal transfer to South DC improves turns 0.4x.',
                            supplier: 'Unicommerce allocation',
                        },
                        {
                            id: 'm3',
                            band: 'Standard',
                            title: 'Approve cap-ex maintenance window',
                            exposure: 'SLA buffer 2.1% · night shift only',
                            detail: 'Finance threshold met; customer commitment window tight.',
                            supplier: 'MES + CMMS',
                        },
                    ],
        [industry]
    );

    useEffect(() => {
        setDecisions({});
    }, [industry]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const ind = params.get('ind') as IndustryKey | null;
        if (ind && INDUSTRY_PRESETS[ind]) setIndustry(ind);
        const r = params.get('risk');
        const b = params.get('budget');
        const v = params.get('velocity');
        if (r) setRiskAppetite(Math.min(100, Math.max(0, Number(r))));
        if (b) setBudgetCeiling(Math.min(100, Math.max(0, Number(b))));
        if (v) setVelocityPriority(Math.min(100, Math.max(0, Number(v))));
    }, []);

    const setDecision = useCallback((id: string, status: DecisionStatus) => {
        setDecisions((prev) => ({ ...prev, [id]: status }));
    }, []);

    const buildShareUrl = useCallback(() => {
        const params = new URLSearchParams({
            ind: industry,
            risk: String(riskAppetite),
            budget: String(budgetCeiling),
            velocity: String(velocityPriority),
        });
        return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    }, [industry, riskAppetite, budgetCeiling, velocityPriority]);

    const copyShare = useCallback(async () => {
        const url = buildShareUrl();
        try {
            await navigator.clipboard.writeText(url);
            setShareHint('Link copied - paste on LinkedIn or WhatsApp');
        } catch {
            setShareHint('Copy blocked - select the URL from the bar');
        }
        setTimeout(() => setShareHint(null), 4200);
    }, [buildShareUrl]);

    const flaggedRto = Math.max(12, Math.round(18 + (100 - velocityPriority) / 8));

    return (
        <motion.div
            className="w-full max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="relative bg-white border border-beige shadow-[0_40px_80px_-20px_rgba(0,27,61,0.15)] rounded-[32px] overflow-hidden flex flex-col h-auto lg:h-[800px]">
                {/* OS Top Bar */}
                <div className="flex items-center justify-between px-6 h-14 border-b border-beige bg-cream/30 backdrop-blur-sm relative z-20 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
                        <motion.div
                            animate={{ x: [0, 100, 0], opacity: [0.1, 0.2, 0.1] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent"
                        />
                    </div>
                    
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className={`${isSimulating ? 'animate-ping' : ''} absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75`}></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] font-black text-navy/50 uppercase tracking-[0.25em] font-mono">
                                TRITA_OS // {isSimulating ? 'SIMULATING_VECTORS' : 'SYSTEM_READY'}
                            </span>
                        </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-6 relative z-10">
                        <div className="flex items-center gap-2 text-[10px] font-black text-navy uppercase tracking-widest bg-white border border-beige px-3 py-1.5 rounded-full shadow-sm">
                            <Radio className={`w-3 h-3 ${isSimulating ? 'text-olynk animate-pulse' : 'text-emerald-500'}`} />
                            Live Operational Matrix
                        </div>
                    </div>

                    <div className="flex items-center gap-3 relative z-10">
                        <div className="text-[10px] font-bold text-steel font-mono bg-cream/50 px-2 py-1 rounded">
                            UPTIME: 99.98%
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                    {/* Left Sidebar: Controls & Operational Risk */}
                    <aside className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-beige bg-cream/10 p-6 flex flex-col gap-6 overflow-y-auto relative">
                        {/* Industry Selection */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-black text-tan uppercase tracking-widest">Vertical Context</p>
                                <Activity className={`w-3 h-3 text-tan/40 ${isSimulating ? 'animate-spin' : ''}`} />
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                                {(Object.keys(INDUSTRY_PRESETS) as IndustryKey[]).map((key) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setIndustry(key)}
                                        className={`text-left px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider border transition-all ${
                                            industry === key
                                                ? 'bg-navy text-white border-navy shadow-lg shadow-navy/10'
                                                : 'bg-white text-navy/60 border-beige hover:border-tan'
                                        }`}
                                    >
                                        {INDUSTRY_PRESETS[key].label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* What-if Knobs */}
                        <div className="space-y-6 pt-6 border-t border-beige">
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-black text-tan uppercase tracking-widest">Policy Knobs</p>
                                <Gauge className={`w-4 h-4 text-tan/50 ${isSimulating ? 'animate-bounce' : ''}`} />
                            </div>
                            {[
                                { label: 'Risk appetite', val: riskAppetite, set: setRiskAppetite },
                                { label: 'Budget ceiling', val: budgetCeiling, set: setBudgetCeiling },
                                { label: 'Velocity priority', val: velocityPriority, set: setVelocityPriority },
                            ].map((s) => (
                                <label key={s.label} className="block space-y-3">
                                    <div className="flex justify-between text-[10px] font-black text-navy/70 uppercase tracking-wider">
                                        <span>{s.label}</span>
                                        <motion.span
                                            animate={isSimulating ? { opacity: [1, 0.4, 1] } : {}}
                                            className="font-mono text-olynk"
                                        >
                                            {s.val}%
                                        </motion.span>
                                    </div>
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={s.val}
                                        onChange={(e) => s.set(Number(e.target.value))}
                                        className="w-full accent-olynk h-1.5 bg-beige rounded-full appearance-none cursor-pointer"
                                    />
                                </label>
                            ))}
                        </div>

                        {/* RTO Probability (Moved from Right) */}
                        <div className="pt-6 border-t border-beige">
                            <div className="rounded-2xl border border-beige bg-white p-4 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                                        <p className="text-[9px] font-black text-navy uppercase tracking-widest">RTO Prob.</p>
                                    </div>
                                    <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${isSimulating ? 'bg-amber-50 text-amber-600 animate-pulse' : 'bg-emerald-50 text-emerald-600'}`}>
                                        {isSimulating ? 'SIM' : 'OK'}
                                    </span>
                                </div>
                                <div className="text-xl font-black text-navy font-mono">
                                    {kpis.rtoPct.toFixed(1)}%
                                </div>
                                <p className="text-[9px] text-steel mt-1.5 leading-tight font-medium">
                                    <strong className="text-navy">{flaggedRto} preventions</strong> active.
                                </p>
                            </div>
                        </div>

                        {/* Reasoning Feed (Moved from Right) */}
                        <div className="mt-auto pt-6 border-t border-beige">
                            <div className="rounded-2xl border border-beige bg-navy p-4 shadow-sm relative overflow-hidden h-[100px]">
                                <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
                                </div>
                                <div className="relative z-10 h-full flex flex-col">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></div>
                                        <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em]">Engine Log</p>
                                    </div>
                                    <div className="flex-1 flex items-center">
                                        <AnimatePresence mode="wait">
                                            <motion.p
                                                key={activeLogIndex}
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 5 }}
                                                className="text-[10px] font-mono text-emerald-400 leading-tight"
                                            >
                                                {">"} {reasoningLogs[activeLogIndex]}
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content: Decision Inbox */}
                    <main className="flex-1 overflow-y-auto bg-white p-6 sm:p-8 scrollbar-hide flex flex-col relative">
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-beige">
                            <div className="flex items-center gap-5">
                                <div>
                                    <h4 className="text-sm font-black text-navy uppercase tracking-[0.25em]">Decision Matrix</h4>
                                    <p className="text-[10px] font-mono text-steel uppercase mt-0.5 tracking-widest opacity-60">
                                        Active Instance // {industry.toUpperCase()}_0{kpis.openDecisions}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-[9px] font-mono font-bold text-navy bg-cream px-2 py-1 border border-beige">
                                    TRACE_ID: {Math.random().toString(36).substring(7).toUpperCase()}
                                </span>
                                <span className="text-[8px] font-mono text-tan uppercase tracking-tighter">
                                    Latency: 14ms
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {decisionDeck.map((d) => {
                                    const status = decisions[d.id] ?? 'open';
                                    return (
                                        <motion.div
                                            key={d.id}
                                            layout
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={`rounded-2xl border p-5 transition-all ${
                                                status === 'open'
                                                    ? 'border-beige bg-white shadow-sm hover:shadow-md'
                                                    : status === 'accepted'
                                                    ? 'border-emerald-200 bg-emerald-50/40'
                                                    : status === 'snoozed'
                                                        ? 'border-amber-100 bg-amber-50/30'
                                                    : 'border-stone-200 bg-stone-50/60'
                                            }`}
                                        >
                                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                                <span
                                                    className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                                                        d.band === 'Urgent'
                                                            ? 'bg-red-100 text-red-700'
                                                            : d.band === 'High'
                                                            ? 'bg-amber-100 text-amber-800'
                                                            : 'bg-cream text-navy border border-beige'
                                                    }`}
                                                >
                                                    {d.band}
                                                </span>
                                                {status !== 'open' && (
                                                    <span className="text-[8px] font-black uppercase tracking-widest text-steel ml-auto">{status}</span>
                                                )}
                                            </div>
                                            <h4 className="font-black text-navy text-sm leading-snug">{d.title}</h4>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                <IndianRupee className="w-3 h-3 text-olynk" />
                                                <p className="text-xs font-bold text-olynk">{d.exposure}</p>
                                            </div>
                                            <p className="text-[13px] text-steel mt-3 leading-relaxed">{d.detail}</p>
                                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-beige/50">
                                                <div className="w-4 h-4 rounded bg-navy/5 flex items-center justify-center">
                                                    <Layers className="w-2.5 h-2.5 text-navy/40" />
                                                </div>
                                                <p className="text-[10px] font-mono text-navy/50 uppercase tracking-tight">{d.supplier}</p>
                                            </div>
                                            
                                            {status === 'open' && (
                                                <div className="flex flex-wrap gap-2 mt-5">
                                                    <button
                                                        type="button"
                                                        onClick={() => setDecision(d.id, 'accepted')}
                                                        className="flex-1 min-w-[120px] py-2.5 rounded-xl bg-navy text-white text-[10px] font-black uppercase tracking-widest hover:bg-navy/90 transition-all active:scale-95"
                                                    >
                                                        Accept & Execute
                                                    </button>
                                                    <div className="flex gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => setDecision(d.id, 'snoozed')}
                                                            className="px-4 py-2.5 rounded-xl border border-beige bg-white text-navy text-[10px] font-black uppercase tracking-widest hover:bg-cream transition-all"
                                                        >
                                                            Snooze
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setDecision(d.id, 'rejected')}
                                                            className="px-4 py-2.5 rounded-xl border border-beige text-steel text-[10px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-700 hover:border-red-100 transition-all"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </main>

                    {/* Right Sidebar: Intelligence & Integrity */}
                    <aside className="w-full lg:w-[320px] border-t lg:border-t-0 lg:border-l border-beige bg-cream/10 p-6 flex flex-col gap-6 overflow-y-auto relative">
                        {/* REDESIGNED Recovery Intelligence Cell */}
                        <div className="rounded-[32px] bg-navy p-7 text-white relative overflow-hidden shadow-2xl shadow-navy/30 group border border-navy/50">
                            {/* Technical Grid Overlay */}
                            <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-2 h-2 rounded-full bg-tan shadow-[0_0_8px_rgba(210,180,140,0.5)]"></div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-tan/70">Recovery Intelligence</p>
                                    </div>
                                    <div className="text-[9px] font-mono font-bold text-white/40 border border-white/10 px-2 py-0.5 rounded-md">90D_ESTIMATION</div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Inferred Value</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-tan/40 font-mono">₹</span>
                                        <motion.h3
                                            key={kpis.recoveryLakh90}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-6xl font-black text-white tracking-tighter"
                                        >
                                            {kpis.recoveryLakh90}<span className="text-3xl ml-1 text-tan/60">L</span>
                                        </motion.h3>
                                    </div>
                                </div>

                                {/* Live Sparkline Motif */}
                                <div className="mt-8 h-12 flex items-end gap-[3px]">
                                    {[30, 45, 35, 55, 40, 65, 50, 80, 60, 90, 75, 100].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ delay: i * 0.05, duration: 0.5 }}
                                            className={`flex-1 rounded-t-[1px] ${i === 11 ? 'bg-tan' : 'bg-white/10'}`}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-between mt-3 text-[8px] font-black uppercase tracking-widest text-white/30 font-mono">
                                    <span>Historical Baseline</span>
                                    <span className="text-tan">Simulation Peak</span>
                                </div>

                                <div className="mt-10 grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider">Leakage Plugged</p>
                                        <p className="text-sm font-black text-white font-mono">₹{Math.round(kpis.recoveryLakh90 * 0.6)}L</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider">Yield Optimization</p>
                                        <p className="text-sm font-black text-tan font-mono">₹{Math.round(kpis.recoveryLakh90 * 0.4)}L</p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={copyShare}
                                    className="mt-8 w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-white/10 group/btn"
                                >
                                    <Share2 className="w-3.5 h-3.5 text-tan group-hover/btn:scale-110 transition-transform" />
                                    Generate Shareable Trace
                                </button>
                                {shareHint && <p className="text-[9px] text-tan mt-3 text-center font-bold font-mono uppercase tracking-tighter animate-pulse">{shareHint}</p>}
                            </div>

                            {/* Scanline Animation */}
                            <motion.div
                                animate={{ top: ["-10%", "110%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-tan/5 to-transparent pointer-events-none"
                            />
                        </div>

                        {/* System Health Summary */}
                        <div className="rounded-2xl border border-beige bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-tan" />
                                    <p className="text-[10px] font-black text-navy uppercase tracking-widest">System Health</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { label: 'Shopify API', val: '99.9%', status: 'text-emerald-600' },
                                    { label: 'Tally Bridge', val: 'Syncing', status: 'text-amber-600' },
                                    { label: 'Inference Node', val: 'Active', status: 'text-emerald-600' }
                                ].map(item => (
                                    <div key={item.label} className="flex justify-between items-center text-[10px] font-medium border-t border-beige/40 pt-2.5 first:border-0 first:pt-0">
                                        <span className="text-steel">{item.label}</span>
                                        <span className={`font-mono font-bold ${item.status}`}>{item.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* KPI Summary Grid */}
                        <div className="mt-auto pt-6 border-t border-beige grid grid-cols-2 gap-3">
                            {[
                                { label: 'Revenue Risk', val: formatCr(kpis.revenueAtRiskCr) },
                                { label: 'Net Capital', val: `${kpis.workingCapPct >= 0 ? '+' : ''}${kpis.workingCapPct.toFixed(1)}%` },
                                { label: 'SLA Forecast', val: `${kpis.serviceLevelPct.toFixed(1)}%` },
                                { label: 'Queue', val: kpis.openDecisions }
                            ].map(k => (
                                <div key={k.label} className="p-3 bg-white border border-beige rounded-xl">
                                    <p className="text-[8px] font-black text-tan uppercase tracking-widest">{k.label}</p>
                                    <p className="text-xs font-black text-navy mt-1 font-mono tracking-tight">{k.val}</p>
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>

                {/* Bottom Trace Bar */}
                <div className="px-6 h-12 bg-white border-t border-beige flex items-center justify-between gap-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <Activity className={`w-3.5 h-3.5 ${isSimulating ? 'text-olynk animate-spin' : 'text-emerald-500'}`} />
                        <div className="text-[9px] font-black text-navy/40 uppercase tracking-[0.25em]">
                            System Trace: <span className="text-emerald-600">CONNECTED // POLICY_OK</span>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex items-center gap-2 text-[9px] font-black text-olynk uppercase tracking-[0.25em]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Connect → Fuse → Reason → Act
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-black text-tan uppercase tracking-[0.25em]">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        Built for global commerce
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TritaDashboard;

