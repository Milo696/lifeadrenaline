import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-12">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r p-4 space-y-3">
        <h2 className="font-bold">Admin</h2>
        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/posts">Posts</Link>
          <Link href="/admin/categories">Categories</Link>
          <Link href="/admin/logout">Logout</Link>
        </nav>
      </aside>
      <main className="col-span-12 md:col-span-9 lg:col-span-10 p-4">
        {children}
      </main>
    </div>
  )
}


