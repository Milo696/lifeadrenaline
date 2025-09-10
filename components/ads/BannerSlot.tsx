import { getSupabaseServer } from '@/lib/supabase/server'

export default async function BannerSlot({ slot, className = '' }: { slot: string; className?: string }) {
  const supabase = getSupabaseServer()
  const { data } = await supabase
    .from('banners')
    .select('id, html, weight, max_width, fixed')
    .eq('slot', slot)
    .eq('active', true)
  if (!data || data.length === 0) return null
  // naive rotation by weight
  const pool = data.flatMap((b: any) => Array(Math.max(1, b.weight)).fill(b))
  const banner = pool[Math.floor(Math.random() * pool.length)]
  const style: React.CSSProperties | undefined = banner.fixed
    ? undefined
    : (banner.max_width ? { maxWidth: `${banner.max_width}px`, width: '100%', margin: '0 auto' } : { width: '100%' })
  return <div className={`banner ${className}`} style={style} dangerouslySetInnerHTML={{ __html: banner.html }} />
}


