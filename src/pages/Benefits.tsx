import React, { useEffect, useRef, useState } from 'react';
import { 
  TrendingUp, 
  Zap, 
  Heart, 
  Target, 
  Shield, 
  Rocket,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type CounterAnimationProps = {
  target: number;
  suffix?: string;
  duration?: number;
};

const CounterAnimation = ({ target, suffix = '', duration = 2000 }: CounterAnimationProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startValue = 0;
    const endValue = target;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isVisible, target, duration]);

  return (
    <span ref={elementRef} className="font-bold text-3xl sm:text-4xl text-gray-800 dark:text-gray-200">
      {count}{suffix}
    </span>
  );
};

type BenefitCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  stat: number | string;
  statLabel: string;
  delay?: number;
};

const BenefitCard = ({ icon: Icon, title, description, stat, statLabel, delay = 0 }: BenefitCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 ease-out transform hover:-translate-y-2 border border-teal-100/50 dark:border-teal-700/50 hover:border-teal-200/80 dark:hover:border-teal-600/80 overflow-hidden ${
        isHovered ? 'scale-105' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${delay}ms`,
        animation: 'slideInUp 0.8s ease-out forwards'
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 dark:from-gray-700/50 to-cyan-50/30 dark:to-gray-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Floating elements */}
      <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-teal-400/20 dark:from-teal-800/20 to-cyan-400/20 dark:to-gray-700/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative z-10">
        {/* Icon */}
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-500 group-hover:scale-110 transform">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Statistics */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
              {typeof stat === 'string' ? stat : <CounterAnimation target={stat} suffix="%" />}
            </div>
            <Sparkles className="w-5 h-5 text-teal-500 animate-pulse" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{statLabel}</p>
        </div>

        {/* Hover arrow */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <ChevronRight className="w-5 h-5 text-teal-500" />
        </div>
      </div>
    </div>
  );
};

function Benefits() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Slash Operating Costs",
      description: "Transform your biggest expense drains into profit centers. Our AI identifies hidden inefficiencies and optimizes workflows automatically.",
      stat: 25,
      statLabel: "average cost reduction",
      delay: 0
    },
    {
      icon: Zap,
      title: "Lightning-Fast Decisions",
      description: "Stop waiting days for insights. Get real-time analytics and predictive intelligence that puts you ahead of the competition.",
      stat: 83,
      statLabel: "faster business insights",
      delay: 100
    },
    {
      icon: Heart,
      title: "Keep Customers Forever",
      description: "Predict which customers are about to leave and win them back. Understand behavior patterns that drive loyalty and satisfaction.",
      stat: 42,
      statLabel: "reduction in customer churn",
      delay: 200
    },
    {
      icon: Target,
      title: "Actionable Intelligence",
      description: "No more guesswork. Get clear, actionable recommendations that directly impact your bottom line and competitive position.",
      stat: "300+",
      statLabel: "data patterns analyzed daily",
      delay: 300
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Rest easy with enterprise-grade security and compliance. Your data is protected with state-of-the-art encryption and privacy measures.",
      stat: "100",
      statLabel: "compliance with global standards",
      delay: 400
    },
    {
      icon: Rocket,
      title: "Scale Without Limits",
      description: "Whether you're a startup or a growing enterprise, our platform scales with you, ensuring you always have the insights you need.",
      stat: "10x",
      statLabel: "faster growth potential",
      delay: 500
    }
  ];

  const benefitsRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/benefits' && benefitsRef.current) {
      const headerOffset = 64; // Adjust for header height
      const elementPosition = benefitsRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth',
      });
    }
  }, [location.pathname, location.search]);

  return (
    <section ref={benefitsRef} className="py-20 bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Unlock Your Business Potential
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover how olynk.ai transforms your data into a competitive advantage with AI-driven insights that drive growth, efficiency, and customer loyalty.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              stat={benefit.stat}
              statLabel={benefit.statLabel}
              delay={benefit.delay}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 border border-teal-100 dark:border-gray-700">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses leveraging olynk.ai to make smarter decisions and achieve unparalleled growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/early-access-form"
              className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group"
            >
              <span>Start Your Free Trial</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/pricing"
              className="border-2 border-teal-600 text-teal-600 dark:text-teal-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group"
            >
              <Rocket className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Book a Demo</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benefits;