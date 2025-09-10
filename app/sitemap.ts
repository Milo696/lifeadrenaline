import { getSupabaseServer } from '@/lib/supabase/server'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://lifeadrenaline.vercel.app'
  const supabase = getSupabaseServer()
  const { data: posts } = await supabase.from('posts').select('id,updated_at')
  const postUrls = (posts || []).map((p: any) => ({ url: `${base}/blog/${p.id}`, lastModified: p.updated_at ? new Date(p.updated_at) : new Date() }))

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
    ...postUrls,
  ]
}


