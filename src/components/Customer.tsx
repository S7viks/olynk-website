import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  HelpCircle, 
  Frown, 
  Clock, 
  User, 
  Brain, 
  Send, 
  Smile,
  TrendingUp,
  Zap
} from 'lucide-react';

const TypewriterText = ({ text, delay = 0, speed = 50, onComplete }: {
  text: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 400);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, speed, onComplete]);

  return (
    <span className="inline-block">
      {displayText}
      {!isComplete && <span className="animate-pulse text-teal-500 dark:text-teal-400">|</span>}
    </span>
  );
};

const BounceIcon = ({ 
  children, 
  delay = 0, 
  className = "",
  onAnimationComplete 
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  onAnimationComplete?: () => void;
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldAnimate(true);
      setTimeout(() => {
        onAnimationComplete?.();
      }, 600);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, onAnimationComplete]);

  return (
    <div className={`${className} ${shouldAnimate ? 'animate-bounce' : 'opacity-0'} transition-all duration-500 ease-out`}>
      {children}
    </div>
  );
};

const TraditionalFlow = ({ startAnimation, globalStep }: { startAnimation: boolean; globalStep: number }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-red-400 dark:border-red-500 transform transition-all duration-500">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Traditional Reactive</h3>
      </div>

      <div className="space-y-4">
        {/* Step 1 */}
        <div className="flex items-center space-x-3 min-h-[50px]">
          {globalStep >= 1 && (
            <BounceIcon delay={0}>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </BounceIcon>
          )}
          {globalStep >= 1 && (
            <div className="flex-1">
              <TypewriterText 
                text="Customer has question" 
                delay={200}
                speed={40}
              />
            </div>
          )}
        </div>

        {/* Step 2 */}
        <div className="flex items-center space-x-3 min-h-[50px]">
          {globalStep >= 2 && (
            <BounceIcon delay={0}>
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </BounceIcon>
          )}
          {globalStep >= 2 && (
            <div className="flex-1">
              <TypewriterText 
                text="Gets confused" 
                delay={200}
                speed={40}
              />
            </div>
          )}
        </div>

        {/* Step 3 */}
        <div className="flex items-center space-x-3 min-h-[50px]">
          {globalStep >= 3 && (
            <BounceIcon delay={0}>
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <Frown className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
            </BounceIcon>
          )}
          {globalStep >= 3 && (
            <div className="flex-1">
              <TypewriterText 
                text="Sends angry message" 
                delay={200}
                speed={40}
              />
            </div>
          )}
        </div>

        {/* Step 4 */}
        <div className="flex items-center space-x-3 min-h-[50px]">
          {globalStep >= 4 && (
            <BounceIcon delay={0}>
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
            </BounceIcon>
          )}
          {globalStep >= 4 && (
            <div className="flex-1">
              <TypewriterText 
                text="Delayed response" 
                delay={200}
                speed={40}
              />
              <div className="text-red-500 dark:text-red-400 text-xs mt-1 opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                ❌ Frustrated customer
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AIFlow = ({ startAnimation, globalStep }: { startAnimation: boolean; globalStep: number }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-teal-400 dark:border-teal-500 transform transition-all duration-500">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">AI-Powered Proactive</h3>
      </div>

      <div className="space-y-4">
        {/* Step 1 */}
        <div className="flex items-center space-x-3 min-h-[50px]">
          {globalStep >= 5 && (
            <BounceIcon delay={0}>
              <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
            </BounceIcon>
          )}
          {globalStep >= 5 && (
            <div className="flex-1">
              <TypewriterText 
                text="AI analyzes profile" 
                delay={200}
                speed={40}
              />
            </div>
          )}
        </div>

        {/* Step 2 */}
        <div className="flex items-center space-x-3 min-h-[50px]">
          {globalStep >= 6 && (
            <BounceIcon delay={0}>
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </BounceIcon>
          )}
          {globalStep >= 6 && (
            <div className="flex-1">
              <TypewriterText 
                text="Predicts concern" 
                delay={200}
                speed={40}
              />
            </div>
          )}
        </div>

        {/* Step 3 */}
        <div className="flex items-center space-x-3 min-h-[50px]">
          {globalStep >= 7 && (
            <BounceIcon delay={0}>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Send className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </BounceIcon>
          )}
          {globalStep >= 7 && (
            <div className="flex-1">
              <TypewriterText 
                text="Sends proactive help" 
                delay={200}
                speed={40}
              />
            </div>
          )}
        </div>

        {/* Step 4 */}
        <div className="flex items-center space-x-3 min-h-[50px]">
          {globalStep >= 8 && (
            <BounceIcon delay={0}>
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Smile className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </BounceIcon>
          )}
          {globalStep >= 8 && (
            <div className="flex-1">
              <TypewriterText 
                text="Problem prevented" 
                delay={200}
                speed={40}
              />
              <div className="text-green-500 dark:text-green-400 text-xs mt-1 opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                ✅ Happy customer
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Customer: React.FC = () => {
  const [showComparison, setShowComparison] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [globalStep, setGlobalStep] = useState(0);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowTitle(true), 300);
    const timer2 = setTimeout(() => setShowComparison(true), 1500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (showComparison) {
      const stepTimings = [
        1000,  // Step 1 - Traditional starts
        2200,  // Step 2
        3400,  // Step 3
        4600,  // Step 4
        6000,  // Step 5 - AI starts
        7200,  // Step 6
        8400,  // Step 7
        9600,  // Step 8
        11000  // Show stats
      ];

      const timers = stepTimings.map((timing, index) => 
        setTimeout(() => {
          if (index < 8) {
            setGlobalStep(index + 1);
          } else {
            setShowStats(true);
          }
        }, timing)
      );

      return () => timers.forEach(clearTimeout);
    }
  }, [showComparison]);

  return (
    <div className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900 dark:to-blue-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-3">
            <TrendingUp className="w-7 h-7 text-teal-600 dark:text-teal-400 mr-2" />
            {showTitle && (
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                <TypewriterText 
                  text="Customer Communication Prediction" 
                  speed={60}
                />
              </h1>
            )}
          </div>
        </div>

        {/* Side by Side Comparison */}
        {showComparison && (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <TraditionalFlow startAnimation={showComparison} globalStep={globalStep} />
            <AIFlow startAnimation={showComparison} globalStep={globalStep} />
          </div>
        )}

        {/* Bottom Stats */}
        {showStats && (
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md text-center transform transition-all duration-500 hover:scale-105">
              <div className="text-2xl font-bold text-red-500 dark:text-red-400">48hrs</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Response Time</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md text-center transform transition-all duration-500 hover:scale-105">
              <div className="text-2xl font-bold text-teal-500 dark:text-teal-400">0 sec</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Prevention Time</div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Customer;