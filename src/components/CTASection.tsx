import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  const navigate = useNavigate();

  const handleStartNow = () => {
    navigate('/app');
  };

  const monthlyData = [
    { month: 'Jan', value: 15000 },
    { month: 'Feb', value: 35000 },
    { month: 'Mar', value: 52000 },
    { month: 'Apr', value: 78000 },
    { month: 'May', value: 95000 },
    { month: 'Jun', value: 110000 },
    { month: 'Jul', value: 125000 }
  ];

  const maxValue = Math.max(...monthlyData.map(d => d.value));

  return (
    <div className="bg-blue-600">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-blue-200">Start generating SEO content today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <button
              onClick={handleStartNow}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
            >
              Start Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}