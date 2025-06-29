import React, { useEffect, useState, useRef } from 'react';
import { Database, Zap, TrendingUp, Truck, MessageSquare, LayoutDashboard, Brain, Play, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Priority from './Priority';
import Unification from './Unification';
import SmartIntegration from './SmartIntegration';
import AILearningSystem from './AILearningSystem';
import CommunicationEngine from './CommunicationEngine';
import Orchestration from './Orchestration';
import InventoryIntelligence from './InventoryIntelligence';

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.pathname === '/features' && featuresRef.current) {
      const headerOffset = 64;
      const elementPosition = featuresRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    const element = document.getElementById('features');
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Database,
      title: 'AI Data Unification Engine',
      description: 'Single Source of Truth That Never Lies. Our AI connects all your systems—Shopify, Amazon, WhatsApp Business, spreadsheets, payment gateways—and creates one accurate, real-time view of your business.',
      gradient: 'from-teal-500 to-cyan-500',
      delay: '0ms',
      image: '/images/olynk-action/data-unification.png',
      modalTitle: 'AI Data Unification Engine',
      modalDescription: 'Connects Shopify, Amazon, WhatsApp Business, spreadsheets, and payment gateways into one accurate, real-time view. Eliminates conflicting numbers and overselling with 99.8% accuracy.',
      insightExample: 'Detected: Shopify shows 45 units of Product X, Amazon shows 32, warehouse reports 28. AI updated all platforms to 28 units, preventing ₹15K in oversell refunds. Confidence: 99.8%.',
      keyBenefits: [
        'Zero data inconsistencies',
        'Real-time sync across all platforms',
        'Automatic conflict resolution',
        '99.8% data accuracy guarantee'
      ],
      visual: 'Multiple disconnected systems with conflicting data converging into unified AI brain that outputs consistent, accurate information across all platforms.'
    },
    {
      icon: Zap,
      title: 'Smart Integration Orchestration',
      description: 'Your 8 Apps Finally Work as One. Our AI connects everything—inventory, orders, customers, suppliers, payments, shipping—into one intelligent dashboard.',
      gradient: 'from-cyan-500 to-blue-500',
      delay: '200ms',
      image: '/images/olynk-action/integration-orchestration.png',
      modalTitle: 'Smart Integration Orchestration',
      modalDescription: 'Seamlessly connects inventory, orders, customers, suppliers, payments, and shipping into one intelligent dashboard that understands your business context.',
      insightExample: 'Amazon order for VIP customer detected. Inventory updated across all channels, shipping label generated, customer notified, accounting updated. Total time: 12 seconds.',
      keyBenefits: [
        'Single dashboard for everything',
        'Automatic workflow orchestration',
        'Context-aware data processing',
        '95% reduction in app switching'
      ],
      visual: 'Chaotic app switching animation transforms into smooth, connected workflow with data flowing intelligently between systems.'
    },
    {
      icon: TrendingUp,
      title: 'AI Inventory Intelligence Engine',
      description: 'Predicts Demand 7 Days Ahead (85% Accuracy). Our AI analyzes sales patterns, seasonality, and market trends to predict stockouts and optimize reordering.',
      gradient: 'from-blue-500 to-purple-500',
      delay: '400ms',
      image: '/images/olynk-action/inventory-intelligence.png',
      modalTitle: 'AI Inventory Intelligence Engine',
      modalDescription: 'Predicts demand with 85% accuracy by analyzing sales patterns, seasonality, market trends, and external factors to prevent stockouts and optimize inventory.',
      insightExample: 'Coconut oil demand will spike 40% next week (Diwali season + last 3 years pattern). Current stock lasts 4 days. Confidence: 92%. Action: Order 200 units by Thursday or lose ₹2.3L in sales.',
      keyBenefits: [
        'Zero surprise stockouts',
        '20% reduction in holding costs',
        'Optimal reorder timing',
        'Clear reasoning for every prediction'
      ],
      visual: 'Demand curve prediction with confidence intervals, highlighting upcoming stockout risk and recommended action.'
    },
    {
      icon: Truck,
      title: 'Intelligent Order Orchestration Hub',
      description: 'AI Routes Every Order for Fastest, Most Cost-Effective Delivery. Smart routing engine optimizes fulfillment based on customer location, product type, and shipping costs.',
      gradient: 'from-purple-500 to-pink-500',
      delay: '600ms',
      image: '/images/olynk-action/order-orchestration.png',
      modalTitle: 'Intelligent Order Orchestration Hub',
      modalDescription: 'Smart routing engine optimizes order fulfillment by evaluating customer location, product type, warehouse capacity, and shipping costs for fastest, cost-effective delivery.',
      insightExample: 'Order #1234: VIP customer + perishable product. Warehouse A has 2-day delay due to high volume. Routing to Warehouse B for same-day dispatch. Cost difference: ₹15.',
      keyBenefits: [
        '15% faster delivery times',
        'VIP orders never delayed',
        'Automatic delay prediction',
        'Cost-optimized routing'
      ],
      visual: 'Order flowing through decision tree showing AI evaluation criteria and optimal routing selection.'
    },
    {
      icon: MessageSquare,
      title: 'AI Communication Engine',
      description: 'Smart WhatsApp Automation That Understands Your Customers. Personalizes communication based on purchase history, order status, and predicted concerns.',
      gradient: 'from-pink-500 to-red-500',
      delay: '800ms',
      image: '/images/olynk-action/communication-engine.png',
      modalTitle: 'AI Communication Engine',
      modalDescription: 'Behavioral messaging system that personalizes WhatsApp communication based on customer purchase history, order status, and predicted concerns for higher satisfaction.',
      insightExample: 'Customer Priya orders monthly and typically asks about delivery by day 2. Sending proactive tracking update + loyalty discount. Expected result: 0 support queries, 40% higher satisfaction.',
      keyBenefits: [
        '60% reduction in "where\'s my order" messages',
        'Personalized communication at scale',
        'Proactive issue resolution',
        'Higher customer satisfaction'
      ],
      visual: 'Customer profiles with AI-generated personalized messages and behavioral predictions.'
    },
    {
      icon: LayoutDashboard,
      title: 'AI Operations Command Center',
      description: 'Your Intelligent Dashboard That Prioritizes Actions by Business Impact. Shows daily actions ranked by AI based on revenue impact, urgency, and effort required.',
      gradient: 'from-red-500 to-orange-500',
      delay: '1000ms',
      image: '/images/olynk-action/command-center.png',
      modalTitle: 'AI Operations Command Center',
      modalDescription: 'Intelligent dashboard that prioritizes daily actions based on revenue impact, urgency, and effort required, with clear AI reasoning for strategic focus.',
      insightExample: 'Priority 1: Reorder mango chips (₹2.3L revenue at risk, 2 hours effort)\nPriority 2: Contact delayed supplier (₹80K orders affected, 15 min effort)\nPriority 3: Review return pattern for Product X (₹45K monthly savings opportunity)',
      keyBenefits: [
        'Strategic focus instead of firefighting',
        'Clear business impact for every task',
        '50% improvement in decision quality',
        'Explainable AI reasoning'
      ],
      visual: 'Prioritized action cards with impact scores, effort estimates, and AI reasoning explanations.'
    },
    {
      icon: Brain,
      title: 'AI Learning & Memory System',
      description: 'Gets Smarter About Your Business Every Day. Self-improving system that learns your seasonal patterns, customer preferences, and market dynamics.',
      gradient: 'from-orange-500 to-yellow-500',
      delay: '1200ms',
      image: '/images/olynk-action/learning-system.png',
      modalTitle: 'AI Learning & Memory System',
      modalDescription: 'Self-improving AI that learns your seasonal patterns, customer preferences, supplier behaviors, and market dynamics for increasingly accurate insights.',
      insightExample: 'Detected: Your customers prefer COD during festival seasons (87% vs 45% normally).\nPattern: Returns spike 23% when temperature >35°C (packaging issue).\nInsight: Supplier X delays shipments by 2 days during monsoon.',
      keyBenefits: [
        'Personalized insights improve monthly',
        'Business-specific pattern detection',
        'Confidence scores for every prediction',
        'Complete reasoning transparency'
      ],
      visual: 'AI brain with growing neural connections, showing pattern recognition and learning improvement over time.'
    }
  ];

  const openModal = (index: number) => {
    if (features[index].title === 'AI Operations Command Center') {
      setIsPriorityOpen(true);
      document.body.style.overflow = 'hidden';
    } else {
      setSelectedFeature(index);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setSelectedFeature(null);
    setIsPriorityOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleExploreFeaturesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === '/features') {
      if (featuresRef.current) {
        const headerOffset = 64;
        const elementPosition = featuresRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
      }
    } else {
      navigate('/features?scroll=top');
    }
  };

  return (
    <section id="features" ref={featuresRef} className="py-20 bg-white dark:bg-gray-900 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            7 Ways Our AI Becomes Your{' '}
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent animate-pulse-smooth" style={{ animationDuration: '3s' }}>
              Smartest Employee
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Meet Your New AI Operations Advisor. Explore how OLYNK transforms your operations with intelligent, actionable insights tailored for ₹2-10Cr D2C brands in India.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: feature.delay }}
                onClick={() => openModal(index)}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative animate-fade-in-up`}>
                  <Icon className="h-8 w-8 text-white" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <Play className="h-3 w-3 text-teal-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  {feature.description}
                </p>
                <div className="flex items-center text-teal-600 dark:text-teal-400 font-semibold group-hover:translate-x-2 transition-transform duration-300 animate-slide-in-right">
                  <span>Explore Feature</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-1400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link
            to="/features?scroll=top"
            onClick={handleExploreFeaturesClick}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-block animate-fade-in-up"
          >
            Explore All Features
          </Link>
        </div>

        {selectedFeature === 0 && !isPriorityOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in-smooth">
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto animate-slide-up-smooth">
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-[60] w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 shadow-lg animate-fade-in-up"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <Unification />
            </div>
          </div>
        )}

        {selectedFeature === 1 && !isPriorityOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in-smooth">
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto animate-slide-up-smooth">
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-[60] w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 shadow-lg animate-fade-in-up"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <SmartIntegration />
            </div>
          </div>
        )}

        {selectedFeature === 2 && !isPriorityOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in-smooth">
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-slide-up-smooth">
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-[60] w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 shadow-lg animate-fade-in-up"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <InventoryIntelligence />
            </div>
          </div>
        )}

        {selectedFeature === 3 && !isPriorityOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in-smooth">
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto animate-slide-up-smooth">
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-[60] w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 shadow-lg animate-fade-in-up"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <Orchestration />
            </div>
          </div>
        )}

        {selectedFeature === 4 && !isPriorityOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in-smooth">
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-slide-up-smooth">
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-[60] w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 shadow-lg animate-fade-in-up"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <CommunicationEngine />
            </div>
          </div>
        )}

        {isPriorityOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in-smooth">
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 animate-slide-up-smooth">
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-[60] w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 shadow-lg animate-fade-in-up"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <Priority />
            </div>
          </div>
        )}

        {selectedFeature === 6 && !isPriorityOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in-smooth">
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto animate-slide-up-smooth">
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-[60] w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 shadow-lg animate-fade-in-up"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <AILearningSystem />
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in-smooth {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-up-smooth {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pulse-smooth {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-fade-in-smooth { animation: fade-in-smooth 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
        .animate-slide-up-smooth { animation: slide-up-smooth 0.7s ease-out; }
      `}</style>
    </section>
  );
};

export default Features;