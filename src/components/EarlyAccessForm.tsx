import React, { useState } from 'react';
import { earlyAccessService } from '../services/firebaseService';

interface EarlyAccessData {
  name: string;
  email: string;
  company: string;
  role: string;
  industry: string;
  currentChallenges: string;
  expectedBenefits: string;
  timeline: string;
  additionalInfo: string;
}

const EarlyAccessForm: React.FC = () => {
  const [formData, setFormData] = useState<EarlyAccessData>({
    name: '',
    email: '',
    company: '',
    role: '',
    industry: '',
    currentChallenges: '',
    expectedBenefits: '',
    timeline: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
      // Store in Firebase
      await earlyAccessService.submitApplication(formData);

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        industry: '',
        currentChallenges: '',
        expectedBenefits: '',
        timeline: '',
        additionalInfo: ''
      });
    } catch (error) {
      console.error('Error submitting early access request:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Early Access Application
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Be among the first to experience Olynk's AI-powered operations platform
            </p>
          </div>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
        </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-green-800 dark:text-green-200">
                    Application Submitted Successfully!
                  </h3>
                  <p className="mt-1 text-green-700 dark:text-green-300">
                    Thank you for your interest! We'll review your application and contact you within 48 hours.
                  </p>
      </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
                    Submission Failed
                  </h3>
                  <p className="mt-1 text-red-700 dark:text-red-300">
                    {errorMessage}
            </p>
          </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  Personal Information
                </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-blue-500 focus:border-red-500 dark:focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="Enter your full name"
                  />
                  </div>

                  <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address *
                    </label>
                      <input
                        type="email"
                    id="email"
                    name="email"
                        value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-blue-500 focus:border-red-500 dark:focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-blue-500 focus:border-red-500 dark:focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="Enter your company name"
                  />
                  </div>

                  <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Role *
                    </label>
                      <input
                        type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-blue-500 focus:border-red-500 dark:focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="e.g., Operations Manager, CEO, etc."
                  />
                    </div>
                  </div>

                  <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Industry *
                    </label>
                      <select
                  id="industry"
                  name="industry"
                        value={formData.industry}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-blue-500 focus:border-red-500 dark:focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                >
                  <option value="">Select your industry</option>
                  <option value="ecommerce">E-commerce & Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="logistics">Logistics & Supply Chain</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance & Banking</option>
                  <option value="technology">Technology</option>
                  <option value="food-beverage">Food & Beverage</option>
                  <option value="automotive">Automotive</option>
                  <option value="pharmaceuticals">Pharmaceuticals</option>
                  <option value="textiles">Textiles & Apparel</option>
                  <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                Business Information
              </h3>

                  <div>
                <label htmlFor="currentChallenges" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Operational Challenges *
                    </label>
                <textarea
                  id="currentChallenges"
                  name="currentChallenges"
                  value={formData.currentChallenges}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-blue-500 focus:border-red-500 dark:focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Describe the main challenges you're facing with inventory management, operations, or supply chain..."
                />
                  </div>

                  <div>
                <label htmlFor="expectedBenefits" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expected Benefits from AI *
                    </label>
                <textarea
                  id="expectedBenefits"
                  name="expectedBenefits"
                  value={formData.expectedBenefits}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-blue-500 focus:border-red-500 dark:focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="What benefits do you expect to achieve with AI-powered operations management?"
                />
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Implementation Timeline *
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-blue-500 focus:border-red-500 dark:focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (Within 1 month)</option>
                  <option value="1-3-months">1-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-12-months">6-12 months</option>
                  <option value="12-plus-months">12+ months</option>
                  <option value="exploring">Just exploring options</option>
                </select>
              </div>

              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Additional Information
                  </label>
                  <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                    value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-blue-500 focus:border-red-500 dark:focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Any additional information you'd like to share..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 dark:from-blue-600 dark:to-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:from-red-700 hover:to-red-800 dark:hover:from-blue-700 dark:hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                >
                  {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Application...
                  </div>
                ) : (
                  'Submit Early Access Application'
                  )}
                </button>
              </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              By submitting this form, you agree to our privacy policy and terms of service. 
              We'll contact you within 48 hours to discuss your early access application.
            </p>
            </form>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccessForm;