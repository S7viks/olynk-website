import { motion } from 'framer-motion';
import { useState } from 'react';
import { FAQ_ITEMS } from '../../config/landingPageContent';

/**
 * FAQ Section - Customer Development Landing Page
 * 
 * Addresses real objections upfront.
 * Will populate with questions from actual founder conversations.
 */

interface FAQItemProps {
    faq: typeof FAQ_ITEMS[0];
    index: number;
}

const FAQItem = ({ faq, index }: FAQItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);

        // Track FAQ engagement
        if (window.gtag) {
            window.gtag('event', 'faq_interaction', {
                question: faq.question,
                action: isOpen ? 'close' : 'open'
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="border-b border-gray-200 last:border-b-0"
        >
            <button
                onClick={handleToggle}
                className="w-full py-6 flex items-start justify-between gap-4 text-left hover:bg-gray-50 transition-colors duration-150 px-4 rounded"
            >
                <span className="text-lg font-semibold text-gray-900 flex-1">
                    {faq.question}
                </span>
                <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 mt-1 ${isOpen ? 'rotate-180' : ''
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-6"
                >
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
};

const FAQSection = () => {
    return (
        <section
            id="faq"
            className="py-20 px-4 bg-white"
            data-section="faq"
        >
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-navy mb-4 tracking-tightest">
                        Questions You're Probably Asking
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Real objections from leaders like you
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    {FAQ_ITEMS.map((faq, index) => (
                        <FAQItem key={index} faq={faq} index={index} />
                    ))}
                </div>

                {/* Bottom Note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-12 text-center bg-gray-50 border border-gray-200 rounded-lg p-6"
                >
                    <p className="text-gray-700 mb-4">
                        Have a different question? Let's talk about it.
                    </p>
                    <button
                        onClick={() => {
                            const ctaSection = document.getElementById('cta');
                            if (ctaSection) {
                                ctaSection.scrollIntoView({ behavior: 'smooth' });
                            }
                            if (window.gtag) {
                                window.gtag('event', 'cta_click', {
                                    cta_type: 'faq_bottom',
                                    location: 'faq_section'
                                });
                            }
                        }}
                        className="text-olynk font-black hover:text-navy transition-colors underline uppercase tracking-widest text-xs font-mono"
                    >
                        Book a call to discuss your specific situation
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQSection;
