import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';

const Newsroom = () => {
    return (
        <div className="relative min-h-screen bg-transparent flex items-center justify-center">
            <section className="relative px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-beige rounded-full mb-8 shadow-sm">
                            <Newspaper className="w-3 h-3 text-navy" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy font-mono">PRESS_RELEASES</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-navy mb-6 tracking-tight">Newsroom</h1>
                        <p className="text-xl text-steel font-medium">Updates and announcements coming soon.</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Newsroom;
