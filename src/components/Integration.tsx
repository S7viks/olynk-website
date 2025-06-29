import React, { useState, useEffect } from 'react';
import { Clock, Zap, TrendingUp, Users, DollarSign, CheckCircle } from 'lucide-react';

const Integration: React.FC = () => {
  const [timeWasted, setTimeWasted] = useState(0);
  const [activeApp, setActiveApp] = useState(0);
  const [animationStep, setAnimationStep] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [showApps, setShowApps] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const apps = [
    { name: 'Shopify Dashboard', icon: '🛍️', color: 'bg-teal-500', image: 'https://tse3.mm.bing.net/th?id=OIP.vTAHYPeLEe8WzfcZyndQugHaEK&pid=Api&P=0&h=180' },
    { name: 'WhatsApp Messages', icon: '💬', color: 'bg-green-400', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQVktZb6y-_qlT-ka8ypJLjH053OOzI2N5dg&s' },
    { name: 'Excel Inventory', icon: '📊', color: 'bg-blue-500', image: 'https://i.pinimg.com/474x/1f/db/ce/1fdbce52429088209094dd52a5e7fd3f.jpg' },
    { name: 'Payment Gateway', icon: '💳', color: 'bg-purple-500' },
    { name: 'Shipping Portal', icon: '📦', color: 'bg-orange-500' },
    { name: 'Customer Support', icon: '🎧', color: 'bg-pink-500' },
    { name: 'Accounting Software', icon: '📈', color: 'bg-indigo-500' },
    { name: 'Supplier WhatsApp', icon: '🏭', color: 'bg-cyan-500' }
  ];

  const titleText = "The App Switching Nightmare";

  // Typewriter effect for title
  useEffect(() => {
    if (animationStep >= 1) {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= titleText.length) {
          setTypewriterText(titleText.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
          setTimeout(() => setShowApps(true), 300);
        }
      }, 80);
      return () => clearInterval(timer);
    }
  }, [animationStep]);

  // Sequential animation triggers
  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimationStep(1), 300),
      setTimeout(() => setShowStats(true), 2000),
      setTimeout(() => setShowDashboard(true), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Time counter
  useEffect(() => {
    if (showApps) {
      const timer = setInterval(() => {
        setTimeWasted(prev => prev + 0.1);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [showApps]);

  // App switching animation
  useEffect(() => {
    if (showApps) {
      const appSwitcher = setInterval(() => {
        setActiveApp(prev => (prev + 1) % apps.length);
      }, 500);
      return () => clearInterval(appSwitcher);
    }
  }, [showApps]);

  return (
    <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 dark:from-teal-900 dark:via-cyan-900 dark:to-emerald-900 overflow-hidden py-2">
      <main className="max-w-2xl mx-auto px-2">
        {/* Title Section */}
        <div className="text-center mb-4">
          <div className={`inline-flex items-center space-x-2 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-300 px-2 py-1 rounded-full text-[10px] font-medium mb-2 transition-all duration-500 ${animationStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Zap className="w-3 h-3" />
            <span>Zero Analysts Needed</span>
          </div>
          
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 min-h-[40px]">
            <span className="typewriter-cursor">
              {typewriterText}
              {typewriterText.length < titleText.length && <span className="animate-pulse text-teal-500 dark:text-teal-400">|</span>}
            </span>
          </h1>
        </div>

        {/* Apps Chaos Section */}
        <div className={`transition-all duration-1000 ${showApps ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-3">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Clock className="w-3 h-3 text-red-500 dark:text-red-400 animate-spin" />
              <span className="text-base font-bold text-red-600 dark:text-red-400 animate-bounce">
                {timeWasted.toFixed(1)} hours wasted today
              </span>
            </div>
          </div>

          {/* App Grid */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-1 max-w-2xl mx-auto mb-3">
            {apps.map((app, index) => (
              <div
                key={index}
                className={`relative p-1 rounded-lg transition-all duration-500 transform cursor-pointer ${
                  activeApp === index
                    ? 'scale-110 shadow-lg ring-2 ring-red-400 bg-white dark:bg-gray-800 animate-bounce'
                    : 'scale-95 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 hover:scale-100'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  opacity: showApps ? 1 : 0,
                  transform: showApps ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                {app.image ? (
                  <img 
                    src={app.image} 
                    alt={app.name}
                    className="w-6 h-6 mx-auto mb-1 rounded object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'flex';
                    }}
                  />
                ) : (
                  <div className={`w-6 h-6 mx-auto mb-1 rounded ${app.color} flex items-center justify-center text-xs`}>
                    {app.icon}
                  </div>
                )}
                <div className="w-6 h-6 mx-auto mb-1 rounded bg-gray-200 items-center justify-center text-gray-500 text-[8px] hidden">
                  {app.name}
                </div>
                <p className="text-[8px] font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                  {app.name}
                </p>
                {activeApp === index && (
                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 dark:bg-red-400 rounded-full animate-ping"></div>
                )}
              </div>
            ))}
          </div>

          {/* Chaos Indicators */}
          <div className="grid md:grid-cols-3 gap-1 max-w-2xl mx-auto">
            <div className="bg-red-100 dark:bg-red-900/50 border-l-2 border-red-500 dark:border-red-400 rounded p-1 animate-pulse">
              <p className="text-red-700 dark:text-red-300 text-[10px] font-medium">🚨 Context switching every 2-3 minutes</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/50 border-l-2 border-yellow-500 dark:border-yellow-400 rounded p-1 animate-pulse" style={{animationDelay: '0.5s'}}>
              <p className="text-yellow-700 dark:text-yellow-300 text-[10px] font-medium">⚠️ Information scattered across platforms</p>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/50 border-l-2 border-orange-500 dark:border-orange-400 rounded p-1 animate-pulse" style={{animationDelay: '1s'}}>
              <p className="text-orange-700 dark:text-orange-300 text-[10px] font-medium">🔥 Decisions delayed, opportunities missed</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-6 transition-all duration-1000 ${showStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-3">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">
              Running a Business is Hard.
            </h2>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Making Smart Decisions <span className="text-teal-600 dark:text-teal-400 animate-pulse">Shouldn't Be.</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-2 max-w-xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-lg transform hover:scale-105 transition-all duration-300 animate-bounce" style={{animationDelay: '0.2s'}}>
              <div className="text-xl font-bold text-red-500 dark:text-red-400 mb-1">3.2 hrs</div>
              <div className="text-gray-600 dark:text-gray-400 text-xs">Daily Time Lost</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-lg transform hover:scale-105 transition-all duration-300 animate-bounce" style={{animationDelay: '0.4s'}}>
              <div className="text-xl font-bold text-orange-500 dark:text-orange-400 mb-1">16 hrs</div>
              <div className="text-gray-600 dark:text-gray-400 text-xs">Weekly Productivity Loss</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-lg transform hover:scale-105 transition-all duration-300 animate-bounce" style={{animationDelay: '0.6s'}}>
              <div className="text-xl font-bold text-red-500 dark:text-red-400 mb-1">$12K+</div>
              <div className="text-gray-600 dark:text-gray-400 text-xs">Monthly Revenue Impact</div>
            </div>
          </div>
        </div>

        {/* Unified Dashboard Preview */}
        <div className={`mt-6 transition-all duration-1000 ${showDashboard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-xl max-w-2xl mx-auto mb-4 transform hover:scale-105 transition-all duration-500">
            <div className="grid md:grid-cols-3 gap-2 mb-3">
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg p-2 text-white transform hover:scale-105 transition-all duration-300 animate-bounce">
                <div className="flex items-center justify-between mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-base font-bold">$24,580</span>
                </div>
                <p className="text-teal-100 text-[10px]">Today's Revenue</p>
                <div className="mt-1 flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-teal-100">Live from Shopify</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-2 text-white transform hover:scale-105 transition-all duration-300 animate-bounce" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center justify-between mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-base font-bold">127</span>
                </div>
                <p className="text-blue-100 text-[10px]">Active Conversations</p>
                <div className="mt-1 flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-blue-100">WhatsApp + Support</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-2 text-white transform hover:scale-105 transition-all duration-300 animate-bounce" style={{animationDelay: '0.4s'}}>
                <div className="flex items-center justify-between mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-base font-bold">94%</span>
                </div>
                <p className="text-purple-100 text-[10px]">Inventory Health</p>
                <div className="mt-1 flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-purple-100">Real-time sync</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-2">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                <h4 className="text-gray-800 dark:text-gray-100 font-semibold mb-1 text-xs">AI Insights</h4>
                <div className="space-y-1">
                  <div className="flex items-start space-x-1 text-[10px]">
                    <CheckCircle className="w-3 h-3 text-teal-500 dark:text-teal-400 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">Recommend restocking Product A (selling 3x faster)</span>
                  </div>
                  <div className="flex items-start space-x-1 text-[10px]">
                    <CheckCircle className="w-3 h-3 text-blue-500 dark:text-blue-400 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">Peak order time: 2-4 PM (schedule support)</span>
                  </div>
                  <div className="flex items-start space-x-1 text-[10px]">
                    <CheckCircle className="w-3 h-3 text-purple-500 dark:text-purple-400 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">Customer satisfaction up 12% this week</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                <h4 className="text-gray-800 dark:text-gray-100 font-semibold mb-1 text-xs">Recent Activity</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-1 text-[10px] text-gray-700 dark:text-gray-300">
                    <div className="w-1 h-1 bg-teal-500 rounded-full animate-pulse"></div>
                    <span>New order #3847 - $156</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">2m ago</span>
                  </div>
                  <div className="flex items-center space-x-1 text-[10px] text-gray-700 dark:text-gray-300">
                    <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>Customer support resolved</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">5m ago</span>
                  </div>
                  <div className="flex items-center space-x-1 text-[10px] text-gray-700 dark:text-gray-300">
                    <div className="w-1 h-1 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span>Low stock alert: Product XYZ</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">8m ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .typewriter-cursor {
          display: inline-block;
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0,-8px,0);
          }
          70% {
            transform: translate3d(0,-4px,0);
          }
          90% {
            transform: translate3d(0,-2px,0);
          }
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Integration;