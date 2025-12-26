import { motion } from 'framer-motion';
import { DEMO_CONFIG } from '../../config/landingPageContent';

/**
 * Demo Section - Customer Development Landing Page
 * 
 * Shows the product in action (or placeholder for recording demo later).
 * The "Holy Shit" moment where founders see it working.
 */

const DemoPlaceholder = () => {
    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-12 text-white">
            <div className="max-w-2xl mx-auto text-center space-y-6">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-2xl font-bold mb-4">{DEMO_CONFIG.placeholder.title}</h3>
                <p className="text-gray-300 mb-6">{DEMO_CONFIG.placeholder.description}</p>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left">
                    <ol className="space-y-3">
                        {DEMO_CONFIG.placeholder.steps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                                    {idx + 1}
                                </span>
                                <span className="text-gray-200">{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                    <p className="text-sm text-gray-400 mb-4">
                        Demo video coming soon. Want to see this with your actual data?
                    </p>
                    <button
                        onClick={() => {
                            const ctaSection = document.getElementById('cta');
                            if (ctaSection) {
                                ctaSection.scrollIntoView({ behavior: 'smooth' });
                            }
                            if (window.gtag) {
                                window.gtag('event', 'cta_click', {
                                    cta_type: 'demo_placeholder',
                                    location: 'demo_section'
                                });
                            }
                        }}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
                    >
                        Book a Live Demo
                    </button>
                </div>
            </div>
        </div>
    );
};

const VideoDemo = () => {
    return (
        <div className="relative rounded-lg overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gray-900">
                <iframe
                    src={DEMO_CONFIG.video.url}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="OLynk Demo Video"
                />
            </div>
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                {DEMO_CONFIG.video.duration}
            </div>
        </div>
    );
};

const DemoSection = () => {
    return (
        <section
            id="demo"
            className="py-20 px-4 bg-gray-50"
            data-section="demo"
        >
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        The <span className="text-red-600">"Holy Shit"</span> Moment
                    </h2>
                    <p className="text-xl text-gray-700">
                        Founders don't believe AI claims. They believe their eyes.
                    </p>
                </motion.div>

                {/* Demo Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {DEMO_CONFIG.type === 'placeholder' ? (
                        <DemoPlaceholder />
                    ) : (
                        <VideoDemo />
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default DemoSection;
