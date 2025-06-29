import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Shield, 
  BarChart3, 
  Cpu,
  Activity,
  Network,
  Brain,
  Settings,
  WifiOff,
  Database,
  Server,
  Globe,
  Smartphone,
  Cloud,
  Workflow,
  Gauge,
  Heart
} from 'lucide-react';

const SmartIntegration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [integrationActive, setIntegrationActive] = useState(false);
  const [systemsConnected, setSystemsConnected] = useState(false);
  const [healthCheckActive, setHealthCheckActive] = useState(false);

  // Sequential element visibility
  useEffect(() => {
    const elements = [
      'header',
      'title',
      'description',
      'step-indicators',
      'main-container',
      'fragmented-systems',
      'ai-orchestrator',
      'connected-systems',
      'features-grid',
      'health-monitor'
    ];

    elements.forEach((element, index) => {
      setTimeout(() => {
        setVisibleElements(prev => new Set([...prev, element]));
      }, index * 300);
    });

    setTimeout(() => {
      setIntegrationActive(true);
    }, 2000);
  }, []);

  // Auto-advance animation steps with restart
  useEffect(() => {
    if (!integrationActive) return;

    const stepTimings = [0, 1500, 3000, 4500, 6000, 7500];
    
    const timers = stepTimings.map((timing, index) => 
      setTimeout(() => {
        setCurrentStep(index);
        if (index === 2) setSystemsConnected(true);
        if (index === 4) setHealthCheckActive(true);
        if (index === 5) {
          setTimeout(() => {
            setCurrentStep(0);
            setSystemsConnected(false);
            setHealthCheckActive(false);
            setIntegrationActive(false);
            setTimeout(() => setIntegrationActive(true), 500);
          }, 1000);
        }
      }, timing)
    );

    return () => timers.forEach(clearTimeout);
  }, [integrationActive]);

  const fragmentedSystems = [
    { name: 'CRM', icon: Database, position: { x: 20, y: 30 }, color: 'from-teal-500 to-cyan-500', status: 'disconnected' },
    { name: 'ERP', icon: Server, position: { x: 80, y: 20 }, color: 'from-teal-600 to-cyan-600', status: 'disconnected' },
    { name: 'E-commerce', icon: Globe, position: { x: 70, y: 70 }, color: 'from-teal-400 to-cyan-400', status: 'disconnected' },
    { name: 'Analytics', icon: BarChart3, position: { x: 15, y: 80 }, color: 'from-teal-700 to-cyan-700', status: 'disconnected' }
  ];

  const integrationSteps = [
    { title: 'Fragmented Systems', description: 'Isolated apps', icon: WifiOff, color: 'text-red-500' },
    { title: 'AI Discovery', description: 'System mapping', icon: Brain, color: 'text-teal-500' },
    { title: 'Smart Connection', description: 'Data flow setup', icon: Network, color: 'text-green-500' },
    { title: 'API Management', description: 'Auto-sync', icon: Settings, color: 'text-teal-600' },
    { title: 'Error Prevention', description: 'Issue detection', icon: Shield, color: 'text-orange-500' },
    { title: 'Health Monitoring', description: 'Performance tracking', icon: Heart, color: 'text-teal-400' }
  ];

  const features = [
    { icon: Brain, title: 'Neural Integration', description: 'AI-powered system mapping', color: 'from-teal-500 to-cyan-500', delay: 0 },
    { icon: Settings, title: 'Auto API', description: 'Seamless data sync', color: 'from-teal-600 to-cyan-600', delay: 100 },
    { icon: Shield, title: 'Error Handling', description: 'Proactive issue fixes', color: 'from-green-500 to-teal-500', delay: 200 },
    { icon: Workflow, title: 'Automation', description: 'Smart workflows', color: 'from-teal-700 to-cyan-700', delay: 300 }
  ];

  const healthMetrics = [
    { name: 'API Response', value: '< 50ms', status: 'excellent', icon: Gauge },
    { name: 'Sync Rate', value: '99.9%', status: 'excellent', icon: RefreshCw },
    { name: 'Error Rate', value: '0.01%', status: 'excellent', icon: CheckCircle },
    { name: 'Uptime', value: '99.99%', status: 'excellent', icon: Activity }
  ];

  return (
    <div className="min-h-fit bg-gradient-to-br from-gray-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-teal-900 dark:to-cyan-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 w-48 h-48 bg-teal-200/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-20 right-10 w-40 h-40 bg-cyan-200/20 rounded-full blur-2xl animate-float-delayed"></div>
      </div>

      {/* Header */}
      <div className="container mx-auto px-3 py-4 relative z-10">
        <div className="text-center mb-6">
          {/* Title */}
          <h1 className={`
            text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 transition-all duration-800 transform
            ${visibleElements.has('title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Smart Integration
            </span>
          </h1>
          
          {/* Description */}
          <p className={`
            text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto transition-all duration-800 transform
            ${visibleElements.has('description') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            Unify fragmented systems with AI-powered connections
          </p>
        </div>

        {/* Step Indicators */}
        <div className={`
          flex justify-center mb-4 transition-all duration-600 transform
          ${visibleElements.has('step-indicators') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <div className="flex items-center gap-1 overflow-x-auto">
            {integrationSteps.map((step, index) => (
              <div key={index} className="flex items-center flex-shrink-0">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-all duration-400
                  ${index <= currentStep 
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white scale-105 shadow-md' 
                    : 'bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500'}
                `}
                style={{ transitionDelay: `${index * 50}ms` }}>
                  <step.icon className="w-4 h-4" />
                </div>
                {index < integrationSteps.length - 1 && (
                  <div className={`
                    w-6 h-1 mx-0.5 rounded-full transition-all duration-400
                    ${index < currentStep ? 'bg-gradient-to-r from-teal-600 to-cyan-600' : 'bg-gray-200 dark:bg-gray-700'}
                  `}
                  style={{ transitionDelay: `${index * 60}ms` }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Visualization */}
        <div className={`
          bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg p-4 transition-all duration-800 transform
          ${visibleElements.has('main-container') ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}
        `}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
            {/* Left: Fragmented Systems */}
            <div className={`
              relative h-64 transition-all duration-600 transform
              ${visibleElements.has('fragmented-systems') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}
            `}>
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 text-center mb-2 flex items-center justify-center gap-1">
                <WifiOff className="w-3 h-3 text-red-500" />
                Fragmented
              </h3>
              <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
                {fragmentedSystems.map((system, index) => (
                  <div key={index}>
                    <div
                      className={`
                        absolute w-10 h-10 bg-gradient-to-br ${system.color} rounded-lg flex items-center justify-center text-white transition-all duration-600
                        ${currentStep === 0 && integrationActive ? 'animate-shake opacity-80' : systemsConnected ? 'scale-90 opacity-60' : 'hover:scale-105'}
                      `}
                      style={{ left: `${system.position.x}%`, top: `${system.position.y}%`, animationDelay: `${index * 100}ms` }}
                    >
                      <system.icon className="w-5 h-5" />
                      {currentStep === 0 && integrationActive && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                          <AlertTriangle className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </div>
                    {currentStep === 0 && integrationActive && index < fragmentedSystems.length - 1 && (
                      <svg className="absolute inset-0 pointer-events-none">
                        <line
                          x1={`${system.position.x + 5}%`}
                          y1={`${system.position.y + 5}%`}
                          x2={`${fragmentedSystems[(index + 1) % fragmentedSystems.length].position.x + 5}%`}
                          y2={`${fragmentedSystems[(index + 1) % fragmentedSystems.length].position.y + 5}%`}
                          stroke="#ef4444"
                          strokeWidth="1"
                          strokeDasharray="4,4"
                          className="animate-dash"
                        />
                      </svg>
                    )}
                  </div>
                ))}
                {currentStep === 0 && integrationActive && (
                  <div className="absolute bottom-2 left-2 right-2 bg-red-50 dark:bg-red-900/30 rounded-md p-1">
                    <div className="flex items-center gap-1 text-red-700 dark:text-red-300 text-xs">
                      <AlertTriangle className="w-2 h-2" />
                      <span>Disconnected</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Center: AI Orchestrator */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                {currentStep >= 1 && integrationActive && (
                  <>
                    <div className="absolute inset-0 animate-spin-slow">
                      <div className="w-16 h-16 border-2 border-teal-200 border-t-teal-500 rounded-full"></div>
                    </div>
                    <div className="absolute inset-2 animate-pulse">
                      <div className="w-12 h-12 bg-teal-500/20 rounded-full"></div>
                    </div>
                  </>
                )}
                <div className={`
                  w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-600
                  ${currentStep >= 1 && integrationActive ? 'scale-105 animate-neural-pulse' : 'scale-100'}
                `}>
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>
              {currentStep >= 1 && integrationActive && (
                <div className="bg-white dark:bg-gray-800 rounded-md p-2 shadow-sm border border-teal-100 dark:border-teal-900 text-center animate-slide-up min-w-40">
                  <h4 className="text-xs font-bold text-gray-800 dark:text-gray-100 mb-1 flex items-center justify-center gap-1">
                    <Brain className="w-2 h-2 text-teal-500" />
                    AI Orchestrator
                  </h4>
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                    <Activity className="w-2 h-2 text-teal-500 animate-pulse" />
                    <span>
                      {currentStep === 1 && 'Mapping...'}
                      {currentStep === 2 && 'Connecting...'}
                      {currentStep === 3 && 'Syncing...'}
                      {currentStep === 4 && 'Monitoring...'}
                      {currentStep >= 5 && 'Complete!'}
                    </span>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-teal-600 to-cyan-600 h-1 rounded-full transition-all duration-1000 animate-shimmer"
                      style={{ width: currentStep >= 5 ? '100%' : currentStep >= 4 ? '85%' : currentStep >= 3 ? '65%' : currentStep >= 2 ? '45%' : '25%' }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Connected Systems */}
            <div className={`
              relative h-64 transition-all duration-600 transform
              ${visibleElements.has('connected-systems') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}
            `}>
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 text-center mb-2 flex items-center justify-center gap-1">
                <Network className="w-3 h-3 text-green-500" />
                Connected
              </h3>
              <div className="relative w-full h-48 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800 rounded-lg border border-green-200 dark:border-green-700">
                {fragmentedSystems.map((system, index) => (
                  <div key={index}>
                    <div
                      className={`
                        absolute w-10 h-10 bg-gradient-to-br ${system.color} rounded-lg flex items-center justify-center text-white transition-all duration-600
                        ${systemsConnected ? 'scale-100 animate-connected-pulse' : 'scale-90 opacity-60'}
                      `}
                      style={{ left: `${system.position.x}%`, top: `${system.position.y}%`, animationDelay: `${index * 150}ms` }}
                    >
                      <system.icon className="w-5 h-5" />
                      {systemsConnected && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center animate-success-bounce">
                          <CheckCircle className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </div>
                    {systemsConnected && (
                      <svg className="absolute inset-0 pointer-events-none">
                        {fragmentedSystems.map((targetSystem, targetIndex) => {
                          if (targetIndex <= index) return null;
                          return (
                            <g key={targetIndex}>
                              <line
                                x1={`${system.position.x + 5}%`}
                                y1={`${system.position.y + 5}%`}
                                x2={`${targetSystem.position.x + 5}%`}
                                y2={`${targetSystem.position.y + 5}%`}
                                stroke="url(#connectionGradient)"
                                strokeWidth="1.5"
                                className="animate-data-flow"
                                style={{ animationDelay: `${(index + targetIndex) * 50}ms` }}
                              />
                              <circle
                                r="1.5"
                                fill="#10b981"
                                className="animate-particle-flow"
                                style={{ animationDelay: `${(index + targetIndex) * 75}ms` }}
                              >
                                <animateMotion
                                  dur="2s"
                                  repeatCount="indefinite"
                                  path={`M ${system.position.x + 5},${system.position.y + 5} L ${targetSystem.position.x + 5},${targetSystem.position.y + 5}`}
                                />
                              </circle>
                            </g>
                          );
                        })}
                        <defs>
                          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="50%" stopColor="#06d6a0" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                  </div>
                ))}
                {systemsConnected && (
                  <div className="absolute bottom-2 left-2 right-2 bg-green-50 dark:bg-green-900/30 rounded-md p-1">
                    <div className="flex items-center gap-1 text-green-700 dark:text-green-300 text-xs">
                      <CheckCircle className="w-2 h-2" />
                      <span>Connected</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className={`
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 transition-all duration-600
          ${visibleElements.has('features-grid') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 rounded-md p-2 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-white/50 dark:border-gray-700"
              style={{ animationDelay: `${feature.delay + 600}ms` }}
            >
              <div className={`w-6 h-6 bg-gradient-to-br ${feature.color} rounded flex items-center justify-center mb-1`}>
                <feature.icon className="w-3 h-3 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 dark:text-gray-100 text-xs mb-1">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Health Monitor */}
        <div className={`
          bg-white/80 dark:bg-gray-800/80 rounded-xl p-3 shadow-lg mt-4 transition-all duration-800 transform
          ${visibleElements.has('health-monitor') ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}
        `}>
          <div className="text-center mb-2">
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-1">
              <Heart className="w-3 h-3 text-red-500 animate-heartbeat" />
              Health Monitor
            </h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {healthMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-700 rounded-md p-2 transition-all duration-600 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-1">
                  <metric.icon className={`w-4 h-4 ${healthCheckActive ? 'text-green-500 animate-pulse' : 'text-gray-400 dark:text-gray-500'}`} />
                  <div className={`w-2 h-2 rounded-full ${healthCheckActive ? 'bg-green-500 animate-ping' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                </div>
                <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-100">{metric.name}</h4>
                <div className={`text-sm font-bold ${healthCheckActive ? 'text-green-600 animate-count-up' : 'text-gray-400 dark:text-gray-500'}`}>
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes float-delayed { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-2px); } 75% { transform: translateX(2px); } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes neural-pulse { 0%, 100% { transform: scale(1.05); box-shadow: 0 0 15px rgba(45, 212, 191, 0.3); } 50% { transform: scale(1.1); box-shadow: 0 0 20px rgba(45, 212, 191, 0.5); } }
        @keyframes connected-pulse { 0%, 100% { transform: scale(1); box-shadow: 0 0 10px rgba(34, 197, 94, 0.2); } 50% { transform: scale(1.03); box-shadow: 0 0 15px rgba(34, 197, 94, 0.4); } }
        @keyframes success-bounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        @keyframes data-flow { 0% { stroke-dasharray: 0, 100; } 100% { stroke-dasharray: 100, 0; } }
        @keyframes particle-flow { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes dash { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 10; } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes count-up { 0% { opacity: 0; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes heartbeat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite 1s; }
        .animate-shake { animation: shake 0.4s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
        .animate-neural-pulse { animation: neural-pulse 2s ease-in-out infinite; }
        .animate-connected-pulse { animation: connected-pulse 1.5s ease-in-out infinite; }
        .animate-success-bounce { animation: success-bounce 0.5s ease-out infinite; }
        .animate-data-flow { animation: data-flow 1.5s ease-in-out infinite; }
        .animate-particle-flow { animation: particle-flow 2s ease-in-out infinite; }
        .animate-dash { animation: dash 0.8s linear infinite; }
        .animate-shimmer { animation: shimmer 1.5s infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-count-up { animation: count-up 0.5s ease-out forwards; }
        .animate-heartbeat { animation: heartbeat 1s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default SmartIntegration;