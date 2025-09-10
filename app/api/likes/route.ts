import { NextRequest } from 'next/server'
import { getSupabaseServer } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = getSupabaseServer()
  const postId = req.nextUrl.searchParams.get('post_id')
  if (!postId) return new Response(JSON.stringify({ error: 'post_id required' }), { status: 400 })
  const { count } = await supabase.from('likes').select('id', { count: 'exact', head: true }).eq('post_id', postId)
  return new Response(JSON.stringify({ count: count ?? 0 }))
}

export async function POST(req: NextRequest) {
  const supabase = getSupabaseServer()
  const body = await req.json()
  const { post_id } = body || {}
  if (!post_id) return new Response(JSON.stringify({ error: 'post_id required' }), { status: 400 })
  const { data: { user } } = await supabase.auth.getUser()
  const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown'
  const { error } = await supabase.from('likes').insert({ post_id, user_id: user?.id ?? null, ip })
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  return new Response(JSON.stringify({ ok: true }), { status: 200 })
}


