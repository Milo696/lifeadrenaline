import { createServerClient } from '@supabase/ssr'
import { cookies, headers } from 'next/headers'

export function getSupabaseServer() {
  const cookieStore = cookies()
  const headerList = headers()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: '', ...options })
      }
    },
    headers: {
      get(name: string) {
        return headerList.get(name) ?? undefined
      }
    }
  })
}


