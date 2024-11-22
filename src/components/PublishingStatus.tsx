import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import type { GeneratedArticle } from '../types/content';

interface PublishingStatusProps {
  articles: GeneratedArticle[];
  publishedCount: number;
  failedCount: number;
  publishingRate: number;
}

export function PublishingStatus({
  articles,
  publishedCount,
  failedCount,
  publishingRate
}: PublishingStatusProps) {
  const totalArticles = articles.length;
  const progress = (publishedCount / totalArticles) * 100;
  const remainingArticles = totalArticles - publishedCount - failedCount;
  const estimatedDays = Math.ceil(remainingArticles / publishingRate);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium">Publishing Progress</h3>
      </div>

      <div className="p-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">
              {publishedCount.toLocaleString()} of {totalArticles.toLocaleString()} articles published
            </span>
            <span className="text-sm text-gray-500">
              {progress.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-sm font-medium text-gray-900">
                Published
              </span>
            </div>
            <p className="mt-1 text-2xl font-semibold text-green-600">
              {publishedCount.toLocaleString()}
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-900">
                Pending
              </span>
            </div>
            <p className="mt-1 text-2xl font-semibold text-blue-600">
              {remainingArticles.toLocaleString()}
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-sm font-medium text-gray-900">
                Failed
              </span>
            </div>
            <p className="mt-1 text-2xl font-semibold text-red-600">
              {failedCount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Estimated Time */}
        {remainingArticles > 0 && (
          <div className="text-sm text-gray-500">
            Estimated time remaining: {estimatedDays} {estimatedDays === 1 ? 'day' : 'days'} at {publishingRate} articles/day
          </div>
        )}
      </div>
    </div>
  );
}