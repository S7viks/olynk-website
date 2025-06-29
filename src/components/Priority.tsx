import React, { useState, useEffect } from 'react';
import { Brain, AlertTriangle, MessageSquare, Bell, TrendingUp, CheckCircle, Clock, DollarSign, Zap } from 'lucide-react';

interface Alert {
  id: number;
  type: string;
  message: string;
  impact: string;
  effort: string;
  priority: number;
  x: number;
  y: number;
}

const Priority: React.FC = () => {
  const [stage, setStage] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [prioritizedItems, setPrioritizedItems] = useState<Alert[]>([]);

  const stages = [
    "AI Operations Command Center",
    "Daily Priority Intelligence",
    "Morning Chaos Detection...",
    "AI Processing Mode Activated",
    "Priority Ranking Complete",
    "Focus Mode Engaged"
  ];

  const chaosAlerts: Alert[] = [
    { id: 1, type: 'urgent', message: 'Server overload detected', impact: '₹2.3L', effort: '2 hours', priority: 1, x: 20, y: 15 },
    { id: 2, type: 'warning', message: 'Database backup failed', impact: '₹80K', effort: '15 min', priority: 2, x: 70, y: 25 },
    { id: 3, type: 'info', message: 'New client onboarding', impact: '₹45K monthly', effort: '30 min', priority: 3, x: 30, y: 60 },
    { id: 4, type: 'urgent', message: 'Payment gateway timeout', impact: '₹1.2L', effort: '45 min', priority: 1, x: 60, y: 70 },
    { id: 5, type: 'warning', message: 'API rate limit exceeded', impact: '₹35K', effort: '10 min', priority: 3, x: 15, y: 45 },
    { id: 6, type: 'info', message: 'Marketing campaign metrics', impact: '₹90K', effort: '1 hour', priority: 2, x: 75, y: 50 },
    { id: 7, type: 'urgent', message: 'Security breach attempt', impact: '₹5L', effort: '3 hours', priority: 1, x: 45, y: 20 },
    { id: 8, type: 'warning', message: 'Storage capacity 85%', impact: '₹25K', effort: '20 min', priority: 3, x: 80, y: 35 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage < stages.length - 1) {
        setStage(stage + 1);
      }
    }, stage === 0 ? 2000 : stage === 1 ? 3000 : stage === 2 ? 4000 : stage === 3 ? 5000 : stage === 4 ? 6000 : 8000);

    return () => clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage === 2) {
      const timer = setTimeout(() => {
        setAlerts(chaosAlerts);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (stage === 4) {
      const sorted = [...chaosAlerts].sort((a, b) => {
        const impactA = parseFloat(a.impact.replace(/[₹LK,]/g, ''));
        const impactB = parseFloat(b.impact.replace(/[₹LK,]/g, ''));
        return impactB - impactA;
      });
      setPrioritizedItems(sorted.slice(0, 3));
    } else if (stage === 5) {
      setTimeout(() => {
        setAlerts([]);
      }, 1000);
    }
  }, [stage]);

  useEffect(() => {
    if (stages[stage]) {
      let i = 0;
      setTypewriterText('');
      const typeTimer = setInterval(() => {
        if (i < stages[stage].length) {
          setTypewriterText(stages[stage].substring(0, i + 1));
          i++;
        } else {
          clearInterval(typeTimer);
        }
      }, 100);
      return () => clearInterval(typeTimer);
    }
  }, [stage]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <Bell className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'from-red-500 to-orange-500';
      case 'warning': return 'from-yellow-500 to-orange-400';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'from-red-500 to-pink-500';
      case 2: return 'from-yellow-500 to-orange-500';
      default: return 'from-green-500 to-teal-500';
    }
  };

  return (
    <div className="min-h-fit bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100 dark:from-gray-900 dark:via-teal-900 dark:to-cyan-900 relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-fit p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-10 h-10 text-teal-600 mr-3 animate-pulse" />
            <h1 className="text-5xl font-bold text-slate-800 dark:text-gray-100">
              {typewriterText}
              <span className="animate-pulse text-teal-600">|</span>
            </h1>
          </div>
          {stage >= 1 && (
            <p className="text-base text-slate-600 dark:text-gray-400 animate-fade-in">
              Transforming chaos into clarity with AI-powered insights
            </p>
          )}
        </div>

        {/* Chaos Stage */}
        {stage >= 2 && stage < 5 && (
          <div className="relative w-full max-w-4xl h-64 mb-6">
            {alerts.map((alert, index) => (
              <div
                key={alert.id}
                className={`absolute transform transition-all duration-1000 animate-bounce-in bg-gradient-to-r ${getAlertColor(alert.type)} p-3 rounded-lg shadow-lg text-white max-w-[180px]`}
                style={{
                  left: `${alert.x}%`,
                  top: `${alert.y}%`,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div className="flex items-center mb-1">
                  {getAlertIcon(alert.type)}
                  <span className="ml-1 font-semibold text-xs">{alert.type.toUpperCase()}</span>
                </div>
                <p className="text-xs mb-1">{alert.message}</p>
                <div className="flex justify-between text-[10px]">
                  <span>Impact: {alert.impact}</span>
                  <span>Effort: {alert.effort}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI Processing Stage */}
        {stage >= 3 && stage < 5 && (
          <div className="flex items-center justify-center mb-6 animate-fade-in">
            <div className="relative">
              <Brain className="w-16 h-16 text-teal-600 animate-spin-slow" />
              <div className="absolute inset-0 rounded-full border-2 border-teal-600 animate-ping" />
              <div className="absolute -inset-2 rounded-full border-1 border-teal-500 animate-pulse" />
            </div>
            <div className="ml-6">
              <h3 className="text-3xl font-bold text-slate-800 dark:text-gray-100 mb-1">AI Neural Network Processing</h3>
              <div className="flex items-center text-teal-600 dark:text-teal-400">
                <Zap className="w-4 h-4 mr-1" />
                <span className="text-base">Analyzing business impact vectors...</span>
              </div>
            </div>
          </div>
        )}

        {/* Priority Ranking Stage */}
        {stage >= 4 && stage < 5 && (
          <div className="w-full max-w-3xl mb-6">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-gray-100 text-center mb-4 animate-fade-in">
              Priority Ranking by Business Impact
            </h3>
            <div className="space-y-3">
              {prioritizedItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`transform transition-all duration-1000 animate-slide-up bg-gradient-to-r ${getPriorityColor(index + 1)} p-4 rounded-xl shadow-xl text-white`}
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                        <span className="text-base font-bold">#{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="text-base font-bold mb-1">{item.message}</h4>
                        <div className="flex items-center space-x-3 text-xs">
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span>Impact: {item.impact}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>Effort: {item.effort}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <TrendingUp className="w-6 h-6 animate-bounce" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Focus Mode Stage */}
        {stage >= 5 && (
          <div className="w-full max-w-2xl animate-zoom-in">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-700 dark:to-cyan-700 p-6 rounded-2xl shadow-2xl text-white">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 mr-3 animate-pulse" />
                <h3 className="text-4xl font-bold">Focus Mode Activated</h3>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-4 mb-4">
                <h4 className="text-3xl font-bold mb-3">TOP PRIORITY ACTION</h4>
                <p className="text-base mb-3">Server overload detected - Critical business impact</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-5 h-5 mr-1" />
                      <span className="font-bold text-sm">Business Impact</span>
                    </div>
                    <p className="text-lg font-bold">₹2.3L Revenue Risk</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <Clock className="w-5 h-5 mr-1" />
                      <span className="font-bold text-sm">Time to Resolve</span>
                    </div>
                    <p className="text-lg font-bold">2 Hours</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h5 className="font-bold text-base">Action Steps:</h5>
                  <div className="space-y-1">
                    {[
                      "Scale server instances immediately",
                      "Implement load balancing",
                      "Monitor performance metrics",
                      "Set up auto-scaling rules"
                    ].map((step, index) => (
                      <div
                        key={index}
                        className="flex items-center animate-fade-in-delay"
                        style={{ animationDelay: `${index * 0.3}s` }}
                      >
                        <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button className="w-full bg-white dark:bg-gray-800 text-teal-700 dark:text-teal-300 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transform hover:scale-105 transition-all duration-300 animate-pulse text-sm">
                Execute Priority Action Plan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Priority;