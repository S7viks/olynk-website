import React from 'react';
import { Zap, TrendingUp, Users, Shield, Brain, Target, Heart, Truck, DollarSign, BarChart as ChartBar, Building, Sparkles, Clock, CheckCircle, ArrowRight, Lightbulb, Globe, Lock, MessageSquare, Settings, Award, Rocket, Eye, Search, Bot, FileText, Layers, Cpu, Atom } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  category: string;
  gradient: string;
}

const features: Feature[] = [
  // Business Process Optimization
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Workflow Automation",
    description: "Let us handle your repetitive tasks so you can focus on what matters most to your business.",
    benefits: ["Save 80% of manual work time", "Eliminate costly human errors", "Run operations 24/7 automatically"],
    category: "Business Process Optimization",
    gradient: "from-emerald-400 to-teal-600"
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: "Robotic Process Automation (RPA)",
    description: "Transform your manual, rule-based processes into automated workflows that never sleep.",
    benefits: ["Reduce operational costs", "Increase processing speed", "Ensure consistent quality"],
    category: "Business Process Optimization",
    gradient: "from-blue-400 to-indigo-600"
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Process Mining",
    description: "Discover hidden bottlenecks in your operations and unlock new levels of efficiency.",
    benefits: ["Identify process inefficiencies", "Reduce operational costs", "Improve team productivity"],
    category: "Business Process Optimization",
    gradient: "from-purple-400 to-pink-600"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Smart Scheduling",
    description: "Maximize your team's productivity with AI that optimally allocates resources in real-time.",
    benefits: ["Optimize team schedules", "Reduce idle time", "Boost utilization rates"],
    category: "Business Process Optimization",
    gradient: "from-orange-400 to-red-600"
  },

  // Data Analytics and Insights
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Predictive Analytics",
    description: "Stay ahead of the curve by knowing what's coming next with AI-powered forecasting.",
    benefits: ["Anticipate market changes", "Make data-driven decisions", "Stay ahead of competition"],
    category: "Data Analytics and Insights",
    gradient: "from-teal-400 to-cyan-600"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Sentiment Analysis",
    description: "Understand how your customers and employees really feel with real-time sentiment tracking.",
    benefits: ["Improve customer satisfaction", "Boost employee morale", "Prevent issues before they escalate"],
    category: "Data Analytics and Insights",
    gradient: "from-rose-400 to-pink-600"
  },
  {
    icon: <ChartBar className="w-6 h-6" />,
    title: "Data Visualization",
    description: "Turn complex data into beautiful, interactive dashboards that everyone can understand.",
    benefits: ["Clear visual insights", "Interactive dashboards", "Easy data sharing"],
    category: "Data Analytics and Insights",
    gradient: "from-green-400 to-emerald-600"
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Real-Time Analytics",
    description: "Make critical decisions instantly with insights delivered the moment they matter most.",
    benefits: ["Immediate problem detection", "Live performance monitoring", "Quick decision making"],
    category: "Data Analytics and Insights",
    gradient: "from-violet-400 to-purple-600"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Anomaly Detection",
    description: "Catch problems before they become disasters with AI that spots irregularities instantly.",
    benefits: ["Prevent system failures", "Detect fraud early", "Maintain data quality"],
    category: "Data Analytics and Insights",
    gradient: "from-red-400 to-pink-600"
  },

  // Customer Relationship Management (CRM)
  {
    icon: <Target className="w-6 h-6" />,
    title: "Personalized Recommendations",
    description: "Delight your customers with perfectly tailored product and service suggestions.",
    benefits: ["Increase sales conversion", "Improve customer satisfaction", "Boost average order value"],
    category: "Customer Relationship Management",
    gradient: "from-amber-400 to-orange-600"
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Customer Support Chatbots",
    description: "Provide instant, intelligent support that solves problems faster than ever before.",
    benefits: ["24/7 customer support", "Reduce response times", "Scale support effortlessly"],
    category: "Customer Relationship Management",
    gradient: "from-blue-400 to-cyan-600"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Churn Prediction",
    description: "Keep your valuable customers by identifying who's at risk of leaving before they do.",
    benefits: ["Reduce customer churn", "Increase retention rates", "Protect revenue"],
    category: "Customer Relationship Management",
    gradient: "from-purple-400 to-indigo-600"
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Lead Scoring",
    description: "Focus your sales team on the prospects most likely to buy and close deals faster.",
    benefits: ["Higher conversion rates", "Shorter sales cycles", "Better ROI on sales efforts"],
    category: "Customer Relationship Management",
    gradient: "from-yellow-400 to-amber-600"
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Customer Journey Mapping",
    description: "Optimize every touchpoint to create seamless experiences that customers love.",
    benefits: ["Improve customer experience", "Increase conversion rates", "Reduce friction points"],
    category: "Customer Relationship Management",
    gradient: "from-teal-400 to-blue-600"
  },

  // Supply Chain and Operations
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Demand Forecasting",
    description: "Never run out of stock or overstock again with AI that predicts exactly what you'll need.",
    benefits: ["Reduce stockouts by 90%", "Minimize excess inventory", "Improve cash flow"],
    category: "Supply Chain and Operations",
    gradient: "from-indigo-400 to-blue-600"
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Route Optimization",
    description: "Deliver faster and cheaper with AI that finds the perfect path for every shipment.",
    benefits: ["Reduce delivery times", "Lower shipping costs", "Improve customer satisfaction"],
    category: "Supply Chain and Operations",
    gradient: "from-cyan-400 to-teal-600"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Supplier Risk Assessment",
    description: "Protect your business from supply chain disruptions by evaluating supplier reliability.",
    benefits: ["Reduce supply chain risks", "Ensure business continuity", "Make informed supplier decisions"],
    category: "Supply Chain and Operations",
    gradient: "from-red-400 to-orange-600"
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Inventory Management",
    description: "Keep perfect track of your stock levels and optimize inventory across all locations.",
    benefits: ["Reduce carrying costs", "Prevent stockouts", "Optimize warehouse space"],
    category: "Supply Chain and Operations",
    gradient: "from-green-400 to-teal-600"
  },

  // Marketing and Sales
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Content Personalization",
    description: "Create marketing that speaks directly to each customer's unique needs and interests.",
    benefits: ["Higher engagement rates", "Better conversion rates", "Increased revenue per customer"],
    category: "Marketing and Sales",
    gradient: "from-pink-400 to-rose-600"
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Ad Spend Optimization",
    description: "Get the maximum return on every advertising dollar with AI-powered budget allocation.",
    benefits: ["Reduce ad waste", "Improve ROAS", "Scale profitable campaigns"],
    category: "Marketing and Sales",
    gradient: "from-yellow-400 to-amber-600"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Dynamic Pricing Models",
    description: "Maximize profits by automatically adjusting prices based on demand and market conditions.",
    benefits: ["Increase profit margins", "Stay competitive", "Respond to market changes"],
    category: "Marketing and Sales",
    gradient: "from-emerald-400 to-green-600"
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Social Media Monitoring",
    description: "Stay on top of what people are saying about your brand across all social platforms.",
    benefits: ["Protect brand reputation", "Identify opportunities", "Engage with customers"],
    category: "Marketing and Sales",
    gradient: "from-blue-400 to-indigo-600"
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Email Campaign Optimization",
    description: "Boost your email marketing results with AI that optimizes for maximum engagement.",
    benefits: ["Improve open rates", "Increase click-through rates", "Drive more conversions"],
    category: "Marketing and Sales",
    gradient: "from-purple-400 to-pink-600"
  },

  // Finance and Risk Management
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Fraud Detection",
    description: "Protect your business and customers from fraud with AI that catches threats instantly.",
    benefits: ["Prevent financial losses", "Reduce false positives", "Protect customer trust"],
    category: "Finance and Risk Management",
    gradient: "from-red-400 to-pink-600"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Credit Risk Assessment",
    description: "Make smarter lending decisions by accurately evaluating customer creditworthiness.",
    benefits: ["Reduce bad debt", "Approve more good customers", "Optimize credit policies"],
    category: "Finance and Risk Management",
    gradient: "from-orange-400 to-red-600"
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Expense Tracking",
    description: "Keep perfect control of your finances with automated expense monitoring and analysis.",
    benefits: ["Reduce unnecessary spending", "Improve budget accuracy", "Ensure compliance"],
    category: "Finance and Risk Management",
    gradient: "from-green-400 to-emerald-600"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Cash Flow Forecasting",
    description: "Never be surprised by cash flow issues again with accurate financial projections.",
    benefits: ["Improve financial planning", "Avoid cash crunches", "Make confident investments"],
    category: "Finance and Risk Management",
    gradient: "from-teal-400 to-cyan-600"
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Budget Optimization",
    description: "Allocate your resources more effectively to maximize return on every dollar spent.",
    benefits: ["Improve ROI", "Reduce waste", "Achieve financial goals"],
    category: "Finance and Risk Management",
    gradient: "from-blue-400 to-indigo-600"
  },

  // Human Resources and Talent Management
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Resume Screening",
    description: "Find the perfect candidates faster with AI that automatically screens and ranks resumes.",
    benefits: ["Reduce hiring time", "Improve hire quality", "Lower recruitment costs"],
    category: "Human Resources",
    gradient: "from-purple-400 to-indigo-600"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Employee Sentiment Analysis",
    description: "Keep your team happy and productive by tracking workforce morale in real-time.",
    benefits: ["Reduce turnover", "Boost productivity", "Improve workplace satisfaction"],
    category: "Human Resources",
    gradient: "from-rose-400 to-pink-600"
  },
  {
    icon: <ChartBar className="w-6 h-6" />,
    title: "Performance Analytics",
    description: "Help your employees reach their full potential with data-driven performance insights.",
    benefits: ["Improve employee performance", "Identify top performers", "Make fair evaluations"],
    category: "Human Resources",
    gradient: "from-emerald-400 to-teal-600"
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Training and Development",
    description: "Build a stronger team by identifying skill gaps and recommending targeted training.",
    benefits: ["Improve employee skills", "Increase job satisfaction", "Reduce skill gaps"],
    category: "Human Resources",
    gradient: "from-yellow-400 to-orange-600"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Diversity Metrics",
    description: "Build a more inclusive workplace by monitoring and promoting diversity across your organization.",
    benefits: ["Improve workplace diversity", "Ensure fair hiring", "Build inclusive culture"],
    category: "Human Resources",
    gradient: "from-cyan-400 to-blue-600"
  },

  // Industry-Specific Solutions
  {
    icon: <Building className="w-6 h-6" />,
    title: "Retail Solutions",
    description: "Create personalized shopping experiences and predict demand with retail-specific AI.",
    benefits: ["Increase sales", "Improve customer experience", "Optimize inventory"],
    category: "Industry Solutions",
    gradient: "from-indigo-400 to-purple-600"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Healthcare Solutions",
    description: "Improve patient outcomes and operational efficiency with healthcare-focused analytics.",
    benefits: ["Better patient care", "Reduce costs", "Improve efficiency"],
    category: "Industry Solutions",
    gradient: "from-teal-400 to-green-600"
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Manufacturing Solutions",
    description: "Prevent equipment failures and optimize production with manufacturing-specific AI.",
    benefits: ["Reduce downtime", "Improve quality", "Optimize production"],
    category: "Industry Solutions",
    gradient: "from-orange-400 to-red-600"
  },

  // AI-Powered Compliance and Governance
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Regulatory Compliance",
    description: "Stay compliant effortlessly with automated monitoring that ensures you meet all standards.",
    benefits: ["Avoid penalties", "Reduce audit stress", "Maintain trust"],
    category: "Compliance and Governance",
    gradient: "from-red-400 to-pink-600"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Privacy Risk Analysis",
    description: "Protect your customers' privacy by identifying and preventing potential data breaches.",
    benefits: ["Prevent data breaches", "Ensure privacy compliance", "Protect customer trust"],
    category: "Compliance and Governance",
    gradient: "from-blue-400 to-indigo-600"
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Audit Automation",
    description: "Make audits painless with automated processes that handle compliance documentation.",
    benefits: ["Reduce audit time", "Ensure accuracy", "Lower compliance costs"],
    category: "Compliance and Governance",
    gradient: "from-green-400 to-teal-600"
  },

  // Collaboration and Knowledge Management
  {
    icon: <Search className="w-6 h-6" />,
    title: "Smart Document Search",
    description: "Find any document or piece of information in seconds, not hours, with intelligent search.",
    benefits: ["Save time searching", "Improve decision speed", "Share knowledge easily"],
    category: "Collaboration",
    gradient: "from-purple-400 to-pink-600"
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Meeting Summaries",
    description: "Never miss important details with AI that automatically takes notes and creates summaries.",
    benefits: ["Save meeting time", "Capture all details", "Improve follow-up"],
    category: "Collaboration",
    gradient: "from-cyan-400 to-teal-600"
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Language Translation",
    description: "Break down language barriers and collaborate globally with real-time translation.",
    benefits: ["Expand to new markets", "Improve team collaboration", "Serve global customers"],
    category: "Collaboration",
    gradient: "from-emerald-400 to-green-600"
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Knowledge Graphs",
    description: "Connect and visualize all your organizational knowledge to unlock hidden insights.",
    benefits: ["Discover connections", "Improve decision making", "Share knowledge better"],
    category: "Collaboration",
    gradient: "from-indigo-400 to-blue-600"
  },

  // Emerging Features
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Generative AI for Content",
    description: "Create high-quality text, images, and videos at scale while maintaining your brand voice.",
    benefits: ["Reduce content costs", "Scale content production", "Maintain brand consistency"],
    category: "Emerging Features",
    gradient: "from-violet-400 to-pink-600"
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Digital Twin Simulation",
    description: "Test ideas and optimize systems before investing time and money in real-world changes.",
    benefits: ["Reduce project risks", "Optimize before building", "Save development costs"],
    category: "Emerging Features",
    gradient: "from-cyan-400 to-indigo-600"
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Edge AI",
    description: "Get instant results with AI that processes data locally for lightning-fast responses.",
    benefits: ["Reduce latency", "Improve privacy", "Work offline"],
    category: "Emerging Features",
    gradient: "from-orange-400 to-red-600"
  },
  {
    icon: <Atom className="w-6 h-6" />,
    title: "Quantum AI",
    description: "Solve complex problems faster than ever with cutting-edge quantum computing power.",
    benefits: ["Solve complex problems", "Advanced analytics", "Future-proof technology"],
    category: "Emerging Features",
    gradient: "from-purple-400 to-indigo-600"
  }
];

const categories = Array.from(new Set(features.map(f => f.category)));

export default function FeaturesSection() {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);
  const featuresRef = React.useRef<HTMLDivElement>(null); // Ref for the Features section
  const location = useLocation();
  const navigate = useNavigate();

  const filteredFeatures = selectedCategory 
    ? features.filter(f => f.category === selectedCategory)
    : features;

  // Handle scroll on route change or query param
  React.useEffect(() => {
    if (location.pathname === '/features' && featuresRef.current) {
      const headerOffset = 64; // Adjust for header height (from Header.tsx)
      const elementPosition = featuresRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth',
      });
    }
  }, [location.pathname, location.search]);

  // Handle "Explore All Features" click
  const handleExploreFeaturesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === '/features' && featuresRef.current) {
      const headerOffset = 64;
      const elementPosition = featuresRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth',
      });
    } else {
      navigate('/features?scroll=top');
    }
  };

  return (
    <section ref={featuresRef} className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900' : 'bg-gradient-to-br from-teal-50/80 via-cyan-50/60 to-emerald-50/40'} py-20 px-4`}>
      <div className="max-w-7xl mx-auto">
        {/* Header with Image */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 animate-fade-in">
          <div className="text-center md:text-left md:w-2/3">
            <div className="flex items-center justify-center md:justify-start mb-6">
              <div className="animate-bounce-slow">
                <Sparkles className={`w-12 h-12 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
              </div>
            </div>
            <h2 className={`text-5xl md:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6 leading-tight`}>
              Our Comprehensive
              <span className="block bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                Feature List
              </span>
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto md:mx-0 leading-relaxed`}>
              Discover the full range of capabilities that Golden Thread brings to your business, 
              designed to optimize operations and drive growth.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center md:justify-end mt-8 md:mt-0">
            <img 
              src="https://d3lkc3n5th01x7.cloudfront.net/wp-content/uploads/2023/12/07074817/AI-in-business-management.png" 
              alt="AI in Business Management" 
              className={`w-96 h-auto rounded-lg shadow-lg animate-bounce-slow ${isDark ? 'border-teal-700' : 'border-teal-100'}`}
            />
          </div>
        </div>

        {/* Category Filter - Text Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 text-sm">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`font-medium transition-all duration-300 hover:scale-105 relative px-2 py-1 ${
              !selectedCategory
                ? isDark ? 'text-teal-400' : 'text-teal-600'
                : isDark ? 'text-gray-400 hover:text-teal-400' : 'text-gray-500 hover:text-teal-600'
            }`}
          >
            All Features
            {!selectedCategory && (
              <div className={`absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-600 to-cyan-600 animate-pulse`} />
            )}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`font-medium transition-all duration-300 hover:scale-105 relative px-2 py-1 ${
                selectedCategory === category
                  ? isDark ? 'text-teal-400' : 'text-teal-600'
                  : isDark ? 'text-gray-400 hover:text-teal-400' : 'text-gray-500 hover:text-teal-600'
              }`}
            >
              {category}
              {selectedCategory === category && (
                <div className={`absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-600 to-cyan-600 animate-pulse`} />
              )}
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatures.map((feature, index) => (
            <div
              key={index}
              className={`group relative ${isDark ? 'bg-gray-800/70 border-teal-700/50 hover:bg-gray-700/90' : 'bg-white/70 border-white/50 hover:bg-white/90'} backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transformateurs hover:border-teal-200/50 ${
                hoveredCard === index ? 'scale-105' : ''
              }`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                animation: `slideUp 0.6s ease-out ${index * 100}ms both, float 3s ease-in-out infinite ${index * 200}ms`
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl`} />
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                {feature.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white group-hover:text-teal-400' : 'text-gray-900 group-hover:text-teal-700'} mb-4 transition-colors duration-300`}>
                  {feature.title}
                </h3>
                <p className={`mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
                
                {/* Benefits */}
                <ul className="space-y-2 mb-6">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className={`flex items-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <CheckCircle className={`w-4 h-4 ${isDark ? 'text-teal-400' : 'text-teal-600'} mr-2 flex-shrink-0`} />
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className={`${isDark ? 'text-teal-400 group-hover:text-teal-300' : 'text-teal-600 group-hover:text-teal-700'} font-medium transition-colors duration-300 flex items-center`}>
                  <span className="mr-2">Learn more</span>
                  <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${feature.gradient} animate-ping`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-fade-in-up">
          <div className={`bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-12 text-white relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-cyan-600/90" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
                Join thousands of companies already using Golden Thread to automate, 
                optimize, and scale their operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/early-access-form"
                  className={`${isDark ? 'bg-gray-800 text-teal-400 hover:bg-gray-700' : 'bg-white text-teal-600 hover:bg-gray-50'} px-8 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg`}
                >
                  Start Free Trial
                </Link>
                <Link
                  to="/features?scroll=top"
                  onClick={handleExploreFeaturesClick}
                  className={`${isDark ? 'border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900' : 'border-white text-white hover:bg-white hover:text-teal-600'} border-2 px-8 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300`}
                >
                  Explore All Features
                </Link>
              </div>
            </div>
            {/* Floating particles */}
            <div className="absolute top-10 left-10 w-2 h-2 bg-white/30 rounded-full animate-float-slow" />
            <div className="absolute top-20 right-20 w-3 h-3 bg-white/20 rounded-full animate-float-delayed" />
            <div className="absolute bottom-10 left-20 w-2 h-2 bg-white/40 rounded-full animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
}