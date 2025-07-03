import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

// Import animation components
import Scattered from './Scattered';
import Stock from './Stock';
import Customer from './Customer';
import Integration from './Integration';
import Patterns from './Patterns';

interface ProblemCardProps {
  number: string;
  title: string;
  description: string;
  solution: string;
  index: number;
  isActive: boolean;
  isVisible: boolean;
}

const ProblemCard = ({ number, title, description, solution, index, isActive, isVisible }: ProblemCardProps) => {
  return (
    <Card 
      id={`problem-card-${index}`}
      className={`w-full min-h-[450px] p-6 border transition-all duration-700 ease-out mb-8 flex flex-col ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${
        isActive 
          ? 'opacity-100 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 border-red-200 dark:border-red-700 shadow-xl scale-105' 
          : 'opacity-30 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center mb-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 transition-all duration-300 ${
          isActive 
            ? 'bg-gradient-to-r from-red-600 to-red-700 dark:from-blue-600 dark:to-blue-700' 
            : 'bg-gradient-to-r from-red-500 to-red-600 dark:from-blue-500 dark:to-blue-600'
        }`}>
          {number}
        </div>
        <h3 className={`text-lg font-bold transition-colors duration-300 ${
          isActive ? 'text-red-700 dark:text-red-400' : 'text-gray-900 dark:text-white'
        }`}>
          {title}
        </h3>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-sm flex-grow">{description}</p>
      
      <div className={`rounded-lg p-4 transition-all duration-300 mt-auto ${
        isActive 
          ? 'bg-blue-100 dark:bg-blue-900/40' 
          : 'bg-blue-50 dark:bg-blue-900/20'
      }`}>
        <p className={`text-sm font-medium transition-colors duration-300 ${
          isActive ? 'text-red-700 dark:text-blue-300' : 'text-red-600 dark:text-blue-400'
        }`}>
          What You Need:
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{solution}</p>
      </div>
    </Card>
  );
};

const FixedAnimationArea = ({ activeCardIndex }: { activeCardIndex: number }) => {
  const [animationKey, setAnimationKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Trigger animation restart when active card changes
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setAnimationKey(prev => prev + 1);
      setIsTransitioning(false);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [activeCardIndex]);

  const renderActiveAnimation = () => {
    // Wrapper styles to make animations fit properly in the container
    const animationWrapperStyle = {
      transform: 'scale(1.1)',
      transformOrigin: 'center center',
      width: '90%',
      minHeight: '100%',
      margin: '5% 5%',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    };

    switch (activeCardIndex) {
      case 0:
        return (
          <div key={`scattered-${animationKey}`} style={animationWrapperStyle} className="flex items-center justify-center animation-container animate-fadeIn">
            <div className="max-w-4xl w-full p-4">
              <Scattered />
            </div>
          </div>
        );
      case 1:
        return (
          <div key={`stock-${animationKey}`} style={animationWrapperStyle} className="flex items-center justify-center animation-container animate-fadeIn">
            <div className="max-w-5xl w-full">
              <Stock isLoaded={true} />
            </div>
          </div>
        );
      case 2:
        return (
          <div key={`customer-${animationKey}`} style={animationWrapperStyle} className="flex items-center justify-center animation-container animate-fadeIn">
            <div className="max-w-4xl w-full p-4">
              <Customer />
            </div>
          </div>
        );
      case 3:
        return (
          <div key={`integration-${animationKey}`} style={animationWrapperStyle} className="flex items-center justify-center animation-container animate-fadeIn">
            <div className="max-w-4xl w-full p-4">
              <Integration />
            </div>
          </div>
        );
      case 4:
        return (
          <div key={`patterns-${animationKey}`} style={animationWrapperStyle} className="flex items-center justify-center animation-container animate-fadeIn">
            <div className="max-w-4xl w-full p-4">
              <Patterns />
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Animation Preview</h3>
              <p className="text-sm">Scroll through the cards to see interactive animations</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="sticky top-24 h-[500px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-4 overflow-hidden transition-all duration-500 ease-out">
      <div className="w-full h-full relative">
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden scrollbar-visible">
          <div className={`min-h-full flex items-center justify-center p-2 transition-opacity duration-300 ease-out ${
            isTransitioning ? 'opacity-50' : 'opacity-100'
          }`}>
            {renderActiveAnimation()}
          </div>
        </div>
        
        {/* Animation number indicator */}
        <div className="absolute top-4 right-4 bg-red-600 dark:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg z-10 transition-all duration-300 ease-out">
          {activeCardIndex + 1}
        </div>
      </div>
    </div>
  );
};

const D2CSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [cardVisibility, setCardVisibility] = useState<boolean[]>(new Array(5).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
          // Stagger card visibility animations
          setTimeout(() => {
            setCardVisibility(prev => prev.map((_, index) => index === 0));
            for (let i = 1; i < 5; i++) {
              setTimeout(() => {
                setCardVisibility(prev => prev.map((_, index) => index <= i));
              }, i * 150);
            }
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('problem');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.id.split('-')[2]);
            // Add smooth transition delay for better UX
            setTimeout(() => {
              setActiveCardIndex(cardIndex);
            }, 150);
          }
        });
      },
      { 
        threshold: 0.6,
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    // Observe all cards
    for (let i = 0; i < 5; i++) {
      const card = document.getElementById(`problem-card-${i}`);
      if (card) cardObserver.observe(card);
    }

    return () => cardObserver.disconnect();
  }, [cardVisibility]);

  const problemsData = [
    {
      number: "1",
      title: "Data Chaos Costing You Money",
      description: "Your inventory shows 45 units on Shopify, 32 on Amazon, 67 on WhatsApp Business, and 23 in your spreadsheet. Which number is real? You oversell, disappoint customers, and lose ₹15K+ in refunds monthly.",
      solution: "AI that creates a single source of truth and keeps all systems perfectly synced in real-time."
    },
    {
      number: "2", 
      title: "Stockouts You Never See Coming",
      description: "Your bestselling mango chips are selling fast, but you only realize you're out of stock when customers start complaining. By then, you've lost ₹2.3L in sales and spent money on ads for unavailable products.",
      solution: "AI that predicts demand spikes 7 days ahead and tells you exactly when to reorder."
    },
    {
      number: "3",
      title: "Customer Questions You Can't Answer Fast Enough",
      description: "'Where's my order?' 'When will it ship?' 'Is this in stock?' You're spending 3+ hours daily answering questions your system should handle proactively.",
      solution: "AI that predicts customer concerns and sends proactive updates before they ask."
    },
    {
      number: "4",
      title: "Integration Hell Eating Your Time",
      description: "You're switching between 8+ apps daily: Shopify, WhatsApp, Excel, payment dashboards, shipping portals, customer support tools. You spend 3+ hours just moving data between systems. Hidden Cost: 20+ hours weekly lost to manual data entry and app switching.",
      solution: "AI that connects everything into one intelligent dashboard that understands your business context."
    },

    {
      number: "5",
      title: "Patterns You Can't See in Your Own Data",
      description: "Returns spike for certain products, payment failures increase on weekends, inventory moves faster during specific weather—but you're flying blind because the patterns are invisible to human analysis. Hidden Cost: Brands miss ₹1-3L monthly in optimization opportunities they can't see.",
      solution: "AI that spots profitable patterns and explains them in plain language."
    }
  ];

  return (
    <section id="problem" className="w-full py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            The <span className="bg-gradient-to-r from-red-600 to-red-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">₹5L Question</span> Every<br />
            D2C Founder Asks
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto mb-6">
            "What's About to Go Wrong That I Don't Know About Yet?"
          </p>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-6 max-w-4xl mx-auto mb-8 shadow-lg">
            <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
              OLYNK's AI uncovers and solves the hidden challenges draining your D2C brand's potential.
            </p>
          </div>
          <p className={`text-sm text-gray-500 dark:text-gray-400 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            📊 Scroll to explore each problem • Watch animations change automatically →
          </p>
        </div>

        {/* Main Content: Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {/* Left Side: Problem Cards - Takes 2/7 of space */}
          <div className="lg:col-span-2 space-y-8">
            {problemsData.map((problem, index) => (
              <ProblemCard 
                key={index} 
                {...problem} 
                index={index} 
                isActive={activeCardIndex === index}
                isVisible={cardVisibility[index]}
              />
            ))}
          </div>

          {/* Right Side: Fixed Animation Area - Takes 5/7 of space */}
          <div className="lg:col-span-5 lg:block hidden">
            <FixedAnimationArea activeCardIndex={activeCardIndex} />
          </div>
        </div>

        {/* Active Card Counter */}
        <div className="text-center mt-8">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Currently viewing: <span className="font-bold text-red-600 dark:text-red-400">Problem {activeCardIndex + 1}</span> of {problemsData.length}
          </span>
        </div>

        {/* CTA Section */}
        <div className={`bg-gradient-to-r from-red-50 via-red-25 to-red-50 dark:from-blue-900/30 dark:via-blue-800/20 dark:to-blue-900/30 rounded-2xl p-8 md:p-12 text-center border border-red-100 dark:border-blue-800/50 mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What If Your Operations Had a 150 IQ?
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
            Imagine an AI advisor that knows your business better than you do. It predicts problems 7 days ahead, explains exactly why they'll happen, and tells you the precise steps to prevent them.
          </p>
          
          <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-6 mb-8 max-w-2xl mx-auto border border-red-200 dark:border-red-800">
            <p className="text-gray-700 dark:text-gray-300 italic font-medium">
              "Other tools show you what happened. OLYNK tells you what's about to happen and exactly what to do about it."
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/early-access-form">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-600 to-red-700 dark:from-blue-600 dark:to-blue-700 hover:from-red-700 hover:to-red-800 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white font-semibold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
              >
                Book Live AI Demo
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              className="border-red-600 dark:border-blue-400 text-red-600 dark:text-blue-400 hover:bg-red-50 dark:hover:bg-blue-900/20 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
            >
              Get Free Ops Audit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default D2CSection; 