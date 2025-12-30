import React, { useState } from 'react';
import { runAllTests, testSupabaseConnection, checkDatabaseSchema, testAuthentication } from '../utils/testSupabase';
import { supabase } from '../supabase';

const SupabaseTest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    addResult('Starting Supabase tests...');
    
    try {
      const success = await runAllTests();
      addResult(success ? '✅ All tests passed!' : '❌ Some tests failed');
    } catch (error: any) {
      addResult(`❌ Test execution failed: ${error.message}`);
    }
    
    setIsRunning(false);
  };

  const testConnection = async () => {
    setIsRunning(true);
    addResult('Testing connection...');
    
    try {
      const success = await testSupabaseConnection();
      addResult(success ? '✅ Connection test passed' : '❌ Connection test failed');
    } catch (error: any) {
      addResult(`❌ Connection test error: ${error.message}`);
    }
    
    setIsRunning(false);
  };

  const testSchema = async () => {
    setIsRunning(true);
    addResult('Testing database schema...');
    
    try {
      await checkDatabaseSchema();
      addResult('✅ Schema test completed');
    } catch (error: any) {
      addResult(`❌ Schema test error: ${error.message}`);
    }
    
    setIsRunning(false);
  };

  const testAuth = async () => {
    setIsRunning(true);
    addResult('Testing authentication...');
    
    try {
      const success = await testAuthentication();
      addResult(success ? '✅ Authentication test passed' : '❌ Authentication test failed');
    } catch (error: any) {
      addResult(`❌ Authentication test error: ${error.message}`);
    }
    
    setIsRunning(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Supabase Connection Test</h2>
      
      <div className="mb-6 space-y-2">
        <button
          onClick={runTests}
          disabled={isRunning}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded mr-2"
        >
          {isRunning ? 'Running...' : 'Run All Tests'}
        </button>
        
        <button
          onClick={testConnection}
          disabled={isRunning}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded mr-2"
        >
          Test Connection
        </button>
        
        <button
          onClick={testSchema}
          disabled={isRunning}
          className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white px-4 py-2 rounded mr-2"
        >
          Test Schema
        </button>
        
        <button
          onClick={testAuth}
          disabled={isRunning}
          className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-2 rounded mr-2"
        >
          Test Auth
        </button>
        
        <button
          onClick={clearResults}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Clear Results
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Test Results:</h3>
        <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-96 overflow-y-auto">
          {testResults.length === 0 ? (
            <div className="text-gray-500">No test results yet. Click a test button to start.</div>
          ) : (
            testResults.map((result, index) => (
              <div key={index} className="mb-1">
                {result}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Environment Variables:</h3>
        <div className="space-y-1 text-sm">
          <div>VITE_SUPABASE_URL: {import.meta.env.VITE_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</div>
          <div>VITE_SUPABASE_ANON_KEY: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</div>
          <div>VITE_SUPABASE_SERVICE_KEY: {import.meta.env.VITE_SUPABASE_SERVICE_KEY ? '✅ Set' : '❌ Missing'}</div>
        </div>
      </div>
    </div>
  );
};

export default SupabaseTest; 