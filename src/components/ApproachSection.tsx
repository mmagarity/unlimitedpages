import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Globe, Zap, Clock } from 'lucide-react';

export function ApproachSection() {
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
    <div className="bg-[#E3F5FF] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12">
          {/* Left side - Performance Metrics */}
          <div className="bg-white rounded-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-8">Performance Metrics</h3>
            
            {/* Bar Chart */}
            <div className="h-48 relative mb-12">
              <div className="absolute inset-0 flex items-end justify-between">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-12 bg-[#0066CC] rounded-t"
                      style={{ 
                        height: `${(data.value / maxValue) * 160}px`
                      }}
                    ></div>
                    <div className="text-sm text-gray-500 mt-2">{data.month}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-2xl font-bold">125,000+</div>
                <div className="text-sm text-gray-500">Monthly Visitors</div>
              </div>
              <div>
                <div className="text-2xl font-bold">45%</div>
                <div className="text-sm text-gray-500">Growth Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.2%</div>
                <div className="text-sm text-gray-500">Conversion Rate</div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div>
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900">Our Proven Approach</h3>
              <h2 className="text-3xl font-bold mt-2 mb-4">
                High Quality, SEO-Optimized Content.<br />
                Published Daily.
              </h2>
              <p className="text-gray-600">
                Content is the foundation of SEO. We research, write, edit, publish and index blog posts automatically.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <Star className="w-6 h-6 text-[#0066CC] mb-2" />
                <h4 className="font-medium mb-2">Quality Content</h4>
                <p className="text-sm text-gray-600">
                  Industry-specific, well-researched articles that establish authority.
                </p>
              </div>
              <div>
                <Globe className="w-6 h-6 text-[#0066CC] mb-2" />
                <h4 className="font-medium mb-2">SEO Optimized</h4>
                <p className="text-sm text-gray-600">
                  Structured for maximum search engine visibility.
                </p>
              </div>
              <div>
                <Clock className="w-6 h-6 text-[#0066CC] mb-2" />
                <h4 className="font-medium mb-2">Fast Publishing</h4>
                <p className="text-sm text-gray-600">
                  New content published and indexed daily.
                </p>
              </div>
              <div>
                <Zap className="w-6 h-6 text-[#0066CC] mb-2" />
                <h4 className="font-medium mb-2">Local Focus</h4>
                <p className="text-sm text-gray-600">
                  Content tailored for local search results.
                </p>
              </div>
            </div>

            <Link
              to="/app"
              className="inline-flex items-center px-6 py-3 text-white bg-[#0066CC] rounded-lg hover:bg-[#0052A3] transition-colors"
            >
              Daily Blogs Published For You
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}