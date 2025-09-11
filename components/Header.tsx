import Link from 'next/link'
import Container from './Container'
import AdrenalineLogo from './Logo'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/components/ui/sheet'
import { Button } from '@/components/components/ui/button'

export default function Header() {
  return (
    <header className="bg-[#2d1b0f]/90 backdrop-blur supports-[backdrop-filter]:bg-[#2d1b0f]/80 border-b border-[var(--border-warm)]">
      <Container className="py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <AdrenalineLogo />
          <span className="text-xl font-bold">ThrillHub</span>
        </Link>
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/blog" className="px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/10">Blog</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="#activity" className="px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/10">Activities</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">Menu</Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <nav className="mt-8 flex flex-col gap-3 text-sm">
                  <Link href="/blog">Blog</Link>
                  <Link href="#activity">Activities</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  )
}


