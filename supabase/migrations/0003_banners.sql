create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  slot text not null,                 -- e.g., home_top, blog_sidebar, post_inline
  html text not null,                 -- raw HTML snippet (affiliates)
  active boolean default true,
  weight int default 1,               -- rotation weight
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.banners enable row level security;

do $$ begin
  create policy "public read banners" on public.banners for select using (active = true and (starts_at is null or now() >= starts_at) and (ends_at is null or now() <= ends_at));
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "auth write banners" on public.banners for all to authenticated using (true) with check (true);
exception when duplicate_object then null; end $$;


