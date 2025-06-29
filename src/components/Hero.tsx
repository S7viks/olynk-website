import React, { useEffect, useState } from 'react';
import { Play, Zap, ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import AIBrainAnimation from './AIBrainAnimation';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-[calc(100vh-64px)] pt-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary background gradient overlay, extended further down */}
        <div className="absolute inset-0 bg-gradient-to-b from-teal-400/10 via-cyan-300/10 to-white/0 dark:from-teal-700/20 dark:via-cyan-800/20 dark:to-gray-900/0" style={{height: '120%'}}></div>
        {/* Large floating orbs, balanced left/right, faded at bottom */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-teal-400/15 to-cyan-400/8 dark:from-teal-500/25 dark:to-cyan-500/15 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse z-0" style={{height: '24rem'}}></div>
        <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-gradient-to-br from-cyan-400/12 to-blue-400/8 dark:from-cyan-500/18 dark:to-blue-500/15 rounded-full mix-blend-multiply filter blur-3xl opacity-35 animate-pulse" style={{height: '24rem', animationDelay: '1.5s', zIndex: -1}}></div>
        {/* Medium orbs, more symmetrical */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-teal-300/8 to-emerald-300/8 dark:from-teal-400/12 dark:to-emerald-400/12 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-bounce" style={{ animationDuration: '6s', zIndex: -2 }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-300/8 to-cyan-300/8 dark:from-blue-400/12 dark:to-cyan-400/12 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s', zIndex: -2 }}></div>
        {/* Small accent orbs */}
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-teal-200/8 to-cyan-200/8 dark:from-teal-300/12 dark:to-cyan-300/12 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse" style={{ animationDuration: '4s', zIndex: -3 }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-br from-cyan-200/8 to-blue-200/8 dark:from-cyan-300/12 dark:to-blue-300/12 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s', zIndex: -3 }}></div>
        {/* Subtle grid pattern overlay, lower opacity */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.015)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.015)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Your Business Operations{' '}
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                Just Got an AI Brain
              </span>
            </h1>
            <div className="inline-flex items-center bg-gradient-to-r from-teal-100/80 to-cyan-100/80 dark:from-teal-900/40 dark:to-cyan-900/40 backdrop-blur-sm rounded-full px-6 py-3 mb-8 animate-bounce border border-teal-200/50 dark:border-teal-700/50 shadow-lg">
              <Zap className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-2" />
              <span className="text-teal-800 dark:text-teal-300 font-bold text-lg">AI-Powered Operations</span>
            </div>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-medium">
              OLYNK doesn't just connect your systems—it tells you what's about to go wrong and exactly how to fix it.
            </p>
            <p className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              Stop losing{' '}
              <span className="text-teal-600 dark:text-teal-400">₹2-5L monthly</span> to stockouts, delays, and operational chaos.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0">
              The only AI-powered operations advisor built specifically for ₹2-10Cr D2C brands in India. Get prescriptive insights with clear reasoning, not just pretty dashboards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link
                to="/early-access-form"
                className="group relative bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md"
                style={{ boxShadow: '0 4px 16px 0 rgba(0, 120, 120, 0.12)' }}
              >
                <span>See AI in Action - Book Demo</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </Link>
            </div>
            {/* Subtle divider */}
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="w-32 h-1 rounded-full bg-gradient-to-r from-teal-200 via-cyan-200 to-blue-200 opacity-40" />
            </div>
            <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>Top-Level Security</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                <Users className="h-4 w-4" />
                <span>Growing customer base</span>
              </div>
            </div>
          </div>
          {/* Right Column - AI Brain Animation */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              <AIBrainAnimation />
              {/* Add a subtle glow effect around the animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 dark:from-teal-500/30 dark:to-cyan-500/30 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced fade-out overlay at the bottom to mask background bleed */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-32 z-20">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-white/50 to-white dark:via-gray-900/50 dark:to-gray-900" />
      </div>
    </section>
  );
};

export default Hero;