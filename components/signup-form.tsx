'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth-context'
import { Spinner } from '@/components/ui/spinner'

export function SignupForm() {
  const router = useRouter()
  const { signup } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const { name, email, phone, password, confirmPassword } = formData

      if (!name || !email || !phone || !password || !confirmPassword) {
        setError('Please fill in all fields')
        return
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match')
        return
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters')
        return
      }

      await signup(email, password, name, phone)
      router.push('/home')
    } catch (err) {
      setError('Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
          className="bg-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          className="bg-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={handleChange}
          disabled={isLoading}
          className="bg-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          className="bg-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
          className="bg-input"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold h-11"
      >
        {isLoading ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Creating account...
          </>
        ) : (
          'Sign Up'
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="text-secondary hover:underline font-semibold">
          Log in
        </Link>
      </p>
    </form>
  )
}
