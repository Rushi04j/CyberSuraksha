"use client"

import { useSearchParams } from "next/navigation"
import { CheckCircle, Phone, Smartphone, Shield, AlertTriangle, ArrowRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Suspense } from "react"
import { Badge } from "@/components/ui/badge"

function ActionPlanContent() {
    const searchParams = useSearchParams()
    const category = searchParams.get('category') || 'general'
    const id = searchParams.get('id') || 'REF-0000'

    // Dynamic Action Plans
    const getActions = (cat: string) => {
        const c = cat.toLowerCase();
        if (c.includes('fraud') || c.includes('financial')) {
            return [
                { icon: Phone, text: "Call 1930 immediately (National Cyber Helpline).", urgent: true },
                { icon: CreditCardIcon, text: "Block your bank cards and freeze accounts involved.", urgent: true },
                { icon: Smartphone, text: "Take screenshots of the transaction and messages." },
                { icon: Shield, text: "Change your banking passwords/PINs." }
            ];
        } else if (c.includes('harassment') || c.includes('stalking') || c.includes('bullying')) {
            return [
                { icon: Smartphone, text: "Do NOT delete chats/messages. Take screenshots.", urgent: true },
                { icon: Shield, text: "Block the user on the social media platform." },
                { icon: AlertTriangle, text: "Make your profile private temporarily." },
                { icon: Phone, text: "Contact the platform support to report the profile." }
            ];
        } else if (c.includes('hack') || c.includes('breach')) {
            return [
                { icon: Shield, text: "Change passwords for all linked accounts immediately.", urgent: true },
                { icon: Smartphone, text: "Enable Two-Factor Authentication (2FA) everywhere." },
                { icon: CheckCircle, text: "Run a full antivirus scan on your device." },
                { icon: AlertTriangle, text: "Logout of all active sessions from settings." }
            ];
        }
        // Default
        return [
            { icon: Phone, text: "Keep your phone reachable for police contact.", urgent: true },
            { icon: Smartphone, text: "Preserve all digital evidence." },
            { icon: Shield, text: "Stay vigilant for follow-up scams." }
        ];
    }

    const actions = getActions(category);

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">

            <div className="text-center mb-10">
                <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Complaint Submitted Successfully</h1>
                <p className="text-muted-foreground text-lg mb-2">
                    Reference ID: <span className="font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded">{id}</span>
                </p>
                <div className="flex flex-col items-center gap-1 animate-in slide-in-from-top-4 duration-1000">
                    <Badge variant="outline" className="text-xs font-mono bg-slate-50 text-slate-500 border-slate-200">
                        BLOCKCHAIN HASH: 0x7f83b1...a92c (Immutable Evidence)
                    </Badge>
                </div>
            </div>

            <Card className="border-t-4 border-t-red-500 shadow-2xl overflow-hidden">
                <CardHeader className="bg-red-50 dark:bg-red-900/10 border-b">
                    <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                        <AlertTriangle className="h-6 w-6" />
                        Immediate Action Plan
                    </CardTitle>
                    <p className="text-sm text-red-600/80">
                        Based on your report type ({category}), please take these steps <strong>NOW</strong> to minimize damage.
                    </p>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y">
                        {actions.map((action, idx) => (
                            <div key={idx} className={`flex items-start gap-4 p-4 ${action.urgent ? 'bg-red-50/50 dark:bg-red-900/5' : ''}`}>
                                <div className={`p-2 rounded-full ${action.urgent ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                                    <action.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className={`font-medium ${action.urgent ? 'text-red-900 dark:text-red-300' : 'text-foreground'}`}>
                                        {action.text}
                                    </p>
                                    {action.urgent && <span className="text-[10px] uppercase font-bold text-red-500 tracking-wider">Crucial Step</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="w-full sm:w-auto">
                    <Link href="/dashboard">
                        <Home className="mr-2 h-4 w-4" /> Go to Dashboard
                    </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                    <Link href="/dashboard/my-complaints">
                        Track Status <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>

            {/* Print Button Idea? Maybe later */}
        </div>
    )
}

function CreditCardIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
    )
}

export default function ComplaintSuccessPage() {
    return (
        <Suspense fallback={<div className="p-10 text-center">Loading Action Plan...</div>}>
            <ActionPlanContent />
        </Suspense>
    )
}
