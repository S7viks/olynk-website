import React, { useEffect, useState } from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SolutionPreview = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('solution-preview');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="solution-preview" className="py-20 bg-gray-50 dark:bg-gray-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-teal-200 to-cyan-200 dark:from-teal-800 dark:to-cyan-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-br from-cyan-200 to-teal-200 dark:from-cyan-800 dark:to-teal-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        </div>

        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What If Your Operations Had a{' '}
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent animate-pulse">
              150 IQ?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
            Imagine an AI advisor that knows your business better than you do. It predicts problems 7 days ahead, explains exactly why they'll happen, and tells you the precise steps to prevent them.
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 inline-block transition-all duration-1000 delay-200">
            <p className="text-lg text-teal-600 dark:text-teal-400 font-semibold italic">
              "Other tools show you what happened. OLYNK tells you what's about to happen and exactly what to do about it."
            </p>
          </div>
        </div>

        {/* Transition Text */}
        <div className={`text-center mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Here's how our AI transforms your operations:
          </h3>
          <div className="flex items-center justify-center text-teal-600 dark:text-teal-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
            <span>Explore Solutions</span>
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>

        {/* Visual Accent */}
        <div className={`flex justify-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 flex items-center justify-center text-white animate-spin-slow">
            <Lightbulb className="h-12 w-12" />
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link
            to="/early-access-form"
            className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-block flex items-center justify-center space-x-2 group"
          >
            <span>Discover Your AI Advantage - Book Demo</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// Custom CSS for animation
const styles = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }
`;

export default SolutionPreview;