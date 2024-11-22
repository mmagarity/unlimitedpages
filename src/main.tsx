import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { validateEnv } from './utils/validateEnv';
import theme from './theme';

// Validate environment variables
try {
  validateEnv();
} catch (error) {
  console.error('Environment validation failed:', error);
  if (process.env.NODE_ENV === 'production') {
    console.warn('Continuing despite environment validation failure in production');
  } else {
    throw error;
  }
}

// Get the root element
const rootElement = document.getElementById('root');

// Ensure root element exists
if (!rootElement) {
  throw new Error(
    'Root element not found. Please add a <div id="root"></div> to your HTML'
  );
}

// Create root and render app
console.log('Creating root element');

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);