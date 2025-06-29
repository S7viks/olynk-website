import React, { useEffect, useState, useRef } from 'react';
import { 
  Users, Target, Award, Globe, Heart, Lightbulb, 
  TrendingUp, Brain, Zap, Shield, Rocket, Star,
  CheckCircle, ArrowRight, Sparkles, Database,
  BarChart3, Cpu, Network, Eye, Lock
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMission, setCurrentMission] = useState(0);
  const [currentGoal, setCurrentGoal] = useState(0);
  const aboutRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(true);
    const missionInterval = setInterval(() => {
      setCurrentMission((prev) => (prev + 1) % 3);
    }, 5000);
    
    const goalInterval = setInterval(() => {
      setCurrentGoal((prev) => (prev + 1) % 6);
    }, 2500);
    
    return () => {
      clearInterval(missionInterval);
      clearInterval(goalInterval);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === '/about' && aboutRef.current) {
      const headerOffset = 64; // Adjust for header height
      const elementPosition = aboutRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth',
      });
    }
  }, [location.pathname, location.search]);

  const missionPoints = [
    "Turn scattered data into smart decisions",
    "Make AI work for your business, not against it", 
    "Scale without complexity or big teams"
  ];

  const goals = [
    { icon: Database, title: "Unify Your Data", desc: "One platform for all your business data" },
    { icon: Brain, title: "AI That Actually Works", desc: "Smart insights without the complexity" },
    { icon: Zap, title: "Automate Everything", desc: "Let AI handle the boring stuff" },
    { icon: BarChart3, title: "Decisions Made Easy", desc: "Clear insights for everyone" },
    { icon: Network, title: "Connect & Grow", desc: "Learn from similar businesses" },
    { icon: Shield, title: "Trust & Security", desc: "Your data stays yours, always" }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Your Success First',
      description: 'Every feature we build puts your business growth at the center.',
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'from-teal-500/20 to-cyan-500/20'
    },
    {
      icon: Zap,
      title: 'Simple Wins',
      description: 'Complex data made simple. Powerful insights delivered effortlessly.',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-500/20 to-teal-500/20'
    },
    {
      icon: Brain,
      title: 'AI That Learns',
      description: 'Smart technology that adapts to your business and grows with you.',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-500/20 to-blue-500/20'
    },
    {
      icon: Shield,
      title: 'Built on Trust',
      description: 'Your data is protected, private, and always under your control.',
      color: 'from-teal-600 to-green-500',
      bgColor: 'from-teal-600/20 to-green-500/20'
    }
  ];

  const benefits = [
    "Know exactly what drives your profits",
    "Predict customer behavior before they decide",
    "Automate workflows that waste your time",
    "Make every decision backed by real data",
    "Scale smart without hiring data scientists"
  ];

  return (
    <div ref={aboutRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Floating Elements Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float-slow bg-gradient-to-r ${
              i % 5 === 0 ? 'from-teal-400/10 dark:from-teal-800/10 to-cyan-400/10 dark:to-gray-800/10' :
              i % 5 === 1 ? 'from-emerald-400/10 dark:from-gray-800/10 to-teal-400/10 dark:to-gray-800/10' :
              i % 5 === 2 ? 'from-cyan-400/10 dark:from-gray-800/10 to-blue-400/10 dark:to-gray-800/10' :
              i % 5 === 3 ? 'from-teal-500/10 dark:from-teal-800/10 to-green-400/10 dark:to-gray-800/10' :
              'from-blue-400/10 dark:from-gray-800/10 to-teal-400/10 dark:to-gray-800/10'
            } rounded-full blur-xl`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 30}px`,
              height: `${Math.random() * 200 + 30}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 15 + 15}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center bg-gradient-to-r from-teal-500/20 dark:from-gray-700/20 to-cyan-500/20 dark:to-gray-700/20 backdrop-blur-sm border border-teal-400/30 dark:border-teal-600/30 rounded-full px-6 py-3 mb-8 animate-bounce-unique">
                <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-2 animate-spin-slow" />
                <span className="text-teal-700 dark:text-teal-300 font-medium">Building the Future of Business Intelligence</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-8 animate-gradient-text">
                <span className="bg-gradient-to-r from-slate-800 dark:from-gray-300 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  We Make Every
                </span>
                <br />
                <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent animate-bounce-gentle">
                  Business Smart
                </span>
              </h1>
              
              <div className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-12 h-16 flex items-center">
                <span
                  key={currentMission}
                  className="inline-block animate-typewriter overflow-hidden whitespace-nowrap border-r-4 border-teal-500 dark:border-teal-400"
                  style={{
                    animation: `typewriter 2s steps(40, end) forwards, blink-caret 0.75s step-end infinite`,
                    width: `${missionPoints[currentMission].length}ch`
                  }}
                >
                  {missionPoints[currentMission]}
                </span>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div
                className="relative"
                style={{
                  animation: 'small-bounce 1s ease-in-out',
                  animationIterationCount: 1
                }}
              >
                <img
                  src="https://www.neilsahota.com/wp-content/uploads/2022/09/What-is-AI-how-does-it-work.jpg"
                  alt="AI Technology Illustration"
                  className="w-full h-auto rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 dark:from-gray-700/10 to-cyan-500/10 dark:to-gray-700/10 rounded-3xl animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-white/80 dark:from-gray-800/80 to-teal-50/80 dark:to-gray-700/80 backdrop-blur-lg rounded-3xl p-12 border border-teal-200/50 dark:border-teal-700/50 hover:border-teal-300/50 dark:hover:border-teal-600/50 transition-all duration-500 animate-bounce-unique shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-slate-800 dark:text-gray-100 mb-6 animate-fade-in">
                <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Our Mission
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto">
                To democratize intelligent technology and help small and medium businesses thrive in a data-driven world. 
                We're closing the gap between enterprise-grade intelligence and everyday business needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-red-50 dark:from-gray-800 to-pink-50 dark:to-gray-700 backdrop-blur-sm rounded-2xl p-6 border border-red-200/50 dark:border-red-700/50 hover:border-red-300/50 dark:hover:border-red-600/50 transition-all duration-300 animate-bounce-gentle">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-gray-200 mb-4 flex items-center">
                    <Eye className="w-6 h-6 text-red-500 dark:text-red-400 mr-3" />
                    The Challenge
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Most businesses make decisions in the dark - scattered data, gut feelings, outdated reports. 
                    This puts them at a massive disadvantage against data-driven competitors.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-teal-50 dark:from-gray-800 to-cyan-50 dark:to-gray-700 backdrop-blur-sm rounded-2xl p-6 border border-teal-200/50 dark:border-teal-700/50 hover:border-teal-300/50 dark:hover:border-teal-600/50 transition-all duration-300 animate-bounce-gentle">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-gray-200 mb-4 flex items-center">
                    <Rocket className="w-6 h-6 text-teal-500 dark:text-teal-400 mr-3" />
                    Our Solution
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    We bring enterprise-level intelligence to every business - no data scientists required. 
                    Just powerful insights that help you grow faster and smarter.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-8 animate-bounce-unique transition-transform duration-500 shadow-2xl">
                  <Target className="w-16 h-16 text-white mb-6 animate-bounce" />
                  <h3 className="text-2xl font-bold text-white mb-4">Your Success = Our Success</h3>
                  <p className="text-teal-50">
                    Every algorithm we train, every feature we build, every decision we make - 
                    it's all focused on making your business more successful and profitable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-800 dark:text-gray-100 mb-6">
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                What We're Building
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Six core goals that drive everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {goals.map((goal, index) => {
              const Icon = goal.icon;
              const isActive = currentGoal === index;
              return (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br from-white/90 dark:from-gray-800/90 to-teal-50/90 dark:to-gray-700/90 backdrop-blur-lg rounded-3xl p-8 border transition-all duration-500 animate-bounce-unique hover:scale-105 ${
                    isActive 
                      ? 'border-teal-400/70 dark:border-teal-600/70 shadow-2xl scale-105' 
                      : 'border-teal-200/50 dark:border-teal-700/50 hover:border-teal-300/50 dark:hover:border-teal-600/50'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-teal-500/5 dark:from-gray-700/5 to-cyan-500/5 dark:to-gray-700/5 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} rounded-3xl transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-500 group-hover:scale-110 transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-gray-200 mb-3 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors duration-300">
                      {goal.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {goal.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-800 dark:text-gray-100 mb-6">
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Our Core Values
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              The principles that guide us in empowering your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-teal-100/50 dark:border-teal-700/50 hover:border-teal-200/80 dark:hover:border-teal-600/80"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.bgColor} dark:from-gray-700/20 dark:to-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-500 group-hover:scale-110 transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-gray-200 mb-3 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-800 dark:text-gray-100 mb-6">
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Why Choose Us
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Real benefits that transform your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-teal-200/50 dark:border-teal-700/50 hover:border-teal-300/50 dark:hover:border-teal-600/50 transition-all duration-500 animate-bounce-unique hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-8 h-8 text-teal-500 dark:text-teal-400 flex-shrink-0" />
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {benefit}
                  </p>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-white/90 dark:from-gray-800/90 to-teal-50/90 dark:to-gray-700/90 backdrop-blur-lg rounded-3xl p-12 border border-teal-200/50 dark:border-teal-700/50 shadow-2xl">
              <h3 className="text-3xl font-bold text-slate-800 dark:text-gray-100 mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses that are already using AI to make smarter decisions and grow faster.
              </p>
              <Link
                to="/early-access-form"
                className="group relative inline-flex bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 hover:from-teal-700 hover:to-cyan-700 border-2 border-white/20"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get Started Today
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                No credit card required • Free 14-day trial • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Animation Styles */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        @keyframes bounce-unique {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-unique {
          animation: bounce-unique 2s ease-in-out infinite;
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink-caret {
          50% { border-color: transparent; }
        }
        @keyframes gradient-text {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-gradient-text {
          background-size: 200%;
          animation: gradient-text 5s linear infinite;
        }
        @keyframes small-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}