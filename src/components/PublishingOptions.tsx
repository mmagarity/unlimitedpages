import React, { useState } from 'react';
import { Globe, AlertCircle, ArrowRight } from 'lucide-react';
import { useWebflowStore } from '../store/webflowStore';
import { PublishingStatus } from './PublishingStatus';
import type { GeneratedArticle } from '../types/content';
import { publishToWebflow } from '../utils/webflowApi';

interface PublishingOptionsProps {
  articles: GeneratedArticle[];
  onNavigateToSettings: () => void;
  onPublish?: () => void;
}

export function PublishingOptions({ articles, onNavigateToSettings, onPublish }: PublishingOptionsProps) {
  const { config } = useWebflowStore();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedCount, setPublishedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  const PUBLISHING_RATES = [
    { 
      rate: 100,
      description: 'Conservative - Best for maintaining quality (100/day)'
    },
    { 
      rate: 250,
      description: 'Balanced - Good mix of speed and control (250/day)'
    },
    { 
      rate: 500,
      description: 'Aggressive - Maximum allowed by Webflow (500/day)'
    }
  ];

  const [publishingRate, setPublishingRate] = useState(PUBLISHING_RATES[0].rate);

  const handleStartPublishing = async () => {
    if (!config) return;

    setIsPublishing(true);
    setPublishedCount(0);
    setFailedCount(0);

    try {
      await publishToWebflow(
        articles,
        { id: config.collectionId, name: 'Articles', fields: [] },
        (published, failed) => {
          setPublishedCount(published);
          setFailedCount(failed);
        }
      );

      if (onPublish) {
        onPublish();
      }
    } catch (error) {
      console.error('Publishing failed:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  if (!config?.isConnected) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Publishing Setup Required</h2>
          </div>
          
          <div className="p-6">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">
                    Webflow Connection Required
                  </h3>
                  <p className="mt-1 text-sm text-yellow-700">
                    To publish your {articles.length.toLocaleString()} articles, you need to connect your Webflow account first.
                  </p>
                  <button
                    onClick={onNavigateToSettings}
                    className="mt-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Connect Webflow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Publishing Settings</h2>
        </div>
        
        <div className="p-6">
          <div className="flex items-start">
            <Globe className="w-5 h-5 text-green-500 mt-0.5 mr-3" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">
                Connected to Webflow
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Ready to publish {articles.length.toLocaleString()} articles to your connected Webflow site
              </p>
              <div className="mt-2 text-xs text-gray-500 space-y-1">
                <p>Site ID: {config.siteId}</p>
                <p>Collection ID: {config.collectionId}</p>
              </div>

              <div className="mt-6 space-y-6">
                {/* Publishing Rate Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Publishing Rate
                  </label>
                  <p className="mt-1 text-sm text-gray-500">
                    Select your preferred publishing rate
                  </p>
                  <div className="mt-2">
                    <div className="space-y-2">
                      {PUBLISHING_RATES.map((rate) => (
                        <label key={rate.rate} className="flex items-center">
                          <input
                            type="radio"
                            checked={publishingRate === rate.rate}
                            onChange={() => setPublishingRate(rate.rate)}
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {rate.description}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleStartPublishing}
                  disabled={isPublishing}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {isPublishing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Start Publishing
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {(isPublishing || publishedCount > 0 || failedCount > 0) && (
        <PublishingStatus
          articles={articles}
          publishedCount={publishedCount}
          failedCount={failedCount}
          publishingRate={publishingRate}
        />
      )}
    </div>
  );
}