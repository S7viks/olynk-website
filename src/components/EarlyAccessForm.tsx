import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Mail, Phone, Building2, MapPin, Citrus as Industry, Users, IndianRupee, CheckCircle2, AlertCircle, Send, Sparkles } from 'lucide-react';
import { db } from '../firebase'; // Adjust path based on your Firebase setup
import { collection, addDoc } from 'firebase/firestore';
import { useTheme } from '../contexts/ThemeContext';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  companyName: string;
  companyLocation: string;
  industry: string;
  companySize: string;
  annualRevenue: string;
  interestedFeatures: string[];
  additionalInfo: string;
}

interface FormErrors {
  [key: string]: string;
}

const EarlyAccessForm: React.FC = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    companyName: '',
    companyLocation: '',
    industry: '',
    companySize: '',
    annualRevenue: '',
    interestedFeatures: [],
    additionalInfo: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef<HTMLDivElement>(null); // Ref for the form container

  // Scroll to top of form when navigating to this page
  useEffect(() => {
    if (location.pathname === '/early-access-form' && formRef.current) {
      const headerOffset = 60; // Adjust based on your header height
      const elementPosition = formRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth',
      });
    }
  }, [location.pathname]);

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'E-commerce',
    'Manufacturing',
    'Education',
    'Real Estate',
    'Consulting',
    'Marketing & Advertising',
    'Other'
  ];

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  const revenueRanges = [
    'Below 10 lakhs',
    '10 - 30 lakhs',
    '30 - 50 lakhs',
    '50 - 70 lakhs',
    '70 lakhs - 1 cr',
    '1 cr - 10 cr',
    '10 cr - 50 cr',
    '50 cr above'
  ];

  const features = [
    { id: 'ai-analytics', label: 'AI-Powered Analytics', description: 'Advanced machine learning insights' },
    { id: 'realtime-dashboards', label: 'Real-time Dashboards', description: 'Live data visualization' },
    { id: 'data-integration', label: 'Data Integration', description: 'Connect all your data sources' },
    { id: 'predictive-insights', label: 'Predictive Insights', description: 'Forecast future trends' },
    { id: 'team-collaboration', label: 'Team Collaboration', description: 'Share insights across teams' },
    { id: 'custom-reports', label: 'Custom Reports', description: 'Build tailored reports' },
    { id: 'mobile-access', label: 'Mobile Access', description: 'Access insights on the go' }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.companyLocation.trim()) newErrors.companyLocation = 'Company location is required';
    if (!formData.industry) newErrors.industry = 'Please select an industry';
    if (!formData.companySize) newErrors.companySize = 'Please select company size';
    if (!formData.annualRevenue) newErrors.annualRevenue = 'Please select revenue range';
    if (formData.interestedFeatures.length === 0) {
      newErrors.interestedFeatures = 'Please select at least one feature';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFeatureToggle = (featureId: string) => {
    setFormData(prev => ({
      ...prev,
      interestedFeatures: prev.interestedFeatures.includes(featureId)
        ? prev.interestedFeatures.filter(id => id !== featureId)
        : [...prev.interestedFeatures, featureId]
    }));
    if (errors.interestedFeatures) {
      setErrors(prev => ({ ...prev, interestedFeatures: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'earlyAccessSubmissions'), {
        ...formData,
        submissionDate: new Date().toISOString()
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form to Firestore:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to submit form. Please try again.'
      }));
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900' : 'bg-gradient-to-br from-teal-50 via-white to-emerald-50'} flex items-center justify-center p-4`}>
        <div className="max-w-md w-full text-center">
          <div className={`${isDark ? 'bg-gray-800 border-teal-700' : 'bg-white border-teal-100'} rounded-2xl shadow-xl p-8 border`}>
            <div className={`w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6`}>
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Welcome to Olynk!</h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Thank you for joining our early access program. We'll be in touch soon with next steps.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  fullName: '',
                  email: '',
                  phone: '',
                  role: '',
                  companyName: '',
                  companyLocation: '',
                  industry: '',
                  companySize: '',
                  annualRevenue: '',
                  interestedFeatures: [],
                  additionalInfo: ''
                });
              }}
              className={`${isDark ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'} font-medium transition-colors`}
            >
              Submit another form
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={formRef} className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900' : 'bg-gradient-to-br from-teal-50 via-white to-emerald-50'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className={`w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center`}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className={`ml-3 text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent`}>
                Olynk
              </span>
            </div>
            <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Join Early Access</h1>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Be among the first to experience Oridyn's revolutionary business insights platform.
            </p>
          </div>

          {/* Form */}
          <div className={`${isDark ? 'bg-gray-800 border-teal-700' : 'bg-white border-teal-100'} rounded-2xl shadow-xl border overflow-hidden`}>
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-6 flex items-center`}>
                  <User className={`w-5 h-5 ${isDark ? 'text-teal-400' : 'text-teal-600'} mr-2`} />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                        errors.fullName ? 'border-red-500 bg-red-50' : isDark ? 'border-gray-600 bg-gray-700 text-white hover:border-teal-400' : 'border-gray-300 hover:border-teal-300'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                          errors.email ? 'border-red-500 bg-red-50' : isDark ? 'border-gray-600 bg-gray-700 text-white hover:border-teal-400' : 'border-gray-300 hover:border-teal-300'
                        }`}
                        placeholder="john@example.com"
                      />
                      <Mail className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'} absolute left-3 top-1/2 transform -translate-y-1/2`} />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                          errors.phone ? 'border-red-500 bg-red-50' : isDark ? 'border-gray-600 bg-gray-700 text-white hover:border-teal-400' : 'border-gray-300 hover:border-teal-300'
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                      <Phone className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'} absolute left-3 top-1/2 transform -translate-y-1/2`} />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Role *
                    </label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                        errors.role ? 'border-red-500 bg-red-50' : isDark ? 'border-gray-600 bg-gray-700 text-white hover:border-teal-400' : 'border-gray-300 hover:border-teal-300'
                      }`}
                      placeholder="CEO"
                    />
                    {errors.role && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.role}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-6 flex items-center`}>
                  <Building2 className={`w-5 h-5 ${isDark ? 'text-teal-400' : 'text-teal-600'} mr-2`} />
                  Company Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                        errors.companyName ? 'border-red-500 bg-red-50' : isDark ? 'border-gray-600 bg-gray-700 text-white hover:border-teal-400' : 'border-gray-300 hover:border-teal-300'
                      }`}
                      placeholder="Acme Inc."
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Company Location *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.companyLocation}
                        onChange={(e) => handleInputChange('companyLocation', e.target.value)}
                        className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                          errors.companyLocation ? 'border-red-500 bg-red-50' : isDark ? 'border-gray-600 bg-gray-700 text-white hover:border-teal-400' : 'border-gray-300 hover:border-teal-300'
                        }`}
                        placeholder="San Francisco, CA"
                      />
                      <MapPin className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'} absolute left-3 top-1/2 transform -translate-y-1/2`} />
                    </div>
                    {errors.companyLocation && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.companyLocation}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Industry *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none ${
                          errors.industry ? 'border-red-500 bg-red-50' : isDark ? 'border-gray-600 bg-gray-700 text-white hover:border-teal-400' : 'border-gray-300 hover:border-teal-300 bg-white'
                        }`}
                      >
                        <option value="">Select industry</option>
                        {industries.map(industry => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                      <Industry className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'} absolute left-3 top-1/2 transform -translate-y-1/2`} />
                    </div>
                    {errors.industry && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.industry}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Company Size *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.companySize}
                        onChange={(e) => handleInputChange('companySize', e.target.value)}
                        className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none ${
                          errors.companySize ? 'border-red-500 bg-red-50' : isDark ? 'border-gray-600 bg-gray-700 text-white hover:border-teal-400' : 'border-gray-300 hover:border-teal-300 bg-white'
                        }`}
                      >
                        <option value="">Select company size</option>
                        {companySizes.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                      <Users className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'} absolute left-3 top-1/2 transform -translate-y-1/2`} />
                    </div>
                    {errors.companySize && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.companySize}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Annual Revenue *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.annualRevenue}
                        onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                        className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none ${
                          errors.annualRevenue ? 'border-red-500 bg-red-50' : isDark ? 'border-gray-600 bg-gray-700 text-white hover:border-teal-400' : 'border-gray-300 hover:border-teal-300 bg-white'
                        }`}
                      >
                        <option value="">Select revenue range</option>
                        {revenueRanges.map(range => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                      <IndianRupee className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'} absolute left-3 top-1/2 transform -translate-y-1/2`} />
                    </div>
                    {errors.annualRevenue && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.annualRevenue}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Interested Features */}
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Interested Features</h3>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>Select the features you're most interested in:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map(feature => (
                    <div
                      key={feature.id}
                      onClick={() => handleFeatureToggle(feature.id)}
                      className={`p-4 border rounded-xl cursor-pointer transition-all hover:shadow-md ${
                        formData.interestedFeatures.includes(feature.id)
                          ? isDark ? 'border-teal-400 bg-teal-900/50 shadow-sm' : 'border-teal-500 bg-teal-50 shadow-sm'
                          : isDark ? 'border-gray-600 hover:border-teal-400' : 'border-gray-200 hover:border-teal-300'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`w-5 h-5 border-2 rounded flex items-center justify-center mr-3 mt-0.5 transition-all ${
                          formData.interestedFeatures.includes(feature.id)
                            ? isDark ? 'border-teal-400 bg-teal-400' : 'border-teal-500 bg-teal-500'
                            : isDark ? 'border-gray-600' : 'border-gray-300'
                        }`}>
                          {formData.interestedFeatures.includes(feature.id) && (
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div>
                          <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature.label}</h4>
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.interestedFeatures && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.interestedFeatures}
                  </p>
                )}
              </div>

              {/* Additional Information */}
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Additional Information</h3>
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Any specific requirements or questions?
                  </label>
                  <textarea
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all hover:border-teal-300 resize-none ${
                      isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                    }`}
                    placeholder="Tell us about your specific needs or questions..."
                  />
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.submit}
                </p>
              )}

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-teal-700 hover:to-emerald-700 focus:ring-4 focus:ring-teal-200 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Join Early Access
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccessForm;