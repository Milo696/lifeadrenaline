"use client"
import { usePathname } from 'next/navigation'

export default function ShareButtons({ title }: { title: string }) {
  const pathname = usePathname()
  const url = typeof window !== 'undefined' ? window.location.origin + pathname : pathname
  const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  const tg = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`

  return (
    <div className="flex gap-2 text-sm">
      <a className="rounded border px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-800" href={tweet} target="_blank" rel="noreferrer">Twitter</a>
      <a className="rounded border px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-800" href={tg} target="_blank" rel="noreferrer">Telegram</a>
      <a className="rounded border px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-800" href={fb} target="_blank" rel="noreferrer">Facebook</a>
    </div>
  )
}


