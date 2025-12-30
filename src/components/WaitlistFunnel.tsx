import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Sparkles, Zap, Users, TrendingUp, Shield, Brain, Target, BarChart3 } from 'lucide-react';
import { supabase } from '../supabase';
import SEO from './SEO';
import { getPageSEO } from '../utils/seo';

const WaitlistFunnel: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    industry: '',
    companySize: '',
    useCase: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('early_access_requests')
        .insert([{
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          company: formData.company,
          industry: formData.industry,
          company_size: formData.companySize,
          use_case: formData.useCase,
          source: 'waitlist-funnel'
        }]);

      if (error) throw error;
      
      setSubmitStatus('success');
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        company: '',
        industry: '',
        companySize: '',
        useCase: ''
      });

      // Redirect to main site after successful submission
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error: any) {
      console.error('Error submitting waitlist form:', error);
      
      // Handle duplicate email error
      if (error.code === '23505' || error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
        // For duplicate emails, show success instead of error to prevent email enumeration
        setSubmitStatus('success');
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          company: '',
          industry: '',
          companySize: '',
          useCase: ''
        });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setErrorMessage(error.message || 'An unexpected error occurred. Please try again.');
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const solutions = [
    {
      icon: <Brain className="h-6 w-6 text-red-500" />,
      title: "AI Forecast Engine",
      description: "Learns from historical sales, seasonal trends, and external triggers to prevent stockouts and oversells"
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
      title: "Omnichannel Inventory Manager",
      description: "Unified dashboard syncing Shopify, marketplaces, ERPs, and 3PLs in real-time"
    },
    {
      icon: <Target className="h-6 w-6 text-green-500" />,
      title: "RTO Prediction Model",
      description: "Scores orders on COD risk and size-fit likelihood before dispatch to reduce returns"
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-500" />,
      title: "Smart Automation",
      description: "Automated workflows and decision support to eliminate manual operations overhead"
    }
  ];

  if (submitStatus === 'success') {
    return (
      <>
        <SEO {...getPageSEO('waitlist')} />
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to OLYNK!</h2>
          <p className="text-gray-600 mb-6">
            You're now on the waitlist. We'll notify you when early access is available.
          </p>
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-700">
              🎉 You're one of the first to experience the future of inventory management!
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Explore Our Platform
          </button>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <SEO {...getPageSEO('waitlist')} />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#CD5C5C_1px,transparent_1px),linear-gradient(to_bottom,#CD5C5C_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0D3B66_1px,transparent_1px),linear-gradient(to_bottom,#0D3B66_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
      
      {/* Gradient Overlays */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-red-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
      
             <div className="relative z-10 min-h-screen flex items-center justify-center p-4 pt-24">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Stop Losing Money on
              <span className="text-red-600 block">D2C Operations Chaos</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              D2C brands are losing 15-40% to RTOs, drowning in manual processes, and struggling with 
              fragmented data across 5-7 tools. OLYNK's AI platform eliminates these losses through 
              smart forecasting, automated workflows, and unified operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Solutions Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                How OLYNK Solves Your Problems
              </h2>
              <div className="space-y-4">
                {solutions.map((solution, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {solution.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{solution.title}</h3>
                      <p className="text-gray-600 text-sm">{solution.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6 mt-8">
                <h3 className="font-semibold text-blue-900 mb-2">🎯 Perfect for D2C Brands</h3>
                <p className="text-blue-700 text-sm">
                  Designed for ₹2–20 Cr brands managing 500+ SKUs across Shopify, Amazon, 
                  Zepto, and retail. Modular AI with explainable recommendations.
                </p>
              </div>
            </div>

            {/* Signup Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Join the Waitlist
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black placeholder-gray-500 bg-white"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black placeholder-gray-500 bg-white"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black placeholder-gray-500 bg-white"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black placeholder-gray-500 bg-white"
                    placeholder="Enter company name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black bg-white"
                    >
                      <option value="">Select Industry</option>
                      <option value="fashion">Fashion & Apparel</option>
                      <option value="beauty">Beauty & Personal Care</option>
                      <option value="food">Food & Beverage</option>
                      <option value="health">Health & Wellness</option>
                      <option value="electronics">Electronics</option>
                      <option value="home">Home & Lifestyle</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Size
                    </label>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black bg-white"
                    >
                      <option value="">Select Size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Challenge
                  </label>
                  <textarea
                    name="useCase"
                    value={formData.useCase}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Tell us about your inventory management challenges (stockouts, RTOs, manual processes, etc.)..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black placeholder-gray-500 bg-white"
                  />
                </div>

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {errorMessage || 'There was an error submitting your request. Please try again.'}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Joining Waitlist...
                    </>
                  ) : (
                    <>
                      Join Early Access
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default WaitlistFunnel; 