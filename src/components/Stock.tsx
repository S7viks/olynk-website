import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Clock, CheckCircle, AlertTriangle, Package, TrendingDown, Shield, AlertCircle, DollarSign, Play, RotateCcw, Zap, Target, Calendar } from 'lucide-react';

interface StockProps {
  isLoaded: boolean;
  onClose: () => void;
}

// --- FestivalIndicator ---
const FestivalIndicator: React.FC<{ scene: number }> = ({ scene }) => {
  const festivals = [
    { name: 'Normal', color: 'bg-gray-400' },
    { name: 'Diwali', color: 'bg-orange-400' },
    { name: 'Holi', color: 'bg-pink-400' },
    { name: 'Eid', color: 'bg-green-400' }
  ];

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${festivals[scene]?.color || festivals[0].color} transition-all duration-500`} />
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {festivals[scene]?.name || festivals[0].name}
      </span>
    </div>
  );
};

// --- StorybookChart ---
const StorybookChart: React.FC<{ scene: number; showAI: boolean; className?: string }> = ({ scene, showAI, className = "" }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const storySteps = [
    {
      title: "Peaceful Operations",
      description: "Normal sales patterns, steady inventory flow",
      data: [120, 135, 110, 125, 130, 140, 115],
      color: "from-blue-400 to-blue-500",
      icon: TrendingUp
    },
    {
      title: "Rising Tension",
      description: "First signs of increased demand",
      data: [120, 135, 150, 180, 200, 220, 240],
      color: "from-yellow-400 to-orange-500",
      icon: Clock
    },
    {
      title: "Critical Phase",
      description: "Demand skyrockets, inventory depleting fast",
      data: [240, 280, 320, 380, 420, 450, 480],
      color: "from-orange-400 to-red-500",
      icon: AlertTriangle
    },
    {
      title: "Crisis Point",
      description: "Complete stockout, revenue loss begins",
      data: [480, 520, 0, 0, 0, 0, 0],
      color: "from-red-400 to-red-600",
      icon: AlertTriangle
    }
  ];

  const currentStory = storySteps[scene] || storySteps[0];
  const Icon = currentStory.icon;

  return (
    <div className={`relative ${className}`}>
      {/* Story Header */}
      <div className="mb-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className={`w-8 h-8 bg-gradient-to-r ${currentStory.color} rounded-lg flex items-center justify-center shadow-lg`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">{currentStory.title}</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{currentStory.description}</p>
      </div>

      {/* Animated Chart */}
      <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-end justify-between h-full gap-2">
          {currentStory.data.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="relative w-full flex justify-center items-end h-48">
                <div
                  className={`w-6 bg-gradient-to-t ${currentStory.color} rounded-t-lg shadow-md transition-all duration-1000 ease-out`}
                style={{
                    height: `${(value / 500) * 100}%`,
                    animationDelay: `${index * 150}ms`
                  }}
                />
                {showAI && scene >= 1 && index >= 4 && (
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-lg" />
                )}
                </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                Day {index + 1}
                  </div>
              </div>
          ))}
            </div>

        {/* AI Prediction Overlay */}
        {showAI && scene >= 1 && (
          <div className="absolute inset-0 bg-green-500/10 rounded-lg flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border-2 border-green-200 dark:border-green-700">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-600">AI Prediction Active</span>
            </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Demand spike predicted 7 days early
              </p>
          </div>
      </div>
        )}

        {/* Crisis Overlay */}
        {scene >= 3 && !showAI && (
          <div className="absolute inset-0 bg-red-500/10 rounded-lg flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border-2 border-red-200 dark:border-red-700">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="font-bold text-red-600">STOCKOUT CRISIS</span>
      </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Revenue loss: ₹2.3L and counting...
              </p>
        </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SmartInventory ---
const SmartInventory: React.FC<{ scene: number; showAI: boolean }> = ({ scene, showAI }) => {
  const [inventory, setInventory] = useState(1200);
  
  useEffect(() => {
    if (showAI) {
      setInventory(1200);
      return;
    }
    
    const levels = [1200, 850, 200, 0];
    setInventory(levels[scene] || 1200);
  }, [scene, showAI]);

  const getStatus = () => {
    if (showAI) return { text: 'AI Optimized', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (inventory === 0) return { text: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    if (inventory < 300) return { text: 'Low Stock', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
    return { text: 'Healthy', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
  };

  const status = getStatus();

    return (
    <div className="space-y-3">
      {/* Main Display */}
      <div className="text-center">
        <div className={`text-2xl font-bold ${status.color} mb-1`}>
          {inventory.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Units Available</div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div 
          className={`h-3 rounded-full transition-all duration-1000 ${
            showAI ? 'bg-gradient-to-r from-green-400 to-green-500' :
            inventory === 0 ? 'bg-gradient-to-r from-red-400 to-red-500' :
            inventory < 300 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
            'bg-gradient-to-r from-blue-400 to-blue-500'
          }`}
          style={{ width: `${(inventory / 1200) * 100}%` }}
        />
          </div>

      {/* Status Card */}
      <div className={`p-3 rounded-lg border ${status.bg} ${status.border}`}>
        <div className="flex items-center gap-2">
          {showAI ? (
            <Brain className="w-4 h-4 text-green-600" />
          ) : inventory === 0 ? (
            <AlertTriangle className="w-4 h-4 text-red-600" />
          ) : inventory < 300 ? (
            <Clock className="w-4 h-4 text-orange-600" />
          ) : (
            <CheckCircle className="w-4 h-4 text-green-600" />
          )}
          <span className={`font-semibold text-sm ${status.color}`}>
            {status.text}
                </span>
              </div>
              </div>

      {/* AI Insights */}
      {showAI && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-green-600" />
            <span className="font-semibold text-sm text-green-700">AI Insights</span>
            </div>
          <p className="text-xs text-green-600">
            Proactive restocking scheduled • 7-day advance warning • Zero stockout risk
          </p>
        </div>
      )}
    </div>
  );
};

// --- FinancialImpact ---
const FinancialImpact: React.FC<{ scene: number; showAI: boolean }> = ({ scene, showAI }) => {
  const [displayAmount, setDisplayAmount] = useState(0);
  
  useEffect(() => {
    if (showAI) {
      setDisplayAmount(0);
      return;
    }
    
    const amounts = [0, 45000, 120000, 230000];
    setDisplayAmount(amounts[scene] || 0);
  }, [scene, showAI]);

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <div className="space-y-3">
      {/* Main Display */}
      <div className="text-center">
        <div className={`text-2xl font-bold ${showAI ? 'text-green-600' : displayAmount > 0 ? 'text-red-600' : 'text-gray-400'}`}>
          {showAI ? '₹0' : formatCurrency(displayAmount)}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {showAI ? 'Loss Prevented' : 'Revenue Loss'}
      </div>
          </div>

      {/* Impact Card */}
      <div className={`p-3 rounded-lg border ${
        showAI 
          ? 'bg-green-50 border-green-200' 
          : displayAmount > 0 
            ? 'bg-red-50 border-red-200' 
            : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="flex items-center gap-2">
          {showAI ? (
            <Shield className="w-4 h-4 text-green-600" />
          ) : displayAmount > 0 ? (
            <TrendingDown className="w-4 h-4 text-red-600" />
          ) : (
            <CheckCircle className="w-4 h-4 text-gray-400" />
          )}
          <span className={`font-semibold text-sm ${
            showAI ? 'text-green-700' : displayAmount > 0 ? 'text-red-700' : 'text-gray-500'
          }`}>
            {showAI ? 'AI Protection Active' : displayAmount > 0 ? 'Financial Impact' : 'No Impact'}
          </span>
        </div>
      </div>

      {/* Recovery Info */}
      {scene >= 3 && !showAI && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-orange-600" />
            <span className="font-semibold text-sm text-orange-700">Recovery Timeline</span>
            </div>
          <p className="text-xs text-orange-600">
            5-7 business days to restock • Additional costs: ₹50K expedited shipping
          </p>
        </div>
      )}
    </div>
  );
};

// --- AIProtector ---
const AIProtector: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="text-center">
        <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">AI Protection System</h3>
        <p className="text-sm text-purple-100">Active 24/7 monitoring</p>
      </div>

      {/* Protection Features */}
      <div className="space-y-2">
        <div className="bg-white/10 rounded-lg p-2 border border-white/20">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-green-400/20 rounded flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-green-300" />
            </div>
            <span className="font-semibold text-white text-sm">Early Warning</span>
          </div>
          <p className="text-xs text-purple-100">
            7-day advance prediction of demand spikes
          </p>
          </div>

        <div className="bg-white/10 rounded-lg p-2 border border-white/20">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-blue-400/20 rounded flex items-center justify-center">
              <Zap className="w-3 h-3 text-blue-300" />
        </div>
            <span className="font-semibold text-white text-sm">Auto Reorder</span>
            </div>
          <p className="text-xs text-purple-100">
            Automatic restock triggers with supplier alerts
          </p>
          </div>

        <div className="bg-white/10 rounded-lg p-2 border border-white/20">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-purple-400/20 rounded flex items-center justify-center">
              <Target className="w-3 h-3 text-purple-300" />
        </div>
            <span className="font-semibold text-white text-sm">Loss Prevention</span>
            </div>
          <p className="text-xs text-purple-100">
            ₹2.3L revenue protected • 100% availability maintained
          </p>
          </div>
        </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/20">
          <div className="text-center">
          <div className="text-lg font-bold text-white">99.2%</div>
          <div className="text-xs text-purple-100">Accuracy</div>
          </div>
          <div className="text-center">
          <div className="text-lg font-bold text-white">2.3s</div>
          <div className="text-xs text-purple-100">Response</div>
          </div>
        </div>
    </div>
  );
};

// --- StoryControls ---
const StoryControls: React.FC<{
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
    { id: '0', title: 'Chapter 1', subtitle: 'The Beginning', icon: TrendingUp },
    { id: '1', title: 'Chapter 2', subtitle: 'Rising Tension', icon: Clock },
    { id: '2', title: 'Chapter 3', subtitle: 'The Crisis', icon: AlertTriangle },
    { id: '3', title: 'Chapter 4', subtitle: 'The Fallout', icon: AlertTriangle }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">The Stockout Story</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Interactive narrative of inventory crisis</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onPlay}
            disabled={isPlaying}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              isPlaying 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
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
                Play Story
              </>
            )}
          </button>
          <button
            onClick={onAIDemo}
            className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition-all"
          >
            <Brain className="w-3 h-3" />
            AI Solution
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg font-semibold hover:bg-gray-200 transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>

      {/* Story Timeline */}
      <div className="relative">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-500"
              style={{ width: `${(parseInt(currentScene) / (scenes.length - 1)) * 100}%` }}
            />
          </div>
          {scenes.map((scene, index) => {
            const Icon = scene.icon;
            const isActive = parseInt(currentScene) >= parseInt(scene.id);
            const isCurrent = parseInt(currentScene) === parseInt(scene.id);
            
            return (
                <button
                key={scene.id}
                onClick={() => onSceneChange(scene.id)}
                className={`relative z-10 flex flex-col items-center gap-1 transition-all ${
                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isCurrent
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-110' 
                      : isActive
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                }`}>
                  <Icon className="w-4 h-4" />
                  </div>
                <div className="text-center">
                  <div className="text-xs font-semibold">{scene.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{scene.subtitle}</div>
                  </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Status */}
      <div className={`p-3 rounded-lg border transition-all ${
        showAI 
          ? 'bg-gradient-to-r from-green-50 to-teal-50 border-green-200' 
          : parseInt(currentScene) >= 3 
            ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200' 
            : parseInt(currentScene) >= 2 
              ? 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200' 
              : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
      }`}>
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            showAI 
              ? 'bg-green-100' 
              : parseInt(currentScene) >= 3 
                ? 'bg-red-100' 
                : parseInt(currentScene) >= 2 
                  ? 'bg-orange-100' 
                  : 'bg-blue-100'
          }`}>
            {showAI ? (
              <Brain className="w-3 h-3 text-green-600" />
            ) : parseInt(currentScene) >= 3 ? (
              <AlertTriangle className="w-3 h-3 text-red-600" />
            ) : parseInt(currentScene) >= 2 ? (
              <Clock className="w-3 h-3 text-orange-600" />
            ) : (
              <TrendingUp className="w-3 h-3 text-blue-600" />
            )}
          </div>
          <div>
            <div className="font-semibold text-sm text-gray-800 dark:text-white">
              {showAI 
                ? 'AI Protection Active' 
                : parseInt(currentScene) >= 3 
                  ? 'Critical Stockout Crisis' 
                  : parseInt(currentScene) >= 2 
                    ? 'Rapid Inventory Depletion' 
                    : 'Normal Operations'
              }
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {showAI 
                ? 'All systems protected by AI' 
                : parseInt(currentScene) >= 3 
                  ? 'Revenue loss accumulating' 
                  : parseInt(currentScene) >= 2 
                    ? 'Demand spike detected' 
                    : 'Steady sales patterns'
              }
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
    }, 1000);

    return () => clearTimeout(autoPlayTimer);
  }, [hasAutoPlayed, isLoaded]);

  // Scene timing and progression
  useEffect(() => {
    if (!isPlaying) return;

    const timers = [
      setTimeout(() => setCurrentScene('1'), 2000),  // Scene 1: Spike
      setTimeout(() => setCurrentScene('2'), 4000),  // Scene 2: Countdown
      setTimeout(() => setCurrentScene('3'), 6000),  // Scene 3: Stockout
      setTimeout(() => {
        setIsPlaying(false);
        setCurrentScene('3');
      }, 8000), // End
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
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 rounded-xl overflow-hidden relative shadow-lg border border-slate-200 dark:border-slate-700">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#64748B_1px,transparent_1px),linear-gradient(to_bottom,#64748B_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-5 pointer-events-none" />
      
      {/* Soft Gradient Overlays */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-400/5 dark:bg-blue-400/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-indigo-400/5 dark:bg-indigo-400/10 rounded-full blur-2xl" />

          {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 z-40">
        <div className="px-4 py-3">
              <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 rounded-lg flex items-center justify-center shadow-md">
                <Brain className="w-4 h-4 text-white" />
                  </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800 dark:text-white">StockSense AI</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">Predictive Inventory Intelligence</p>
                  </div>
                </div>
            <div className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-white rounded-full text-sm font-semibold shadow-md">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    Live Demo
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
      <main className="px-4 py-4 relative z-10">
            {/* Title Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                The Invisible Stockout
              </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 mx-auto rounded-full mb-3" />
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                Watch how sales spikes lead to stockouts, and see how AI prevents losses.
              </p>
            </div>

            {/* Visualization Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              {/* Main Chart */}
              <div className="lg:col-span-2">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-md p-4 h-[350px] md:h-[400px] relative overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Storybook Chart</h3>
                    <FestivalIndicator scene={parseInt(currentScene)} />
                  </div>
                  
              <StorybookChart 
                    scene={parseInt(currentScene)} 
                    showAI={showAI}
                className="h-[280px] md:h-[330px]"
              />
                </div>
              </div>

              {/* Side Panels */}
          <div className="space-y-4">
                {/* Inventory Counter */}
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-md p-4 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 rounded-lg flex items-center justify-center shadow-md">
                  <Package className="w-4 h-4 text-white" />
                    </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-white">Inventory Level</h3>
                  </div>
              <SmartInventory scene={parseInt(currentScene)} showAI={showAI} />
                </div>

                {/* Loss Counter */}
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-md p-4 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-400 dark:to-red-500 rounded-lg flex items-center justify-center shadow-md">
                  <DollarSign className="w-4 h-4 text-white" />
                    </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-white">Financial Impact</h3>
                  </div>
              <FinancialImpact scene={parseInt(currentScene)} showAI={showAI} />
                </div>

                {/* AI Predictor */}
                {showAI && (
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 rounded-lg p-4 text-white shadow-md border border-purple-400/30 dark:border-blue-400/30">
                <AIProtector />
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-md p-4 mb-6 border border-slate-200 dark:border-slate-700">
          <StoryControls 
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-md p-4 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-400 dark:to-red-500 rounded-lg flex items-center justify-center shadow-md">
                <AlertTriangle className="w-3 h-3 text-white" />
              </div>
              Without AI Prediction
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-400 dark:to-red-500 rounded-lg flex items-center justify-center shadow-md">
                  <AlertTriangle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                  <p className="font-bold text-slate-800 dark:text-white text-sm">₹2.3L Revenue Loss</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Due to stockout during peak demand</p>
                    </div>
                  </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500 rounded-lg flex items-center justify-center shadow-md">
                  <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <div>
                  <p className="font-bold text-slate-800 dark:text-white text-sm">5 Days Recovery Time</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">To restock and restore availability</p>
                    </div>
                  </div>
                </div>
              </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 rounded-lg shadow-md p-4 text-white relative overflow-hidden border border-purple-400/30 dark:border-blue-400/30">
                <div className="relative z-10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center shadow-md">
                  <Brain className="w-3 h-3 text-white" />
                </div>
                With AI Prediction
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg border border-white/20">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shadow-md">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div>
                    <p className="font-bold text-sm">7-Day Advance Warning</p>
                    <p className="text-sm text-purple-100">Predict demand spikes before they happen</p>
                      </div>
                    </div>
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg border border-white/20">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shadow-md">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div>
                    <p className="font-bold text-sm">100% Availability Maintained</p>
                    <p className="text-sm text-purple-100">Automated reorder recommendations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
  );
};

export default Stock;