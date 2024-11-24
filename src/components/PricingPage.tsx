import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    price: '49',
    description: 'Perfect for small businesses and content creators',
    features: [
      'Up to 100 articles per month',
      'Location-based variations',
      'Basic demographic targeting',
      'Standard support',
      'Export to CSV'
    ]
  },
  {
    name: 'Professional',
    price: '99',
    description: 'Ideal for growing businesses and agencies',
    features: [
      'Up to 500 articles per month',
      'Advanced location targeting',
      'Custom demographic profiles',
      'Priority support',
      'Export to CSV/JSON',
      'Webflow integration'
    ]
  },
  {
    name: 'Enterprise',
    price: '249',
    description: 'For large organizations and high-volume needs',
    features: [
      'Unlimited articles',
      'Custom API access',
      'Advanced integrations',
      'Dedicated support',
      'Custom export formats',
      'White-label options'
    ]
  }
];

export function PricingPage() {
  const navigate = useNavigate();

  const handleGetStarted = (plan: string) => {
    // Store the selected plan in localStorage for the signup flow
    localStorage.setItem('selectedPlan', plan);
    navigate('/signup');
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the right plan for your business
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Generate unique, high-quality content at scale with our AI-powered platform.
        </p>
        
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-3xl p-8 ring-1 ring-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold leading-8 text-gray-900">
                {plan.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                {plan.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">${plan.price}</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleGetStarted(plan.name)}
                className="mt-8 w-full rounded-md bg-blue-600 px-3.5 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Get started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
