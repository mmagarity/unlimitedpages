import React, { useState } from 'react';
import { Search, Sparkles, Upload, ArrowRight } from 'lucide-react';
import type { Keyword } from '../types';

interface KeywordResearchProps {
  onKeywordsGenerated: (keywords: Keyword[]) => void;
}

export function KeywordResearch({ onKeywordsGenerated }: KeywordResearchProps) {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(new Set());

  // Simulate keyword suggestions using a combination of approaches
  const generateKeywordSuggestions = async (query: string) => {
    setLoading(true);
    try {
      // In production, replace with actual API calls to services like:
      // - Google Trends API
      // - Bing Autosuggest API
      // - DataForSEO API
      const mockSuggestions = [
        `best ${query}`,
        `${query} review`,
        `${query} vs`,
        `how to choose ${query}`,
        `${query} for beginners`,
        `professional ${query}`,
        `${query} comparison`,
        `top 10 ${query}`,
        `affordable ${query}`,
        `premium ${query}`,
        `${query} guide`,
        `${query} tips`,
      ];
      
      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error('Error generating keywords:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleKeyword = (keyword: string) => {
    const newSelected = new Set(selectedKeywords);
    if (newSelected.has(keyword)) {
      newSelected.delete(keyword);
    } else {
      newSelected.add(keyword);
    }
    setSelectedKeywords(newSelected);
  };

  const handleSubmit = () => {
    const keywords: Keyword[] = Array.from(selectedKeywords).map(term => ({
      term,
      volume: Math.floor(Math.random() * 10000), // Mock volume data
      difficulty: Math.floor(Math.random() * 100), // Mock difficulty data
    }));
    onKeywordsGenerated(keywords);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Keyword Research</h3>
          <p className="mt-1 text-sm text-gray-500">
            Enter a topic to generate keyword ideas or upload your own list
          </p>
        </div>
        
        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter your main topic (e.g., 'coffee makers')"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <button
              onClick={() => generateKeywordSuggestions(topic)}
              disabled={!topic.trim() || loading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Ideas
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Upload className="w-4 h-4 mr-2" />
              Upload List
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {suggestions.map((keyword) => (
                  <div
                    key={keyword}
                    onClick={() => toggleKeyword(keyword)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors
                      ${selectedKeywords.has(keyword)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{keyword}</span>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{Math.floor(Math.random() * 10000)} vol</span>
                        <span>{Math.floor(Math.random() * 100)} KD</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedKeywords.size > 0 && (
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSubmit}
                    className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Continue with {selectedKeywords.size} keywords
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}