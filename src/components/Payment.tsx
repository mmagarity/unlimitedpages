import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { STRIPE_PAYMENT_LINK } from '../config/constants';

const Payment = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Redirect to Stripe payment link with prefilled customer email
    const paymentUrl = `${STRIPE_PAYMENT_LINK}${user.email ? `?prefilled_email=${encodeURIComponent(user.email)}` : ''}`;
    window.location.href = paymentUrl;
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Redirecting to payment...
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please wait while we redirect you to our secure payment page.
        </p>
      </div>
    </div>
  );
};

export default Payment;
