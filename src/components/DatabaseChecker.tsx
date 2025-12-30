import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

interface DatabaseStats {
  demoRequests: number;
  contactForms: number;
  earlyAccessRequests: number;
  newsletterSubscriptions: number;
}

const DatabaseChecker: React.FC = () => {
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [collectionData, setCollectionData] = useState<any[]>([]);
  const [viewingData, setViewingData] = useState(false);

  useEffect(() => {
    loadDatabaseStats();
  }, []);

  const loadDatabaseStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        { data: demoRequests },
        { data: contactForms },
        { data: earlyAccessRequests },
        { data: newsletterSubscriptions }
      ] = await Promise.all([
        supabase.from('demo_requests').select('*'),
        supabase.from('contact_forms').select('*'),
        supabase.from('early_access_requests').select('*'),
                 supabase.from('newsletter_signups').select('*')
      ]);

      setStats({
        demoRequests: demoRequests?.length || 0,
        contactForms: contactForms?.length || 0,
        earlyAccessRequests: earlyAccessRequests?.length || 0,
        newsletterSubscriptions: newsletterSubscriptions?.length || 0
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load database stats');
    } finally {
      setLoading(false);
    }
  };

  const viewCollectionData = async (collectionName: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from(collectionName)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setCollectionData(data || []);
      setSelectedCollection(collectionName);
      setViewingData(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to load ${collectionName} data`);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString();
  };

  const renderDataTable = () => {
    if (collectionData.length === 0) {
      return <p className="text-gray-500">No data found in this collection.</p>;
    }

    const columns = Object.keys(collectionData[0]).filter(key => key !== 'id');

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                ID
              </th>
              {columns.map(column => (
                <th key={column} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {collectionData.map((item, index) => (
              <tr key={item.id || index} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-900 border-b">
                  {item.id || 'N/A'}
                </td>
                {columns.map(column => (
                  <td key={column} className="px-4 py-2 text-sm text-gray-900 border-b">
                    {column.includes('createdAt') || column.includes('updatedAt') 
                      ? formatTimestamp(item[column])
                      : typeof item[column] === 'object' 
                        ? JSON.stringify(item[column])
                        : String(item[column] || 'N/A')
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading && !viewingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading database information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
          <button 
            onClick={loadDatabaseStats}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Database Checker</h1>
          
          {!viewingData ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-900">Demo Requests</h3>
                  <p className="text-3xl font-bold text-blue-600">{stats?.demoRequests || 0}</p>
                  <button 
                    onClick={() => viewCollectionData('demoRequests')}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View Data →
                  </button>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-900">Contact Forms</h3>
                  <p className="text-3xl font-bold text-green-600">{stats?.contactForms || 0}</p>
                  <button 
                    onClick={() => viewCollectionData('contactForms')}
                    className="mt-2 text-green-600 hover:text-green-800 text-sm"
                  >
                    View Data →
                  </button>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-900">Early Access</h3>
                  <p className="text-3xl font-bold text-purple-600">{stats?.earlyAccessRequests || 0}</p>
                  <button 
                    onClick={() => viewCollectionData('earlyAccessRequests')}
                    className="mt-2 text-purple-600 hover:text-purple-800 text-sm"
                  >
                    View Data →
                  </button>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-orange-900">Newsletter</h3>
                  <p className="text-3xl font-bold text-orange-600">{stats?.newsletterSubscriptions || 0}</p>
                  <button 
                    onClick={() => viewCollectionData('newsletterSubscriptions')}
                    className="mt-2 text-orange-600 hover:text-orange-800 text-sm"
                  >
                    View Data →
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={loadDatabaseStats}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Refresh Stats
                </button>
              </div>
            </>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCollection} Data
                </h2>
                <button 
                  onClick={() => setViewingData(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  ← Back to Stats
                </button>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading data...</p>
                </div>
              ) : (
                renderDataTable()
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatabaseChecker; 