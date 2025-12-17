"use client"

import { AlertTriangle, BookOpen } from "lucide-react"

export function LegalDisclaimer() {
    return (
        <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 mt-8">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-4 text-xs text-muted-foreground">
                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                <p>
                    <span className="font-bold">Government of India Compliance Notice:</span> This platform is a facilitator for accessing justice.
                    Information provided is based on the <strong>Bharatiya Nyaya Sanhita (BNS) 2023</strong> and <strong>IT Act 2000</strong>.
                    It does not constitute personalized legal counsel. For official FIR registration, please visit your nearest Police Station or <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="underline text-primary">cybercrime.gov.in</a>.
                </p>
                <BookOpen className="h-4 w-4 text-blue-500 shrink-0 hidden md:block" />
            </div>
        </div>
    )
}
