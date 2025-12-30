import { motion } from 'framer-motion';
import { Play, BookOpen, Download } from 'lucide-react';

const OlynkExplained = () => {
    return (
        <div className="relative min-h-screen bg-transparent">
            <section className="relative pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-beige rounded-full mb-8 shadow-sm">
                            <BookOpen className="w-3 h-3 text-navy" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy font-mono">EDUCATIONAL_RESOURCES</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-navy mb-6 tracking-tight">Olynk Explained</h1>
                        <p className="text-xl text-steel font-medium">Learn how Olynk transforms operational intelligence.</p>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { icon: Play, title: "Video Overview", desc: "5-minute introduction to Olynk's platform", type: "WATCH_NOW" },
                            { icon: BookOpen, title: "Technical Whitepaper", desc: "Deep dive into our architecture and AI models", type: "READ" },
                            { icon: Download, title: "Product Brief", desc: "Executive summary of key capabilities", type: "DOWNLOAD" },
                            { icon: Play, title: "Demo Walkthrough", desc: "Live demonstration of the platform in action", type: "WATCH_NOW" }
                        ].map((resource, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl bg-cream border-2 border-beige hover:border-navy hover:shadow-xl transition-all group cursor-pointer">
                                <div className="w-16 h-16 rounded-2xl bg-navy flex items-center justify-center mb-6">
                                    <resource.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-navy mb-3 uppercase tracking-tight">{resource.title}</h3>
                                <p className="text-steel font-medium mb-4">{resource.desc}</p>
                                <span className="text-xs font-mono font-black text-olynk uppercase tracking-widest">{resource.type}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OlynkExplained;
