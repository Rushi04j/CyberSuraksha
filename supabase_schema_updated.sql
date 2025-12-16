-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create Enum for Complaint Status
create type complaint_status as enum ('pending', 'in-progress', 'resolved', 'rejected');

-- Create Enum for Report Category
create type report_category as enum ('Financial', 'Social Media', 'Other', 'Cyberbullying', 'Hacking');

-- Create Profiles table (users)
-- dependent on Supabase Auth (auth.users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  role text check (role in ('citizen', 'police')) default 'citizen',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Complaints table
create table public.complaints (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id), -- Nullable for anonymous reports
  title text not null,
  description text not null,
  category text not null, -- using text to be flexible or use report_category enum if strict
  is_urgent boolean default false,
  status text default 'Pending', -- matching Types.ts: 'Pending' | 'In Progress' | 'Resolved' | 'Closed'
  location text,
  incident_date text, -- Using text to store YYYY-MM-DD easily
  evidence_urls text[], -- Array of strings
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.complaints enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Policies for Complaints
-- 1. Citizens can view their own complaints
create policy "Citizens can view their own complaints"
  on complaints for select
  using ( auth.uid() = user_id );

-- 2. Police can view ALL complaints
create policy "Police can view all complaints"
  on complaints for select
  using ( 
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'police'
    )
  );

-- 3. Citizens can insert complaints (Authenticated)
create policy "Citizens can insert complaints"
  on complaints for insert
  with check ( auth.uid() = user_id );

-- 4. Allow anonymous inserts (Public)
-- This requires the 'anon' role (Supabase default) to have insert access
create policy "Public can insert anonymous complaints"
  on complaints for insert
  with check ( user_id is null );

-- 5. Police can update status of complaints
create policy "Police can update complaints"
  on complaints for update
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'police'
    )
  );


-- Function to handle new user signup trigger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'citizen');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
