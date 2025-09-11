"use client"
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import DOMPurify from 'dompurify'
import { extractMetaTags } from '@/lib/content-parser'

export default function ContentRenderer({ content }: { content: string }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => setMounted(true), [])
  
  if (!mounted) return <div>Loading...</div>
  
  const { cleanContent } = extractMetaTags(content)
  
  // Always use ReactMarkdown with HTML support for mixed content
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]} 
      rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings]}
      components={{
        a: ({ href, children, ...props }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        )
      }}
    >
      {cleanContent}
    </ReactMarkdown>
  )
}
