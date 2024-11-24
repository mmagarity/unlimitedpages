import React, { useState, useEffect } from 'react';
import { FileText, ChevronDown, ChevronUp, X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { HeadlineVariation, ContentVariation } from '../types';
import { generatePreviewContent } from '../utils/contentGenerator';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface ContentPreviewProps {
  headlines: HeadlineVariation[];
  variations: ContentVariation[];
  onComplete: (content: any[]) => void;
}

const ITEMS_PER_PAGE = 10;

export function ContentPreview({ headlines, variations, onComplete }: ContentPreviewProps) {
  const [expandedPreviews, setExpandedPreviews] = useState<Set<string>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Check subscription status when component mounts
  useEffect(() => {
    async function checkSubscription() {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_status, subscription_tier')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching subscription:', error);
        return;
      }
      
      setSubscriptionStatus(data?.subscription_status);
    }
    
    checkSubscription();
  }, [user]);

  const handleGenerateContent = async () => {
    if (!user) {
      navigate('/signup');
      return;
    }

    setIsGenerating(true);
    try {
      // Check subscription status
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('subscription_status, subscription_tier')
        .eq('id', user.id);

      if (profileError) {
        console.error('Error checking subscription:', profileError);
        navigate('/payment');
        return;
      }

      // If no profile found, create one
      if (!profiles || profiles.length === 0) {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{ id: user.id, email: user.email }]);
          
        if (insertError) {
          console.error('Error creating profile:', insertError);
          navigate('/payment');
          return;
        }
        navigate('/payment');
        return;
      }

      if (profiles[0]?.subscription_status !== 'active') {
        navigate('/payment');
        return;
      }

      // Generate content if subscription is active
      const generatedContent = await generatePreviewContent(headlines, variations);
      onComplete(generatedContent);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateVariationTitle = (headline: string, variation: ContentVariation) => {
    const prep = variation.preposition || 'in';
    
    // Handle demographic variations
    if (variation.type === 'demographic') {
      // Capitalize the demographic term in both the variation value and the headline
      const capitalizedDemographic = variation.value
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Replace any case-insensitive match of the demographic in the headline
      const regex = new RegExp(variation.value, 'i');
      const updatedHeadline = headline.replace(regex, capitalizedDemographic);
      
      return `${updatedHeadline} ${prep} ${capitalizedDemographic}`;
    }
    
    // Handle year variations
    if (variation.type === 'year') {
      // Replace any year in the headline with the variation year
      const yearRegex = /\b\d{4}\b/;
      let updatedHeadline = headline;
      if (yearRegex.test(headline)) {
        updatedHeadline = headline.replace(yearRegex, variation.value);
      } else {
        // If no year in headline, append it
        updatedHeadline = `${headline} ${variation.value}`;
      }
      return updatedHeadline;
    }
    
    // Default case for location variations
    return `${headline} ${prep} ${variation.value}`;
  };

  const generateSlug = (headline: string, variation: ContentVariation) => {
    const title = generateVariationTitle(headline, variation);
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const generateMetaDescription = (headline: string, variation: ContentVariation) => {
    return `Discover ${headline.toLowerCase()} ${variation.preposition} ${variation.value}. Expert insights and comprehensive guide updated for 2024.`;
  };

  // Calculate total number of variations
  const totalVariations = headlines.length * variations.length;
  const totalPages = Math.ceil(totalVariations / ITEMS_PER_PAGE);
  
  // Get current page items
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Generate all variations as flat array
  const allVariations = headlines.flatMap(headline =>
    variations.map(variation => ({
      headline,
      variation,
      id: `${headline.id}-${variation.id}`
    }))
  );

  // Get current page variations
  const currentVariations = allVariations.slice(startIndex, endIndex);

  const AuthModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">Sign in to Generate Content</h2>
          <button
            onClick={() => setShowAuthModal(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          To generate content using our AI, you'll need to:
          1. Sign in to your account
          2. Subscribe to a plan
        </p>
        <div className="space-y-4">
          <button
            onClick={() => window.location.href = '/signin'}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => window.location.href = '/pricing'}
            className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            View Pricing
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Content Preview</h2>
            <p className="text-sm text-gray-500">Preview your article variations before generation</p>
          </div>
          <button
            onClick={handleGenerateContent}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {user ? 'Generate Content' : 'Sign Up to Generate'}
          </button>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meta Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content Preview
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentVariations.map(({ headline, variation, id }) => (
                  <tr key={id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {generateVariationTitle(headline.baseHeadline, variation)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="blur-sm select-none">
                        {generateSlug(headline.baseHeadline, variation)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="blur-sm select-none">
                        {generateMetaDescription(headline.baseHeadline, variation)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="blur-sm select-none">
                        <div className="space-y-2">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua.
                          </p>
                          <h2 className="text-lg font-semibold">Key Features</h2>
                          <ul className="list-disc pl-5">
                            <li>Feature 1 with specific details about {variation.value}</li>
                            <li>Feature 2 with local insights</li>
                            <li>Feature 3 with expert recommendations</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, totalVariations)}</span> of{' '}
                  <span className="font-medium">{totalVariations}</span> variations
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {/* Page numbers */}
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        currentPage === i + 1
                          ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                          : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAuthModal && <AuthModal />}
    </div>
  );
}