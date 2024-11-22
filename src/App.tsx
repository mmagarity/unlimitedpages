import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './contexts/AuthContext';
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

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * Redirects to sign-in page if user is not authenticated
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/signin" />;
};

/**
 * Main App Component
 * Sets up the application with:
 * - Chakra UI for styling and components
 * - Authentication context for user management
 * - React Router for navigation
 * - Protected and public routes
 */
function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
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
              path="/app/*"
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
                  <SettingsLayout />
                </ProtectedRoute>
              }
            >
              <Route
                path="webflow"
                element={
                  <ProtectedRoute>
                    <WebflowIntegration />
                  </ProtectedRoute>
                }
              />
              <Route
                path="usage"
                element={
                  <ProtectedRoute>
                    <UsageBilling />
                  </ProtectedRoute>
                }
              />
              <Route
                path="account"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Route>
            
            {/* Default Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;