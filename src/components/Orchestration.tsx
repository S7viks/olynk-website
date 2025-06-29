import React, { useState, useEffect } from 'react';
import { 
  Package, 
  MapPin, 
  Crown, 
  Truck, 
  Clock, 
  DollarSign, 
  Warehouse, 
  CheckCircle, 
  User,
  Star,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';

interface OrderDetail {
  id: string;
  customer: string;
  isVip: boolean;
  productType: string;
  location: string;
  priority: number;
  value: number;
}

interface DecisionNode {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'analyzing' | 'complete';
  icon: React.ReactNode;
  result?: string;
}

const TypewriterText: React.FC<{ text: string; speed?: number; className?: string }> = ({ 
  text, 
  speed = 50, 
  className = '' 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span className={className}>{displayText}</span>;
};

const ColorChangingText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const colors = ['text-teal-500', 'text-emerald-500', 'text-cyan-500', 'text-blue-500'];
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex(prev => (prev + 1) % colors.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`${colors[colorIndex]} transition-colors duration-500 ${className}`}>
      {text}
    </span>
  );
};

const BouncingIcon: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  return (
    <div 
      className="animate-bounce"
      style={{ animationDelay: `${delay}s`, animationDuration: '2s' }}
    >
      {children}
    </div>
  );
};

const PulsingElement: React.FC<{ children: React.ReactNode; isActive: boolean }> = ({ children, isActive }) => {
  return (
    <div className={`transition-all duration-300 ${isActive ? 'animate-pulse scale-105' : ''}`}>
      {children}
    </div>
  );
};

const SlideInComponent: React.FC<{ 
  children: React.ReactNode; 
  isVisible: boolean; 
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}> = ({ children, isVisible, delay = 0, direction = 'up' }) => {
  const directionClasses = {
    left: 'translate-x-[-100px]',
    right: 'translate-x-[100px]',
    up: 'translate-y-[50px]',
    down: 'translate-y-[-50px]'
  };

  return (
    <div 
      className={`transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-x-0 translate-y-0' 
          : `opacity-0 ${directionClasses[direction]}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Orchestration: React.FC = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showRouteSelection, setShowRouteSelection] = useState(false);
  const [deliveryComplete, setDeliveryComplete] = useState(false);

  const orderDetails: OrderDetail = {
    id: 'ORD-2024-001',
    customer: 'Premium Electronics Corp',
    isVip: true,
    productType: 'High-Value Electronics',
    location: 'New York, NY',
    priority: 1,
    value: 15000
  };

  const decisionNodes: DecisionNode[] = [
    {
      id: '1',
      title: 'Customer Priority',
      description: 'Checking customer tier',
      status: 'pending',
      icon: <User className="w-5 h-5" />,
      result: 'VIP Status - Priority 1'
    },
    {
      id: '2',
      title: 'Warehouse Check',
      description: 'Verifying inventory',
      status: 'pending',
      icon: <Warehouse className="w-5 h-5" />,
      result: 'NYC-01 (98% capacity)'
    },
    {
      id: '3',
      title: 'Cost Analysis',
      description: 'Computing carrier costs',
      status: 'pending',
      icon: <DollarSign className="w-5 h-5" />,
      result: 'Express $45.99'
    },
    {
      id: '4',
      title: 'Delivery Time',
      description: 'Optimizing route',
      status: 'pending',
      icon: <Clock className="w-5 h-5" />,
      result: 'Next-day by 10:00 AM'
    }
  ];

  const [nodes, setNodes] = useState(decisionNodes);

  useEffect(() => {
    const sequence = [
      { action: () => setShowTitle(true), delay: 300 },
      { action: () => setShowOrderDetails(true), delay: 1200 }
    ];

    sequence.forEach(({ action, delay }) => {
      setTimeout(action, delay);
    });
  }, []);

  useEffect(() => {
    if (currentStep > 0 && currentStep <= nodes.length) {
      const timer = setTimeout(() => {
        setNodes(prev => prev.map((node, index) => {
          if (index === currentStep - 1) {
            return { ...node, status: 'analyzing' };
          }
          return node;
        }));

        const completeTimer = setTimeout(() => {
          setNodes(prev => prev.map((node, index) => {
            if (index === currentStep - 1) {
              return { ...node, status: 'complete' };
            }
            return node;
          }));

          if (currentStep === nodes.length) {
            setTimeout(() => setShowRouteSelection(true), 600);
          }
        }, 1200);

        return () => clearTimeout(completeTimer);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [currentStep, nodes.length]);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setShowAnalysis(true), 300);
    setCurrentStep(1);
  };

  const progressNextStep = () => {
    if (currentStep < nodes.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (isAnalyzing && currentStep < nodes.length && currentStep > 0) {
      const timer = setTimeout(() => {
        progressNextStep();
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isAnalyzing, nodes.length]);

  const completeDelivery = () => {
    setDeliveryComplete(true);
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-4 overflow-y-auto">
      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        <SlideInComponent isVisible={showTitle} delay={0}>
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              <TypewriterText text="Intelligent Order" speed={80} />
              <br />
              <ColorChangingText text="Orchestration Hub" className="text-3xl md:text-4xl font-bold" />
            </h1>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              <TypewriterText 
                text="AI-powered routing for efficient, satisfying deliveries." 
                speed={25}
              />
            </p>
          </div>
        </SlideInComponent>

        <SlideInComponent isVisible={showOrderDetails} delay={300} direction="up">
          <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-md border border-white/20 p-4 mb-4 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <BouncingIcon delay={0}>
                  <Package className="w-6 h-6 text-teal-600 mr-2" />
                </BouncingIcon>
                Order Details
              </h2>
              <div className="flex items-center space-x-2">
                {orderDetails.isVip && (
                  <BouncingIcon delay={0.3}>
                    <div className="flex items-center bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">
                      <Crown className="w-3 h-3 mr-1" />
                      VIP
                    </div>
                  </BouncingIcon>
                )}
                <BouncingIcon delay={0.6}>
                  <div className="flex items-center bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full text-xs font-medium">
                    <MapPin className="w-3 h-3 mr-1" />
                    {orderDetails.location}
                  </div>
                </BouncingIcon>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-2 rounded-lg border border-teal-100 hover:scale-105 transition-all duration-200">
                <p className="text-xs text-gray-600">Order ID</p>
                <p className="font-bold text-sm text-gray-900">{orderDetails.id}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-2 rounded-lg border border-emerald-100 hover:scale-105 transition-all duration-200">
                <p className="text-xs text-gray-600">Customer</p>
                <p className="font-bold text-sm text-gray-900">{orderDetails.customer}</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-2 rounded-lg border border-cyan-100 hover:scale-105 transition-all duration-200">
                <p className="text-xs text-gray-600">Product Type</p>
                <p className="font-bold text-sm text-gray-900">{orderDetails.productType}</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-2 rounded-lg border border-indigo-100 hover:scale-105 transition-all duration-200">
                <p className="text-xs text-gray-600">Order Value</p>
                <p className="font-bold text-sm text-gray-900">${orderDetails.value.toLocaleString()}</p>
              </div>
            </div>

            {!isAnalyzing && (
              <div className="mt-3 text-center">
                <button
                  onClick={startAnalysis}
                  className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 animate-pulse"
                >
                  <Zap className="w-4 h-4 inline mr-1" />
                  Start AI Analysis
                </button>
              </div>
            )}
          </div>
        </SlideInComponent>

        <SlideInComponent isVisible={showAnalysis} delay={0} direction="left">
          {isAnalyzing && (
            <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-md border border-white/20 p-4 mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <TrendingUp className="w-6 h-6 text-teal-600 mr-2" />
                <TypewriterText text="AI Decision Analysis" />
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {nodes.map((node, index) => (
                  <PulsingElement key={node.id} isActive={node.status === 'analyzing'}>
                    <div 
                      className={`p-3 rounded-lg border-2 transition-all duration-500 hover:scale-[1.02] ${
                        node.status === 'complete' 
                          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-md scale-105' 
                          : node.status === 'analyzing'
                          ? 'bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-300 shadow-md animate-pulse scale-105'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div className={`p-1 rounded-md mr-2 transition-all duration-300 ${
                          node.status === 'complete' 
                            ? 'bg-green-100 text-green-600 animate-bounce' 
                            : node.status === 'analyzing'
                            ? 'bg-teal-100 text-teal-600 animate-spin'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {node.status === 'complete' ? <CheckCircle className="w-5 h-5" /> : node.icon}
                        </div>
                        <h3 className="font-bold text-sm text-gray-900">{node.title}</h3>
                      </div>
                      <p className="text-gray-600 text-xs mb-2">{node.description}</p>
                      
                      {node.status === 'analyzing' && (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-teal-600 mr-1"></div>
                          <ColorChangingText text="Processing..." className="text-xs font-medium" />
                        </div>
                      )}
                      
                      {node.status === 'complete' && node.result && (
                        <div className="bg-white/80 p-2 rounded-md border border-green-200 animate-fade-in">
                          <p className="text-green-800 font-medium text-xs">{node.result}</p>
                        </div>
                      )}
                    </div>
                  </PulsingElement>
                ))}
              </div>
            </div>
          )}
        </SlideInComponent>

        <SlideInComponent isVisible={showRouteSelection} delay={0} direction="right">
          {showRouteSelection && (
            <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-md border border-white/20 p-4 mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <Target className="w-6 h-6 text-teal-600 mr-2" />
                <TypewriterText text="Optimal Route Selected" />
              </h2>

              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-3 rounded-lg shadow-md mb-3 hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold mb-1">Express Premium</h3>
                    <p className="opacity-90 text-xs">NYC Warehouse → Express → Customer</p>
                  </div>
                  <div className="text-right">
                    <BouncingIcon>
                      <Truck className="w-8 h-8" />
                    </BouncingIcon>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-green-50 p-2 rounded-lg border border-green-200 hover:scale-105 transition-all duration-200">
                  <div className="flex items-center mb-1">
                    <Clock className="w-4 h-4 text-green-600 mr-1" />
                    <span className="font-bold text-xs text-green-800">Time</span>
                  </div>
                  <p className="text-green-700 text-xs">Next-day 10:00 AM</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-lg border border-blue-200 hover:scale-105 transition-all duration-200">
                  <div className="flex items-center mb-1">
                    <DollarSign className="w-4 h-4 text-blue-600 mr-1" />
                    <span className="font-bold text-xs text-blue-800">Cost</span>
                  </div>
                  <p className="text-blue-700 text-xs">$45.99 (15% savings)</p>
                </div>
                <div className="bg-purple-50 p-2 rounded-lg border border-purple-200 hover:scale-105 transition-all duration-200">
                  <div className="flex items-center mb-1">
                    <Star className="w-4 h-4 text-purple-600 mr-1" />
                    <span className="font-bold text-xs text-purple-800">Success</span>
                  </div>
                  <p className="text-purple-700 text-xs">99.2% On-time</p>
                </div>
              </div>

              {!deliveryComplete && (
                <div className="text-center">
                  <button
                    onClick={completeDelivery}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 animate-pulse"
                  >
                    <Truck className="w-4 h-4 inline mr-1" />
                    Execute Delivery
                  </button>
                </div>
              )}
            </div>
          )}
        </SlideInComponent>

        <SlideInComponent isVisible={deliveryComplete} delay={300} direction="up">
          {deliveryComplete && (
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl shadow-md p-4 text-center animate-bounce">
              <BouncingIcon>
                <CheckCircle className="w-12 h-12 mx-auto mb-2" />
              </BouncingIcon>
              <h2 className="text-xl font-bold mb-2">
                <TypewriterText text="Delivery Completed!" />
              </h2>
              <p className="text-base opacity-90 mb-2">
                <TypewriterText text="Customer: 5/5 stars ⭐⭐⭐⭐⭐" speed={40} />
              </p>
              <div className="flex justify-center items-center space-x-2 flex-wrap">
                <div className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold">
                  On-time
                </div>
                <div className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold">
                  Cost optimized
                </div>
                <div className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold">
                  VIP experience
                </div>
              </div>
            </div>
          )}
        </SlideInComponent>
      </main>
    </div>
  );
};

export default Orchestration;