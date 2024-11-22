import React, { useState } from 'react';
import { CreditCard, Calendar, AlertTriangle } from 'lucide-react';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { formatDate, formatCurrency } from '../utils/formatters';
import { PaymentMethodModal } from './PaymentMethodModal';

export function SubscriptionDetails() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { status, cancelSubscription } = useSubscriptionStore();

  if (!status?.currentPlan) return null;

  const { currentPlan, willRenew, nextBillingDate } = status;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium">Subscription Details</h3>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Current Plan */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Current Plan</h4>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-2xl font-bold">{currentPlan.name}</div>
              <div className="text-sm text-gray-500">
                {formatCurrency(currentPlan.price)} per {currentPlan.interval}
              </div>
            </div>
            {!willRenew && (
              <div className="flex items-center text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Cancels soon
              </div>
            )}
          </div>
        </div>

        {/* Next Billing */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Next Billing</h4>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-400 mr-2" />
            <span>{nextBillingDate ? formatDate(nextBillingDate) : 'N/A'}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-6 border-t">
          <button
            onClick={() => setShowPaymentModal(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Update Payment Method
          </button>
          
          {willRenew && (
            <button
              onClick={() => cancelSubscription()}
              className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>

      <PaymentMethodModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      />
    </div>
  );
}