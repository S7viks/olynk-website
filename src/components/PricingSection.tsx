import React, { useState } from 'react';
import { PricingCard } from './PricingCard';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingTiers = [
    {
      name: 'AI Advisor',
      description: 'Perfect for ₹2-5Cr brands (up to 1,000 orders/month)',
      monthlyPrice: 20000,
      annualPrice: 200000, // 2 months free
      originalAnnualPrice: 240000,
      features: [
        { name: 'All 7 AI modules included', included: true },
        { name: 'Daily insights and recommendations', included: true },
        { name: 'WhatsApp automation', included: true },
        { name: 'Basic pattern detection', included: true },
        { name: 'Email support', included: true },
        { name: 'Real-time inventory sync', included: true },
        { name: 'Basic demand forecasting', included: true },
        { name: 'Single warehouse optimization', included: true },
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'secondary' as const,
      isPopular: false,
    },
    {
      name: 'AI+ Growth',
      description: 'Built for ₹5-10Cr brands (up to 5,000 orders/month)',
      monthlyPrice: 35000,
      annualPrice: 350000, // 2 months free
      originalAnnualPrice: 420000,
      features: [
        { name: 'Everything in AI Advisor', included: true },
        { name: 'Advanced demand forecasting', included: true },
        { name: 'Multi-warehouse optimization', included: true },
        { name: 'Custom AI training for your business', included: true },
        { name: 'Priority phone support', included: true },
        { name: 'Advanced analytics dashboard', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Dedicated success manager', included: true },
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'primary' as const,
      isPopular: true,
    },
  ];

  const setupPricing = {
    name: 'Setup & Training',
    description: 'One-time setup fee for AI model customization',
    monthlyPrice: 15000,
    annualPrice: 15000,
    features: [
      { name: 'AI model customization for your specific business', included: true },
      { name: 'Historical data analysis', included: true },
      { name: 'Custom pattern recognition', included: true },
      { name: 'Team training sessions', included: true },
      { name: '30-day optimization guarantee', included: true },
      { name: 'Integration setup and testing', included: true },
      { name: 'Custom workflow configuration', included: true },
      { name: 'Performance baseline establishment', included: true },
    ],
    buttonText: 'Get Started',
    buttonVariant: 'secondary' as const,
    isFree: false,
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            AI-Powered Pricing That Scales With Your Success
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Choose the plan that matches your business size. All plans include our complete AI operations advisor.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                isAnnual ? 'bg-teal-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Save 17%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <PricingCard
              key={index}
              name={tier.name}
              description={tier.description}
              monthlyPrice={tier.monthlyPrice}
              annualPrice={tier.annualPrice}
              originalAnnualPrice={tier.originalAnnualPrice}
              isAnnual={isAnnual}
              features={tier.features}
              buttonText={tier.buttonText}
              buttonVariant={tier.buttonVariant}
              isPopular={tier.isPopular}
            />
          ))}
        </div>

        {/* Setup Pricing */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {setupPricing.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {setupPricing.description}
              </p>
            </div>
            
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹{setupPricing.monthlyPrice.toLocaleString('en-IN')}
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">One-time setup fee</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {setupPricing.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{feature.name}</span>
                </div>
              ))}
            </div>

            <Link
              to="/early-access-form"
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300 focus:ring-opacity-50 shadow-lg block text-center"
            >
              {setupPricing.buttonText}
            </Link>
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-8 border border-teal-200 dark:border-teal-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ROI Calculator
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              For a ₹5Cr brand, OLYNK typically saves:
            </p>
            <div className="grid md:grid-cols-5 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">₹2-3L</div>
                <div className="text-gray-600 dark:text-gray-400">Monthly in prevented stockouts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">₹1.5L</div>
                <div className="text-gray-600 dark:text-gray-400">Monthly in eliminated overselling</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">₹80K</div>
                <div className="text-gray-600 dark:text-gray-400">Monthly in labor costs saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">₹50K</div>
                <div className="text-gray-600 dark:text-gray-400">Monthly in optimized fulfillment</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">₹30K</div>
                <div className="text-gray-600 dark:text-gray-400">Monthly in integration costs</div>
              </div>
            </div>
            <div className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
              Total ROI: 500-700% in first year
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 