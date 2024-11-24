import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// The actual Stripe payment link
const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/test_6oE6qO7hL0Xj2FG288';

export function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const selectedPlan = location.state?.plan || 'Starter';

  useEffect(() => {
    if (user) {
      // Redirect to Stripe payment link with prefilled customer email
      const paymentUrl = `${STRIPE_PAYMENT_LINK}?prefilled_email=${encodeURIComponent(user.email)}`;
      window.location.href = paymentUrl;
    }
  }, [user]);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Professional Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Drive organic growth with AI-powered content
          </p>
        </div>

        <div className="relative rounded-lg shadow-lg overflow-hidden bg-white">
          <div className="px-6 py-8 lg:p-12">
            <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Everything you need to scale
            </h3>
            <p className="mt-6 text-base text-gray-500">
              Perfect for businesses looking to drive organic growth through content
            </p>
            <div className="mt-8">
              <div className="flex items-center">
                <h4 className="flex-shrink-0 pr-4 text-base font-semibold text-indigo-600">
                  What's included
                </h4>
                <div className="flex-1 border-t-2 border-gray-200"></div>
              </div>
              <ul className="mt-8 space-y-5">
                {[
                  'Generate up to 5,000 articles per month',
                  'Scale across 1,000 of the most populated cities',
                  'Include 3 AI-generated images per article for ranking',
                  'Unlimited demographic variations',
                  'Webflow CMS integration',
                  'CVS Export',
                  'SEO-optimized templates',
                  'Automated publishing',
                  'Pause or cancel anytime'
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-700">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="px-6 py-8 bg-gray-50 lg:p-12">
            <div className="text-center">
              <p className="text-lg leading-6 font-medium text-gray-900">
                Professional Plan
              </p>
              <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900">
                <span>$60</span>
                <span className="ml-3 text-xl font-medium text-gray-500">/month</span>
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-500">Redirecting you to our secure payment page...</p>
                <div className="mt-4 animate-pulse inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg">
                  Processing...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
