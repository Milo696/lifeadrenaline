import { NextRequest } from 'next/server'
import { getSupabaseServer } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = getSupabaseServer()
  const category = req.nextUrl.searchParams.get('category') || undefined
  let query = supabase.from('posts').select('id,title,category').order('created_at', { ascending: false })
  if (category) query = query.eq('category', category)
  const { data, error } = await query.limit(50)
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  const posts = data || []
  const post = posts.length ? posts[Math.floor(Math.random() * posts.length)] : null
  return new Response(JSON.stringify({ post }))
}


