import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { ResetPassword } from './components/auth/ResetPassword';
import { Payment } from './components/auth/Payment';
import { LandingPage } from './pages/LandingPage';
import { WorkflowApp } from './components/WorkflowApp';
import { SettingsLayout } from './layouts/SettingsLayout';
import { WebflowIntegration } from './pages/WebflowIntegration';
import { UsageBilling } from './pages/UsageBilling';
import { Settings } from './pages/Settings';
import { Pricing } from './pages/Pricing';

// Debug component to help identify rendering issues
const Debug: React.FC = () => {
  console.log('Debug component rendered');
  return <div className="p-5 bg-gray-100">Debug Component</div>;
};

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * Redirects to sign-in page if user is not authenticated
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  console.log('ProtectedRoute - User:', user);
  return user ? <>{children}</> : <Navigate to="/signin" />;
};

/**
 * Main App Component
 * Sets up the application with:
 * - Authentication context for user management
 * - React Router for navigation
 * - Protected and public routes
 */
function App() {
  console.log('App component rendered');
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Debug Route */}
          <Route path="/debug" element={<Debug />} />
          
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/pricing" element={<Pricing />} />
          
          {/* Protected Routes */}
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <WorkflowApp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsLayout>
                  <Settings />
                </SettingsLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/webflow"
            element={
              <ProtectedRoute>
                <SettingsLayout>
                  <WebflowIntegration />
                </SettingsLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/usage"
            element={
              <ProtectedRoute>
                <SettingsLayout>
                  <UsageBilling />
                </SettingsLayout>
              </ProtectedRoute>
            }
          />
          
          {/* Default Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;