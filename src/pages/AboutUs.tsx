import { motion } from 'framer-motion';
import { Users, Target, Lightbulb, Globe } from 'lucide-react';

const AboutUs = () => {
    return (
        <div className="relative min-h-screen bg-transparent">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-beige rounded-full mb-8 shadow-sm">
                            <Globe className="w-3 h-3 text-navy" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy font-mono">COMPANY_OVERVIEW</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-black text-navy mb-6 tracking-tight">
                            About <span className="text-olynk italic font-serif font-normal">Olynk</span>
                        </h1>

                        <p className="text-xl text-steel font-medium leading-relaxed">
                            We're building the intelligence operating system for autonomous commerce.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Target className="w-6 h-6 text-olynk" />
                                <h2 className="text-4xl font-black text-navy">Our Mission</h2>
                            </div>
                            <p className="text-lg text-steel leading-relaxed mb-6">
                                Olynk exists to eliminate operational friction and unlock autonomous intelligence for modern businesses. We believe that companies shouldn't waste resources on manual coordination between systems—they should focus on growth.
                            </p>
                            <p className="text-lg text-steel leading-relaxed">
                                By creating an irreducible operational layer that sits above existing tools, we enable businesses to execute decisions in real-time with full visibility and control.
                            </p>
                        </div>
                        <div className="aspect-square rounded-[48px] bg-cream border-2 border-beige flex items-center justify-center">
                            <div className="text-center p-12">
                                <div className="text-[120px] font-black text-navy/5 font-mono mb-4">O</div>
                                <p className="text-sm font-mono font-black text-tan uppercase tracking-widest">OPERATIONAL_INTELLIGENCE</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-6 bg-cream">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-black text-navy mb-4">Our Values</h2>
                        <p className="text-lg text-steel">The principles that guide everything we build.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Lightbulb,
                                title: "Clarity Over Complexity",
                                desc: "We build systems that are powerful yet elegant, removing unnecessary abstraction layers."
                            },
                            {
                                icon: Users,
                                title: "Customer Obsession",
                                desc: "Every decision we make starts with understanding our customers' operational challenges."
                            },
                            {
                                icon: Target,
                                title: "Relentless Execution",
                                desc: "We ship fast, iterate quickly, and continuously improve based on real-world feedback."
                            }
                        ].map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl bg-white border-2 border-beige"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-navy flex items-center justify-center mb-6">
                                    <value.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-navy mb-4 uppercase tracking-tight">{value.title}</h3>
                                <p className="text-steel font-medium leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-navy text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">
                        Join Our Mission
                    </h2>
                    <p className="text-lg text-white/80 mb-10">
                        We're hiring engineers, designers, and business leaders who want to reshape commerce operations.
                    </p>
                    <a href="/careers" className="inline-block bg-olynk text-white px-12 py-6 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white hover:text-navy transition-all shadow-2xl">
                        View Open Positions
                    </a>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
