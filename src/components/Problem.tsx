import React, { useEffect, useState } from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AIBrainAnimation from './AIBrainAnimation';
import Scattered from './Scattered';
import Customer from './Customer';
import Integration from './Integration';
import Stock from './Stock';
import OrderProblem from './OrderProblem';
import Patterns from './Patterns';
import { ThemeProvider } from '../contexts/ThemeContext';

const Problem = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isScatteredOpen, setIsScatteredOpen] = useState(false);
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [isIntegrationOpen, setIsIntegrationOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [isOrderProblemOpen, setIsOrderProblemOpen] = useState(false);
  const [isPatternsOpen, setIsPatternsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('problem');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const toggleScattered = () => {
    setIsScatteredOpen(!isScatteredOpen);
  };

  const toggleCustomer = () => {
    setIsCustomerOpen(!isCustomerOpen);
  };

  const toggleIntegration = () => {
    setIsIntegrationOpen(!isIntegrationOpen);
  };

  const toggleStock = () => {
    setIsStockOpen(!isStockOpen);
  };

  const toggleOrderProblem = () => {
    setIsOrderProblemOpen(!isOrderProblemOpen);
  };

  const togglePatterns = () => {
    setIsPatternsOpen(!isPatternsOpen);
  };

  const leftProblems = [
    {
      title: 'Data Chaos Costing You Money',
      description: 'Your inventory shows 45 units on Shopify, 32 on Amazon, 67 on WhatsApp Business, and 23 in your spreadsheet. Which number is real? You oversell, disappoint customers, and lose ₹15K+ in refunds monthly.',
      quote: '"We oversold our bestseller by 23 units because our systems showed different stock levels. Had to refund ₹34K and lost those customers forever." - Priya, Skincare Brand',
      solution: 'AI that creates a single source of truth and keeps all systems perfectly synced in real-time.',
      delay: '0ms',
      offset: '-10px',
      onClick: toggleScattered,
    },
    {
      title: 'Stockouts You Never See Coming',
      description: 'Your bestselling mango chips are selling fast, but you only realize you\'re out of stock when customers start complaining. By then, you\'ve lost ₹2.3L in sales and spent money on ads for unavailable products.',
      quote: '"We lost ₹4L last quarter to surprise stockouts. I had no idea our coconut oil would spike during festival season." - Arjun, Electronics Brand',
      solution: 'AI that predicts demand spikes 7 days ahead and tells you exactly when to reorder.',
      delay: '400ms',
      offset: '0px',
      onClick: toggleStock,
    },
    {
      title: 'Customer Questions You Can\'t Answer Fast Enough',
      description: '"Where\'s my order?" "When will it ship?" "Is this in stock?" You\'re spending 3+ hours daily answering questions your system should handle proactively.',
      quote: '"We get 50+ \'where\'s my order\' messages daily. I hired someone just to answer WhatsApp." - Kavya, Fashion Brand',
      solution: 'AI that predicts customer concerns and sends proactive updates before they ask.',
      delay: '800ms',
      offset: '80px',
      onClick: toggleCustomer,
    },
  ];

  const rightProblems = [
    {
      title: 'Integration Hell Eating Your Time',
      description: 'You\'re switching between 8+ apps daily: Shopify, WhatsApp, Excel, payment dashboards, shipping portals, customer support tools. You spend 3+ hours just moving data between systems.',
      quote: 'Hidden Cost: 20+ hours weekly lost to manual data entry and app switching',
      solution: 'AI that connects everything into one intelligent dashboard that understands your business context.',
      delay: '200ms',
      offset: '100px',
      onClick: toggleIntegration,
    },
    {
      title: 'Orders Going to the Wrong Places',
      description: 'High-value orders get stuck in slow warehouses while regular orders go express. VIP customers get delayed deliveries. You\'re routing blindly instead of intelligently.',
      quote: 'Reality: 23% of D2C brands lose repeat customers due to poor fulfillment decisions',
      solution: 'AI that analyzes every order and routes to the optimal fulfillment center automatically.',
      delay: '600ms',
      offset: '100px',
      onClick: toggleOrderProblem,
    },
    {
      title: 'Patterns You Can\'t See in Your Own Data',
      description: 'Returns spike for certain products, payment failures increase on weekends, inventory moves faster during specific weather—but you\'re flying blind because the patterns are invisible to human analysis.',
      quote: 'Hidden Cost: Brands miss ₹1-3L monthly in optimization opportunities they can\'t see',
      solution: 'AI that spots profitable patterns and explains them in plain language.',
      delay: '1000ms',
      offset: '100px',
      onClick: togglePatterns,
    },
  ];

  return (
    <ThemeProvider>
      <section id="problem" className="py-20 bg-white dark:bg-gray-900 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              The{' '}
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent animate-pulse">
                ₹5L Question
              </span>{' '}
              Every D2C Founder Asks
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              "What's About to Go Wrong That I Don't Know About Yet?" OLYNK's AI uncovers and solves the hidden challenges draining your D2C brand's potential.
            </p>
          </div>

          <div className="relative flex flex-col lg:flex-row gap-8">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-teal-600 to-cyan-600 opacity-50 hidden lg:block"></div>

            <div className="w-full lg:w-1/2">
              {leftProblems.map((problem, index) => (
                <div
                  key={index}
                  className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                  style={{ transitionDelay: problem.delay, marginTop: problem.offset }}
                >
                  <div
                    className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-500 cursor-pointer"
                    onClick={problem.onClick}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 flex items-center justify-center text-white mr-4">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                        {problem.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{problem.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-4">{problem.quote}</p>
                    <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm">
                      <span className="font-bold">What You Need: </span>
                      {problem.solution}
                    </p>
                    <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 flex items-center justify-center text-white transform -translate-y-1/2 z-10 animate-pulse lg:block hidden">
                      <span className="text-xs font-bold leading-none text-center flex items-center justify-center w-full h-full">{index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-1/2">
              {rightProblems.map((problem, index) => (
                <div
                  key={index}
                  className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                  style={{ transitionDelay: problem.delay, marginTop: problem.offset }}
                >
                  <div
                    className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-500 cursor-pointer"
                    onClick={problem.onClick}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 flex items-center justify-center text-white mr-4">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                        {problem.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{problem.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-4">{problem.quote}</p>
                    <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm">
                      <span className="font-bold">What You Need: </span>
                      {problem.solution}
                    </p>
                    <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 flex items-center justify-center text-white transform -translate-y-1/2 z-10 animate-pulse lg:block hidden">
                      <span className="text-xs font-bold leading-none text-center flex items-center justify-center w-full h-full">{index + leftProblems.length + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`text-center mt-16 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link
              to="/early-access-form"
              className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-block flex items-center justify-center space-x-2 group"
            >
              <span>Solve Your Problems with AI - Book Demo</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {isNotificationOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl max-w-lg w-full">
                <button
                  className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  onClick={toggleNotification}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <AIBrainAnimation />
              </div>
            </div>
          )}

          {isScatteredOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl max-w-5xl w-full">
                <button
                  className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  onClick={toggleScattered}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <Scattered />
              </div>
            </div>
          )}

          {isCustomerOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl max-w-4xl w-full">
                <button
                  className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  onClick={toggleCustomer}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <Customer />
              </div>
            </div>
          )}

          {isIntegrationOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl max-w-4xl w-full">
                <button
                  className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  onClick={toggleIntegration}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <Integration />
              </div>
            </div>
          )}

          {isStockOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl max-w-4xl w-full">
                <button
                  className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  onClick={toggleStock}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <Stock isLoaded={true} onClose={toggleStock} />
              </div>
            </div>
          )}

          {isOrderProblemOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl max-w-4xl w-full">
                <button
                  className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  onClick={toggleOrderProblem}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <OrderProblem />
              </div>
            </div>
          )}

          {isPatternsOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl max-w-4xl w-full">
                <button
                  className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  onClick={togglePatterns}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <Patterns />
              </div>
            </div>
          )}
        </div>
      </section>
    </ThemeProvider>
  );
};

export default Problem;