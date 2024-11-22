import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Logo and Description */}
          <div className="col-span-6">
            <Link to="/" className="flex items-center mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-[#0066CC] shadow-lg rounded-lg mr-3">
                <Box className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">UnlimitedPages</span>
            </Link>
            <p className="text-gray-600 mb-6">
              Effective, Affordable, Done-For-You Content Generation.
            </p>
            <p className="text-sm text-gray-500">
              © 2024 UnlimitedPages. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-2">
            <h3 className="font-medium text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#pricing" className="text-gray-600 hover:text-[#0066CC]">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2">
            <h3 className="font-medium text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-[#0066CC]">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-[#0066CC]">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}