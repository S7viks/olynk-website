import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-navy mb-4">OLYNK</h1>
        <p className="text-xl text-steel mb-8">The AI Brain for Business Operations</p>
        <div className="bg-red-600 text-white px-6 py-3 rounded-full inline-block">
          Deployment Test - Working!
        </div>
      </div>
    </div>
  );
};

export default App; 