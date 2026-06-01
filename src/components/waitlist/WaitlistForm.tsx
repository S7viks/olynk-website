import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../supabase';
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

type FormData = {
    email: string;
    full_name: string;
    company_name: string;
    role: string;
};

const INITIAL_DATA: FormData = {
    email: '',
    full_name: '',
    company_name: '',
    role: '',
};

export default function WaitlistForm() {
    const [step, setStep] = useState<'email' | 'details' | 'success'>('email');
    const [data, setData] = useState<FormData>(INITIAL_DATA);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [insertedId, setInsertedId] = useState<string | null>(null);

    const updateData = (fields: Partial<FormData>) => {
        setData(prev => ({ ...prev, ...fields }));
        if (error) setError(null);
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.email) return;

        setLoading(true);
        setError(null);

        try {
            const { data: result, error: supabaseError } = await supabase
                .from('waitlist')
                .insert([{ email: data.email }])
                .select()
                .single();

            if (supabaseError) throw supabaseError;

            setInsertedId(result.id);
            setStep('details');
        } catch (err: any) {
            console.error('Waitlist error:', err);
            if (err.code === '23505' || err.message?.includes('duplicate key') || err.message?.includes('unique constraint')) {
                setError('This email is already on the waitlist.');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDetailsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setLoading(true);
        try {
            if (insertedId) {
                const { error: supabaseError } = await supabase
                    .from('waitlist')
                    .update({
                        full_name: data.full_name,
                        company_name: data.company_name,
                        role: data.role
                    })
                    .eq('id', insertedId);

                if (supabaseError) throw supabaseError;
            }
            setStep('success');
        } catch (err: any) {
            console.error('Update error:', err);
            // Even if update fails, they are already on the list
            setStep('success'); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <AnimatePresence mode="wait">
                {step === 'email' && (
                    <motion.div
                        key="email-step"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="w-full"
                    >
                        <form onSubmit={handleEmailSubmit} className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-olynk/20 to-navy/20 rounded-2xl blur-xl transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
                            <div className="relative flex items-center bg-noir border border-beige/50 rounded-2xl p-2 shadow-2xl transition-all focus-within:border-olynk/50 focus-within:ring-4 focus-within:ring-olynk/10">
                                <input
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={e => updateData({ email: e.target.value })}
                                    placeholder="Enter your work email..."
                                    className="w-full bg-transparent border-none px-6 py-4 text-navy placeholder:text-steel/50 font-medium outline-none text-lg"
                                />
                                <button
                                    type="submit"
                                    disabled={loading || !data.email}
                                    className="flex items-center justify-center gap-2 bg-navy text-white px-8 py-4 rounded-xl font-bold hover:bg-olynk transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                        <>
                                            Join Now
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                        {error && (
                            <motion.p 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="text-red-500 text-sm mt-4 text-center font-medium"
                            >
                                {error}
                            </motion.p>
                        )}
                    </motion.div>
                )}

                {step === 'details' && (
                    <motion.div
                        key="details-step"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-noir/80 backdrop-blur-xl border border-beige/50 rounded-3xl p-8 sm:p-10 shadow-2xl"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-navy">You're on the list!</h3>
                                <p className="text-sm text-steel">Tell us more to get priority access.</p>
                            </div>
                        </div>

                        <form onSubmit={handleDetailsSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-steel uppercase tracking-wider mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={data.full_name}
                                    onChange={e => updateData({ full_name: e.target.value })}
                                    className="w-full px-5 py-3.5 rounded-xl bg-cream border border-transparent focus:border-olynk outline-none transition-all font-medium text-navy"
                                    placeholder="Jane Doe"
                                    autoFocus
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-steel uppercase tracking-wider mb-2">Company</label>
                                    <input
                                        type="text"
                                        value={data.company_name}
                                        onChange={e => updateData({ company_name: e.target.value })}
                                        className="w-full px-5 py-3.5 rounded-xl bg-cream border border-transparent focus:border-olynk outline-none transition-all font-medium text-navy"
                                        placeholder="Acme Corp"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-steel uppercase tracking-wider mb-2">Role</label>
                                    <input
                                        type="text"
                                        value={data.role}
                                        onChange={e => updateData({ role: e.target.value })}
                                        className="w-full px-5 py-3.5 rounded-xl bg-cream border border-transparent focus:border-olynk outline-none transition-all font-medium text-navy"
                                        placeholder="Founder, CTO..."
                                    />
                                </div>
                            </div>
                            <div className="pt-4 flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 flex items-center justify-center gap-2 bg-navy text-white px-8 py-3.5 rounded-xl font-bold hover:bg-olynk transition-all disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Profile'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep('success')}
                                    className="px-6 py-3.5 rounded-xl font-bold text-steel hover:text-navy transition-colors"
                                >
                                    Skip
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {step === 'success' && (
                    <motion.div
                        key="success-step"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-noir/90 backdrop-blur-xl border border-beige/50 rounded-3xl p-10 sm:p-14 shadow-2xl text-center"
                    >
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                            <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
                            <Sparkles className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-black text-navy mb-4 tracking-tight">Access Secured</h2>
                        <p className="text-steel mb-8 text-lg">
                            Keep an eye on your inbox. We'll be in touch soon.
                        </p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="text-sm font-bold text-navy hover:text-olynk transition-colors underline underline-offset-4"
                        >
                            Return to Home
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
