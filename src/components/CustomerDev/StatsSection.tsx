import { motion } from 'framer-motion';

/**
 * Stats Section - Clean Metrics Display
 * 
 * Simple 4-column stats grid.
 * Let the numbers speak for themselves.
 */

const stats = [
    {
        number: "₹15L",
        label: "Average Monthly Savings"
    },
    {
        number: "94%",
        label: "Stockout Prevention Rate"
    },
    {
        number: "2.3 days",
        label: "Issue Prediction Lead Time"
    },
    {
        number: "200+",
        label: "Platform Integrations"
    }
];

const StatsSection = () => {
    return (
        <section className="section-spacing px-4">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-balance mb-4 text-navy font-black">
                        Proven Operational Excellence
                    </h2>
                    <p className="text-xl max-w-2xl mx-auto text-steel font-medium">
                        Verified results from modern commerce enterprises using Olynk
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            {/* Number */}
                            <div className="text-4xl lg:text-5xl font-black text-olynk mb-2">
                                {stat.number}
                            </div>

                            {/* Label */}
                            <div className="text-sm font-bold text-steel uppercase tracking-widest">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
