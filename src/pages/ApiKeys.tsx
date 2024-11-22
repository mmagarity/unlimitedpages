import React, { useState } from 'react';
import { Key, Copy, Eye, EyeOff, RefreshCw } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
}

export function ApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production Key',
      key: 'up_prod_xxxxxxxxxxxxxxxxxxxx',
      createdAt: '2024-02-15',
      lastUsed: '2024-02-20'
    }
  ]);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [newKeyName, setNewKeyName] = useState('');

  const toggleKeyVisibility = (id: string) => {
    setShowKey(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In production, add a toast notification
  };

  const generateNewKey = () => {
    if (!newKeyName.trim()) return;

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `up_prod_${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: '-'
    };

    setKeys(prev => [...prev, newKey]);
    setNewKeyName('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">API Keys</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your API keys for programmatic access
          </p>
        </div>

        <div className="p-6">
          {/* Generate New Key */}
          <div className="mb-6">
            <div className="flex space-x-4">
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Enter key name"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                onClick={generateNewKey}
                disabled={!newKeyName.trim()}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
              >
                Generate New Key
              </button>
            </div>
          </div>

          {/* API Keys List */}
          <div className="space-y-4">
            {keys.map((key) => (
              <div
                key={key.id}
                className="p-4 border rounded-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Key className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="font-medium text-gray-900">{key.name}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Created: {key.createdAt}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-1 font-mono text-sm bg-gray-50 p-2 rounded">
                    {showKey[key.id] ? key.key : '•'.repeat(key.key.length)}
                  </div>
                  <button
                    onClick={() => toggleKeyVisibility(key.id)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    {showKey[key.id] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => copyToClipboard(key.key)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-sm text-gray-500">
                  Last used: {key.lastUsed}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}