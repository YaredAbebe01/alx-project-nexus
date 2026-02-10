'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, User, History, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function AppHeader() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/home" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">RideWave</h1>
        </Link>

        <div className="flex items-center gap-4">
          {mounted && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-muted-foreground"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
              <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/trips')}
            className="text-muted-foreground hover:text-foreground"
          >
            <History className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Trips</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/profile')}
            className="text-muted-foreground hover:text-foreground"
          >
            <User className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{user?.name || 'Profile'}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-red-500"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
