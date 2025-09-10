import { getSupabaseServer } from '@/lib/supabase/server'

export default async function BannerRow({ slot, limit = 3, className = '' }: { slot: string; limit?: number; className?: string }) {
  const supabase = getSupabaseServer()
  const { data } = await supabase
    .from('banners')
    .select('id, html, max_width, weight, fixed, created_at, active, starts_at, ends_at')
    .eq('slot', slot)
    .eq('active', true)
    .order('weight', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (!data || data.length === 0) return null

  const cols = ["grid-cols-1"]
  if (data.length >= 2) cols.push("sm:grid-cols-2")
  if (data.length >= 3) cols.push("lg:grid-cols-3")

  return (
    <div className={`grid ${cols.join(' ')} gap-4 justify-items-center ${className}`}>
      {data.map((b: any) => {
        // For big top banners like 900x250 we keep aspect by constraining maxWidth and letting inner content scale
        const style: React.CSSProperties | undefined = b.fixed ? undefined : (b.max_width ? { maxWidth: `${b.max_width}px`, width: '100%', margin: '0 auto' } : { width: '100%' })
        return <div key={b.id} className="banner" style={style} dangerouslySetInnerHTML={{ __html: b.html }} />
      })}
    </div>
  )
}


