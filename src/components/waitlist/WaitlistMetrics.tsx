import { motion } from 'framer-motion';
import { Users, Timer, Sparkles, Activity } from 'lucide-react';

const METRICS = [
    {
        label: "People Waiting",
        value: "1,200+",
        icon: Users,
        sub: "And counting",
        color: "text-navy"
    },
    {
        label: "Setup Time",
        value: "< 1 Week",
        icon: Timer,
        sub: "Go live fast",
        color: "text-olynk"
    },
    {
        label: "Early Access",
        value: "Priority",
        icon: Sparkles,
        sub: "Founding Members",
        color: "text-tan"
    },
    {
        label: "Data Processed",
        value: "4.8k/sec",
        icon: Activity,
        sub: "Real-time sync",
        color: "text-steel"
    }
];

export default function WaitlistMetrics() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 lg:mt-24">
            {METRICS.map((item, idx) => {
                const Icon = item.icon;
                return (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx, duration: 0.5 }}
                        className="p-6 rounded-[32px] bg-white border border-beige shadow-sm hover:shadow-md transition-shadow group"
                    >
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className={`w-12 h-12 rounded-2xl bg-cream flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <div className="text-[10px] font-black text-tan uppercase tracking-widest">{item.label}</div>
                                <div className={`text-2xl font-black ${item.color} tracking-tight`}>{item.value}</div>
                                <div className="text-[10px] font-bold text-steel/50 uppercase tracking-tight">{item.sub}</div>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
