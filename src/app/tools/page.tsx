"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert, FileText, Smartphone, Users, Search, Phone, Video, Lock } from "lucide-react"
import Link from "next/link"

export default function ToolsIndexPage() {
    const tools = [
        {
            title: "WhatsApp Bot Check",
            desc: "Forward suspicious messages to check links.",
            href: "/tools/whatsapp-bot",
            icon: ShieldAlert,
            color: "text-green-600 bg-green-100"
        },
        {
            title: "AI FIR Drafter",
            desc: "Generate a legally valid police complaint.",
            href: "/tools/fir-drafter",
            icon: FileText,
            color: "text-blue-600 bg-blue-100"
        },
        {
            title: "Digital Arrest Simulator",
            desc: "Experience a fake police call to learn safety.",
            href: "/tools/digital-arrest",
            icon: Video,
            color: "text-red-600 bg-red-100"
        },
        {
            title: "Fake Payment Detector",
            desc: "For Merchants: Spot spoofed payment screens.",
            href: "/tools/fake-payment",
            icon: Smartphone,
            color: "text-purple-600 bg-purple-100"
        },
        {
            title: "Mule Account Search",
            desc: "Search blacklisted fraud numbers.",
            href: "/tools/mule-search",
            icon: Search,
            color: "text-orange-600 bg-orange-100"
        },
        {
            title: "APK Safety Scanner",
            desc: "Find dangerous permissions in your apps.",
            href: "/tools/apk-scanner",
            icon: Lock,
            color: "text-indigo-600 bg-indigo-100"
        },
        {
            title: "SMS Case Tracker",
            desc: "Offline status check via 'Missed Call'.",
            href: "/tools/sms-tracker",
            icon: Phone,
            color: "text-slate-600 bg-slate-100"
        },
        {
            title: "Community Shield",
            desc: "Family safety, insurance & local alerts.",
            href: "/community",
            icon: Users,
            color: "text-pink-600 bg-pink-100"
        }
    ]

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
            <div className="container mx-auto py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Cyber Defence Toolkit</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Powerful, government-grade tools to protect you, your family, and your business from digital fraud.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tools.map((tool, i) => (
                        <Link href={tool.href} key={i}>
                            <Card className="h-full hover:shadow-xl transition-all hover:scale-105 border-0 shadow-md">
                                <CardHeader>
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${tool.color}`}>
                                        <tool.icon className="h-7 w-7" />
                                    </div>
                                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                                    <CardDescription>{tool.desc}</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
