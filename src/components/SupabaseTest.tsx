import React, { useState } from 'react';
import { supabase } from '../supabase';
import { demoService, contactService, newsletterService } from '../services/supabaseService';

const SupabaseTest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isTesting, setIsTesting] = useState(false);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const runTests = async () => {
    setIsTesting(true);
    setTestResults([]);

    try {
      // Test 1: Basic connection
      addResult('Testing basic Supabase connection...');
      const { data, error } = await supabase.from('demo_requests').select('count').limit(1);
      if (error) {
        addResult(`❌ Connection failed: ${error.message}`);
      } else {
        addResult('✅ Basic connection successful');
      }

      // Test 2: Demo service
      addResult('Testing demo service...');
      try {
        const demoId = await demoService.submitDemoRequest({
          name: 'Test User',
          email: 'test@example.com',
          company: 'Test Company',
          phone: '+1234567890',
          message: 'This is a test submission'
        });
        addResult(`✅ Demo request submitted successfully: ${demoId}`);
      } catch (error) {
        addResult(`❌ Demo service failed: ${error}`);
      }

      // Test 3: Contact service
      addResult('Testing contact service...');
      try {
        const contactId = await contactService.submitContactForm({
          name: 'Test Contact',
          email: 'contact@example.com',
          subject: 'Test Subject',
          message: 'This is a test contact form submission'
        });
        addResult(`✅ Contact form submitted successfully: ${contactId}`);
      } catch (error) {
        addResult(`❌ Contact service failed: ${error}`);
      }

      // Test 4: Newsletter service
      addResult('Testing newsletter service...');
      try {
        const newsletterId = await newsletterService.subscribe('newsletter@example.com');
        addResult(`✅ Newsletter subscription successful: ${newsletterId}`);
      } catch (error) {
        addResult(`❌ Newsletter service failed: ${error}`);
      }

      // Test 5: Query records
      addResult('Testing record queries...');
      try {
        const demos = await demoService.getDemoRequests();
        addResult(`✅ Retrieved ${demos.length} demo requests`);
        
        const contacts = await contactService.getContactForms();
        addResult(`✅ Retrieved ${contacts.length} contact forms`);
        
        const newsletters = await newsletterService.isSubscribed('newsletter@example.com');
        addResult(`✅ Newsletter subscription check: ${newsletters}`);
      } catch (error) {
        addResult(`❌ Query test failed: ${error}`);
      }

    } catch (error) {
      addResult(`❌ Test suite failed: ${error}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Supabase Integration Test
      </h2>
      
      <button
        onClick={runTests}
        disabled={isTesting}
        className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
      >
        {isTesting ? 'Running Tests...' : 'Run Tests'}
      </button>

      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 max-h-96 overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Test Results:</h3>
        {testResults.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No tests run yet. Click "Run Tests" to start.</p>
        ) : (
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <div key={index} className="text-sm font-mono">
                {result}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Instructions:</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
          <li>• Make sure you've run the database schema in your Supabase project</li>
          <li>• Check that your API keys are correctly configured</li>
          <li>• Verify that Row Level Security policies are in place</li>
          <li>• Check the browser console for detailed error messages</li>
        </ul>
      </div>
    </div>
  );
};

export default SupabaseTest; 