-- Add profile for paid user
INSERT INTO public.profiles (id, email, subscription_status, subscription_tier, created_at, updated_at)
VALUES (
    'de4f10e6-93de-4b11-8d38-825d737e97e2',
    'magarity.mark@gmail.com',
    'active',
    'pro',
    NOW(),
    NOW()
)
ON CONFLICT (id) DO UPDATE 
SET subscription_status = 'active',
    subscription_tier = 'pro',
    updated_at = NOW();
