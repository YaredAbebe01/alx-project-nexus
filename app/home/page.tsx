'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppHeader } from '@/components/app-header'
import { MobileNav } from '@/components/mobile-nav'
import { RideBooking } from '@/components/ride-booking'
import { useAuth } from '@/lib/auth-context'
import { Card } from '@/components/ui/card'

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <AppHeader />
      <MobileNav />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Area */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Where are you going?</h2>
                <p className="text-muted-foreground">Book a ride in seconds</p>
              </div>

              <RideBooking />

              {/* Map Preview */}
              <Card className="w-full h-96 border border-border overflow-hidden">
                <img
                  src="/addis-map.png"
                  alt="Map preview of Addis Ababa"
                  className="h-full w-full object-cover"
                />
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Active Ride Card */}
            <Card className="p-4 border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Your Recent Rides</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">No recent rides yet</p>
                <p className="text-xs text-muted-foreground">Your ride history will appear here</p>
              </div>
            </Card>

            {/* Promotions */}
            <Card className="p-4 border border-border bg-secondary/5">
              <h3 className="font-semibold text-foreground mb-3">Special Offers</h3>
              <div className="space-y-2">
                <div className="bg-secondary rounded-lg p-3">
                  <p className="font-semibold text-secondary-foreground text-sm">Get $10 off</p>
                  <p className="text-xs text-secondary-foreground/80">Your first ride with code WELCOME10</p>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Total Rides</p>
                  <p className="text-2xl font-bold text-foreground">0</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Savings</p>
                  <p className="text-2xl font-bold text-accent">$0</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
