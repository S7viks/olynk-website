import { motion } from 'framer-motion';
import { HEADLINES, ACTIVE_HEADLINE, CTA_CONFIG } from '../../config/landingPageContent';

/**
 * Above The Fold - Professional Minimalistic Hero Section
 * 
 * Clean, bold headline with generous whitespace.
 * Single prominent CTA focused on conversion.
 */

const AboveTheFold = () => {
    const headline = HEADLINES[ACTIVE_HEADLINE];
    const cta = CTA_CONFIG.primary[CTA_CONFIG.primary.variant];

    const handleCTAClick = () => {
        if (window.gtag) {
            window.gtag('event', 'cta_click', {
                cta_type: 'primary',
                cta_variant: CTA_CONFIG.primary.variant,
                headline_version: ACTIVE_HEADLINE,
                location: 'above_fold'
            });
        }

        if (CTA_CONFIG.primary.variant === 'videoFirst') {
            const demoSection = document.getElementById('demo');
            if (demoSection) {
                demoSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.open(cta.calendarUrl, '_blank');
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center px-4">
            <div className="container-custom text-center">
                {/* Headline */}
                <motion.h1
                    className="text-balance max-w-4xl mx-auto mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {headline.main}{' '}
                    <span className="text-red-600">
                        {headline.emphasis}
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    className="text-xl max-w-2xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {headline.subheadline}
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <button
                        onClick={handleCTAClick}
                        className="bg-red-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                        {cta.buttonText}
                    </button>
                    <p className="text-sm text-gray-500 mt-4">
                        {cta.belowText}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default AboveTheFold;
