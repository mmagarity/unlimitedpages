import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { exportToCSV } from '../utils/exportUtils';
import type { GeneratedArticle } from '../types/content';

interface ExportButtonProps {
  articles: GeneratedArticle[];
  onExportComplete?: () => void;
}

export function ExportButton({ articles, onExportComplete }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportToCSV(articles);
      if (onExportComplete) {
        onExportComplete();
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting || articles.length === 0}
      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
    >
      {isExporting ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="w-4 h-4 mr-2" />
          Export to CSV
        </>
      )}
    </button>
  );
}