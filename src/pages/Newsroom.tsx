import { motion } from 'framer-motion';
import { Newspaper, Calendar } from 'lucide-react';

const Newsroom = () => {
    const news = [
        {
            date: "December 2024",
            title: "Olynk Raises $10M Series A",
            summary: "Led by top-tier VCs to accelerate autonomous commerce platform development.",
            category: "FUNDING"
        },
        {
            date: "November 2024",
            title: "Launching Commerce Intelligence Layer",
            summary: "New product release enables real-time inventory sync across all channels.",
            category: "PRODUCT"
        },
        {
            date: "October 2024",
            title: "Partnership with Major ERP Provider",
            summary: "Strategic integration brings Olynk intelligence to thousands of businesses.",
            category: "PARTNERSHIP"
        }
    ];

    return (
        <div className="relative min-h-screen bg-transparent">
            <section className="relative pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-beige rounded-full mb-8 shadow-sm">
                            <Newspaper className="w-3 h-3 text-navy" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy font-mono">PRESS_RELEASES</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-navy mb-6 tracking-tight">Newsroom</h1>
                        <p className="text-xl text-steel font-medium">Latest updates and announcements from Olynk.</p>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 px-6 bg-white">
                <div className="max-w-5xl mx-auto space-y-8">
                    {news.map((item, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl bg-cream border-2 border-beige hover:border-navy hover:shadow-xl transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-xs font-mono font-black text-olynk uppercase tracking-widest">{item.category}</span>
                                <div className="flex items-center gap-2 text-steel text-sm">
                                    <Calendar className="w-4 h-4" />
                                    <span>{item.date}</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-navy mb-3">{item.title}</h3>
                            <p className="text-steel font-medium leading-relaxed">{item.summary}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Newsroom;
