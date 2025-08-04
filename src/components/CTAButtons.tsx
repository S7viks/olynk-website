import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CTAButtons = () => {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      {/* Primary CTA - Book Demo */}
      <motion.a
        href="https://forms.office.com/r/zd11g2RWDR"
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white font-semibold px-6 sm:px-8 py-4 sm:py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl w-full sm:w-auto min-h-[48px] text-base sm:text-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Book a demo to see AI in action"
      >
        <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span>See AI in Action – Book Demo</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.a>

      {/* Secondary CTA - Join Waitlist */}
      <Link to="/waitlist-funnel" className="w-full sm:w-auto">
        <motion.button
          className="group border-2 border-red-400 hover:border-red-500 text-red-700 hover:text-red-800 dark:border-blue-400 dark:hover:border-blue-300 dark:text-yellow-300 dark:hover:text-yellow-100 font-semibold px-6 sm:px-8 py-4 sm:py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm hover:bg-red-50/30 dark:hover:bg-blue-800/30 w-full min-h-[48px] text-base sm:text-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Join the waitlist for early access"
        >
          <span>Join Waitlist</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </Link>
    </motion.div>
  );
}; 