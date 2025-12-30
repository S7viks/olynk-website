import { motion } from 'framer-motion';
import { Headphones, Mail, MessageCircle } from 'lucide-react';

const Support = () => {
    return (
        <div className="relative min-h-screen bg-transparent">
            <section className="relative pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-beige rounded-full mb-8 shadow-sm">
                            <Headphones className="w-3 h-3 text-navy" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy font-mono">CUSTOMER_SUPPORT</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-navy mb-6 tracking-tight">Contact Support</h1>
                        <p className="text-xl text-steel font-medium">We're here to help you succeed with Olynk.</p>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Mail, title: "Email Support", desc: "Get help via email within 24 hours.", contact: "info@olynk.com" },
                            { icon: MessageCircle, title: "Live Chat", desc: "Chat with our team in real-time.", contact: "Available 9AM-5PM PT" },
                            { icon: Headphones, title: "Phone Support", desc: "Call us directly for immediate assistance.", contact: "+91 7993359150" }
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl bg-cream border-2 border-beige text-center">
                                <div className="w-16 h-16 rounded-2xl bg-navy flex items-center justify-center mx-auto mb-6">
                                    <item.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-navy mb-4">{item.title}</h3>
                                <p className="text-steel font-medium mb-4">{item.desc}</p>
                                <p className="text-sm font-bold text-olynk">{item.contact}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Support;
