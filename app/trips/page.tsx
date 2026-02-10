'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppHeader } from '@/components/app-header'
import { MobileNav } from '@/components/mobile-nav'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { MapPin, Calendar, DollarSign, Star, ChevronRight } from 'lucide-react'

const SAMPLE_TRIPS = [
  {
    id: 1,
    pickup: 'Downtown Station',
    destination: 'Airport Terminal A',
    date: 'Today at 2:30 PM',
    price: 28.50,
    driver: 'Abel Tesfaye',
    rating: 4.9,
    type: 'Economy',
    distance: '12 miles',
  },
  {
    id: 2,
    pickup: 'Coffee Shop on Main St',
    destination: 'Office Building',
    date: 'Yesterday at 9:15 AM',
    price: 15.75,
    driver: 'Sarah Kebede',
    rating: 4.95,
    type: 'Comfort',
    distance: '5 miles',
  },
  {
    id: 3,
    pickup: 'Shopping Mall',
    destination: 'Home',
    date: 'Dec 5 at 6:45 PM',
    price: 22.30,
    driver: 'Yared Abebe',
    rating: 4.88,
    type: 'XL',
    distance: '8 miles',
  },
]

export default function TripsPage() {
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

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Your Trips</h2>
          <p className="text-muted-foreground">View your ride history and statistics</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Total Rides</p>
            <p className="text-3xl font-bold text-foreground">{SAMPLE_TRIPS.length}</p>
          </Card>
          <Card className="p-4 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Total Spent</p>
            <p className="text-3xl font-bold text-secondary">
              ${SAMPLE_TRIPS.reduce((sum, trip) => sum + trip.price, 0).toFixed(2)}
            </p>
          </Card>
          <Card className="p-4 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Total Distance</p>
            <p className="text-3xl font-bold text-accent">25 miles</p>
          </Card>
          <Card className="p-4 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Avg Rating</p>
            <p className="text-3xl font-bold text-yellow-500">4.9</p>
          </Card>
        </div>

        {/* Trips List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Rides</h3>

          {SAMPLE_TRIPS.length === 0 ? (
            <Card className="p-8 border border-border text-center">
              <p className="text-muted-foreground">No trips yet</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {SAMPLE_TRIPS.map(trip => (
                <Card
                  key={trip.id}
                  className="p-4 border border-border hover:border-secondary/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <MapPin className="w-4 h-4 text-secondary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{trip.pickup}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <span>→</span>
                            {trip.destination}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {trip.date}
                        </span>
                        <span>{trip.type}</span>
                        <span>{trip.distance}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Driver: {trip.driver}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-muted-foreground">{trip.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <p className="text-lg font-bold text-secondary">${trip.price.toFixed(2)}</p>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <Button
            onClick={() => router.push('/home')}
            className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold h-11"
          >
            Book Another Ride
          </Button>
        </div>
      </main>
    </div>
  )
}
