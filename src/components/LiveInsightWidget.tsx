import { motion } from "framer-motion";
import { Activity, TrendingUp, AlertCircle, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";

interface Metric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  icon: any;
}

const demoMetrics: Metric[] = [
  {
    label: "Revenue Saved",
    value: "₹3.2L",
    change: "+18%",
    trend: "up",
    icon: DollarSign
  },
  {
    label: "Stockout Prevention",
    value: "94%",
    change: "+12%",
    trend: "up",
    icon: TrendingUp
  },
  {
    label: "Issue Prediction",
    value: "2.3 days",
    change: "ahead",
    trend: "stable",
    icon: AlertCircle
  },
  {
    label: "Efficiency Gain",
    value: "67%",
    change: "+23%",
    trend: "up",
    icon: Activity
  }
];

export const LiveInsightWidget = () => {
  const [currentMetric, setCurrentMetric] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % demoMetrics.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.5 }}
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-red-800 dark:text-yellow-100 mb-2">Live AI Insight Preview</h3>
        <p className="text-red-600 dark:text-yellow-300">See real-time metrics from OLYNK's AI engine</p>
      </div>

      <div className="bg-yellow-50/50 dark:bg-blue-800/50 backdrop-blur-sm rounded-xl p-6 border border-yellow-300 dark:border-blue-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {demoMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className={`p-4 rounded-lg border transition-all duration-500 ${
                index === currentMetric 
                  ? 'border-red-500 bg-red-500/10 shadow-lg shadow-red-500/20 dark:border-blue-500 dark:bg-blue-500/10 dark:shadow-blue-500/20' 
                  : 'border-red-200 bg-red-50/30 dark:border-blue-600 dark:bg-blue-700/30'
              }`}
              animate={{
                scale: index === currentMetric ? 1.05 : 1,
                boxShadow: index === currentMetric 
                  ? "0 8px 25px rgba(59, 130, 246, 0.3)"
                  : "0 2px 8px rgba(0, 0, 0, 0.1)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`w-5 h-5 ${
                  index === currentMetric ? 'text-red-600 dark:text-blue-400' : 'text-red-400 dark:text-yellow-400'
                }`} />
                <motion.div 
                  className={`text-xs font-medium ${
                    metric.trend === 'up' ? 'text-green-400' :
                    metric.trend === 'down' ? 'text-red-400' : 'text-slate-400'
                  }`}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {metric.change}
                </motion.div>
              </div>
              <div className="text-lg font-bold text-red-800 dark:text-yellow-100 mb-1">{metric.value}</div>
              <div className="text-xs text-red-600 dark:text-yellow-400">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="flex items-center space-x-2 text-green-400 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-medium">AI Recommendation:</span>
          </div>
          <p className="text-red-700 dark:text-yellow-200 text-sm mt-1">
            Based on current trends, increase inventory for SKU #B456 by 30% to prevent stockout in 5 days.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}; 