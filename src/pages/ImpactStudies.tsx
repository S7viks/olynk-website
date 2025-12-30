import { motion } from 'framer-motion';
import { TrendingUp, Award } from 'lucide-react';

const ImpactStudies = () => {
    return (
        <div className="relative min-h-screen bg-transparent">
            <section className="relative pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-beige rounded-full mb-8 shadow-sm">
                            <Award className="w-3 h-3 text-navy" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy font-mono">CASE_STUDIES</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-navy mb-6 tracking-tight leading-tightest">Impact Studies</h1>
                        <p className="text-xl text-steel font-medium">Real results from businesses using Olynk.</p>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 px-6 bg-white">
                <div className="max-w-5xl mx-auto space-y-8">
                    {[
                        { company: "Leading D2C Brand", metric: "85% Reduction", desc: "in operational overhead within 3 months", vertical: "COMMERCE" },
                        { company: "Manufacturing Company", metric: "$2.4M Saved", desc: "in first year through downtime prevention", vertical: "INDUSTRIAL" },
                        { company: "Healthcare Provider", metric: "99.9% Compliance", desc: "achieved across all protocols", vertical: "CLINICAL" }
                    ].map((study, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                            className="p-6 sm:p-10 rounded-[32px] sm:rounded-[40px] bg-cream border-2 border-beige">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex-1">
                                    <span className="text-[10px] font-mono font-black text-olynk uppercase tracking-widest mb-3 block">{study.vertical}</span>
                                    <h3 className="text-xl sm:text-3xl font-black text-navy mb-2">{study.company}</h3>
                                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-4">
                                        <span className="text-4xl sm:text-5xl font-black text-olynk">{study.metric}</span>
                                        <TrendingUp className="hidden sm:block w-6 h-6 text-emerald-500" />
                                    </div>
                                    <p className="text-steel font-medium text-base sm:text-lg">{study.desc}</p>
                                </div>
                            </div>
                            <button className="text-navy font-black text-[10px] sm:text-xs uppercase tracking-widest hover:text-olynk transition-all pt-4 border-t border-navy/10 w-full text-left">
                                Download Full Case Study →
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ImpactStudies;
