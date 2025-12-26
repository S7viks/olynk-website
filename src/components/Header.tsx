/**
 * Header Component - Multi-Page Navigation
 * 
 * Navigation order follows logical evaluation flow:
 * Platform → How It Works → Solutions → Company → Request Demo
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navigation = [
    { name: 'Platform', path: '/platform' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Company', path: '/company' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled
        ? 'bg-white/95 backdrop-blur-sm shadow py-3'
        : 'bg-white py-6'
        }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <Logo size="md" className="transition-all duration-300 group-hover:scale-105" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${isActive(item.path)
                  ? 'text-navy underline underline-offset-8 decoration-2'
                  : 'text-navy/40 hover:text-navy'
                  }`}
              >
                {item.name}
              </Link>
            ))}

            <Link
              to="/request-demo"
              className="bg-navy text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-navy/90 transition-all duration-300 shadow-xl shadow-navy/10 active:scale-95"
            >
              Request Demo
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-navy hover:scale-110 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-8 pb-10 space-y-6 border-t border-beige/40 mt-6 animate-in slide-in-from-top-4 duration-500">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block text-[14px] font-black uppercase tracking-widest ${isActive(item.path)
                  ? 'text-navy'
                  : 'text-navy/40'
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/request-demo"
              className="block bg-navy text-white px-8 py-4 rounded-full text-[12px] font-black uppercase tracking-widest text-center shadow-2xl shadow-navy/20"
            >
              Request Demo
            </Link>
          </div>
        )}
      </div>
    </header >
  );
};

export default Header;
