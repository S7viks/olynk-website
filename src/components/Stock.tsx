import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Calendar, TrendingUp, AlertTriangle, Brain, Zap, Shield, Target, Clock, Star, Sparkles, Package, CheckCircle, TrendingDown, DollarSign, AlertCircle, X } from 'lucide-react';

// --- FestivalIndicator ---
const FestivalIndicator: React.FC<{ scene: number }> = ({ scene }) => {
  if (scene < 1) return null;
  return (
    <div className="flex items-center gap-1 animate-slide-down">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 rounded-md blur-sm opacity-40 animate-pulse" />
        <div className="relative bg-white px-1 py-0.5 rounded-md border border-orange-200 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-0.5">
            <Star className="w-2 h-2 text-orange-500 animate-spin" style={{ animationDuration: '1.5s' }} />
            <span className="text-xs font-semibold text-orange-600">Festival Season</span>
            <Sparkles className="w-2 h-2 text-pink-500 animate-pulse" />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-1 py-0.5 rounded-full text-xs font-medium animate-bounce">
        <div className="flex items-center gap-0.5">
          <TrendingUp className="w-1.5 h-1.5" />
          High Demand Alert
        </div>
      </div>
      <div className="relative">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
            style={{
              left: `${i * 4}px`,
              top: `${i * 2}px`,
              animationDelay: `${i * 100}ms`,
              animationDuration: '0.8s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

// --- BarChart ---
const BarChart: React.FC<{ scene: number; showAI: boolean; className?: string }> = ({ scene, showAI, className = "" }) => {
  type BarData = { day: string; sales: number; predicted?: number };
  const [animatedData, setAnimatedData] = useState<BarData[]>([
    { day: 'Mon', sales: 45000 },
    { day: 'Tue', sales: 52000 },
    { day: 'Wed', sales: 48000 },
    { day: 'Thu', sales: 55000 },
    { day: 'Fri', sales: 62000 },
    { day: 'Sat', sales: 58000 },
    { day: 'Sun', sales: 51000 },
  ]);
  const [isAnimating, setIsAnimating] = useState(false);
  const steadyData = [
    { day: 'Mon', sales: 45000 },
    { day: 'Tue', sales: 52000 },
    { day: 'Wed', sales: 48000 },
    { day: 'Thu', sales: 55000 },
    { day: 'Fri', sales: 62000 },
    { day: 'Sat', sales: 58000 },
    { day: 'Sun', sales: 51000 },
  ];
  const spikeData = [
    { day: 'Mon', sales: 45000 },
    { day: 'Tue', sales: 52000 },
    { day: 'Wed', sales: 48000 },
    { day: 'Thu', sales: 55000 },
    { day: 'Fri', sales: 125000 },
    { day: 'Sat', sales: 180000 },
    { day: 'Sun', sales: 160000 },
  ];
  const aiData = [
    { day: 'Mon', sales: 45000, predicted: 45000 },
    { day: 'Tue', sales: 52000, predicted: 52000 },
    { day: 'Wed', sales: 48000, predicted: 48000 },
    { day: 'Thu', sales: 55000, predicted: 55000 },
    { day: 'Fri', sales: 62000, predicted: 125000 },
    { day: 'Sat', sales: 58000, predicted: 180000 },
    { day: 'Sun', sales: 51000, predicted: 160000 },
  ];
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    if (showAI) {
      setAnimatedData(aiData);
    } else if (scene >= 1) {
      setAnimatedData(spikeData);
    } else {
      setAnimatedData(steadyData);
    }
    return () => clearTimeout(timer);
  }, [scene, showAI]);
  const maxValue = Math.max(...animatedData.map(d => Math.max(d.sales, d.predicted || 0)));
  const getBarHeight = (value: number) => (value / maxValue) * 80;
  return (
    <div className={`relative ${className}`}>
      <div className="flex items-end gap-1 h-full px-1 pb-4">
        {animatedData.map((data, index) => (
          <div key={data.day} className="flex-1 flex flex-col items-center">
            <div className="relative w-full flex justify-center items-end h-80">
              <div
                className={`w-8 bg-gradient-to-t transition-all duration-300 ease-out rounded-t-md shadow-sm hover:shadow-md transform hover:scale-101 ${
                  scene >= 1 && (index >= 4) 
                    ? 'from-red-400 to-red-500 animate-pulse' 
                    : 'from-teal-400 to-teal-500'
                } ${isAnimating ? 'animate-bounce' : ''}`}
                style={{
                  height: `${getBarHeight(data.sales)}%`,
                  animationDelay: `${index * 50}ms`
                }}
              />
              {showAI && data.predicted && data.predicted !== data.sales && (
                <div
                  className={`w-8 bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t-md ml-0.5 opacity-80 border border-yellow-600 shadow-sm transform hover:scale-101 animate-slide-up ${isAnimating ? 'animate-bounce' : ''}`}
                  style={{
                    height: `${getBarHeight(data.predicted)}%`,
                    animationDelay: `${index * 50 + 25}ms`
                  }}
                />
              )}
              {scene >= 1 && index >= 4 && (
                <div className="absolute inset-0 bg-red-400/10 rounded-t-md blur-sm animate-pulse" />
              )}
              <div className={`absolute -top-4 text-center transition-all duration-300 ${isAnimating ? 'animate-fade-in' : ''}`}>
                <div className={`text-xs font-semibold px-0.5 py-0.5 rounded-md ${
                  scene >= 1 && index >= 4 ? 'text-red-700 bg-red-100' : 'text-gray-700 bg-white/80'
                }`}>
                  {(data.sales / 1000).toFixed(0)}K
                </div>
                {showAI && data.predicted && data.predicted !== data.sales && (
                  <div className="text-xs font-medium text-yellow-600 mt-0.5 bg-yellow-100 px-0.5 py-0.5 rounded-md">
                    Pred: {(data.predicted / 1000).toFixed(0)}K
                  </div>
                )}
              </div>
            </div>
            <div className={`mt-1 text-xs font-medium text-gray-600 transition-all duration-200 ${
              scene >= 1 && index >= 4 ? 'text-red-600 font-bold' : ''
            }`}>
              {data.day}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute left-0 top-0 h-80 flex flex-col justify-between text-xs text-gray-500 -ml-4">
        <span className="bg-white/80 px-0.5 py-0.5 rounded">{(maxValue / 1000).toFixed(0)}K</span>
        <span className="bg-white/80 px-0.5 py-0.5 rounded">{(maxValue * 0.75 / 1000).toFixed(0)}K</span>
        <span className="bg-white/80 px-0.5 py-0.5 rounded">{(maxValue * 0.5 / 1000).toFixed(0)}K</span>
        <span className="bg-white/80 px-0.5 py-0.5 rounded">{(maxValue * 0.25 / 1000).toFixed(0)}K</span>
        <span className="bg-white/80 px-0.5 py-0.5 rounded">0</span>
      </div>
      <div className="absolute bottom-0 right-0 flex gap-1 text-xs">
        <div className="flex items-center gap-0.5 bg-white/80 px-1 py-0.5 rounded-md">
          <div className="w-1.5 h-1.5 bg-gradient-to-r from-teal-400 to-teal-500 rounded shadow-sm"></div>
          <span className="text-gray-600 font-medium">Actual Sales</span>
        </div>
        {showAI && (
          <div className="flex items-center gap-0.5 bg-white/80 px-1 py-0.5 rounded-md animate-fade-in">
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded border border-yellow-600 shadow-sm"></div>
            <span className="text-gray-600 font-medium">AI Prediction</span>
          </div>
        )}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 border-t border-gray-200/50"
            style={{ top: `${i * 25}%` }}
          />
        ))}
      </div>
    </div>
  );
};

// --- InventoryCounter ---
const InventoryCounter: React.FC<{ scene: number; showAI: boolean }> = ({ scene, showAI }) => {
  const [inventory, setInventory] = useState(1200);
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousInventory, setPreviousInventory] = useState(1200);
  useEffect(() => {
    if (showAI) {
      setInventory(1200);
      return;
    }
    setPreviousInventory(inventory);
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    switch (scene) {
      case 0:
        setInventory(1200);
        break;
      case 1:
        setInventory(850);
        break;
      case 2:
        setInventory(200);
        break;
      case 3:
        setInventory(0);
        break;
    }
    return () => clearTimeout(timer);
  }, [scene, showAI]);
  const getStatusColor = () => {
    if (showAI) return 'text-green-600';
    if (inventory === 0) return 'text-red-600';
    if (inventory < 300) return 'text-orange-600';
    return 'text-green-600';
  };
  const getStatusIcon = () => {
    if (showAI) return <CheckCircle className="w-3 h-3 text-green-600" />;
    if (inventory === 0) return <AlertTriangle className="w-3 h-3 text-red-600 animate-pulse" />;
    if (inventory < 300) return <AlertTriangle className="w-3 h-3 text-orange-600 animate-bounce" />;
    return <Package className="w-3 h-3 text-green-600" />;
  };
  const getProgressWidth = () => {
    const maxInventory = 1200;
    return (inventory / maxInventory) * 100;
  };
  const getProgressColor = () => {
    if (showAI) return 'bg-gradient-to-r from-green-400 to-green-500';
    if (inventory === 0) return 'bg-gradient-to-r from-red-400 to-red-500';
    if (inventory < 300) return 'bg-gradient-to-r from-orange-400 to-orange-500';
    return 'bg-gradient-to-r from-teal-400 to-teal-500';
  };
  const getChangeIndicator = () => {
    const change = inventory - previousInventory;
    if (change === 0) return null;
    return (
      <div className={`flex items-center gap-0.5 text-xs ${change < 0 ? 'text-red-600' : 'text-green-600'} animate-fade-in`}>
        <TrendingDown className={`w-1.5 h-1.5 ${change > 0 ? 'rotate-180' : ''}`} />
        <span>{Math.abs(change).toLocaleString()}</span>
      </div>
    );
  };
  return (
    <div className="space-y-2">
      <div className="text-center relative">
        <div className={`text-xl font-bold transition-all duration-300 ${getStatusColor()} ${isAnimating ? 'animate-pulse scale-102' : ''}`}>
          {inventory.toLocaleString()}
        </div>
        <p className="text-xs text-gray-600 mt-0.5">Units Available</p>
        {getChangeIndicator()}
        {inventory === 0 && (
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-ping" />
        )}
      </div>
      <div className="space-y-0.5">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Stock Level</span>
          <span className={`font-semibold ${getStatusColor()}`}>{Math.round(getProgressWidth())}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
          <div
            className={`h-2 rounded-full transition-all duration-300 ease-out shadow-sm ${getProgressColor()} ${
              inventory < 300 ? 'animate-pulse' : ''
            }`}
            style={{ width: `${getProgressWidth()}%` }}
          >
            <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 px-0.5">
          <span>0</span>
          <span className="text-orange-500">300 (Low)</span>
          <span className="text-green-500">1200 (Max)</span>
        </div>
      </div>
      <div className={`flex items-center gap-1 p-1 rounded-md transition-all duration-300 transform hover:scale-101 ${
        showAI 
          ? 'bg-green-50 border border-green-200 shadow-green-50' 
          : inventory === 0 
            ? 'bg-red-50 border border-red-200 shadow-red-50 animate-pulse' 
            : inventory < 300 
              ? 'bg-orange-50 border border-orange-200 shadow-orange-50' 
              : 'bg-gray-50 border border-gray-200'
      } shadow-sm`}>
        {getStatusIcon()}
        <div className="flex-1">
          <p className={`font-semibold text-xs ${getStatusColor()}`}>
            {showAI 
              ? 'AI Optimized' 
              : inventory === 0 
                ? 'Out of Stock' 
                : inventory < 300 
                  ? 'Low Stock Alert' 
                  : 'Healthy Stock'
            }
          </p>
          <p className="text-xs text-gray-600">
            {showAI 
              ? 'Proactive restocking scheduled' 
              : inventory === 0 
                ? 'Immediate restock required' 
                : inventory < 300 
                  ? 'Consider reordering soon' 
                  : 'Normal operations'
            }
          </p>
        </div>
        <div className={`w-1.5 h-1.5 rounded-full ${
          showAI ? 'bg-green-500' : inventory === 0 ? 'bg-red-500 animate-pulse' : inventory < 300 ? 'bg-orange-500' : 'bg-green-500'
        }`} />
      </div>
      {scene >= 1 && !showAI && (
        <div className="bg-red-50 border border-red-200 rounded-md p-1 animate-slide-up shadow-sm">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
              <TrendingDown className="w-2 h-2 text-red-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-0.5 text-red-700">
                <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium">
                  Rapid Depletion: {scene === 1 ? '2.5x' : scene === 2 ? '4.2x' : '0x'} normal rate
                </span>
              </div>
              <div className="text-xs text-red-600 mt-0.5">
                {scene === 1 ? 'Demand spike detected' : scene === 2 ? 'Critical depletion rate' : 'Stock exhausted'}
              </div>
            </div>
          </div>
        </div>
      )}
      {showAI && (
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-md p-1 animate-fade-in shadow-sm">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-2 h-2 text-teal-600" />
            </div>
            <div>
              <div className="text-xs font-medium text-teal-700">AI Prevention Active</div>
              <div className="text-xs text-teal-600">Automatic reorder triggered 7 days early</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- LossCounter ---
const LossCounter: React.FC<{ scene: number; showAI: boolean }> = ({ scene, showAI }) => {
  const [lossAmount, setLossAmount] = useState(0);
  const [isCountingUp, setIsCountingUp] = useState(false);
  const [displayAmount, setDisplayAmount] = useState(0);
  useEffect(() => {
    if (showAI) {
      setLossAmount(0);
      setDisplayAmount(0);
      setIsCountingUp(false);
      return;
    }
    switch (scene) {
      case 0:
      case 1:
        setLossAmount(0);
        setDisplayAmount(0);
        setIsCountingUp(false);
        break;
      case 2:
        setLossAmount(45000);
        setIsCountingUp(true);
        break;
      case 3:
        setLossAmount(230000);
        setIsCountingUp(false);
        break;
    }
  }, [scene, showAI]);
  useEffect(() => {
    if (lossAmount === displayAmount) return;
    const increment = Math.ceil((lossAmount - displayAmount) / 15);
    const timer = setInterval(() => {
      setDisplayAmount(prev => {
        const next = prev + increment;
        if (next >= lossAmount) {
          clearInterval(timer);
          return lossAmount;
        }
        return next;
      });
    }, 15);
    return () => clearTimeout(timer);
  }, [lossAmount, displayAmount]);
  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };
  const getLossBreakdown = () => {
    const ratio = displayAmount / 230000;
    return {
      lostSales: Math.round(180000 * ratio),
      customerChurn: Math.round(35000 * ratio),
      brandImpact: Math.round(15000 * ratio)
    };
  };
  const breakdown = getLossBreakdown();
  return (
    <div className="space-y-2">
      <div className="text-center relative">
        <div className={`text-xl font-bold transition-all duration-300 ${
          showAI ? 'text-green-600' : displayAmount > 0 ? 'text-red-600' : 'text-gray-400'
        } ${isCountingUp ? 'animate-pulse scale-102' : ''}`}>
          {showAI ? '₹0' : formatCurrency(displayAmount)}
        </div>
        <p className="text-xs text-gray-600 mt-0.5">
          {showAI ? 'Prevented Loss' : 'Revenue Loss'}
        </p>
        {displayAmount > 0 && !showAI && (
          <>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-ping" />
            <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-red-600 rounded-full" />
          </>
        )}
        {showAI && (
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        )}
      </div>
      {displayAmount > 0 && !showAI && (
        <div className="space-y-1 animate-fade-in">
          <div className="text-xs font-semibold text-gray-700 border-b border-gray-200 pb-0.5">
            Loss Breakdown
          </div>
          <div className="flex justify-between items-center py-0.5 border-b border-gray-100 hover:bg-red-50 transition-colors duration-200 rounded px-0.5">
            <span className="text-xs text-gray-600 flex items-center gap-0.5">
              <div className="w-1 h-1 bg-red-400 rounded-full" />
              Lost Sales
            </span>
            <span className="font-semibold text-red-600">{formatCurrency(breakdown.lostSales)}</span>
          </div>
          <div className="flex justify-between items-center py-0.5 border-b border-gray-100 hover:bg-orange-50 transition-colors duration-200 rounded px-0.5">
            <span className="text-xs text-gray-600 flex items-center gap-0.5">
              <div className="w-1 h-1 bg-orange-400 rounded-full" />
              Customer Churn
            </span>
            <span className="font-semibold text-red-600">{formatCurrency(breakdown.customerChurn)}</span>
          </div>
          <div className="flex justify-between items-center py-0.5 border-b border-gray-100 hover:bg-yellow-50 transition-colors duration-200 rounded px-0.5">
            <span className="text-xs text-gray-600 flex items-center gap-0.5">
              <div className="w-1 h-1 bg-yellow-400 rounded-full" />
              Brand Impact
            </span>
            <span className="font-semibold text-red-600">{formatCurrency(breakdown.brandImpact)}</span>
          </div>
        </div>
      )}
      <div className={`flex items-center gap-1 p-1 rounded-md transition-all duration-300 transform hover:scale-101 shadow-sm ${
        showAI 
          ? 'bg-green-50 border border-green-200 shadow-green-50' 
          : displayAmount > 0 
            ? 'bg-red-50 border border-red-200 shadow-red-50' 
            : 'bg-gray-50 border border-gray-200'
      }`}>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
          showAI ? 'bg-green-100' : displayAmount > 0 ? 'bg-red-100' : 'bg-gray-100'
        }`}>
          {showAI ? (
            <Shield className="w-3 h-3 text-green-600" />
          ) : displayAmount > 0 ? (
            <TrendingDown className="w-3 h-3 text-red-600 animate-bounce" />
          ) : (
            <AlertCircle className="w-3 h-3 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <p className={`font-semibold text-xs ${
            showAI ? 'text-green-700' : displayAmount > 0 ? 'text-red-700' : 'text-gray-500'
          }`}>
            {showAI 
              ? 'Loss Prevention Active' 
              : displayAmount > 0 
                ? 'Financial Impact Detected' 
                : 'No Impact'
            }
          </p>
          <p className="text-xs text-gray-600">
            {showAI 
              ? 'AI prevented stockout scenario' 
              : displayAmount > 0 
                ? 'Due to inventory shortage' 
                : 'All systems normal'
            }
          </p>
        </div>
        <div className={`w-1.5 h-1.5 rounded-full ${
          showAI ? 'bg-green-500' : displayAmount > 0 ? 'bg-red-500 animate-pulse' : 'bg-gray-300'
        }`} />
      </div>
      {scene >= 3 && !showAI && (
        <div className="bg-orange-50 border border-orange-200 rounded-md p-1 animate-slide-up shadow-sm">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-2 h-2 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-0.5 text-orange-700">
                <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium">Recovery: 5-7 business days</span>
              </div>
              <div className="text-xs text-orange-600 mt-0.5">
                Additional costs: Expedited shipping, customer retention campaigns
              </div>
            </div>
          </div>
        </div>
      )}
      {showAI && (
        <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-md p-1 animate-fade-in shadow-sm">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-2 h-2 text-green-600" />
            </div>
            <div>
              <div className="text-xs font-medium text-green-700">₹2.3L Loss Prevented</div>
              <div className="text-xs text-green-600">ROI: 1,150% on AI investment</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- AIPredictor ---
const AIPredictor: React.FC = () => {
  return (
    <div className="space-y-2 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg" />
      <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-sm animate-pulse" />
      <div className="text-center relative z-10">
        <div className="w-8 h-8 mx-auto mb-1 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-base font-bold text-white mb-0.5">AI Prediction Engine</h3>
        <p className="text-teal-100 text-xs flex items-center justify-center gap-0.5">
          <Clock className="w-2 h-2" />
          7 days ahead of demand spike
        </p>
      </div>
      <div className="space-y-1 relative z-10">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-1 border border-white/10 hover:bg-white/10 transition-all duration-200 transform hover:scale-101">
          <div className="flex items-center gap-1 mb-0.5">
            <div className="w-5 h-5 bg-yellow-400/10 rounded flex items-center justify-center">
              <Zap className="w-2 h-2 text-yellow-300" />
            </div>
            <span className="font-semibold text-white text-xs">Early Warning System</span>
          </div>
          <p className="text-teal-100 text-xs leading-tight">
            Festival season spike detected 7 days early using historical patterns, weather data, and social media sentiment analysis
          </p>
          <div className="mt-0.5 flex items-center gap-0.5">
            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-xs text-yellow-200">Confidence: 94.7%</span>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-1 border border-white/10 hover:bg-white/10 transition-all duration-200 transform hover:scale-101">
          <div className="flex items-center gap-1 mb-0.5">
            <div className="w-5 h-5 bg-green-400/10 rounded flex items-center justify-center">
              <Shield className="w-2 h-2 text-green-300" />
            </div>
            <span className="font-semibold text-white text-xs">Automated Reorder</span>
          </div>
          <p className="text-teal-100 text-xs leading-tight">
            Emergency restock of 800 units automatically triggered with expedited supplier notification
          </p>
          <div className="mt-0.5 flex items-center gap-0.5">
            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-200">Status: Order Placed</span>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-1 border border-white/10 hover:bg-white/10 transition-all duration-200 transform hover:scale-101">
          <div className="flex items-center gap-1 mb-0.5">
            <div className="w-5 h-5 bg-blue-400/10 rounded flex items-center justify-center">
              <Target className="w-2 h-2 text-blue-300" />
            </div>
            <span className="font-semibold text-white text-xs">Impact Prevention</span>
          </div>
          <p className="text-teal-100 text-xs leading-tight">
            ₹2.3L revenue loss prevented ✔ Zero stockout incidents ✔ 100% customer satisfaction maintained ✔ Brand reputation protected
          </p>
          <div className="mt-0.5 flex items-center gap-0.5">
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-xs text-blue-200">ROI: 1,150%</span>
          </div>
        </div>
      </div>
      <div className="text-center pt-1 border-t border-white/10 relative z-10">
        <div className="grid grid-cols-2 gap-1">
          <div className="text-center">
            <div className="text-base font-bold text-white animate-pulse">99.2%</div>
            <div className="text-xs text-teal-100">Prediction Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-base font-bold text-white animate-pulse">2.3s</div>
            <div className="text-xs text-teal-100">Response Time</div>
          </div>
        </div>
      </div>
      <div className="absolute top-1 left-1 w-1 h-1 bg-white/20 rounded-full animate-ping" />
      <div className="absolute bottom-2 right-2 w-0.5 h-0.5 bg-teal-300/30 rounded-full animate-pulse" />
    </div>
  );
};

// --- TimelineControls ---
const TimelineControls: React.FC<{
  currentScene: string;
  isPlaying: boolean;
  showAI: boolean;
  onPlay: () => void;
  onAIDemo: () => void;
  onReset: () => void;
  onSceneChange: (scene: string) => void;
}> = ({
  currentScene,
  isPlaying,
  showAI,
  onPlay,
  onAIDemo,
  onReset,
  onSceneChange
}) => {
  const scenes = [
    { id: '0', title: 'Steady Sales', icon: TrendingUp, color: 'text-teal-600', bgColor: 'bg-teal-100' },
    { id: '1', title: 'Demand Spike', icon: TrendingUp, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { id: '2', title: 'Rapid Depletion', icon: Clock, color: 'text-red-600', bgColor: 'bg-red-100' },
    { id: '3', title: 'Stockout Crisis', icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-100' }
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-0.5">Scenario Timeline</h3>
          <p className="text-xs text-gray-600">Interactive demo of inventory crisis and AI prevention</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onPlay}
            disabled={isPlaying}
            className={`flex items-center gap-0.5 px-2 py-1 rounded-md font-semibold transition-all transform hover:scale-101 shadow-sm ${
              isPlaying 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 hover:shadow-md'
            }`}
          >
            {isPlaying ? (
              <>
                <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                Playing...
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                Play Scenario
              </>
            )}
          </button>
          <button
            onClick={onAIDemo}
            className="flex items-center gap-0.5 px-2 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-md font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all shadow-sm hover:shadow-md transform hover:scale-101"
          >
            <Brain className="w-3 h-3" />
            AI Solution
            <Zap className="w-2 h-2 animate-pulse" />
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-0.5 px-2 py-1 bg-gray-100 text-gray-600 rounded-md font-semibold hover:bg-gray-200 transition-all transform hover:scale-101"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>
      <div className="relative">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-3 left-3 right-3 h-0.5 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(parseInt(currentScene) / (scenes.length - 1)) * 100}%` }}
            />
          </div>
          {scenes.map((scene, index) => {
            const Icon = scene.icon;
            const isActive = parseInt(currentScene) >= parseInt(scene.id);
            const isCurrent = currentScene === scene.id;
            return (
              <div key={scene.id} className="flex flex-col items-center relative z-10">
                <button
                  onClick={() => !isPlaying && onSceneChange(scene.id)}
                  disabled={isPlaying}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border-2 shadow-sm transform hover:scale-102 ${
                    isCurrent
                      ? 'bg-teal-500 border-teal-500 text-white shadow-teal-100 scale-102 animate-pulse'
                      : isActive
                        ? `${scene.bgColor} border-teal-400 ${scene.color} shadow-sm`
                        : 'bg-white border-gray-300 text-gray-400 hover:border-gray-400'
                  } ${!isPlaying ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                >
                  <Icon className={`w-3 h-3 ${isCurrent ? 'animate-bounce' : ''}`} />
                </button>
                <div className="text-center mt-1">
                  <div className={`text-xs font-semibold transition-colors duration-200 ${
                    isCurrent ? 'text-teal-600' : isActive ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {scene.title}
                  </div>
                  <div className={`text-xs mt-0.5 transition-colors duration-200 ${
                    isCurrent ? 'text-teal-500' : 'text-gray-500'
                  }`}>
                    Day {parseInt(scene.id) + 1}
                  </div>
                </div>
                {isCurrent && (
                  <div className="absolute -bottom-0.5 w-1 h-1 bg-teal-500 rounded-full animate-ping" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={`p-2 rounded-md border transition-all duration-300 transform hover:scale-101 shadow-sm ${
        showAI 
          ? 'bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200 shadow-purple-50' 
          : parseInt(currentScene) >= 3 
            ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200 shadow-red-50' 
            : parseInt(currentScene) >= 2 
              ? 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 shadow-orange-50' 
              : 'bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200 shadow-teal-50'
      }`}>
        <div className="flex items-start gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            showAI 
              ? 'bg-purple-100' 
              : parseInt(currentScene) >= 3 
                ? 'bg-red-100' 
                : parseInt(currentScene) >= 2 
                  ? 'bg-orange-100' 
                  : 'bg-teal-100'
          }`}>
            {showAI ? (
              <Brain className="w-4 h-4 text-purple-600 animate-pulse" />
            ) : parseInt(currentScene) >= 3 ? (
              <AlertTriangle className="w-4 h-4 text-red-600 animate-bounce" />
            ) : parseInt(currentScene) >= 2 ? (
              <Clock className="w-4 h-4 text-orange-600 animate-spin" />
            ) : (
              <TrendingUp className="w-4 h-4 text-teal-600" />
            )}
          </div>
          <div className="flex-1">
            <p className={`font-semibold text-sm mb-0.5 ${
              showAI 
                ? 'text-purple-700' 
                : parseInt(currentScene) >= 3 
                  ? 'text-red-700' 
                  : parseInt(currentScene) >= 2 
                    ? 'text-orange-700' 
                    : 'text-teal-700'
            }`}>
              {showAI 
                ? 'AI Prevention Mode: Crisis Averted' 
                : parseInt(currentScene) >= 3 
                  ? 'Stockout Crisis: Immediate Action Required' 
                  : parseInt(currentScene) >= 2 
                    ? 'Critical Inventory Levels: High Risk' 
                    : parseInt(currentScene) >= 1 
                      ? 'Demand Spike Detected: Monitor Closely' 
                      : 'Normal Operations: All Systems Green'
              }
            </p>
            <p className="text-xs text-gray-600 leading-tight">
              {showAI 
                ? 'AI predicted demand surge 7 days early and prevented stockout through automated reordering. Revenue protected, customers satisfied, and operational efficiency maintained.' 
                : parseInt(currentScene) >= 3 
                  ? 'Product unavailable to customers. Estimated revenue loss: ₹2.3L. Recovery time: 5-7 business days. Customer satisfaction at risk.' 
                  : parseInt(currentScene) >= 2 
                    ? 'Inventory depleting at 4.2x normal rate. Stockout imminent within hours without immediate intervention. Emergency restock required.' 
                    : parseInt(currentScene) >= 1 
                      ? 'Festival season driving unexpected 2.5x demand spike. Current inventory levels becoming critical. Monitoring required.' 
                      : 'Sales following expected patterns with healthy inventory levels. All key performance indicators within normal ranges.'
              }
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center gap-0.5">
                <div className={`w-1 h-1 rounded-full ${
                  showAI ? 'bg-green-500' : parseInt(currentScene) >= 3 ? 'bg-red-500 animate-pulse' : parseInt(currentScene) >= 2 ? 'bg-orange-500' : 'bg-teal-500'
                }`} />
                <span className="text-xs text-gray-600">
                  {showAI ? 'Protected' : parseInt(currentScene) >= 3 ? 'Critical' : parseInt(currentScene) >= 2 ? 'Warning' : 'Normal'}
                </span>
              </div>
              {!showAI && (
                <div className="text-xs text-gray-500">
                  Scene {parseInt(currentScene) + 1} of {scenes.length}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Stock Component ---
interface StockProps {
  isLoaded: boolean;
  onClose?: () => void;
}

const Stock: React.FC<StockProps> = ({ isLoaded, onClose }) => {
  const [currentScene, setCurrentScene] = useState('0');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);

  // Auto-play animation on page load
  useEffect(() => {
    const autoPlayTimer = setTimeout(() => {
      if (!hasAutoPlayed && isLoaded) {
        setHasAutoPlayed(true);
        handlePlay();
      }
    }, 500);

    return () => clearTimeout(autoPlayTimer);
  }, [hasAutoPlayed, isLoaded]);

  // Scene timing and progression
  useEffect(() => {
    if (!isPlaying) return;

    const timers = [
      setTimeout(() => setCurrentScene('1'), 1000),  // Scene 1: Spike
      setTimeout(() => setCurrentScene('2'), 2000),  // Scene 2: Countdown
      setTimeout(() => setCurrentScene('3'), 3000),  // Scene 3: Stockout
      setTimeout(() => {
        setIsPlaying(false);
        setCurrentScene('3');
      }, 4000), // End
    ];

    return () => timers.forEach(clearTimeout);
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
    setCurrentScene('0');
    setShowAI(false);
  };

  const handleAIDemo = () => {
    setShowAI(true);
    setCurrentScene('0');
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentScene('0');
    setIsPlaying(false);
    setShowAI(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10">
      <div className="bg-white rounded-lg shadow-lg p-1 md:p-3 w-full max-w-5xl max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={() => onClose && onClose()}
          className="absolute top-1 right-1 z-50 text-black hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-full bg-white/80 backdrop-blur-sm p-0.5 shadow-sm"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="min-h-screen w-full bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-teal-900 dark:to-blue-900 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-teal-200/10 to-cyan-200/10 rounded-full blur-sm transition-all duration-500 ${isLoaded ? 'animate-pulse' : 'scale-0'}`} />
            <div className={`absolute -bottom-24 -left-24 w-56 h-56 bg-gradient-to-tr from-blue-200/5 to-teal-200/5 rounded-full blur-sm transition-all duration-600 delay-100 ${isLoaded ? 'animate-pulse' : 'scale-0'}`} />
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-cyan-100/5 to-teal-100/5 rounded-full blur-sm transition-all duration-700 delay-200 ${isLoaded ? 'animate-spin' : 'scale-0'}`} style={{ animationDuration: '10s' }} />
          </div>

          {/* Header */}
          <header className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-teal-100 dark:border-gray-700 sticky top-0 z-40 transition-all duration-300 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
            <div className="max-w-5xl mx-auto px-2 py-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className={`w-6 h-6 bg-gradient-to-r from-teal-500 to-cyan-500 rounded flex items-center justify-center transition-all duration-300 delay-100 ${isLoaded ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
                    <Brain className="w-3 h-3 text-white dark:text-white" />
                  </div>
                  <div className={`transition-all duration-300 delay-200 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'}`}>
                    <h1 className="text-lg font-bold text-gray-800 dark:text-white">StockSense AI</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Predictive Inventory Intelligence</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 transition-all duration-300 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}>
                  <div className="px-1 py-0.5 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded-full text-xs font-medium animate-pulse">
                    Live Demo
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-5xl mx-auto px-1 sm:px-2 md:px-3 py-1 md:py-2 relative z-10">
            {/* Title Section */}
            <div className={`text-center mb-4 transition-all duration-400 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                The Invisible Stockout
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                Watch how a normal sales pattern can lead to stockouts, and see how AI prevents losses.
              </p>
            </div>

            {/* Visualization Area */}
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-1 md:gap-2 mb-2 transition-all duration-400 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {/* Main Chart */}
              <div className="lg:col-span-2">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-1 md:p-2 h-[300px] md:h-[400px] relative overflow-hidden border border-white/50 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold text-gray-800 dark:text-white">Product Sales Trend</h3>
                    <FestivalIndicator scene={parseInt(currentScene)} />
                  </div>
                  
                  <BarChart 
                    scene={parseInt(currentScene)} 
                    showAI={showAI}
                    className="h-[280px]"
                  />

                  {/* Scene Overlays */}
                  {parseInt(currentScene) >= 3 && !showAI && (
                    <div className="absolute inset-0 bg-red-500/5 flex items-center justify-center backdrop-blur-sm animate-fade-in">
                      <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg text-center max-w-xs transform animate-bounce-in">
                        <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-1 animate-pulse" />
                        <h4 className="text-base font-bold text-red-600 dark:text-red-400 mb-0.5">OUT OF STOCK</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">Critical inventory shortage detected</p>
                      </div>
                    </div>
                  )}

                  {/* Floating particles effect */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1 h-1 bg-teal-400/10 rounded-full transition-all duration-500 ${isLoaded ? 'animate-float' : 'opacity-0'}`}
                        style={{
                          left: `${15 + i * 15}%`,
                          top: `${20 + (i % 2) * 20}%`,
                          animationDelay: `${i * 200}ms`,
                          animationDuration: `${1000 + i * 200}ms`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Side Panels */}
              <div className="space-y-2">
                {/* Inventory Counter */}
                <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-1 border border-white/50 dark:border-gray-700 transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
                  <div className="flex items-center gap-1 mb-0.5">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-blue-600 dark:text-blue-300" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Inventory Level</h3>
                  </div>
                  <InventoryCounter scene={parseInt(currentScene)} showAI={showAI} />
                </div>

                {/* Loss Counter */}
                <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-1 border border-white/50 dark:border-gray-700 transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
                  <div className="flex items-center gap-1 mb-0.5">
                    <div className="w-6 h-6 bg-red-100 dark:bg-red-900 rounded flex items-center justify-center">
                      <AlertTriangle className="w-3 h-3 text-red-600 dark:text-red-300" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Financial Impact</h3>
                  </div>
                  <LossCounter scene={parseInt(currentScene)} showAI={showAI} />
                </div>

                {/* AI Predictor */}
                {showAI && (
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg p-1 text-white animate-slide-up">
                    <AIPredictor />
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-1 mb-2 border border-white/50 dark:border-gray-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
              <TimelineControls 
                currentScene={currentScene}
                isPlaying={isPlaying}
                showAI={showAI}
                onPlay={handlePlay}
                onAIDemo={handleAIDemo}
                onReset={handleReset}
                onSceneChange={setCurrentScene}
              />
            </div>

            {/* Impact Summary */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '700ms' }}>
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-2 border border-white/50 dark:border-gray-700">
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-2">Without AI Prediction</h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 transform hover:translate-x-0.5 transition-all duration-200">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-300" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white text-xs">₹2.3L Revenue Loss</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Due to stockout during peak demand</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 transform hover:translate-x-0.5 transition-all duration-200">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-orange-500 dark:text-orange-300" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white text-xs">5 Days Recovery Time</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">To restock and restore availability</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-2 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 animate-pulse" />
                <div className="relative z-10">
                  <h3 className="text-base font-semibold mb-2">With AI Prediction</h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 transform hover:translate-x-0.5 transition-all duration-200">
                      <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-xs">7-Day Advance Warning</p>
                        <p className="text-xs text-teal-100">Predict demand spikes before they happen</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 transform hover:translate-x-0.5 transition-all duration-200">
                      <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-xs">100% Availability Maintained</p>
                        <p className="text-xs text-teal-100">Automated reorder recommendations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Stock;