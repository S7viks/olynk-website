import { useState } from 'react';
import { Check, ArrowRight, Database, Brain, Zap, Crown, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingTiers = [
    {
      name: 'Starter',
      tagline: 'For growing commerce brands',
      monthlyPrice: 15000,
      annualPrice: 144000,
      originalAnnualPrice: 180000,
      orderLimit: '1,000 orders/month',
      revenueRange: '₹1–5Cr GMV',
      icon: Database,
      features: [
        'Fabric Layer - unified data from 5 connectors',
        'Insight Layer - weekly intelligence reports',
        'Basic anomaly detection & alerts',
        'WhatsApp notification engine',
        'Single warehouse visibility',
        'Email support (48hr SLA)',
      ],
      cta: 'Start Pilot',
      highlighted: false,
    },
    {
      name: 'Growth',
      tagline: 'For scaled multi-channel operators',
      monthlyPrice: 30000,
      annualPrice: 288000,
      originalAnnualPrice: 360000,
      orderLimit: '5,000 orders/month',
      revenueRange: '₹5–50Cr GMV',
      icon: Brain,
      features: [
        'Everything in Starter',
        'Core Engine - autonomous execution layer',
        'Daily predictive intelligence',
        'Multi-warehouse optimization',
        'Custom approval workflows & audit logs',
        'Demand forecasting (30/60/90-day)',
        'Priority support (12hr SLA)',
        'Dedicated onboarding engineer',
      ],
      cta: 'Start Pilot',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      tagline: 'For ₹50Cr+ complex operations',
      monthlyPrice: null,
      annualPrice: null,
      originalAnnualPrice: null,
      orderLimit: 'Unlimited',
      revenueRange: '₹50Cr+ GMV',
      icon: Crown,
      features: [
        'Everything in Growth',
        'Orbit Layer - custom business logic modules',
        'Custom AI model training on your data',
        'Multi-tenant / multi-BU architecture',
        'Enterprise audit trails',
        'Dedicated success manager',
        'Custom integrations & API access',
        'SLA-backed uptime guarantee',
        '24/7 phone + Slack support',
      ],
      cta: 'Book Scoping Call',
      highlighted: false,
    },
  ];

  const setupFee = {
    price: 20000,
    label: 'One-time setup & training',
    includes: [
      'AI model calibration for your business',
      'Historical data ingestion & pattern mapping',
      'Custom workflow configuration',
      '2–3 team training sessions',
      '30-day optimization guarantee',
    ],
  };

  return (
    <section className="py-16 lg:py-24 bg-cream relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #001B3D 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12 lg:mb-16">
          <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${!isAnnual ? 'text-navy' : 'text-tan'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus-ring ${isAnnual ? 'bg-olynk' : 'bg-beige'}`}
            aria-label="Toggle annual billing"
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
          <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${isAnnual ? 'text-navy' : 'text-tan'}`}>
            Annual
          </span>
          {isAnnual && (
            <span className="text-[10px] font-black text-olynk bg-olynk/10 px-3 py-1 rounded-full uppercase tracking-widest">
              Save 20%
            </span>
          )}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-24">
          {pricingTiers.map((tier) => {
            const IconComponent = tier.icon;
            const price = isAnnual && tier.annualPrice ? tier.annualPrice / 12 : tier.monthlyPrice;
            const originalPrice = isAnnual && tier.originalAnnualPrice ? tier.originalAnnualPrice / 12 : null;

            return (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-3xl border transition-all duration-500 overflow-hidden ${
                  tier.highlighted
                    ? 'border-olynk bg-white shadow-xl lg:scale-[1.03] z-10'
                    : 'border-beige bg-white/60 backdrop-blur-sm hover:shadow-lg hover:border-beige'
                }`}
              >
                {/* Popular badge */}
                {tier.highlighted && (
                  <div className="absolute -top-0 left-0 right-0">
                    <div className="bg-olynk text-white text-center py-2 text-[10px] font-black uppercase tracking-[0.3em]">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`p-8 lg:p-10 flex flex-col flex-1 ${tier.highlighted ? 'pt-14' : ''}`}>
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      tier.highlighted ? 'bg-olynk/10' : 'bg-cream'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${tier.highlighted ? 'text-olynk' : 'text-navy'}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-navy tracking-tight">{tier.name}</h3>
                      <p className="text-xs font-bold text-tan uppercase tracking-widest">{tier.tagline}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-8 pb-8 border-b border-beige/60">
                    {price !== null ? (
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl lg:text-5xl font-black text-navy tracking-tighter">
                            ₹{price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-sm font-bold text-tan">/month</span>
                        </div>
                        {isAnnual && originalPrice && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-tan line-through">
                              ₹{originalPrice.toLocaleString('en-IN')}/mo
                            </span>
                            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Save ₹{(originalPrice - price).toLocaleString('en-IN')}/mo
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-4 pt-2 text-xs font-bold text-steel">
                          <span>{tier.revenueRange}</span>
                          <span className="text-beige">·</span>
                          <span>{tier.orderLimit}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <span className="text-4xl lg:text-5xl font-black text-navy tracking-tighter">Custom</span>
                        <div className="flex items-center gap-4 pt-2 text-xs font-bold text-steel">
                          <span>{tier.revenueRange}</span>
                          <span className="text-beige">·</span>
                          <span>{tier.orderLimit}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={3} />
                        <span className="text-sm text-steel font-medium leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    to="/waitlist"
                    className={`w-full py-4 px-6 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                      tier.highlighted
                        ? 'bg-olynk text-white hover:bg-navy shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                        : 'bg-cream text-navy border-2 border-beige hover:border-navy'
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Setup Fee Strip */}
        <div className="max-w-4xl mx-auto mb-16 lg:mb-24">
          <div className="bg-navy rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute -right-12 -bottom-12 w-40 h-40 opacity-[0.04]">
              <Zap className="w-full h-full" />
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 relative z-10">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em] font-mono">One-Time</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-black tracking-tighter">
                  Setup & Training - <span className="text-white/80">₹{setupFee.price.toLocaleString('en-IN')}</span>
                </h3>
                <p className="text-white/60 text-sm font-medium max-w-lg">
                  {setupFee.label}. Includes AI calibration, data ingestion, team training, and a 30-day optimization guarantee.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:max-w-sm w-full lg:w-auto">
                {setupFee.includes.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" strokeWidth={3} />
                    <span className="text-xs text-white/70 font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Strip */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-16 py-8 border-t border-beige">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-navy" />
              <span className="text-sm font-black text-navy uppercase tracking-wider">Enterprise Security</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-emerald-500" strokeWidth={3} />
              <span className="text-sm font-black text-navy uppercase tracking-wider">30-Day Money-Back</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-olynk" strokeWidth={3} />
              <span className="text-sm font-black text-navy uppercase tracking-wider">14-Day Free Trial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;