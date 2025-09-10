import { NextRequest } from 'next/server'
import { getSupabaseServer } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = getSupabaseServer()
  const { email } = await req.json()
  if (!email) return new Response(JSON.stringify({ error: 'email required' }), { status: 400 })
  const { error } = await supabase.from('subscribers').insert({ email })
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  return new Response(JSON.stringify({ ok: true }), { status: 200 })
}


