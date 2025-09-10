import SubscribeForm from './SubscribeForm'

export default function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-gray-700 dark:text-gray-300">
          <p>© {new Date().getFullYear()} LifeAdrenaline</p>
          <p className="italic">Some links may be affiliate links.</p>
        </div>
        <div className="w-full sm:w-auto">
          <SubscribeForm />
        </div>
      </div>
    </footer>
  )
}


