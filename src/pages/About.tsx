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
      color: 'from-[#CD5C5C] to-[#B85450]',
      bgColor: 'from-[#CD5C5C]/20 to-[#B85450]/20'
    },
    {
      icon: Zap,
      title: 'Simple Wins',
      description: 'Complex data made simple. Powerful insights delivered effortlessly.',
      color: 'from-[#D16B6B] to-[#CD5C5C]',
      bgColor: 'from-[#D16B6B]/20 to-[#CD5C5C]/20'
    },
    {
      icon: Brain,
      title: 'AI That Learns',
      description: 'Smart technology that adapts to your business and grows with you.',
      color: 'from-[#CD5C5C] to-[#C24C4C]',
      bgColor: 'from-[#CD5C5C]/20 to-[#C24C4C]/20'
    },
    {
      icon: Shield,
      title: 'Built on Trust',
      description: 'Your data is protected, private, and always under your control.',
      color: 'from-[#B85450] to-[#CD5C5C]',
      bgColor: 'from-[#B85450]/20 to-[#CD5C5C]/20'
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
    <div ref={aboutRef} className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#CD5C5C_1px,transparent_1px),linear-gradient(to_bottom,#CD5C5C_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0D3B66_1px,transparent_1px),linear-gradient(to_bottom,#0D3B66_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
      
      {/* Gradient Overlays */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#CD5C5C]/10 dark:bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-[#CD5C5C]/10 dark:bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
      
      {/* Floating Elements Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float-slow bg-gradient-to-r ${
              i % 5 === 0 ? 'from-[#CD5C5C]/10 dark:from-blue-800/10 to-[#D16B6B]/10 dark:to-blue-700/10' :
              i % 5 === 1 ? 'from-[#B85450]/10 dark:from-blue-800/10 to-[#CD5C5C]/10 dark:to-blue-700/10' :
              i % 5 === 2 ? 'from-[#C24C4C]/10 dark:from-blue-800/10 to-[#CD5C5C]/10 dark:to-blue-700/10' :
              i % 5 === 3 ? 'from-[#CD5C5C]/10 dark:from-blue-800/10 to-[#B85450]/10 dark:to-blue-700/10' :
              'from-[#D16B6B]/10 dark:from-blue-800/10 to-[#CD5C5C]/10 dark:to-blue-700/10'
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
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center bg-gradient-to-r from-[#CD5C5C]/20 dark:from-blue-700/20 to-[#D16B6B]/20 dark:to-blue-600/20 backdrop-blur-sm border border-[#CD5C5C]/30 dark:border-blue-600/30 rounded-full px-6 py-3 mb-8 animate-bounce-unique">
                <Sparkles className="w-5 h-5 text-[#CD5C5C] dark:text-[#CD5C5C] mr-2 animate-spin-slow" />
                <span className="text-[#B85450] dark:text-[#CD5C5C] font-medium">Building the Future of Business Intelligence</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-8 animate-gradient-text">
                <span className="bg-gradient-to-r from-slate-800 dark:from-gray-300 via-[#CD5C5C] to-[#B85450] bg-clip-text text-transparent">
                  We Make Every
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#CD5C5C] via-[#D16B6B] to-[#B85450] bg-clip-text text-transparent animate-bounce-gentle">
                  Business Smart
                </span>
              </h1>
              
              <div className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-12 h-16 flex items-center">
                <span
                  key={currentMission}
                  className="inline-block animate-typewriter overflow-hidden whitespace-nowrap border-r-4 border-[#CD5C5C] dark:border-[#CD5C5C]"
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
                <div className="absolute inset-0 bg-gradient-to-r from-[#CD5C5C]/10 dark:from-blue-700/10 to-[#D16B6B]/10 dark:to-blue-600/10 rounded-3xl animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-white/80 dark:from-gray-800/80 to-amber-50/80 dark:to-blue-700/80 backdrop-blur-lg rounded-3xl p-12 border border-[#CD5C5C]/50 dark:border-blue-700/50 hover:border-[#CD5C5C]/50 dark:hover:border-blue-600/50 transition-all duration-500 animate-bounce-unique shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-slate-800 dark:text-gray-100 mb-6 animate-fade-in">
                <span className="bg-gradient-to-r from-[#CD5C5C] to-[#B85450] bg-clip-text text-transparent">
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
                <div className="bg-gradient-to-r from-[#CD5C5C]/20 dark:from-blue-800 to-[#D16B6B]/20 dark:to-blue-700 backdrop-blur-sm rounded-2xl p-6 border border-[#CD5C5C]/50 dark:border-[#CD5C5C]/50 hover:border-[#CD5C5C]/50 dark:hover:border-[#CD5C5C]/50 transition-all duration-300 animate-bounce-gentle">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-gray-200 mb-4 flex items-center">
                    <Eye className="w-6 h-6 text-[#CD5C5C] dark:text-[#CD5C5C] mr-3" />
                    The Challenge
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Most businesses make decisions in the dark - scattered data, gut feelings, outdated reports. 
                    This puts them at a massive disadvantage against data-driven competitors.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-[#D16B6B]/20 dark:from-blue-800 to-[#CD5C5C]/20 dark:to-blue-700 backdrop-blur-sm rounded-2xl p-6 border border-[#CD5C5C]/50 dark:border-[#CD5C5C]/50 hover:border-[#CD5C5C]/50 dark:hover:border-[#CD5C5C]/50 transition-all duration-300 animate-bounce-gentle">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-gray-200 mb-4 flex items-center">
                    <Rocket className="w-6 h-6 text-[#CD5C5C] dark:text-[#CD5C5C] mr-3" />
                    Our Solution
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    We bring enterprise-level intelligence to every business - no data scientists required. 
                    Just powerful insights that help you grow faster and smarter.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-r from-[#CD5C5C] to-[#B85450] rounded-2xl p-8 animate-bounce-unique transition-transform duration-500 shadow-2xl">
                  <Target className="w-16 h-16 text-white mb-6 animate-bounce" />
                  <h3 className="text-2xl font-bold text-white mb-4">Your Success = Our Success</h3>
                  <p className="text-white/90">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-800 dark:text-gray-100 mb-6">
              <span className="bg-gradient-to-r from-[#CD5C5C] to-[#B85450] bg-clip-text text-transparent">
                What We're Building
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Six core goals that drive everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {goals.map((goal, index) => (
              <div
                key={index}
                className={`transform transition-all duration-1000 ${
                  index === currentGoal ? 'scale-105 bg-gradient-to-r from-[#CD5C5C]/20 dark:from-blue-700/20 to-[#D16B6B]/20 dark:to-blue-600/20 border-[#CD5C5C]/50 dark:border-blue-600/50' : 
                  'bg-gradient-to-r from-white/80 dark:from-gray-800/80 to-amber-50/80 dark:to-blue-700/80 border-[#CD5C5C]/30 dark:border-blue-700/30'
                } backdrop-blur-lg rounded-2xl p-8 border hover:border-[#CD5C5C]/50 dark:hover:border-blue-600/50 shadow-xl hover:shadow-2xl transition-all duration-500 animate-bounce-gentle`}
              >
                <div className={`${
                  index === currentGoal ? 'text-[#CD5C5C] dark:text-[#CD5C5C]' : 'text-[#B85450] dark:text-[#CD5C5C]'
                } mb-6 transition-colors duration-300`}>
                  <goal.icon className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-gray-200 mb-3">
                  {goal.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {goal.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-800 dark:text-gray-100 mb-6">
              <span className="bg-gradient-to-r from-[#CD5C5C] to-[#B85450] bg-clip-text text-transparent">
                What Drives Us
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Our core values shape every decision we make
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${value.bgColor} dark:from-blue-800/80 dark:to-blue-700/80 backdrop-blur-lg rounded-2xl p-8 border border-[#CD5C5C]/30 dark:border-blue-700/30 hover:border-[#CD5C5C]/50 dark:hover:border-blue-600/50 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl animate-bounce-gentle`}
              >
                <div className={`bg-gradient-to-r ${value.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-gray-200 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#CD5C5C] to-[#B85450] rounded-3xl p-12 shadow-2xl animate-bounce-unique">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-white mb-6">
                Why Choose Olynk?
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                We're not just another analytics tool - we're your business intelligence partner
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 animate-bounce-gentle">
                    <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                    <p className="text-white font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                  <Star className="w-20 h-20 text-yellow-300 mx-auto mb-6 animate-bounce" />
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Ready to Transform Your Business?
                  </h3>
                  <p className="text-white/90 mb-8">
                    Join thousands of businesses already making smarter decisions with Olynk
                  </p>
                  <a 
                    href="https://forms.office.com/r/zd11g2RWDR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-white text-[#CD5C5C] hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Get Early Access
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-800 dark:text-gray-100 mb-6">
              <span className="bg-gradient-to-r from-[#CD5C5C] to-[#B85450] bg-clip-text text-transparent">
                Built by Experts
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Our team combines deep technical expertise with real business experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: "AI/ML Engineers", desc: "Building intelligent systems that actually work" },
              { icon: BarChart3, title: "Data Scientists", desc: "Turning raw data into actionable insights" },
              { icon: Users, title: "Business Strategists", desc: "Understanding what makes businesses succeed" }
            ].map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-white/80 dark:from-gray-800/80 to-amber-50/80 dark:to-blue-700/80 backdrop-blur-lg rounded-2xl p-8 border border-[#CD5C5C]/30 dark:border-blue-700/30 hover:border-[#CD5C5C]/50 dark:hover:border-blue-600/50 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl animate-bounce-gentle text-center"
              >
                <div className="bg-gradient-to-r from-[#CD5C5C] to-[#B85450] w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <member.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-gray-200 mb-3">
                  {member.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {member.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-white/80 dark:from-gray-800/80 to-amber-50/80 dark:to-blue-700/80 backdrop-blur-lg rounded-3xl p-12 border border-[#CD5C5C]/50 dark:border-blue-700/50 shadow-2xl">
            <h2 className="text-5xl font-bold text-slate-800 dark:text-gray-100 mb-6">
              <span className="bg-gradient-to-r from-[#CD5C5C] to-[#B85450] bg-clip-text text-transparent">
                Ready to Join Us?
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Be part of the business intelligence revolution. Get early access to Olynk and transform how you make decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://forms.office.com/r/zd11g2RWDR"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#CD5C5C] to-[#B85450] hover:from-[#B85450] hover:to-[#A84844] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Get Early Access
              </a>
              <Link
                to="/demo"
                className="bg-white dark:bg-gray-800 border-2 border-[#CD5C5C] dark:border-[#CD5C5C] text-[#CD5C5C] dark:text-[#CD5C5C] hover:bg-[#CD5C5C]/10 dark:hover:bg-[#CD5C5C]/20 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                <Eye className="w-5 h-5 mr-2" />
                See Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}