-- Add subscription record for paid user
-- First, delete any existing subscriptions for this user
delete from public.subscriptions
where user_id = 'de4f10e6-93de-4b11-8d38-825d737e97e2';

-- Then insert the new subscription
insert into
  public.subscriptions (
    id,
    user_id,
    status,
    price_id,
    quantity,
    cancel_at_period_end,
    created,
    current_period_start,
    current_period_end,
    ended_at,
    cancel_at,
    canceled_at,
    trial_start,
    trial_end
  )
values
  (
    uuid_generate_v4(),
    'de4f10e6-93de-4b11-8d38-825d737e97e2',
    'active',
    'price_1OjGVTDO2Wb6nKoP8Uu8j5Ys', -- Pro tier price ID
    1,
    false,
    now(),
    now(),
    now() + interval '1 year',
    null,
    null,
    null,
    null,
    null
  );
