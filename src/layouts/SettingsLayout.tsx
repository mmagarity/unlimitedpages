import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Globe, BarChart, Settings as SettingsIcon, Box, ArrowLeft } from 'lucide-react';

const navItems = [
  { to: '/settings/webflow', icon: Globe, label: 'Webflow Integration' },
  { to: '/settings/usage', icon: BarChart, label: 'Usage & Billing' },
  { to: '/settings/account', icon: SettingsIcon, label: 'Account Settings' }
];

export function SettingsLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const savedState = location.state;

  const handleBack = () => {
    // Navigate back to /app with the saved workflow state
    navigate('/app', { 
      state: savedState,
      replace: true // Replace current history entry to avoid back button issues
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-[#0066CC] shadow-lg rounded-lg mr-3">
                <Box className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">UnlimitedPages</span>
            </div>
            <button 
              onClick={handleBack}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to App
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  state={savedState} // Preserve workflow state in all navigation
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-blue-50 text-[#0066CC]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}