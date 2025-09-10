import { NextRequest } from 'next/server'
import { getSupabaseServer } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim()
  const category = req.nextUrl.searchParams.get('category')?.trim()
  const supabase = getSupabaseServer()
  let query = supabase.from('posts').select('id,title,excerpt,featured_image,category,created_at').order('created_at', { ascending: false })
  if (q) {
    query = query.ilike('title', `%${q}%`)
  }
  if (category) query = query.eq('category', category)
  const { data, error } = await query.limit(30)
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  return new Response(JSON.stringify({ results: data || [] }))
}


