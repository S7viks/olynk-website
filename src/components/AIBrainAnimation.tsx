import React, { useEffect, useState } from 'react';
import { Brain, Package, AlertTriangle, MessageSquare, Clock, CheckCircle, Target, TrendingUp, Zap, BarChart3, ShieldCheck } from 'lucide-react';

interface ChaosElement {
  id: string;
  type: 'order' | 'alert' | 'message' | 'delay';
  x: number;
  y: number;
  vx: number;
  vy: number;
  icon: React.ElementType;
  text: string;
  phase: 'chaos' | 'flowing' | 'processed';
}

interface OutputCard {
  id: string;
  icon: React.ElementType;
  title: string;
  delay: number;
  side: 'left' | 'right';
}

const AIBrainAnimation: React.FC = () => {
  const [elements, setElements] = useState<ChaosElement[]>([]);
  const [outputCards, setOutputCards] = useState<OutputCard[]>([]);
  const [animationPhase, setAnimationPhase] = useState<'chaos' | 'processing' | 'output'>('chaos');

  const chaosItems: Omit<ChaosElement, 'id' | 'x' | 'y' | 'vx' | 'vy' | 'phase'>[] = [
    { type: 'order', icon: Package, text: 'Order #1247' },
    { type: 'alert', icon: AlertTriangle, text: 'Low Stock' },
    { type: 'message', icon: MessageSquare, text: 'Customer Issue' },
    { type: 'delay', icon: Clock, text: 'Supplier Delay' },
    { type: 'order', icon: Package, text: 'Rush Order' },
    { type: 'alert', icon: AlertTriangle, text: 'Quality Alert' },
  ];

  const outputItems: OutputCard[] = [
    { id: '1', icon: CheckCircle, title: 'Orders Prioritized', delay: 0, side: 'left' },
    { id: '2', icon: Target, title: 'Inventory Optimized', delay: 600, side: 'right' },
    { id: '3', icon: TrendingUp, title: 'Demand Predicted', delay: 1200, side: 'left' },
    { id: '4', icon: Zap, title: 'Actions Ready', delay: 1800, side: 'right' },
    { id: '5', icon: Clock, title: 'Delays Anticipated', delay: 2400, side: 'left' },
    { id: '6', icon: MessageSquare, title: 'Customer Issues Predicted', delay: 3000, side: 'right' },
    { id: '7', icon: BarChart3, title: 'Profitability Boosted', delay: 3600, side: 'left' },
    { id: '8', icon: ShieldCheck, title: 'Risk Minimized', delay: 4200, side: 'right' }
  ];

  useEffect(() => {
    const runAnimation = () => {
      // Reset state
      setElements([]);
      setOutputCards([]);
      setAnimationPhase('chaos');

      // Initialize chaos elements in proper positions around the brain
      const centerX = 350;
      const centerY = 250;
      const radius = 220;
      
      const initialElements: ChaosElement[] = chaosItems.map((item, index) => {
        const angle = (index / chaosItems.length) * 2 * Math.PI;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        return {
          ...item,
          id: `chaos-${index}`,
          x: Math.max(140, Math.min(560, x)),
          y: Math.max(140, Math.min(360, y)),
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          phase: 'chaos' as const,
        };
      });

      setElements(initialElements);

      // Animation timeline
      setTimeout(() => {
        setAnimationPhase('processing');
        setElements(prev => prev.map(el => ({
          ...el,
          phase: 'flowing' as const,
        })));
      }, 4000);

      setTimeout(() => {
        setAnimationPhase('output');
        setElements(prev => prev.map(el => ({
          ...el,
          phase: 'processed' as const,
        })));
        
        // Clear output cards before adding new ones
        setOutputCards([]);
        
        // Show output cards with stagger
        outputItems.forEach((card) => {
          setTimeout(() => {
            setOutputCards(prev => {
              // Only add card if not already present
              if (!prev.some(existingCard => existingCard.id === card.id)) {
                return [...prev, card];
              }
              return prev;
            });
          }, card.delay);
        });
      }, 6500);

      // Reset and restart, extended to accommodate new cards
      setTimeout(() => {
        runAnimation();
      }, 18000); // Increased from 15000ms to allow all 8 cards to display
    };

    runAnimation();
  }, []);

  // Animate chaos elements movement
  useEffect(() => {
    if (animationPhase !== 'chaos') return;

    const interval = setInterval(() => {
      setElements(prev => prev.map(el => {
        if (el.phase !== 'chaos') return el;
        
        let newX = el.x + el.vx;
        let newY = el.y + el.vy;
        let newVx = el.vx;
        let newVy = el.vy;

        // Bounce off boundaries
        if (newX <= 140 || newX >= 560) {
          newVx = -newVx;
          newX = Math.max(140, Math.min(560, newX));
        }
        if (newY <= 140 || newY >= 360) {
          newVy = -newVy;
          newY = Math.max(140, Math.min(360, newY));
        }

        return { ...el, x: newX, y: newY, vx: newVx, vy: newVy };
      }));
    }, 80);

    return () => clearInterval(interval);
  }, [animationPhase]);

  return (
    <div className="relative w-[700px] h-[500px] bg-gradient-to-br from-teal-50 to-cyan-100 rounded-3xl overflow-hidden shadow-2xl">
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="#14b8a6" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      {/* Chaos Elements */}
      {elements.map((element) => {
        const Icon = element.icon;
        return (
          <div
            key={element.id}
            className={`absolute transition-all duration-2000 ease-in-out ${
              element.phase === 'flowing' 
                ? 'opacity-20 scale-30' 
                : element.phase === 'processed'
                ? 'opacity-0 scale-0'
                : 'opacity-100 scale-100'
            }`}
            style={{
              left: `${element.x}px`,
              top: `${element.y}px`,
              transform: element.phase === 'flowing' 
                ? `translate(-50%, -50%) translate(${350 - element.x}px, ${250 - element.y}px) scale(0.1)`
                : 'translate(-50%, -50%)',
              transitionDuration: '2000ms',
            }}
          >
            <div className={`
              px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm border border-white/30
              ${element.type === 'order' ? 'bg-blue-100/90 text-blue-700' :
                element.type === 'alert' ? 'bg-red-100/90 text-red-700' :
                element.type === 'message' ? 'bg-purple-100/90 text-purple-700' :
                'bg-orange-100/90 text-orange-700'}
            `}>
              <div className="flex items-center gap-2">
                <Icon size={16} />
                <span className="text-sm font-medium whitespace-nowrap">{element.text}</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Central Brain */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className={`
          relative w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500
          flex items-center justify-center shadow-2xl border-4 border-white/30
          transition-all duration-1000 ease-in-out
          ${animationPhase === 'chaos' ? 'scale-90 opacity-80' : 
            animationPhase === 'processing' ? 'scale-110 opacity-100' : 
            'scale-100 opacity-100'}
        `}>
          
          {/* Processing rings */}
          {animationPhase === 'processing' && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-teal-300/50 animate-ping" 
                   style={{ animationDuration: '2s' }} />
              <div className="absolute inset-0 rounded-full border border-cyan-300/40 animate-ping" 
                   style={{ animationDelay: '1s', animationDuration: '2s' }} />
            </>
          )}
          
          <Brain size={48} className="text-white drop-shadow-lg" />
          
          {/* Processing particles around brain */}
          {animationPhase === 'processing' && (
            <>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full animate-ping"
                  style={{
                    left: `${50 + Math.cos(i * Math.PI / 4) * 70}%`,
                    top: `${50 + Math.sin(i * Math.PI / 4) * 70}%`,
                    animationDelay: `${i * 250}ms`,
                    animationDuration: '2s',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Left Side Output Cards */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 space-y-3">
        {outputCards.filter(card => card.side === 'left').map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-xl border border-teal-100
                         animate-in slide-in-from-left-8 duration-1000 min-w-[180px]
                         hover:shadow-2xl transition-all"
              style={{ animationDelay: `${card.delay}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <Icon size={16} className="text-teal-600" />
                </div>
                <span className="text-xs font-semibold text-gray-800 leading-tight">{card.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Side Output Cards */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 space-y-3">
        {outputCards.filter(card => card.side === 'right').map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-xl border border-teal-100
                         animate-in slide-in-from-right-8 duration-1000 min-w-[180px]
                         hover:shadow-2xl transition-all"
              style={{ animationDelay: `${card.delay}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <Icon size={16} className="text-teal-600" />
                </div>
                <span className="text-xs font-semibold text-gray-800 leading-tight">{card.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-8">
          <div className={`flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-sm transition-all duration-1000 ${
            animationPhase === 'chaos' ? 'bg-red-100/80 border border-red-200' : 'bg-gray-100/60 border border-gray-200'
          }`}>
            <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
              animationPhase === 'chaos' ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
            }`} />
            <span className={`text-sm font-medium transition-all duration-500 ${
              animationPhase === 'chaos' ? 'text-red-700' : 'text-gray-500'
            }`}>
              Chaos
            </span>
          </div>
          
          <div className={`flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-sm transition-all duration-1000 ${
            animationPhase === 'processing' ? 'bg-teal-100/80 border border-teal-200' : 'bg-gray-100/60 border border-gray-200'
          }`}>
            <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
              animationPhase === 'processing' ? 'bg-teal-500 animate-pulse' : 'bg-gray-400'
            }`} />
            <span className={`text-sm font-medium transition-all duration-500 ${
              animationPhase === 'processing' ? 'text-teal-700' : 'text-gray-500'
            }`}>
              Intelligence
            </span>
          </div>
          
          <div className={`flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-sm transition-all duration-1000 ${
            animationPhase === 'output' ? 'bg-green-100/80 border border-green-200' : 'bg-gray-100/60 border border-gray-200'
          }`}>
            <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
              animationPhase === 'output' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
            }`} />
            <span className={`text-sm font-medium transition-all duration-500 ${
              animationPhase === 'output' ? 'text-green-700' : 'text-gray-500'
            }`}>
              Smart Actions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIBrainAnimation;