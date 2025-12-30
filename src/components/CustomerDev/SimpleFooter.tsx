import { CONTACT_INFO } from '../../config/landingPageContent';

/**
 * Simple Footer for Customer Development Landing Page
 * 
 * Minimal design, focused on essential contact info.
 */

const SimpleFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold mb-2">OLynk</h3>
                        <p className="text-gray-400 text-sm">
                            Predictive operations intelligence for high-growth commerce
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-3 text-gray-300">Get in Touch</h4>
                        <div className="space-y-2 text-sm">
                            <a
                                href={`mailto:${CONTACT_INFO.email}`}
                                className="block text-gray-400 hover:text-white transition-colors"
                            >
                                {CONTACT_INFO.email}
                            </a>
                            <a
                                href={`tel:${CONTACT_INFO.phone}`}
                                className="block text-gray-400 hover:text-white transition-colors"
                            >
                                {CONTACT_INFO.phone}
                            </a>
                        </div>
                    </div>

                    {/* Quick Action */}
                    <div>
                        <h4 className="font-semibold mb-3 text-gray-300">Ready to Talk?</h4>
                        <button
                            onClick={() => {
                                const ctaSection = document.getElementById('cta');
                                if (ctaSection) {
                                    ctaSection.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            className="bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-red-700 transition-colors"
                        >
                            Book a Call
                        </button>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-gray-800 text-center">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} OLynk. Built for commerce leaders who are tired of reactive ops.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default SimpleFooter;
