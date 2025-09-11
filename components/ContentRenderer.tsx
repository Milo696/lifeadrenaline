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
  
  // Check if content is primarily HTML or Markdown
  const isHtml = cleanContent.includes('<p>') || cleanContent.includes('<div>') || cleanContent.includes('<h1>')
  
  if (isHtml) {
    // Render as sanitized HTML
    const sanitized = DOMPurify.sanitize(cleanContent, {
      ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'strong', 'em', 'ul', 'ol', 'li', 'br', 'img', 'blockquote', 'code', 'pre'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title', 'class']
    })
    return <div dangerouslySetInnerHTML={{ __html: sanitized }} />
  } else {
    // Render as Markdown with HTML support
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
}
