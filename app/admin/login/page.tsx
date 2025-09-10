"use client"
import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabaseBrowser.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setError(error.message)
    else router.replace('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-3 rounded border p-4">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full rounded border p-2" required />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full rounded border p-2" required />
        <button disabled={loading} className="w-full rounded bg-black text-white py-2 disabled:opacity-50">Войти</button>
      </form>
    </div>
  )
}


