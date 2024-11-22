import React from 'react';
import { BarChart2, AlertCircle } from 'lucide-react';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { formatNumber } from '../utils/formatters';

export function UsageStats() {
  const { status } = useSubscriptionStore();

  if (!status) return null;

  const { usage, currentPlan } = status;
  const usagePercentage = (usage.totalArticles / currentPlan?.limits.monthlyArticles!) * 100;
  const isNearLimit = usagePercentage >= 80;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Usage Statistics</h3>
        <BarChart2 className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Monthly Articles</span>
            <span className="text-sm text-gray-500">
              {formatNumber(usage.totalArticles)} / {formatNumber(currentPlan?.limits.monthlyArticles!)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                isNearLimit ? 'bg-yellow-500' : 'bg-blue-600'
              }`}
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </div>
          {isNearLimit && (
            <div className="flex items-center mt-2 text-sm text-yellow-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              Approaching usage limit
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Generated</div>
            <div className="text-xl font-semibold">{formatNumber(usage.generatedArticles)}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Remaining</div>
            <div className="text-xl font-semibold">{formatNumber(usage.remainingArticles)}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Success Rate</div>
            <div className="text-xl font-semibold">
              {((usage.generatedArticles / usage.totalArticles) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}