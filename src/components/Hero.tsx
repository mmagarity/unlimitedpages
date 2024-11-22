import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/app');
  };

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 lg:max-w-2xl lg:w-full">
          <main className="mt-10 sm:mt-12 lg:mt-16 xl:mt-28 px-4 space-y-5">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl text-center lg:text-left">
              <span className="block xl:inline">
                Automate Your
              </span>{' '}
              <span className="block text-blue-600 xl:inline">
                SEO Content Creation
              </span>
            </h1>
            
            <p className="mt-3 text-base text-gray-500 sm:text-lg md:text-xl sm:max-w-xl text-center lg:text-left">
              Generate location-specific, SEO-optimized content at scale. Save hours of manual work with our AI-powered content generation platform.
            </p>

            <div className="mt-5 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center px-10 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Get Started
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}