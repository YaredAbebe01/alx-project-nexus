'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AppHeader } from '@/components/app-header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import { MapPin, User, Star, Clock, Phone, MessageSquare, X } from 'lucide-react'

const MOCK_DRIVERS = {
  economy: {
    name: 'Abel Tesfaye',
    rating: 4.9,
    rides: 2847,
    image: '👨',
    vehicle: 'Toyota Prius',
    plate: 'ABC 123',
    eta: 5,
  },
  comfort: {
    name: 'Sarah Kebede',
    rating: 4.95,
    rides: 3200,
    image: '👩',
    vehicle: 'BMW 3 Series',
    plate: 'XYZ 789',
    eta: 4,
  },
  xl: {
    name: 'Yared Abebe',
    rating: 4.88,
    rides: 5100,
    image: '👨',
    vehicle: 'Toyota Sienna',
    plate: 'LMN 456',
    eta: 6,
  },
}

export default function TripPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, user } = useAuth()
  const [status, setStatus] = useState<'confirming' | 'searching' | 'selecting' | 'assigned' | 'arrived'>('confirming')

  const ride = searchParams.get('ride') || 'economy'
  const price = searchParams.get('price') || '15.00'
  const pickup = searchParams.get('pickup') || 'Current Location'
  const destination = searchParams.get('destination') || 'Destination'

  const driver = MOCK_DRIVERS[ride as keyof typeof MOCK_DRIVERS] || MOCK_DRIVERS.economy

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    const confirmTimer = setTimeout(() => {
      setStatus('searching')
    }, 2000)

    return () => clearTimeout(confirmTimer)
  }, [])

  useEffect(() => {
    if (status === 'searching') {
      const searchTimer = setTimeout(() => {
        setStatus('selecting')
      }, 3000)

      return () => clearTimeout(searchTimer)
    }
  }, [status])

  useEffect(() => {
    if (status === 'assigned') {
      const arriveTimer = setTimeout(() => {
        setStatus('arrived')
      }, 5000)

      return () => clearTimeout(arriveTimer)
    }
  }, [status])

  const handleCancel = () => {
    router.push('/home')
  }

  const handleComplete = () => {
    router.push('/trips')
  }

  const handleChooseDriver = () => {
    setStatus('assigned')
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-8 md:pb-0">
      <AppHeader />

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Status Indicator */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            {['confirming', 'searching', 'selecting', 'assigned', 'arrived'].map((s, i) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  ['confirming', 'searching', 'selecting', 'assigned', 'arrived'].indexOf(status) >= i
                    ? 'bg-secondary'
                    : 'bg-border'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground capitalize">
            {status === 'confirming' && 'Confirming your ride...'}
            {status === 'searching' && 'Finding the best driver for you...'}
            {status === 'selecting' && 'Driver found. Choose to continue.'}
            {status === 'assigned' && 'Driver is on the way!'}
            {status === 'arrived' && 'Driver has arrived'}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trip Details */}
          <div className="md:col-span-2 space-y-4">
            {/* Map Area */}
            <Card className="w-full h-64 border border-border overflow-hidden">
              <img
                src="/addis-map.png"
                alt="Map preview of Addis Ababa"
                className="h-full w-full object-cover"
              />
            </Card>

            {/* Route Info */}
            <Card className="p-4 border border-border space-y-3">
              <div className="space-y-2">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup</p>
                    <p className="font-semibold text-foreground">{pickup}</p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-2">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Destination</p>
                    <p className="font-semibold text-foreground">{destination}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Trip Price Breakdown */}
            <Card className="p-4 border border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ride fare</span>
                <span className="font-semibold">${price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxes & fees</span>
                <span className="font-semibold">${(parseFloat(price) * 0.15).toFixed(2)}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-secondary">${(parseFloat(price) * 1.15).toFixed(2)}</span>
              </div>
            </Card>
          </div>

          {/* Driver Card */}
          <div>
            {status === 'selecting' || status === 'assigned' || status === 'arrived' ? (
              <Card className="p-4 border border-border space-y-4">
                <div className="text-center">
                  <p className="text-2xl mb-2">{driver.image}</p>
                  <p className="font-semibold text-foreground">{driver.name}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(driver.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-border'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{driver.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{driver.rides} rides</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Vehicle</span>
                    <span className="font-semibold text-foreground text-sm">{driver.vehicle}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">License Plate</span>
                    <span className="font-semibold text-foreground text-sm">{driver.plate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ETA</span>
                    <span className="font-semibold text-secondary text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {driver.eta} min
                    </span>
                  </div>
                </div>

                {status === 'selecting' ? (
                  <div className="space-y-2">
                    <Button
                      onClick={handleChooseDriver}
                      className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
                    >
                      Choose Driver
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="w-full border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel Ride
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="w-full border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel Ride
                    </Button>
                  </>
                )}
              </Card>
            ) : (
              <Card className="p-4 border border-border">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="animate-spin">
                      <div className="w-12 h-12 border-4 border-border border-t-secondary rounded-full" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {status === 'confirming' ? 'Confirming' : 'Finding driver...'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Please wait</p>
                  </div>

                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="w-full border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
                  >
                    Cancel Ride
                  </Button>
                </div>
              </Card>
            )}

            {status === 'arrived' && (
              <Button
                onClick={handleComplete}
                className="w-full bg-accent hover:bg-accent/90 text-foreground font-semibold h-11"
              >
                Complete Trip
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
