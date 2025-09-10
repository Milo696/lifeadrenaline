import { NextRequest } from 'next/server'
import { getSupabaseServer } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = getSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

  const body = await req.json()
  const { post_id, text } = body || {}
  if (!post_id || !text) return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })

  const { error } = await supabase.from('comments').insert({ post_id, text, author: user.email })
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 })

  return new Response(JSON.stringify({ ok: true }), { status: 200 })
}


