import { loadStripe } from '@stripe/stripe-js';

// For development in Bolt environment, use a placeholder key
const stripePublicKey = 'pk_test_placeholder';

let stripePromise: Promise<any>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublicKey);
  }
  return stripePromise;
};