"use client"
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { supabaseBrowser } from '@/lib/supabase/client'
import { useToast } from '@/components/hooks/use-toast'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function PostForm({ categories, post }: { categories: { id: string, name: string }[], post?: any }) {
  const [title, setTitle] = useState(post?.title ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [category, setCategory] = useState(post?.category ?? (categories[0]?.name || ''))
  const [image, setImage] = useState<File | null>(null)
  const [affiliateHtml, setAffiliateHtml] = useState(post?.affiliate_html ?? '')
  const [featured, setFeatured] = useState<boolean>(post?.featured ?? false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      let featuredUrl = post?.featured_image ?? ''
      if (image) {
        const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'images'
        const ext = (image.name.split('.').pop() || 'bin').toLowerCase()
        const safeBase = image.name
          .replace(/\.[^/.]+$/, '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
        const filePath = `posts/${Date.now()}-${Math.random().toString(36).slice(2,8)}-${safeBase}.${ext}`
        const { error: upErr } = await supabaseBrowser.storage
          .from(bucket)
          .upload(filePath, image, { cacheControl: '3600', upsert: false, contentType: image.type })
        if (upErr) throw upErr
        const { data: { publicUrl } } = supabaseBrowser.storage.from(bucket).getPublicUrl(filePath)
        featuredUrl = publicUrl
      }

      if (post?.id) {
        const { error } = await supabaseBrowser.from('posts').update({ title, content, category, featured_image: featuredUrl, affiliate_html: affiliateHtml, featured }).eq('id', post.id)
        if (error) throw error
        toast({ title: 'Post updated', description: 'Changes saved successfully.' })
      } else {
        const { error } = await supabaseBrowser.from('posts').insert({ title, content, category, featured_image: featuredUrl, affiliate_html: affiliateHtml, featured })
        if (error) throw error
        toast({ title: 'Post created', description: 'Your post is published.' })
      }
      window.location.href = '/admin'
    } catch (err: any) {
      setError(err.message || 'Ошибка сохранения')
      toast({ title: 'Error', description: err.message || 'Failed to save', variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <div className="text-sm text-red-600">{error}</div>}
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full rounded border p-2" required />
      <select value={category} onChange={e => setCategory(e.target.value)} className="w-full rounded border p-2">
        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
      </select>
      <ReactQuill theme="snow" value={content} onChange={setContent} />
      <div>
        <label className="block text-sm mb-1">Featured image</label>
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] ?? null)} />
      </div>
      <div>
        <label className="block text-sm mb-1">Affiliate Banner HTML</label>
        <textarea value={affiliateHtml} onChange={e => setAffiliateHtml(e.target.value)} className="w-full min-h-[100px] rounded border p-2" placeholder="<a href='...'>Bonus</a>"></textarea>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} /> Featured on Home
      </label>
      <button disabled={saving} className="rounded bg-black text-white px-4 py-2 disabled:opacity-50">{post?.id ? 'Update' : 'Create'}</button>
    </form>
  )
}


