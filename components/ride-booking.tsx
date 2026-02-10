'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Clock, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

interface RideOption {
  id: string
  name: string
  description: string
  icon: string
  basePrice: number
  perMile: number
  estimatedTime: number
  capacity: number
}

const RIDE_OPTIONS: RideOption[] = [
  {
    id: 'economy',
    name: 'Economy',
    description: 'Budget-friendly rides',
    icon: '🚗',
    basePrice: 2.5,
    perMile: 1.25,
    estimatedTime: 5,
    capacity: 4,
  },
  {
    id: 'comfort',
    name: 'Comfort',
    description: 'Premium comfort rides',
    icon: '🚙',
    basePrice: 3.5,
    perMile: 1.75,
    estimatedTime: 4,
    capacity: 4,
  },
  {
    id: 'xl',
    name: 'XL',
    description: 'Extra space for passengers',
    icon: '🚐',
    basePrice: 5,
    perMile: 2.25,
    estimatedTime: 6,
    capacity: 6,
  },
]

export function RideBooking() {
  const router = useRouter()
  const [step, setStep] = useState<'booking' | 'selection'>('booking')
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [selectedRide, setSelectedRide] = useState<string | null>(null)

  const handleSearchRides = (e: React.FormEvent) => {
    e.preventDefault()
    if (pickup && destination) {
      setStep('selection')
    }
  }

  const handleSelectRide = (rideId: string) => {
    setSelectedRide(rideId)
    const ride = RIDE_OPTIONS.find(r => r.id === rideId)
    if (ride) {
      const estimatedPrice = (ride.basePrice + (ride.perMile * 5)).toFixed(2)
      router.push(`/trip?ride=${rideId}&price=${estimatedPrice}&pickup=${pickup}&destination=${destination}`)
    }
  }

  if (step === 'selection') {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setStep('booking')}
          className="text-secondary hover:underline text-sm font-semibold"
        >
          ← Change locations
        </button>

        <div className="bg-card rounded-lg p-4 border border-border">
          <h3 className="font-semibold text-foreground mb-3">Available Rides</h3>
          <p className="text-xs text-muted-foreground mb-4">From {pickup} to {destination}</p>

          <div className="space-y-3">
            {RIDE_OPTIONS.map(ride => (
              <Card
                key={ride.id}
                className={`p-4 cursor-pointer transition-all border ${
                  selectedRide === ride.id
                    ? 'border-secondary bg-secondary/5'
                    : 'border-border hover:border-secondary/50'
                }`}
                onClick={() => handleSelectRide(ride.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{ride.icon}</span>
                    <div>
                      <p className="font-semibold text-foreground">{ride.name}</p>
                      <p className="text-xs text-muted-foreground">{ride.description}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-secondary text-lg">
                      ${(ride.basePrice + (ride.perMile * 5)).toFixed(2)}
                    </p>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ride.estimatedTime} min
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSearchRides} className="space-y-4">
      <div className="bg-card rounded-lg p-6 border border-border space-y-4">
        <div>
          <Label htmlFor="pickup" className="text-sm font-semibold text-foreground">
            <span className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-secondary" />
              Pickup Location
            </span>
          </Label>
          <Input
            id="pickup"
            placeholder="Where are you?"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="bg-input"
          />
        </div>

        <div>
          <Label htmlFor="destination" className="text-sm font-semibold text-foreground">
            <span className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-accent" />
              Destination
            </span>
          </Label>
          <Input
            id="destination"
            placeholder="Where to?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="bg-input"
          />
        </div>

        <Button
          type="submit"
          disabled={!pickup || !destination}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold h-11"
        >
          <DollarSign className="w-4 h-4 mr-2" />
          See Available Rides
        </Button>
      </div>

      <Card className="p-4 border border-border bg-accent/5">
        <h3 className="font-semibold text-foreground text-sm mb-3">Quick Tips</h3>
        <ul className="text-xs text-muted-foreground space-y-2">
          <li>• Set your pickup location to get accurate estimates</li>
          <li>• Economy rides are most affordable</li>
          <li>• Schedule rides in advance for guaranteed availability</li>
        </ul>
      </Card>
    </form>
  )
}
