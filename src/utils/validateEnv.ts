/**
 * Validates required environment variables and provides helpful error messages
 * @throws Error if required environment variables are missing
 */
export function validateEnv() {
  // Core required variables
  const REQUIRED_ENV_VARS = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ] as const;

  // Optional variables that enhance functionality
  const OPTIONAL_ENV_VARS = [
    'VITE_STRIPE_PUBLIC_KEY',
    'VITE_PERPLEXITY_API_KEY',
    'VITE_STRIPE_PAYMENT_LINK'
  ] as const;

  // In production, we'll only warn about missing variables
  const isProd = import.meta.env.PROD;

  // Check for required variables
  const missing = REQUIRED_ENV_VARS.filter(
    key => !import.meta.env[key]
  );

  if (missing.length > 0) {
    const message = `Missing required environment variables:\n${missing.join('\n')}\n\n` +
      'Please make sure these variables are set in your .env file.';
    
    if (isProd) {
      console.error(message);
    } else {
      throw new Error(message);
    }
  }

  // Log warning for missing optional variables
  const missingOptional = OPTIONAL_ENV_VARS.filter(
    key => !import.meta.env[key]
  );

  if (missingOptional.length > 0) {
    console.warn(
      'Missing optional environment variables:\n' +
      missingOptional.join('\n') +
      '\nSome features may be limited.'
    );
  }

  // Validate URL format for Supabase URL if it exists
  if (import.meta.env.VITE_SUPABASE_URL) {
    try {
      new URL(import.meta.env.VITE_SUPABASE_URL);
    } catch (error) {
      const message = 'VITE_SUPABASE_URL is not a valid URL';
      if (isProd) {
        console.error(message);
      } else {
        throw new Error(message);
      }
    }
  }
}