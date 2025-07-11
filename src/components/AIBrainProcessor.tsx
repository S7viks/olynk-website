import { motion } from "framer-motion";
import { Brain, Zap, Target } from "lucide-react";

export const AIBrainProcessor = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 1 }}
    >
      {/* AI Brain Visualization */}
      <div className="relative">
        <motion.div 
          className="w-32 h-32 bg-gradient-to-r from-red-500 via-red-600 to-red-700 dark:from-blue-500 dark:via-blue-600 dark:to-blue-700 rounded-full flex items-center justify-center relative overflow-hidden"
          style={{
            filter: "drop-shadow(0px 0px 20px rgba(59, 130, 246, 0.5))"
          }}
        >
          <Brain className="w-16 h-16 text-white" />
          
          {/* Neural network lines */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px bg-white/30"
                style={{
                  height: "100%",
                  left: "50%",
                  transformOrigin: "bottom center",
                  transform: `rotate(${i * 60}deg)`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Processing indicators */}
        <motion.div 
          className="absolute -top-2 -left-2 bg-green-500 rounded-full p-1"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Zap className="w-4 h-4 text-white" />
        </motion.div>

        <motion.div 
          className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, delay: 0.5, repeat: Infinity }}
        >
          <Target className="w-4 h-4 text-white" />
        </motion.div>
      </div>

      <motion.div 
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <h3 className="text-lg font-semibold text-red-800 dark:text-yellow-100 mb-2">AI Processing</h3>
        <div className="flex items-center space-x-2 text-green-400 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>Analyzing patterns...</span>
        </div>
      </motion.div>

      {/* Data flow arrows */}
      <motion.div 
        className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 hidden lg:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-6 h-0.5 bg-gradient-to-r from-red-500 to-red-600 dark:from-blue-400 dark:to-blue-500 mb-1"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ 
              duration: 1.5,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}; 