import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Brain, Zap, TrendingUp, RotateCcw, DollarSign, Clock, ShieldCheck } from 'lucide-react';

type Stage = 'problem' | 'analyze' | 'action' | 'result';

interface Scenario {
    id: string;
    problem: {
        icon: React.ReactNode;
        label: string;
        title: string;
        description: string;
        stats: { value: string; label: string }[];
    };
    analyze: {
        title: string;
        description: string;
    };
    action: {
        title: string;
        description: string;
        detail: { label: string; value: string };
    };
    result: {
        title: string;
        description: string;
        stats: { value: string; label: string }[];
    };
}

const SCENARIOS: Scenario[] = [
    {
        id: 'shortage',
        problem: {
            icon: <AlertTriangle className="w-10 h-10 text-red-500" />,
            label: 'Shortage Alert',
            title: 'Critical item running low',
            description: 'Demand is outpacing supply. Risk of disruption in 3 days.',
            stats: [
                { value: '127', label: 'units left' },
                { value: '412', label: 'needed this week' },
            ],
        },
        analyze: {
            title: 'Finding best option',
            description: 'Checking alternatives, lead times, and costs...',
        },
        action: {
            title: 'Reorder recommended',
            description: 'Best supplier identified. Optimal quantity calculated.',
            detail: { label: '5-day delivery', value: '₹42,500' },
        },
        result: {
            title: 'Disruption prevented',
            description: 'Order placed. Operations continue smoothly.',
            stats: [
                { value: '₹1.8L', label: 'loss avoided' },
                { value: '0', label: 'downtime days' },
            ],
        },
    },
    {
        id: 'risk',
        problem: {
            icon: <DollarSign className="w-10 h-10 text-red-500" />,
            label: 'Risk Detected',
            title: 'High-risk transaction flagged',
            description: '23 orders showing patterns that predict failures.',
            stats: [
                { value: '78%', label: 'failure probability' },
                { value: '₹4.1L', label: 'at risk' },
            ],
        },
        analyze: {
            title: 'Analyzing patterns',
            description: 'Cross-referencing historical data and signals...',
        },
        action: {
            title: 'Hold and verify',
            description: 'Pause flagged items. Request additional verification.',
            detail: { label: '23 items paused', value: 'Auto-verified' },
        },
        result: {
            title: 'Loss prevented',
            description: '19 of 23 confirmed as high-risk. Blocked in time.',
            stats: [
                { value: '₹3.2L', label: 'saved' },
                { value: '83%', label: 'accuracy' },
            ],
        },
    },
    {
        id: 'efficiency',
        problem: {
            icon: <Clock className="w-10 h-10 text-red-500" />,
            label: 'Bottleneck Found',
            title: 'Process slowing down',
            description: 'Cycle time increased 40% this week. Deadlines at risk.',
            stats: [
                { value: '+40%', label: 'delay' },
                { value: '12', label: 'tasks blocked' },
            ],
        },
        analyze: {
            title: 'Tracing root cause',
            description: 'Mapping dependencies and constraints...',
        },
        action: {
            title: 'Rebalance workload',
            description: 'Redistribute tasks. Prioritize critical path.',
            detail: { label: 'Auto-assigned', value: '8 tasks moved' },
        },
        result: {
            title: 'Flow restored',
            description: 'Bottleneck cleared. Back to normal throughput.',
            stats: [
                { value: '-35%', label: 'cycle time' },
                { value: '100%', label: 'on-time' },
            ],
        },
    },
    {
        id: 'compliance',
        problem: {
            icon: <ShieldCheck className="w-10 h-10 text-red-500" />,
            label: 'Compliance Gap',
            title: 'Policy violation detected',
            description: 'Process deviation found. Requires immediate attention.',
            stats: [
                { value: '3', label: 'violations' },
                { value: 'High', label: 'severity' },
            ],
        },
        analyze: {
            title: 'Checking requirements',
            description: 'Validating against policy rules...',
        },
        action: {
            title: 'Auto-correct applied',
            description: 'System fixed 2 issues. 1 needs manual review.',
            detail: { label: '2 auto-fixed', value: '1 flagged' },
        },
        result: {
            title: 'Compliance restored',
            description: 'All issues resolved. Audit trail logged.',
            stats: [
                { value: '100%', label: 'compliant' },
                { value: '< 5min', label: 'resolution' },
            ],
        },
    },
];

const STAGES: { id: Stage; duration: number }[] = [
    { id: 'problem', duration: 3000 },
    { id: 'analyze', duration: 2500 },
    { id: 'action', duration: 2500 },
    { id: 'result', duration: 3500 },
];

const HeroDemoLoop = () => {
    const [scenarioIndex, setScenarioIndex] = useState(0);
    const [stageIndex, setStageIndex] = useState(0);
    const currentStage = STAGES[stageIndex].id;
    const scenario = SCENARIOS[scenarioIndex];

    useEffect(() => {
        const timer = setTimeout(() => {
            const nextStageIndex = stageIndex + 1;
            if (nextStageIndex >= STAGES.length) {
                // Move to next scenario
                setStageIndex(0);
                setScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
            } else {
                setStageIndex(nextStageIndex);
            }
        }, STAGES[stageIndex].duration);

        return () => clearTimeout(timer);
    }, [stageIndex, scenarioIndex]);

    const restart = () => {
        setStageIndex(0);
        setScenarioIndex(0);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="relative bg-noir border border-beige shadow-2xl rounded-3xl overflow-hidden">
                {/* Top Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-beige bg-cream/30">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-amber-400" />
                            <div className="w-3 h-3 rounded-full bg-emerald-400" />
                        </div>
                        <span className="text-xs font-bold text-navy/40">Olynk Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-emerald-600">Live</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-8 min-h-[380px] flex flex-col items-center justify-center relative">
                    <AnimatePresence mode="wait">
                        {currentStage === 'problem' && (
                            <motion.div
                                key={`${scenario.id}-problem`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center space-y-5"
                            >
                                <div className="w-20 h-20 mx-auto rounded-2xl bg-red-50 border-2 border-red-200 flex items-center justify-center">
                                    {scenario.problem.icon}
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-red-500 uppercase tracking-widest">{scenario.problem.label}</p>
                                    <h3 className="text-2xl font-black text-navy">{scenario.problem.title}</h3>
                                    <p className="text-steel max-w-md">{scenario.problem.description}</p>
                                </div>
                                <div className="flex items-center justify-center gap-6 pt-2">
                                    {scenario.problem.stats.map((stat, i) => (
                                        <div key={i} className="text-center">
                                            <p className="text-3xl font-black text-red-500">{stat.value}</p>
                                            <p className="text-xs text-steel">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {currentStage === 'analyze' && (
                            <motion.div
                                key={`${scenario.id}-analyze`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center space-y-5"
                            >
                                <div className="w-20 h-20 mx-auto rounded-2xl bg-olynk/10 border-2 border-olynk/30 flex items-center justify-center">
                                    <Brain className="w-10 h-10 text-olynk animate-pulse" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-olynk uppercase tracking-widest">AI Analyzing</p>
                                    <h3 className="text-2xl font-black text-navy">{scenario.analyze.title}</h3>
                                    <p className="text-steel max-w-md">{scenario.analyze.description}</p>
                                </div>
                                <div className="flex items-center justify-center gap-2 pt-2">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                                            transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                                            className="w-3 h-3 rounded-full bg-olynk"
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {currentStage === 'action' && (
                            <motion.div
                                key={`${scenario.id}-action`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center space-y-5"
                            >
                                <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center">
                                    <Zap className="w-10 h-10 text-amber-500" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Action Recommended</p>
                                    <h3 className="text-2xl font-black text-navy">{scenario.action.title}</h3>
                                    <p className="text-steel max-w-md">{scenario.action.description}</p>
                                </div>
                                <div className="bg-cream border border-beige rounded-xl px-6 py-4 inline-flex items-center gap-6">
                                    <span className="text-sm font-bold text-navy">{scenario.action.detail.label}</span>
                                    <span className="text-lg font-black text-olynk">{scenario.action.detail.value}</span>
                                </div>
                            </motion.div>
                        )}

                        {currentStage === 'result' && (
                            <motion.div
                                key={`${scenario.id}-result`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center space-y-5"
                            >
                                <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                                    <TrendingUp className="w-10 h-10 text-emerald-500" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Resolved</p>
                                    <h3 className="text-2xl font-black text-navy">{scenario.result.title}</h3>
                                    <p className="text-steel max-w-md">{scenario.result.description}</p>
                                </div>
                                <div className="flex items-center justify-center gap-4 pt-2">
                                    {scenario.result.stats.map((stat, i) => (
                                        <div key={i} className="text-center px-5 py-3 bg-emerald-50 rounded-xl">
                                            <p className="text-2xl font-black text-emerald-600">{stat.value}</p>
                                            <p className="text-xs text-emerald-700">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Progress & Controls */}
                <div className="px-8 pb-6">
                    {/* Stage progress */}
                    <div className="flex items-center gap-2">
                        {STAGES.map((stage, idx) => (
                            <div key={stage.id} className="flex-1">
                                <div className={`h-1.5 rounded-full overflow-hidden ${idx <= stageIndex ? 'bg-olynk/20' : 'bg-beige'}`}>
                                    {idx === stageIndex && (
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: stage.duration / 1000, ease: 'linear' }}
                                            className="h-full bg-olynk"
                                        />
                                    )}
                                    {idx < stageIndex && <div className="h-full w-full bg-olynk" />}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Footer */}
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-2">
                            {SCENARIOS.map((s, i) => (
                                <div
                                    key={s.id}
                                    className={`w-2 h-2 rounded-full transition-colors ${i === scenarioIndex ? 'bg-navy' : 'bg-beige'}`}
                                />
                            ))}
                            <span className="text-[10px] font-bold text-steel ml-2">
                                {scenarioIndex + 1} of {SCENARIOS.length}
                            </span>
                        </div>
                        <button
                            onClick={restart}
                            className="flex items-center gap-1.5 text-xs font-bold text-olynk hover:text-navy transition-colors"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Restart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroDemoLoop;
