import React from 'react';
import { ArrowRight, Heart, Mail, Phone, MapPin, ArrowUp, ExternalLink, Sparkles, Zap, Globe, Shield, Send } from 'lucide-react';
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
        top: targetElement.offsetTop - 64,
        behavior: 'smooth',
      });
    } else if (location.pathname !== '/') {
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

  const productLinks = [
    'AI Data Unification Engine',
    'Smart Integration Orchestration', 
    'AI Inventory Intelligence',
    'Smart Order Orchestration',
    'AI Communication Engine',
    'Operations Command Center',
    'Learning & Memory System'
  ];

  const companyLinks = [
    { name: 'About OLYNK', href: '/about' },
    { name: 'AI Technology', href: '/about' },
    { name: 'Customer Success', href: '/about' },
    { name: 'Careers', href: '/about' },
    { name: 'Press Kit', href: '/about' },
    { name: 'Contact', href: '/about' }
  ];

  const resourceLinks = [
    { name: 'AI Insights Blog', href: '/blog' },
    { name: 'D2C Operations Guide', href: '/resources' },
    { name: 'ROI Calculator', href: '/roi-calculator' },
    { name: 'API Documentation', href: '/api-docs' },
    { name: 'Help Center', href: '/help' },
    { name: 'System Status', href: '/status' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#privacy-policy' },
    { name: 'Terms of Service', href: '#terms-of-service' },
    { name: 'Data Processing Agreement', href: '#dpa' },
    { name: 'SOC2 Compliance', href: '#soc2' },
    { name: 'Security Practices', href: '#security' }
  ];

  const contacts = [
    { type: 'email', value: 'Sathvik.chenna@outlook.com', href: 'mailto:Sathvik.chenna@outlook.com' },
    { type: 'phone', value: '+91 799 335 9150', href: 'tel:+917993359150' },
    { type: 'email', value: 'chtarun911@gmail.com', href: 'mailto:chtarun911@gmail.com' },
    { type: 'phone', value: '+91 628 138 8424', href: 'tel:+916281388424' },
    { type: 'email', value: 'aryakrishnakumar971@gmail.com', href: 'mailto:aryakrishnakumar971@gmail.com' },
    { type: 'phone', value: '+91 970 415 0704', href: 'tel:+919704150704' }
  ];

  return (
    <footer 
      className="relative overflow-hidden transition-colors duration-300"
      style={{
        background: `
          linear-gradient(to right, #CD5C5C 1px, transparent 1px),
          linear-gradient(to bottom, #CD5C5C 1px, transparent 1px)
        `,
        backgroundSize: '4rem 4rem, 4rem 4rem',
        backgroundAttachment: 'fixed, fixed'
      }}
    >
      {/* Gradient Overlays */}
      <div className="absolute -top-48 -left-48 w-96 h-96 bg-red-500/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-red-400/10 dark:bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-16 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 dark:from-blue-400 dark:to-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ready to transform your D2C operations with AI? Let's discuss how Olynk can solve your biggest challenges.
          </p>
        </div>
      </div>

      {/* Brand Logos Section */}
      <div className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-12 opacity-60">
            <div className="text-gray-400 font-semibold text-lg">AI Partners</div>
            <div className="text-gray-400 font-semibold text-lg">D2C Leaders</div>
            <div className="text-gray-400 font-semibold text-lg">Tech Stack</div>
            <div className="text-gray-400 font-semibold text-lg">Integration</div>
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-4 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 dark:focus:ring-blue-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-4 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 dark:focus:ring-blue-500 focus:outline-none transition-all"
                  />
                </div>
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-4 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 dark:focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>
              
              <div>
                <textarea
                  rows={6}
                  placeholder="Message"
                  className="w-full px-4 py-4 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 dark:focus:ring-blue-500 focus:outline-none transition-all resize-none"
                ></textarea>
              </div>
              
              <div>
                <button className="bg-gradient-to-r from-red-600 to-red-700 dark:from-blue-600 dark:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:shadow-red-500/25 dark:hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2">
                  <span>Send Message</span>
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 dark:from-blue-600 dark:to-blue-700 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">AI Insights Newsletter</h3>
              <p className="text-red-100 dark:text-blue-100 mb-6 leading-relaxed">
                Get cutting-edge D2C operational strategies and AI insights delivered directly to your inbox. Join 10K+ industry leaders.
              </p>
              
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/30 focus:outline-none transition-all"
                />
                <button className="w-full bg-white text-red-700 dark:text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Phone */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 dark:from-blue-500 dark:to-blue-600 rounded-2xl p-8 text-white text-center shadow-xl">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">+91 799 335 9150</h3>
              <p className="text-red-100 dark:text-blue-100 text-sm">
                Ready to discuss your D2C challenges? Give us a call for immediate assistance.
              </p>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-gray-600 to-gray-700 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 text-white text-center shadow-xl">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">hello@olynk.ai</h3>
              <p className="text-gray-300 text-sm">
                Send us an email for detailed discussions about AI solutions for your business.
              </p>
            </div>

            {/* Location */}
            <div className="bg-gradient-to-br from-gray-600 to-gray-700 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 text-white text-center shadow-xl">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hyderabad, India</h3>
              <p className="text-gray-300 text-sm">
                Based in the heart of India's tech hub, serving D2C brands globally.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 bg-gradient-to-r from-red-600 to-red-700 dark:from-blue-600 dark:to-blue-700 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your D2C Operations?
          </h2>
          <p className="text-red-100 dark:text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join 1,000+ D2C brands using AI to prevent losses and maximize profits. Start your transformation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/early-access-form" 
              className="bg-white text-red-700 dark:text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Early Access
            </Link>
            <Link 
              to="/demo" 
              className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              View Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="relative z-10 bg-gradient-to-r from-red-600 to-red-700 dark:from-blue-600 dark:to-blue-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="/assets/Olynk_Logo.png"
                  alt="Olynk.ai Logo"
                  className="h-8 w-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/32?text=O';
                  }}
                />
                <h3 className="text-xl font-bold">olynk.ai</h3>
              </div>
              <p className="text-red-100 dark:text-blue-100 text-sm mb-4">
                Transforming D2C brands from reactive to proactive with cutting-edge AI solutions.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Hyderabad, Telangana, India</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 799 335 9150</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@olynk.ai</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-red-100 dark:text-blue-100 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="text-red-100 dark:text-blue-100 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/demo" className="text-red-100 dark:text-blue-100 hover:text-white transition-colors">Demo</Link></li>
                <li><Link to="/features" className="text-red-100 dark:text-blue-100 hover:text-white transition-colors">Features</Link></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/early-access-form" className="text-red-100 dark:text-blue-100 hover:text-white transition-colors">Get Early Access</Link></li>
                <li><Link to="/pricing" className="text-red-100 dark:text-blue-100 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/benefits" className="text-red-100 dark:text-blue-100 hover:text-white transition-colors">Benefits</Link></li>
                <li><Link to="#" className="text-red-100 dark:text-blue-100 hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>

            {/* AI Solutions */}
            <div>
              <h4 className="text-lg font-semibold mb-4">AI Solutions</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-red-100 dark:text-blue-100">Data Unification</span></li>
                <li><span className="text-red-100 dark:text-blue-100">Smart Integration</span></li>
                <li><span className="text-red-100 dark:text-blue-100">Inventory Intelligence</span></li>
                <li><span className="text-red-100 dark:text-blue-100">Order Orchestration</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="relative z-10 bg-red-700 dark:bg-blue-800 text-white py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-sm">
              <Heart className="h-4 w-4 text-red-300 dark:text-blue-300 animate-pulse" />
              <span>© 2024 Olynk.ai - Crafted with AI for D2C success</span>
            </div>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <button
                onClick={scrollToTop}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <span className="text-xs font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <span className="text-xs font-bold">t</span>
                </div>
                <div className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <span className="text-xs font-bold">in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;