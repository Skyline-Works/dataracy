-- DEV ONLY: Make ALL existing users ADMIN (Nuclear Option for fixing permission issues)
UPDATE public.profiles
SET role = 'ADMIN';

-- Ensure the update is committed and visible
-- (RLS policies are already set in setup_admin.sql, so they check for 'ADMIN' role)
