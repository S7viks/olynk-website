import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface Feature {
  name: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  originalMonthlyPrice?: number;
  originalAnnualPrice?: number;
  isAnnual: boolean;
  features: Feature[];
  buttonText: string;
  buttonVariant?: 'primary' | 'secondary';
  isPopular?: boolean;
  isFree?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  description,
  monthlyPrice,
  annualPrice,
  originalMonthlyPrice,
  originalAnnualPrice,
  isAnnual,
  features,
  buttonText,
  buttonVariant = 'secondary',
  isPopular = false,
  isFree = false,
}) => {
  const currentPrice = isAnnual ? annualPrice : monthlyPrice;
  const originalPrice = isAnnual ? originalAnnualPrice : originalMonthlyPrice;
  const savings = originalPrice ? originalPrice - currentPrice : 0;
  const savingsPercentage = originalPrice ? Math.round((savings / originalPrice) * 100) : 0;

  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
      isPopular ? 'border-red-500 dark:border-blue-500 ring-2 ring-red-200 dark:ring-blue-200' : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-blue-300'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-red-500 to-red-600 dark:from-blue-500 dark:to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
            Most Popular
          </div>
        </div>
      )}
      
      <div className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{name}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{description}</p>
        </div>

        <div className="text-center mb-8">
          {isFree ? (
            <div className="text-5xl font-bold text-gray-900 dark:text-white">Free</div>
          ) : (
            <div className="space-y-2">
              {originalPrice && (
                <div className="text-lg text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString('en-IN')}{isAnnual ? '/year' : '/month'}
                </div>
              )}
              <div className="flex items-baseline justify-center">
                <span className="text-lg text-gray-600 dark:text-gray-300">₹</span>
                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                  {currentPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-gray-600 dark:text-gray-300 ml-2">
                  {isAnnual ? '/year' : '/month'}
                </span>
              </div>
              {savings > 0 && (
                <div className="text-sm font-medium text-red-600 dark:text-yellow-300">
                  Save ₹{savings.toLocaleString('en-IN')} {isAnnual ? 'annually' : 'monthly'} ({savingsPercentage}% off)
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3 mb-8">
          {features.slice(0, 8).map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-red-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{feature.name}</span>
            </div>
          ))}
          <button className="text-red-600 dark:text-yellow-300 text-sm font-medium hover:text-red-700 dark:hover:text-yellow-100 transition-colors flex items-center space-x-1">
            <span>View complete feature list</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
          buttonVariant === 'primary'
            ? 'bg-gradient-to-r from-red-500 to-red-600 dark:from-blue-500 dark:to-blue-600 text-white hover:from-red-600 hover:to-red-700 dark:hover:from-blue-600 dark:hover:to-blue-700 focus:ring-red-300 dark:focus:ring-blue-300 shadow-lg'
            : 'bg-white dark:bg-gray-700 text-red-600 dark:text-yellow-300 border-2 border-red-500 dark:border-blue-500 hover:bg-red-50 dark:hover:bg-blue-900/20 focus:ring-red-300 dark:focus:ring-blue-300'
        }`}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};