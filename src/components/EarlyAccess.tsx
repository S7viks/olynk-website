import React, { useState } from 'react';
import { Check, Star, Users, Shield, Zap, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { earlyAccessService } from '../services/supabaseService';

interface EarlyAccessFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  industry: string;
  companySize: string;
}

const EarlyAccess = () => {
  const [formData, setFormData] = useState<EarlyAccessFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    industry: '',
    companySize: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await earlyAccessService.submitApplication({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        industry: formData.industry,
        company_size: formData.companySize
      });
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        industry: '',
        companySize: ''
      });
    } catch (error) {
      console.error('Error submitting early access request:', error);
      setError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
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
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Get Early Access</h3>
            <p className="text-gray-300 mb-6">
              Join our exclusive early access program and be the first to experience olynk.ai's revolutionary AI-powered platform.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company"
                      className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
                      Industry *
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                      required
                    >
                      <option value="" className="bg-gray-800">Select Industry</option>
                      <option value="D2C E-commerce" className="bg-gray-800">D2C E-commerce</option>
                      <option value="Retail" className="bg-gray-800">Retail</option>
                      <option value="Fashion & Apparel" className="bg-gray-800">Fashion & Apparel</option>
                      <option value="Food & Beverage" className="bg-gray-800">Food & Beverage</option>
                      <option value="Beauty & Cosmetics" className="bg-gray-800">Beauty & Cosmetics</option>
                      <option value="Electronics" className="bg-gray-800">Electronics</option>
                      <option value="Home & Lifestyle" className="bg-gray-800">Home & Lifestyle</option>
                      <option value="Other" className="bg-gray-800">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="companySize" className="block text-sm font-medium text-gray-300 mb-2">
                      Company Size *
                    </label>
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                      required
                    >
                      <option value="" className="bg-gray-800">Select Size</option>
                      <option value="1-10" className="bg-gray-800">1-10 employees</option>
                      <option value="11-50" className="bg-gray-800">11-50 employees</option>
                      <option value="51-200" className="bg-gray-800">51-200 employees</option>
                      <option value="201-500" className="bg-gray-800">201-500 employees</option>
                      <option value="500+" className="bg-gray-800">500+ employees</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Get Started</span>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Welcome to the Future!</h4>
                <p className="text-gray-300">Thank you for joining! We'll be in touch soon with next steps.</p>
              </div>
            )}

            <p className="text-sm text-gray-400 mt-6 text-center">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;