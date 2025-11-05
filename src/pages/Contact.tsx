import React, { useState } from 'react';
import ContactForm from '../components/ContactForm';
import MicrosoftForm from '../components/MicrosoftForm';
import SEO from '../components/SEO';
import { getPageSEO } from '../utils/seo';

const ContactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'custom' | 'microsoft'>('custom');

  return (
    <>
      <SEO {...getPageSEO('contact')} />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We'd love to hear from you. Choose your preferred way to contact us below.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-1">
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'custom'
                  ? 'bg-red-600 dark:bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Custom Form
            </button>
            <button
              onClick={() => setActiveTab('microsoft')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'microsoft'
                  ? 'bg-red-600 dark:bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Microsoft Form
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === 'custom' && (
            <div className="animate-fadeIn">
              <ContactForm />
            </div>
          )}
          {activeTab === 'microsoft' && (
            <div className="animate-fadeIn">
              <MicrosoftForm />
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactPage; 