import React, { useState, useEffect } from 'react';
import { Database, ArrowRight, Check } from 'lucide-react';
import type { HeadlineVariation, ContentVariation } from '../types';

interface CMSFieldMapperProps {
  headlines: HeadlineVariation[];
  variations: ContentVariation[];
  onFieldMapped: (mappings: Record<string, any>) => void;
}

export function CMSFieldMapper({ headlines, variations, onFieldMapped }: CMSFieldMapperProps) {
  const [previewArticle, setPreviewArticle] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate API mapping preview
  const mappedFields = {
    seo: {
      title: headlines[0]?.baseHeadline || '',
      metaTitle: `${headlines[0]?.baseHeadline} | Expert Guide 2024`,
      metaDescription: `Discover the best ${headlines[0]?.baseHeadline.toLowerCase()} with our comprehensive local guide. Expert tips and recommendations updated for 2024.`,
      canonicalUrl: `/guides/${headlines[0]?.baseHeadline.toLowerCase().replace(/\s+/g, '-')}`,
      focusKeywords: ['keyword1', 'keyword2', 'keyword3']
    },
    content: {
      mainHeading: headlines[0]?.baseHeadline,
      sections: [
        'Introduction',
        'Overview',
        'Top Recommendations',
        'Expert Tips',
        'Local Insights',
        'Conclusion'
      ],
      imageRequirements: '3 high-quality images per article'
    },
    schema: {
      type: 'Article',
      properties: {
        headline: headlines[0]?.baseHeadline,
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString()
      }
    }
  };

  const handleContinue = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      onFieldMapped(mappedFields);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900">CMS Field Mapping</h3>
              <p className="mt-1 text-sm text-gray-500">
                Review automated field mappings before content generation
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {headlines.length} articles × {variations.length} variations
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {/* SEO Fields */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <h4 className="text-sm font-medium text-gray-900">SEO Fields</h4>
              </div>
              <div className="p-4">
                <dl className="grid grid-cols-2 gap-4">
                  {Object.entries(mappedFields.seo).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm font-medium text-gray-500">{key}</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {typeof value === 'string' ? value : JSON.stringify(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Content Structure */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <h4 className="text-sm font-medium text-gray-900">Content Structure</h4>
              </div>
              <div className="p-4">
                <dl className="grid grid-cols-2 gap-4">
                  {Object.entries(mappedFields.content).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm font-medium text-gray-500">{key}</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {Array.isArray(value) ? (
                          <ul className="list-disc pl-4">
                            {value.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Schema Markup */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <h4 className="text-sm font-medium text-gray-900">Schema Markup</h4>
              </div>
              <div className="p-4">
                <pre className="text-sm text-gray-900 bg-gray-50 p-4 rounded-lg overflow-auto">
                  {JSON.stringify(mappedFields.schema, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleContinue}
              disabled={isLoading}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 mr-2 border-t-2 border-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Continue to Content Generation
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}