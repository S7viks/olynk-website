import React, { useState } from 'react';
import { PricingCard } from './PricingCard';
import { Link } from 'react-router-dom';
import { Check, Star, Zap, Crown, ArrowRight, Users, Database, Brain, BarChart3, Zap as ZapIcon, Shield, Clock, Phone, Mail, MessageSquare } from 'lucide-react';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);



  const pricingTiers = [
    {
      name: 'AI Starter',
      description: 'Small D2C brands piloting AI operations',
      monthlyPrice: 10000,
      annualPrice: 96000, // 20% discount
      originalAnnualPrice: 120000,
      features: [
        { name: '2 dashboard user accounts', included: true },
        { name: '1 standard connector (Shopify recommended)', included: true },
        { name: '2,000 monthly AI credits', included: true },
        { name: 'Pre-built operations dashboard', included: true },
        { name: 'Basic SKU-level forecasts (7-14 days)', included: true },
        { name: 'Email alerts for stockouts and low stock', included: true },
        { name: '3 pre-built automation templates', included: true },
        { name: 'Email support (48-72 hour response)', included: true },
      ],
      exclusions: [
        'Custom integrations',
        'Dedicated sandbox',
        'SSO',
        'Custom SLAs',
        'Monthly business reviews',
        'Advanced workflow automations'
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'secondary' as const,
      isPopular: false,
      icon: Zap,
      salesPitch: 'Get AI-led visibility and simple forecasts that stop stockouts and save manual hours — live in a week.',
      setupFee: '₹20k one-time fee',
      sla: 'Best-effort',
      onboarding: '₹20k one-time fee'
    },
    {
      name: 'AI Growth',
      description: 'Growing D2C brands needing automation and stronger SLAs',
      monthlyPrice: 18000,
      annualPrice: 172800, // 20% discount
      originalAnnualPrice: 216000,
      features: [
        { name: '5 dashboard user accounts', included: true },
        { name: 'Up to 3 standard connectors', included: true },
        { name: '7,000 monthly AI credits', included: true },
        { name: 'Custom widgets, saved views, CSV export', included: true },
        { name: 'Multi-week forecasts with lead-time awareness', included: true },
        { name: 'Advanced alert rules (Slack/email/phone routing)', included: true },
        { name: 'Full automation builder (no-code) + webhooks', included: true },
        { name: 'Priority chat + email support (24-48 hours)', included: true },
        { name: 'Shared sandbox environment', included: true },
      ],
      exclusions: [
        'Dedicated CSM (unless purchased)',
        'SSO (available as add-on only)',
        'Custom models (quoted separately)'
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'primary' as const,
      isPopular: true,
      icon: Star,
      salesPitch: 'Automate repeatable ops, reduce working capital with smarter forecasts, and scale with reliable integrations.',
      setupFee: '₹12k or included',
      sla: '99.5%',
      onboarding: '₹12k or included'
    },
    {
      name: 'AI Scale',
      description: 'High-volume/omnichannel brands needing full AI operations support',
      monthlyPrice: 32000,
      annualPrice: 307200, // 20% discount
      originalAnnualPrice: 384000,
      features: [
        { name: '10 dashboard user accounts', included: true },
        { name: 'Unlimited standard connectors', included: true },
        { name: '25,000 monthly AI credits', included: true },
        { name: 'Fully custom dashboards with role-based views', included: true },
        { name: 'Full-horizon forecasting + scenario simulations', included: true },
        { name: 'Enterprise rules engine with SLA-based escalation', included: true },
        { name: 'One complex integration included', included: true },
        { name: 'Priority phone + chat + email (4-8 hour SLA)', included: true },
        { name: 'Dedicated sandbox environment', included: true },
        { name: 'Monthly business reviews included', included: true },
        { name: 'SSO option, SOC2-readiness review', included: true },
      ],
      exclusions: [
        'Custom models and deep product engineering beyond included integration (quoted separately)'
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'secondary' as const,
      isPopular: false,
      icon: Crown,
      salesPitch: 'Enterprise-grade AI operations — shrink working capital, reduce stockouts, and get proactive prescriptive actions with CSM and priority SLA.',
      setupFee: 'Included',
      sla: '99.9% + credits',
      onboarding: 'Included (priority)'
    },
  ];

  const standardConnectors = [
    { category: 'eCommerce', items: ['Shopify', 'WooCommerce', 'BigCommerce'] },
    { category: 'Marketplaces', items: ['Amazon Seller API', 'Flipkart (planned)'] },
    { category: 'Payments', items: ['Razorpay', 'Stripe India', 'PayU'] },
    { category: 'Logistics', items: ['Shiprocket API', '3PL CSV imports'] },
    { category: 'Advertising', items: ['Meta Ads', 'Google Ads'] },
    { category: 'Analytics', items: ['Google Analytics/GA4'] },
    { category: 'Accounting', items: ['Tally', 'QuickBooks', 'Zoho Books (read-only)'] },
    { category: 'Generic', items: ['CSV upload', 'webhook ingestion', 'Zapier connector'] },
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

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
            AI-Powered Pricing That Scales With Your Success
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Choose the plan that matches your potential savings. All plans include our complete AI operations advisor with proven ROI.
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
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-blue-500 focus:ring-offset-2 ${
                isAnnual ? 'bg-red-600 dark:bg-blue-600' : 'bg-gray-200'
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
                
                <div className={`h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 p-8 transition-all duration-300 hover:shadow-xl ${
                  tier.isPopular ? 'border-red-500 dark:border-blue-500' : 'border-gray-200 dark:border-gray-700'
                }`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <IconComponent className={`w-8 h-8 ${tier.isPopular ? 'text-red-500' : 'text-gray-600'}`} />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {tier.name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {tier.description}
                  </p>

                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-700 dark:text-blue-300 italic">
                      "{tier.salesPitch}"
                    </p>
                  </div>
                  
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

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">Setup Fee</span>
                      </div>
                      <span className="text-sm font-bold text-green-700 dark:text-green-300">{tier.setupFee}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Uptime SLA</span>
                      </div>
                      <span className="text-sm font-bold text-blue-700 dark:text-blue-300">{tier.sla}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What's Included:</h4>
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{feature.name}</span>
                      </div>
                    ))}
                  </div>

                  {tier.exclusions && tier.exclusions.length > 0 && (
                    <div className="space-y-3 mb-8">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What's NOT Included:</h4>
                      {tier.exclusions.map((exclusion, exclusionIndex) => (
                        <div key={exclusionIndex} className="flex items-start space-x-3">
                          <div className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 text-center">✕</div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{exclusion}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <a
                    href="https://forms.office.com/r/zd11g2RWDR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 shadow-lg block text-center ${
                      tier.buttonVariant === 'primary' 
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

        {/* Quick Comparison Table */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Quick Comparison Table
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-4 text-left text-base font-semibold text-gray-900 dark:text-white">Feature/Capability</th>
                  <th className="px-6 py-4 text-center text-base font-semibold text-gray-900 dark:text-white">Starter (₹10k/mo)</th>
                  <th className="px-6 py-4 text-center text-base font-semibold text-gray-900 dark:text-white">Growth (₹18k/mo)</th>
                  <th className="px-6 py-4 text-center text-base font-semibold text-gray-900 dark:text-white">Scale (₹32k/mo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-base font-medium text-gray-900 dark:text-white">Included Seats</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">2</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">5</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">10</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-base font-medium text-gray-900 dark:text-white">Standard Connectors</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">1 (Shopify/WooCommerce)</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">3 (eCommerce, ERP, Ads)</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">Unlimited (standard set)</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-base font-medium text-gray-900 dark:text-white">AI Credits/Month</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">2,000</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">7,000</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">25,000</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-base font-medium text-gray-900 dark:text-white">Dashboards</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">Pre-built operations dashboard</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">Custom widgets + saved views</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">Fully custom + exports</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-base font-medium text-gray-900 dark:text-white">Forecasting</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">Basic (7-14 days)</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">Multi-week, multi-warehouse</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">Full horizon + scenarios</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-base font-medium text-gray-900 dark:text-white">Automations</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">3 templates</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">Full automation builder</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">Full + bespoke automations</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-base font-medium text-gray-900 dark:text-white">Support SLA</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">48-72 hrs (email)</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">24-48 hrs (email + chat)</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">4-8 hrs (phone + priority)</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-base font-medium text-gray-900 dark:text-white">Onboarding</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">₹20k one-time fee</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">₹12k or included</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">Included (priority)</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-base font-medium text-gray-900 dark:text-white">API Access</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">Read-only/limited</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">Full API</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">Full API + priority</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-base font-medium text-gray-900 dark:text-white">SLA Uptime</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">Best-effort</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">99.5%</td>
                  <td className="px-6 py-4 text-base text-center text-gray-600 dark:text-gray-300">99.9% + credits</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Standard Connectors Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Standard Connectors List
          </h3>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Included in "Standard Set" across all plans
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {standardConnectors.map((category, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">
                  {category.category}
                </h4>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-gray-600 dark:text-gray-300 text-center">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Seat Management Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Seat Management
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                What is a Seat?
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Unique user account with dashboard access</li>
                <li>• Permanent licensed user (not concurrent sessions)</li>
                <li>• Each seat = one email/login</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-500" />
                Role Types
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><strong>Admin:</strong> Full access, billing, user management, configuration</li>
                <li><strong>Editor:</strong> Create/modify automations, forecasts, reports</li>
                <li><strong>Viewer:</strong> Read-only access to dashboards and reports</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 inline-block">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Additional seats:</strong> ₹700/seat/month (prorated) • Reassignment allowed at no charge
              </p>
            </div>
          </div>
        </div>

        {/* Enterprise Section */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-white">
            <Crown className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-2xl font-bold mb-4 text-white">Enterprise Solution</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              For ₹10Cr+ brands with complex multi-channel operations requiring custom AI solutions and dedicated support.
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

        
      </div>
    </section>
  );
};

export default PricingSection; 