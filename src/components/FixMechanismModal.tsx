import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

interface FixMechanismModalProps {
    isOpen: boolean;
    onClose: () => void;
    layers: Array<{
        id: string;
        title: string;
        desc: string;
    }>;
    industryTitle: string;
}

const FixMechanismModal = ({ isOpen, onClose, layers, industryTitle }: FixMechanismModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
                    >
                        <div className="bg-white rounded-[48px] border-2 border-navy shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden pointer-events-auto relative">

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-cream border border-beige hover:bg-navy hover:border-navy hover:text-white transition-all flex items-center justify-center z-10 group"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header */}
                            <div className="bg-gradient-to-br from-cream to-beige border-b-2 border-navy/10 p-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-olynk animate-pulse" />
                                    <span className="text-[10px] font-mono font-black text-tan uppercase tracking-[0.3em]">
                                        SYSTEM_ARCHITECTURE // {industryTitle.toUpperCase()}
                                    </span>
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-black text-navy mb-4 tracking-tight">
                                    Fix Mechanism <br />
                                    <span className="text-olynk italic font-serif font-normal">Analysis</span>
                                </h2>
                                <p className="text-steel text-lg font-medium leading-relaxed max-w-2xl">
                                    Explore how Olynk's operational intelligence layers work together to solve {industryTitle.toLowerCase()} challenges.
                                </p>
                            </div>

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto max-h-[calc(85vh-280px)] p-10">
                                <div className="space-y-8">
                                    {layers.map((layer, index) => (
                                        <motion.div
                                            key={layer.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="group"
                                        >
                                            {/* Layer Card */}
                                            <div className="p-8 rounded-3xl bg-cream border-2 border-beige hover:border-navy/30 transition-all">
                                                <div className="flex items-start gap-6">
                                                    {/* Index Badge */}
                                                    <div className="w-14 h-14 rounded-2xl bg-white border-2 border-navy flex items-center justify-center shrink-0">
                                                        <span className="text-xl font-black font-mono text-navy">
                                                            0{index + 1}
                                                        </span>
                                                    </div>

                                                    <div className="flex-1">
                                                        {/* Layer Title */}
                                                        <div className="flex items-center gap-3 mb-3">
                                                            <h3 className="text-2xl font-black text-navy uppercase tracking-tight">
                                                                {layer.title}
                                                            </h3>
                                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                        </div>

                                                        {/* Layer Description */}
                                                        <p className="text-steel text-base leading-relaxed mb-6 font-medium">
                                                            {layer.desc}
                                                        </p>

                                                        {/* Technical Implementation */}
                                                        <div className="bg-white/60 rounded-2xl p-6 border border-olynk/10">
                                                            <div className="flex items-start gap-3 mb-3">
                                                                <Zap className="w-5 h-5 text-olynk shrink-0 mt-0.5" fill="currentColor" fillOpacity={0.1} />
                                                                <div>
                                                                    <span className="text-[10px] font-black font-mono text-olynk uppercase tracking-widest block mb-2">
                                                                        TECHNICAL_IMPLEMENTATION
                                                                    </span>
                                                                    <div className="space-y-2">
                                                                        {getTechnicalDetails(layer.id, index).map((detail, i) => (
                                                                            <div key={i} className="flex items-start gap-2">
                                                                                <ArrowRight className="w-4 h-4 text-navy shrink-0 mt-0.5" />
                                                                                <span className="text-sm text-navy font-bold leading-relaxed">
                                                                                    {detail}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Connection Line */}
                                            {index < layers.length - 1 && (
                                                <div className="flex justify-center py-4">
                                                    <div className="w-0.5 h-8 bg-gradient-to-b from-navy/40 to-navy/10" />
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer CTA */}
                            <div className="bg-gradient-to-t from-cream to-white border-t-2 border-navy/10 p-8 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-navy mb-1">Ready to deploy?</p>
                                    <p className="text-xs text-steel font-medium">Start your pilot in minutes.</p>
                                </div>
                                <button className="bg-navy text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-olynk transition-all shadow-xl hover:-translate-y-1">
                                    Request Demo
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// Helper function to generate technical details based on layer ID
const getTechnicalDetails = (layerId: string, index: number): string[] => {
    const detailsMap: Record<string, string[]> = {
        'INVENTORY_AUTONOMY': [
            'Real-time sync across all sales channels and nodes',
            'Predictive stock-out prevention with 99.9% accuracy',
            'Autonomous restocking logic based on demand patterns'
        ],
        'MULTI_CHANNEL_SYNC': [
            'Unified data fabric connecting ERP, POS, and e-commerce',
            'Sub-second latency for inventory updates',
            'Automatic conflict resolution across distributed systems'
        ],
        'DEMAND_PREDICTION': [
            'ML models trained on historical sales and market signals',
            '10-day advanced warning for supply chain disruptions',
            'Dynamic pricing recommendations based on demand elasticity'
        ],
        'SUPPLY_CHAIN_LOGIC': [
            'Intelligent variable orchestration for maximum throughput',
            'Real-time supplier performance tracking',
            'Automated reordering based on lead time predictions'
        ],
        'FLOW_OPTIMIZATION': [
            'Production flow adjustments based on demand forecasts',
            'Bottleneck detection and resolution automation',
            'Resource allocation optimization in real-time'
        ],
        'DOWNTIME_PREVENTION': [
            'Sensor-fused diagnostics for predictive maintenance',
            'Anomaly detection with 95% early warning accuracy',
            'Automated maintenance scheduling to minimize disruption'
        ],
        'PROTOCOL_COMPLIANCE': [
            'Automated protocol verification across distributed nodes',
            'Real-time compliance monitoring with instant alerts',
            'Audit trail generation for regulatory requirements'
        ],
        'REAL_TIME_ORCHESTRATION': [
            'Precision timing for specimen logistics and resources',
            'Intelligent resource allocation based on clinical priorities',
            'Cross-facility coordination for optimal patient outcomes'
        ],
        'DATA_INTEGRITY': [
            'Immutable audit trails for all operational data streams',
            'HIPAA/GDPR compliant data handling and encryption',
            'Multi-layer verification for data accuracy'
        ],
        'LEARNING_LOGIC': [
            'Adaptive content delivery based on student performance',
            'Real-time curriculum adjustments for optimal learning',
            'Personalized learning paths with ML-driven recommendations'
        ],
        'INSTITUTIONAL_SYNC': [
            'Seamless SIS/LMS integration for unified operations',
            'Real-time data sync across administrative systems',
            'Automated reporting and compliance documentation'
        ],
        'SUCCESS_METRICS': [
            'Predictive analytics for student retention',
            'Early intervention triggers for at-risk students',
            'Performance trend analysis with actionable insights'
        ]
    };

    return detailsMap[layerId] || [
        'Intelligent automation and decision-making',
        'Real-time data processing and analysis',
        'Predictive models for proactive operations'
    ];
};

export default FixMechanismModal;
