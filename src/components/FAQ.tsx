import React, { useEffect, useState } from 'react';
import { ChevronDown, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('faq');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      question: 'How accurate is the AI really?',
      answer: 'Our demand forecasting achieves 85%+ accuracy after 30 days of learning your business. We show confidence scores for every prediction, and you can see our track record in real-time.',
      delay: '0ms',
    },
    {
      question: 'How does AI handle data conflicts between systems?',
      answer: 'Our AI applies your business rules to resolve conflicts automatically. For example, if Shopify shows 50 units but warehouse shows 45, AI uses the more recent/reliable source and updates all systems. You can see exactly how decisions are made.',
      delay: '200ms',
    },
    {
      question: "What if our systems can't integrate?",
      answer: 'We connect to 200+ platforms via APIs, webhooks, and smart data sync. For systems without direct integration, we can set up automated data flows through CSV imports, email parsing, or custom connectors.',
      delay: '400ms',
    },
    {
      question: 'How long does integration setup take?',
      answer: 'Most businesses are fully connected within 48-72 hours. We handle all technical setup while you focus on your business. Our team has integrated with virtually every tool D2C brands use.',
      delay: '600ms',
    },
    {
      question: 'What happens if integration breaks?',
      answer: "AI monitors all connections 24/7 and fixes most issues automatically. If manual intervention is needed, we're alerted immediately and fix within 2 hours. You get real-time status updates throughout.",
      delay: '800ms',
    },
    {
      question: 'What if the AI makes wrong recommendations?',
      answer: 'AI provides reasoning for every suggestion. You approve major actions (like large orders) while routine tasks (like customer updates) happen automatically. We guarantee ₹5L+ value or full refund.',
      delay: '1000ms',
    },
    {
      question: 'How does AI learn our specific business?',
      answer: 'We analyze your historical sales, seasonal patterns, customer behavior, and external factors. The system continuously learns from outcomes and gets smarter about your unique business dynamics.',
      delay: '1200ms',
    },
    {
      question: 'Can we trust AI with customer communication?',
      answer: 'AI personalizes messages based on customer history and behavior patterns. Messages are pre-approved templates with smart customization. You maintain full control and can review before auto-sending.',
      delay: '1400ms',
    },
    {
      question: 'What about data security and privacy?',
      answer: "Enterprise-grade security with end-to-end encryption. Your data trains models specifically for your business and is never shared. We're SOC2 compliant with regular security audits.",
      delay: '1600ms',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-teal-200 to-cyan-200 dark:from-teal-800 dark:to-cyan-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-br from-cyan-200 to-teal-200 dark:from-cyan-800 dark:to-teal-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        </div>

        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Questions From{' '}
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent animate-pulse">
              Smart D2C Founders
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get answers to the most common questions about how OLYNK's AI transforms your D2C operations with precision and reliability.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`mb-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: faq.delay }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-yellow-300 transition-colors duration-300">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-6 w-6 text-teal-600 dark:text-teal-400 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 p-6' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicator */}
        <div className="mt-12 flex justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <Lock className="h-4 w-4" />
            <span>SOC2 Compliant Security</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span>99.8% Uptime Guarantee</span>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a
            href="https://forms.office.com/r/zd11g2RWDR"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-block flex items-center justify-center space-x-2 group"
          >
            <span>Explore OLYNK - Book Demo</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;