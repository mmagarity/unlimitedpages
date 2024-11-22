import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { useWorkflowStore } from '../store/workflowStore';

export function useAuthFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const { status } = useSubscriptionStore();
  const { currentStep, saveWorkflowState } = useWorkflowStore();

  useEffect(() => {
    // Require auth and payment before making any API calls (step 3)
    if (currentStep >= 3 && !user) {
      // Save current workflow state
      saveWorkflowState();
      // Redirect to signup (not login) with return path
      navigate('/signup', { 
        state: { 
          from: location.pathname,
          step: currentStep
        }
      });
      return;
    }

    if (currentStep >= 3 && user && !status?.isActive) {
      // User is logged in but hasn't paid
      navigate('/payment', {
        state: {
          from: location.pathname,
          step: currentStep
        }
      });
      return;
    }
  }, [currentStep, user, status, navigate, location]);

  return {
    requiresAuth: currentStep >= 3,
    requiresPayment: currentStep >= 3 && user && !status?.isActive
  };
}