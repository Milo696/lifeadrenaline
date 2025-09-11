alter table public.posts add column if not exists banner_style text default 'auto';
-- auto, fixed, responsive, square, vertical, horizontal
