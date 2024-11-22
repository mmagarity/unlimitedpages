// API Configuration
export const API_CONFIG = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    serviceRole: import.meta.env.VITE_SUPABASE_SERVICE_ROLE || '',
    jwtSecret: import.meta.env.VITE_SUPABASE_JWT_SECRET || ''
  },
  stripe: {
    publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',
    secretKey: import.meta.env.VITE_STRIPE_SECRET_KEY || '',
    webhookSecret: import.meta.env.VITE_STRIPE_WEBHOOK_SECRET || '',
    prices: {
      basic: import.meta.env.VITE_STRIPE_BASIC_PRICE_ID || ''
    }
  },
  perplexity: {
    apiKey: import.meta.env.VITE_PERPLEXITY_API_KEY || '',
    endpoint: 'https://api.perplexity.ai/v1/generate',
    model: 'mixtral-8x7b'
  }
} as const;