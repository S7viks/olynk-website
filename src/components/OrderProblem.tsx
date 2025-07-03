import React, { useState, useEffect } from 'react';
import { Package, CheckCircle, AlertTriangle, Zap } from 'lucide-react';

const OrderProblem = () => {
  const [chaosDeliveryTime, setChaosDeliveryTime] = useState(847);
  const [aiDeliveryTime, setAiDeliveryTime] = useState(234);
  const [orderCount, setOrderCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationStep(0);
    
    const steps = [
      () => setAnimationStep(1), // Show warehouses
      () => setAnimationStep(2), // Show central processing
      () => setAnimationStep(3), // Show connections
      () => setAnimationStep(4), // Show results
      () => {
        setAnimationStep(0);
        setIsAnimating(false);
      }
    ];

    steps.forEach((step, index) => {
      setTimeout(step, index * 1000);
    });
  };

  // Auto-play animation on component mount
  useEffect(() => {
    const autoPlayTimer = setTimeout(() => {
      if (!hasAutoPlayed) {
        setHasAutoPlayed(true);
        startAnimation();
      }
    }, 1000);

    return () => clearTimeout(autoPlayTimer);
  }, [hasAutoPlayed]);

  useEffect(() => {
    const timer = setInterval(() => {
      setChaosDeliveryTime(prev => prev + Math.floor(Math.random() * 20) - 5);
      setAiDeliveryTime(prev => Math.max(180, prev - Math.floor(Math.random() * 3)));
      setOrderCount(prev => prev + 1);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-2xl w-full h-full overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 h-full">
        {/* Chaos Side */}
        <div className="bg-white rounded-xl p-2 sm:p-3 shadow-md border border-red-100 dark:bg-gray-700 dark:border-red-900 flex flex-col">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h2 className="text-base sm:text-lg font-bold text-red-600 flex items-center dark:text-red-400">
              <AlertTriangle className="w-4 h-4 mr-1.5 animate-pulse" />
              Chaos Routing
            </h2>
            <div className="bg-red-100 px-2 py-0.5 rounded-full dark:bg-red-900">
              <span className="text-red-800 font-semibold text-xs sm:text-sm dark:text-red-300">
                {chaosDeliveryTime} min
              </span>
            </div>
          </div>

          <div className="relative h-24 sm:h-28 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-2 overflow-visible mb-2 sm:mb-3 flex-1 dark:from-red-900 dark:to-orange-900">
            {/* Warehouses */}
            <div className="absolute top-1 left-1">
              <div className={`bg-red-200 p-0.5 rounded-sm transition-all duration-1000 ${
                isAnimating && animationStep >= 1 ? 'scale-105 animate-bounce' : 'scale-100'
              } ${isAnimating && animationStep >= 1 ? 'opacity-100' : 'opacity-70'} dark:bg-red-800`}>
                <Package className="w-2.5 h-2.5 text-red-600 dark:text-red-300" />
                <div className="text-xs text-red-700 dark:text-red-300">Hub A</div>
              </div>
            </div>
            <div className="absolute top-1 right-1">
              <div className={`bg-red-200 p-0.5 rounded-sm transition-all duration-1000 delay-500 ${
                isAnimating && animationStep >= 1 ? 'scale-105 animate-bounce' : 'scale-100'
              } ${isAnimating && animationStep >= 1 ? 'opacity-100' : 'opacity-70'} dark:bg-red-800`}>
                <Package className="w-2.5 h-2.5 text-red-600 dark:text-red-300" />
                <div className="text-xs text-red-700 dark:text-red-300">Hub B</div>
              </div>
            </div>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
              <div className={`bg-red-200 p-0.5 rounded-sm transition-all duration-1000 delay-1000 ${
                isAnimating && animationStep >= 1 ? 'scale-105 animate-bounce' : 'scale-100'
              } ${isAnimating && animationStep >= 1 ? 'opacity-100' : 'opacity-70'} dark:bg-red-800`}>
                <Package className="w-2.5 h-2.5 text-red-600 dark:text-red-300" />
                <div className="text-xs text-red-700 dark:text-red-300">Hub C</div>
              </div>
            </div>

            {/* Central Chaos Indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className={`transition-all duration-1000 delay-1500 ${
                isAnimating && animationStep >= 2 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping dark:bg-red-700"></div>
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full absolute top-0.5 left-0.5 dark:bg-red-800"></div>
              </div>
            </div>

            {/* Chaotic Paths */}
            {isAnimating && animationStep >= 3 && (
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100">
                <path 
                  d="M15,15 Q30,40 50,50 Q70,60 85,15" 
                  stroke="#ef4444" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeDasharray="3,3"
                  className="animate-pulse"
                  style={{
                    strokeDashoffset: '60',
                    animation: 'drawPath 2s ease-in-out forwards, pulse 2s infinite'
                  }}
                />
                <path 
                  d="M85,15 Q65,30 50,50 Q35,70 50,85" 
                  stroke="#ef4444" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeDasharray="3,3"
                  className="animate-pulse delay-500"
                  style={{
                    strokeDashoffset: '60',
                    animation: 'drawPath 2s ease-in-out 0.5s forwards, pulse 2s infinite 0.5s'
                  }}
                />
                <path 
                  d="M50,85 Q25,60 15,15 Q40,35 50,50 Q60,35 85,15" 
                  stroke="#ef4444" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeDasharray="3,3"
                  className="animate-pulse delay-1000"
                  style={{
                    strokeDashoffset: '60',
                    animation: 'drawPath 2s ease-in-out 1s forwards, pulse 2s infinite 1s'
                  }}
                />
                
                {/* Chaos indicators at confusing intersections */}
                <circle cx="50" cy="50" r="1.5" fill="#ef4444" className="animate-ping" style={{animationDelay: '2s'}} />
                <circle cx="35" cy="35" r="1" fill="#ef4444" className="animate-ping" style={{animationDelay: '2.3s'}} />
                <circle cx="65" cy="35" r="1" fill="#ef4444" className="animate-ping" style={{animationDelay: '2.6s'}} />
              </svg>
            )}

            {/* Result Message */}
            <div className={`absolute bottom-1 left-1 right-1 text-center transition-all duration-1000 delay-3000 ${
              isAnimating && animationStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
              <div className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full text-xs font-medium dark:bg-red-900 dark:text-red-300">
                ❌ Confused routing leads to delays
              </div>
            </div>

            {/* Overlay Message */}
            {!isAnimating && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-white/90 p-1.5 rounded-md shadow-sm dark:bg-gray-800/90">
                  <div className="text-red-600 font-bold text-xs mb-1 dark:text-red-400">
                    "Where's My Order?"
                  </div>
                  <div className="text-red-500 text-xs dark:text-red-300">
                    Random routing creates confusion
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chaos Metrics */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            <div className="bg-red-50 p-1.5 rounded-lg text-center dark:bg-red-900">
              <div className="text-sm sm:text-base font-bold text-red-600 dark:text-red-400">73%</div>
              <div className="text-xs text-red-800 dark:text-red-300">Delays</div>
            </div>
            <div className="bg-red-50 p-1.5 rounded-lg text-center dark:bg-red-900">
              <div className="text-sm sm:text-base font-bold text-red-600 dark:text-red-400">2.1</div>
              <div className="text-xs text-red-800 dark:text-red-300">Rating</div>
            </div>
            <div className="bg-red-50 p-1.5 rounded-lg text-center dark:bg-red-900">
              <div className="text-sm sm:text-base font-bold text-red-600 dark:text-red-400">$847K</div>
              <div className="text-xs text-red-800 dark:text-red-300">Lost Revenue</div>
            </div>
          </div>

          <button 
            onClick={startAnimation}
            className="mt-2 w-full bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:from-red-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-md dark:from-red-700 dark:to-orange-700"
          >
            Start Chaos Demo
          </button>
        </div>

        {/* AI Intelligence Side */}
        <div className="bg-white rounded-xl p-2 sm:p-3 shadow-md border border-teal-100 dark:bg-gray-700 dark:border-teal-900 flex flex-col">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h2 className="text-base sm:text-lg font-bold text-teal-600 flex items-center dark:text-teal-400">
              <CheckCircle className="w-4 h-4 mr-1.5 animate-pulse" />
              AI Intelligence
            </h2>
            <div className="bg-teal-100 px-2 py-0.5 rounded-full dark:bg-teal-900">
              <span className="text-teal-800 font-semibold text-xs sm:text-sm dark:text-teal-300">
                {aiDeliveryTime} min
              </span>
            </div>
          </div>

          <div className="relative h-24 sm:h-28 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg p-2 overflow-visible mb-2 sm:mb-3 flex-1 dark:from-teal-900 dark:to-emerald-900">
            {/* Smart Warehouses */}
            <div className="absolute top-1 left-1">
              <div className={`bg-teal-200 p-0.5 rounded-sm transition-all duration-1000 ${
                isAnimating && animationStep >= 1 ? 'scale-105 animate-pulse' : 'scale-100'
              } ${isAnimating && animationStep >= 1 ? 'opacity-100' : 'opacity-70'} dark:bg-teal-800`}>
                <Package className="w-2.5 h-2.5 text-teal-600 dark:text-teal-300" />
                <div className="text-xs text-teal-700 dark:text-teal-300">Smart A</div>
              </div>
            </div>
            <div className="absolute top-1 right-1">
              <div className={`bg-teal-200 p-0.5 rounded-sm transition-all duration-1000 delay-500 ${
                isAnimating && animationStep >= 1 ? 'scale-105 animate-pulse' : 'scale-100'
              } ${isAnimating && animationStep >= 1 ? 'opacity-100' : 'opacity-70'} dark:bg-teal-800`}>
                <Package className="w-2.5 h-2.5 text-teal-600 dark:text-teal-300" />
                <div className="text-xs text-teal-700 dark:text-teal-300">Smart B</div>
              </div>
            </div>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
              <div className={`bg-teal-200 p-0.5 rounded-sm transition-all duration-1000 delay-1000 ${
                isAnimating && animationStep >= 1 ? 'scale-105 animate-pulse' : 'scale-100'
              } ${isAnimating && animationStep >= 1 ? 'opacity-100' : 'opacity-70'} dark:bg-teal-800`}>
                <Package className="w-2.5 h-2.5 text-teal-600 dark:text-teal-300" />
                <div className="text-xs text-teal-700 dark:text-teal-300">Smart C</div>
              </div>
            </div>

            {/* AI Decision Engine */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className={`bg-gradient-to-r from-teal-500 to-emerald-500 p-1 rounded-md text-white text-center transition-all duration-1000 delay-1500 ${
                isAnimating && animationStep >= 2 ? 'scale-105 opacity-100' : 'scale-100 opacity-80'
              } dark:from-teal-700 dark:to-emerald-700`}>
                <Zap className={`w-3 h-3 mx-auto mb-0.5 ${isAnimating && animationStep >= 2 ? 'animate-spin' : ''}`} />
                <div className="text-xs font-medium">AI Engine</div>
              </div>
            </div>

            {/* Smart Paths */}
            {isAnimating && animationStep >= 3 && (
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100">
                <path 
                  d="M50,50 L15,15" 
                  stroke="#14b8a6" 
                  strokeWidth="2.5" 
                  fill="none"
                  className="animate-pulse"
                  style={{
                    strokeDasharray: '5,0',
                    strokeDashoffset: '50',
                    animation: 'drawPath 1s ease-in-out forwards, pulse 2s infinite',
                    strokeLinecap: 'round'
                  }}
                />
                <path 
                  d="M50,50 L85,15" 
                  stroke="#14b8a6" 
                  strokeWidth="2.5" 
                  fill="none"
                  className="animate-pulse delay-300"
                  style={{
                    strokeDasharray: '5,0',
                    strokeDashoffset: '50',
                    animation: 'drawPath 1s ease-in-out 0.3s forwards, pulse 2s infinite 0.3s',
                    strokeLinecap: 'round'
                  }}
                />
                <path 
                  d="M50,50 L50,85" 
                  stroke="#14b8a6" 
                  strokeWidth="2.5" 
                  fill="none"
                  className="animate-pulse delay-600"
                  style={{
                    strokeDasharray: '5,0',
                    strokeDashoffset: '35',
                    animation: 'drawPath 1s ease-in-out 0.6s forwards, pulse 2s infinite 0.6s',
                    strokeLinecap: 'round'
                  }}
                />
                
                {/* Connection indicators at endpoints */}
                <circle cx="15" cy="15" r="2" fill="#14b8a6" className="animate-ping" style={{animationDelay: '1s'}} />
                <circle cx="85" cy="15" r="2" fill="#14b8a6" className="animate-ping" style={{animationDelay: '1.3s'}} />
                <circle cx="50" cy="85" r="2" fill="#14b8a6" className="animate-ping" style={{animationDelay: '1.6s'}} />
              </svg>
            )}



            {/* Result Message */}
            <div className={`absolute bottom-1 left-1 right-1 text-center transition-all duration-1000 delay-3000 ${
              isAnimating && animationStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
              <div className="bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded-full text-xs font-medium dark:bg-teal-900 dark:text-teal-300">
                ✅ Optimal routing ensures fast delivery
              </div>
            </div>

            {/* Overlay Message */}
            {!isAnimating && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-white/90 p-1.5 rounded-md shadow-sm dark:bg-gray-800/90">
                  <div className="text-teal-600 font-bold text-xs mb-1 dark:text-teal-400">
                    "Perfect Every Time"
                  </div>
                  <div className="text-teal-500 text-xs dark:text-teal-300">
                    AI finds the optimal path instantly
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI Metrics */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            <div className="bg-teal-50 p-1.5 rounded-lg text-center dark:bg-teal-900">
              <div className="text-sm sm:text-base font-bold text-teal-600 dark:text-teal-400">4%</div>
              <div className="text-xs text-teal-800 dark:text-teal-300">Delays</div>
            </div>
            <div className="bg-teal-50 p-1.5 rounded-lg text-center dark:bg-teal-900">
              <div className="text-sm sm:text-base font-bold text-teal-600 dark:text-teal-400">4.8</div>
              <div className="text-xs text-teal-800 dark:text-teal-300">Rating</div>
            </div>
            <div className="bg-teal-50 p-1.5 rounded-lg text-center dark:bg-teal-900">
              <div className="text-sm sm:text-base font-bold text-teal-600 dark:text-teal-400">$2.1M</div>
              <div className="text-xs text-teal-800 dark:text-teal-300">Revenue Gain</div>
            </div>
          </div>

          <button 
            onClick={startAnimation}
            className="mt-2 w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:from-teal-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-md dark:from-teal-700 dark:to-emerald-700"
          >
            Start AI Demo
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes drawPath {
            to {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}
      </style>
    </div>
  );
};

export default OrderProblem;