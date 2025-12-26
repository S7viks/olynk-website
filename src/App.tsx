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

// Shared Components
import Navbar from './components/Navbar';
import InteractiveBackground from './components/InteractiveBackground';

// Admin Routes (Internal)
import ContactFormDashboard from './components/ContactFormDashboard';
import AdminDashboard from './components/AdminDashboard';
import DatabaseChecker from './components/DatabaseChecker';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
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
