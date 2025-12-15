import { motion } from 'framer-motion';
import { CTA_CONFIG, CONTACT_INFO } from '../../config/landingPageContent';

/**
 * Final CTA Section - Customer Development Landing Page
 * 
 * Conversation-focused, not conversion-focused.
 * Primary goal: Get founders on a call to learn if this is their problem.
 */

const CTASection = () => {
    const isVideoFirst = CTA_CONFIG.primary.variant === 'videoFirst';
    const ctaContent = CTA_CONFIG.primary[CTA_CONFIG.primary.variant];

    const handlePrimaryCTA = () => {
        // Track CTA click
        if (window.gtag) {
            window.gtag('event', 'cta_click', {
                cta_type: 'final_primary',
                cta_variant: CTA_CONFIG.primary.variant,
                location: 'final_cta_section'
            });
        }

        if (isVideoFirst) {
            // Scroll to demo section
            const demoSection = document.getElementById('demo');
            if (demoSection) {
                demoSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Open calendar
            window.open(ctaContent.calendarUrl, '_blank');
        }
    };

    return (
        <section
            id="cta"
            className="py-20 px-4 bg-gradient-to-br from-red-600 to-red-700 text-white"
            data-section="final-cta"
        >
            <div className="max-w-4xl mx-auto text-center">
                {/* Main Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        {isVideoFirst
                            ? "See How This Actually Works"
                            : "Ready to Stop the Bleeding?"}
                    </h2>
                    <p className="text-xl md:text-2xl mb-12 text-red-100 leading-relaxed max-w-3xl mx-auto">
                        {ctaContent.belowText}
                    </p>
                </motion.div>

                {/* Primary CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                >
                    <button
                        onClick={handlePrimaryCTA}
                        className="bg-white text-red-600 px-10 py-5 rounded-lg text-xl font-bold hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                        {ctaContent.buttonText}
                    </button>
                </motion.div>

                {/* Alternative contact methods */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="space-y-3"
                >
                    <p className="text-red-100 text-sm">
                        Or reach out directly:
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                        <a
                            href={`mailto:${CONTACT_INFO.email}`}
                            className="text-white hover:text-red-100 transition-colors underline"
                            onClick={() => {
                                if (window.gtag) {
                                    window.gtag('event', 'contact_method', {
                                        method: 'email',
                                        location: 'final_cta'
                                    });
                                }
                            }}
                        >
                            {CONTACT_INFO.email}
                        </a>
                        <span className="hidden sm:inline text-red-300">•</span>
                        <a
                            href={`tel:${CONTACT_INFO.phone}`}
                            className="text-white hover:text-red-100 transition-colors underline"
                            onClick={() => {
                                if (window.gtag) {
                                    window.gtag('event', 'contact_method', {
                                        method: 'phone',
                                        location: 'final_cta'
                                    });
                                }
                            }}
                        >
                            {CONTACT_INFO.phone}
                        </a>
                    </div>
                </motion.div>

                {/* Trust Statement */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-12 pt-8 border-t border-red-500"
                >
                    <p className="text-red-100 text-sm max-w-2xl mx-auto">
                        This isn't a sales call. It's a conversation to see if OLynk solves problems you actually have.
                        If it's not a fit, I'll tell you in the first 5 minutes.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
