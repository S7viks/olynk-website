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
    <div className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
      isPopular ? 'border-teal-500 ring-2 ring-teal-200' : 'border-gray-200 hover:border-teal-300'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
            Most Popular
          </div>
        </div>
      )}
      
      <div className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>

        <div className="text-center mb-8">
          {isFree ? (
            <div className="text-5xl font-bold text-gray-900">Free</div>
          ) : (
            <div className="space-y-2">
              {originalPrice && (
                <div className="text-lg text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString('en-IN')}{isAnnual ? '/year' : '/month'}
                </div>
              )}
              <div className="flex items-baseline justify-center">
                <span className="text-lg text-gray-600">₹</span>
                <span className="text-5xl font-bold text-gray-900">
                  {currentPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-gray-600 ml-2">
                  {isAnnual ? '/year' : '/month'}
                </span>
              </div>
              {savings > 0 && (
                <div className="text-sm font-medium text-teal-600">
                  Save ₹{savings.toLocaleString('en-IN')} {isAnnual ? 'annually' : 'monthly'} ({savingsPercentage}% off)
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3 mb-8">
          {features.slice(0, 8).map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 text-sm leading-relaxed">{feature.name}</span>
            </div>
          ))}
          <button className="text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors flex items-center space-x-1">
            <span>View complete feature list</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
          buttonVariant === 'primary'
            ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 focus:ring-teal-300 shadow-lg'
            : 'bg-white text-teal-600 border-2 border-teal-500 hover:bg-teal-50 focus:ring-teal-300'
        }`}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};