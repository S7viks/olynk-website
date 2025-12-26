import { motion } from 'framer-motion';

interface FloatingMetricCardProps {
    metric: string;
    value: string;
    delay?: number;
    position?: { top?: string; bottom?: string; left?: string; right?: string };
}

const FloatingMetricCard = ({ metric, value, delay = 0, position = {} }: FloatingMetricCardProps) => {
    return (
        <motion.div
            className="absolute z-10 bg-white/90 backdrop-blur-md rounded-lg shadow-card border border-beige p-3 min-w-[140px]"
            style={{
                ...position,
                borderLeft: '4px solid #2B5288'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: [0, -10, 0],
            }}
            transition={{
                opacity: { duration: 0.6, delay },
                y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay
                }
            }}
        >
            <div className="text-2xl font-bold text-navy font-mono">{value}</div>
            <div className="text-xs text-steel font-medium mt-1">{metric}</div>
        </motion.div>
    );
};

export default FloatingMetricCard;
