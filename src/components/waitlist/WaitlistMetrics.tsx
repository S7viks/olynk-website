import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { supabase } from '../../supabase';

export default function WaitlistMetrics() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const { count, error } = await supabase
                    .from('waitlist')
                    .select('*', { count: 'exact', head: true });
                
                if (!error && count !== null) {
                    setCount(count);
                }
            } catch (err) {
                console.error('Error fetching waitlist count:', err);
            }
        };

        fetchCount();
    }, []);

    if (count === null) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-center gap-3 mt-8"
        >
            <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                    <div 
                        key={i} 
                        className="w-8 h-8 rounded-full border-2 border-noir bg-cream flex items-center justify-center overflow-hidden"
                    >
                        <Users className="w-4 h-4 text-navy/40" />
                    </div>
                ))}
            </div>
            <div className="text-sm font-medium text-steel">
                Join <span className="text-navy font-bold">{count.toLocaleString()}</span> founders waiting for early access
            </div>
        </motion.div>
    );
}
