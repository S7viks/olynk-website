import { motion } from "framer-motion";
import { Play, FileText, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export const CTAButtons = () => {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <motion.button
        className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span>See AI in Action – Book Demo</span>
      </motion.button>

      <Link to="/demo">
        <motion.button
          className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Check Interactive Demo</span>
        </motion.button>
      </Link>

      <motion.button
        className="group border-2 border-red-400 hover:border-red-500 text-red-700 hover:text-red-800 dark:border-blue-400 dark:hover:border-blue-300 dark:text-yellow-300 dark:hover:text-yellow-100 font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm hover:bg-red-50/30 dark:hover:bg-blue-800/30"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span>Get Free Operations Audit</span>
      </motion.button>
    </motion.div>
  );
}; 