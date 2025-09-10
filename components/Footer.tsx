import SubscribeForm from './SubscribeForm'
import Container from './Container'

export default function Footer() {
  return (
    <footer className="border-t mt-12">
      <Container className="py-8 text-sm text-gray-600 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-gray-700 dark:text-gray-300">
          <p>© {new Date().getFullYear()} ThrillHub</p>
          <p className="italic">Some links may be affiliate links.</p>
        </div>
        <div className="w-full sm:w-auto">
          <SubscribeForm />
        </div>
      </Container>
    </footer>
  )
}


