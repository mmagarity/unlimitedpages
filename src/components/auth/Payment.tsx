import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Payment: React.FC = () => {
  const navigate = useNavigate();
  const stripePaymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK;

  const handlePayment = () => {
    window.location.href = stripePaymentLink;
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-center">
          Complete Your Subscription
        </h1>
        <p className="text-lg text-center text-gray-600">
          You're just one step away from unlimited SEO content generation!
        </p>
        <div className="p-6 border border-gray-200 rounded-lg text-center shadow-lg">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              Unlimited Plan
            </h2>
            <p className="text-gray-600">
              Generate unlimited SEO-optimized content for your business
            </p>
            <button
              className="w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handlePayment}
            >
              Complete Payment
            </button>
          </div>
        </div>
        <button
          className="w-full py-2 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
