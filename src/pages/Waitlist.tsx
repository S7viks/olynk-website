import { motion } from 'framer-motion';
import WaitlistForm from '../components/waitlist/WaitlistForm';
import WaitlistMetrics from '../components/waitlist/WaitlistMetrics';

const Waitlist = () => {
    return (
        <div className="min-h-screen relative flex items-center justify-center pt-24 pb-16 overflow-hidden">
            {/* Minimalist Background Elements */}
            <div className="absolute inset-0 bg-cream z-0" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-olynk/10 rounded-full blur-[120px] opacity-70 z-0 pointer-events-none" />
            
            <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12 sm:mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-6"
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-[11px] font-bold uppercase tracking-[0.2em] text-navy">
                                <span className="w-1.5 h-1.5 rounded-full bg-olynk animate-pulse" />
                                Limited Early Access
                            </span>
                            
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-navy tracking-tight leading-[1.1]">
                                Smarter Operations.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy via-olynk to-navy bg-[length:200%_auto] animate-gradient">
                                    Zero Chaos.
                                </span>
                            </h1>
                            
                            <p className="text-lg sm:text-xl text-steel max-w-2xl mx-auto leading-relaxed font-medium">
                                Join an exclusive group of founders running their commerce on AI that actually understands cause and effect.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <WaitlistForm />
                        <WaitlistMetrics />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Waitlist;
