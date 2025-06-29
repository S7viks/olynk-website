import React from 'react';
import { ArrowRight, Heart, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  interface SmoothScrollEvent extends React.MouseEvent<HTMLAnchorElement, MouseEvent> {}

  interface HandleSmoothScroll {
    (e: SmoothScrollEvent, href: string): void;
  }

  const handleSmoothScroll: HandleSmoothScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 64, // Adjust for header height
        behavior: 'smooth',
      });
    } else if (location.pathname !== '/') {
      // If not on homepage, redirect to homepage and then scroll
      window.location.href = `/#${targetId}`;
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'AI Data Unification Engine', href: '/' },
        { name: 'Smart Integration Orchestration', href: '/' },
        { name: 'AI Inventory Intelligence', href: '/' },
        { name: 'Smart Order Orchestration', href: '/' },
        { name: 'AI Communication Engine', href: '/' },
        { name: 'Operations Command Center', href: '/' },
        { name: 'Learning & Memory System', href: '/' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About OLYNK', href: '/about' },
        { name: 'AI Technology', href: '/about' },
        { name: 'Customer Success', href: '/about' },
        { name: 'Careers', href: '/about' },
        { name: 'Press Kit', href: '/about' },
        { name: 'Contact', href: '/about' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'AI Insights Blog', href: '/blog' },
        { name: 'D2C Operations Guide', href: '/resources' },
        { name: 'ROI Calculator', href: '/roi-calculator' },
        { name: 'API Documentation', href: '/api-docs' },
        { name: 'Help Center', href: '/help' },
        { name: 'System Status', href: '/status' },
      ]
    },
    {
      title: 'Legal & Compliance',
      links: [
        { name: 'Privacy Policy', href: '#privacy-policy' },
        { name: 'Terms of Service', href: '#terms-of-service' },
        { name: 'Data Processing Agreement', href: '#dpa' },
        { name: 'SOC2 Compliance', href: '#soc2' },
        { name: 'Security Practices', href: '#security' },
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-800 dark:border-gray-700">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-400">
                Get the latest AI insights and updates from olynk.ai directly to your inbox.
              </p>
            </div>
            <div className="flex space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              />
              <Link
                to="/early-access-form"
                className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <img
                  src="/assets/Olynk_Logo.png"
                  alt="Olynk.ai Logo"
                  className="h-8 w-8 object-contain"
                  onError={(e) => {
                    console.error('Failed to load logo image at /assets/Olynk_Logo.png');
                    e.currentTarget.src = 'https://via.placeholder.com/32?text=Logo'; // Fallback image
                  }}
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  olynk.ai
                </span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                AI-powered operations advisor that transforms D2C brands from reactive to proactive, enabling success through predictive insights and intelligent automation.
              </p>
              
              {/* Contact Information */}
              <div className="space-y-3 mb-6">
                <a 
                  href="mailto:Sathvik.chenna@outlook.com"
                  className="flex items-center space-x-3 text-gray-400 hover:text-teal-400 transition-colors duration-300"
                >
                  <Mail className="h-5 w-5" />
                  <span>Sathvik.chenna@outlook.com</span>
                </a>
                <a 
                  href="tel:+917993359150"
                  className="flex items-center space-x-3 text-gray-400 hover:text-teal-400 transition-colors duration-300"
                >
                  <Phone className="h-5 w-5" />
                  <span>+91 799 335 9150</span>
                </a>
                <a 
                  href="mailto:chtarun911@gmail.com"
                  className="flex items-center space-x-3 text-gray-400 hover:text-teal-400 transition-colors duration-300"
                >
                  <Mail className="h-5 w-5" />
                  <span>chtarun911@gmail.com</span>
                </a>
                <a 
                  href="tel:+916281388424"
                  className="flex items-center space-x-3 text-gray-400 hover:text-teal-400 transition-colors duration-300"
                >
                  <Phone className="h-5 w-5" />
                  <span>+91 628 138 8424</span>
                </a>
                <a 
                  href="mailto:aryakrishnakumar971@gmail.com"
                  className="flex items-center space-x-3 text-gray-400 hover:text-teal-400 transition-colors duration-300"
                >
                  <Mail className="h-5 w-5" />
                  <span>aryakrishnakumar971@gmail.com</span>
                </a>
                <a 
                  href="tel:+919704150704"
                  className="flex items-center space-x-3 text-gray-400 hover:text-teal-400 transition-colors duration-300"
                >
                  <Phone className="h-5 w-5" />
                  <span>+91 970 415 0704</span>
                </a>
                <a 
                  href="https://www.google.com/maps/place/Beeramguda,+Ramachandrapuram,+Hyderabad,+Telangana+502032/@17.5181866,78.2815874,14z/data=!3m1!4b1!4m6!3m5!1s0x3bcb8d5705342cef:0x26148383d1a7b35c!8m2!3d17.518468!4d78.3038449!16s%2Fm%2F0138g9wy?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-400 hover:text-teal-400 transition-colors duration-300"
                >
                  <MapPin className="h-5 w-5" />
                  <span>Hyderabad, Telangana</span>
                </a>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold mb-6 text-white">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.href.startsWith('#') ? (
                        <a
                          href={link.href}
                          onClick={(e) => handleSmoothScroll(e, link.href)}
                          className="text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center group"
                        >
                          <span>{link.name}</span>
                          <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center group"
                        >
                          <span>{link.name}</span>
                          <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-gray-800 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 text-gray-400 text-sm mb-4 md:mb-0">
              <span>© 2025 Olynk, Inc. All rights reserved.</span>
              <span className="flex items-center">
                Made with <Heart className="h-4 w-4 text-red-500 mx-1 animate-pulse" /> in India
              </span>
            </div>
            <div className="flex space-x-6 text-gray-400 text-sm items-center">
              <a 
                href="#privacy-policy" 
                onClick={(e) => handleSmoothScroll(e, '#privacy-policy')} 
                className="hover:text-teal-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a 
                href="#terms-of-service" 
                onClick={(e) => handleSmoothScroll(e, '#terms-of-service')} 
                className="hover:text-teal-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a 
                href="#cookie-policy" 
                onClick={(e) => handleSmoothScroll(e, '#cookie-policy')} 
                className="hover:text-teal-400 transition-colors duration-300"
              >
                Cookie Policy
              </a>
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <span>Back to Top</span>
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;