import React from 'react';

interface BatchGenerationProgressProps {
  total: number;
  completed: number;
  estimatedTimeRemaining: number;
}

export function BatchGenerationProgress({ total, completed, estimatedTimeRemaining }: BatchGenerationProgressProps) {
  const progress = (completed / total) * 100;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Generating Content</h2>
        
        <div className="mb-4">
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>Completed: {completed} of {total} articles</p>
          <p>Estimated time remaining: {Math.ceil(estimatedTimeRemaining / 60)} minutes</p>
          <div className="mt-4 space-y-2">
            <p className="text-xs">
              Note: This process may take several minutes. You can leave this page and we'll notify you when it's done.
            </p>
            <p className="text-xs text-blue-600">
              🤖 AI is generating and humanizing content to ensure natural, engaging articles...
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="animate-pulse flex space-x-1">
                <span>Humanizing</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
