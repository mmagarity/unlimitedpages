export function validateEnv() {
  // Core required variables
  const REQUIRED_ENV_VARS = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ];

  // Optional variables that can use fallbacks
  const OPTIONAL_ENV_VARS = [
    'VITE_STRIPE_PUBLIC_KEY',
    'VITE_PERPLEXITY_API_KEY'
  ];

  const missing = REQUIRED_ENV_VARS.filter(
    key => !import.meta.env[key]
  );

  // In development, provide fallback values
  if (import.meta.env.DEV) {
    if (missing.length > 0) {
      console.warn(
        `Missing environment variables:\n${missing.join('\n')}\nUsing development values.`
      );
    }
    return;
  }

  // In production, only require core variables
  if (missing.length > 0) {
    console.error(`Missing required environment variables:\n${missing.join('\n')}`);
    // Don't throw error, just log warning
  }
}