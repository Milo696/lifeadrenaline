import { getSupabaseServer } from '@/lib/supabase/server'

export async function GET() {
  const supabase = getSupabaseServer()
  const { data, error } = await supabase.from('categories').select('id,name').order('name')
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  return new Response(JSON.stringify({ categories: data || [] }))
}


