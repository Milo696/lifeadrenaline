# ThrillHub

Full-stack Next.js (App Router) lifestyle blog with Supabase (auth, Postgres, storage) and Tailwind CSS. Admin dashboard for posts and categories. Affiliate HTML supported in posts.

## Tech
- Next.js 14 App Router
- Tailwind CSS
- Supabase (Auth, Postgres, Storage)
- React Quill editor, Markdown rendering

## Environment
Create `.env.local` from `.env.example`:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=optional-service-role
NEXT_PUBLIC_SUPABASE_BUCKET=images
```

## Database schema (SQL)
Run in Supabase SQL editor:

```sql
create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

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

-- Policies (public read, auth required for write)
create policy if not exists "Public read posts" on public.posts for select using (true);
create policy if not exists "Admin write posts" on public.posts for all to authenticated using (auth.role() = 'authenticated');

create policy if not exists "Public read categories" on public.categories for select using (true);
create policy if not exists "Admin write categories" on public.categories for all to authenticated using (auth.role() = 'authenticated');

create policy if not exists "Public read comments" on public.comments for select using (true);
create policy if not exists "Auth write comments" on public.comments for insert to authenticated with check (true);
```

Create a public storage bucket (Settings → Storage):
- Bucket name: `images`
- Public access: on

## Local dev
```
pnpm i
pnpm dev
```

On Windows PowerShell:
```
$env:NODE_OPTIONS="--max-old-space-size=4096"; pnpm dev
```

## Structure
- `app/` App Router routes, `admin/` dashboard
- `components/` UI + admin forms
- `lib/` Supabase clients

## Deployment (Vercel)
- Import repo in Vercel
- Set env vars from `.env.local`
- Build command: `next build`
- Output: default

## Notes
- Affiliate HTML is rendered via `dangerouslySetInnerHTML` in post page.
- To restrict admin access further, add email allowlist checks on server.
