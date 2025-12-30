import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { ChevronRight, ChevronLeft, CheckCircle2, Loader2, Building2, User, Target, Ticket } from 'lucide-react';

const STEPS = [
    { id: 'identity', title: 'Identity', icon: User },
    { id: 'context', title: 'Context', icon: Building2 },
    { id: 'intent', title: 'Intent', icon: Target },
];

type FormData = {
    full_name: string;
    email: string;
    company_name: string;
    website: string;
    company_size: string;
    role: string;
    pain_points: string[];
};

const INITIAL_DATA: FormData = {
    full_name: '',
    email: '',
    company_name: '',
    website: '',
    company_size: '',
    role: '',
    pain_points: [],
};

const PAIN_POINTS = [
    "Inventory Fragmentation",
    "Demand Forecasting",
    "Multi-Channel Sync",
    "Supply Chain Visibility",
    "Manual Data Entry",
    "Other"
];

const COMPANY_SIZES = [
    "1-10", "11-50", "51-200", "201-500", "500+"
];

export default function WaitlistForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState<FormData>(INITIAL_DATA);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateData = (fields: Partial<FormData>) => {
        setData(prev => ({ ...prev, ...fields }));
    };

    const handleNext = () => {
        if (currentStep < 2) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const { error: supabaseError } = await supabase
                .from('waitlist')
                .insert([data]);

            if (supabaseError) throw supabaseError;

            // Simulate email trigger
            console.log('Triggering email for:', data.email);

            setSuccess(true);
        } catch (err: any) {
            console.error('Waitlist error:', err);
            
            // Handle duplicate email error
            if (err.code === '23505' || err.message?.includes('duplicate key') || err.message?.includes('unique constraint')) {
                setError('This email is already registered on our waitlist. Please check your inbox for your confirmation email.');
            } else {
                setError(err.message || 'Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const togglePainPoint = (point: string) => {
        const current = data.pain_points;
        if (current.includes(point)) {
            updateData({ pain_points: current.filter(p => p !== point) });
        } else {
            updateData({ pain_points: [...current, point] });
        }
    };

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/90 backdrop-blur-xl border border-beige rounded-3xl p-8 sm:p-12 shadow-2xl text-center max-w-lg mx-auto"
            >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-black text-navy mb-4">You're on the list.</h2>
                <p className="text-steel mb-8 leading-relaxed">
                    We've secured your spot in the queue. A confirmation email is on its way with your exclusive entry code.
                </p>

                <div className="bg-cream border border-beige rounded-xl p-6 mb-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                        <Ticket className="w-24 h-24 rotate-12" />
                    </div>
                    <p className="text-xs font-black text-tan uppercase tracking-widest mb-2">Early Access Benefit</p>
                    <div className="text-4xl font-black text-olynk mb-1">60% OFF</div>
                    <p className="text-sm text-navy font-bold">First Year Subscription</p>
                </div>

                <button
                    onClick={() => window.location.href = '/'}
                    className="text-navy font-bold hover:text-olynk transition-colors text-sm"
                >
                    Return to Home
                </button>
            </motion.div>
        );
    }

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="h-2 bg-cream w-full">
                <motion.div
                    className="h-full bg-olynk"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / 3) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <div className="p-8 sm:p-12">
                {/* Diagnostics Banner - REMOVE BEFORE PROD */}
                {(!import.meta.env.NEXT_PUBLIC_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL) && (
                    <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-4">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <Loader2 className="w-6 h-6 text-amber-600 animate-spin" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-amber-800 uppercase tracking-widest mb-1">Configuration Pending</h3>
                            <p className="text-sm text-amber-700 font-medium mb-2">
                                The app is not reading your Supabase credentials yet.
                            </p>
                            <div className="text-xs text-amber-800/60 font-mono bg-amber-100/50 p-2 rounded">
                                <strong>Action Required:</strong> Please restart your terminal/server.<br />
                                1. Stop the server (Ctrl+C)<br />
                                2. Run 'npm run dev' again
                            </div>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        {STEPS.map((step, idx) => {
                            const Icon = step.icon;
                            const isActive = currentStep === idx;
                            const isCompleted = currentStep > idx;

                            return (
                                <div key={step.id} className={`flex items-center gap-2 transition-colors ${isActive ? 'text-navy' : isCompleted ? 'text-olynk' : 'text-steel/30'}`}>
                                    <Icon className="w-5 h-5" />
                                    {isActive && <span className="text-xs font-black uppercase tracking-widest">{step.title}</span>}
                                </div>
                            )
                        })}
                    </div>
                    <h2 className="text-3xl font-black text-navy">
                        {currentStep === 0 && "Let's get acquainted."}
                        {currentStep === 1 && "Tell us about your ops."}
                        {currentStep === 2 && "What are you solving?"}
                    </h2>
                </div>

                {/* Steps */}
                <div className="min-h-[300px] relative">
                    <AnimatePresence mode="wait" initial={false}>
                        {currentStep === 0 ? (
                            <motion.div
                                key="identity"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-navy">Full Name</label>
                                    <input
                                        type="text"
                                        value={data.full_name}
                                        onChange={e => updateData({ full_name: e.target.value })}
                                        className="w-full px-5 py-3 rounded-xl bg-cream border-2 border-transparent focus:border-olynk outline-none transition-all font-medium text-navy placeholder:text-navy/30"
                                        placeholder="Jane Doe"
                                        autoFocus
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-navy">Work Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => updateData({ email: e.target.value })}
                                        className="w-full px-5 py-3 rounded-xl bg-cream border-2 border-transparent focus:border-olynk outline-none transition-all font-medium text-navy placeholder:text-navy/30"
                                        placeholder="jane@company.com"
                                    />
                                </div>
                            </motion.div>
                        ) : currentStep === 1 ? (
                            <motion.div
                                key="context"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-navy">Company Name</label>
                                        <input
                                            type="text"
                                            value={data.company_name}
                                            onChange={e => updateData({ company_name: e.target.value })}
                                            className="w-full px-5 py-3 rounded-xl bg-cream border-2 border-transparent focus:border-olynk outline-none transition-all font-medium text-navy"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-navy">Website</label>
                                        <input
                                            type="text"
                                            value={data.website}
                                            onChange={e => updateData({ website: e.target.value })}
                                            className="w-full px-5 py-3 rounded-xl bg-cream border-2 border-transparent focus:border-olynk outline-none transition-all font-medium text-navy"
                                            placeholder="company.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-navy">Company Size</label>
                                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                        {COMPANY_SIZES.map(size => (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => updateData({ company_size: size })}
                                                className={`py-2 px-1 rounded-lg text-sm font-bold transition-all ${data.company_size === size
                                                    ? 'bg-navy text-white shadow-lg'
                                                    : 'bg-cream text-steel hover:bg-beige'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-navy">Your Role</label>
                                    <input
                                        type="text"
                                        value={data.role}
                                        onChange={e => updateData({ role: e.target.value })}
                                        className="w-full px-5 py-3 rounded-xl bg-cream border-2 border-transparent focus:border-olynk outline-none transition-all font-medium text-navy"
                                        placeholder="CTO, Founder, Operations Manager..."
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="intent"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-navy">Primary Pain Points (Select all that apply)</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {PAIN_POINTS.map(point => (
                                            <button
                                                key={point}
                                                type="button"
                                                onClick={() => togglePainPoint(point)}
                                                className={`p-4 rounded-xl text-left text-sm font-bold transition-all border-2 ${data.pain_points.includes(point)
                                                    ? 'border-olynk bg-olynk/5 text-navy'
                                                    : 'border-transparent bg-cream text-steel hover:bg-beige'
                                                    }`}
                                            >
                                                {point}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                        {error}
                    </div>
                )}

                {/* Footer Navigation */}
                <div className="flex items-center justify-between pt-8 border-t border-beige">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className={`flex items-center gap-2 font-bold text-navy transition-opacity ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'hover:opacity-70'
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5" /> Back
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={loading || (currentStep === 0 && (!data.full_name || !data.email))}
                        className="flex items-center gap-3 bg-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-olynk transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <>
                                {currentStep === 2 ? 'Join Waitlist' : 'Next'}
                                <ChevronRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
