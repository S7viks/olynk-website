import { motion } from 'framer-motion';
import { CAPABILITIES } from '../../config/landingPageContent';

/**
 * What OLynk Does Section - Customer Development Landing Page
 * 
 * No fluff. Clear explanation of the 3 core capabilities.
 * Simple language, real examples.
 */

interface CapabilityCardProps {
    capability: typeof CAPABILITIES[0];
    index: number;
}

const CapabilityCard = ({ capability, index }: CapabilityCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="bg-white border border-gray-200 rounded-lg p-8"
        >
            {/* Number Badge */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {capability.id}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                    {capability.title}
                </h3>
            </div>

            {/* How it works */}
            <div className="mb-6">
                <ul className="space-y-2">
                    {capability.explanation.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <span className="text-red-600 mt-1">•</span>
                            <span>{step}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Real example */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <p className="text-sm text-blue-900">
                    <span className="font-semibold">Real result: </span>
                    {capability.realExample}
                </p>
            </div>
        </motion.div>
    );
};

const WhatOLynkDoes = () => {
    return (
        <section
            id="what-olynk-does"
            className="py-20 px-4 bg-white"
            data-section="what-olynk-does"
        >
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        What OLynk Actually Does
                    </h2>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        OLynk watches your Shopify, inventory, shipping, and ads 24/7.
                        When something's about to go wrong, it tells you—or just fixes it.
                    </p>
                </motion.div>

                {/* Capabilities Grid */}
                <div className="space-y-8">
                    {CAPABILITIES.map((capability, index) => (
                        <CapabilityCard
                            key={capability.id}
                            capability={capability}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom Question */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mt-16 bg-gray-50 border border-gray-200 rounded-lg p-8"
                >
                    <p className="text-xl text-gray-900 font-semibold mb-4">
                        Which of these would you pay for today?
                    </p>
                    <p className="text-gray-600 mb-6">
                        Let's talk about how this works for your specific business
                    </p>
                    <button
                        onClick={() => {
                            const ctaSection = document.getElementById('cta');
                            if (ctaSection) {
                                ctaSection.scrollIntoView({ behavior: 'smooth' });
                            }
                            if (window.gtag) {
                                window.gtag('event', 'cta_click', {
                                    cta_type: 'capabilities_bottom',
                                    location: 'what_olynk_does_section'
                                });
                            }
                        }}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
                    >
                        Book a 15-Minute Call
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default WhatOLynkDoes;
