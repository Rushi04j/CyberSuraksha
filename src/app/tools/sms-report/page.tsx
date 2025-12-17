"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Smartphone, Send, Signal } from "lucide-react"

import { useLanguage } from "@/context/language-context"

export default function SMSReportPage() {
    const { t } = useLanguage()
    const [data, setData] = useState({
        bank: "",
        amount: "",
        fraudType: "phishing",
        date: ""
    })

    // Format: REPORT FRAUD <BANK> <AMT> <DATE>
    const generateCode = () => {
        return `REPORT FRAUD ${data.bank.toUpperCase()} ${data.amount} ${data.fraudType.toUpperCase()}`
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(generateCode())
        alert("SMS Code Copied to Clipboard!")
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">{t.tools.smsTitle}</h1>
                <p className="text-muted-foreground">
                    {t.tools.smsDesc}
                </p>
            </div>

            <Card className="border-t-4 border-slate-700 shadow-xl">
                <CardHeader>
                    <div className="flex items-center gap-2 text-slate-700">
                        <Signal className="h-6 w-6" />
                        <CardTitle>{t.tools.smsTitle}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label>{t.tools.bankLabel}</Label>
                        <Input placeholder="e.g. SBI, HDFC, PAYTM" value={data.bank} onChange={e => setData({ ...data, bank: e.target.value })} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>{t.tools.amountLabel}</Label>
                            <Input type="number" placeholder="5000" value={data.amount} onChange={e => setData({ ...data, amount: e.target.value })} />
                        </div>
                        <div>
                            <Label>{t.tools.fraudType}</Label>
                            <Select value={data.fraudType} onValueChange={v => setData({ ...data, fraudType: v })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="phishing">Phishing Link</SelectItem>
                                    <SelectItem value="upifraud">UPI Fraud</SelectItem>
                                    <SelectItem value="card">Credit Card</SelectItem>
                                    <SelectItem value="job">Job Scam</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="p-6 bg-slate-100 dark:bg-slate-900 rounded-xl text-center space-y-4">
                        <p className="text-sm font-semibold text-muted-foreground">YOUR SECURE SMS CODE</p>
                        <div className="text-3xl font-mono font-black tracking-widest break-all">
                            {generateCode()}
                        </div>
                        <p className="text-xs text-muted-foreground">Send this code to <strong>1930</strong> toll-free</p>
                    </div>

                    <Button size="lg" className="w-full h-14 text-lg" onClick={handleCopy}>
                        <Smartphone className="mr-2 h-5 w-5" /> {t.tools.generate}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
