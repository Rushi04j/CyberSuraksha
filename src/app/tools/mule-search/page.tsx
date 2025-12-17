"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Search, AlertOctagon, ShieldCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MuleSearchPage() {
    const [query, setQuery] = useState("")
    const [result, setResult] = useState<'safe' | 'risky' | null>(null)

    const handleSearch = () => {
        if (!query) return
        setResult(null)
        setTimeout(() => {
            // Mock logic: numbers ending in 0, 5, 9 are risky
            const isRisky = ['0', '5', '9'].includes(query.trim().slice(-1))
            setResult(isRisky ? 'risky' : 'safe')
        }, 800)
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col items-center">
            <div className="max-w-2xl w-full">
                <Button variant="ghost" asChild className="mb-6 text-slate-300">
                    <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
                </Button>

                <div className="text-center mb-10 space-y-4">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
                        Stop Payment Fraud
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Check if a Phone Number or UPI ID has been reported as a "Mule Account" by others before you pay.
                    </p>
                </div>

                <div className="flex gap-2 mb-8">
                    <Input
                        placeholder="Enter Phone Number / UPI ID..."
                        className="h-14 text-lg bg-slate-900 border-slate-700"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button className="h-14 w-32 text-lg bg-red-600 hover:bg-red-700" onClick={handleSearch}>
                        <Search className="mr-2 h-5 w-5" /> Check
                    </Button>
                </div>

                {result === 'risky' && (
                    <Card className="bg-red-950/50 border-red-800 animate-in zoom-in">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-red-500 text-2xl">
                                <AlertOctagon className="h-8 w-8" /> HIGH RISK DETECTED
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-xl text-red-100">
                                This account has been reported <strong>12 times</strong> in the last 7 days.
                            </p>
                            <div className="bg-black/30 p-4 rounded text-sm text-red-300">
                                <strong>Reason:</strong> "Asked for advance payment for OLX car", "Sextortion demand"
                            </div>
                            <Button className="w-full bg-red-600 hover:bg-red-700">DO NOT PAY</Button>
                        </CardContent>
                    </Card>
                )}

                {result === 'safe' && (
                    <Card className="bg-green-950/50 border-green-800 animate-in zoom-in">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-green-500 text-2xl">
                                <ShieldCheck className="h-8 w-8" /> NO REPORTS FOUND
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-green-100">
                                This account has not been flagged in our database yet. However, always exercise caution.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
