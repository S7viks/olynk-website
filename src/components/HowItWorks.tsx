import React, { useEffect, useState } from 'react';
import { Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
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

    const element = document.getElementById('how-it-works');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      title: 'Connect & Learn',
      description: 'AI analyzes your historical data to understand patterns.',
      delay: '0ms',
    },
    {
      title: 'Train & Validate',
      description: 'We test predictions against your actual business outcomes.',
      delay: '200ms',
    },
    {
      title: 'Deploy & Advise',
      description: 'AI starts giving you daily insights and recommendations.',
      delay: '400ms',
    },
    {
      title: 'Improve & Evolve',
      description: 'System gets smarter about your specific business daily.',
      delay: '600ms',
    },
  ];

  const confidenceTimeline = [
    {
      period: 'Week 1',
      description: 'AI learns your baseline patterns (60% confidence)',
      delay: '0ms',
    },
    {
      period: 'Week 2',
      description: 'Validates predictions against reality (75% confidence)',
      delay: '200ms',
    },
    {
      period: 'Month 1',
      description: 'Fully calibrated to your business (85%+ confidence)',
      delay: '400ms',
    },
    {
      period: 'Month 3',
      description: 'Expert-level insights with seasonal adjustments',
      delay: '600ms',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-teal-200 to-cyan-200 dark:from-teal-800 dark:to-cyan-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-br from-cyan-200 to-teal-200 dark:from-cyan-800 dark:to-teal-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        </div>

        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Your AI Advisor Starts Learning Your{' '}
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent animate-pulse">
              Business in 48 Hours
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover how OLYNK's AI integrates with your business, learns your operations, and delivers actionable insights in just days.
          </p>
        </div>

        {/* AI Setup Process */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">AI Setup Process</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: step.delay }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                  {step.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(100%+0.5rem)] w-[calc(100%-2rem)] h-1 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-50"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Confidence Building */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">AI Confidence Building</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {confidenceTimeline.map((item, index) => (
              <div
                key={index}
                className={`group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: item.delay }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                  {item.period}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link
            to="/early-access-form"
            className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-block flex items-center justify-center space-x-2 group"
          >
            <span>Start Your AI Journey - Book Demo</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;