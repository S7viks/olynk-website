import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Clock, CheckCircle, AlertTriangle, Package, DollarSign, Play, RotateCcw } from 'lucide-react';

interface StockProps {
  isLoaded: boolean;
  onClose: () => void;
}

// --- Simple Chart Component ---
const SimpleChart: React.FC<{ scene: number; showAI: boolean }> = ({ scene, showAI }) => {
  const [animatedValues, setAnimatedValues] = useState<number[]>([]);
  
  const storyData = [
    [120, 135, 110, 125, 130, 140, 115], // Normal
    [120, 135, 150, 180, 200, 220, 240], // Rising
    [240, 280, 320, 380, 420, 450, 480], // Critical
    [480, 520, 0, 0, 0, 0, 0] // Stockout
  ];

  const currentData = storyData[scene] || storyData[0];

  useEffect(() => {
    setAnimatedValues(new Array(currentData.length).fill(0));
    const timer = setTimeout(() => setAnimatedValues(currentData), 100);
    return () => clearTimeout(timer);
  }, [scene]);

  const getBarColor = (value: number, index: number) => {
    if (showAI && index >= 4) return 'bg-pink-300';
    if (value === 0) return 'bg-gray-300';
    if (scene === 0) return 'bg-blue-300';
    if (scene === 1) return 'bg-yellow-300';
    if (scene === 2) return 'bg-orange-300';
    return 'bg-red-300';
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">
        {showAI ? 'AI Protected Sales' : 'Sales Trend'}
      </h3>
      
      <div className="flex items-end justify-between h-32 gap-1">
        {animatedValues.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full flex justify-center items-end h-24">
              <div
                className={`w-3 rounded-t-sm transition-all duration-1000 ease-out ${getBarColor(value, index)}`}
                style={{
                  height: `${Math.min((value / 500) * 100, 100)}%`,
                  animationDelay: `${index * 100}ms`
                }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">D{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Simple Inventory Display ---
const SimpleInventory: React.FC<{ scene: number; showAI: boolean }> = ({ scene, showAI }) => {
  const [inventory, setInventory] = useState(1200);
  
  useEffect(() => {
    const levels = [1200, 850, 200, 0];
    const targetLevel = showAI ? 1200 : (levels[scene] || 1200);
    
    const timer = setTimeout(() => setInventory(targetLevel), 300);
    return () => clearTimeout(timer);
  }, [scene, showAI]);

  const getStatusColor = () => {
    if (showAI) return 'text-green-600 bg-green-100';
    if (inventory === 0) return 'text-red-600 bg-red-100';
    if (inventory < 300) return 'text-orange-600 bg-orange-100';
    return 'text-blue-600 bg-blue-100';
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-800 mb-1">
          {inventory.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500 mb-3">Units Available</div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {showAI ? 'AI Optimized' : inventory === 0 ? 'Out of Stock' : inventory < 300 ? 'Low Stock' : 'Healthy'}
        </div>
      </div>
    </div>
  );
};

// --- Simple Financial Impact ---
const SimpleFinancial: React.FC<{ scene: number; showAI: boolean }> = ({ scene, showAI }) => {
  const [amount, setAmount] = useState(0);
  
  useEffect(() => {
    const amounts = [0, 45000, 120000, 230000];
    const targetAmount = showAI ? 0 : (amounts[scene] || 0);
    
    const timer = setTimeout(() => setAmount(targetAmount), 300);
    return () => clearTimeout(timer);
  }, [scene, showAI]);

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const getImpactColor = () => {
    if (showAI) return 'text-green-600 bg-green-100';
    if (amount === 0) return 'text-gray-600 bg-gray-100';
    if (amount < 50000) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-800 mb-1">
          {formatCurrency(amount)}
        </div>
        <div className="text-xs text-gray-500 mb-3">
          {showAI ? 'Loss Prevented' : 'Revenue Loss'}
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor()}`}>
          {showAI ? 'Protected' : amount === 0 ? 'No Loss' : 'Critical Loss'}
        </div>
      </div>
    </div>
  );
};

// --- Simple Controls ---
const SimpleControls: React.FC<{
  currentScene: number;
  isPlaying: boolean;
  showAI: boolean;
  onPlay: () => void;
  onAIDemo: () => void;
  onReset: () => void;
  onSceneChange: (scene: number) => void;
}> = ({ currentScene, isPlaying, showAI, onPlay, onAIDemo, onReset, onSceneChange }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Story Progress</h3>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((scene) => (
            <button
              key={scene}
              onClick={() => onSceneChange(scene)}
              className={`w-6 h-6 rounded-full text-xs font-medium transition-all ${
                currentScene === scene
                  ? 'bg-blue-400 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {scene + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onPlay}
          disabled={isPlaying}
          className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            isPlaying
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-400 hover:bg-blue-500 text-white'
          }`}
        >
          <Play className="w-3 h-3" />
          {isPlaying ? 'Playing...' : 'Play Story'}
        </button>

        <button
          onClick={onAIDemo}
          className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            showAI
              ? 'bg-pink-400 hover:bg-pink-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          <Brain className="w-3 h-3" />
          {showAI ? 'AI Active' : 'Show AI'}
        </button>

        <button
          onClick={onReset}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-all"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

const Stock: React.FC<StockProps> = ({ isLoaded, onClose }) => {
  const [currentScene, setCurrentScene] = useState(0);
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
      setTimeout(() => setCurrentScene(1), 2000),
      setTimeout(() => setCurrentScene(2), 4000),
      setTimeout(() => setCurrentScene(3), 6000),
      setTimeout(() => {
        setIsPlaying(false);
        setCurrentScene(3);
      }, 8000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
    setCurrentScene(0);
    setShowAI(false);
  };

  const handleAIDemo = () => {
    setShowAI(true);
    setCurrentScene(0);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentScene(0);
    setIsPlaying(false);
    setShowAI(false);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 rounded-xl overflow-hidden relative shadow-lg border border-gray-200">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">StockSense AI</h1>
                <p className="text-sm text-gray-600">Predictive Inventory Intelligence</p>
              </div>
            </div>
            <div className="px-3 py-1.5 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full text-sm font-medium">
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
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            The Invisible Stockout
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full mb-2" />
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Watch how sales spikes lead to stockouts, and see how AI prevents losses.
          </p>
        </div>

        {/* Main Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Chart */}
          <div className="lg:col-span-2">
            <SimpleChart scene={currentScene} showAI={showAI} />
          </div>

          {/* Side Panels */}
          <div className="space-y-4">
            <SimpleInventory scene={currentScene} showAI={showAI} />
            <SimpleFinancial scene={currentScene} showAI={showAI} />
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6">
          <SimpleControls 
            currentScene={currentScene}
            isPlaying={isPlaying}
            showAI={showAI}
            onPlay={handlePlay}
            onAIDemo={handleAIDemo}
            onReset={handleReset}
            onSceneChange={setCurrentScene}
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-5 h-5 bg-red-300 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-2.5 h-2.5 text-red-600" />
              </div>
              Without AI Prediction
            </h3>
            <div className="space-y-2">
              <div className="p-2 bg-red-50 rounded-lg border border-red-200">
                <p className="font-bold text-gray-800 text-xs">₹2.3L Revenue Loss</p>
                <p className="text-xs text-gray-600">Due to stockout during peak demand</p>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg border border-orange-200">
                <p className="font-bold text-gray-800 text-xs">5 Days Recovery Time</p>
                <p className="text-xs text-gray-600">To restock and restore availability</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg p-4 text-white shadow-sm">
            <h3 className="text-base font-bold mb-3 flex items-center gap-2">
              <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center">
                <Brain className="w-2.5 h-2.5 text-white" />
              </div>
              With AI Prediction
            </h3>
            <div className="space-y-2">
              <div className="p-2 bg-white/10 rounded-lg border border-white/20">
                <p className="font-bold text-xs">7-Day Advance Warning</p>
                <p className="text-xs text-pink-100">Predict demand spikes before they happen</p>
              </div>
              <div className="p-2 bg-white/10 rounded-lg border border-white/20">
                <p className="font-bold text-xs">100% Availability Maintained</p>
                <p className="text-xs text-pink-100">Automated reorder recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Stock;