import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Brain, AlertTriangle, TrendingUp, Package } from "lucide-react";

const insights = [
  {
    icon: AlertTriangle,
    text: "Supplier X delay detected – rerouted to WH B",
    color: "text-orange-400"
  },
  {
    icon: Package,
    text: "₹34K oversell risk detected — Shopify updated",
    color: "text-red-400"
  },
  {
    icon: TrendingUp,
    text: "Festival pattern: 40% spike predicted in mango chips",
    color: "text-green-400"
  },
  {
    icon: Brain,
    text: "Auto-sync complete: Inventory across all channels updated",
    color: "text-blue-400"
  }
];

interface LiveInsightTickerProps {
  category: string;
}

export const LiveInsightTicker = ({ category }: LiveInsightTickerProps) => {
  const [currentInsight, setCurrentInsight] = useState(0);

  // Personalize insights based on category
  const getPersonalizedInsights = (cat: string) => {
    const baseInsights = [...insights];
    
    if (cat === 'skincare') {
      baseInsights[2] = {
        icon: TrendingUp,
        text: "Monsoon pattern: 60% spike predicted in face serums",
        color: "text-green-400"
      };
    } else if (cat === 'snacks') {
      baseInsights[2] = {
        icon: TrendingUp,
        text: "Festival pattern: 40% spike predicted in mango chips",
        color: "text-green-400"
      };
    } else if (cat === 'apparel') {
      baseInsights[2] = {
        icon: TrendingUp,
        text: "Season shift: 35% increase in winter wear demand",
        color: "text-green-400"
      };
    }
    
    return baseInsights;
  };

  const personalizedInsights = getPersonalizedInsights(category);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % personalizedInsights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [personalizedInsights.length]);

  const currentItem = personalizedInsights[currentInsight];
  const IconComponent = currentItem.icon;

  return (
    <motion.div 
      className="flex items-center justify-center space-x-3 bg-red-100/30 dark:bg-blue-800/30 backdrop-blur-sm rounded-lg px-4 py-3 border border-red-300/50 dark:border-blue-700/50 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <motion.div
        key={currentInsight}
        className="flex items-center space-x-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`p-2 rounded-lg bg-red-50/50 dark:bg-blue-700/50 ${currentItem.color}`}>
          <IconComponent className="w-4 h-4" />
        </div>
        <span className="text-red-800 dark:text-yellow-200 text-sm font-medium">
          🧠 {currentItem.text}
        </span>
      </motion.div>
      
      <div className="flex space-x-1">
        {personalizedInsights.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              index === currentInsight ? 'bg-red-500 dark:bg-blue-400' : 'bg-red-300 dark:bg-blue-600'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}; 