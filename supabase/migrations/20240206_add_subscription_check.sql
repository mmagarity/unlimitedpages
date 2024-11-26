-- Add subscription check function
create or replace function public.check_subscription(user_email text)
returns table (
    has_subscription boolean,
    subscription_status text,
    subscription_end timestamptz,
    price_id text
)
language plpgsql
security definer
set search_path = public
as $$
begin
    return query
    select 
        true as has_subscription,
        s.status as subscription_status,
        s.current_period_end as subscription_end,
        s.price_id
    from auth.users u
    join public.subscriptions s on s.user_id = u.id
    where u.email = user_email
    and s.status = 'active'
    and s.current_period_end > now();
end;
$$;

-- Grant execute permission
grant execute on function public.check_subscription(text) to authenticated, anon;

-- Create index for performance
create index if not exists subscriptions_user_id_status_idx 
on public.subscriptions(user_id, status);
