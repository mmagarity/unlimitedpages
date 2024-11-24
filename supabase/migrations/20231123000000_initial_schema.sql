-- Initial schema for Unlimited Pages

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- Clean up any existing objects
do $$ 
begin
    -- Drop triggers if they exist
    drop trigger if exists on_auth_user_created on auth.users;
    
    if exists (select 1 from pg_tables where schemaname = 'public' and tablename = 'profiles') then
        drop trigger if exists on_profiles_updated on public.profiles;
    end if;
    
    -- Drop functions if they exist
    drop function if exists public.handle_new_user() cascade;
    drop function if exists public.handle_updated_at() cascade;
    drop function if exists public.check_user_exists(text) cascade;
    drop function if exists public.update_profile(uuid, text, text) cascade;
    
    -- Drop policies if the table exists
    if exists (select 1 from pg_tables where schemaname = 'public' and tablename = 'profiles') then
        drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
        drop policy if exists "Users can insert their own profile." on public.profiles;
        drop policy if exists "Users can update own profile." on public.profiles;
    end if;
    
    -- Drop table if it exists
    drop table if exists public.profiles cascade;
end $$;

-- Create profiles table
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text unique not null,
    full_name text,
    avatar_url text,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null,
    stripe_customer_id text unique,
    subscription_status text default 'inactive' check (subscription_status in ('active', 'inactive', 'trialing')),
    subscription_tier text default 'free' check (subscription_tier in ('free', 'pro', 'enterprise')),
    credits integer default 0
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Create RLS Policies
create policy "Public profiles are viewable by everyone."
    on public.profiles for select
    using ( true );

create policy "Users can insert their own profile."
    on public.profiles for insert
    with check ( auth.uid() = id );

create policy "Users can update own profile."
    on public.profiles for update
    using ( auth.uid() = id );

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

-- Create updated_at trigger
create trigger on_profiles_updated
    before update on public.profiles
    for each row
    execute function public.handle_updated_at();

-- Create function to handle new user registration
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (id, email, created_at, updated_at)
    values (new.id, new.email, new.created_at, new.created_at);
    return new;
end;
$$;

-- Create trigger for new user registration
create trigger on_auth_user_created
    after insert on auth.users
    for each row
    execute function public.handle_new_user();

-- Create helper functions
create or replace function public.check_user_exists(user_email text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
    return exists (
        select 1
        from auth.users
        where email = user_email
    );
end;
$$;

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant all on public.profiles to anon, authenticated;

-- Note: removed profiles_id_seq grant as we're using uuid primary key

grant execute on function public.check_user_exists(text) to anon, authenticated;
grant execute on function public.handle_new_user() to anon, authenticated;
grant execute on function public.handle_updated_at() to anon, authenticated;

-- Create indexes
create index profiles_email_idx on public.profiles (email);
create index profiles_subscription_status_idx on public.profiles (subscription_status);
create index profiles_subscription_tier_idx on public.profiles (subscription_tier);

-- Content Management Tables

-- Article Types table
create table public.article_types (
    id uuid default uuid_generate_v4() primary key,
    name text not null unique,
    description text,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

-- Generated Content table
create table public.generated_content (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    article_type_id uuid references public.article_types(id) on delete restrict,
    base_headline text not null,
    variation_type text check (variation_type in ('location', 'demographic', 'year', 'base')) not null,
    variation_value text,
    title text not null,
    content text not null,
    metadata jsonb default '{}'::jsonb,
    seo_data jsonb default '{}'::jsonb,
    schema_data jsonb default '{}'::jsonb,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

-- Enable RLS on new tables
alter table public.article_types enable row level security;
alter table public.generated_content enable row level security;

-- RLS Policies for article_types
create policy "Article types are viewable by everyone."
    on public.article_types for select
    using ( true );

create policy "Only authenticated users can insert article types."
    on public.article_types for insert
    with check ( auth.role() = 'authenticated' );

-- RLS Policies for generated_content
create policy "Users can view their own generated content."
    on public.generated_content for select
    using ( auth.uid() = user_id );

create policy "Users can insert their own generated content."
    on public.generated_content for insert
    with check ( auth.uid() = user_id );

create policy "Users can update their own generated content."
    on public.generated_content for update
    using ( auth.uid() = user_id );

create policy "Users can delete their own generated content."
    on public.generated_content for delete
    using ( auth.uid() = user_id );

-- Create updated_at triggers for new tables
create trigger on_article_types_updated
    before update on public.article_types
    for each row
    execute function public.handle_updated_at();

create trigger on_generated_content_updated
    before update on public.generated_content
    for each row
    execute function public.handle_updated_at();

-- Create indexes for performance
create index generated_content_user_id_idx on public.generated_content (user_id);
create index generated_content_article_type_id_idx on public.generated_content (article_type_id);
create index generated_content_variation_type_idx on public.generated_content (variation_type);
create index generated_content_created_at_idx on public.generated_content (created_at);

-- Create CSV export function
create or replace function public.export_generated_content_csv(
    user_id_param uuid,
    start_date timestamptz default '-infinity'::timestamptz,
    end_date timestamptz default 'infinity'::timestamptz
)
returns table (
    content_id uuid,
    article_type text,
    base_headline text,
    variation_type text,
    variation_value text,
    title text,
    content text,
    metadata jsonb,
    seo_data jsonb,
    schema_data jsonb,
    created_at timestamptz,
    updated_at timestamptz
)
language sql
security definer
set search_path = public
as $$
    select 
        gc.id as content_id,
        at.name as article_type,
        gc.base_headline,
        gc.variation_type,
        gc.variation_value,
        gc.title,
        gc.content,
        gc.metadata,
        gc.seo_data,
        gc.schema_data,
        gc.created_at,
        gc.updated_at
    from public.generated_content gc
    left join public.article_types at on gc.article_type_id = at.id
    where gc.user_id = user_id_param
    and gc.created_at >= start_date
    and gc.created_at <= end_date
    order by gc.created_at desc;
$$;

-- Grant permissions for new tables and functions
grant usage on schema public to anon, authenticated;
grant all on public.article_types to authenticated;
grant all on public.generated_content to authenticated;
grant execute on function public.export_generated_content_csv to authenticated;

-- Export History Tables
create table public.export_history (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    file_name text not null,
    file_url text not null,
    article_count integer not null,
    date_range_start timestamptz,
    date_range_end timestamptz,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null,
    status text default 'completed' check (status in ('completed', 'failed'))
);

-- Enable RLS on export_history
alter table public.export_history enable row level security;

-- RLS Policies for export_history
create policy "Users can view their own export history."
    on public.export_history for select
    using ( auth.uid() = user_id );

create policy "Users can insert their own export history."
    on public.export_history for insert
    with check ( auth.uid() = user_id );

-- Create updated_at trigger for export_history
create trigger on_export_history_updated
    before update on public.export_history
    for each row
    execute function public.handle_updated_at();

-- Create index for export_history
create index export_history_user_id_idx on public.export_history (user_id);
create index export_history_created_at_idx on public.export_history (created_at);

-- Grant permissions for export_history
grant all on public.export_history to authenticated;

-- Create subscriptions table
create table public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null,
  price_id text,
  quantity integer,
  cancel_at_period_end boolean,
  cancel_at timestamptz,
  canceled_at timestamptz,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created timestamptz not null default timezone('utc'::text, now()),
  ended_at timestamptz,
  trial_start timestamptz,
  trial_end timestamptz,
  unique(stripe_subscription_id)
);

comment on table public.subscriptions is 'Stores subscription data from Stripe.';

-- RLS for subscriptions
alter table public.subscriptions enable row level security;

create policy "Users can view their own subscriptions."
  on public.subscriptions for select
  using ( auth.uid() = user_id );

-- Create subscription_items table for usage tracking
create table public.subscription_items (
  id uuid primary key default uuid_generate_v4(),
  subscription_id uuid references public.subscriptions not null,
  stripe_subscription_item_id text,
  stripe_price_id text,
  quantity integer,
  created timestamptz not null default timezone('utc'::text, now()),
  unique(stripe_subscription_item_id)
);

comment on table public.subscription_items is 'Stores subscription items data from Stripe.';

-- RLS for subscription_items
alter table public.subscription_items enable row level security;

create policy "Users can view their own subscription items."
  on public.subscription_items for select
  using (
    exists (
      select 1 from public.subscriptions s
      where s.id = subscription_items.subscription_id
      and s.user_id = auth.uid()
    )
  );

-- Create usage_records table
create table public.usage_records (
  id uuid primary key default uuid_generate_v4(),
  subscription_item_id uuid references public.subscription_items not null,
  quantity integer not null,
  timestamp timestamptz not null default timezone('utc'::text, now()),
  action text not null,
  status text not null default 'pending'
);

comment on table public.usage_records is 'Stores usage records for metered billing.';

-- RLS for usage_records
alter table public.usage_records enable row level security;

create policy "Users can view their own usage records."
  on public.usage_records for select
  using (
    exists (
      select 1 from public.subscription_items si
      join public.subscriptions s on s.id = si.subscription_id
      where si.id = usage_records.subscription_item_id
      and s.user_id = auth.uid()
    )
  );
