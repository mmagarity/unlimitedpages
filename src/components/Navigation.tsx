import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box } from 'lucide-react';
import { UserProfile } from './UserProfile';

export function Navigation() {
  const location = useLocation();
  const isAppRoute = location.pathname.startsWith('/app');
  
  const user = isAppRoute ? {
    name: 'Demo User',
    email: 'demo@example.com'
  } : null;

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 bg-[#0066CC] shadow-lg rounded-lg mr-3">
            <Box className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">UnlimitedPages</span>
        </Link>
        
        {isAppRoute ? (
          <UserProfile 
            user={user}
            onSignOut={() => {}}
          />
        ) : (
          <div className="flex items-center space-x-8">
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <Link 
              to="/app" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#0066CC] hover:bg-[#0052A3] transition-colors"
            >
              Get Started Today
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}