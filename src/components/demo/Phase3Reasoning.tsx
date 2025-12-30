import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Package, Users, Truck, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

// --- Types & Constants ---

interface SystemBoxProps {
  id: string;
  icon: React.ElementType;
  label: string;
  x: number;
  y: number;
  isHighlighted: boolean;
  isDimmed: boolean;
}

interface ConnectionLineProps {
  id: number;
  path: string;
  isActive: boolean;
  isComplete: boolean;
}

const TIMINGS = {
  connection: 1500, // 1.5s per connection
  textFade: 300,
  hold: 1500,
};

const REASONING_TEXTS = [
  "Demand up 23% → Inventory depletes in 4 days",
  "Current supplier lead time: 6 days",
  "Inventory runway < supplier lead time → Reorder now",
  "If nothing changes, stockout in 4 days = ₹2.3L revenue loss"
];

// --- Sub-Components ---

const SystemBox: React.FC<SystemBoxProps> = ({ icon: Icon, label, x, y, isHighlighted, isDimmed }) => (
  <motion.div
    className="absolute flex flex-col items-center justify-center space-y-2"
    style={{ left: x, top: y, width: 80, height: 60 }}
    animate={{ 
      opacity: isDimmed ? 0.4 : 1,
      scale: isHighlighted ? 1.05 : 1
    }}
  >
    <div className={`
      w-full h-full bg-white border-2 rounded-lg flex items-center justify-center shadow-sm
      ${isHighlighted ? 'border-olynk bg-blue-50/50' : 'border-beige'}
    `}>
      <Icon className={`w-8 h-8 ${isHighlighted ? 'text-olynk' : 'text-navy/40'}`} />
    </div>
    <span className="text-[10px] font-bold text-steel uppercase tracking-tighter whitespace-nowrap">
      {label}
    </span>
  </motion.div>
);

const ConnectionLine: React.FC<ConnectionLineProps> = ({ path, isActive, isComplete }) => (
  <g>
    <motion.path
      d={path}
      fill="none"
      stroke="#3B82F6"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ 
        pathLength: (isActive || isComplete) ? 1 : 0,
        opacity: (isActive || isComplete) ? 1 : 0,
        strokeOpacity: isComplete ? 0.7 : 1
      }}
      transition={{ 
        pathLength: { duration: 1.5, ease: "easeInOut" },
        strokeOpacity: { duration: 1, repeat: isComplete ? Infinity : 0, repeatType: "reverse" }
      }}
    />
    {(isActive || isComplete) && (
      <motion.circle
        r="4"
        fill="#3B82F6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.animateMotion
          dur="1.5s"
          repeatCount="1"
          path={path}
          rotate="auto"
        />
      </motion.circle>
    )}
  </g>
);

// --- Main Component ---

const Phase3Reasoning: React.FC = () => {
  const [currentConnection, setCurrentConnection] = useState<number>(0); // 0 to 4
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    if (currentConnection < 4) {
      const timer = setTimeout(() => {
        setCurrentConnection(prev => prev + 1);
      }, TIMINGS.connection + 500); // 1.5s draw + 0.5s pause
      return () => clearTimeout(timer);
    } else {
      // Loop or hold
      const timer = setTimeout(() => {
        setCurrentConnection(1); // Reset to start
      }, TIMINGS.hold + 2000);
      return () => clearTimeout(timer);
    }
  }, [currentConnection, isPaused]);

  // System Positions
  const systems = [
    { id: 'ec', icon: ShoppingCart, label: 'E-Commerce', x: 60, y: 40 },
    { id: 'inv', icon: Package, label: 'Inventory', x: 200, y: 40 },
    { id: 'sup', icon: Users, label: 'Supplier', x: 340, y: 40 },
    { id: 'log', icon: Truck, label: 'Logistics', x: 480, y: 40 },
  ];

  // Connection Paths (Simplified Bezier for 600x400)
  const connections = [
    { path: "M 100,70 C 100,140 200,140 200,70" }, // EC -> INV
    { path: "M 240,70 C 240,140 380,140 380,70" }, // INV -> SUP
    { path: "M 380,100 C 380,150 260,180 260,200" }, // SUP -> Timeline
    { path: "M 310,220 C 350,250 360,250 400,280" }, // Timeline -> Impact
  ];

  return (
    <div className="w-full max-w-[600px] h-[400px] mx-auto relative bg-white rounded-3xl border border-beige shadow-2xl overflow-hidden group">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #001B3D 1px, transparent 0)', backgroundSize: '20px 20px' }} />

      {/* SVG Layer for Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
          </marker>
        </defs>
        {connections.map((conn, idx) => (
          <ConnectionLine 
            key={idx}
            id={idx + 1}
            path={conn.path}
            isActive={currentConnection === idx + 1}
            isComplete={currentConnection > idx + 1}
          />
        ))}
      </svg>

      {/* System Boxes */}
      {systems.map((sys) => (
        <SystemBox 
          key={sys.id}
          {...sys}
          isHighlighted={
            (sys.id === 'ec' && currentConnection === 1) ||
            (sys.id === 'inv' && (currentConnection === 1 || currentConnection === 2)) ||
            (sys.id === 'sup' && (currentConnection === 2 || currentConnection === 3))
          }
          isDimmed={currentConnection > 0 && !(
            (sys.id === 'ec' && currentConnection === 1) ||
            (sys.id === 'inv' && (currentConnection === 1 || currentConnection === 2)) ||
            (sys.id === 'sup' && (currentConnection === 2 || currentConnection === 3))
          )}
        />
      ))}

      {/* Timeline Node (Appears in Phase 3) */}
      <AnimatePresence>
        {currentConnection >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: currentConnection === 3 ? 1.05 : 1,
              backgroundColor: currentConnection === 3 ? '#FEF3C7' : '#FFFFFF'
            }}
            exit={{ opacity: 0 }}
            className="absolute left-[210px] top-[200px] w-[100px] h-[40px] border-2 border-amber-500 rounded-lg flex items-center justify-center shadow-sm"
          >
            <span className="text-[10px] font-black text-amber-700 uppercase">Reorder by tomorrow</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Impact Node (Appears in Phase 4) */}
      <AnimatePresence>
        {currentConnection >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: currentConnection === 4 ? 1.05 : 1,
              backgroundColor: currentConnection === 4 ? '#FEE2E2' : '#FFFFFF'
            }}
            exit={{ opacity: 0 }}
            className="absolute left-[400px] top-[270px] w-[120px] h-[50px] border-2 border-red-500 rounded-lg flex items-center justify-center shadow-md"
          >
            <div className="flex flex-col items-center">
              <span className="text-[12px] font-black text-red-700 tracking-tighter">₹2.3L at risk</span>
              <span className="text-[8px] font-bold text-red-500 uppercase tracking-widest">Revenue Loss</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reasoning Text Box */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[400px] h-[80px] bg-white border border-beige rounded-xl shadow-lg p-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentConnection}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="text-sm font-bold text-navy leading-relaxed">
              {currentConnection > 0 ? REASONING_TEXTS[currentConnection - 1] : "OLynk is analyzing cross-system dependencies..."}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Header Label */}
      <div className="absolute top-4 left-6 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-olynk animate-pulse" />
        <span className="text-[10px] font-black text-navy uppercase tracking-[0.3em]">
          {currentConnection === 4 ? "Problem Predicted" : "Connecting Patterns..."}
        </span>
      </div>

      {/* Controls Overlay (Bottom) */}
      <div className="absolute bottom-4 right-6 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className="text-[10px] font-black text-tan uppercase tracking-widest hover:text-navy transition-colors"
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button 
          onClick={() => setCurrentConnection(0)}
          className="text-[10px] font-black text-tan uppercase tracking-widest hover:text-navy transition-colors"
        >
          Reset
        </button>
      </div>

      {/* System Status (Mono) */}
      <div className="absolute top-4 right-6 text-right">
        <span className="text-[8px] font-mono text-tan uppercase tracking-tighter block opacity-40">
          // CAUSAL_ENGINE: RUNNING
        </span>
        <span className="text-[8px] font-mono text-tan uppercase tracking-tighter block opacity-40">
          // THREAD_ID: 0x8F4A2
        </span>
      </div>
    </div>
  );
};

export default Phase3Reasoning;
