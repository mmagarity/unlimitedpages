import React, { useState } from 'react';
import { BarChart, CreditCard, Clock, ArrowUpRight, XCircle } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import { SUBSCRIPTION_TIERS } from '../config/subscription';

export function UsageBilling() {
  const { usage, limits, isLoading } = useSubscription('current-user');
  const currentPlan = SUBSCRIPTION_TIERS.basic;
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const formatNumber = (num: number) => new Intl.NumberFormat().format(num);

  const billingHistory = [
    { date: 'Feb 15, 2024', amount: 60, status: 'Paid', invoice: '#INV-001' },
    { date: 'Jan 15, 2024', amount: 60, status: 'Paid', invoice: '#INV-002' },
    { date: 'Dec 15, 2023', amount: 60, status: 'Paid', invoice: '#INV-003' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        {/* Current Plan */}
        <div className="col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Current Plan</h2>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{currentPlan.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Billed monthly • Next billing date: March 15, 2024
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">
                    ${currentPlan.price}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">per month</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setShowUpdateModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Update Payment Method
                </button>
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Overview */}
        <div>
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Usage Overview</h2>
            </div>
            <div className="p-6">
              {!isLoading && usage && limits && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Total Articles
                    </h4>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatNumber(usage.totalArticlesGenerated)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      of {formatNumber(limits.monthlyArticles)} available
                    </div>
                    <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          width: `${(usage.totalArticlesGenerated / limits.monthlyArticles) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Base Articles
                    </h4>
                    <div className="text-2xl font-bold text-gray-900">
                      {usage.baseArticlesUsed}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      of {limits.baseArticles} available
                    </div>
                    <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          width: `${(usage.baseArticlesUsed / limits.baseArticles) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Images Generated
                    </h4>
                    <div className="text-2xl font-bold text-gray-900">
                      {usage.imagesGenerated}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      of {limits.totalImages} available
                    </div>
                    <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          width: `${(usage.imagesGenerated / limits.totalImages) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Billing History</h2>
        </div>
        <div className="p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {billingHistory.map((bill, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bill.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${bill.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                    <a href="#">{bill.invoice}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cancel Subscription</h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to cancel your subscription? You'll lose access to all features at the end of your current billing period.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border rounded-md"
              >
                Keep Subscription
              </button>
              <button
                onClick={() => {
                  // Handle cancellation
                  setShowCancelModal(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Payment Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Update Payment Method</h3>
            {/* Stripe Elements would go here in production */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiration</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CVC</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle payment update
                  setShowUpdateModal(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Update Payment Method
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}