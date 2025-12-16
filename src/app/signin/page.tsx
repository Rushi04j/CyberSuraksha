"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"

export default function SignInPage() {
  const { login } = useAuth()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)

  const handleDemoLogin = async () => {
    setLoading(true)
    // Simulate a small delay for better UX
    setTimeout(async () => {
      await login("citizen")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/50 via-white to-blue-100/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-4">
      <Card className="w-full max-w-md shadow-2xl glassy border-t-4 border-t-primary animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-2">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">{t.auth.citizenTitle}</CardTitle>
          <CardDescription>
            {t.auth.citizenSubtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800 text-sm text-yellow-800 dark:text-yellow-200 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>
                {t.auth.demoMode}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t.auth.email}</Label>
            <Input id="email" placeholder="rahul@example.com" disabled value="rahul@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t.auth.password}</Label>
            <Input id="password" type="password" disabled value="password" />
          </div>

          <Button
            className="w-full h-11 text-lg font-medium shadow-lg hover:shadow-primary/25 transition-all"
            onClick={handleDemoLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t.auth.authenticating}
              </>
            ) : (
              t.auth.loginCitizen
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center text-sm text-muted-foreground">
          <div>
            {t.auth.notAccount}{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              {t.auth.register}
            </Link>
          </div>
          <div className="pt-2 border-t w-full">
            {t.auth.areYouPolice}{" "}
            <Link href="/police/signin" className="text-blue-600 hover:underline font-bold">
              {t.auth.policeLink}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
