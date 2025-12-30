import { motion } from 'framer-motion';
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-beige rounded-full mb-8 shadow-sm">
                            <Terminal className="w-3 h-3 text-navy" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy font-mono">DEVELOPER_RESOURCES</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-black text-navy mb-6 tracking-tight">
                            Documentation
                        </h1>

                        <p className="text-xl text-steel font-medium max-w-3xl mx-auto">
                            Everything you need to integrate Olynk into your operational stack.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Documentation Grid */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Code,
                                title: "API Reference",
                                desc: "Complete API documentation with endpoint details, authentication, and response schemas.",
                                link: "#api-reference",
                                badge: "CORE_API"
                            },
                            {
                                icon: BookOpen,
                                title: "Quickstart Guide",
                                desc: "Get up and running in minutes with our step-by-step integration tutorial.",
                                link: "#quickstart",
                                badge: "GETTING_STARTED"
                            },
                            {
                                icon: Zap,
                                title: "SDK Documentation",
                                desc: "Language-specific SDKs for Python, Node.js, Java, and Go.",
                                link: "#sdks",
                                badge: "INTEGRATIONS"
                            },
                            {
                                icon: Terminal,
                                title: "CLI Tools",
                                desc: "Command-line utilities for deployment, monitoring, and management.",
                                link: "#cli",
                                badge: "DEVELOPER_TOOLS"
                            },
                            {
                                icon: BookOpen,
                                title: "Architecture Guide",
                                desc: "Deep dive into Olynk's system architecture and design patterns.",
                                link: "#architecture",
                                badge: "ADVANCED"
                            },
                            {
                                icon: Code,
                                title: "Code Examples",
                                desc: "Real-world implementation examples and best practices.",
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
                                    <div className="w-14 h-14 rounded-2xl bg-white border-2 border-navy flex items-center justify-center shrink-0">
                                        <item.icon className="w-7 h-7 text-navy" />
                                    </div>
                                    <span className="text-[8px] font-mono font-black text-tan uppercase tracking-widest">{item.badge}</span>
                                </div>
                                <h3 className="text-2xl font-black text-navy mb-4 uppercase tracking-tight">{item.title}</h3>
                                <p className="text-steel font-medium leading-relaxed">{item.desc}</p>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-navy text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">
                        Need Help Getting Started?
                    </h2>
                    <p className="text-lg text-white/80 mb-10">
                        Our technical team is here to support your integration.
                    </p>
                    <button className="bg-olynk text-white px-12 py-6 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white hover:text-navy transition-all shadow-2xl">
                        Contact Technical Support
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Documentation;
