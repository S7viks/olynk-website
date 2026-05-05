import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const Careers = () => {
    return (
        <div className="relative z-10 min-h-screen bg-transparent flex items-center justify-center">
            <section className="relative px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-beige rounded-full mb-8 shadow-sm">
                            <Briefcase className="w-3 h-3 text-navy" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy font-mono">JOIN_THE_TEAM</span>
                        </div>
                        <h1 className="page-hero-title mb-6">
                            Careers at <span className="page-hero-accent">Olynk</span>
                        </h1>
                        <p className="text-xl text-steel font-medium">
                            Build the future of autonomous commerce operations.
                        </p>
                        <p className="text-sm text-tan font-black uppercase tracking-[0.3em] font-mono mt-8">
                            Openings coming soon
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Careers;
