"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export default function OfficerSignUp() {
  const [badge, setBadge] = useState("")
  const [name, setName] = useState("")
  const [department, setDepartment] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Replace with API validation as needed
    if (!badge || !name || !department || !password) {
      setError("Fill out all fields.")
      setIsLoading(false)
      return
    }

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to login or dashboard after registration
      router.push("/officer/login")
    }, 1200)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">CyberSuraksha</span>
          </div>
          <CardTitle>Police Officer Registration</CardTitle>
          <CardDescription>Fill out your official details to register as an officer.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="badge">Badge ID</Label>
              <Input id="badge" value={badge} onChange={e => setBadge(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input id="department" value={department} onChange={e => setDepartment(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
            <div className="text-center pt-2">
              <span className="text-sm">
                Already have an account?
                <Link href="/police/signin" className="ml-1 text-primary hover:underline"> Sign In </Link>
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
