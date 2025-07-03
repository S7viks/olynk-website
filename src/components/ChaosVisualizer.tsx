import { motion } from "framer-motion";
import { AlertTriangle, Package, Clock, MessageSquare, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";

const chaosItems = [
  { icon: AlertTriangle, text: "Low Stock Alert", color: "text-red-400", delay: 0 },
  { icon: Package, text: "Delayed Shipment", color: "text-orange-400", delay: 0.2 },
  { icon: Clock, text: "Order Backlog", color: "text-yellow-400", delay: 0.4 },
  { icon: MessageSquare, text: "Customer Complaints", color: "text-red-300", delay: 0.6 },
  { icon: TrendingDown, text: "Sales Drop", color: "text-red-500", delay: 0.8 },
];

export const ChaosVisualizer = () => {
  const [animationCycle, setAnimationCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationCycle(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="bg-red-100/50 dark:bg-blue-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-300 dark:border-blue-700 relative overflow-hidden"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-red-800 dark:text-yellow-200 mb-2">Current State</h3>
        <div className="text-red-400 text-sm font-medium">⚠️ CHAOS MODE</div>
      </div>

      <div className="space-y-3">
        {chaosItems.map((item, index) => (
          <motion.div
            key={`${item.text}-${animationCycle}`}
            className="flex items-center space-x-3 p-3 bg-red-50/50 dark:bg-blue-700/50 rounded-lg border border-red-200 dark:border-blue-600"
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ 
              opacity: [0, 1, 1, 0.7],
              x: [-20, 0, 0, 10],
              scale: [0.9, 1, 1, 0.95]
            }}
            transition={{ 
              duration: 2.5,
              delay: item.delay,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <item.icon className={`w-5 h-5 ${item.color}`} />
            <span className="text-red-700 dark:text-yellow-300 text-sm">{item.text}</span>
            <div className="ml-auto">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Animated particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}; 