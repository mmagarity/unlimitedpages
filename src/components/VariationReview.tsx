import React, { useMemo } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import type { HeadlineVariation, ContentVariation } from '../types';

interface VariationReviewProps {
  headlines: HeadlineVariation[];
  variations: ContentVariation[];
  onComplete: () => void;
}

export function VariationReview({ headlines, variations, onComplete }: VariationReviewProps) {
  const previewHeadline = (baseHeadline: string, variation: ContentVariation): string => {
    switch (variation.type) {
      case 'year':
        return `${baseHeadline} ${variation.format}`;
      case 'location':
        const locationValue = variation.value;
        switch (variation.format) {
          case 'city-state':
            return `${baseHeadline} ${variation.preposition} ${locationValue}`;
          case 'full-name':
            return `${baseHeadline} ${variation.preposition} ${locationValue.replace(', ', ' ')}`;
          case 'city-only':
            return `${baseHeadline} ${variation.preposition} ${locationValue.split(',')[0]}`;
          case 'state-only':
            return `${baseHeadline} ${variation.preposition} ${locationValue.split(', ')[1]}`;
          default:
            return `${baseHeadline} ${variation.preposition} ${locationValue}`;
        }
      case 'demographic':
        return `${baseHeadline} ${variation.preposition} ${variation.value}`;
      default:
        return `${baseHeadline} ${variation.value}`;
    }
  };

  const totalArticles = useMemo(() => {
    return headlines.length * variations.length;
  }, [headlines, variations]);

  const previewVariations = useMemo(() => {
    return headlines.map(headline => ({
      baseHeadline: headline.baseHeadline,
      variations: variations.map(variation => 
        previewHeadline(headline.baseHeadline, variation)
      )
    }));
  }, [headlines, variations]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Review Variations</h3>
            <p className="mt-1 text-sm text-gray-500">
              Preview all article variations before proceeding
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Total Articles</div>
            <div className="text-2xl font-bold text-blue-600">{totalArticles}</div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-8">
            {previewVariations.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  {item.baseHeadline}
                </h4>
                <div className="space-y-2">
                  {item.variations.map((variation, vIndex) => (
                    <div
                      key={vIndex}
                      className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700"
                    >
                      {variation}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onComplete}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Check className="w-5 h-5 mr-2" />
              Continue to CMS Mapping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}