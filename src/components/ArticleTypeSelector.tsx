import React from 'react';
import * as Icons from 'lucide-react';
import { ARTICLE_TYPES } from '../data/articleTypes';
import type { ArticleType, HeadlineVariation } from '../types';

interface ArticleTypeSelectorProps {
  onTypeSelected: (type: ArticleType) => void;
  selectedTypes: ArticleType[];
  selectedHeadlines: HeadlineVariation[];
}

export function ArticleTypeSelector({ 
  onTypeSelected, 
  selectedTypes,
  selectedHeadlines 
}: ArticleTypeSelectorProps) {
  const hasSelectedHeadlines = (typeId: string) => {
    return selectedHeadlines.some(headline => {
      const template = selectedTypes
        .find(type => type.id === typeId)
        ?.templates
        .find(t => headline.baseHeadline.includes(t.pattern.replace('[keyword]', '').replace('[number]', '')));
      return !!template;
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Choose Article Type</h3>
          <p className="mt-1 text-sm text-gray-500">
            Select the types of content you want to create
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ARTICLE_TYPES.map((type) => {
              const IconComponent = Icons[type.icon as keyof typeof Icons];
              const isSelected = hasSelectedHeadlines(type.id);
              const isCustom = type.id === 'custom';
              
              return (
                <button
                  key={type.id}
                  onClick={() => !isCustom && onTypeSelected(type)}
                  disabled={isCustom}
                  className={`flex flex-col items-center p-6 border rounded-lg transition-colors relative
                    ${isCustom 
                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-75' 
                      : isSelected 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'}`}
                >
                  {isCustom && (
                    <div className="absolute top-2 right-2">
                      <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                        <Icons.Lock className="w-3 h-3 mr-1" />
                        <span className="text-xs">Coming Soon</span>
                      </div>
                    </div>
                  )}
                  <IconComponent className={`w-8 h-8 mb-3 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                  <h4 className="text-sm font-medium text-gray-900">{type.name}</h4>
                  <p className="mt-1 text-xs text-gray-500 text-center">
                    {type.description}
                  </p>
                  {isSelected && (
                    <span className="mt-2 text-xs text-blue-600 font-medium">
                      Headlines Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}