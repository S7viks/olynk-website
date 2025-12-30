import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export const LeaderQuote = () => {
  return (
    <motion.div
      className="max-w-3xl mx-auto text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      <div className="bg-white rounded-3xl p-8 lg:p-12 border border-beige relative shadow-sm">
        <Quote className="w-10 h-10 text-olynk mx-auto mb-6 opacity-20" />

        <blockquote className="text-xl md:text-2xl text-navy font-bold italic mb-8 leading-tight tracking-tight">
          "We built OLYNK after witnessing modern commerce operations bleed millions from preventable systemic friction.
          Our autonomous layer think like your most experienced operational architect."
        </blockquote>

        <div className="flex items-center justify-center space-x-4">
          <div className="w-14 h-14 bg-navy rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-black text-xl">MS</span>
          </div>
          <div className="text-left">
            <div className="text-navy font-black uppercase tracking-tight">Meera Singh</div>
            <div className="text-olynk text-xs font-bold uppercase tracking-widest">Co-founder, OLYNK</div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cream/50 to-transparent rounded-3xl pointer-events-none" />
      </div>
    </motion.div>
  );
}; 