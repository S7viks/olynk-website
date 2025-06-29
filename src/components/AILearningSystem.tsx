import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Users, Package, Lightbulb, Zap, Target, BarChart3 } from 'lucide-react';

interface Connection {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  strength: number;
  active: boolean;
}

interface Node {
  id: string;
  x: number;
  y: number;
  size: number;
  active: boolean;
}

const AILearningSystem: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [confidence, setConfidence] = useState(60);
  const [insights, setInsights] = useState<string[]>([]);
  const [currentInsight, setCurrentInsight] = useState(0);
  const [patterns, setPatterns] = useState({
    seasonal: 0,
    customer: 0,
    supplier: 0
  });

  const insightMessages = [
    "Peak sales in Q4 - prepare inventory",
    "Retention up 23% with loyalty program",
    "Supplier Alpha 95% reliable",
    "Cross-sell: Product B to Product A",
    "Seasonal demand - optimize staff"
  ];

  // Initialize neural network
  useEffect(() => {
    const initialNodes: Node[] = [];
    const initialConnections: Connection[] = [];

    // Create nodes in brain-like formation (smaller radius)
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * 2 * Math.PI;
      const radius = 20 + Math.random() * 15; // Reduced radius
      initialNodes.push({
        id: `node-${i}`,
        x: 50 + Math.cos(angle) * radius, // Adjusted for smaller viewBox
        y: 50 + Math.sin(angle) * radius,
        size: 3 + Math.random() * 3, // Smaller nodes
        active: false
      });
    }

    // Create initial connections
    for (let i = 0; i < initialNodes.length; i++) {
      for (let j = i + 1; j < initialNodes.length; j++) {
        if (Math.random() > 0.7) {
          initialConnections.push({
            id: `conn-${i}-${j}`,
            x1: initialNodes[i].x,
            y1: initialNodes[i].y,
            x2: initialNodes[j].x,
            y2: initialNodes[j].y,
            strength: Math.random() * 0.5,
            active: false
          });
        }
      }
    }

    setNodes(initialNodes);
    setConnections(initialConnections);
  }, []);

  // Animate neural network growth
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        active: Math.random() > 0.6,
        size: node.size + (Math.random() - 0.5) * 1 // Smaller size variation
      })));

      setConnections(prev => prev.map(conn => ({
        ...conn,
        strength: Math.min(1, conn.strength + Math.random() * 0.1),
        active: Math.random() > 0.4
      })));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Animate confidence growth
  useEffect(() => {
    const interval = setInterval(() => {
      setConfidence(prev => {
        const next = prev + Math.random() * 5;
        return next > 95 ? 60 : next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Animate pattern recognition
  useEffect(() => {
    const interval = setInterval(() => {
      setPatterns(prev => ({
        seasonal: Math.min(100, prev.seasonal + Math.random() * 8),
        customer: Math.min(100, prev.customer + Math.random() * 6),
        supplier: Math.min(100, prev.supplier + Math.random() * 7)
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Cycle through insights
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight(prev => (prev + 1) % insightMessages.length);
      setInsights(prev => {
        const newInsights = [...prev, insightMessages[currentInsight]];
        return newInsights.slice(-3);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [currentInsight]);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-teal-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Brain className="w-8 h-8 text-teal-600" />
            <h1 className="text-3xl font-bold text-slate-600">
              AI Learning System
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Watch AI grow smarter, recognizing patterns and delivering insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Neural Network Visualization */}
          <div className="bg-white rounded-xl shadow-md p-4 border border-teal-100">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-semibold text-slate-600">Neural Network</h2>
            </div>
            
            <div className="relative h-32 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 100"> {/* Smaller viewBox */}
                {connections.map(conn => (
                  <line
                    key={conn.id}
                    x1={conn.x1}
                    y1={conn.y1}
                    x2={conn.x2}
                    y2={conn.y2}
                    stroke={`rgba(20, 184, 166, ${conn.strength * 0.8})`}
                    strokeWidth={conn.active ? 1.5 + conn.strength : 0.8}
                    className="transition-all duration-1000"
                  />
                ))}
                {nodes.map(node => (
                  <circle
                    key={node.id}
                    cx={node.x}
                    cy={node.y}
                    r={node.size}
                    fill={node.active ? '#14b8a6' : '#94a3b8'}
                    className="transition-all duration-800"
                    style={{
                      filter: node.active ? 'drop-shadow(0 0 6px rgba(20, 184, 166, 0.6))' : 'none'
                    }}
                  />
                ))}
              </svg>
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded px-2 py-1">
                <div className="text-xs font-medium text-slate-600">
                  Active: {connections.filter(c => c.active).length}
                </div>
              </div>
            </div>
          </div>

          {/* Confidence Evolution */}
          <div className="bg-white rounded-xl shadow-md p-4 border border-teal-100">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-semibold text-slate-600">Confidence</h2>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-teal-600 mb-1">
                  {Math.round(confidence)}%
                </div>
                <div className="text-sm text-slate-600">Accuracy</div>
              </div>
              
              <div className="relative h-3 bg-gray-200 rounded-full">
                <div 
                  className="absolute h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-2000"
                  style={{ width: `${confidence}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-gray-50 rounded p-2">
                  <div className="font-bold text-gray-600">60%</div>
                  <div>Initial</div>
                </div>
                <div className="bg-teal-50 rounded p-2">
                  <div className="font-bold text-teal-600">75%</div>
                  <div>Learning</div>
                </div>
                <div className="bg-teal-100 rounded p-2">
                  <div className="font-bold text-teal-600">95%</div>
                  <div>Expert</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pattern Recognition */}
        <div className="bg-white rounded-xl shadow-md p-4 border border-teal-100 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-semibold text-slate-600">Patterns</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-600" />
                <span className="text-sm font-medium text-slate-600">Seasonal</span>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-1000"
                  style={{ width: `${patterns.seasonal}%` }}
                ></div>
              </div>
              <div className="text-xs text-slate-600">{Math.round(patterns.seasonal)}%</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-600" />
                <span className="text-sm font-medium text-slate-600">Customer</span>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-1000"
                  style={{ width: `${patterns.customer}%` }}
                ></div>
              </div>
              <div className="text-xs text-slate-600">{Math.round(patterns.customer)}%</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-teal-600" />
                <span className="text-sm font-medium text-slate-600">Supplier</span>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-1000"
                  style={{ width: `${patterns.supplier}%` }}
                ></div>
              </div>
              <div className="text-xs text-slate-600">{Math.round(patterns.supplier)}%</div>
            </div>
          </div>
        </div>

        {/* Business Insights */}
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-slate-600">Insights</h2>
          </div>
          
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <div 
                key={index}
                className="flex items-start gap-2 p-2 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg border-l-2 border-teal-500 transition-all duration-500"
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                  <Lightbulb className="w-3 h-3 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-600">{insight}</p>
                  <div className="text-xs text-teal-600">
                    Confidence: {60 + Math.round(Math.random() * 35)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {insights.length === 0 && (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Lightbulb className="w-6 h-6 text-teal-600" />
              </div>
              <p className="text-sm text-slate-600">AI is analyzing patterns...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AILearningSystem;