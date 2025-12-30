import { useState } from 'react';
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingTiers = [
    {
      name: 'AI Starter',
      description: 'Ideal for emerging enterprises ready to leverage AI intelligence',
      monthlyPrice: 10000,
      annualPrice: 96000, // 20% discount
      originalAnnualPrice: 120000,
      orderLimit: '500 orders/month',
      revenueRange: '₹1-2Cr',
      features: [
        { name: 'Core 5 AI modules included', included: true },
        { name: 'Weekly insights and recommendations', included: true },
        { name: 'Basic WhatsApp automation', included: true },
        { name: 'Essential pattern detection', included: true },
        { name: 'Email support', included: true },
        { name: 'Real-time inventory sync', included: true },
        { name: 'Basic demand forecasting', included: true },
        { name: 'Single warehouse optimization', included: true },
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'secondary' as const,
      isPopular: false,
      icon: Zap,
      roiMultiplier: '200-300%',
    },
    {
      name: 'AI Advisor',
      description: 'Built for growing enterprises to scale operations intelligently',
      monthlyPrice: 18000,
      annualPrice: 172800, // 20% discount
      originalAnnualPrice: 216000,
      orderLimit: '1,000 orders/month',
      revenueRange: '₹2-5Cr',
      features: [
        { name: 'All 7 AI modules included', included: true },
        { name: 'Daily insights and recommendations', included: true },
        { name: 'Advanced WhatsApp automation', included: true },
        { name: 'Smart pattern detection', included: true },
        { name: 'Priority email support', included: true },
        { name: 'Real-time inventory sync', included: true },
        { name: 'Advanced demand forecasting', included: true },
        { name: 'Multi-warehouse optimization', included: true },
        { name: 'Custom alerts & notifications', included: true },
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'primary' as const,
      isPopular: true,
      icon: Star,
      roiMultiplier: '300-400%',
    },
    {
      name: 'AI+ Growth',
      description: 'Enterprise-grade AI for sophisticated operations',
      monthlyPrice: 32000,
      annualPrice: 307200, // 20% discount
      originalAnnualPrice: 384000,
      orderLimit: '5,000 orders/month',
      revenueRange: '₹5-10Cr',
      features: [
        { name: 'Everything in AI Advisor', included: true },
        { name: 'Advanced predictive analytics', included: true },
        { name: 'Multi-channel optimization', included: true },
        { name: 'Custom AI training for your business', included: true },
        { name: '24/7 priority phone support', included: true },
        { name: 'Advanced analytics dashboard', included: true },
        { name: 'Custom integrations & API access', included: true },
        { name: 'Dedicated success manager', included: true },
        { name: 'White-label reporting', included: true },
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'secondary' as const,
      isPopular: false,
      icon: Crown,
      roiMultiplier: '400-600%',
    },
  ];

  const setupPricing = {
    name: 'Setup & Training',
    description: 'One-time investment for AI model customization',
    monthlyPrice: 12000,
    annualPrice: 12000,
    features: [
      { name: 'AI model customization for your specific business', included: true },
      { name: 'Historical data analysis & pattern recognition', included: true },
      { name: 'Custom workflow configuration', included: true },
      { name: 'Team training sessions (2-3 sessions)', included: true },
      { name: '30-day optimization guarantee', included: true },
      { name: 'Integration setup and testing', included: true },
      { name: 'Performance baseline establishment', included: true },
      { name: 'Ongoing support for first 30 days', included: true },
    ],
    buttonText: 'Get Started',
    buttonVariant: 'secondary' as const,
    isFree: false,
  };

  const roiStats = [
    { value: 'Up to ₹1.5L', label: 'Monthly in prevented stockouts', color: 'text-green-600' },
    { value: 'Up to ₹80K', label: 'Monthly in reduced overselling', color: 'text-blue-600' },
    { value: 'Up to ₹40K', label: 'Monthly in operational efficiency', color: 'text-purple-600' },
    { value: 'Up to ₹25K', label: 'Monthly in faster fulfillment', color: 'text-orange-600' },
    { value: 'Up to ₹15K', label: 'Monthly in automation savings', color: 'text-red-600' },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-navy mb-6 tracking-tightest">
            AI-Powered Pricing That Scales With Your Success
          </h2>
          <p className="text-xl text-steel mb-8 max-w-3xl mx-auto font-medium">
            Choose the level that matches your operational scale. All plans include our complete AI operations advisor with proven ROI.
          </p>

          {/* Risk Reversal Elements */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-700 dark:text-green-300 text-sm font-medium">30-day money-back guarantee</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-700 dark:text-blue-300 text-sm font-medium">14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-purple-700 dark:text-purple-300 text-sm font-medium">No setup fees until results</span>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-olynk focus:ring-offset-2 ${isAnnual ? 'bg-olynk' : 'bg-beige'
                }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Save 20% with Annual
              </span>
            )}
          </div>


        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => {
            const IconComponent = tier.icon;
            return (
              <div key={index} className={`relative ${tier.isPopular ? 'lg:scale-105' : ''}`}>
                {tier.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 p-8 transition-all duration-300 hover:shadow-xl ${tier.isPopular ? 'border-red-500 dark:border-blue-500' : 'border-gray-200 dark:border-gray-700'
                  }`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <IconComponent className={`w-8 h-8 ${tier.isPopular ? 'text-red-500' : 'text-gray-600'}`} />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {tier.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                    {tier.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        ₹{(isAnnual ? tier.annualPrice / 12 : tier.monthlyPrice).toLocaleString('en-IN')}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">/month</span>
                    </div>
                    {isAnnual && (
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-sm text-gray-500 line-through">
                          ₹{(tier.originalAnnualPrice / 12).toLocaleString('en-IN')}/month
                        </span>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Save ₹{((tier.originalAnnualPrice - tier.annualPrice) / 12).toLocaleString('en-IN')}/month
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 mb-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">{tier.revenueRange}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">{tier.orderLimit}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Expected ROI: {tier.roiMultiplier} in first year
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{feature.name}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://forms.office.com/r/zd11g2RWDR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 shadow-lg block text-center ${tier.buttonVariant === 'primary'
                      ? 'bg-gradient-to-r from-red-500 to-red-600 dark:from-blue-500 dark:to-blue-600 text-white focus:ring-red-300 dark:focus:ring-blue-300'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:border-blue-500'
                      }`}
                  >
                    {tier.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Section */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-white">
            <Crown className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-2xl font-black mb-4">Enterprise Solution</h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto font-medium">
              For high-scale enterprises with complex multi-channel operations requiring custom AI solutions and dedicated support.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
              <span className="bg-gray-700 px-3 py-1 rounded-full">Custom AI Models</span>
              <span className="bg-gray-700 px-3 py-1 rounded-full">Dedicated Infrastructure</span>
              <span className="bg-gray-700 px-3 py-1 rounded-full">24/7 Support Team</span>
              <span className="bg-gray-700 px-3 py-1 rounded-full">Custom Integrations</span>
            </div>
            <a
              href="https://forms.office.com/r/zd11g2RWDR"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              Schedule Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Setup Pricing */}
        <div className="max-w-2xl mx-auto mb-16">
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
              <p className="text-gray-500 dark:text-gray-400 text-sm">One-time investment</p>
              <p className="text-green-600 dark:text-green-400 text-sm font-medium mt-1">
                Typical payback: 3-6 months
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {setupPricing.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{feature.name}</span>
                </div>
              ))}
            </div>

            <a
              href="https://forms.office.com/r/zd11g2RWDR"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-red-500 to-red-600 dark:from-blue-500 dark:to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-blue-300 focus:ring-opacity-50 shadow-lg block text-center"
            >
              {setupPricing.buttonText}
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </a>
          </div>
        </div>

        {/* Enhanced ROI Calculator */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 border border-red-200 dark:border-blue-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ROI Potential Calculator
            </h3>
            <p className="text-steel mb-6 font-bold">
              For a high-growth enterprise, Olynk can potentially save*:
            </p>

            <div className="grid md:grid-cols-5 gap-4 mb-6">
              {roiStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl font-bold ${stat.color} dark:text-yellow-300`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">Up to ₹3.4L</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Savings*</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">300-500%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Potential Annual ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">4-6 months</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Typical Payback</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                *Results vary by business size, complexity, and implementation. These are potential savings based on our experience with similar businesses.
              </div>
            </div>

            <a
              href="https://forms.office.com/r/zd11g2RWDR"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-red-600 dark:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 dark:hover:bg-blue-700 transition-colors"
            >
              Estimate Your Savings
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 