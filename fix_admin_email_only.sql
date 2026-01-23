-- 1. Reset everyone to 'USER' first
UPDATE public.profiles
SET role = 'USER'
WHERE role = 'ADMIN';

-- 2. Promote ONLY the specific email to 'ADMIN'
-- Corrected: Added single quotes around the email address
UPDATE public.profiles
SET role = 'ADMIN'
WHERE email = 'skylineworks.official@gmail.com';
