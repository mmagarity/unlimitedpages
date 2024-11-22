# UnlimitedPages.io Setup Guide

## Required API Keys and Setup

### 1. Supabase Setup
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get required keys from Settings > API:
   - Project URL (`VITE_SUPABASE_URL`)
   - Anon public key (`VITE_SUPABASE_ANON_KEY`)
   - Service role key (`VITE_SUPABASE_SERVICE_ROLE`)
   - JWT Secret (`VITE_SUPABASE_JWT_SECRET`)
4. Run database migrations:
   - Go to SQL Editor in Supabase Dashboard
   - Copy content from `supabase/migrations/20240315000000_initial_schema.sql`
   - Run the SQL script

### 2. Stripe Setup
1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from Developers > API keys:
   - Publishable key (`VITE_STRIPE_PUBLIC_KEY`)
   - Secret key (`VITE_STRIPE_SECRET_KEY`)
3. Create product and price:
   - Go to Products > Add Product
   - Set price to $60/month
   - Copy Price ID (`VITE_STRIPE_BASIC_PRICE_ID`)
4. Setup webhook:
   - Go to Developers > Webhooks
   - Add endpoint: `https://your-domain.com/api/webhooks/stripe`
   - Copy Signing Secret (`VITE_STRIPE_WEBHOOK_SECRET`)

### 3. Perplexity Setup
1. Get API key from [perplexity.ai](https://perplexity.ai)
2. Copy API key (`VITE_PERPLEXITY_API_KEY`)

### 4. Environment Setup
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your API keys in `.env`

3. Install dependencies and start development server:
   ```bash
   npm install
   npm run dev
   ```

## Webflow Integration (For Users)
Users will connect their own Webflow accounts through the app:

1. Get API key from Webflow Account Settings > Integrations
2. Get Site ID from Project Settings
3. Get Collection ID from CMS Collection settings
4. Enter credentials in app Settings > Webflow Integration

## Database Schema
The following tables are created in Supabase:

- `customers`: Links Stripe customers to users
- `subscriptions`: Stores subscription data
- `usage_logs`: Tracks article generation usage
- `usage_limits`: Stores user limits
- `webflow_configs`: Stores Webflow integration settings

## Development Notes

### Local Development
- Default development values are provided when env vars are missing
- Supabase runs locally on `http://localhost:54321`
- Use Stripe test mode keys for development

### Production Deployment
- Ensure all environment variables are set
- Use production API keys
- Enable Stripe webhooks
- Set up proper CORS and security headers