-- Likes table: anonymous by IP+post or by user_id
create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete cascade,
  user_id uuid,
  ip text,
  created_at timestamptz default now()
);

create index if not exists likes_post_idx on public.likes(post_id);

alter table public.likes enable row level security;

do $$ begin
  create policy "Public read likes" on public.likes for select using (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Anyone insert likes" on public.likes for insert with check (true);
exception when duplicate_object then null; end $$;

-- Subscribers table
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

alter table public.subscribers enable row level security;

do $$ begin
  create policy "Admin read subscribers" on public.subscribers for select to authenticated using (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Public insert subscribers" on public.subscribers for insert with check (true);
exception when duplicate_object then null; end $$;


