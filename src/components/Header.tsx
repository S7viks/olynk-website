import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, profile, isAdmin, isWaitlistUser, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    { name: 'Home', href: '/home' },
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2" aria-label="Go to homepage">
            <Logo size="md" />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
              olynk.ai
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-all duration-300 font-medium relative group px-3 py-2 rounded-md ${
                  isActive(item.href)
                    ? 'text-red-600 dark:text-yellow-300'
                    : 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-yellow-300'
                }`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 dark:from-blue-400 dark:to-blue-500 transition-all duration-300 ${
                  isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Theme Toggle & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                )}
                {isWaitlistUser && (
                  <Link
                    to="/dashboard"
                    className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={signOut}
                  className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-yellow-300 transition-colors duration-300 flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-yellow-300 transition-colors duration-300 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/waitlist"
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 group min-h-[44px]"
                  aria-label="Join early access program"
                >
                  <span className="text-sm sm:text-base">Join Early Access</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-yellow-300 transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden absolute top-16 sm:top-18 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg rounded-b-lg border-t border-gray-200 dark:border-gray-700"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block font-medium transition-colors duration-300 px-3 py-3 rounded-md min-h-[44px] flex items-center ${
                    isActive(item.href)
                      ? 'text-red-600 dark:text-yellow-300 bg-red-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-yellow-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <a
                  href="https://forms.office.com/r/zd11g2RWDR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 min-h-[44px] w-full"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Join early access program"
                >
                  <span>Join Early Access</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;