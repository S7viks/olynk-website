/**
 * Footer Component - Site Map & Links
 */

import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream border-t border-beige pt-24 pb-12 relative overflow-hidden">
      {/* Background Subtle Label - Static for Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-20 opacity-[0.05] select-none pointer-events-none flex justify-center z-0">
        <span className="text-[180px] font-black text-tan leading-none tracking-tighter">OLYNK_OS</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          {/* Column 1: Logo + Description */}
          <div className="space-y-6">
            <Link to="/" className="inline-block group">
              <Logo size="sm" className="opacity-100 group-hover:scale-105 transition-all" />
            </Link>
            <p className="text-steel text-sm font-medium leading-relaxed max-w-xs">
              The intelligence operating system for autonomous commerce. Sit on top of your existing tools and execute decisions in real-time.
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="text-[11px] font-black text-navy uppercase tracking-[0.2em] mb-8">Platform</h3>
            <ul className="space-y-4 text-[13px] font-bold">
              <li>
                <Link to="/platform" className="text-steel hover:text-navy transition-all duration-300">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-steel hover:text-navy transition-all duration-300">
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-steel hover:text-navy transition-all duration-300">
                  Our Solutions
                </Link>
              </li>
              <li>
                <Link to="/request-demo" className="text-steel hover:text-navy transition-all duration-300">
                  Get a Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-[11px] font-black text-navy uppercase tracking-[0.2em] mb-8">Company</h3>
            <ul className="space-y-4 text-[13px] font-bold">
              <li>
                <Link to="/company" className="text-steel hover:text-navy transition-all duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <a href="mailto:contact@olynk.ai" className="text-steel hover:text-navy transition-all duration-300">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="mailto:careers@olynk.ai" className="text-steel hover:text-navy transition-all duration-300">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-[11px] font-black text-navy uppercase tracking-[0.2em] mb-8">Legal</h3>
            <ul className="space-y-4 text-[13px] font-bold">
              <li>
                <a href="#" className="text-steel hover:text-navy transition-all duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-steel hover:text-navy transition-all duration-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-steel hover:text-navy transition-all duration-300">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-beige pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <p className="text-[11px] font-black text-tan uppercase tracking-widest">
              © {currentYear} OLYNK_AI. SYSTEM_RUNNING
            </p>
          </div>

          <div className="flex gap-8">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tan hover:text-navy transition-all duration-300"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tan hover:text-navy transition-all duration-300"
              aria-label="Twitter"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
