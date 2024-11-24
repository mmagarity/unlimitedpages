import React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Box as LucideBox } from 'lucide-react';
import { UserProfile } from './UserProfile';
import { useAuth } from '../contexts/AuthContext';

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const isAppRoute = location.pathname.startsWith('/app');
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between">
        <RouterLink to="/" className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-500 shadow-lg rounded-lg mr-3">
            <LucideBox size={24} color="white" />
          </div>
          <span className="text-xl font-bold text-gray-900">
            UnlimitedPages
          </span>
        </RouterLink>
        
        {isAppRoute ? (
          <UserProfile 
            user={user}
            onSignOut={handleSignOut}
          />
        ) : (
          <div className="flex items-center space-x-8">
            <RouterLink
              to="/pricing"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Pricing
            </RouterLink>
            <RouterLink
              to="/app"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try It Now
            </RouterLink>
          </div>
        )}
      </div>
    </nav>
  );
}