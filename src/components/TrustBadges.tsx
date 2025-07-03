import { motion } from "framer-motion";
import { Shield, Zap, Users, Award } from "lucide-react";

const badges = [
  {
    icon: Shield,
    label: "SOC2 Ready",
    subtitle: "Enterprise Security"
  },
  {
    icon: Zap,
    label: "99.8% Accuracy",
    subtitle: "Data Sync"
  },
  {
    icon: Users,
    label: "200+ Integrations",
    subtitle: "All Platforms"
  },
  {
    icon: Award,
    label: "₹15L Saved/Month",
    subtitle: "Average Client"
  }
];

export const TrustBadges = () => {
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-4 md:gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.4 }}
    >
      {badges.map((badge, index) => (
        <motion.div
          key={badge.label}
          className="flex items-center space-x-2 bg-red-100/30 dark:bg-blue-800/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-red-300/50 dark:border-blue-700/50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <badge.icon className="w-4 h-4 text-red-600 dark:text-blue-400" />
          <div>
            <div className="text-red-800 dark:text-yellow-100 text-xs font-semibold">{badge.label}</div>
            <div className="text-red-600 dark:text-yellow-400 text-xs">{badge.subtitle}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}; 