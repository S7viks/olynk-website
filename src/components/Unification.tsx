import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Shield, 
  Cpu,
  Activity,
  TrendingUp,
  Layers,
  Target,
  Sparkles
} from 'lucide-react';

const Unification = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [dataFlowActive, setDataFlowActive] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);

  // Sequential element visibility
  useEffect(() => {
    const elements = [
      'header',
      'title',
      'description',
      'step-indicators',
      'main-container',
      'conflicting-data',
      'ai-processor',
      'unified-output',
      'features-grid'
    ];

    elements.forEach((element, index) => {
      setTimeout(() => {
        setVisibleElements(prev => new Set([...prev, element]));
      }, index * 200);
    });

    setTimeout(() => {
      setDataFlowActive(true);
    }, 1500);
  }, []);

  // Auto-advance animation steps with restart
  useEffect(() => {
    if (!dataFlowActive) return;

    const stepTimings = [0, 1000, 2000, 3000, 4000];
    
    const timers = stepTimings.map((timing, index) => 
      setTimeout(() => {
        setCurrentStep(index);
        if (index === 4) {
          setProcessingComplete(true);
          setTimeout(() => {
            setCurrentStep(0);
            setProcessingComplete(false);
            setDataFlowActive(false);
            setTimeout(() => setDataFlowActive(true), 500); // Restart animation
          }, 1500);
        }
      }, timing)
    );

    return () => timers.forEach(clearTimeout);
  }, [dataFlowActive]);

  const conflictingData = [
    { system: 'ERP System', value: '1,247', status: 'conflict', delay: 0 },
    { system: 'CRM Database', value: '1,198', status: 'conflict', delay: 200 },
    { system: 'Inventory Tool', value: '1,301', status: 'conflict', delay: 400 },
    { system: 'POS System', value: '1,225', status: 'conflict', delay: 600 }
  ];

  const steps = [
    {
      title: 'Multiple Data Sources',
      description: 'Conflicting information across systems',
      icon: AlertTriangle,
      color: 'text-orange-500'
    },
    {
      title: 'AI Processing',
      description: 'Intelligent analysis and pattern recognition',
      icon: Cpu,
      color: 'text-blue-500'
    },
    {
      title: 'Conflict Resolution',
      description: 'Business rules applied automatically',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      title: 'Unified Output',
      description: 'Single source of truth established',
      icon: Database,
      color: 'text-teal-500'
    },
    {
      title: 'Real-time Sync',
      description: 'Instant updates across all systems',
      icon: RefreshCw,
      color: 'text-purple-500'
    }
  ];

  const features = [
    {
      icon: RefreshCw,
      title: 'Real-time Sync',
      description: 'Instant updates across all connected systems',
      color: 'from-blue-500 to-cyan-500',
      delay: 0
    },
    {
      icon: Shield,
      title: 'Data Integrity',
      description: '99.8% accuracy with built-in validation rules',
      color: 'from-green-500 to-teal-500',
      delay: 200
    },
    {
      icon: TrendingUp,
      title: 'Business Intelligence',
      description: 'Transform unified data into actionable insights',
      color: 'from-orange-500 to-red-500',
      delay: 400
    }
  ];

  return (
    <div className="min-h-fit bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 dark:from-gray-900 dark:via-teal-900 dark:to-emerald-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-8 left-4 w-32 h-32 bg-teal-200/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-16 right-8 w-40 h-40 bg-cyan-200/20 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute bottom-8 left-1/4 w-36 h-36 bg-emerald-200/20 rounded-full blur-xl animate-float-slow"></div>
      </div>

      {/* Header */}
      <div className="container mx-auto px-3 py-3 relative z-10">
        <div className="text-center mb-6">
          {/* Title */}
          <h1 className={`
            text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3 transition-all duration-800 transform
            ${visibleElements.has('title') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6'
            }
          `}>
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              AI Data Unification Engine
            </span>
          </h1>
          
          {/* Description */}
          <p className={`
            text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed transition-all duration-1000 transform
            ${visibleElements.has('description') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6'
            }
          `}>
            Transform chaotic data into actionable intelligence with our revolutionary 
            single source of truth technology
          </p>
        </div>

        {/* Main Animation Container */}
        <div className="max-w-4xl mx-auto">
          {/* Step Indicators */}
          <div className={`
            flex justify-center mb-4 transition-all duration-600 transform
            ${visibleElements.has('step-indicators') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
            }
          `}>
            <div className="flex items-center gap-1">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full transition-all duration-400
                    ${index <= currentStep 
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white scale-4.5 shadow-md animate-pulse-gentle' 
                      : 'bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 shadow-sm hover:shadow-md'
                    }
                  `}
                  style={{ transitionDelay: `${index * 60}ms` }}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      w-8 h-1 mx-0.5 rounded-full transition-all duration-400
                      ${index < currentStep 
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 shadow-sm' 
                        : 'bg-gray-200 dark:bg-gray-700'
                      }
                    `}
                    style={{ transitionDelay: `${index * 80}ms` }} />
                    )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Visualization */}
          <div className={`
            bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg p-4 mb-6 transition-all duration-800 transform
            ${visibleElements.has('main-container') 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
            }
          `}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              
              {/* Left: Multiple Systems */}
              <div className={`
                space-y-3 transition-all duration-600 transform
                ${visibleElements.has('conflicting-data') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-8'
                }
              `}>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center mb-4 flex items-center justify-center gap-1.5">
                  <Layers className="w-4 h-4 text-teal-500" />
                  Multiple Systems
                </h3>
                {conflictingData.map((item, index) => (
                  <div
                    key={index}
                    className={`
                      bg-white dark:bg-gray-800 rounded-md p-2 shadow-sm border-2 transition-all duration-400 transform hover:scale-4.5
                      ${currentStep >= 0 && dataFlowActive
                        ? 'border-red-200 bg-red-50 dark:bg-red-900/20 animate-shake' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-teal-200'
                      }
                    `}
                    style={{ 
                      animationDelay: `${item.delay}ms`,
                      transitionDelay: `${index * 60}ms`
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Database className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                        <span className="font-medium text-xs text-gray-700 dark:text-gray-300">{item.system}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`
                          text-sm font-bold transition-colors duration-300
                          ${currentStep >= 0 && dataFlowActive ? 'text-red-500 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}
                        `}>
                          {item.value}
                        </span>
                        {currentStep >= 0 && dataFlowActive && (
                          <AlertTriangle className="w-2.5 h-2.5 text-red-500 animate-bounce" />
                        )}
                      </div>
                    </div>
                    
                    {/* Data Flow Particles */}
                    {currentStep >= 1 && dataFlowActive && (
                      <div className="absolute -right-1.5 top-1/2 transform -translate-y-1/2">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-ping"></div>
                        <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse ml-2 mt-0.5"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Center: AI Processing */}
              <div className="flex flex-col items-center space-y-4">
                {/* Main AI Processor */}
                <div className="relative">
                  {/* Outer Ring Animation */}
                  {currentStep >= 1 && dataFlowActive && (
                    <>
                      <div className="absolute inset-0 animate-spin-slow">
                        <div className="w-16 h-16 border-2 border-teal-200 border-t-teal-500 rounded-full"></div>
                      </div>
                      <div className="absolute inset-1.5 animate-ping">
                        <div className="w-14 h-14 bg-teal-500/20 rounded-full"></div>
                      </div>
                    </>
                  )}
                  
                  <div className={`
                    w-16 h-16 bg-gradient-to-br from-teal-500 via-cyan-500 to-emerald-500 rounded-full 
                    flex items-center justify-center shadow-lg transition-all duration-600 relative z-10
                    ${currentStep >= 1 && dataFlowActive 
                      ? 'scale-4.5 shadow-teal-500/40 animate-pulse-gentle' 
                      : 'scale-100'
                    }
                  `}>
                    <Cpu className="w-8 h-8 text-white" />
                    {currentStep >= 1 && dataFlowActive && (
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>

                {/* AI Processing Status */}
                {currentStep >= 1 && dataFlowActive && (
                  <div className="bg-white dark:bg-gray-800 rounded-md p-3 shadow-sm animate-slide-up border border-teal-100 dark:border-teal-900">
                    <div className="text-center">
                      <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1.5 flex items-center justify-center gap-1.5">
                        <Target className="w-2.5 h-2.5 text-teal-500" />
                        AI Processing
                      </h4>
                      <div className="flex items-center justify-center gap-1.5 mb-1.5">
                        <Activity className="w-2.5 h-2.5 text-teal-500 animate-pulse" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {currentStep === 1 && 'Analyzing patterns...'}
                          {currentStep === 2 && 'Resolving conflicts...'}
                          {currentStep >= 3 && 'Processing complete!'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-teal-500 to-cyan-500 h-1 rounded-full transition-all duration-1000 animate-shimmer"
                          style={{ 
                            width: currentStep >= 3 ? '100%' : currentStep >= 2 ? '75%' : '45%' 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Business Rules Applied */}
                {currentStep >= 2 && dataFlowActive && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-md p-2 animate-bounce-in shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-green-500 animate-check" />
                      <span className="text-green-700 dark:text-green-400 font-medium text-xs">Conflicts Resolved</span>
                      <Sparkles className="w-2.5 h-2.5 text-green-400 animate-pulse" />
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Unified Output */}
              <div className={`
                space-y-3 transition-all duration-600 transform
                ${visibleElements.has('unified-output') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-8'
                }
              `}>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center mb-4 flex items-center justify-center gap-1.5">
                  <Database className="w-4 h-4 text-teal-500" />
                  Unified Output
                </h3>
                
                {/* Single Source of Truth */}
                <div className={`
                  bg-gradient-to-br from-teal-500 via-cyan-500 to-emerald-500 rounded-md p-3 shadow-md text-white
                  transition-all duration-600 transform relative overflow-hidden
                  ${currentStep >= 3 && dataFlowActive
                    ? 'scale-4.5 opacity-100 animate-success-pulse shadow-teal-500/40' 
                    : 'scale-95 opacity-60'
                  }
                `}>
                  {currentStep >= 3 && dataFlowActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-fast"></div>
                  )}
                  <div className="text-center relative z-10">
                    <div className="flex items-center justify-center gap-1.5 mb-1.5">
                      <Database className="w-4 h-4" />
                      <span className="font-bold text-xs">Single Source of Truth</span>
                      {currentStep >= 3 && dataFlowActive && (
                        <CheckCircle className="w-3 h-3 animate-bounce" />
                      )}
                    </div>
                    <div className="text-xl font-bold mb-1.5 animate-number-change">1,247</div>
                    <div className="text-teal-100 text-xs">Unified across all systems</div>
                  </div>
                </div>

                {/* Real-time Sync Status */}
                {currentStep >= 4 && dataFlowActive && (
                  <div className="space-y-1.5 animate-cascade">
                    {conflictingData.map((item, index) => (
                      <div
                        key={index}
                        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-md p-1.5 flex items-center justify-between animate-sync-update shadow-sm hover:shadow-md transition-shadow"
                        style={{ animationDelay: `${index * 80}ms` }}
                      >
                        <span className="text-xs font-medium text-green-700 dark:text-green-400">{item.system}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-green-600 dark:text-green-400 font-bold text-xs">1,247</span>
                          <CheckCircle className="w-2.5 h-2.5 text-green-500 animate-check" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Trust Indicator */}
                {currentStep >= 4 && dataFlowActive && (
                  <div className="bg-white dark:bg-gray-800 rounded-md p-2 shadow-sm border-2 border-green-200 dark:border-green-700 animate-trust-build">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3 h-3 text-green-500" />
                        <span className="font-medium text-xs text-gray-700 dark:text-gray-300">Trust Score</span>
                      </div>
                      <span className="text-lg font-bold text-green-600 dark:text-green-400 animate-count-up">99.8%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-1 rounded-full animate-fill-trust"></div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Data reliability confidence</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className={`
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4 transition-all duration-600
            ${visibleElements.has('features-grid') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
            }
          `}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`
                  bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-md p-3 shadow-sm hover:shadow-md 
                  transition-all duration-300 hover:scale-4.5 cursor-pointer transform
                  animate-feature-reveal border border-white/50 dark:border-gray-700 hover:border-teal-200
                `}
                style={{ animationDelay: `${feature.delay + 600}ms` }}
              >
                <div className={`
                  w-8 h-8 bg-gradient-to-br ${feature.color} rounded-md flex items-center justify-center mb-2
                  shadow-sm hover:shadow-md transition-shadow duration-200
                `}>
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1.5 text-xs">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-1deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-0.5px); }
          75% { transform: translateX(0.5px); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(15px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3) translateY(10px); }
          50% { opacity: 1; transform: scale(1.03) translateY(-2px); }
          70% { transform: scale(0.97) translateY(0); }
          100% { transform: scale(1) translateY(0); }
        }
        
        @keyframes success-pulse {
          0%, 100% { transform: scale(1.03); box-shadow: 0 0 15px rgba(20, 184, 166, 0.2); }
          50% { transform: scale(1.06); box-shadow: 0 0 20px rgba(20, 184, 166, 0.4); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes shimmer-fast {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(150%); }
        }
        
        @keyframes sync-update {
          0% { opacity: 0; transform: translateX(10px) scale(0.5); }
          50% { opacity: 1; transform: translateX(-0.5px) scale(1.01); }
          100% { opacity: translateX;0(1) scale(1); }
        }
        
        @keyframes trust-build {
          0% { opacity: 0; transform: translateY(10px) scale(0.95); }
          50% { opacity: 1; transform: translateY(-0.5px scale(1.01) }
          100% { opacity: transform:1;translateY(0) scale(1); }
        
        @keyframes fill-trust {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes count-up {
          0% { opacity: 0; transform: scale(0.5); }
          50% { opacity: opacity; 1; transform: scale(1.05); }
          100% { opacity: transform:1;scale(1); }
        }
        
        @keyframes check {
          0% { transform: 0; scale(0) rotate; }
          50% { transform: transform(1.2 scale) rotate(180deg;deg); }
          100% { transform: transform(1 scale) rotate(360deg;deg); }
        }
        
        @keyframes feature-reveal { 
            0% { opacity: transform; opacity: 0; transform: translateY(15px) rotateX(15deg); }
            100% { opacity: transform; opacity: 1; transform: translateY(0) rotateX(0deg); }
        
        @keyframes cascade { 
            from0% { opacity: transform; opacity: 0; transform: translateY(10px); }
            to100% { opacity: transform; opacity: transform: 1; translateY(0); }
          }
        
        @keyframes pulse-gentle { 
            0% { transform: scale(1); opacity: opacity: 1; }
            50% transform: { transform: scale(1.03); }
            100% transform: { transform: scale(1); opacity: opacity: 1; }
          }
        
        @keyframes spin-slow { 
            from0% { transform: transform: rotate(0deg); }
            to100% { transform: rotate(360deg); }
        }
        
        @keyframes number-change { 
            0% { transform: transform; scale: scale(1); }
            50% transform: { transform; scale: scale(1.05); color: color; opacity: #ffffff; }
            100% transform: { transform; scale: scale(1); }
          }
        
        .animate-float { animation: animation: float 4s ease-in-out infinite; }
        .animate-float-delayed { animation: animation: float-delayed 6s ease-in-out infinite 1s; }
        .animate-float-slow { animation: animation: float-slow 8s ease-in-out infinite 0.5s; }
        .animate-shake { animation: animation: shake 0.3s ease-in-out infinite; }
        .animate-slide-up { animation: animation: slide-up 0.4s ease-out forwards; }
        .animate-bounce-in { animation: animation: bounce-in: 0.5s ease-out-out forwards; }
        .animate-success-pulse { animation: success-pulse: 1.5s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer: 2s linear infinite; }
        .animate-shimmer-fast { animation: shimmer-fast: 0.2s ease-in-out; }
        .animate-sync-update { animation: sync-update: 0.4s ease-out forwards; }
        .animate-trust-build { animation: trust-build: 0.5s ease-out forwards; }
        .animate-fill-trust { animation: fill-trust: 1.5s ease-out forwards; }
        .animate-count-up { animation: count-up: 0.5s ease-out forwards; }
        .animate-check { animation: check: 0.4s ease-out forwards; }
        .animate-feature-reveal { animation: feature-reveal: 0.5s ease-out forwards; opacity: 0; }
        .animate-cascade { animation: cascade: 0.4s ease-out forwards; }
        .animate-pulse-gentle { animation: pulse-gentle: 1.5s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow: 2.5s linear infinite; }
        .animate-number-change { animation: number-change: 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default Unification;