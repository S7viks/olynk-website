import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ProblemSection from './components/D2CSection';
import ContactForm from './components/ContactForm';
import ContactFormDashboard from './components/ContactFormDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminDashboardEnhanced from './components/AdminDashboardEnhanced';
import WaitlistDashboard from './components/WaitlistDashboard';
import WaitlistFunnel from './components/WaitlistFunnel';
import LoginForm from './components/LoginForm';
import DatabaseChecker from './components/DatabaseChecker';
import PricingSection from './components/PricingSection';
import FounderChat from './components/FounderChat';
import FinalCTASection from './components/FinalCTASection';
import checkEnvironmentVariables from './utils/envCheck';

// Pages
import AboutPage from './pages/About';
import PricingPage from './pages/Pricing';
import ContactPage from './pages/Contact';

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    // Handle scroll to pricing section if hash is present
    if (location.hash === '#pricing') {
      const timer = setTimeout(() => {
        const pricingElement = document.getElementById('pricing');
        if (pricingElement) {
          const headerOffset = 80; // Adjust for header height
          const elementPosition = pricingElement.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - headerOffset,
            behavior: 'smooth',
          });
        }
      }, 100); // Small delay to ensure page is loaded
      
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <>
      <Hero />
      <ProblemSection />
      <PricingSection />
      <FounderChat />
      <FinalCTASection />
    </>
  );
}

// Protected Route Component
const ProtectedRoute = ({ children, requireAuth = false }: { children: React.ReactNode; requireAuth?: boolean }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">OLYNK</h1>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Check environment variables (only once)
    if (typeof window !== 'undefined') {
      checkEnvironmentVariables();
    }
    
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">OLYNK</h1>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900 transition-colors duration-300 relative">
            {/* Background Pattern */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#CD5C5C_1px,transparent_1px),linear-gradient(to_bottom,#CD5C5C_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0D3B66_1px,transparent_1px),linear-gradient(to_bottom,#0D3B66_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
            
            {/* Gradient Overlays */}
            <div className="fixed top-0 left-0 w-96 h-96 bg-red-500/10 dark:bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-red-400/10 dark:bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
            
            <div className="relative z-10">
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/waitlist-funnel" element={<WaitlistFunnel />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                
                {/* Dashboard Routes - Protected */}
                <Route path="/dashboard" element={
                  <ProtectedRoute requireAuth={true}>
                    <WaitlistDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute requireAuth={true}>
                    <AdminDashboardEnhanced />
                  </ProtectedRoute>
                } />
                
                {/* Legacy Admin Routes - Protected */}
                <Route path="/admin/contact-dashboard" element={
                  <ProtectedRoute requireAuth={true}>
                    <ContactFormDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute requireAuth={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/database" element={
                  <ProtectedRoute requireAuth={true}>
                    <DatabaseChecker />
                  </ProtectedRoute>
                } />
              </Routes>
              <Footer />
            </div>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;