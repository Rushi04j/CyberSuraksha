"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, BookOpen, AlertTriangle } from "lucide-react"

export function ZeroFirCard() {
    return (
        <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-indigo-200 dark:border-indigo-800">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                    <Scale className="h-5 w-5" /> Know Your Rights: Zero FIR
                </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                    Police refused to file your complaint because of "Jurisdiction"?
                </p>
                <div className="bg-white/60 dark:bg-black/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900">
                    <p className="text-slate-700 dark:text-slate-300">
                        <strong>The Law:</strong> According to Ministry of Home Affairs advisories and Supreme Court rulings (Lalita Kumari vs. Govt. of UP), a police station <span className="underline decoration-red-400 decoration-2 font-bold">CANNOT REFUSE</span> to register an FIR for a cognizable offense on grounds of jurisdiction.
                    </p>
                </div>
                <div className="flex gap-2 items-start mt-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700 dark:text-amber-500">
                        They must register a <strong>"Zero FIR"</strong> and transfer it to the correct station themselves. Show this card to the Duty Officer if denied.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
