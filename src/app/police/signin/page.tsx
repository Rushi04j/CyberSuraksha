"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, AlertTriangle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"

export default function PoliceSignInPage() {
  const { login } = useAuth()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)

  const handleDemoLogin = async () => {
    setLoading(true)
    setTimeout(async () => {
      await login("police")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <Card className="w-full max-w-md shadow-2xl bg-gray-950 border-gray-800 text-gray-100 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <CardHeader className="space-y-1 text-center border-b border-gray-800 pb-6">
          <div className="mx-auto bg-blue-900/30 p-4 rounded-full w-fit mb-2 ring-1 ring-blue-500/50">
            <Shield className="h-10 w-10 text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">{t.auth.policeTitle}</CardTitle>
          <CardDescription className="text-gray-400">
            {t.auth.policeSubtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <div className="bg-blue-950/40 p-3 rounded border border-blue-900/50 text-sm text-blue-200 flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 shrink-0 text-blue-400" />
              <p>
                <strong>Secure Environment:</strong> All actions are logged and audited.
                <br />
                <span className="text-xs opacity-70">{t.auth.demoMode}</span>
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="badge" className="text-gray-300">{t.auth.badge}</Label>
              <Input id="badge" className="bg-gray-900 border-gray-700 text-gray-100" placeholder="CD-4921" disabled value="CD-4921" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">{t.auth.pin}</Label>
              <Input id="password" type="password" className="bg-gray-900 border-gray-700 text-gray-100" disabled value="123456" />
            </div>
          </div>

          <Button
            className="w-full h-11 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/50"
            onClick={handleDemoLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t.auth.authenticating}
              </>
            ) : (
              t.auth.loginPolice
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-800 pt-6">
          <Link href="/signin" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
            {t.auth.returnCitizen}
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
