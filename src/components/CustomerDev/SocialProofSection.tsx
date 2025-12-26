import { motion } from 'framer-motion';
import { SOCIAL_PROOF } from '../../config/landingPageContent';

/**
 * Social Proof Section - Customer Development Landing Page
 * 
 * Brutally honest social proof.
 * No fake testimonials or stock photos.
 */

const PilotApproach = () => {
    return (
        <div className="max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-gray-200 rounded-lg p-8"
            >
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    {SOCIAL_PROOF.pilotMessage}
                </p>

                <div className="space-y-3">
                    {SOCIAL_PROOF.pilotResults.map((result: string, idx: number) => (
                        <div
                            key={idx}
                            className="flex items-start gap-3 bg-blue-50 border-l-4 border-blue-600 p-4 rounded"
                        >
                            <span className="text-blue-600 font-bold text-lg">•</span>
                            <p className="text-gray-800">{result}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-gray-600 text-sm italic">
                        These are real results from pilot brands. Not polished testimonials. Not marketing speak. Just what's actually happening.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

const TestimonialsApproach = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SOCIAL_PROOF.testimonials.map((testimonial: any, idx: number) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="bg-white border border-gray-200 rounded-lg p-6"
                    >
                        <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                            "{testimonial.quote}"
                        </blockquote>
                        <div className="flex items-center gap-2">
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                                <p className="text-sm text-gray-600">{testimonial.brand}</p>
                            </div>
                            {testimonial.verified && (
                                <div className="flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const SocialProofSection = () => {
    return (
        <section
            id="social-proof"
            className="py-20 px-4 bg-gray-50"
            data-section="social-proof"
        >
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        What's Actually Happening
                    </h2>
                    <p className="text-gray-600 text-lg">
                        No polished marketing testimonials. Just real results.
                    </p>
                </motion.div>

                {/* Social Proof Content */}
                {SOCIAL_PROOF.approach === 'pilot' ? (
                    <PilotApproach />
                ) : (
                    <TestimonialsApproach />
                )}
            </div>
        </section>
    );
};

export default SocialProofSection;
