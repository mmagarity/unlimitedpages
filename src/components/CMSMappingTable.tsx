import React, { useState, useEffect } from 'react';
import { Download, Loader2, ChevronLeft, ChevronRight, Eye, ArrowRight } from 'lucide-react';
import { generatePreviewContent } from '../utils/contentGenerator';
import { exportToCSV } from '../utils/exportUtils';
import { ContentViewModal } from './ContentViewModal';
import type { GeneratedArticle, HeadlineVariation, ContentVariation } from '../types';

interface CMSMappingTableProps {
  selectedHeadlines: HeadlineVariation[];
  selectedVariations: ContentVariation[];
  onExport?: () => void;
  onPublish?: () => void;
}

export function CMSMappingTable({ 
  selectedHeadlines, 
  selectedVariations, 
  onExport,
  onPublish 
}: CMSMappingTableProps) {
  const [mappedData, setMappedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [viewContent, setViewContent] = useState<any | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    generateMappedData();
  }, [selectedHeadlines, selectedVariations]);

  const generateMappedData = async () => {
    setLoading(true);
    const mapped = [];
    let total = 0;

    for (const headline of selectedHeadlines) {
      // Generate base content
      const baseContent = await generatePreviewContent(headline.baseHeadline);
      
      // Add base article
      mapped.push({
        id: `${headline.id}-base`,
        title: headline.baseHeadline,
        slug: baseContent.cmsFields.slug,
        contentType: 'post',
        body: baseContent.cmsFields.mainContent,
        excerpt: baseContent.cmsFields.metaDescription,
        metaTitle: baseContent.cmsFields.metaTitle,
        metaDescription: baseContent.cmsFields.metaDescription,
        canonicalUrl: baseContent.cmsFields.canonicalUrl,
        ogTitle: baseContent.cmsFields.title,
        ogDescription: baseContent.cmsFields.metaDescription,
        ogImageUrl: baseContent.cmsFields.images[0]?.url,
        schemaType: 'Article',
        schemaJson: baseContent.cmsFields.schema,
        status: 'draft',
        images: baseContent.cmsFields.images,
        location: 'Base Article',
        variation: 'Base'
      });
      total++;

      // Generate variations
      for (const variation of selectedVariations) {
        if (variation.type === 'location' && variation.cityCount) {
          // Generate city variations
          for (let i = 0; i < variation.cityCount; i++) {
            const cityName = `City ${i + 1}`;
            mapped.push({
              ...baseContent.cmsFields,
              id: `${headline.id}-${variation.type}-${i}`,
              title: `${headline.baseHeadline} ${variation.preposition} ${cityName}`,
              variation: `Location: ${cityName}`,
              location: cityName
            });
          }
          total += variation.cityCount;
        } else {
          // Generate other variations
          mapped.push({
            ...baseContent.cmsFields,
            id: `${headline.id}-${variation.type}-${variation.value}`,
            title: `${headline.baseHeadline} ${variation.preposition || ''} ${variation.value}`,
            variation: `${variation.type}: ${variation.value}`,
            location: variation.type === 'location' ? variation.value : 'N/A'
          });
          total++;
        }
      }
    }

    setTotalItems(total);
    setMappedData(mapped);
    setLoading(false);
  };

  const handleExport = async () => {
    await exportToCSV(mappedData);
    if (onExport) {
      onExport();
    }
  };

  const handleViewContent = async (item: any) => {
    const content = {
      title: item.title,
      seoTitle: `${item.title} | Expert Guide 2024`,
      slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      metaDescription: `Discover ${item.title.toLowerCase()}. Expert insights and local recommendations updated for 2024.`,
      primaryKeyword: item.title.split(' ').slice(-2).join(' '),
      secondaryKeywords: [
        'best practices',
        'expert tips',
        'local insights',
        'professional advice',
        'top recommendations'
      ],
      headingStructure: [
        { level: 1, text: item.title },
        { level: 2, text: 'Overview' },
        { level: 2, text: 'Key Features' },
        { level: 2, text: 'Expert Recommendations' },
        { level: 3, text: 'Top Picks' },
        { level: 3, text: 'Professional Tips' },
        { level: 2, text: 'Local Insights' },
        { level: 2, text: 'Conclusion' }
      ],
      content: `
        <h1>${item.title}</h1>
        <p>Welcome to your comprehensive guide about ${item.title}. Our experts have compiled detailed insights and recommendations to help you make informed decisions.</p>
        <h2>Overview</h2>
        <p>Understanding ${item.title} requires a thorough analysis of various factors that contribute to success in this area.</p>
        <h2>Key Features</h2>
        <ul>
          <li>Professional insights from industry experts</li>
          <li>Data-driven recommendations</li>
          <li>Local market analysis</li>
          <li>Practical implementation tips</li>
        </ul>
        <h2>Expert Recommendations</h2>
        <p>Our experts have carefully evaluated and selected the best options based on extensive research and real-world experience.</p>
      `,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": item.title,
        "description": `Comprehensive guide about ${item.title.toLowerCase()}`,
        "author": {
          "@type": "Organization",
          "name": "Expert Team"
        },
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString()
      },
      wordCount: 1500,
      contentType: "article",
      status: "draft",
      lastUpdated: new Date().toISOString()
    };

    setViewContent(content);
    setIsViewModalOpen(true);
  };

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">CMS Mapping</h2>
          <p className="mt-1 text-sm text-gray-500">
            Review and export your content ({totalItems.toLocaleString()} articles)
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleExport}
            disabled={loading || mappedData.length === 0}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export to CSV
              </>
            )}
          </button>
          <button
            onClick={onPublish}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Continue to Publish
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Variation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Images
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mappedData.slice(startIndex, endIndex).map((item, index) => (
              <tr key={`${item.id}-${index}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.variation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.images?.length || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleViewContent(item)}
                    className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{endIndex}</span> of{' '}
                <span className="font-medium">{totalItems}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      <ContentViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        content={viewContent}
      />
    </div>
  );
}