import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Globe, Zap } from 'lucide-react';

export function MetricsSection() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16">
          We understand WHY you want to scale content.
        </h2>
        
        <div className="grid grid-cols-3 gap-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light mb-6">
              <BarChart2 className="w-8 h-8 text-primary-DEFAULT" />
            </div>
            <h3 className="text-xl font-bold mb-4">Increase Your Revenue</h3>
            <p className="text-gray-600 mb-6">
              By creating content that addresses specific questions or needs at each stage, you will attract and convert prospects more effectively.
            </p>
            <Link
              to="/app"
              className="inline-flex items-center px-6 py-3 bg-[#0066CC] text-white rounded-lg hover:bg-[#0052A3] transition-colors"
            >
              Make More Money
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light mb-6">
              <Globe className="w-8 h-8 text-primary-DEFAULT" />
            </div>
            <h3 className="text-xl font-bold mb-4">Generate Consistent Traffic</h3>
            <p className="text-gray-600 mb-6">
              By ranking higher in search results for relevant keywords, companies can attract more visitors to their site without running paid ads.
            </p>
            <Link
              to="/app"
              className="inline-flex items-center px-6 py-3 bg-[#0066CC] text-white rounded-lg hover:bg-[#0052A3] transition-colors"
            >
              Get More Clicks
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light mb-6">
              <Zap className="w-8 h-8 text-primary-DEFAULT" />
            </div>
            <h3 className="text-xl font-bold mb-4">Build Brand Credibility</h3>
            <p className="text-gray-600 mb-6">
              By achieving a top position, companies can enhance their perceived trustworthiness and authority in their industry.
            </p>
            <Link
              to="/app"
              className="inline-flex items-center px-6 py-3 bg-[#0066CC] text-white rounded-lg hover:bg-[#0052A3] transition-colors"
            >
              Establish More Trust
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}