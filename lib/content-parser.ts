export function extractMetaTags(content: string) {
  const titleMatch = content.match(/<title[^>]*>(.*?)<\/title>/i)
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i)
  
  const title = titleMatch ? titleMatch[1].trim() : null
  const description = descMatch ? descMatch[1].trim() : null
  
  // Remove meta tags from content for clean body rendering
  const cleanContent = content
    .replace(/<title[^>]*>.*?<\/title>/gi, '')
    .replace(/<meta[^>]*>/gi, '')
    .trim()
  
  return { title, description, cleanContent }
}
