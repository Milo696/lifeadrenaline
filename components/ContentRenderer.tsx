"use client"
import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import { extractMetaTags } from '@/lib/content-parser'

export default function ContentRenderer({ content }: { content: string }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => setMounted(true), [])
  
  if (!mounted) return <div>Loading...</div>
  
  const { cleanContent } = extractMetaTags(content)
  
  // Sanitize HTML and render directly
  const sanitized = DOMPurify.sanitize(cleanContent, {
    ALLOWED_TAGS: ['a', 'strong', 'em', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'br', 'img', 'blockquote', 'code', 'pre', 'span', 'div'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title', 'class', 'style'],
    ADD_ATTR: ['target', 'rel'],
    FORBID_ATTR: ['onclick', 'onerror', 'onload']
  })
  
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />
}
