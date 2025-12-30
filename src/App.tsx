/**
 * App Component - Main Application Router
 * 
 * v2.0 Navigation Architecture:
 * - Home (/)
 * - Platform (/platform)
 * - How It Works (/how-it-works)
 * - Solutions (/solutions)
 * - Company (/company)
 * - Request Demo (/request-demo)
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

// Layout Components
// Layout Components
import Footer from './components/Footer';

// Main Pages (v2.0)
import Home from './pages/Home';
import Platform from './pages/Platform';
import HowItWorksPage from './pages/HowItWorks';
import Solutions from './pages/Solutions';
import Company from './pages/Company';
import RequestDemo from './pages/RequestDemo';
import Waitlist from './pages/Waitlist';

// New Pages
import Documentation from './pages/Documentation';
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import Newsroom from './pages/Newsroom';
import Support from './pages/Support';
import ImpactStudies from './pages/ImpactStudies';
import OlynkExplained from './pages/OlynkExplained';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Product Pages (The 4 Layers)
import Fabric from './pages/products/Fabric';
import Insight from './pages/products/Insight';
import Core from './pages/products/Core';
import Orbit from './pages/products/Orbit';

// Industry Pages
import IndustryDetail from './pages/industries/IndustryDetail';

// Shared Components
import Navbar from './components/Navbar';
import InteractiveBackground from './components/InteractiveBackground';
import ScrollToTop from './components/ScrollToTop';

// Admin Routes (Internal)
import ContactFormDashboard from './components/ContactFormDashboard';
import AdminDashboard from './components/AdminDashboard';
import DatabaseChecker from './components/DatabaseChecker';

const App = () => {
  return (
    <ThemeProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <div className="min-h-screen bg-cream">
          <Routes>
            {/* Main Website Routes */}
            <Route
              path="/"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <Home />
                  <Footer />
                </div>
              }
            />

            <Route
              path="/platform"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <Platform />
                  <Footer />
                </div>
              }
            />

            <Route
              path="/platform/fabric"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <Fabric />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/platform/insight"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <Insight />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/platform/core"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <Core />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/platform/orbit"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <Orbit />
                  <Footer />
                </div>
              }
            />

            <Route
              path="/how-it-works"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <HowItWorksPage />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/solutions"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <Solutions />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/company"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <Company />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/request-demo"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <RequestDemo />
                  <Footer />
                </div>
              }
            />


            <Route
              path="/login"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-12 rounded-[48px] border border-beige shadow-2xl text-center">
                      <div className="space-y-4">
                        <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto">
                          <span className="text-3xl font-black text-navy tracking-tightest">O</span>
                        </div>
                        <h2 className="text-3xl font-black text-navy tracking-tight">Access Restricted</h2>
                        <p className="text-steel font-medium">The Olynk Console is currently in private preview. Please use the waitlist for early access.</p>
                      </div>
                      <div className="pt-8">
                        <a href="/waitlist" className="block w-full py-4 bg-navy text-white rounded-2xl font-black uppercase tracking-widest hover:bg-olynk transition-all shadow-xl">
                          Join Waitlist
                        </a>
                      </div>
                      <p className="text-[10px] text-tan uppercase tracking-widest font-mono pt-4">// SYSTEM_STATUS: ENCRYPTED</p>
                    </div>
                  </div>
                  <Footer />
                </div>
              }
            />

            <Route
              path="/waitlist"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <Waitlist />
                  <Footer />
                </div>
              }
            />

            {/* Industry Vertical Routes */}
            <Route
              path="/industries/:id"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <IndustryDetail />
                  <Footer />
                </div>
              }
            />

            {/* New Page Routes */}
            <Route
              path="/documentation"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <Documentation />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/about"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <AboutUs />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/careers"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <Careers />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/newsroom"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <Newsroom />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/support"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <Support />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/resources/impact-studies"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <ImpactStudies />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/resources/explained"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <OlynkExplained />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/privacy"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <PrivacyPolicy />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/terms"
              element={
                <div className="relative">
                  <Navbar />
                  <InteractiveBackground />
                  <TermsOfService />
                  <Footer />
                </div>
              }
            />

            {/* Admin Routes (Internal) */}
            <Route path="/admin/contact-dashboard" element={<ContactFormDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/database" element={<DatabaseChecker />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
