import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    // Scroll detection for "Frosted Glass" effect
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-cream shadow-sm border-b border-beige py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-[1400px] mx-auto px-4 lg:px-6 flex items-center justify-between">

                {/* LEFT: Brands Identity */}
                <Link to="/" className="flex items-center group">
                    <Logo size="md" />
                </Link>

                {/* CENTER: Navigation Links */}
                <div className="hidden md:flex items-center gap-1">
                    <NavItem title="Product" to="/platform" hasDropdown />
                    <NavItem title="Solutions" to="/solutions" hasDropdown />
                    <NavItem title="How It Works" to="/how-it-works" />
                    <NavItem title="Company" to="/company" />
                </div>

                {/* RIGHT: Actions */}
                <div className="flex items-center gap-6">
                    <Link
                        to="/login"
                        className="text-navy font-medium text-sm hover:text-olynk transition-colors"
                    >
                        Log In
                    </Link>
                    <Link
                        to="/request-demo"
                        className="bg-olynk text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group"
                    >
                        Get a Demo
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

// Helper Component for Nav Items
const NavItem = ({ title, to, hasDropdown = false }: { title: string; to: string; hasDropdown?: boolean }) => {
    return (
        <Link to={to} className="relative group px-4 py-2 cursor-pointer block">
            {/* Hover Pill Background */}
            <div className="absolute inset-0 bg-beige opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-200"></div>

            {/* Text & Icon */}
            <div className="relative flex items-center gap-1 text-navy font-medium text-[15px] font-sans">
                {title}
                {hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 text-tan group-hover:text-olynk transition-colors" />
                )}
            </div>
        </Link>
    );
};

export default Navbar;
