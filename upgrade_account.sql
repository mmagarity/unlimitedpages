-- Upgrade account to paid status
UPDATE public.profiles
SET subscription_status = 'active',
    subscription_tier = 'pro',
    credits = 5000
WHERE id = auth.uid();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.profiles TO authenticated;
