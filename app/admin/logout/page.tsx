"use client"
import { useEffect } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const router = useRouter()
  useEffect(() => {
    supabaseBrowser.auth.signOut().finally(() => router.replace('/admin/login'))
  }, [router])
  return <div className="p-6 text-center">Выход...</div>
}


