import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import type { Keyword, ContentTemplate } from '../types';

interface ContentTemplateMapperProps {
  keywords: Keyword[];
  templates: ContentTemplate[];
  onTemplateSelected: (keyword: string, templateId: string) => void;
}

export function ContentTemplateMapper({ keywords, templates, onTemplateSelected }: ContentTemplateMapperProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Map Keywords to Templates</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {keywords.map((keyword) => (
            <div key={keyword.term} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-900">{keyword.term}</span>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  onChange={(e) => onTemplateSelected(keyword.term, e.target.value)}
                  className="block w-64 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Select template...</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}