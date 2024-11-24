import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const ConfirmSignUp: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const { confirmSignUp } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setError('Invalid confirmation link');
      setLoading(false);
      return;
    }
    
    const confirmEmail = async () => {
      try {
        const { error } = await confirmSignUp(token);
        
        if (error) {
          setError(error.message);
        } else {
          setSuccess(true);
          // Redirect to signin after 3 seconds
          setTimeout(() => {
            navigate('/signin');
          }, 3000);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to confirm email');
      } finally {
        setLoading(false);
      }
    };

    confirmEmail();
  }, [confirmSignUp, navigate, searchParams]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Confirming your email...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="text-center">
          {error ? (
            <>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="mt-4 text-lg font-medium text-gray-900">Email Confirmation Failed</h2>
              <p className="mt-2 text-sm text-gray-500">{error}</p>
              <button
                onClick={() => navigate('/signin')}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Sign In
              </button>
            </>
          ) : (
            <>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mt-4 text-lg font-medium text-gray-900">Email Confirmed Successfully</h2>
              <p className="mt-2 text-sm text-gray-500">
                Your email has been confirmed. Redirecting you to sign in...
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
