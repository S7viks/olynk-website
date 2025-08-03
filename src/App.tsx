import React from 'react';
import Logo from './components/Logo';

function SimpleHeader() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <div className="flex items-center space-x-2">
            <Logo size="md" />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              olynk.ai
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
      <div className="relative z-10">
        <SimpleHeader />
        <div className="pt-20 px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Welcome to OLYNK
          </h1>
          <p className="text-center text-gray-600 mt-4">
            AI Operations Advisor for D2C Brands
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;