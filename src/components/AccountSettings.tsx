import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { FileText, Download, AlertCircle } from 'lucide-react';

interface ExportHistory {
  id: string;
  export_date: string;
  article_count: number;
  export_format: string;
  status: string;
}

interface UserProfile {
  email: string;
  full_name: string | null;
  subscription_status: string;
  subscription_start_date: string | null;
  subscription_end_date: string | null;
  monthly_article_limit: number;
  articles_generated: number;
  articles_remaining: number;
}

export function AccountSettings() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [exportHistory, setExportHistory] = useState<ExportHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState<{
    currentPeriodEnd: string;
    remainingArticles: number;
  } | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (profileError) throw profileError;

      // Fetch export history
      const { data: historyData, error: historyError } = await supabase
        .from('export_history')
        .select('*')
        .eq('user_id', user?.id)
        .order('export_date', { ascending: false });

      if (historyError) throw historyError;

      setProfile(profileData);
      setExportHistory(historyData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!user) return;
    
    setCancelling(true);
    setCancelError(null);
    setCancelSuccess(null);
    
    try {
      const response = await fetch('/.netlify/functions/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel subscription');
      }

      // Update local state
      await fetchUserData();
      setShowCancelConfirm(false);
      setCancelSuccess({
        currentPeriodEnd: data.currentPeriodEnd,
        remainingArticles: data.remainingArticles
      });
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      setCancelError(error instanceof Error ? error.message : 'Failed to cancel subscription');
    } finally {
      setCancelling(false);
    }
  };

  const CancelConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Cancel Subscription</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to cancel your subscription? You will lose access to:
          <ul className="list-disc ml-6 mt-2">
            <li>Article generation</li>
            <li>Export functionality</li>
            <li>Premium features</li>
          </ul>
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setShowCancelConfirm(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-700"
          >
            Keep Subscription
          </button>
          <button
            onClick={handleCancelSubscription}
            disabled={cancelling}
            className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 ${
              cancelling ? 'cursor-not-allowed' : ''
            }`}
          >
            {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
          </button>
        </div>
        {cancelError && (
          <p className="mt-4 text-red-600 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {cancelError}
          </p>
        )}
      </div>
    </div>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  const planFeatures = [
    'Generate up to 5,000 articles per month',
    'Advanced AI content generation',
    'Multiple export formats',
    'SEO optimization',
    'Location-specific content',
    'Demographic targeting',
    'Priority support'
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {cancelSuccess && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Subscription Successfully Cancelled</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>Your subscription has been cancelled but you still have access until {new Date(cancelSuccess.currentPeriodEnd).toLocaleDateString()}.</p>
                <p className="mt-1">You can still use your remaining {cancelSuccess.remainingArticles.toLocaleString()} articles until then.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* User Profile */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-medium">{profile?.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-medium">{profile?.full_name || 'Not set'}</p>
          </div>
        </div>
      </div>

      {/* Subscription Details */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Usage & Billing</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-2">Current Plan</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xl font-semibold">Professional Plan</p>
              <p className="text-gray-600">$60/month</p>
              {profile?.subscription_status === 'cancelled' && (
                <p className="text-sm text-gray-600 mt-2">
                  Access until: {new Date(profile.subscription_end_date || '').toLocaleDateString()}
                </p>
              )}
              <div className="mt-4">
                <div className="mb-2">
                  <p className="text-sm text-gray-600">Articles This Month</p>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-600 rounded-full h-2"
                        style={{ 
                          width: `${(profile?.articles_generated / (profile?.monthly_article_limit || 5000)) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">
                      {profile?.articles_remaining.toLocaleString()} remaining
                    </span>
                  </div>
                </div>
              </div>
              {profile?.subscription_status === 'active' && (
                <button
                  onClick={() => setShowCancelConfirm(true)}
                  className="mt-4 text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Cancel Subscription
                </button>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Plan Features</h3>
            <ul className="space-y-2">
              {planFeatures.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Export History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Export History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Articles</th>
                <th className="text-left py-3 px-4">Format</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {exportHistory.map((export_) => (
                <tr key={export_.id} className="border-b">
                  <td className="py-3 px-4">
                    {new Date(export_.export_date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">{export_.article_count}</td>
                  <td className="py-3 px-4 uppercase">{export_.export_format}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${export_.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        export_.status === 'failed' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {export_.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showCancelConfirm && <CancelConfirmationModal />}
    </div>
  );
}
