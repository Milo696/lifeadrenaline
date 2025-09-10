-- Enable extension for UUID generation if needed
create extension if not exists pgcrypto;

-- Categories
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

-- Posts
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text,
  content text not null,
  category text not null,
  author text,
  featured boolean default false,
  affiliate_html text,
  featured_image text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Comments
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete cascade,
  author text,
  text text not null,
  created_at timestamptz default now()
);

-- RLS
alter table public.posts enable row level security;
alter table public.categories enable row level security;
alter table public.comments enable row level security;

-- Policies (idempotent)
do $$ begin
  create policy "Public read posts" on public.posts for select using (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Admin write posts" on public.posts for all to authenticated using (auth.role() = 'authenticated');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Public read categories" on public.categories for select using (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Admin write categories" on public.categories for all to authenticated using (auth.role() = 'authenticated');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Public read comments" on public.comments for select using (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Auth write comments" on public.comments for insert to authenticated with check (true);
exception when duplicate_object then null; end $$;


