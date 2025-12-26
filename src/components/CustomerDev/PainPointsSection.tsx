import { motion } from 'framer-motion';
import { useState } from 'react';
import { PAIN_POINTS } from '../../config/landingPageContent';

/**
 * Pain Points Section - Customer Development Landing Page
 * 
 * Uses authentic founder language to describe real problems.
 * Tracks which pain points resonate most for learning.
 */

interface PainPointCardProps {
    painPoint: typeof PAIN_POINTS[0];
    index: number;
}

const PainPointCard = ({ painPoint, index }: PainPointCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);

        // Track engagement
        if (window.gtag) {
            window.gtag('event', 'pain_point_engagement', {
                pain_point_id: painPoint.id,
                pain_point_title: painPoint.title,
                action: isExpanded ? 'collapse' : 'expand'
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            onClick={handleClick}
            data-pain-point-id={painPoint.id}
        >
            {/* Title */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {painPoint.id}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                        {painPoint.title}
                    </h3>
                </div>
                <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Story */}
            <p className="text-gray-700 leading-relaxed mb-4 italic">
                "{painPoint.story}"
            </p>

            {/* Expandable section */}
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 pt-3 border-t border-gray-200"
                >
                    {/* Impact */}
                    <div className="bg-red-50 border-l-4 border-red-600 p-3 rounded">
                        <p className="text-sm font-semibold text-red-900">
                            💰 {painPoint.impact}
                        </p>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-600 text-sm pl-4 border-l-2 border-gray-300">
                        {painPoint.quote}
                    </blockquote>
                </motion.div>
            )}

            {/* Call to action */}
            <p className="text-gray-500 text-xs mt-3">
                Click to see {isExpanded ? 'less' : 'impact & details'}
            </p>
        </motion.div>
    );
};

const PainPointsSection = () => {
    return (
        <section
            id="pain-points"
            className="py-20 px-4 bg-gray-50"
            data-section="pain-points"
        >
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        The <span className="text-red-600">₹5L Question</span> Every D2C Founder Asks
                    </h2>
                    <p className="text-2xl text-gray-700 font-medium mb-4">
                        "What's About to Go Wrong That I Don't Know About Yet?"
                    </p>
                    <p className="text-gray-600 text-lg">
                        These are the problems silently draining your revenue. Tap each to see the real cost.
                    </p>
                </motion.div>

                {/* Pain Point Cards */}
                <div className="space-y-6">
                    {PAIN_POINTS.map((painPoint, index) => (
                        <PainPointCard
                            key={painPoint.id}
                            painPoint={painPoint}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-700 text-lg mb-4">
                        Sound familiar? Let's talk about how to fix these.
                    </p>
                    <button
                        onClick={() => {
                            const demoSection = document.getElementById('demo');
                            if (demoSection) {
                                demoSection.scrollIntoView({ behavior: 'smooth' });
                            }
                            if (window.gtag) {
                                window.gtag('event', 'cta_click', {
                                    cta_type: 'pain_points_bottom',
                                    location: 'pain_points_section'
                                });
                            }
                        }}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
                    >
                        See How OLynk Solves This
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default PainPointsSection;
