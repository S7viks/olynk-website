import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, BookOpen, Terminal, Zap } from 'lucide-react';

const Documentation = () => {
    return (
        <div className="relative min-h-screen bg-transparent">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-noir border border-beige rounded-full mb-8 shadow-sm">
                            <Terminal className="w-3 h-3 text-navy" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy font-mono">DEVELOPER_RESOURCES</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-navy mb-6 tracking-tight leading-tightest">
                            Documentation
                        </h1>

                        <p className="text-lg sm:text-xl text-steel font-medium max-w-3xl mx-auto px-4 sm:px-0">
                            Wire Olynk into your operational stack: governed ingestion, causal reads, and execution hooks, with schemas and lineage you can audit.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Documentation Grid */}
            <section className="py-20 px-6 bg-noir">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Code,
                                title: "API Reference",
                                desc: "Endpoints for Fabric sync, Insight queries, and policy-gated actions, with auth, payloads, and trace IDs for audit.",
                                link: "#api-reference",
                                badge: "CORE_API"
                            },
                            {
                                icon: BookOpen,
                                title: "Quickstart Guide",
                                desc: "Connect sources, validate the unified graph, and ship your first driver-ranked read in a governed sandbox.",
                                link: "#quickstart",
                                badge: "GETTING_STARTED"
                            },
                            {
                                icon: Zap,
                                title: "SDK Documentation",
                                desc: "Language-specific clients for Python, Node.js, Java, and Go, typed helpers for causal payloads and execution receipts.",
                                link: "#sdks",
                                badge: "INTEGRATIONS"
                            },
                            {
                                icon: Terminal,
                                title: "CLI Tools",
                                desc: "Deploy bridges, replay policy evaluations, and inspect lineage from the terminal, built for CI and on-call workflows.",
                                link: "#cli",
                                badge: "DEVELOPER_TOOLS"
                            },
                            {
                                icon: BookOpen,
                                title: "Architecture Guide",
                                desc: "How Fabric, Insight, Core, and Orbit compose: data contracts, counterfactual surfaces, and where human approval sits.",
                                link: "#architecture",
                                badge: "ADVANCED"
                            },
                            {
                                icon: Code,
                                title: "Code Examples",
                                desc: "Reference patterns for driver dashboards, intervention playbooks, and Orbit audit exports in production-shaped apps.",
                                link: "#examples",
                                badge: "TUTORIALS"
                            }
                        ].map((item, i) => (
                            <motion.a
                                key={i}
                                href={item.link}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-8 rounded-3xl bg-cream border-2 border-beige hover:border-navy hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-noir border-2 border-navy flex items-center justify-center shrink-0">
                                        <item.icon className="w-7 h-7 text-navy" />
                                    </div>
                                    <span className="text-[8px] font-mono font-black text-tan uppercase tracking-widest">{item.badge}</span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black text-navy mb-4 uppercase tracking-tight">{item.title}</h3>
                                <p className="text-sm sm:text-base text-steel font-medium leading-relaxed">{item.desc}</p>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-navy text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 tracking-tight leading-tightest">
                        Need Help Getting Started?
                    </h2>
                    <p className="text-lg text-white/80 mb-10">
                        Our team can align ingestion, causal models, and policy boundaries with your security and finance reviewers.
                    </p>
                    <Link
                        to="/support"
                        className="inline-block bg-olynk text-white px-8 sm:px-12 py-5 sm:py-6 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest hover:bg-noir hover:text-navy transition-all shadow-2xl"
                    >
                        Contact Technical Support
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Documentation;
