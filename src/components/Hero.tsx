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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        {/* Header Text */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-red-800 dark:text-yellow-100 mb-4 sm:mb-6 leading-tight"
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
            className="text-lg sm:text-xl lg:text-2xl text-red-700 dark:text-yellow-200 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            OLYNK predicts operational issues before they happen — and tells you exactly how to fix them. 
            <span className="text-red-600 dark:text-red-400 font-semibold"> Stop losing ₹2–5L monthly</span> to stockouts, delays, and data chaos.
          </motion.p>

          {/* Live Insight Ticker */}
          <div className="mb-6 sm:mb-8">
            <LiveInsightTicker category={selectedCategory} />
          </div>

          {/* Enhanced CTA Section */}
          <motion.div 
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <CTAButtons />
          </motion.div>

          {/* Trust microcopy */}
          <motion.p 
            className="text-red-600 dark:text-yellow-300 text-sm sm:text-base mt-4 sm:mt-6 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Trusted by 1000+ D2C founders. 85%+ AI accuracy in 30 days. 
            <span className="text-red-500 dark:text-blue-300 font-medium"> Limited onboarding slots.</span>
          </motion.p>
        </motion.div>

        {/* Chaos to Clarity Visualization - Mobile Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-center mb-8 sm:mb-12 lg:mb-16">
          <div className="order-1 lg:order-1">
            <ChaosVisualizer />
          </div>
          <div className="order-2 lg:order-2">
            <AIBrainProcessor />
          </div>
          <div className="order-3 lg:order-3">
            <ClarityOutput category={selectedCategory} />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <TrustBadges />
        </div>

        {/* Live Insight Widget */}
        <LiveInsightWidget />
      </div>
    </section>
  );
};

export default Hero;