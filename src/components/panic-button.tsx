"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Smartphone, Timer, ShieldAlert, AlertOctagon } from "lucide-react"
import { useState } from "react"

import { useLanguage } from "@/context/language-context"

export default function PanicButton() {
    const { t } = useLanguage()
    const [locked, setLocked] = useState(false)

    const handlePanic = () => {
        if (confirm("Are you sure? This will simulate freezing linked bank accounts.")) {
            setLocked(true)
        }
    }

    return (
        <Card className={`border-l-4 ${locked ? 'border-l-green-600 bg-green-50' : 'border-l-red-600 bg-red-50'}`}>
            <CardHeader className="pb-2">
                <CardTitle className="text-red-700 flex items-center gap-2">
                    {locked ? <Lock className="h-6 w-6 text-green-700" /> : <ShieldAlert className="h-6 w-6" />}
                    {locked ? t.panicButton.activeTitle : t.panicButton.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {locked ? (
                    <div className="text-green-800">
                        <p className="font-bold">{t.panicButton.activeDesc}</p>
                        <Button variant="outline" size="sm" className="mt-4" onClick={() => setLocked(false)}>{t.panicButton.reset}</Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm text-red-800">
                            {t.panicButton.desc}
                        </p>
                        <Button variant="destructive" className="w-full text-lg font-bold animate-pulse" onClick={handlePanic}>
                            <Lock className="mr-2 h-5 w-5" /> {t.panicButton.button}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
