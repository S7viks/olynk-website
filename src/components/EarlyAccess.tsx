import React, { useState } from 'react';
import { Check, Star, Users, Shield, Zap, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const EarlyAccess = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  const benefits = [
    {
      icon: Star,
      text: 'Start for free, no credit card required'
    },
    {
      icon: Users,
      text: 'Full access to all core features during early access'
    },
    {
      icon: Shield,
      text: 'Priority support and feature requests'
    },
    {
      icon: Gift,
      text: 'Lock in 25% discount on official launch pricing'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-teal-900 to-cyan-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Header */}
          <div className="inline-flex items-center bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full px-6 py-2 mb-6 animate-bounce">
            <Zap className="h-4 w-4 text-teal-400 mr-2" />
            <span className="text-teal-300 font-semibold text-sm">Limited Early Access</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Join the Future of{' '}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Business Intelligence
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Be among the first to experience olynk.ai's AI-powered platform. Get early access to our revolutionary customer data network and gain a competitive edge in your industry.
          </p>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-white font-medium">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          {/* Signup Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Get Early Access</h3>
            <p className="text-gray-300 mb-6">
              Join our exclusive early access program and be the first to experience olynk.ai.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 rounded-lg font-bold hover:shadow-xl transition-all duration-300"
                  >
                    Join
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Welcome to the Future!</h4>
                <p className="text-gray-300">Check your email for next steps.</p>
              </div>
            )}

            <p className="text-sm text-gray-400 mt-4 text-center">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;