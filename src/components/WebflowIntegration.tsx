import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '../hooks/useToast';

interface WebflowCredentials {
  apiKey: string;
  siteId: string;
  collectionId: string;
}

export function WebflowIntegration() {
  const { register, handleSubmit, formState: { errors } } = useForm<WebflowCredentials>();
  const [isValidating, setIsValidating] = useState(false);
  const { showToast } = useToast();

  const onSubmit = async (data: WebflowCredentials) => {
    setIsValidating(true);
    try {
      const response = await fetch('/api/webflow/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (result.isValid) {
        showToast({
          title: 'Success!',
          message: 'Webflow integration configured successfully',
          type: 'success'
        });
      } else {
        showToast({
          title: 'Validation Failed',
          message: 'Please check your credentials and try again',
          type: 'error'
        });
      }
    } catch (error) {
      showToast({
        title: 'Error',
        message: 'Failed to validate Webflow credentials',
        type: 'error'
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Webflow Integration Setup</h2>
        
        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <h3 className="font-semibold mb-2">How to Get Your Webflow Credentials:</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>API Key:</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>Go to your Webflow account settings</li>
                <li>Navigate to Workspace settings → Integrations</li>
                <li>Generate a new API key with read and write access</li>
              </ul>
            </li>
            <li>
              <strong>Site ID:</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>Open your Webflow project</li>
                <li>Go to Project Settings → General</li>
                <li>Copy the Site ID from the bottom of the page</li>
              </ul>
            </li>
            <li>
              <strong>Collection ID:</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>In your Webflow project, go to the CMS tab</li>
                <li>Select the collection where articles will be published</li>
                <li>Click on Collection Settings</li>
                <li>Copy the Collection ID from the API tab</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            API Key
          </label>
          <input
            type="password"
            {...register('apiKey', { required: 'API Key is required' })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your Webflow API key"
          />
          {errors.apiKey && (
            <p className="mt-1 text-sm text-red-600">{errors.apiKey.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site ID
          </label>
          <input
            type="text"
            {...register('siteId', { required: 'Site ID is required' })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your Webflow site ID"
          />
          {errors.siteId && (
            <p className="mt-1 text-sm text-red-600">{errors.siteId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Collection ID
          </label>
          <input
            type="text"
            {...register('collectionId', { required: 'Collection ID is required' })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your Webflow collection ID"
          />
          {errors.collectionId && (
            <p className="mt-1 text-sm text-red-600">{errors.collectionId.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            type="submit"
            disabled={isValidating}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
              isValidating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {isValidating ? 'Validating...' : 'Validate & Save'}
          </button>
          
          <a
            href="https://university.webflow.com/lesson/intro-to-the-webflow-api"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            Need help?
          </a>
        </div>
      </form>
    </div>
  );
}
