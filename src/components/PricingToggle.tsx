import React from 'react';

interface PricingToggleProps {
  isAnnual: boolean;
  onToggle: (isAnnual: boolean) => void;
}

export const PricingToggle: React.FC<PricingToggleProps> = ({ isAnnual, onToggle }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-12">
      <span className={`text-lg font-medium transition-colors ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
        Monthly
      </span>
      
      <button
        onClick={() => onToggle(!isAnnual)}
        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
          isAnnual ? 'bg-teal-500' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
            isAnnual ? 'translate-x-9' : 'translate-x-1'
          }`}
        />
      </button>
      
      <div className="flex items-center space-x-2">
        <span className={`text-lg font-medium transition-colors ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
          Annual
        </span>
        <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
          20% off
        </span>
      </div>
    </div>
  );
};