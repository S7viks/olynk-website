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

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

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

// Auth Components
import LoginForm from './components/LoginForm';
import PasswordReset from './pages/PasswordReset';
import UserDashboard from './pages/UserDashboard';
import WaitlistDashboard from './components/WaitlistDashboard';
import MoreInfo from './pages/MoreInfo';

// New Pages
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import Newsroom from './pages/Newsroom';
import Support from './pages/Support';
import ImpactStudies from './pages/ImpactStudies';
import TritaExplained from './pages/TritaExplained';
import Pricing from './pages/Pricing';
import Industries from './pages/Industries';
import TritaImagined from './pages/TritaImagined';
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
import ProtectedRoute from './components/ProtectedRoute';

// Admin Routes (Internal)
import ContactFormDashboard from './components/ContactFormDashboard';
import AdminDashboard from './components/AdminDashboard';
import DatabaseChecker from './components/DatabaseChecker';

// Upload Components
import AvatarUpload from './components/AvatarUpload';

const PageShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative isolate">
      <InteractiveBackground />
      <div className="relative z-10">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <div className="min-h-screen bg-cream">
            <Routes>
              {/* Main Website Routes */}
              <Route
                path="/"
                element={
                  <PageShell>
                    <Home />
                  </PageShell>
                }
              />

              <Route
                path="/platform"
                element={
                  <PageShell>
                    <Platform />
                  </PageShell>
                }
              />

              <Route
                path="/platform/fabric"
                element={
                  <PageShell>
                    <Fabric />
                  </PageShell>
                }
              />
              <Route
                path="/platform/insight"
                element={
                  <PageShell>
                    <Insight />
                  </PageShell>
                }
              />
              <Route
                path="/platform/core"
                element={
                  <PageShell>
                    <Core />
                  </PageShell>
                }
              />
              <Route
                path="/platform/orbit"
                element={
                  <PageShell>
                    <Orbit />
                  </PageShell>
                }
              />

              <Route
                path="/how-it-works"
                element={
                  <PageShell>
                    <HowItWorksPage />
                  </PageShell>
                }
              />
              <Route
                path="/solutions"
                element={
                  <PageShell>
                    <Solutions />
                  </PageShell>
                }
              />
              <Route
                path="/company"
                element={
                  <PageShell>
                    <Company />
                  </PageShell>
                }
              />
              <Route
                path="/request-demo"
                element={
                  <PageShell>
                    <RequestDemo />
                  </PageShell>
                }
              />

              <Route path="/demo" element={<Navigate to="/request-demo" replace />} />

              <Route
                path="/pricing"
                element={
                  <PageShell>
                    <Pricing />
                  </PageShell>
                }
              />

              <Route path="/use-cases" element={<Navigate to="/solutions" replace />} />
              <Route path="/impact-studies" element={<Navigate to="/resources/impact-studies" replace />} />
              <Route path="/olynk-explained" element={<Navigate to="/resources/explained" replace />} />

              <Route
                path="/imagined"
                element={
                  <PageShell>
                    <TritaImagined />
                  </PageShell>
                }
              />

              <Route
                path="/industries"
                element={
                  <PageShell>
                    <Industries />
                  </PageShell>
                }
              />

              <Route
                path="/login"
                element={
                  <PageShell>
                    <LoginForm mode="login" />
                  </PageShell>
                }
              />

              <Route
                path="/signup"
                element={
                  <PageShell>
                    <LoginForm mode="signup" />
                  </PageShell>
                }
              />

              <Route
                path="/more-info"
                element={
                  <ProtectedRoute>
                    <PageShell>
                      <MoreInfo />
                    </PageShell>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/waitlist"
                element={
                  <PageShell>
                    <Waitlist />
                  </PageShell>
                }
              />

              <Route
                path="/reset-password"
                element={
                  <PageShell>
                    <PasswordReset />
                  </PageShell>
                }
              />

              {/* Protected Dashboard Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <PageShell>
                      <WaitlistDashboard />
                    </PageShell>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/user-dashboard"
                element={
                  <ProtectedRoute>
                    <PageShell>
                      <UserDashboard />
                    </PageShell>
                  </ProtectedRoute>
                }
              />

              {/* Industry Vertical Routes */}
              <Route
                path="/industries/:id"
                element={
                  <PageShell>
                    <IndustryDetail />
                  </PageShell>
                }
              />

              {/* New Page Routes */}
              <Route
                path="/about"
                element={
                  <PageShell>
                    <AboutUs />
                  </PageShell>
                }
              />
              <Route
                path="/careers"
                element={
                  <PageShell>
                    <Careers />
                  </PageShell>
                }
              />
              <Route
                path="/newsroom"
                element={
                  <PageShell>
                    <Newsroom />
                  </PageShell>
                }
              />
              <Route
                path="/support"
                element={
                  <PageShell>
                    <Support />
                  </PageShell>
                }
              />
              <Route
                path="/resources/impact-studies"
                element={
                  <PageShell>
                    <ImpactStudies />
                  </PageShell>
                }
              />
              <Route
                path="/resources/explained"
                element={
                  <PageShell>
                    <TritaExplained />
                  </PageShell>
                }
              />
              <Route
                path="/privacy"
                element={
                  <PageShell>
                    <PrivacyPolicy />
                  </PageShell>
                }
              />
              <Route
                path="/terms"
                element={
                  <PageShell>
                    <TermsOfService />
                  </PageShell>
                }
              />

              {/* Admin Routes (Protected) */}
              <Route 
                path="/admin/contact-dashboard" 
                element={
                  <ProtectedRoute requireAdmin>
                    <ContactFormDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/database" 
                element={
                  <ProtectedRoute requireAdmin>
                    <DatabaseChecker />
                  </ProtectedRoute>
                } 
              />

              {/* Avatar Upload Route */}
              <Route
                path="/avatar/upload"
                element={
                  <PageShell>
                    <div className="container mx-auto px-4 py-12">
                      <AvatarUpload />
                    </div>
                  </PageShell>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
