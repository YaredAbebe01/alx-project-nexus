'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppHeader } from '@/components/app-header'
import { MobileNav } from '@/components/mobile-nav'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth-context'
import { User, Mail, Phone, Heart, Shield, Bell } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Mock save functionality
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <AppHeader />
      <MobileNav />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Account Settings</h2>
          <p className="text-muted-foreground">Manage your profile and preferences</p>
        </div>

        {/* Profile Header */}
        <Card className="p-6 border border-border mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-2xl font-bold text-secondary-foreground">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{user.name}</h3>
                <p className="text-muted-foreground text-sm">Member since today</p>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? 'default' : 'outline'}
              className={isEditing ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground' : ''}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-input"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-input"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-input"
                />
              </div>
              <Button
                onClick={handleSave}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
              >
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <User className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="font-semibold text-foreground">{formData.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Mail className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground text-sm">{formData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Phone className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-semibold text-foreground">{formData.phone}</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Payment Methods */}
          <Card className="p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Payment Methods</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted/50 rounded-lg flex items-between">
                <span className="text-sm text-foreground">Visa ending in 4242</span>
                <span className="text-xs text-accent">Default</span>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                Add Payment Method
              </Button>
            </div>
          </Card>

          {/* Safety & Support */}
          <Card className="p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Safety & Support</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-foreground font-medium">Security Settings</span>
                </div>
                <span className="text-muted-foreground">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-foreground font-medium">Emergency Contacts</span>
                </div>
                <span className="text-muted-foreground">→</span>
              </button>
            </div>
          </Card>

          {/* Preferences */}
          <Card className="p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-foreground">Ride Reminders</span>
                <div className="w-10 h-6 bg-secondary rounded-full flex items-center">
                  <div className="w-5 h-5 bg-white rounded-full ml-0.5" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-foreground">Notifications</span>
                <div className="w-10 h-6 bg-secondary rounded-full flex items-center">
                  <div className="w-5 h-5 bg-white rounded-full ml-0.5" />
                </div>
              </div>
            </div>
          </Card>

          {/* Help & Legal */}
          <Card className="p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Help & Legal</h3>
            <div className="space-y-2">
              <button className="w-full text-left text-sm text-secondary hover:underline font-medium">
                Help Center
              </button>
              <button className="w-full text-left text-sm text-secondary hover:underline font-medium">
                Terms of Service
              </button>
              <button className="w-full text-left text-sm text-secondary hover:underline font-medium">
                Privacy Policy
              </button>
              <button className="w-full text-left text-sm text-red-500 hover:underline font-medium">
                Delete Account
              </button>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex gap-4">
          <Button
            onClick={() => router.push('/home')}
            className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold h-11"
          >
            Back to Home
          </Button>
        </div>
      </main>
    </div>
  )
}
