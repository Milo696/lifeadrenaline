import Link from 'next/link'
import { clsx } from 'clsx'

export function ChipLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href as any}
      className={clsx(
        'rounded-full border px-3 py-1 text-sm',
        active ? 'bg-black text-white border-black' : 'hover:bg-gray-50'
      )}
    >
      {children}
    </Link>
  )
}


