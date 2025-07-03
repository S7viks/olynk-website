import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export const FounderQuote = () => {
  return (
    <motion.div 
      className="max-w-3xl mx-auto text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      <div className="bg-red-100/30 dark:bg-blue-800/30 backdrop-blur-sm rounded-xl p-6 border border-red-300/50 dark:border-blue-700/50 relative">
        <Quote className="w-8 h-8 text-red-600 dark:text-blue-400 mx-auto mb-4 opacity-50" />
        
        <blockquote className="text-lg md:text-xl text-red-800 dark:text-yellow-200 italic mb-4 leading-relaxed">
          "We built OLYNK after watching D2C brands bleed money from preventable issues. 
          Our AI thinks like your smartest ops manager."
        </blockquote>
        
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 dark:from-blue-500 dark:to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">MS</span>
          </div>
          <div className="text-left">
            <div className="text-red-800 dark:text-yellow-100 font-semibold">Meera Singh</div>
            <div className="text-red-600 dark:text-yellow-400 text-sm">Co-founder, OLYNK</div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500/5 to-red-600/5 dark:from-blue-500/5 dark:to-blue-600/5 rounded-xl pointer-events-none" />
      </div>
    </motion.div>
  );
}; 