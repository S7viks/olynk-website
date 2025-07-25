import React from 'react';
import { ArrowRight, Download, Clock, CheckCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const FinalCTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-500 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
            Ready to Give Your Operations an AI Brain?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            See how OLYNK's AI would advise your specific business. Get a personalized demo with insights 
            generated from your actual data.
          </p>
        </div>

        {/* Demo Promise Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 dark:from-blue-500 dark:to-blue-600 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Live AI Analysis</h3>
            <p className="text-gray-400 text-sm">
              We'll analyze your business patterns in real-time during the demo
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 dark:from-blue-500 dark:to-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Custom Insights</h3>
            <p className="text-gray-400 text-sm">
              See AI predictions specific to your products and customers
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 dark:from-blue-500 dark:to-blue-600 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">ROI Projection</h3>
            <p className="text-gray-400 text-sm">
              Calculate exact savings potential for your business
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 dark:from-blue-500 dark:to-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Download className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Free Operations Audit</h3>
            <p className="text-gray-400 text-sm">
              Get actionable recommendations even if you don't buy
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="text-center mb-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://forms.office.com/r/zd11g2RWDR"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-red-600 to-red-700 dark:from-blue-600 dark:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-3 group"
            >
              <span>Book AI Demo - See Your Insights Live</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            
            <a
              href="#ai-operations-checklist"
              className="bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-700 transition-all duration-300 flex items-center space-x-3 border border-gray-600"
            >
              <Download className="h-5 w-5" />
              <span>Download: "AI Operations Readiness Checklist"</span>
            </a>
          </div>
        </div>

        {/* Urgency Element */}
        <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Clock className="h-5 w-5 text-red-400" />
            <span className="text-red-400 font-semibold">Limited Availability</span>
          </div>
          <p className="text-gray-300 mb-4">
            Only 5 new customers per month (AI requires custom training)
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
            <span>Current Month: 3/5 slots filled</span>
            <span>Next Available: March 15th</span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400 mb-4">
            Questions? Call <a href="tel:+917993359150" className="text-red-400 dark:text-yellow-300 hover:text-red-300 dark:hover:text-yellow-100">+91-799-335-9150</a> or email{' '}
            <a href="mailto:Sathvik.chenna@outlook.com" className="text-red-400 dark:text-yellow-300 hover:text-red-300 dark:hover:text-yellow-100">hello@olynk.ai</a>
          </p>
          <p className="text-sm text-gray-500">
            Average demo duration: 45 minutes • No technical setup required • Get insights immediately
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection; 