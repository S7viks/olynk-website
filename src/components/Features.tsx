import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Database, Zap, TrendingUp, Truck, MessageSquare, LayoutDashboard, Brain } from 'lucide-react';

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('features');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: 'AI Data Unification Engine',
      subtitle: 'Single Source of Truth That Never Lies',
      description: 'Connects all your systems—Shopify, Amazon, WhatsApp Business, spreadsheets, payment gateways—into one accurate, real-time view.',
      icon: Database,
      gradient: 'from-teal-500 to-cyan-500',
      impact: '99.8% accuracy guarantee',
      delay: '0ms'
    },
    {
      title: 'Smart Integration Orchestration',
      subtitle: 'Your 8 Apps Finally Work as One',
      description: 'AI connects everything—inventory, orders, customers, suppliers, payments, shipping—into one intelligent dashboard.',
      icon: Zap,
      gradient: 'from-cyan-500 to-blue-500',
      impact: '95% reduction in app switching',
      delay: '200ms'
    },
    {
      title: 'AI Inventory Intelligence Engine',
      subtitle: 'Predicts Demand 7 Days Ahead (85% Accuracy)',
      description: 'Analyzes sales patterns, seasonality, and market trends to predict stockouts and optimize reordering.',
      icon: TrendingUp,
      gradient: 'from-blue-500 to-purple-500',
      impact: 'Zero surprise stockouts',
      delay: '400ms'
    },
    {
      title: 'Intelligent Order Orchestration Hub',
      subtitle: 'AI Routes Every Order Optimally',
      description: 'Smart routing engine optimizes fulfillment based on customer location, product type, and shipping costs.',
      icon: Truck,
      gradient: 'from-purple-500 to-pink-500',
      impact: '40% faster delivery',
      delay: '600ms'
    },
    {
      title: 'AI Communication Engine',
      subtitle: 'Smart WhatsApp Automation',
      description: 'Personalizes communication based on purchase history, order status, and predicted customer concerns.',
      icon: MessageSquare,
      gradient: 'from-pink-500 to-red-500',
      impact: '70% fewer support queries',
      delay: '800ms'
    },
    {
      title: 'AI Operations Command Center',
      subtitle: 'Prioritizes Actions by Business Impact',
      description: 'Shows daily actions ranked by AI based on revenue impact, urgency, and effort required.',
      icon: LayoutDashboard,
      gradient: 'from-red-500 to-orange-500',
      impact: '3x more high-impact actions',
      delay: '1000ms'
    },
    {
      title: 'AI Learning & Memory System',
      subtitle: 'Gets Smarter About Your Business Daily',
      description: 'Self-improving system that learns your seasonal patterns, customer preferences, and market dynamics.',
      icon: Brain,
      gradient: 'from-orange-500 to-yellow-500',
      impact: '15+ new optimizations monthly',
      delay: '1200ms'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            7 Ways Our AI Becomes Your{' '}
            <span className="bg-gradient-to-r from-red-600 to-red-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent animate-pulse-smooth" style={{ animationDuration: '3s' }}>
              Smartest Employee
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Meet Your New AI Operations Advisor. Explore how OLYNK transforms your operations with intelligent, actionable insights tailored for ₹2-10Cr D2C brands in India.
          </p>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-6 max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 dark:text-gray-300 font-medium mb-4">
              💡 See the dramatic before/after transformation for each AI capability
            </p>
            <Link
              to="/demo"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Play className="h-5 w-5" />
              <span>Try Interactive Demo</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: feature.delay }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-yellow-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 mb-3">
                  {feature.subtitle}
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 text-sm">
                  {feature.description}
                </p>
                <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-3 mb-4">
                  <p className="text-green-700 dark:text-green-300 font-semibold text-sm">
                    📈 {feature.impact}
                  </p>
                </div>
                <Link
                  to="/demo"
                  className="flex items-center text-teal-600 dark:text-teal-400 font-semibold group-hover:translate-x-2 transition-transform duration-300 text-sm"
                >
                  <span>See Live Demo</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-red-50 via-red-25 to-red-50 dark:from-blue-900/30 dark:via-blue-800/20 dark:to-blue-900/30 rounded-2xl p-8 border border-red-100 dark:border-blue-800/50">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to See Your AI-Powered Future?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Experience the dramatic transformation from chaos to clarity. Each demo shows exactly how AI solves your biggest operational challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demo"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 dark:from-blue-600 dark:to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Play className="h-5 w-5" />
                <span>Experience Interactive Demos</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/early-access-form"
                className="inline-flex items-center space-x-2 border-2 border-red-600 dark:border-blue-400 text-red-600 dark:text-blue-400 px-8 py-4 rounded-full font-bold text-lg hover:bg-red-50 dark:hover:bg-blue-900/20 transition-all duration-300"
              >
                <span>Book Live Demo</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-smooth {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.02); opacity: 0.9; }
        }
        
        .animate-pulse-smooth { 
          animation: pulse-smooth 3s ease-in-out infinite; 
        }
      `}</style>
    </section>
  );
};

export default Features;