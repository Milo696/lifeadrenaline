export default function LoadingPost() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-8">
      <div>
        <div className="h-8 w-2/3 bg-gray-200 dark:bg-gray-800 rounded mb-4 animate-pulse" />
        <div className="h-72 w-full bg-gray-200 dark:bg-gray-800 rounded mb-4 animate-pulse" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          ))}
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="h-4 w-28 bg-gray-200 dark:bg-gray-800 rounded mb-4 animate-pulse" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-3 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-2 animate-pulse" />
        ))}
      </div>
    </div>
  )
}


