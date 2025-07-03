import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Shield, Lightbulb } from "lucide-react";

const getClarityItems = (category: string) => {
  const baseItems = [
    { 
      icon: CheckCircle, 
      title: "Inventory Optimized", 
      description: "Reorder 500 units of SKU #A123",
      color: "text-green-400",
      bg: "bg-green-500/10",
      delay: 0 
    },
    { 
      icon: TrendingUp, 
      title: "Demand Predicted", 
      description: "15% spike expected next week",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      delay: 0.2 
    },
    { 
      icon: Shield, 
      title: "Risk Mitigated", 
      description: "Supplier delay avoided",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      delay: 0.4 
    },
    { 
      icon: Lightbulb, 
      title: "Action Required", 
      description: "Contact backup supplier",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      delay: 0.6 
    },
  ];

  // Personalize based on category
  if (category === 'skincare') {
    baseItems[0].description = "Reorder 300 units of Vitamin C Serum";
    baseItems[1].description = "25% monsoon spike in serums";
  } else if (category === 'snacks') {
    baseItems[0].description = "Reorder 800 units of Mango Chips";
    baseItems[1].description = "40% festival demand spike";
  } else if (category === 'apparel') {
    baseItems[0].description = "Reorder 200 units of Winter Jackets";
    baseItems[1].description = "35% seasonal increase expected";
  }

  return baseItems;
};

interface ClarityOutputProps {
  category: string;
}

export const ClarityOutput = ({ category }: ClarityOutputProps) => {
  const clarityItems = getClarityItems(category);

  return (
    <motion.div 
      className="bg-yellow-50/50 dark:bg-blue-800/50 backdrop-blur-sm rounded-xl p-6 border border-yellow-300 dark:border-blue-700 relative overflow-hidden"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.8 }}
      key={category} // Force re-render when category changes
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-red-800 dark:text-yellow-200 mb-2">AI Output</h3>
        <div className="text-green-400 text-sm font-medium">✅ CLARITY ACHIEVED</div>
      </div>

      <div className="space-y-3">
        {clarityItems.map((item, index) => (
          <motion.div
            key={`${item.title}-${category}`}
            className={`p-4 rounded-lg border border-yellow-200 dark:border-blue-600 ${item.bg} backdrop-blur-sm`}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              duration: 0.6,
              delay: 1.2 + item.delay,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 8px 25px rgba(0,0,0,0.3)"
            }}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${item.bg} border border-yellow-200 dark:border-blue-600`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="text-red-800 dark:text-yellow-100 font-medium text-sm mb-1">{item.title}</h4>
                <p className="text-red-600 dark:text-yellow-300 text-xs">{item.description}</p>
              </div>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 ${item.color.replace('text-', 'bg-')} rounded-full`} />
                <span className="text-xs text-red-500 dark:text-yellow-400">Ready</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Success glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-yellow-500/5 to-green-500/5 dark:from-green-500/5 dark:via-blue-500/5 dark:to-green-500/5 rounded-xl pointer-events-none" />
    </motion.div>
  );
}; 