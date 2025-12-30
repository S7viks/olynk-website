import { motion } from "framer-motion";
import { ChaosVisualizer } from "./ChaosVisualizer";
import { AIBrainProcessor } from "./AIBrainProcessor";
import { ClarityOutput } from "./ClarityOutput";
import { CTAButtons } from "./CTAButtons";
import { LiveInsightWidget } from "./LiveInsightWidget";



import { LiveInsightTicker } from "./LiveInsightTicker";
import { TrustBadges } from "./TrustBadges";

const Hero = () => {
  const selectedCategory = 'skincare';

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
            className="text-5xl md:text-7xl font-black text-navy mb-6 leading-[1.05] tracking-tightest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Commerce Operations
            <span className="block text-gradient">
              Just Got an AI Brain
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-steel max-w-4xl mx-auto mb-8 leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Olynk predicts operational friction before it happens — and tells you exactly how to fix it.
            <span className="text-navy font-black"> Stop losing millions</span> to inventory drift, shipping delays, and data fragmentation.
          </motion.p>

          {/* Live Insight Ticker */}
          <LiveInsightTicker category={selectedCategory} />

          <div className="mt-8">
            <CTAButtons />
          </div>

          {/* Trust microcopy */}
          <motion.p
            className="text-tan text-xs font-black uppercase tracking-widest mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Verified by high-velocity commerce operations. 85%+ accuracy in 30 days.
            <span className="text-olynk ml-2"> Operational Protocol Active.</span>
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