-- FIX: SYNC AUTH USERS TO PROFILES
-- This script backfills the 'profiles' table from 'auth.users' to fix FK errors.

insert into public.profiles (id, email, display_name, avatar_url, created_at, updated_at)
select 
    id, 
    email, 
    raw_user_meta_data->>'full_name', 
    raw_user_meta_data->>'avatar_url',
    created_at,
    last_sign_in_at
from auth.users
on conflict (id) do nothing;

-- Verify the count
select count(*) as auth_users from auth.users;
select count(*) as profile_users from public.profiles;
