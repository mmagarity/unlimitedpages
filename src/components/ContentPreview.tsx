import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';
import type { HeadlineVariation, ContentVariation } from '../types';
import { generatePreviewContent } from '../utils/contentGenerator';

interface ContentPreviewProps {
  headlines: HeadlineVariation[];
  variations: ContentVariation[];
  onComplete: (content: any[]) => void;
}

export function ContentPreview({ headlines, variations, onComplete }: ContentPreviewProps) {
  const [expandedPreviews, setExpandedPreviews] = useState<Set<string>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);

  const calculateVariationsForHeadline = () => {
    const count = 0;
    const locationVariations = variations.filter(v => v.type === 'location');
    
    if (locationVariations.length > 0) {
      return locationVariations.reduce((acc, variation) => {
        return acc + (variation.cityCount || 1);
      }, 0);
    }

    return variations.length;
  };

  const togglePreview = (headlineId: string) => {
    const newExpanded = new Set(expandedPreviews);
    if (newExpanded.has(headlineId)) {
      newExpanded.delete(headlineId);
    } else {
      newExpanded.add(headlineId);
    }
    setExpandedPreviews(newExpanded);
  };

  const handleGenerateAll = async () => {
    setIsGenerating(true);
    try {
      const generatedContent = [];
      for (const headline of headlines) {
        const baseContent = await generatePreviewContent(headline.baseHeadline);
        generatedContent.push(baseContent);
      }
      onComplete(generatedContent);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Content Preview</h2>
            <p className="text-sm text-gray-500">Preview and generate content for your articles</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Total Articles</div>
            <div className="text-3xl font-bold text-blue-600">
              {headlines.length * calculateVariationsForHeadline()}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {headlines.map((headline) => (
            <div key={headline.id} className="p-6">
              <button
                onClick={() => togglePreview(headline.id)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{headline.baseHeadline}</h3>
                    <p className="text-sm text-gray-500">{calculateVariationsForHeadline()} variations</p>
                  </div>
                </div>
                {expandedPreviews.has(headline.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedPreviews.has(headline.id) && (
                <div className="mt-4 pl-8 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Meta Description</h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Discover {headline.baseHeadline.toLowerCase()}. Expert insights and local recommendations updated for 2024.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Content Structure</h4>
                    <ul className="mt-1 space-y-2">
                      {['Overview', 'Key Features', 'Local Insights', 'Expert Recommendations', 'Conclusion'].map((section, index) => (
                        <li key={index} className="text-sm text-gray-600">• {section}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t">
          <button
            onClick={handleGenerateAll}
            disabled={isGenerating || headlines.length === 0}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
          >
            {isGenerating ? 'Generating Articles...' : 'Generate All Articles'}
          </button>
        </div>
      </div>
    </div>
  );
}