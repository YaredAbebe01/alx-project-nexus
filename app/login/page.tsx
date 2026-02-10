import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { LoginForm } from '@/components/login-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-foreground">RideWave</h1>
            <p className="text-muted-foreground text-sm mt-2">Your ride, your way</p>
          </div>
          <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
          <p className="text-muted-foreground text-sm mt-2">Sign in to your account to continue</p>
        </div>

        <Card className="p-6 border border-border shadow-sm">
          <LoginForm />
        </Card>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>
            By continuing, you agree to RideWave's{' '}
            <Link href="#" className="text-secondary hover:underline">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link href="#" className="text-secondary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
