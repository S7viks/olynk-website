import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const WaitlistDashboard: React.FC = () => {
  const { user, profile, waitlistUser, isWaitlistUser, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [totalWaitlistUsers, setTotalWaitlistUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isWaitlistUser) {
      navigate('/waitlist');
      return;
    }

    loadWaitlistData();
  }, [isWaitlistUser, navigate]);

  const loadWaitlistData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get total waitlist users count
      const { counts } = await authService.getUserCountByRole();
      setTotalWaitlistUsers(counts.waitlist);

    } catch (err: any) {
      setError(err.message || 'Failed to load waitlist data');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getEstimatedWaitTime = (position: number) => {
    // Rough estimate: assume 10 people get access per week
    const weeks = Math.ceil(position / 10);
    if (weeks <= 1) return 'Less than 1 week';
    if (weeks <= 4) return `${weeks} weeks`;
    const months = Math.ceil(weeks / 4);
    return `${months} month${months > 1 ? 's' : ''}`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'vip': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'normal': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your waitlist status...</p>
        </div>
      </div>
    );
  }

  if (!isWaitlistUser || !waitlistUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Waitlist Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome, {profile?.full_name || user?.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                View Site
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
            <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Status Card */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">#{waitlistUser.waitlist_position}</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  You're #{waitlistUser.waitlist_position} on the waitlist
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Estimated wait time: {getEstimatedWaitTime(waitlistUser.waitlist_position)}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Position</span>
                  <span>{waitlistUser.waitlist_position} of {totalWaitlistUsers}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((waitlistUser.waitlist_position / totalWaitlistUsers) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Priority Status */}
              <div className="text-center">
                <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full ${getPriorityColor(waitlistUser.priority_level)}`}>
                  {waitlistUser.priority_level.toUpperCase()} Priority
                </span>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">What happens next?</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                    <span className="text-red-600 dark:text-red-400 font-semibold text-sm">1</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">We'll review your application</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Our team will carefully review your profile and company information to ensure Olynk is the right fit.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                    <span className="text-red-600 dark:text-red-400 font-semibold text-sm">2</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">You'll receive an invitation</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Once approved, you'll receive an email invitation to create your full Olynk account.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                    <span className="text-red-600 dark:text-red-400 font-semibold text-sm">3</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Start using Olynk</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Get early access to our AI-powered inventory management platform and start optimizing your operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Profile</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                  <p className="text-gray-900 dark:text-white">{profile?.full_name || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                  <p className="text-gray-900 dark:text-white">{profile?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</label>
                  <p className="text-gray-900 dark:text-white">{profile?.company || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Position</label>
                  <p className="text-gray-900 dark:text-white">{profile?.position || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Joined</label>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(profile?.created_at || '').toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/')}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                >
                  Learn More About Olynk
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                >
                  Contact Support
                </button>

              </div>
            </div>

            {/* Waitlist Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Waitlist Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Waitlist</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{totalWaitlistUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Your Position</span>
                  <span className="font-semibold text-gray-900 dark:text-white">#{waitlistUser.waitlist_position}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Priority Level</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(waitlistUser.priority_level)}`}>
                    {waitlistUser.priority_level}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Why join the waitlist?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Early Access</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Be among the first to experience our revolutionary AI-powered inventory management platform.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Exclusive Pricing</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Lock in special early adopter pricing and enjoy premium features at a discounted rate.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Direct Support</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Get priority support and direct access to our team during the early access period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistDashboard; 