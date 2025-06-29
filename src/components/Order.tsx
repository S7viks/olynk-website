import React, { useState, useEffect } from 'react';
import { Package, Truck, MapPin, Zap, Brain, TrendingUp, Clock, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

const Order: React.FC = () => {
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    const stages = [
      0,    // Initial blank
      500,  // Title appears
      1500, // Subtitle appears (after title typewriter completes)
      2500, // Split screen setup
      3000, // Chaos side appears
      4500, // AI side appears (after chaos typewriter completes)
      6000, // Metrics appear (after AI typewriter completes)
      7500, // Final CTA (after metrics typewriter completes)
    ];

    stages.forEach((delay, index) => {
      setTimeout(() => setAnimationStage(index), delay);
    });
  }, []);

  const TypewriterText = ({ text, delay = 0, className = "", onComplete }: { 
    text: string; 
    delay?: number; 
    className?: string;
    onComplete?: () => void;
  }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (currentIndex < text.length) {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        } else if (!isComplete) {
          setIsComplete(true);
          onComplete?.();
        }
      }, 15 + delay); // Super fast typing - 15ms per character

      return () => clearTimeout(timer);
    }, [currentIndex, text, delay, isComplete, onComplete]);

    return (
      <span className={`${className} inline-block`}>
        {displayText}
        {!isComplete && <span className="animate-pulse">|</span>}
      </span>
    );
  };

  const BouncingIcon = ({ Icon, delay = 0, className = "" }: { Icon: any; delay?: number; className?: string }) => (
    <Icon 
      className={`${className} animate-bounce`}
      style={{ animationDelay: `${delay}ms` }}
    />
  );

  const ChaosOrderFlow = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BouncingIcon Icon={Package} delay={0} className="w-8 h-8 text-red-500" />
        <div className="flex-1 mx-3 h-0.5 bg-red-300 relative overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-transparent animate-pulse"></div>
        </div>
        <BouncingIcon Icon={AlertTriangle} delay={200} className="w-6 h-6 text-yellow-500 animate-spin" />
        <div className="flex-1 mx-3 h-0.5 bg-red-300 relative overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-transparent animate-pulse"></div>
        </div>
        <BouncingIcon Icon={Truck} delay={400} className="w-8 h-8 text-red-600" />
      </div>
    </div>
  );

  const AIOrderFlow = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BouncingIcon Icon={Package} delay={0} className="w-8 h-8 text-teal-500" />
        <ArrowRight className="w-5 h-5 text-teal-400 animate-pulse" />
        <BouncingIcon Icon={Brain} delay={200} className="w-8 h-8 text-emerald-500" />
        <ArrowRight className="w-5 h-5 text-emerald-400 animate-pulse" />
        <BouncingIcon Icon={CheckCircle} delay={400} className="w-6 h-6 text-green-500" />
        <ArrowRight className="w-5 h-5 text-green-400 animate-pulse" />
        <BouncingIcon Icon={Truck} delay={600} className="w-8 h-8 text-green-600" />
      </div>
    </div>
  );

  return (
    <div className="min-h-fit bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50 dark:from-gray-900 dark:via-teal-900 dark:to-emerald-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-12">
        
        {/* Animated Title */}
        <div className={`text-center transition-all duration-500 ${
          animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-8xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
            {animationStage >= 1 && (
              <TypewriterText text="Order Routing Revolution" className="animate-bounce" />
            )}
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 font-medium">
            {animationStage >= 2 && (
              <TypewriterText text="Smart Order Orchestration" />
            )}
          </p>
        </div>

        {/* Split Screen Container */}
        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-700 ${
          animationStage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          
          {/* Chaos Side */}
          <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 border-2 border-red-200 dark:border-red-700 shadow-2xl transition-all duration-700 ${
            animationStage >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="text-center mb-8">
              <h2 className="text-6xl font-bold text-red-600 mb-4 animate-pulse">
                CHAOS
              </h2>
              <div className="text-slate-700 dark:text-gray-400 text-base space-y-2">
                {animationStage >= 4 && (
                  <>
                    <TypewriterText 
                      text="Random warehouse selection causing delays" 
                      className="block text-red-600 dark:text-red-400 font-semibold"
                    />
                    <TypewriterText 
                      text="Frustrated customers and wasted resources" 
                      delay={300}
                      className="block text-orange-600 dark:text-orange-400 font-semibold"
                    />
                    <TypewriterText 
                      text="No optimization, pure luck-based routing" 
                      delay={600}
                      className="block text-yellow-600 dark:text-yellow-400 font-semibold"
                    />
                  </>
                )}
              </div>
            </div>
            
            <div className="space-y-6">
              <ChaosOrderFlow />
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/50 px-4 py-2 rounded-full border-2 border-red-300 dark:border-red-700">
                <Clock className="w-5 h-5 text-red-600 dark:text-red-400" />
                <span className="text-red-700 dark:text-red-300 font-bold text-sm">Avg: 7-12 days</span>
              </div>
            </div>
          </div>

          {/* AI Intelligence Side */}
          <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 border-2 border-teal-200 dark:border-teal-700 shadow-2xl transition-all duration-700 ${
            animationStage >= 5 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="text-center mb-8">
              <h2 className="text-6xl font-bold text-teal-600 mb-4">
                <span className="animate-pulse">AI</span> <span className="text-emerald-600">INTELLIGENCE</span>
              </h2>
              <div className="text-slate-700 dark:text-gray-400 text-base space-y-2">
                {animationStage >= 5 && (
                  <>
                    <TypewriterText 
                      text="Smart decision trees optimize every order" 
                      className="block text-teal-600 dark:text-teal-400 font-semibold"
                    />
                    <TypewriterText 
                      text="Real-time analysis of location & capacity" 
                      delay={300}
                      className="block text-emerald-600 dark:text-emerald-400 font-semibold"
                    />
                    <TypewriterText 
                      text="Predictive routing for maximum efficiency" 
                      delay={600}
                      className="block text-green-600 dark:text-green-400 font-semibold"
                    />
                  </>
                )}
              </div>
            </div>
            
            <div className="space-y-6">
              <AIOrderFlow />
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-teal-100 dark:bg-teal-900/50 px-4 py-2 rounded-full border-2 border-teal-300 dark:border-teal-700">
                <Zap className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span className="text-teal-700 dark:text-teal-300 font-bold text-sm">Avg: 2-3 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Section */}
        <div className={`transition-all duration-700 ${
          animationStage >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600 rounded-3xl p-6 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-5xl font-bold text-white mb-4">
                {animationStage >= 6 && (
                  <TypewriterText text="Performance Metrics" />
                )}
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="w-12 h-12 text-white animate-bounce" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {animationStage >= 6 && (
                    <TypewriterText text="67%" delay={200} />
                  )}
                </div>
                <p className="text-teal-100 dark:text-teal-200 text-base font-semibold">Faster Delivery</p>
              </div>
              
              <div className="text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <Clock className="w-12 h-12 text-white animate-bounce" style={{ animationDelay: '200ms' }} />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {animationStage >= 6 && (
                    <TypewriterText text="5.2" delay={400} />
                  )}
                </div>
                <p className="text-teal-100 dark:text-teal-200 text-base font-semibold">Days Saved Average</p>
              </div>
              
              <div className="text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-white animate-bounce" style={{ animationDelay: '400ms' }} />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {animationStage >= 6 && (
                    <TypewriterText text="94%" delay={600} />
                  )}
                </div>
                <p className="text-teal-100 dark:text-teal-200 text-base font-semibold">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className={`text-center transition-all duration-700 ${
          animationStage >= 7 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-700 dark:to-emerald-700 px-6 py-3 rounded-full text-white font-bold text-lg hover:scale-105 transition-transform cursor-pointer shadow-2xl">
            <Brain className="w-6 h-6 animate-pulse" />
            {animationStage >= 7 && (
              <TypewriterText text="Transform Your Order Routing Today" />
            )}
            <Zap className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;