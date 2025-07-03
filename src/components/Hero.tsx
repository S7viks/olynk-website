import { motion } from "framer-motion";
import { useState } from "react";
import { ChaosVisualizer } from "./ChaosVisualizer";
import { AIBrainProcessor } from "./AIBrainProcessor";
import { ClarityOutput } from "./ClarityOutput";
import { CTAButtons } from "./CTAButtons";
import { LiveInsightWidget } from "./LiveInsightWidget";



import { LiveInsightTicker } from "./LiveInsightTicker";
import { TrustBadges } from "./TrustBadges";

const Hero = () => {
  const [selectedCategory, setSelectedCategory] = useState('skincare');

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 py-20 relative z-10">


        {/* Header Text */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-red-800 dark:text-yellow-100 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Business Operations
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-700 dark:from-blue-400 dark:via-blue-300 dark:to-blue-500">
                Just Got an AI Brain
              </span>
          </motion.h1>
          
          <motion.p 
                         className="text-xl md:text-2xl text-red-700 dark:text-yellow-200 max-w-4xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            OLYNK predicts operational issues before they happen — and tells you exactly how to fix them. 
            <span className="text-red-600 dark:text-red-400 font-semibold"> Stop losing ₹2–5L monthly</span> to stockouts, delays, and data chaos.
          </motion.p>

          {/* Live Insight Ticker */}
          <LiveInsightTicker category={selectedCategory} />

          <div className="mt-8">
            <CTAButtons />
          </div>

          {/* Trust microcopy */}
          <motion.p 
                         className="text-red-600 dark:text-yellow-300 text-sm mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Used by ₹5Cr+ brands. 85%+ AI accuracy in 30 days. 
                         <span className="text-red-500 dark:text-blue-300 font-medium"> Limited onboarding slots.</span>
          </motion.p>
        </motion.div>

        {/* Chaos to Clarity Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-16">
          <ChaosVisualizer />
          <AIBrainProcessor />
          <ClarityOutput category={selectedCategory} />
            </div>

        

        {/* Trust Badges */}
        <div className="mb-16">
          <TrustBadges />
        </div>

        

        {/* Live Insight Widget */}
        <LiveInsightWidget />
      </div>
    </section>
  );
};

export default Hero;