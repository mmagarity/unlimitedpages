-- Create webflow_configs table
CREATE TABLE public.webflow_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    api_key TEXT NOT NULL,
    site_id TEXT NOT NULL,
    collection_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.webflow_configs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own webflow config"
    ON public.webflow_configs FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own webflow config"
    ON public.webflow_configs FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own webflow config"
    ON public.webflow_configs FOR UPDATE
    USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.webflow_configs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();