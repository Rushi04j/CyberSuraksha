"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, ShieldAlert, Smartphone, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ApkSafetyScanner() {
    const apps = [
        { name: "WhatsApp", status: "safe", risk: 0 },
        { name: "Instagram", status: "safe", risk: 0 },
        { name: "Calculator Pro", status: "danger", risk: 90, issue: "Requests Contact & Gallery Access" },
        { name: "Flashlight", status: "warning", risk: 40, issue: "Requests Location Access" },
        { name: "Quick Loan", status: "danger", risk: 99, issue: "Not RBI Registered, Requests Contacts" }
    ]

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 flex flex-col items-center">
            <div className="max-w-2xl w-full">
                <Button variant="ghost" asChild className="mb-6">
                    <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
                </Button>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">App Permission Scanner</h1>
                        <p className="text-muted-foreground">Identify apps spying on you.</p>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">Scan Now</Button>
                </div>

                <div className="space-y-4">
                    {apps.map((app, i) => (
                        <Card key={i} className={`border-l-4 ${app.status === 'danger' ? 'border-l-red-500 bg-red-50/50 dark:bg-red-900/10' :
                                app.status === 'warning' ? 'border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-900/10' :
                                    'border-l-green-500'
                            }`}>
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${app.status === 'danger' ? 'bg-red-100 text-red-600' :
                                            app.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                                'bg-green-100 text-green-600'
                                        }`}>
                                        <Smartphone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{app.name}</h3>
                                        {app.issue && <p className="text-xs font-semibold text-red-600 dark:text-red-400">{app.issue}</p>}
                                    </div>
                                </div>
                                <div className="text-right">
                                    {app.status === 'safe' ? (
                                        <div className="flex items-center text-green-600 gap-1 font-bold text-sm">
                                            <ShieldCheck className="h-4 w-4" /> Safe
                                        </div>
                                    ) : (
                                        <Button size="sm" variant="destructive">Uninstall</Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
