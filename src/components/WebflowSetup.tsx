import React, { useState, useEffect } from 'react';
import { Globe, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useWebflowStore } from '../store/webflowStore';
import { WebflowService } from '../services/WebflowService';

export function WebflowSetup() {
  const { config, setConfig, disconnect, loading, error } = useWebflowStore();
  const [formData, setFormData] = useState({
    apiKey: '',
    siteId: '',
    collectionId: ''
  });
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    if (config) {
      setFormData({
        apiKey: config.apiKey,
        siteId: config.siteId,
        collectionId: config.collectionId
      });
    }
  }, [config]);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidating(true);

    try {
      const isValid = await WebflowService.validateCredentials(formData);
      if (isValid) {
        await setConfig({ ...formData, isConnected: true });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      console.error('Connection error:', error);
    } finally {
      setValidating(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Webflow Integration</h2>
        <p className="mt-1 text-sm text-gray-500">
          Connect your Webflow site to enable automatic content publishing
        </p>
      </div>

      <div className="p-6">
        {/* Connection Status */}
        <div className={`p-4 rounded-lg mb-6 ${
          config?.isConnected ? 'bg-green-50' : 'bg-yellow-50'
        }`}>
          <div className="flex items-center">
            {config?.isConnected ? (
              <Check className="w-5 h-5 text-green-500 mr-3" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-500 mr-3" />
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                {config?.isConnected ? 'Connected to Webflow' : 'Not Connected'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {config?.isConnected 
                  ? 'Your Webflow site is connected and ready to receive content'
                  : 'Connect your Webflow site to start publishing content'}
              </p>
            </div>
          </div>
        </div>

        {/* Configuration Form */}
        <form onSubmit={handleConnect} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Webflow API Key
            </label>
            <input
              type="password"
              value={formData.apiKey}
              onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Find this in your Webflow account settings under API Access
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Site ID
            </label>
            <input
              type="text"
              value={formData.siteId}
              onChange={(e) => setFormData({ ...formData, siteId: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Collection ID
            </label>
            <input
              type="text"
              value={formData.collectionId}
              onChange={(e) => setFormData({ ...formData, collectionId: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-4">
            {config?.isConnected && (
              <button
                type="button"
                onClick={disconnect}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
              >
                Disconnect
              </button>
            )}
            <button
              type="submit"
              disabled={validating || loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
            >
              {validating || loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Globe className="w-4 h-4 mr-2" />
                  {config?.isConnected ? 'Update Connection' : 'Connect to Webflow'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}