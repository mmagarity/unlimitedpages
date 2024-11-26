-- Add export history and usage tracking

-- Create export_history table if it doesn't exist
create table if not exists public.export_history (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    export_date timestamptz default now() not null,
    article_count integer not null,
    export_format text not null check (export_format in ('json', 'markdown', 'html', 'docx')),
    status text not null check (status in ('completed', 'failed', 'in_progress')),
    error_message text,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

-- Add subscription details to profiles
alter table public.profiles 
    add column if not exists subscription_start_date timestamptz,
    add column if not exists subscription_end_date timestamptz,
    add column if not exists monthly_article_limit integer default 5000,
    add column if not exists articles_generated integer default 0,
    add column if not exists articles_remaining integer default 5000;

-- Create RLS policies for export_history
alter table public.export_history enable row level security;

create policy "Users can view their own export history"
    on public.export_history for select
    using (auth.uid() = user_id);

create policy "Users can insert their own export history"
    on public.export_history for insert
    with check (auth.uid() = user_id);

-- Create function to update articles remaining
create or replace function public.update_articles_remaining()
returns trigger
language plpgsql
security definer
as $$
begin
    -- Update articles generated and remaining
    update public.profiles
    set 
        articles_generated = articles_generated + new.article_count,
        articles_remaining = monthly_article_limit - (articles_generated + new.article_count)
    where id = new.user_id;
    return new;
end;
$$;

-- Create trigger to update articles remaining after export
create trigger after_export_history_insert
    after insert on public.export_history
    for each row
    execute function public.update_articles_remaining();

-- Create function to reset monthly article limits
create or replace function public.reset_monthly_article_limits()
returns void
language plpgsql
security definer
as $$
begin
    update public.profiles
    set 
        articles_generated = 0,
        articles_remaining = monthly_article_limit
    where subscription_status = 'active'
    and date_trunc('month', current_timestamp) > date_trunc('month', updated_at);
end;
$$;

-- Create subscription tiers table
create table if not exists public.subscription_tiers (
    id uuid default uuid_generate_v4() primary key,
    name text unique not null check (name in ('free', 'pro', 'enterprise')),
    monthly_price decimal(10,2) not null,
    monthly_article_limit integer not null,
    features jsonb not null,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

-- Insert default subscription tiers
insert into public.subscription_tiers (name, monthly_price, monthly_article_limit, features) values
    ('free', 0, 10, '["Basic article generation", "Standard templates", "Email support"]'::jsonb),
    ('pro', 49.99, 100, '["Advanced article generation", "Custom templates", "Priority support", "Export to multiple formats", "SEO optimization"]'::jsonb),
    ('enterprise', 199.99, 500, '["Unlimited article generation", "Custom templates", "24/7 Priority support", "All export formats", "Advanced SEO", "API access", "Custom branding"]'::jsonb)
on conflict (name) do nothing;
