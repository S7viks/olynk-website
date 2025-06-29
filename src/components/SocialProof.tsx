import React, { useEffect, useState } from 'react';
import { Users, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SocialProof = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('social-proof');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      quote: "OLYNK's AI predicted our Diwali inventory spike 10 days ahead. We prepared properly and hit our biggest sales month ever—₹2.3Cr with zero stockouts.",
      author: "Kavya Sharma",
      title: "Founder, EcoBeauty",
      revenue: "₹8Cr annual revenue",
      delay: "0ms",
    },
    {
      quote: "OLYNK ended our data nightmare. Before, our inventory numbers never matched across platforms. Now everything syncs perfectly, and we haven't oversold once in 6 months.",
      author: "Kavya Sharma",
      title: "Founder, EcoBeauty",
      revenue: "₹8Cr annual revenue",
      delay: "200ms",
    },
    {
      quote: "The AI caught a payment gateway issue that was costing us ₹1.5L weekly. Fixed it in 2 hours instead of finding out months later in reports.",
      author: "Arjun Patel",
      title: "FlexFit Apparel",
      revenue: "₹4Cr annual revenue",
      delay: "400ms",
    },
    {
      quote: "I used to spend 4 hours daily switching between apps and updating data. Now I check one dashboard and everything is already done. Got my life back.",
      author: "Arjun Patel",
      title: "FlexFit Apparel",
      revenue: "₹4Cr annual revenue",
      delay: "600ms",
    },
    {
      quote: "Customer complaints dropped 70% because AI sends updates before people even think to ask. It's like having a mind reader on my team.",
      author: "Meera Singh",
      title: "HomeCraft Decor",
      revenue: "₹6Cr annual revenue",
      delay: "800ms",
    },
    {
      quote: "The AI caught a data sync issue that was causing us to reject valid payments. Fixed automatically and saved us ₹80K monthly in lost sales.",
      author: "Meera Singh",
      title: "HomeCraft Decor",
      revenue: "₹6Cr annual revenue",
      delay: "1000ms",
    },
  ];

  const results = [
    { value: "₹15L+", description: "in losses prevented monthly", delay: "0ms" },
    { value: "85%", description: "AI prediction accuracy", delay: "200ms" },
    { value: "3+", description: "Hours saved daily per operations manager", delay: "400ms" },
    { value: "70%", description: "reduction in customer support queries", delay: "600ms" },
    { value: "99.8%", description: "data accuracy guarantee", delay: "800ms" },
    { value: "95%", description: "reduction in app switching", delay: "1000ms" },
  ];

  return (
    <section id="social-proof" className="py-20 bg-gray-50 dark:bg-gray-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-teal-200 to-cyan-200 dark:from-teal-800 dark:to-cyan-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-br from-cyan-200 to-teal-200 dark:from-cyan-800 dark:to-teal-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        </div>

        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            D2C Brands Already Using{' '}
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent animate-pulse">
              AI to Stay Ahead
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Hear from Indian D2C brands leveraging OLYNK's AI to transform their operations and achieve unprecedented growth.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:scale-105">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: testimonials[currentTestimonial].delay }}>
              <div className="flex items-center mb-4">
                <Star className="h-6 w-6 text-yellow-400 mr-2" />
                <Star className="h-6 w-6 text-yellow-400 mr-2" />
                <Star className="h-6 w-6 text-yellow-400 mr-2" />
                <Star className="h-6 w-6 text-yellow-400 mr-2" />
                <Star className="h-6 w-6 text-yellow-400" />
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 italic mb-6">"{testimonials[currentTestimonial].quote}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonials[currentTestimonial].author[0]}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{testimonials[currentTestimonial].author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonials[currentTestimonial].title} ({testimonials[currentTestimonial].revenue})</p>
                </div>
              </div>
            </div>
          </div>
          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentTestimonial === index ? 'bg-teal-600 scale-125' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {results.map((result, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: result.delay }}
            >
              <div className="mb-4">
                <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">{result.value}</p>
                <p className="text-lg text-gray-600 dark:text-gray-400">{result.description}</p>
              </div>
              <div className="flex items-center text-teal-600 dark:text-teal-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <ArrowRight className="h-5 w-5 mr-2" />
                <span> Proven Impact</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link
            to="/overview"
            className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-block flex items-center justify-center space-x-2 group"
          >
            <span>Explore Overview</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;