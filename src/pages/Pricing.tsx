import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useWorkflowStore } from '../store/workflowStore';

export function Pricing() {
  const location = useLocation();
  const navigate = useNavigate();
  const { restoreWorkflowState } = useWorkflowStore();

  const handleSubscribe = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    if (!stripe) return;

    try {
      // Create Stripe Checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: import.meta.env.VITE_STRIPE_BASIC_PRICE_ID,
          successUrl: `${window.location.origin}${location.state?.from || '/app'}`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        console.error('Stripe error:', error);
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ready to scale your content?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Your progress will be saved and you can continue where you left off.
          </p>
        </div>

        {/* Pricing card */}
        <div className="mt-12 max-w-lg mx-auto">
          <div className="rounded-lg shadow-lg overflow-hidden">
            <div className="bg-white px-6 py-8">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Professional Plan
                </h3>
                <p className="text-5xl font-extrabold text-gray-900">$60</p>
              </div>
              <p className="mt-4 text-sm text-gray-500">per month</p>

              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span className="ml-3 text-gray-700">Generate up to 10,000 articles per month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span className="ml-3 text-gray-700">Scale across 1,000 US cities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span className="ml-3 text-gray-700">Unlimited demographic variations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span className="ml-3 text-gray-700">Webflow CMS integration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span className="ml-3 text-gray-700">Automated publishing schedule</span>
                </li>
              </ul>

              <button
                onClick={handleSubscribe}
                className="mt-8 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Start Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}