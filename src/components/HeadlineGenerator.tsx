import React, { useState, useCallback } from 'react';
import { ShoppingCart, Trash2, Plus, AlertCircle, ListFilter } from 'lucide-react';
import type { HeadlineTemplate, HeadlineVariation } from '../types';
import { generateHeadlineSuggestions } from '../utils/headlineUtils';
import { useWorkflowStore } from '../store/workflowStore';
import { ARTICLE_TYPES } from '../data/articleTypes';

interface HeadlineGeneratorProps {
  onHeadlinesGenerated: (headlines: HeadlineVariation[]) => void;
  selectedHeadlines: HeadlineVariation[];
}

const getTemplatesForType = (articleTypeId: string): HeadlineTemplate[] => {
  const articleType = ARTICLE_TYPES.find(type => type.id === articleTypeId);
  return articleType?.templates || [];
};

export function HeadlineGenerator({
  onHeadlinesGenerated,
  selectedHeadlines: initialSelectedHeadlines = [],
}: HeadlineGeneratorProps) {
  const { selectedTypes, setCurrentStep } = useWorkflowStore();
  const currentArticleType = selectedTypes[0];
  const selectedTemplates = currentArticleType ? getTemplatesForType(currentArticleType.id) : [];
  
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState<HeadlineVariation[]>([]);
  const [showAllHeadlines, setShowAllHeadlines] = useState(false);
  const [selectedHeadlines, setSelectedHeadlines] = useState<HeadlineVariation[]>(initialSelectedHeadlines);

  const generateSuggestions = useCallback(() => {
    if (!keyword.trim() || !selectedTemplates.length) return;

    const existingHeadlines = new Set(selectedHeadlines.map(h => h.baseHeadline));
    const newSuggestions = generateHeadlineSuggestions(
      selectedTemplates,
      keyword.trim(),
      existingHeadlines
    );

    setSuggestions(newSuggestions);
  }, [keyword, selectedTemplates, selectedHeadlines]);

  const addToCart = useCallback((headline: HeadlineVariation) => {
    const newHeadline = {
      ...headline,
      selected: true,
      articleType: currentArticleType.id
    };
    setSelectedHeadlines(prev => [...prev, newHeadline]);
    setSuggestions(prev => prev.filter(h => h.id !== headline.id));
  }, [currentArticleType]);

  const removeFromCart = useCallback((id: string) => {
    setSelectedHeadlines(prev => prev.filter(h => h.id !== id));
  }, []);

  const handleContinue = useCallback(() => {
    if (selectedHeadlines.length > 0) {
      onHeadlinesGenerated(selectedHeadlines);
    }
  }, [selectedHeadlines, onHeadlinesGenerated]);

  const handleAddMoreTypes = () => {
    setCurrentStep(0);
  };

  const filteredHeadlines = showAllHeadlines 
    ? selectedHeadlines 
    : selectedHeadlines.filter(h => h.articleType === currentArticleType.id);

  if (!currentArticleType) {
    return (
      <div className="p-6 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-yellow-500" />
        <h3 className="mt-2 text-lg font-semibold text-gray-900">No Article Type Selected</h3>
        <p className="mt-1 text-sm text-gray-500">Please go back and select an article type to continue.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Create Headlines</h3>
          <div className="mt-4 flex gap-4">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter main keyword (e.g., coffee shops)"
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={generateSuggestions}
              disabled={!keyword.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Generate Suggestions
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-2 gap-6">
          {/* Suggestions Panel */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Suggested Headlines</h4>
              <span className="text-sm text-gray-500">
                Click + to add to your selection
              </span>
            </div>
            
            {suggestions.length === 0 ? (
              <div className="text-center text-gray-500 py-8 border-2 border-dashed rounded-lg">
                <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                Enter a keyword and generate suggestions
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {suggestions.map((headline) => (
                  <div
                    key={headline.id}
                    className="p-3 border rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{headline.baseHeadline}</span>
                      <button
                        onClick={() => addToCart(headline)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Headlines Panel */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2 text-blue-600" />
                <h4 className="font-medium text-gray-900">Selected Headlines</h4>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowAllHeadlines(!showAllHeadlines)}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                >
                  <ListFilter className="w-4 h-4 mr-1" />
                  {showAllHeadlines ? 'Show Current Type' : 'Show All'}
                </button>
                <span className="text-sm text-blue-600 font-medium">
                  {selectedHeadlines.length}/15 recommended
                </span>
              </div>
            </div>

            {filteredHeadlines.length === 0 ? (
              <div className="text-center text-gray-500 py-8 border-2 border-dashed rounded-lg">
                <ShoppingCart className="w-8 h-8 mx-auto mb-2" />
                {showAllHeadlines ? 'No headlines selected yet' : 'No headlines for current type'}
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {filteredHeadlines.map((headline) => (
                  <div
                    key={headline.id}
                    className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{headline.baseHeadline}</span>
                      <button
                        onClick={() => removeFromCart(headline.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedHeadlines.length > 0 && (
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleAddMoreTypes}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add More Types
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Continue with {selectedHeadlines.length} Headlines
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}