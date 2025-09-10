export default function LoadingBlog() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-[var(--radius)] border animate-pulse overflow-hidden">
          <div className="h-48 w-full bg-gray-200 dark:bg-gray-800" />
          <div className="p-4 space-y-2">
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}


