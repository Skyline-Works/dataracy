-- 1. Add Membership columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS membership_tier text DEFAULT 'FREE', -- 'FREE' or 'PREMIUM'
ADD COLUMN IF NOT EXISTS monthly_download_limit int DEFAULT 1, -- Default 1 for FREE
ADD COLUMN IF NOT EXISTS downloads_used_this_month int DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_download_month date DEFAULT CURRENT_DATE;

-- 2. Function to reset monthly downloads (if month changed)
-- This logic usually runs on app logic, but here's a helper or we handle it in frontend/API
-- For now, we will handle the check logic in the client/server action.

-- 3. Make sure 'DATA' type posts are only for ADMIN via Policy (Optional, but UI restriction is faster)
-- We will handle the restrictions in the UI code for now.
