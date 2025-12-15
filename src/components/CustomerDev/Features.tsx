import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Shield } from 'lucide-react';

/**
 * Features Section - Clean 3-Column Grid
 * 
 * Simple feature highlights with icon, title, and description.
 * Professional, minimal styling.
 */

const features = [
    {
        icon: CheckCircle,
        title: "Predict Stockouts",
        description: "Get alerts 10 days before inventory runs out. Automatic PO creation saves you time and prevents lost sales."
    },
    {
        icon: TrendingUp,
        title: "Optimize Ad Spend",
        description: "Real-time ROAS monitoring catches budget waste before it happens. Automatic reallocation to winning campaigns."
    },
    {
        icon: Shield,
        title: "Reduce RTO Failures",
        description: "Score every order before shipping. Identify high-risk deliveries and take action before money is lost."
    }
];

const Features = () => {
    return (
        <section className="section-spacing px-4 bg-gray-50">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-balance mb-4">
                        Operations Intelligence That Actually Works
                    </h2>
                    <p className="text-xl max-w-2xl mx-auto">
                        Stop reacting to problems. Start preventing them.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            {/* Icon */}
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
                                <feature.icon className="w-8 h-8 text-red-600" />
                            </div>

                            {/* Title */}
                            <h3 className="mb-3">{feature.title}</h3>

                            {/* Description */}
                            <p className="text-base">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
