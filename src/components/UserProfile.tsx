import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Settings, LogOut, ChevronDown, Globe, BarChart } from 'lucide-react';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onSignOut: () => void;
}

export function UserProfile({ user, onSignOut }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleNavigation = (path: string) => {
    // Save the current location when navigating to settings
    navigate(path, { state: { from: location.pathname } });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
        )}
        <span className="text-sm font-medium text-gray-700">{user.name}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border py-2 z-50">
          <div className="px-4 py-3 border-b">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>

          <div className="py-1">
            <button
              onClick={() => handleNavigation('/settings/webflow')}
              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Globe className="w-4 h-4 mr-3 text-gray-400" />
              Webflow Integration
            </button>
            <button
              onClick={() => handleNavigation('/settings/usage')}
              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <BarChart className="w-4 h-4 mr-3 text-gray-400" />
              Usage & Billing
            </button>
            <button
              onClick={() => handleNavigation('/settings/account')}
              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Settings className="w-4 h-4 mr-3 text-gray-400" />
              Settings
            </button>
            <div className="border-t my-1"></div>
            <button
              onClick={onSignOut}
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}