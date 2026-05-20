import { useState } from 'react';
import Logo from './Logo';
import { ArrowDown, Search, Filter, MoreHorizontal } from 'lucide-react';

/** ASCII-safe Unicode escapes so symbols render correctly on all platforms */
const S = {
    rupee: '\u20B9',
    dot: '\u00B7',
    minus: '\u2212',
    delta: '\u0394',
    ellipsis: '\u2026',
    arrow: '\u2192',
    cmd: '\u2318',
} as const;

type TabId = 'drivers' | 'decisions';

const TABS: { id: TabId; label: string }[] = [
    { id: 'drivers', label: 'Drivers' },
    { id: 'decisions', label: 'Decisions' },
];

const DRIVERS = [
    {
        rank: 1,
        name: 'NCR demand spike',
        signal: 'Meta + creator cohort',
        confidence: 91,
        exposure: `${S.rupee}2.3L`,
        delta: '+42%',
        selected: true,
    },
    {
        rank: 2,
        name: `NDR cluster ${S.dot} pin 1100xx`,
        signal: 'Delhivery lane',
        confidence: 84,
        exposure: `${S.rupee}4.1L`,
        delta: 'RTO 78%',
        selected: false,
    },
    {
        rank: 3,
        name: 'West DC slow movers',
        signal: 'Inventory age > 62d',
        confidence: 76,
        exposure: `${S.rupee}38L`,
        delta: 'WC drag',
        selected: false,
    },
    {
        rank: 4,
        name: 'AP terms drift',
        signal: 'Tally payout window',
        confidence: 71,
        exposure: `${S.rupee}1.1Cr`,
        delta: `${S.minus}6.2d DPO`,
        selected: false,
    },
];

const DECISION_QUEUE = [
    {
        id: 'DEC-8841',
        title: 'Reorder SKU-047',
        priority: 'Urgent' as const,
        exposure: `${S.rupee}2.3L`,
        status: 'Pending approval',
        driver: 'NCR demand spike',
    },
    {
        id: 'DEC-8839',
        title: 'Reroute pin 1100xx lane',
        priority: 'High' as const,
        exposure: `${S.rupee}4.1L`,
        status: 'Pending approval',
        driver: 'NDR cluster',
    },
    {
        id: 'DEC-8832',
        title: 'Markdown West DC slow movers',
        priority: 'Medium' as const,
        exposure: `${S.rupee}38L`,
        status: `Snoozed ${S.dot} 4h`,
        driver: 'Inventory age',
    },
    {
        id: 'DEC-8828',
        title: `Extend AP terms ${S.dot} vendor batch`,
        priority: 'Low' as const,
        exposure: `${S.rupee}1.1Cr`,
        status: 'Auto-approved',
        driver: 'AP terms drift',
    },
];

const INTEGRATIONS = ['Shopify', 'Tally', 'Delhivery', 'Razorpay', 'Unicommerce'];

const CAUSAL_STEPS = [
    { label: 'Meta spend', sub: '+18% WoW' },
    { label: 'NCR demand', sub: '+42% WoW' },
    { label: 'Cover left', sub: '3.2 days' },
    { label: 'Reorder 500u', sub: 'Policy OK', accent: true },
];

const TAB_HEADERS: Record<TabId, { eyebrow: string; title: string }> = {
    drivers: {
        eyebrow: `Insight ${S.dot} Driver ranking`,
        title: 'What moves margin this week',
    },
    decisions: {
        eyebrow: `Core ${S.dot} Decision queue`,
        title: 'Actions waiting on you',
    },
};

function ConfidenceBar({ value }: { value: number }) {
    return (
        <div className="flex items-center gap-2 w-full max-w-[96px]">
            <div className="flex-1 h-1.5 bg-beige rounded-full overflow-hidden">
                <div className="h-full bg-olynk rounded-full" style={{ width: `${value}%` }} />
            </div>
            <span className="text-[10px] font-mono font-bold text-navy/60 tabular-nums">{value}</span>
        </div>
    );
}

function DriverTable() {
    return (
        <div className="rounded-xl border border-beige bg-white overflow-hidden">
            <div className="hidden md:grid md:grid-cols-[32px_minmax(0,1fr)_100px_72px_56px] gap-3 px-4 py-2.5 border-b border-beige bg-cream/40 text-[9px] font-black text-tan uppercase tracking-wider">
                <span>#</span>
                <span>Driver</span>
                <span>Confidence</span>
                <span>Exposure</span>
                <span className="text-right">{S.delta}</span>
            </div>

            {DRIVERS.map((row) => (
                <div
                    key={row.rank}
                    className={`border-b border-beige/60 last:border-0 ${row.selected ? 'bg-olynk/[0.06]' : 'bg-white'}`}
                >
                    <div
                        className={`hidden md:grid md:grid-cols-[32px_minmax(0,1fr)_100px_72px_56px] gap-3 px-4 py-3 items-center ${
                            row.selected ? 'border-l-2 border-l-olynk' : 'border-l-2 border-l-transparent'
                        }`}
                    >
                        <span className="text-[11px] font-mono font-bold text-steel">{row.rank}</span>
                        <div className="min-w-0">
                            <p className="text-[13px] font-bold text-navy truncate">{row.name}</p>
                            <p className="text-[10px] text-steel truncate">{row.signal}</p>
                        </div>
                        <ConfidenceBar value={row.confidence} />
                        <span className="text-[12px] font-black text-navy font-mono tabular-nums">{row.exposure}</span>
                        <span
                            className={`text-[10px] font-bold text-right tabular-nums ${
                                row.delta.startsWith('+') || row.delta.includes('RTO')
                                    ? 'text-red-600'
                                    : 'text-steel'
                            }`}
                        >
                            {row.delta}
                        </span>
                    </div>

                    <div className={`md:hidden px-4 py-3 ${row.selected ? 'border-l-2 border-l-olynk' : ''}`}>
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex gap-3 min-w-0">
                                <span className="text-[11px] font-mono font-bold text-steel pt-0.5">{row.rank}</span>
                                <div className="min-w-0">
                                    <p className="text-[13px] font-bold text-navy">{row.name}</p>
                                    <p className="text-[10px] text-steel">{row.signal}</p>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-[12px] font-black text-navy font-mono">{row.exposure}</p>
                                <p
                                    className={`text-[10px] font-bold ${
                                        row.delta.startsWith('+') || row.delta.includes('RTO')
                                            ? 'text-red-600'
                                            : 'text-steel'
                                    }`}
                                >
                                    {row.delta}
                                </p>
                            </div>
                        </div>
                        <div className="mt-2 pl-7">
                            <ConfidenceBar value={row.confidence} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function IntegrationsRow() {
    return (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-beige/60">
            <span className="text-[9px] font-bold text-steel uppercase tracking-wider">Connected</span>
            {INTEGRATIONS.map((name) => (
                <span
                    key={name}
                    className="text-[10px] font-medium text-navy/65 px-2 py-0.5 rounded-md bg-white border border-beige"
                >
                    {name}
                </span>
            ))}
        </div>
    );
}

function DriversPage() {
    return (
        <>
            <DriverTable />
            <IntegrationsRow />
        </>
    );
}

function DecisionsPage() {
    return (
        <div className="rounded-xl border border-beige bg-white overflow-hidden">
            <div className="hidden md:grid md:grid-cols-[100px_minmax(0,1fr)_80px_100px_120px] gap-3 px-4 py-2.5 border-b border-beige bg-cream/40 text-[9px] font-black text-tan uppercase tracking-wider">
                <span>ID</span>
                <span>Decision</span>
                <span>Priority</span>
                <span>Exposure</span>
                <span>Status</span>
            </div>
            {DECISION_QUEUE.map((item, i) => (
                <div
                    key={item.id}
                    className={`border-b border-beige/60 last:border-0 px-4 py-3 ${
                        i === 0 ? 'bg-olynk/[0.06] border-l-2 border-l-olynk' : 'bg-white'
                    }`}
                >
                    <div className="hidden md:grid md:grid-cols-[100px_minmax(0,1fr)_80px_100px_120px] gap-3 items-center">
                        <span className="text-[10px] font-mono font-bold text-steel">{item.id}</span>
                        <div className="min-w-0">
                            <p className="text-[13px] font-bold text-navy">{item.title}</p>
                            <p className="text-[10px] text-steel">Driver: {item.driver}</p>
                        </div>
                        <PriorityBadge priority={item.priority} />
                        <span className="text-[12px] font-black text-navy font-mono">{item.exposure}</span>
                        <span className="text-[10px] font-bold text-steel">{item.status}</span>
                    </div>
                    <div className="md:hidden space-y-2">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="text-[10px] font-mono text-steel">{item.id}</p>
                                <p className="text-[13px] font-bold text-navy mt-0.5">{item.title}</p>
                            </div>
                            <PriorityBadge priority={item.priority} />
                        </div>
                        <p className="text-[10px] text-steel">
                            {item.status} {S.dot} {item.exposure}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function PriorityBadge({ priority }: { priority: 'Urgent' | 'High' | 'Medium' | 'Low' }) {
    const styles = {
        Urgent: 'bg-red-500 text-white',
        High: 'bg-amber-500 text-white',
        Medium: 'bg-navy/10 text-navy',
        Low: 'bg-cream text-steel border border-beige',
    };
    return (
        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shrink-0 ${styles[priority]}`}>
            {priority}
        </span>
    );
}


function DecisionPanel() {
    return (
        <div className="flex flex-col h-full bg-white min-h-[320px] lg:min-h-0 lg:flex-1">
            <div className="px-4 py-3 border-b border-beige bg-navy text-white flex items-start justify-between gap-3 shrink-0">
                <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">Decision</p>
                    <p className="text-sm font-black leading-snug mt-1">Reorder SKU-047</p>
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider bg-red-500 text-white px-2 py-0.5 rounded shrink-0">
                    Urgent
                </span>
            </div>

            <div className="flex-1 p-4 flex flex-col gap-4">
                <div>
                    <p className="text-[10px] font-bold text-tan uppercase tracking-wider mb-2">Causal path</p>
                    <ul className="space-y-0">
                        {CAUSAL_STEPS.map((step, i) => (
                            <li key={step.label}>
                                <div
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${
                                        step.accent ? 'bg-olynk/5 border border-olynk/25' : 'bg-cream/50'
                                    }`}
                                >
                                    <span className="w-5 h-5 rounded-full bg-white border border-beige flex items-center justify-center text-[9px] font-mono font-bold text-steel shrink-0">
                                        {i + 1}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[11px] font-bold text-navy">{step.label}</p>
                                        <p className={`text-[10px] font-mono ${step.accent ? 'text-olynk' : 'text-steel'}`}>
                                            {step.sub}
                                        </p>
                                    </div>
                                </div>
                                {i < CAUSAL_STEPS.length - 1 && (
                                    <div className="flex justify-center py-0.5" aria-hidden>
                                        <ArrowDown className="w-3 h-3 text-tan" />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-cream/80 border border-beige p-3">
                        <p className="text-[9px] font-bold text-steel uppercase tracking-wide">If ignored</p>
                        <p className="text-base font-black text-red-600 font-mono mt-0.5">{S.rupee}2.3L</p>
                    </div>
                    <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3">
                        <p className="text-[9px] font-bold text-steel uppercase tracking-wide">If executed</p>
                        <p className="text-base font-black text-emerald-700 font-mono mt-0.5">3.2d cover</p>
                    </div>
                </div>

                <div className="mt-auto space-y-3">
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="flex-1 py-2.5 rounded-xl bg-navy text-white text-[10px] font-black uppercase tracking-wider"
                        >
                            Approve
                        </button>
                        <button
                            type="button"
                            className="px-3 py-2.5 rounded-xl border border-beige text-[10px] font-black uppercase tracking-wider text-steel bg-white"
                        >
                            Snooze
                        </button>
                        <button
                            type="button"
                            className="p-2.5 rounded-xl border border-beige text-steel bg-white"
                            aria-label="More options"
                        >
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-[9px] font-mono text-steel leading-relaxed">
                        Pristine Organics {S.dot} 8d lead {S.dot} within budget ceiling
                    </p>
                </div>
            </div>
        </div>
    );
}

function TabContent({ tab }: { tab: TabId }) {
    switch (tab) {
        case 'drivers':
            return <DriversPage />;
        case 'decisions':
            return <DecisionsPage />;
    }
}

const ProductSnapshot = () => {
    const [activeTab, setActiveTab] = useState<TabId>('drivers');
    const header = TAB_HEADERS[activeTab];
    const showDecisionPanel = activeTab === 'drivers';

    return (
        <div className="w-full max-w-7xl mx-auto transform-none">
            <div className="rounded-xl border border-beige bg-white shadow-sm ring-1 ring-black/[0.04] overflow-hidden transform-none">
                <header className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 sm:px-5 py-3 border-b border-beige bg-cream/50">
                    <Logo size="sm" className="shrink-0" />
                    <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-steel">
                        <span className="font-bold text-navy">Acme Ops</span>
                        <span className="text-tan">/</span>
                        <span>production</span>
                    </div>
                    <nav
                        className="flex items-center p-0.5 bg-white border border-beige rounded-lg"
                        role="tablist"
                        aria-label="Product views"
                    >
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={activeTab === tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors ${
                                    activeTab === tab.id ? 'bg-navy text-white' : 'text-steel hover:text-navy'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                    <div className="flex-1 min-w-[140px] max-w-xs ml-auto hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-beige bg-white">
                        <Search className="w-3.5 h-3.5 text-steel shrink-0" />
                        <span className="text-[11px] text-steel truncate">Search drivers, SKUs{S.ellipsis}</span>
                        <kbd className="ml-auto shrink-0 text-[9px] font-mono text-navy/40 bg-cream px-1.5 py-0.5 rounded border border-beige">
                            {S.cmd}K
                        </kbd>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Live
                    </span>
                </header>

                <div
                    className={`flex flex-col lg:min-h-[480px] lg:items-stretch ${
                        showDecisionPanel ? 'lg:flex-row' : ''
                    }`}
                >
                    <div className="flex flex-1 min-w-0 flex-col bg-[#faf8f5]">
                        <div className="px-4 sm:px-5 py-4 border-b border-beige/70 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                            <div>
                                <p className="text-[10px] font-black text-tan uppercase tracking-[0.18em]">
                                    {header.eyebrow}
                                </p>
                                <h2 className="text-lg sm:text-xl font-black text-navy tracking-tight mt-1">
                                    {header.title}
                                </h2>
                            </div>
                            {activeTab === 'drivers' && (
                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-navy bg-white border border-beige rounded-lg"
                                    >
                                        <Filter className="w-3 h-3" />
                                        Filters
                                    </button>
                                    <span className="text-[10px] font-mono text-steel px-2.5 py-1.5 bg-white border border-beige rounded-lg whitespace-nowrap">
                                        trace_8f2a{S.ellipsis}c41
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 px-4 sm:px-5 py-4" role="tabpanel">
                            <TabContent tab={activeTab} />
                        </div>

                        <footer className="px-4 sm:px-5 py-2.5 border-t border-beige bg-white text-[10px] font-mono text-steel flex flex-wrap items-center justify-between gap-2">
                            <span>
                                <span className="text-emerald-600 font-bold">EXEC</span> PO-8841 {S.dot}{' '}
                                <span className="text-navy font-bold">reorder_auto</span> {S.dot} 14ms
                            </span>
                            <span className="text-tan hidden sm:inline">
                                Fabric {S.arrow} Insight {S.arrow} Core
                            </span>
                        </footer>
                    </div>

                    {showDecisionPanel && (
                        <div className="w-full lg:w-[340px] lg:shrink-0 border-t lg:border-t-0 lg:border-l border-beige flex flex-col min-h-0">
                            <DecisionPanel />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductSnapshot;
