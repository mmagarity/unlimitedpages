import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function OptimizationSection() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12">
          {/* Unlimited Variations */}
          <div className="bg-[#E3F5FF] rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Unlimited Variations</h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="font-medium mb-2">Location-Based Content</h4>
                <p className="text-gray-600">
                  Generate unique content variations for different cities and states
                  to maximize your local SEO presence.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Demographic Targeting</h4>
                <p className="text-gray-600">
                  Create content variations targeting specific audience segments to
                  improve relevance and conversion rates.
                </p>
              </div>

              <Link
                to="/app"
                className="inline-flex items-center px-6 py-3 text-white bg-[#0066CC] rounded-lg hover:bg-[#0052A3] transition-colors"
              >
                Learn About Variations
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Multiple Content Types */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Multiple Content Types</h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="font-medium mb-2">Diverse Article Types</h4>
                <p className="text-gray-600">
                  Choose from various content types including how-to guides,
                  listicles, comparisons, and reviews.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Custom Templates</h4>
                <p className="text-gray-600">
                  Create your own custom content templates to maintain brand
                  consistency and messaging across all articles.
                </p>
              </div>

              <Link
                to="/app"
                className="inline-flex items-center px-6 py-3 text-white bg-[#0066CC] rounded-lg hover:bg-[#0052A3] transition-colors"
              >
                Explore Content Types
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}