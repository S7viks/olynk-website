import React, { useState, useEffect } from 'react';
import { Brain, User, MessageSquare, TrendingUp, CheckCircle, Clock, Target, Zap } from 'lucide-react';

type TypewriterTextProps = {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  resetKey?: number;
};

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, delay = 0, speed = 50, className = "", resetKey = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsVisible(false);
    
    const timer = setTimeout(() => {
      setIsVisible(true);
      let i = 0;
      const typeTimer = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeTimer);
        }
      }, speed);
      return () => clearInterval(typeTimer);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay, speed, resetKey]);

  return (
    <span className={`${className} ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      {displayedText}
    </span>
  );
};

const AnimatedComponent: React.FC<{ children: React.ReactNode; delay?: number; className?: string; resetKey?: number }> = ({ children, delay = 0, className = "", resetKey = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, resetKey]);

  return (
    <div className={`${className} ${isVisible ? 'animate-slideInBounce opacity-100 scale-100' : 'opacity-0 scale-95'} transition-all duration-700 ease-out`}>
      {children}
    </div>
  );
};

type ProgressBarProps = {
  progress: number;
  delay?: number;
  resetKey?: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, delay = 0, resetKey = 0 }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(0);
    const timer = setTimeout(() => {
      setWidth(progress);
    }, delay);
    return () => clearTimeout(timer);
  }, [progress, delay, resetKey]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div 
        className="h-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};


const PulsingDot = ({ delay = 0, color = "bg-teal-500", resetKey = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, resetKey]);

  return (
    <div className={`${color} w-3 h-3 rounded-full ${isVisible ? 'animate-pulse' : 'opacity-0'} transition-opacity duration-300`} />
  );
};

const CommunicationEngine = () => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 12000); // Changed from 8000 to 12000
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <AnimatedComponent delay={0} className="text-center mb-8" resetKey={animationKey}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center animate-bounce">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              <TypewriterText text="AI Communication Engine" delay={500} speed={80} resetKey={animationKey} />
            </h1>
          </div>
        </AnimatedComponent>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Step 1: Behavioral Pattern Recognition */}
          <AnimatedComponent delay={1000} className="bg-white rounded-2xl p-6 shadow-lg border border-teal-100" resetKey={animationKey}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center animate-bounce">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  <TypewriterText text="Behavioral Pattern Recognition" delay={1500} speed={60} resetKey={animationKey} />
                </h3>
              </div>
              <PulsingDot delay={2000} color="bg-purple-500" resetKey={animationKey} />
            </div>
            <div className="ml-16">
              <p className="text-gray-600 mb-3">
                <TypewriterText text="Analyzing customer interactions in real-time..." delay={2500} speed={40} resetKey={animationKey} />
              </p>
              <ProgressBar progress={85} delay={3000} resetKey={animationKey} />
            </div>
          </AnimatedComponent>

          {/* Step 2: Customer Profile */}
          <AnimatedComponent delay={2000} className="bg-white rounded-2xl p-6 shadow-lg border border-teal-100" resetKey={animationKey}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center animate-bounce">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  <TypewriterText text="Customer Profile Builder" delay={2500} speed={60} resetKey={animationKey} />
                </h3>
              </div>
              <PulsingDot delay={3000} color="bg-blue-500" resetKey={animationKey} />
            </div>
            <div className="ml-16 space-y-2">
              <p className="text-gray-600">
                <TypewriterText text="Purchase history timeline ✓" delay={3500} speed={40} resetKey={animationKey} />
              </p>
              <p className="text-gray-600">
                <TypewriterText text="Behavioral patterns identified ✓" delay={4000} speed={40} resetKey={animationKey} />
              </p>
            </div>
          </AnimatedComponent>

          {/* Step 3: AI Analysis */}
          <AnimatedComponent delay={3000} className="bg-white rounded-2xl p-6 shadow-lg border border-teal-100" resetKey={animationKey}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center animate-bounce">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  <TypewriterText text="AI Pattern Analysis" delay={3500} speed={60} resetKey={animationKey} />
                </h3>
              </div>
              <PulsingDot delay={4000} color="bg-teal-500" resetKey={animationKey} />
            </div>
            <div className="ml-16">
              <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                <p className="text-teal-800 font-medium">
                  <TypewriterText text="💡 Insight: Typically asks about delivery by day 2" delay={4500} speed={40} resetKey={animationKey} />
                </p>
              </div>
            </div>
          </AnimatedComponent>

          {/* Step 4: Proactive Message */}
          <AnimatedComponent delay={4000} className="bg-white rounded-2xl p-6 shadow-lg border border-teal-100" resetKey={animationKey}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center animate-bounce">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  <TypewriterText text="Proactive Message Generation" delay={4500} speed={60} resetKey={animationKey} />
                </h3>
              </div>
              <PulsingDot delay={5000} color="bg-green-500" resetKey={animationKey} />
            </div>
            <div className="ml-16">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">W</span>
                  </div>
                  <span className="text-green-800 font-medium">WhatsApp Auto-Compose</span>
                </div>
                <p className="text-green-700 text-sm">
                  <TypewriterText text="Hi Sarah! Your order is on track for delivery tomorrow. Here's your tracking link..." delay={5500} speed={30} resetKey={animationKey} />
                </p>
              </div>
            </div>
          </AnimatedComponent>
        </div>

        {/* Step 5: Outcome - Full Width */}
        <AnimatedComponent delay={5000} className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 shadow-lg text-white" resetKey={animationKey}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center animate-bounce">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">
                <TypewriterText text="Outstanding Results" delay={5500} speed={60} resetKey={animationKey} />
              </h3>
            </div>
          </div>
          <div className="ml-16 space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-white/90">
                <TypewriterText text="Zero support queries" delay={6000} speed={40} resetKey={animationKey} />
              </span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span className="text-white/90">
                <TypewriterText text="Customer satisfaction increasing" delay={6500} speed={40} resetKey={animationKey} />
              </span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/80 text-sm">Satisfaction Score</span>
                <span className="text-white font-bold">
                  <TypewriterText text="98%" delay={7000} speed={100} resetKey={animationKey} />
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <ProgressBar progress={98} delay={7200} resetKey={animationKey} />
              </div>
            </div>
          </div>
        </AnimatedComponent>

        {/* Auto-restart indicator */}
        <AnimatedComponent delay={8000} className="text-center mt-8" resetKey={animationKey}>
          <div className="flex items-center justify-center gap-2 text-teal-600">
            <Clock className="w-4 h-4 animate-spin" />
            <span className="text-sm">Animation restarts every 12 seconds</span>
          </div>
        </AnimatedComponent>
      </div>
    </div>
  );
};

export default CommunicationEngine;