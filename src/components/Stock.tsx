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
      <div className={`w-3 h-3 rounded-full ${festivals[scene]?.color || festivals[0].color} transition-all duration-500 animate-pulse`} />
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {festivals[scene]?.name || festivals[0].name}
      </span>
    </div>
  );
};

// --- StorybookChart ---
const StorybookChart: React.FC<{ scene: number; showAI: boolean; className?: string }> = ({ scene, showAI, className = "" }) => {
  const [animatedValues, setAnimatedValues] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const storySteps = [
    {
      title: "Peaceful Operations",
      description: "Normal sales patterns, steady inventory flow",
      data: [120, 135, 110, 125, 130, 140, 115],
      color: "blue",
      icon: TrendingUp
    },
    {
      title: "Rising Tension",
      description: "First signs of increased demand",
      data: [120, 135, 150, 180, 200, 220, 240],
      color: "orange",
      icon: Clock
    },
    {
      title: "Critical Phase",
      description: "Demand skyrockets, inventory depleting fast",
      data: [240, 280, 320, 380, 420, 450, 480],
      color: "red",
      icon: AlertTriangle
    },
    {
      title: "Crisis Point",
      description: "Complete stockout, revenue loss begins",
      data: [480, 520, 0, 0, 0, 0, 0],
      color: "red",
      icon: AlertTriangle
    }
  ];

  const currentStory = storySteps[scene] || storySteps[0];
  const Icon = currentStory.icon;

  // Animate chart values
  useEffect(() => {
    setIsAnimating(true);
    const targetValues = currentStory.data;
    
    // Reset to 0 first
    setAnimatedValues(new Array(targetValues.length).fill(0));
    
    // Animate to target values
    const timer = setTimeout(() => {
      setAnimatedValues(targetValues);
      setIsAnimating(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [scene, currentStory.data]);

  return (
    <div className={`relative ${className}`}>
      {/* Story Header */}
      <div className="mb-3 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className={`w-6 h-6 bg-${currentStory.color}-500 rounded-lg flex items-center justify-center shadow-sm animate-pulse`}>
            <Icon className="w-3 h-3 text-white" />
          </div>
          <h3 className="text-base font-bold text-gray-800 dark:text-white">{currentStory.title}</h3>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400">{currentStory.description}</p>
      </div>

      {/* Animated Chart */}
      <div className="relative h-48 bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
        <div className="flex items-end justify-between h-full gap-1">
          {animatedValues.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="relative w-full flex justify-center items-end h-36">
                <div
                  className={`w-4 bg-blue-500 rounded-t-lg shadow-sm transition-all duration-1000 ease-out ${
                    isAnimating ? 'animate-bounce' : ''
                  }`}
                  style={{
                    height: `${Math.min((value / 500) * 100, 100)}%`,
                    animationDelay: `${index * 150}ms`
                  }}
                />
                {showAI && scene >= 1 && index >= 4 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white shadow-sm animate-ping" />
                )}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Day {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* AI Prediction Overlay */}
        {showAI && scene >= 1 && (
          <div
            className="absolute inset-0 bg-green-500/10 rounded-lg animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        )}
      </div>
    </div>
  );
};

// --- SmartInventory ---
const SmartInventory: React.FC<{ scene: number; showAI: boolean }> = ({ scene, showAI }) => {
  const [inventory, setInventory] = useState(1200);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (showAI) {
      setInventory(1200);
      return;
    }
    
    setIsAnimating(true);
    const levels = [1200, 850, 200, 0];
    const targetLevel = levels[scene] || 1200;
    
    // Animate inventory change
    const timer = setTimeout(() => {
      setInventory(targetLevel);
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [scene, showAI]);

  const getStatus = () => {
    if (showAI) return { text: 'AI Optimized', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (inventory === 0) return { text: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    if (inventory < 300) return { text: 'Low Stock', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
    return { text: 'Healthy', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
  };

  const status = getStatus();

  return (
    <div className="space-y-2">
      {/* Main Display */}
      <div className="text-center">
        <div className={`text-xl font-bold ${status.color} mb-1 ${isAnimating ? 'animate-pulse' : ''}`}>
          {inventory.toLocaleString()}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">Units Available</div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
        <div 
          className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${
            showAI ? 'bg-green-500' :
            inventory === 0 ? 'bg-red-500' :
            inventory < 300 ? 'bg-orange-500' :
            'bg-blue-500'
          }`}
          style={{ width: `${Math.min((inventory / 1200) * 100, 100)}%` }}
        />
      </div>

      {/* Status Card */}
      <div className={`p-2 rounded-lg border ${status.bg} ${status.border} transition-all duration-300 ${
        isAnimating ? 'animate-pulse' : ''
      }`}>
        <div className="flex items-center gap-2">
          {showAI ? (
            <Brain className="w-3 h-3 text-green-600 animate-pulse" />
          ) : inventory === 0 ? (
            <AlertTriangle className="w-3 h-3 text-red-600 animate-bounce" />
          ) : inventory < 300 ? (
            <Clock className="w-3 h-3 text-orange-600 animate-pulse" />
          ) : (
            <CheckCircle className="w-3 h-3 text-green-600" />
          )}
          <span className={`font-semibold text-xs ${status.color}`}>
            {status.text}
          </span>
        </div>
      </div>

      {/* AI Insights */}
      {showAI && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-2 animate-fade-in">
          <div className="flex items-center gap-1 mb-1">
            <Brain className="w-3 h-3 text-green-600 animate-pulse" />
            <span className="font-semibold text-xs text-green-700">AI Insights</span>
          </div>
          <p className="text-xs text-green-600">
            Proactive restocking • 7-day warning • Zero stockout risk
          </p>
        </div>
      )}
    </div>
  );
};

// --- FinancialImpact ---
const FinancialImpact: React.FC<{ scene: number; showAI: boolean }> = ({ scene, showAI }) => {
  const [displayAmount, setDisplayAmount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (showAI) {
      setDisplayAmount(0);
      return;
    }
    
    setIsAnimating(true);
    const amounts = [0, 45000, 120000, 230000];
    const targetAmount = amounts[scene] || 0;
    
    // Animate amount change
    const timer = setTimeout(() => {
      setDisplayAmount(targetAmount);
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [scene, showAI]);

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const getImpactColor = () => {
    if (showAI) return 'text-green-600';
    if (displayAmount === 0) return 'text-gray-600';
    if (displayAmount < 50000) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-2">
      {/* Main Display */}
      <div className="text-center">
        <div className={`text-xl font-bold ${getImpactColor()} mb-1 ${isAnimating ? 'animate-pulse' : ''}`}>
          {formatCurrency(displayAmount)}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {showAI ? 'Loss Prevented' : 'Revenue Loss'}
        </div>
      </div>

      {/* Impact Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
        <div 
          className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${
            showAI ? 'bg-green-500' :
            displayAmount === 0 ? 'bg-gray-500' :
            displayAmount < 50000 ? 'bg-orange-500' :
            'bg-red-500'
          }`}
          style={{ width: `${Math.min((displayAmount / 230000) * 100, 100)}%` }}
        />
      </div>

      {/* Status Card */}
      <div className={`p-2 rounded-lg border transition-all duration-300 ${
        showAI ? 'bg-green-50 border-green-200' :
        displayAmount === 0 ? 'bg-gray-50 border-gray-200' :
        displayAmount < 50000 ? 'bg-orange-50 border-orange-200' :
        'bg-red-50 border-red-200'
      } ${isAnimating ? 'animate-pulse' : ''}`}>
        <div className="flex items-center gap-2">
          {showAI ? (
            <Shield className="w-3 h-3 text-green-600 animate-pulse" />
          ) : displayAmount === 0 ? (
            <CheckCircle className="w-3 h-3 text-gray-600" />
          ) : displayAmount < 50000 ? (
            <AlertCircle className="w-3 h-3 text-orange-600 animate-pulse" />
          ) : (
            <AlertTriangle className="w-3 h-3 text-red-600 animate-bounce" />
          )}
          <span className={`font-semibold text-xs ${
            showAI ? 'text-green-600' :
            displayAmount === 0 ? 'text-gray-600' :
            displayAmount < 50000 ? 'text-orange-600' :
            'text-red-600'
          }`}>
            {showAI ? 'Protected' : displayAmount === 0 ? 'No Loss' : 'Critical Loss'}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- AIProtector ---
const AIProtector: React.FC = () => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center shadow-md animate-pulse">
          <Brain className="w-3 h-3 text-white" />
        </div>
        <h3 className="text-sm font-bold text-white">AI Protection Active</h3>
      </div>
      <div className="space-y-1 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-blue-100">Demand spike detected 7 days ago</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-blue-100">Restocking order placed automatically</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-blue-100">Zero stockout risk maintained</span>
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
  return (
    <div className="space-y-3">
      {/* Scene Selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-800 dark:text-white">Story Progress</h3>
        <div className="flex gap-1">
          {['0', '1', '2', '3'].map((scene) => (
            <button
              key={scene}
              onClick={() => onSceneChange(scene)}
              className={`w-6 h-6 rounded-full text-xs font-semibold transition-all duration-300 ${
                currentScene === scene
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {parseInt(scene) + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onPlay}
          disabled={isPlaying}
          className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
            isPlaying
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          <Play className="w-3 h-3" />
          {isPlaying ? 'Playing...' : 'Play Story'}
        </button>

        <button
          onClick={onAIDemo}
          className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
            showAI
              ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
          }`}
        >
          <Brain className="w-3 h-3" />
          {showAI ? 'AI Active' : 'Show AI'}
        </button>

        <button
          onClick={onReset}
          className="px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold transition-all duration-300"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
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
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 rounded-lg flex items-center justify-center shadow-md animate-pulse">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800 dark:text-white">StockSense AI</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">Predictive Inventory Intelligence</p>
              </div>
            </div>
            <div className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-white rounded-full text-sm font-semibold shadow-md">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Live Demo
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4 relative z-10 overflow-y-auto max-h-[calc(100vh-200px)]">
        {/* Title Section */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            The Invisible Stockout
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 mx-auto rounded-full mb-2" />
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Watch how sales spikes lead to stockouts, and see how AI prevents losses.
          </p>
        </div>

        {/* Visualization Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-md p-4 min-h-[300px] relative overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-800 dark:text-white">Storybook Chart</h3>
                <FestivalIndicator scene={parseInt(currentScene)} />
              </div>
              
              <StorybookChart 
                scene={parseInt(currentScene)} 
                showAI={showAI}
                className="min-h-[200px]"
              />
            </div>
          </div>

          {/* Side Panels */}
          <div className="space-y-3">
            {/* Inventory Counter */}
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-md p-3 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 rounded-lg flex items-center justify-center shadow-md">
                  <Package className="w-3 h-3 text-white" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">Inventory Level</h3>
              </div>
              <SmartInventory scene={parseInt(currentScene)} showAI={showAI} />
            </div>

            {/* Loss Counter */}
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-md p-3 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-400 dark:to-red-500 rounded-lg flex items-center justify-center shadow-md">
                  <DollarSign className="w-3 h-3 text-white" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">Financial Impact</h3>
              </div>
              <FinancialImpact scene={parseInt(currentScene)} showAI={showAI} />
            </div>

            {/* AI Predictor */}
            {showAI && (
                          <div className="bg-blue-600 dark:bg-blue-500 rounded-lg p-3 text-white shadow-md border border-blue-400/30 animate-fade-in">
              <AIProtector />
            </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-md p-3 mb-4 border border-slate-200 dark:border-slate-700">
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
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-md p-3 border border-slate-200 dark:border-slate-700">
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
              <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-400 dark:to-red-500 rounded-lg flex items-center justify-center shadow-md">
                <AlertTriangle className="w-2.5 h-2.5 text-white" />
              </div>
              Without AI Prediction
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-400 dark:to-red-500 rounded-lg flex items-center justify-center shadow-md">
                  <AlertTriangle className="w-3 h-3 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white text-xs">₹2.3L Revenue Loss</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Due to stockout during peak demand</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500 rounded-lg flex items-center justify-center shadow-md">
                  <Calendar className="w-3 h-3 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white text-xs">5 Days Recovery Time</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">To restock and restore availability</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 dark:bg-blue-500 rounded-lg shadow-md p-3 text-white relative overflow-hidden border border-blue-400/30">
            <div className="relative z-10">
              <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center shadow-sm">
                  <Brain className="w-2.5 h-2.5 text-white" />
                </div>
                With AI Prediction
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-white/10 rounded-lg border border-white/20">
                  <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center shadow-sm">
                    <Brain className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-xs">7-Day Advance Warning</p>
                    <p className="text-xs text-blue-100">Predict demand spikes before they happen</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white/10 rounded-lg border border-white/20">
                  <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center shadow-sm">
                    <TrendingUp className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-xs">100% Availability Maintained</p>
                    <p className="text-xs text-blue-100">Automated reorder recommendations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Stock;