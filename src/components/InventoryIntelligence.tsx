import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Cloud, 
  Calendar, 
  BarChart3,
  Brain,
  Package,
  IndianRupee,
  Clock,
  Users,
  ShoppingCart,
  Zap,
  Target,
  Eye,
  Gauge,
  Activity,
  Wifi,
  Bell
} from 'lucide-react';

const InventoryIntelligence = () => {
  const [confidence, setConfidence] = useState(85);
  const [stockLevel, setStockLevel] = useState(14);
  const [revenueAtRisk, setRevenueAtRisk] = useState(180000);
  const [currentTime, setCurrentTime] = useState(new Date('2025-06-25T14:58:00+05:30'));
  const [activeAlert, setActiveAlert] = useState(0);
  const [predictionPhase, setPredictionPhase] = useState(0);
  const [externalFactorIndex, setExternalFactorIndex] = useState(0);
  const [orderCount, setOrderCount] = useState(1247);
  const [accuracyRate, setAccuracyRate] = useState(94.5);
  const [responseTime, setResponseTime] = useState(0.8);
  const [dataSources, setDataSources] = useState(12);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    intervals.push(setInterval(() => setCurrentTime(new Date()), 1000));
    intervals.push(setInterval(() => setConfidence(prev => Math.round(85 + Math.sin(Date.now() / 3000) * 5)), 100));
    intervals.push(setInterval(() => setStockLevel(prev => Math.max(10, Math.round(Math.sin(Date.now() / 8000) * 10 + 14))), 200));
    intervals.push(setInterval(() => setRevenueAtRisk(prev => Math.round(180000 + Math.sin(Date.now() / 5000) * 50000)), 300));
    intervals.push(setInterval(() => setActiveAlert(prev => (prev + 1) % 3), 4000));
    intervals.push(setInterval(() => setPredictionPhase(prev => (prev + 1) % 4), 3000));
    intervals.push(setInterval(() => setExternalFactorIndex(prev => (prev + 1) % 3), 2500));
    intervals.push(setInterval(() => {
      setOrderCount(prev => prev + Math.floor(Math.random() * 3));
      setAccuracyRate(prev => Math.round((94 + Math.sin(Date.now() / 4000) * 2) * 10) / 10);
      setResponseTime(prev => Math.round((0.8 + Math.sin(Date.now() / 3500) * 0.3) * 10) / 10);
      setDataSources(prev => 12 + Math.floor(Math.sin(Date.now() / 6000) * 2));
    }, 1500));
    intervals.push(setInterval(() => {
      setShowSuccessAnimation(true);
      setTimeout(() => setShowSuccessAnimation(false), 3000);
    }, 15000));

    return () => intervals.forEach(clearInterval);
  }, []);

  const salesData = [
    { month: 'Jan', historical: 450, predicted: null },
    { month: 'Feb', historical: 520, predicted: null },
    { month: 'Mar', historical: 480, predicted: null },
    { month: 'Apr', historical: 772, predicted: null },
    { month: 'May', historical: 931, predicted: null },
    { month: 'Jun', historical: 1170, predicted: null },
    { month: 'Jul', historical: null, predicted: 1289 + Math.sin(Date.now() / 2000) * 50 },
    { month: 'Aug', historical: null, predicted: 1350 + Math.sin(Date.now() / 2200) * 60 },
    { month: 'Sep', historical: null, predicted: 1400 + Math.sin(Date.now() / 2400) * 70 },
    { month: 'Oct', historical: null, predicted: 1450 + Math.sin(Date.now() / 2600) * 80 },
  ];

  const externalFactors = [
    { icon: Cloud, name: 'Weather Impact', value: 'Monsoon +15%', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Calendar, name: 'Festival Season', value: 'Diwali Boost +25%', color: 'text-orange-600', bg: 'bg-orange-50' },
    { icon: TrendingUp, name: 'Market Trends', value: 'Growth +18%', color: 'text-green-600', bg: 'bg-green-50' },
  ];

  const alerts = [
    { type: 'critical', message: 'Stock critically low - Order 200 units by Thursday', icon: AlertTriangle, color: 'red' },
    { type: 'warning', message: 'Demand spike predicted - Consider increasing buffer stock', icon: TrendingUp, color: 'yellow' },
    { type: 'info', message: 'AI model updated - Accuracy improved by 2.3%', icon: Brain, color: 'blue' },
  ];

  const predictionPhases = [
    'Analyzing historical patterns...',
    'Processing external factors...',
    'Calculating demand forecast...',
    'Optimizing inventory levels...'
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-teal-50 to-blue-50 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-teal-200 rounded-full opacity-20 animate-pulse-smooth" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-bounce-smooth" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-green-200 rounded-full opacity-15 animate-pulse-smooth" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-teal-100 to-blue-100 rounded-lg animate-fade-in">
                <Brain className="h-5 w-5 text-teal-600 animate-spin-smooth" style={{ animationDuration: '3s' }} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 animate-fade-in-up">AI Inventory Intelligence</h1>
                <p className="text-gray-600 text-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  {predictionPhases[predictionPhase]}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-green-600 animate-pulse-smooth">
                <Wifi className="w-3 h-3 animate-bounce-smooth" style={{ animationDuration: '2s' }} />
                <span className="text-xs font-medium">Live Data</span>
                <span className="text-xs text-blue-600">{currentTime.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })}</span>
              </div>
              <button className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-2 py-1 rounded-lg text-sm hover:from-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-102 animate-fade-in">
                Export Report
              </button>
            </div>
          </div>
        </header>

        <div className="mt-6">
          <div className="relative">
            <div className="fixed top-28 right-4 z-40 animate-slide-in-right">
              <div className={`p-2 rounded-lg shadow-lg border-l-4 ${
                alerts[activeAlert].color === 'red' ? 'bg-red-50 border-red-500' :
                alerts[activeAlert].color === 'yellow' ? 'bg-yellow-50 border-yellow-500' :
                'bg-blue-50 border-blue-500'
              } transform transition-all duration-500 animate-fade-in-up`}>
                <div className="flex items-center space-x-1">
                  {React.createElement(
                    alerts[activeAlert].icon,
                    {
                      className: `h-3 w-3 ${
                        alerts[activeAlert].color === 'red' ? 'text-red-600' :
                        alerts[activeAlert].color === 'yellow' ? 'text-yellow-600' :
                        'text-blue-600'
                      } animate-pulse-smooth`
                    }
                  )}
                  <p className="text-xs font-medium">{alerts[activeAlert].message}</p>
                  <Bell className="h-2 w-2 text-gray-400 animate-ring-smooth" style={{ animationDuration: '1.5s' }} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-gray-200 transform transition-all duration-500 hover:shadow-xl animate-fade-in-up">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Sales Prediction Analysis</h2>
                    <div className="flex items-center space-x-2 text-teal-600 animate-pulse-smooth">
                      <BarChart3 className="h-3 w-3 animate-bounce-smooth" style={{ animationDuration: '2s' }} />
                      <span className="text-xs font-medium">Historical vs Predicted</span>
                    </div>
                  </div>
                  
                  <div className="relative h-40">
                    <div className="absolute inset-0 flex items-end justify-between px-2">
                      {salesData.map((data, index) => (
                        <div key={data.month} className="flex flex-col items-center space-y-1">
                          <div className="relative">
                            {data.historical && (
                              <div 
                                className="w-5 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t transition-all duration-800 ease-out animate-grow-smooth"
                                style={{ 
                                  height: `${(data.historical / 1450) * 120}px`,
                                  animationDelay: `${index * 80}ms`
                                }}
                              ></div>
                            )}
                            {data.predicted && (
                              <div 
                                className="w-5 bg-gradient-to-t from-teal-500 to-teal-400 rounded-t transition-all duration-800 ease-out animate-grow-smooth"
                                style={{ 
                                  height: `${(Math.round(data.predicted) / 1450) * 120}px`,
                                  animationDelay: `${index * 120}ms`
                                }}
                              ></div>
                            )}
                            {data.predicted && (
                              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-teal-600 animate-fade-in-up" style={{ animationDelay: `${index * 120 + 160}ms` }}>
                                {Math.round(data.predicted)}
                              </div>
                            )}
                          </div>
                          <span className="text-xs text-gray-600">{data.month}</span>
                        </div>
                      ))}
                    </div>
                    
                    
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-gray-200 transform transition-all duration-500 hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">External Factors Analysis</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {externalFactors.map((factor, index) => (
                      <div 
                        key={index} 
                        className={`p-2 ${factor.bg} rounded-lg border border-gray-100 transform transition-all duration-500 hover:scale-102 ${
                          index === externalFactorIndex ? 'animate-pulse-smooth ring-1 ring-teal-300' : ''
                        }`}
                        style={{ animationDelay: `${index * 0.08}s` }}
                      >
                        <div className="flex items-center space-x-1">
                          <factor.icon className={`h-4 w-4 ${factor.color} ${
                            index === externalFactorIndex ? 'animate-bounce-smooth' : ''
                          }`} style={{ animationDuration: '1.5s' }} />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{factor.name}</p>
                            <p className={`text-xs font-semibold ${factor.color} animate-fade-in-up`}>{factor.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3 p-2 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-200 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="flex items-center space-x-1">
                      <Brain className="h-3 w-3 text-teal-600 animate-spin-smooth" style={{ animationDuration: '3s' }} />
                      <span className="font-medium text-teal-900 text-sm">AI Analysis:</span>
                    </div>
                    <p className="text-teal-800 text-xs mt-1 animate-type-smooth" style={{ animationDuration: '1.5s' }}>
                      Combined factor impact suggests 58% increase in demand for next quarter. Recommended stock adjustment: +45% buffer inventory.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-gray-200 transform transition-all duration-500 hover:shadow-xl animate-fade-in-up">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-semibold text-gray-900">Prediction Confidence</h3>
                    <Gauge className="h-3 w-3 text-gray-600 animate-spin-smooth" style={{ animationDuration: '4s' }} />
                  </div>
                  
                  <div className="relative pt-2">
                    <div className="flex justify-center mb-2">
                      <div className="relative w-20 h-20">
                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="#e5e7eb"
                            strokeWidth="6"
                            fill="transparent"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="url(#confidenceGradient)"
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray={`${(confidence / 100) * 251} 251`}
                            className="transition-all duration-800 ease-out animate-draw-smooth"
                          />
                          <defs>
                            <linearGradient id="confidenceGradient">
                              <stop offset="0%" stopColor="#14b8a6" />
                              <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-gray-900 animate-pulse-smooth" style={{ animationDuration: '1.5s' }}>{confidence}%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-gray-600 text-xs animate-fade-in-up">High Confidence Prediction</p>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-gray-200 transform transition-all duration-500 hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-semibold text-gray-900">Stock Level</h3>
                    <Package className="h-3 w-3 text-gray-600 animate-bounce-smooth" style={{ animationDuration: '1.5s' }} />
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Current Stock</span>
                        <span className="font-medium animate-pulse-smooth" style={{ animationDuration: '1.5s' }}>{stockLevel} units</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-800 ease-out ${
                            stockLevel <= 20 ? 'bg-gradient-to-r from-red-500 to-red-400 animate-pulse-smooth' : 
                            stockLevel <= 50 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' : 
                            'bg-gradient-to-r from-green-500 to-green-400'
                          }`}
                          style={{ width: `${(stockLevel / 50) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {stockLevel <= 20 && (
                      <div className="p-1 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200 animate-shake-smooth" style={{ animationDuration: '0.5s' }}>
                        <div className="flex items-center space-x-1">
                          <AlertTriangle className="h-3 w-3 text-red-600 animate-bounce-smooth" style={{ animationDuration: '0.8s' }} />
                          <span className="font-medium text-red-900 text-xs">Critical Stock Level</span>
                        </div>
                        <p className="text-red-800 text-xs mt-0.5 animate-pulse-smooth" style={{ animationDuration: '0.8s' }}>Order 200 units by Thursday</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-gray-200 transform transition-all duration-500 hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-semibold text-gray-900">Revenue at Risk</h3>
                    <IndianRupee className="h-3 w-3 text-gray-600 animate-spin-smooth" style={{ animationDuration: '2s' }} />
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xl font-bold text-red-600 mb-1 animate-pulse-smooth" style={{ animationDuration: '1.5s' }}>
                      ₹{(revenueAtRisk / 100000).toFixed(1)}L
                    </div>
                    <p className="text-gray-600 text-xs">Potential loss from stockouts</p>
                    
                    <div className="mt-2 p-1 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200 animate-pulse-smooth" style={{ animationDuration: '1.5s' }}>
                      <div className="flex items-center justify-center space-x-1">
                        <Clock className="h-2 w-2 text-orange-600 animate-spin-smooth" style={{ animationDuration: '1.5s' }} />
                        <span className="text-orange-800 text-xs font-medium">
                          Countdown: 2 days to reorder
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {showSuccessAnimation && (
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-3 border border-green-200 animate-bounce-in-smooth">
                    <div className="text-center">
                      <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2 animate-spin-smooth" style={{ animationDuration: '1.5s' }} />
                      <h3 className="text-base font-semibold text-green-900 mb-1 animate-fade-in-up">Reorder Successful!</h3>
                      <p className="text-green-800 text-xs mb-2 animate-slide-in-up">
                        200 units ordered successfully. Expected delivery: Friday
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-xs">
                        <div className="flex items-center space-x-1 animate-bounce-smooth" style={{ animationDuration: '0.8s' }}>
                          <Users className="h-2 w-2 text-green-600" />
                          <span className="text-green-800">Happy Customers</span>
                        </div>
                        <div className="flex items-center space-x-1 animate-bounce-smooth" style={{ animationDuration: '0.8s', animationDelay: '0.1s' }}>
                          <Target className="h-2 w-2 text-green-600" />
                          <span className="text-green-800">Target Met</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-3 border border-gray-200 transform transition-all duration-500 hover:shadow-xl hover:scale-102 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-xs">Total Orders</p>
                    <p className="text-lg font-bold text-gray-900 animate-pulse-smooth" style={{ animationDuration: '1.5s' }}>{orderCount.toLocaleString()}</p>
                    <p className="text-green-600 text-xs animate-bounce-smooth" style={{ animationDuration: '1.5s' }}>↑ 12% vs last month</p>
                  </div>
                  <ShoppingCart className="h-5 w-5 text-teal-600 animate-bounce-smooth" style={{ animationDuration: '1.5s' }} />
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-3 border border-gray-200 transform transition-all duration-500 hover:shadow-xl hover:scale-102 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-xs">Accuracy Rate</p>
                    <p className="text-lg font-bold text-gray-900 animate-pulse-smooth" style={{ animationDuration: '1.5s' }}>{accuracyRate}%</p>
                    <p className="text-green-600 text-xs animate-bounce-smooth" style={{ animationDuration: '1.5s' }}>↑ 2.1% improvement</p>
                  </div>
                  <Target className="h-5 w-5 text-teal-600 animate-spin-smooth" style={{ animationDuration: '2s' }} />
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-3 border border-gray-200 transform transition-all duration-500 hover:shadow-xl hover:scale-102 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-xs">Response Time</p>
                    <p className="text-lg font-bold text-gray-900 animate-pulse-smooth" style={{ animationDuration: '1.5s' }}>{responseTime}s</p>
                    <p className="text-green-600 text-xs animate-pulse-smooth" style={{ animationDuration: '1.5s' }}>Real-time analysis</p>
                  </div>
                  <Zap className="h-5 w-5 text-teal-600 animate-bounce-smooth" style={{ animationDuration: '1.5s' }} />
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-3 border border-gray-200 transform transition-all duration-500 hover:shadow-xl hover:scale-102 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-xs">Data Sources</p>
                    <p className="text-lg font-bold text-gray-900 animate-pulse-smooth" style={{ animationDuration: '1.5s' }}>{dataSources}</p>
                    <p className="text-blue-600 text-xs animate-fade-in-up">Connected systems</p>
                  </div>
                  <Eye className="h-5 w-5 text-teal-600 animate-pulse-smooth" style={{ animationDuration: '1.5s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { transform: translateY(15px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-in-right {
          from { transform: translateX(15px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes grow-smooth {
          from { height: 0; }
          to { height: var(--final-height); }
        }
        
        @keyframes shake-smooth {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        
        @keyframes bounce-in-smooth {
          0% { transform: scale(0.2); opacity: 0; }
          50% { transform: scale(1.02); }
          70% { transform: scale(0.98); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes draw-smooth {
          from { stroke-dasharray: 0 251; }
          to { stroke-dasharray: 251 0; }
        }
        
        @keyframes type-smooth {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes pulse-smooth {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        
        @keyframes bounce-smooth {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes spin-smooth {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes ring-smooth {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        
        @keyframes slide-in-up {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-fade-in { animation: fade-in 0.7s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.5s ease-out; }
        .animate-grow-smooth { animation: grow-smooth 1s ease-out; }
        .animate-shake-smooth { animation: shake-smooth 0.4s ease-in-out infinite; }
        .animate-bounce-in-smooth { animation: bounce-in-smooth 0.5s ease-out; }
        .animate-draw-smooth { animation: draw-smooth 1.5s ease-out; }
        .animate-type-smooth { animation: type-smooth 1.5s steps(40, end); }
        .animate-pulse-smooth { animation: pulse-smooth 1.5s ease-in-out infinite; }
        .animate-bounce-smooth { animation: bounce-smooth 1s ease-in-out infinite; }
        .animate-spin-smooth { animation: spin-smooth 3s linear infinite; }
        .animate-ring-smooth { animation: ring-smooth 1s ease-in-out infinite; }
        .animate-slide-in-up { animation: slide-in-up 0.4s ease-out; }
      `}</style>
    </div>
  );
};

export default InventoryIntelligence;