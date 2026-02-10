'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, History, User } from 'lucide-react'

export function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/home', icon: Home, label: 'Home' },
    { href: '/trips', icon: History, label: 'Trips' },
    { href: '/profile', icon: User, label: 'Profile' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-40">
      <div className="flex items-center justify-around">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center justify-center py-4 transition-colors ${
              pathname === item.href
                ? 'text-secondary border-t-2 border-secondary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
