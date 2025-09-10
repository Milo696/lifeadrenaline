"use client"
import { useTheme } from 'next-themes'

export default function ThemedImage({ lightSrc, darkSrc, alt, className }: { lightSrc?: string; darkSrc?: string; alt?: string; className?: string }) {
  const { resolvedTheme } = useTheme()
  const src = resolvedTheme === 'dark' ? (darkSrc || lightSrc) : (lightSrc || darkSrc)
  if (!src) return null
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} />
}


