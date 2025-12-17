"use client"

import { WhatsAppBot } from "@/components/whatsapp-bot"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function WhatsAppBotPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6 order-2 md:order-1">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
                    </Button>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                        Is that message safe?
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Don't get tricked by fake lottery links, job offers, or "bank" alerts.
                        Forward the message to our <strong>CyberGuard Bot</strong> and check instantly.
                    </p>
                    <div className="flex gap-4">
                        <div className="p-4 bg-green-100 rounded-lg dark:bg-green-900/20">
                            <h3 className="font-bold text-green-800 dark:text-green-400">Step 1</h3>
                            <p className="text-sm text-green-700 dark:text-green-500">Copy the suspicious text.</p>
                        </div>
                        <div className="p-4 bg-blue-100 rounded-lg dark:bg-blue-900/20">
                            <h3 className="font-bold text-blue-800 dark:text-blue-400">Step 2</h3>
                            <p className="text-sm text-blue-700 dark:text-blue-500">Paste it in the chat.</p>
                        </div>
                    </div>
                </div>
                <div className="order-1 md:order-2 flex justify-center">
                    <WhatsAppBot />
                </div>
            </div>
        </div>
    )
}
