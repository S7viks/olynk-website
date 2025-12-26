import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Simple Header for Customer Development Landing Page
 * 
 * Minimal navigation, focused on the conversation goal.
 */

const SimpleHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    // Track scroll for header styling
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () => {
            setIsScrolled(window.scrollY > 50);
        });
    }

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-sm shadow-md py-3'
                    : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-2"
                    >
                        <span className={`text-2xl font-bold transition-colors ${isScrolled ? 'text-gray-900' : 'text-gray-900'
                            }`}>
                            OLynk
                        </span>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <button
                            onClick={() => scrollToSection('pain-points')}
                            className={`text-sm font-medium transition-colors hover:text-red-600 ${isScrolled ? 'text-gray-700' : 'text-gray-700'
                                }`}
                        >
                            The Problem
                        </button>
                        <button
                            onClick={() => scrollToSection('what-olynk-does')}
                            className={`text-sm font-medium transition-colors hover:text-red-600 ${isScrolled ? 'text-gray-700' : 'text-gray-700'
                                }`}
                        >
                            The Solution
                        </button>
                        <button
                            onClick={() => scrollToSection('faq')}
                            className={`text-sm font-medium transition-colors hover:text-red-600 ${isScrolled ? 'text-gray-700' : 'text-gray-700'
                                }`}
                        >
                            FAQ
                        </button>
                        <button
                            onClick={() => scrollToSection('cta')}
                            className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition-colors text-sm"
                        >
                            Book a Call
                        </button>
                    </nav>

                    {/* Mobile CTA */}
                    <button
                        onClick={() => scrollToSection('cta')}
                        className="md:hidden bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition-colors text-sm"
                    >
                        Book Call
                    </button>
                </div>
            </div>
        </header>
    );
};

export default SimpleHeader;
