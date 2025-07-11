import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Founder {
  id: string;
  name: string;
  role: string;
  company: string;
  revenue: string;
  avatar: string;
  stage: 'scaling' | 'struggling' | 'optimizing' | 'growing';
  color: string;
  questions: Array<{
    question: string;
    context: string;
    answer: string;
    metrics?: string;
  }>;
}

const FounderChat = () => {
  const [currentFounder, setCurrentFounder] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('question');

  const founders: Founder[] = [
    {
      id: 'customer1',
      name: 'Customer 1',
      role: 'Founder & CEO',
      company: 'EcoStyle Fashion',
      revenue: '₹2.5Cr',
      avatar: '',
      stage: 'scaling',
      color: 'from-red-500 to-red-600 dark:from-blue-500 dark:to-blue-600',
      questions: [
        {
          question: 'How do I know which products to stock up on before the festive season?',
          context: 'We burned ₹8L last Diwali on overstock while running out of bestsellers',
          answer: 'OLYNK\'s AI analyzes your last 3 years of festive patterns, current trends, and market signals to predict demand with 85%+ accuracy. It tells you exactly what to stock, when to order, and how much inventory to keep.',
          metrics: 'Prevents ₹3-8L in overstock losses + captures ₹5-12L in missed sales'
        },
        {
          question: 'Can AI really predict which customers are about to churn?',
          context: 'Our repeat purchase rate dropped from 45% to 28% and we don\'t know why',
          answer: 'Yes! AI tracks 50+ behavioral signals like browsing patterns, purchase frequency, and engagement drops. It identifies at-risk customers 15-30 days before they typically churn, letting you intervene with personalized retention campaigns.',
          metrics: 'Typically improves retention by 20-35% within 3 months'
        }
      ]
    },
    {
      id: 'customer2',
      name: 'Customer 2',
      role: 'Co-Founder',
      company: 'TechGadget Hub',
      revenue: '₹5.2Cr',
      avatar: '',
      stage: 'struggling',
      color: 'from-red-600 to-red-700 dark:from-blue-600 dark:to-blue-700',
      questions: [
        {
          question: 'We\'re losing ₹2L monthly to stockouts. How does AI prevent this?',
          context: 'Our iPhone cases sell out in 2 days, but phone stands sit for months',
          answer: 'AI continuously monitors your sales velocity, supplier lead times, and seasonal patterns. It automatically triggers reorders at optimal times and redistributes inventory across channels. You\'ll never run out of hot products again.',
          metrics: 'Reduces stockouts by 80%+ = ₹1.5-3L recovered monthly revenue'
        },
        {
          question: 'How does AI handle our 12 different sales channels?',
          context: 'Managing inventory across Amazon, Flipkart, website, and stores is chaos',
          answer: 'AI creates a unified inventory view and automatically allocates stock based on each channel\'s performance, fees, and demand patterns. It moves inventory between channels to maximize profitability and minimize stockouts.',
          metrics: 'Increases overall margin by 15-25% through smart channel allocation'
        }
      ]
    },
    {
      id: 'customer3',
      name: 'Customer 3',
      role: 'Founder',
      company: 'Wellness Naturals',
      revenue: '₹8.5Cr',
      avatar: '',
      stage: 'optimizing',
      color: 'from-red-400 to-red-500 dark:from-blue-400 dark:to-blue-500',
      questions: [
        {
          question: 'Can AI optimize our entire supply chain, not just inventory?',
          context: 'We have 200+ SKUs across 15 categories with complex supplier relationships',
          answer: 'Absolutely! AI optimizes supplier selection, order timing, shipping routes, and warehouse allocation. It considers supplier reliability, seasonal pricing, and logistics costs to minimize your total supply chain cost.',
          metrics: 'Typically reduces supply chain costs by 12-18% = ₹15-25L annual savings'
        },
        {
          question: 'How does AI handle our subscription business with one-time orders?',
          context: 'Managing recurring vs one-time demand patterns is getting complex',
          answer: 'AI separately forecasts subscription renewals, churn, and one-time purchase patterns. It optimizes inventory allocation between subscription fulfillment and marketplace sales, ensuring subscribers never face stockouts while maximizing one-time sales.',
          metrics: 'Improves subscription retention by 15% while boosting one-time sales by 25%'
        }
      ]
    },
    {
      id: 'customer4',
      name: 'Customer 4',
      role: 'CEO',
      company: 'Urban Fitness Co',
      revenue: '₹12Cr',
      avatar: '',
      stage: 'growing',
      color: 'from-red-700 to-red-800 dark:from-blue-700 dark:to-blue-800',
      questions: [
        {
          question: 'We\'re expanding to 3 new cities. How does AI help with location-specific demand?',
          context: 'Each city has different preferences and our expansion budget is ₹50L',
          answer: 'AI analyzes local demographics, competitor presence, seasonal patterns, and social media trends for each city. It recommends which products to launch, optimal pricing, and inventory allocation to maximize your expansion ROI.',
          metrics: 'Increases new market success rate by 60% = ₹20-40L faster break-even'
        },
        {
          question: 'Can AI manage our 25-person team\'s workflow and priorities?',
          context: 'Everyone\'s juggling multiple tasks and we\'re missing deadlines',
          answer: 'AI creates dynamic priority lists based on business impact, deadlines, and team capacity. It automatically reassigns tasks when priorities shift and identifies bottlenecks before they cause delays.',
          metrics: 'Improves team efficiency by 30% = equivalent to hiring 7-8 additional team members'
        }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (animationPhase === 'question' && !isTyping) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setShowAnswer(true);
          setAnimationPhase('answer');
        }, 2000);
      } else if (animationPhase === 'answer') {
        setTimeout(() => {
          setShowAnswer(false);
          setAnimationPhase('question');
          
          // Move to next question or founder
          if (currentQuestion < founders[currentFounder].questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
          } else {
            setCurrentQuestion(0);
            setCurrentFounder((currentFounder + 1) % founders.length);
          }
        }, 5000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentFounder, currentQuestion, animationPhase, isTyping, founders]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      // Cleanup any pending timeouts
    };
  }, []);

  const currentFounderData = founders[currentFounder];
  const currentQuestionData = currentFounderData.questions[currentQuestion];

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'scaling': return <TrendingUp className="w-4 h-4 text-red-500 dark:text-blue-500" />;
      case 'struggling': return <AlertCircle className="w-4 h-4 text-red-600 dark:text-blue-600" />;
      case 'optimizing': return <CheckCircle2 className="w-4 h-4 text-red-400 dark:text-blue-400" />;
      case 'growing': return <ArrowRight className="w-4 h-4 text-red-700 dark:text-blue-700" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom right, #fffbeb, #fef3c7, #fffbeb)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      }}
    >
      {/* Dark mode overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 opacity-0 dark:opacity-100 transition-opacity duration-300" />
      
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#CD5C5C_1px,transparent_1px),linear-gradient(to_bottom,#CD5C5C_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0D3B66_1px,transparent_1px),linear-gradient(to_bottom,#0D3B66_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none"
        style={{
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 dark:bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-400/10 dark:bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="flex -space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 dark:from-blue-500 dark:to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                👩‍💼
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 dark:from-blue-600 dark:to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                👨‍💻
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 dark:from-blue-400 dark:to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                👩‍🔬
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-700 to-red-800 dark:from-blue-700 dark:to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                🏃‍♂️
              </div>
            </div>
            <div className="ml-4 flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 dark:bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-red-600 dark:text-blue-400 font-medium">Live Chat</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
            Questions From Smart D2C Founders
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real conversations with founders at different stages of their D2C journey
          </p>
          <div className="mt-6 flex justify-center items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 dark:bg-blue-500 rounded-full animate-pulse"></div>
              <span>Auto-rotating every 8 seconds</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-600 dark:bg-blue-600 rounded-full"></div>
              <span>Click any founder to interact</span>
            </div>
          </div>
        </div>

        {/* Founder Selector */}
        <div className="flex justify-center mb-12 px-4">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg max-w-full">
            {founders.map((founder, index) => (
              <button
                key={founder.id}
                onClick={() => {
                  setCurrentFounder(index);
                  setCurrentQuestion(0);
                  setShowAnswer(false);
                  setAnimationPhase('question');
                }}
                className={`px-3 sm:px-6 py-3 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  index === currentFounder
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg focus:ring-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 focus:ring-red-300'
                }`}
                aria-label={`Chat with ${founder.name}`}
                role="tab"
                aria-selected={index === currentFounder}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{founder.avatar}</span>
                  <span className="hidden sm:inline text-sm lg:text-base">{founder.name.split(' ')[0]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          {/* Founder Card */}
          <div className={`bg-gradient-to-r ${currentFounderData.color} rounded-2xl p-6 mb-8 text-white shadow-xl`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{currentFounderData.avatar}</div>
                <div>
                  <h3 className="text-xl font-bold">{currentFounderData.name}</h3>
                  <p className="text-white/80">{currentFounderData.role}, {currentFounderData.company}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  {getStageIcon(currentFounderData.stage)}
                  <span className="text-sm uppercase tracking-wide text-white/80">
                    {currentFounderData.stage}
                  </span>
                </div>
                <div className="text-2xl font-bold">{currentFounderData.revenue}</div>
                <div className="text-white/80 text-sm">Annual Revenue</div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 min-h-[400px]">
            {/* Context Message */}
            <div className="mb-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="text-2xl">{currentFounderData.avatar}</div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4 max-w-md">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {currentQuestionData.context}
                  </p>
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{currentFounderData.avatar}</div>
                <div className={`bg-gradient-to-r ${currentFounderData.color} rounded-2xl p-4 max-w-xl text-white`}>
                  <p className="text-lg font-medium">
                    {currentQuestionData.question}
                  </p>
                  {isTyping && (
                    <div className="flex items-center space-x-1 mt-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* AI Response */}
            {showAnswer && (
              <div className="mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 dark:from-blue-500 dark:to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    AI
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 max-w-2xl">
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {currentQuestionData.answer}
                    </p>
                    {currentQuestionData.metrics && (
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <p className="text-green-700 dark:text-green-300 text-sm font-medium">
                          💡 Impact: {currentQuestionData.metrics}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 dark:from-blue-500 dark:to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  AI
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center space-x-2 mb-8">
            {currentFounderData.questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentQuestion
                    ? `bg-gradient-to-r ${currentFounderData.color} shadow-lg`
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl p-8 border border-red-200 dark:border-red-700 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Get Your Questions Answered?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Join our 14-day free trial and see how OLYNK's AI solves your specific challenges
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/early-access-form"
                  className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-red-800 hover:shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-50"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center bg-white dark:bg-gray-800 border-2 border-red-600 text-red-600 dark:text-red-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-50"
                >
                  Book Demo
                  <MessageCircle className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderChat; 