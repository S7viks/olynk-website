import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, Zap, RefreshCw, ShoppingCart } from 'lucide-react';

interface SystemData {
  name: string;
  logo: string;
  stock: number;
  color: string;
}

const SCENES = {
  BLANK: 0,
  SYSTEM_1: 1,
  SYSTEM_2: 2,
  SYSTEM_3: 3,
  SYSTEM_4: 4,
  ORDER_CONFUSION: 5,
  OVERSELLING_ALERT: 6,
  AI_SOLUTION: 7,
  IMPACT: 8
};

const systems: SystemData[] = [
  { 
    name: 'Shopify', 
    logo: 'https://tse3.mm.bing.net/th?id=OIP.vTAHYPeLEe8WzfcZyndQugHaEK&pid=Api&p=0&h=180', 
    stock: 45, 
    color: 'border-green-400' 
  },
  { 
    name: 'Amazon', 
    logo: 'https://i.pinimg.com/originals/01/ca/da/01cada77a0a7d326d85b7969fe26a728.jpg', 
    stock: 32, 
    color: 'border-orange-400' 
  },
  { 
    name: 'WhatsApp Business', 
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQVktZb6y-_qlT-ka8ypJLjH053OOzI2N5dg&s', 
    stock: 67, 
    color: 'border-green-500' 
  },
  { 
    name: 'Internal Spreadsheet', 
    logo: 'https://i.pinimg.com/474x/1f/db/ce/1fdbce52429088209094dd52a5e7fd3f.jpg', 
    stock: 23, 
    color: 'border-blue-400' 
  }
];

const Scattered: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(SCENES.BLANK);
  const [syncedStock, setSyncedStock] = useState(28);
  const [showOrder, setShowOrder] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSync, setShowSync] = useState(false);

  useEffect(() => {
    const progressScene = () => {
      if (currentScene < SCENES.IMPACT) {
        setCurrentScene(prev => prev + 1);
      } else {
        setTimeout(() => {
          setCurrentScene(SCENES.BLANK);
          setShowOrder(false);
          setShowAlert(false);
          setShowSync(false);
        }, 2000);
      }
    };

    const delay = currentScene === SCENES.BLANK ? 250 : 
                  currentScene <= SCENES.SYSTEM_4 ? 500 : 1000;
    
    const timer = setTimeout(progressScene, delay);
    return () => clearTimeout(timer);
  }, [currentScene]);

  useEffect(() => {
    if (currentScene === SCENES.ORDER_CONFUSION) {
      setTimeout(() => setShowOrder(true), 100);
    }
    if (currentScene === SCENES.OVERSELLING_ALERT) {
      setTimeout(() => setShowAlert(true), 100);
    }
    if (currentScene === SCENES.AI_SOLUTION) {
      setTimeout(() => setShowSync(true), 100);
    }
  }, [currentScene]);

  const getVisibleSystemsCount = () => {
    if (currentScene >= SCENES.SYSTEM_1 && currentScene <= SCENES.SYSTEM_4) {
      return currentScene - SCENES.SYSTEM_1 + 1;
    }
    return currentScene > SCENES.SYSTEM_4 ? 4 : 0;
  };

  const renderTitle = () => {
    const titles = {
      [SCENES.BLANK]: '',
      [SCENES.SYSTEM_1]: 'The Scattered Data Problem',
      [SCENES.SYSTEM_2]: 'The Scattered Data Problem',
      [SCENES.SYSTEM_3]: 'The Scattered Data Problem',
      [SCENES.SYSTEM_4]: 'Same Product, Different Numbers',
      [SCENES.ORDER_CONFUSION]: 'Order Confusion',
      [SCENES.OVERSELLING_ALERT]: 'Overselling Crisis',
      [SCENES.AI_SOLUTION]: 'AI-Powered Solution',
      [SCENES.IMPACT]: 'Unified Inventory Success'
    };

    const subtitles = {
      [SCENES.SYSTEM_4]: 'Each system shows different stock levels',
      [SCENES.ORDER_CONFUSION]: 'Customer orders 40 units - which count is correct?',
      [SCENES.OVERSELLING_ALERT]: 'Selling what you don\'t have leads to angry customers',
      [SCENES.AI_SOLUTION]: 'Real-time synchronization across all platforms',
      [SCENES.IMPACT]: 'One source of truth eliminates costly mismatches'
    };

    return (
      <div className={`text-center mb-3 transition-all duration-1000 ${
        currentScene === SCENES.BLANK ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
          {titles[currentScene]}
        </h1>
        {subtitles[currentScene] && (
          <p className="text-xs text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {subtitles[currentScene]}
          </p>
        )}
      </div>
    );
  };

  const renderSystemCards = () => {
    const visibleCount = getVisibleSystemsCount();
    if (visibleCount === 0) return null;

    const isSynced = currentScene >= SCENES.AI_SOLUTION;
    const displayStock = isSynced ? syncedStock : null;

    return (
      <div className="max-w-xl mx-auto mb-3">
        <div className="grid grid-cols-4 gap-2">
          {systems.slice(0, visibleCount).map((system, index) => (
            <div
              key={system.name}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 transform transition-all duration-800 border ${
                showSync && isSynced ? `scale-105 ring-1 ring-green-400 ${system.color}` : system.color
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                opacity: 1,
                transform: 'translateY(0)'
              }}
            >
              <div className="w-8 h-8 mx-auto mb-1 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                <img 
                  src={system.logo} 
                  alt={system.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gray-200 items-center justify-center text-gray-500 text-[10px] hidden">
                  {system.name}
                </div>
              </div>
              <h3 className="text-[10px] font-semibold text-gray-800 dark:text-gray-100 mb-1 text-center truncate">
                {system.name}
              </h3>
              <div className="text-center">
                <div className="text-[10px] text-gray-500 dark:text-gray-400">Stock</div>
                <div className={`text-sm font-bold ${
                  isSynced ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'
                } transition-all duration-500`}>
                  {displayStock !== null ? displayStock : system.stock}
                </div>
              </div>
              {isSynced && showSync && (
                <div className="mt-1 flex items-center justify-center text-green-600 dark:text-green-400 text-[10px]">
                  <CheckCircle className="w-2 h-2 mr-1" />
                  Synced
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderOrderFlow = () => {
    if (currentScene < SCENES.ORDER_CONFUSION) return null;

    return (
      <div className={`max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 mb-3 transition-all duration-1000 ${
        showOrder ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-1.5 rounded-full mr-2">
              <ShoppingCart size={14} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-100">New Order</h3>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">Customer wants 40 units</p>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400">Available?</div>
            <div className="text-xs font-bold text-red-500 dark:text-red-400">Conflicting</div>
          </div>
        </div>
      </div>
    );
  };

  const renderAlert = () => {
    if (currentScene < SCENES.OVERSELLING_ALERT) return null;

    return (
      <div className={`max-w-md mx-auto bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-700 rounded-lg p-3 mb-3 transition-all duration-1000 ${
        showAlert ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <div className="flex items-start">
          <div className="bg-red-100 dark:bg-red-800 p-1.5 rounded-full mr-2 mt-0.5">
            <AlertTriangle size={14} className="text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xs font-semibold text-red-800 dark:text-red-300 mb-1">Overselling Alert!</h3>
            <p className="text-[10px] text-red-700 dark:text-red-400 mb-2">Sold 40 units but only had 23</p>
            <div className="bg-white dark:bg-gray-800 rounded-md p-2 border border-red-200 dark:border-red-700">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-gray-700 dark:text-gray-300">Customer complaint</span>
                <span className="text-[10px] text-red-600 dark:text-red-400 font-semibold">😠 Angry</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-700 dark:text-gray-300">Refund processed</span>
                <span className="text-[10px] text-red-600 dark:text-red-400 font-bold">₹15,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAISolution = () => {
    if (currentScene < SCENES.AI_SOLUTION) return null;

    return (
      <div className={`max-w-md mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/50 dark:to-purple-900/50 rounded-lg p-3 mb-3 transition-all duration-1000 ${
        currentScene >= SCENES.AI_SOLUTION ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-6 h-6 rounded-full flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
          </div>
          <h3 className="text-xs font-bold text-gray-800 dark:text-gray-100 mb-1">AI Inventory Sync</h3>
          <p className="text-[10px] text-gray-600 dark:text-gray-400 mb-2">
            Real-time sync across all platforms
          </p>
          {showSync && (
            <div className="flex justify-center">
              <RefreshCw size={14} className="text-blue-500 dark:text-blue-400 animate-spin" />
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderImpact = () => {
    if (currentScene < SCENES.IMPACT) return null;

    const benefits = [
      { icon: <CheckCircle size={12} />, text: 'No overselling', color: 'text-green-600 dark:text-green-400' },
      { icon: <Zap size={12} />, text: 'Real-time updates', color: 'text-blue-600 dark:text-blue-400' },
      { icon: <CheckCircle size={12} />, text: 'Happy customers', color: 'text-purple-600 dark:text-purple-400' },
      { icon: <RefreshCw size={12} />, text: 'Unified inventory', color: 'text-orange-600 dark:text-orange-400' }
    ];

    return (
      <div className="max-w-md mx-auto grid grid-cols-4 gap-2">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 transform transition-all duration-1000"
            style={{
              transitionDelay: `${index * 100}ms`,
              opacity: currentScene >= SCENES.IMPACT ? 1 : 0,
              transform: `translateY(${currentScene >= SCENES.IMPACT ? '0' : '8px'})`
            }}
          >
            <div className={`${benefit.color} mb-1 flex justify-center`}>
              {benefit.icon}
            </div>
            <p className="text-[10px] text-gray-800 dark:text-gray-100 font-medium text-center">{benefit.text}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 p-3">
      <div className="max-w-xl mx-auto">
        {renderTitle()}
        {renderSystemCards()}
        {renderOrderFlow()}
        {renderAlert()}
        {renderAISolution()}
        {renderImpact()}
        
        {/* Progress indicator */}
        <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1">
            {Array.from({ length: 9 }, (_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  i <= currentScene ? 'bg-blue-500 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scattered;