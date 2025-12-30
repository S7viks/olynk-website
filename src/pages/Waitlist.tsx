import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import WaitlistForm from '../components/waitlist/WaitlistForm';
import WaitlistMetrics from '../components/waitlist/WaitlistMetrics';

const Waitlist = () => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // If user is authenticated, redirect to home page
        if (!isLoading && user) {
            navigate('/');
        }
    }, [user, isLoading, navigate]);

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olynk"></div>
            </div>
        );
    }

    // If user is authenticated, don't render the waitlist (redirect will happen)
    if (user) {
        return null;
    }

    return (
        <div className="min-h-[80vh] relative z-10">
            <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-navy/5 border border-navy/10 text-xs font-black uppercase tracking-widest text-navy mb-6">
                                Limited Access Beta
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-black text-navy tracking-tightest mb-6">
                                Queue for the <br className="hidden lg:block" />
                                <span className="text-olynk">Operating System.</span>
                            </h1>
                            <p className="text-xl text-steel max-w-2xl mx-auto leading-relaxed">
                                Join the visionary commerce leaders already using Olynk to automate their growth.
                                Secure your spot today and unlock exclusive benefits.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <WaitlistForm />
                        <WaitlistMetrics />
                    </motion.div>

                    {/* Trust / Social Proof */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-20 text-center"
                    >
                        <p className="text-xs font-black text-tan uppercase tracking-widest mb-8">Processing Data For</p>
                        <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale mix-blend-multiply items-center">
                            {/* Simple text placeholders matching the aesthetic */}
                            <span className="font-serif italic font-bold text-3xl text-navy">Shopify</span>
                            <span className="font-mono font-bold text-2xl text-navy tracking-tighter">NETSUITE</span>
                            <span className="font-sans font-black text-3xl text-navy tracking-tight">salesforce</span>
                            <span className="font-serif font-bold text-2xl text-navy">Big<span className="text-olynk">Commerce</span></span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Waitlist;
