import React, { useState, useEffect } from 'react';
import { BarChart3, AlertTriangle, DollarSign, Bot, TrendingUp, CheckCircle, Zap, Target, Eye } from 'lucide-react';

const Patterns = () => {
  const [step, setStep] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [counterValue, setCounterValue] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [counterComplete, setCounterComplete] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 500);
    const timer2 = setTimeout(() => setStep(2), 3000);
    const timer3 = setTimeout(() => setStep(3), 5500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (counterComplete && step === 3) {
      const timer = setTimeout(() => setStep(4), 1000);
      return () => clearTimeout(timer);
    }
  }, [counterComplete, step]);

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => setStep(5), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  useEffect(() => {
    if (step === 3) {
      const text = "You're flying blind through your data";
      let i = 0;
      const typeTimer = setInterval(() => {
        if (i <= text.length) {
          setTypewriterText(text.slice(0, i));
          i++;
        } else {
          clearInterval(typeTimer);
          setTypewriterComplete(true);
          setTimeout(() => {
            let current = 0;
            const target = 150000;
            const increment = target / 60;
            const counterTimer = setInterval(() => {
              current += increment;
              if (current >= target) {
                setCounterValue(target);
                setCounterComplete(true);
                clearInterval(counterTimer);
              } else {
                setCounterValue(Math.floor(current));
              }
            }, 40);
          }, 500);
        }
      }, 60);
      return () => clearInterval(typeTimer);
    }
  }, [step]);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 p-1">
      <div className="max-w-4xl mx-auto space-y-1">
        <div className="text-center mb-2">
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-800 via-teal-600 to-blue-600 bg-clip-text text-transparent mb-1 animate-pulse">
            Patterns You Can't See in Your Own Data
          </h1>
        </div>

        {/* Step 1: Normal Dashboard */}
        <div className={`transition-all duration-1000 transform ${step >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
          <div className="bg-white rounded-lg shadow p-1 border border-slate-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-1">
                <BarChart3 className="w-3 h-3 text-teal-600 animate-bounce" />
                <h2 className="text-xs font-semibold text-slate-800">Business Dashboard</h2>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">All Normal</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-0.5">
              {[
                { label: 'Revenue', value: '₹8.5L', color: 'blue', delay: 'delay-100' },
                { label: 'Orders', value: '1,234', color: 'green', delay: 'delay-200' },
                { label: 'Customers', value: '892', color: 'purple', delay: 'delay-300' }
              ].map((item, index) => (
                <div key={index} className={`bg-${item.color}-50 p-0.5 rounded text-center transform hover:scale-105 transition-all duration-300 ${item.delay} animate-fade-in`}>
                  <div className={`text-${item.color}-800 text-xs font-medium`}>{item.label}</div>
                  <div className={`text-xs font-bold text-${item.color}-900`}>{item.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-1 text-center">
              <span className="bg-slate-100 px-1 py-0.5 rounded-full text-xs text-slate-600 inline-flex items-center space-x-1 hover:bg-slate-200 transition-colors duration-200">
                <span>👤</span>
                <span className="font-medium">Founder: "Looks fine."</span>
              </span>
            </div>
          </div>
        </div>

        {/* Step 2: Hidden Problems */}
        <div className={`transition-all duration-1000 transform ${step >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-1 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-1 mb-1">
              <AlertTriangle className="w-3 h-3 text-red-600 animate-bounce" />
              <h3 className="text-xs font-semibold text-red-800">⚠️ Hidden Issues</h3>
            </div>
            <div className="grid grid-cols-3 gap-0.5">
              {[
                { title: 'Monday Returns', value: '+35%', desc: 'Weekly spike', color: 'red', icon: '📅' },
                { title: 'Weekend Payments', value: '-28%', desc: 'Failures Sat/Sun', color: 'orange', icon: '💳' },
                { title: 'Heat Inventory', value: '-67%', desc: 'Vanishes in heat', color: 'yellow', icon: '🌡️' }
              ].map((item, index) => (
                <div key={index} className={`bg-white p-1 rounded border border-${item.color}-200 transform hover:scale-105 transition-all duration-300 animate-shake`}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm">{item.icon}</span>
                    <div className={`text-sm font-bold text-${item.color}-800 animate-pulse`}>{item.value}</div>
                  </div>
                  <div className={`text-${item.color}-700 font-medium text-xs`}>{item.title}</div>
                  <div className={`text-xs text-${item.color}-600`}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: Cost Impact */}
        <div className={`transition-all duration-1000 transform ${step >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-lg p-1 text-center shadow hover:shadow-md transition-shadow duration-300">
            <div className="mb-1">
              <div className="text-xs font-medium mb-0.5 min-h-[16px] flex items-center justify-center">
                <span className="text-red-300">
                  {typewriterText}
                  {showCursor && step === 3 && !typewriterComplete && <span className="animate-pulse text-red-400">|</span>}
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-1 inline-block transform hover:scale-105 transition-all duration-300 shadow">
                <div className="text-red-100 text-xs font-medium mb-0.5">Monthly Hidden Loss</div>
                <div className="text-sm font-bold animate-pulse">
                  ₹{counterValue.toLocaleString('en-IN')}
                </div>
                <div className="text-red-200 text-xs">Per month missed revenue</div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: AI Solution */}
        <div className={`transition-all duration-1000 transform ${step >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 border-2 border-teal-200 rounded-lg p-1 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-1 mb-1">
              <Bot className="w-3 h-3 text-teal-600 animate-spin" />
              <h3 className="text-xs font-semibold text-teal-800">🤖 AI Spots Patterns</h3>
              <Zap className="w-2 h-2 text-yellow-500 animate-pulse" />
            </div>
            <div className="grid grid-cols-3 gap-0.5">
              {[
                { insight: '"Check quality weekends"', confidence: '94%', color: 'teal', number: '#1' },
                { insight: '"Retry payments Monday"', confidence: '89%', color: 'blue', number: '#2' },
                { insight: '"Stock before heatwave"', confidence: '96%', color: 'purple', number: '#3' }
              ].map((item, index) => (
                <div key={index} className={`bg-white p-1 rounded border border-${item.color}-200 transform hover:scale-105 transition-all duration-300 hover:shadow`}>
                  <div className={`text-${item.color}-600 text-xs font-bold mb-0.5 flex items-center justify-between`}>
                    <span>AI INSIGHT {item.number}</span>
                    <Eye className="w-2 h-2 animate-pulse" />
                  </div>
                  <div className={`text-${item.color}-800 font-semibold text-xs`}>{item.insight}</div>
                  <div className="flex items-center">
                    <CheckCircle className={`w-2 h-2 text-${item.color}-600 mr-0.5 animate-pulse`} />
                    <span className={`text-xs text-${item.color}-600 font-medium`}>{item.confidence} confidence</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 5: Success */}
        <div className={`transition-all duration-1000 transform ${step >= 5 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
          <div className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 text-white rounded-lg p-1 text-center shadow hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <TrendingUp className="w-3 h-3 animate-bounce" />
              <h3 className="text-xs font-semibold">📈 Problems → Profits</h3>
              <Target className="w-3 h-3 animate-pulse" />
            </div>
            <div className="grid grid-cols-4 gap-0.5 mb-1">
              {[
                { icon: <DollarSign className="w-2 h-2 mx-auto mb-0.5 animate-bounce" />, value: '+₹1.5L', label: 'Recovery' },
                { icon: <div className="w-2 h-2 mx-auto mb-0.5 text-xs">📉</div>, value: '-67%', label: 'Returns' },
                { icon: <div className="w-2 h-2 mx-auto mb-0.5 text-xs">📈</div>, value: '+89%', label: 'Payments' },
                { icon: <div className="w-2 h-2 mx-auto mb-0.5 text-xs">✅</div>, value: '0', label: 'Stock-outs' }
              ].map((item, index) => (
                <div key={index} className="bg-white/20 p-0.5 rounded transform hover:scale-110 transition-all duration-300 hover:bg-white/30">
                  {item.icon}
                  <div className="font-bold text-xs">{item.value}</div>
                  <div className="text-xs opacity-90">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="text-xs font-bold animate-pulse">
              🟢 AI turns insights into profits.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patterns;