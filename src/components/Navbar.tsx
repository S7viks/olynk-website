import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMobileSection, setActiveMobileSection] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        {
            title: "Platform",
            type: "dropdown",
            items: [
                { name: "Platform Overview", href: "/platform", desc: "Full Architecture" },
                { name: "Olynk Insight", href: "/platform/insight", desc: "Predictive AI" },
                { name: "Olynk Fabric", href: "/platform/fabric", desc: "Unified Data" },
                { name: "Olynk Core", href: "/platform/core", desc: "Decision Intelligence" },
                { name: "Olynk Orbit", href: "/platform/orbit", desc: "Business Logic" },
                { name: "Documentation", href: "/documentation", desc: "API & Guides" }
            ]
        },
        {
            title: "Industries",
            type: "dropdown",
            items: [
                { name: "Commerce", href: "/industries/commerce", desc: "Retail & E-commerce" },
                { name: "Manufacturing", href: "/industries/manufacturing", desc: "Industrial Logic" },
                { name: "Healthcare", href: "/industries/healthcare", desc: "Clinical Precision" },
                { name: "EdTech", href: "/industries/edtech", desc: "Adaptive Learning" }
            ]
        },
        { title: "Solutions", href: "/solutions" },
        { title: "How It Works", href: "/how-it-works" },
        {
            title: "Company",
            type: "dropdown",
            items: [
                { name: "About Us", href: "/about", desc: "Our Mission" },
                { name: "Careers", href: "/careers", desc: "Join the Team" },
                { name: "Newsroom", href: "/newsroom", desc: "Press & Updates" },
                { name: "Contact Support", href: "/support", desc: "Get Help" }
            ]
        },
        {
            title: "Resources",
            type: "dropdown",
            items: [
                { name: "Impact Studies", href: "/resources/impact-studies", desc: "Real Results" },
                { name: "Olynk Explained", href: "/resources/explained", desc: "Deep Dives" },
                { name: "Privacy Policy", href: "/privacy", desc: "Legal Data" },
                { name: "Terms of Service", href: "/terms", desc: "Usage Terms" }
            ]
        }
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen
                ? 'bg-cream shadow-sm border-b border-beige py-3'
                : 'bg-transparent py-5'
                }`}
            onMouseLeave={() => setActiveDropdown(null)}
        >
            <div className="max-w-[1600px] mx-auto px-6 lg:px-10 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center shrink-0 mr-12 block group z-50 gap-3">
                    <Logo size="md" />
                    <span className="text-2xl font-black text-navy tracking-tightest">OLYNK</span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden xl:flex items-center gap-2 flex-1">
                    {navLinks.map((link) => (
                        <div key={link.title} className="relative group/nav">
                            {link.type === 'dropdown' ? (
                                <button
                                    className="flex items-center gap-1.5 px-5 py-2 text-[13px] font-bold text-navy hover:text-olynk uppercase tracking-wide transition-colors"
                                    onMouseEnter={() => setActiveDropdown(link.title)}
                                >
                                    {link.title}
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === link.title ? 'rotate-180' : ''}`} />
                                </button>
                            ) : (
                                <Link
                                    to={link.href!}
                                    className="px-5 py-2 text-[13px] font-bold text-navy hover:text-olynk uppercase tracking-wide transition-colors block"
                                    onMouseEnter={() => setActiveDropdown(null)}
                                >
                                    {link.title}
                                </Link>
                            )}

                            {/* Dropdown Menu */}
                            {link.type === 'dropdown' && activeDropdown === link.title && (
                                <div
                                    className="absolute top-full left-0 w-[240px] pt-4"
                                    onMouseEnter={() => setActiveDropdown(link.title)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <div className="bg-white border border-beige rounded-xl shadow-xl overflow-hidden py-2">
                                        {link.items?.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className="block px-6 py-3 hover:bg-cream/50 transition-colors group/item"
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                <div className="text-[12px] font-bold text-navy group-hover/item:text-olynk transition-colors mb-0.5">
                                                    {item.name}
                                                </div>
                                                <div className="text-[10px] font-medium text-steel/70 leading-tight tracking-wide uppercase">
                                                    {item.desc}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right Actions & Menu Toggle */}
                <div className="flex items-center gap-4 lg:gap-6 ml-auto pl-6 relative z-50">
                    <Link
                        to="/login"
                        className="hidden sm:block text-navy font-bold text-[13px] uppercase tracking-wide hover:text-olynk transition-colors"
                    >
                        Log In
                    </Link>
                    <Link
                        to="/waitlist"
                        className="bg-olynk text-white px-5 lg:px-6 py-2.5 lg:py-3 rounded-full text-[11px] lg:text-[12px] font-black uppercase tracking-widest hover:bg-olynk/90 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                    >
                        <span className="hidden xs:inline">Get a Demo</span>
                        <span className="xs:hidden">Demo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="xl:hidden p-2 text-navy hover:bg-navy/5 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 top-0 bg-cream z-40 xl:hidden pt-24 pb-12 px-6 overflow-y-auto"
                    >
                        <div className="max-w-2xl mx-auto space-y-2">
                            {navLinks.map((link) => (
                                <div key={link.title} className="border-b border-beige py-2">
                                    {link.type === 'dropdown' ? (
                                        <div className="space-y-2">
                                            <button
                                                onClick={() => setActiveMobileSection(activeMobileSection === link.title ? null : link.title)}
                                                className="w-full flex items-center justify-between py-4 text-xl font-black text-navy uppercase tracking-tighter"
                                            >
                                                {link.title}
                                                <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${activeMobileSection === link.title ? 'rotate-180' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {activeMobileSection === link.title && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden bg-white/50 rounded-2xl px-4 py-2 space-y-1"
                                                    >
                                                        {link.items?.map((item) => (
                                                            <Link
                                                                key={item.name}
                                                                to={item.href}
                                                                onClick={() => setIsMenuOpen(false)}
                                                                className="block py-4 border-b border-beige/50 last:border-0"
                                                            >
                                                                <div className="text-base font-bold text-navy">{item.name}</div>
                                                                <div className="text-xs text-tan font-black uppercase tracking-widest">{item.desc}</div>
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            to={link.href!}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block py-6 text-xl font-black text-navy uppercase tracking-tighter"
                                        >
                                            {link.title}
                                        </Link>
                                    )}
                                </div>
                            ))}

                            <div className="pt-8">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block w-full text-center py-4 text-lg font-bold text-navy border-2 border-beige rounded-2xl mb-4"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/waitlist"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block w-full text-center py-5 text-lg font-black text-white bg-olynk rounded-2xl shadow-xl shadow-olynk/20"
                                >
                                    Get a Demo
                                </Link>
                            </div>

                            <div className="pt-12 text-center text-[10px] font-mono font-black text-tan uppercase tracking-[0.3em]">
                                OLYNK_AI // OPERATIONAL_OS_V1.0
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
