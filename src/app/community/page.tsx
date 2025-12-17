"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, Shield, Radio, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CommunityPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <header className="bg-white dark:bg-slate-900 border-b p-4 sticky top-0 z-10">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" asChild size="icon">
                            <Link href="/"><ArrowLeft className="h-5 w-5" /></Link>
                        </Button>
                        <h1 className="text-xl font-bold">Community Shield</h1>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="outline" className="bg-green-100 text-green-800">24k Active Guardians</Badge>
                    </div>
                </div>
            </header>

            <main className="container mx-auto p-4 py-8 space-y-8">

                {/* Feature 1: Family Link */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <Heart className="text-red-500 h-6 w-6" />
                        <h2 className="text-2xl font-bold">Suraksha Bandhan (Family Safety)</h2>
                    </div>
                    <Card className="bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-950/20 dark:to-red-950/20 border-pink-200">
                        <CardContent className="p-6 md:flex items-center justify-between gap-6">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-pink-900 dark:text-pink-100">Protect Your Parents</h3>
                                <p className="text-pink-700 dark:text-pink-300">
                                    Link your parents' bank accounts (via SMS permissions) to your device.
                                    Get an instant alert if they try to transfer money to a new, unknown beneficiary.
                                </p>
                            </div>
                            <Button className="mt-4 md:mt-0 bg-pink-600 hover:bg-pink-700 text-white min-w-[200px]">
                                Add Family Member
                            </Button>
                        </CardContent>
                    </Card>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Feature 2: Insurance */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <Shield className="text-blue-500 h-6 w-6" />
                            <h2 className="text-2xl font-bold">Micro-Cyber Insurance</h2>
                        </div>
                        <Card className="h-full border-blue-200 shadow-md transition-shadow hover:shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-3xl font-black text-blue-600">₹99<span className="text-sm font-normal text-muted-foreground">/year</span></CardTitle>
                                <CardDescription>Coverage up to ₹25,000 for UPI Fraud</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2"><CheckBadge /> 24x7 Legal Helpline</li>
                                    <li className="flex items-center gap-2"><CheckBadge /> Instant Claim Settlement</li>
                                    <li className="flex items-center gap-2"><CheckBadge /> Covered: Phishing, QR Scams</li>
                                </ul>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">Buy Policy</Button>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Feature 3: Hyperlocal Feed */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <Radio className="text-orange-500 h-6 w-6 animate-pulse" />
                            <h2 className="text-2xl font-bold">Mandi News (Live Feed)</h2>
                        </div>
                        <Card className="h-full">
                            <CardContent className="p-0">
                                <div className="divide-y max-h-[300px] overflow-y-auto">
                                    {[
                                        { loc: "Andheri, Mumbai", msg: "Electricity Bill Scam reported by 3 users.", time: "10m ago" },
                                        { loc: "Pune Cantt", msg: "Fake Army Olx Scam active.", time: "1h ago" },
                                        { loc: "Thane", msg: "WhatsApp 'Pink Look' link virus spreading.", time: "3h ago" },
                                        { loc: "Nashik", msg: "Fake Job Offer letters sent to students.", time: "5h ago" },
                                    ].map((news, i) => (
                                        <div key={i} className="p-4 hover:bg-muted/50">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-bold text-sm text-foreground">{news.loc}</span>
                                                <span className="text-xs text-muted-foreground">{news.time}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{news.msg}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </main>
        </div>
    )
}

function CheckBadge() {
    return <div className="bg-blue-100 p-1 rounded-full"><Shield className="h-3 w-3 text-blue-600" /></div>
}
