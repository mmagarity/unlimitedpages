import React from 'react';
import { ExportHistory as ExportHistoryComponent } from '../components/ExportHistory';

export function ExportHistory() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Export History</h1>
        <div className="mt-6">
          <ExportHistoryComponent />
        </div>
      </div>
    </div>
  );
}
