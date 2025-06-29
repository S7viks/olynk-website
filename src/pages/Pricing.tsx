import React, { useState, useEffect, useRef } from 'react';
import { PricingCard } from '../components/PricingCard';
import { PricingToggle } from '../components/PricingToggle';
import { Link, useLocation } from 'react-router-dom';

const pricingData = [
  {
    name: 'Freemium',
    description: 'Perfect for early-stage startups exploring AI capabilities',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      { name: 'Limited proactive diagnostics (1 process)', included: true },
      { name: 'AI-generated insights (1 report/week)', included: true },
      { name: '1 data source, 500 data points/month', included: true },
      { name: 'Basic UCDN dashboard, 1 source unification', included: true },
      { name: '1 view-only visual dashboard', included: true },
      { name: 'Basic behavioral analytics, 1 segment', included: true },
      { name: '1 marketing campaign/month (basic template)', included: true },
      { name: 'On-screen reports only (no exports)', included: true },
    ],
    buttonText: 'Get Started Free',
    isFree: true,
  },
  {
    name: 'Starter',
    description: 'For micro-businesses with 1-10 employees',
    monthlyPrice: 2999,
    annualPrice: 32999,
    originalMonthlyPrice: 6000,
    originalAnnualPrice: 72000,
    features: [
      { name: 'Full Proactive Diagnostics', included: true },
      { name: 'Predictive Analytics (1 data source)', included: true },
      { name: 'UCDN (1,000 data points/month, 2 sources)', included: true },
      { name: '2 Users included', included: true },
      { name: 'Basic anomaly detection', included: true },
      { name: 'Email Support', included: true },
      { name: 'Basic Exports', included: true },
      { name: '7-day data history', included: true },
    ],
    buttonText: 'Start Free Trial',
  },
  {
    name: 'Growth',
    description: 'For small businesses with 10-50 employees',
    monthlyPrice: 7499,
    annualPrice: 82499,
    originalMonthlyPrice: 12499,
    originalAnnualPrice: 149988,
    features: [
      { name: 'All Starter features', included: true },
      { name: 'Full UCDN (5 sources, 5,000 points/month)', included: true },
      { name: 'Modular Add-Ons (e.g., inventory optimization)', included: true },
      { name: '5 Users included', included: true },
      { name: 'Customer segmentation & churn prediction', included: true },
      { name: 'Chat + Email Support', included: true },
      { name: 'Custom Reports', included: true },
      { name: '30-day data history', included: true },
    ],
    buttonText: 'Start Free Trial',
    buttonVariant: 'primary' as const,
    isPopular: true,
  },
  {
    name: 'Pro',
    description: 'For medium-sized enterprises with 50-250 employees',
    monthlyPrice: 14999,
    annualPrice: 164999,
    originalMonthlyPrice: 19999,
    originalAnnualPrice: 239988,
    features: [
      { name: 'All Growth features', included: true },
      { name: 'Unlimited Data Sources', included: true },
      { name: '10 Users included', included: true },
      { name: 'Advanced Predictive Analytics', included: true },
      { name: 'API Access for integrations', included: true },
      { name: 'A/B Testing capabilities', included: true },
      { name: 'Personalized recommendation engine', included: true },
      { name: '90-day data history', included: true },
    ],
    buttonText: 'Contact Sales',
  },
];

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/pricing' && pricingRef.current) {
      const headerOffset = 64; // Adjust for header height
      const elementPosition = pricingRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth',
      });
    }
  }, [location.pathname, location.search]);

  return (
    <div ref={pricingRef} className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            Choose the Perfect Plan
            <br />
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              for Your Business
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Select the plan that scales with your needs. Unlock AI capabilities that were 
            previously only available to large enterprises.
          </p>
        </div>

        {/* Pricing Toggle */}
        <PricingToggle isAnnual={isAnnual} onToggle={setIsAnnual} />

        {/* Find Your Ideal Plan Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Find Your Ideal Plan</h2>
          <p className="text-gray-600 dark:text-gray-400">Compare Plans</p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {pricingData.map((plan, index) => (
            <PricingCard
              key={index}
              name={plan.name}
              description={plan.description}
              monthlyPrice={plan.monthlyPrice}
              annualPrice={plan.annualPrice}
              originalMonthlyPrice={plan.originalMonthlyPrice}
              originalAnnualPrice={plan.originalAnnualPrice}
              isAnnual={isAnnual}
              features={plan.features}
              buttonText={plan.buttonText}
              buttonVariant={plan.buttonVariant}
              isPopular={plan.isPopular}
              isFree={plan.isFree}
            />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Need a Custom Solution?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            For enterprise customers with unique requirements, we offer custom solutions 
            tailored to your specific needs and scale.
          </p>
          <Link
            to="/early-access-form"
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300 focus:ring-opacity-50 shadow-lg"
          >
            Contact Enterprise Sales
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Pricing;