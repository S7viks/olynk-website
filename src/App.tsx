import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import ProblemSection from './components/Problem';
import HowItWorksSection from './components/HowItWorks';
import SocialProofSection from './components/SocialProof';
import EarlyAccessForm from './components/EarlyAccessForm';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQ';
import FinalCTASection from './components/FinalCTASection';

// Pages
import AboutPage from './pages/About';
import PricingPage from './pages/Pricing';
import BenefitsPage from './pages/Benefits';
import SolutionPreview from './components/SolutionPreview';
import AILearningSystem from './components/AILearningSystem';

function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionPreview />
      <Features /> 
      <SocialProofSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/benefits" element={<BenefitsPage />} />
            <Route path="/early-access-form" element={<EarlyAccessForm />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;