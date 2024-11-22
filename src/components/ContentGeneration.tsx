import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';
import type { HeadlineVariation, ContentVariation } from '../types';

interface ContentGenerationProps {
  headlines: HeadlineVariation[];
  variations: ContentVariation[];
  onComplete: () => void;
}

export function ContentGeneration({ headlines, variations, onComplete }: ContentGenerationProps) {
  const [expandedPreview, setExpandedPreview] = useState<string | null>(null);

  // This would be replaced with actual API data in production
  const generatePreviewContent = (headline: HeadlineVariation) => ({
    title: headline.baseHeadline,
    metaDescription: `Discover ${headline.baseHeadline.toLowerCase()}. Expert insights and local recommendations updated for 2024.`,
    introduction: `Looking for ${headline.baseHeadline.toLowerCase()}? Our comprehensive guide provides expert insights and recommendations tailored to your needs.`,
    sections: [
      'Overview',
      'Key Features',
      'Local Insights',
      'Expert Recommendations',
      'Conclusion'
    ]
  });

  const handleGenerate = () => {
    // In production, this would trigger the content generation API
    onComplete();
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Content Preview</h3>
              <p className="mt-1 text-sm text-gray-500">
                Preview and generate content for your articles
              </p>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Total Articles</div>
              <div className="text-3xl font-bold text-blue-600">
                {headlines.length * variations.length}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Preview Section */}
          <div className="space-y-4">
            {headlines.map((headline) => {
              const isExpanded = expandedPreview === headline.id;
              const previewContent = generatePreviewContent(headline);

              return (
                <div
                  key={headline.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedPreview(isExpanded ? null : headline.id)}
                    className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-3" />
                      <div className="text-left">
                        <h4 className="text-sm font-medium text-gray-900">
                          {headline.baseHeadline}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {variations.length} variations
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-4 border-t">
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">Meta Description</h5>
                          <p className="mt-1 text-sm text-gray-600">{previewContent.metaDescription}</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">Introduction</h5>
                          <p className="mt-1 text-sm text-gray-600">{previewContent.introduction}</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">Content Structure</h5>
                          <ul className="mt-1 space-y-2">
                            {previewContent.sections.map((section, index) => (
                              <li key={index} className="text-sm text-gray-600">
                                • {section}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">Sample Variations</h5>
                          <ul className="mt-1 space-y-2">
                            {variations.slice(0, 3).map((variation, index) => (
                              <li key={index} className="text-sm text-gray-600">
                                • {headline.baseHeadline} {variation.preposition} {variation.value}
                              </li>
                            ))}
                            {variations.length > 3 && (
                              <li className="text-sm text-gray-500">
                                ...and {variations.length - 3} more variations
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleGenerate}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Generate All Articles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}