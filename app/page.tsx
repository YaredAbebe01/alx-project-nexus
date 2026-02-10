'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export default function Page() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.push('/home')
      } else {
        router.push('/login')
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto animate-pulse">
          <span className="text-4xl font-bold text-secondary">R</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white">RideWave</h1>
          <p className="text-white/80 mt-2">Your ride, your way</p>
        </div>
      </div>
    </div>
  )
}
