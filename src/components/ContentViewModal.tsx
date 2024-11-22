import React from 'react';
import { X, Copy } from 'lucide-react';

interface ContentViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: any;
}

export function ContentViewModal({ isOpen, onClose, content }: ContentViewModalProps) {
  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-medium mb-6">Content Details</h2>

          <div className="space-y-6">
            {/* SEO Content */}
            <section>
              <h3 className="text-sm font-medium text-gray-900 mb-3">SEO Content</h3>
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <Field 
                  label="Title"
                  value={content.title}
                  onCopy={() => copyToClipboard(content.title)}
                />
                <Field 
                  label="SEO Title"
                  value={content.seoTitle}
                  onCopy={() => copyToClipboard(content.seoTitle)}
                />
                <Field 
                  label="Slug"
                  value={content.slug}
                  onCopy={() => copyToClipboard(content.slug)}
                />
                <Field 
                  label="Meta Description"
                  value={content.metaDescription}
                  onCopy={() => copyToClipboard(content.metaDescription)}
                />
              </div>
            </section>

            {/* Keywords */}
            <section>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Keywords</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Field 
                  label="Primary Keyword"
                  value={content.primaryKeyword}
                  onCopy={() => copyToClipboard(content.primaryKeyword)}
                />
                <div className="mt-2">
                  <label className="block text-sm text-gray-700">Secondary Keywords</label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {content.secondaryKeywords.map((keyword: string, index: number) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Content Structure */}
            <section>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Content Structure</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  {content.headingStructure.map((heading: any, index: number) => (
                    <div 
                      key={index}
                      className="flex items-center"
                      style={{ marginLeft: `${(heading.level - 1) * 1.5}rem` }}
                    >
                      <span className="text-xs font-medium text-gray-500 w-8">H{heading.level}</span>
                      <span className="text-sm">{heading.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Main Content Preview */}
            <section>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Content Preview</h3>
              <div className="bg-gray-50 p-4 rounded-lg prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: content.content }} />
              </div>
            </section>

            {/* Schema Data */}
            <section>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Schema Data</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify(content.schema, null, 2)}
                </pre>
              </div>
            </section>

            {/* Meta Information */}
            <section>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Meta Information</h3>
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <Field 
                  label="Word Count"
                  value={content.wordCount}
                />
                <Field 
                  label="Content Type"
                  value={content.contentType}
                />
                <Field 
                  label="Status"
                  value={content.status}
                />
                <Field 
                  label="Last Updated"
                  value={new Date(content.lastUpdated).toLocaleString()}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string | number;
  onCopy?: () => void;
}

function Field({ label, value, onCopy }: FieldProps) {
  return (
    <div>
      <label className="block text-sm text-gray-700">{label}</label>
      <div className="mt-1 flex items-center">
        <span className="text-sm">{value}</span>
        {onCopy && (
          <button
            onClick={onCopy}
            className="ml-2 p-1 text-gray-400 hover:text-gray-600 rounded-md"
          >
            <Copy className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}