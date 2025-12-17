"use client"

import { useState } from "react"
import { Shield, Smartphone, Globe, CreditCard, Search, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type VerifyResult = 'safe' | 'suspicious' | 'reported' | null;

export default function VerifyToolPage() {
    const [inputType, setInputType] = useState('phone') // phone, upi, url
    const [inputValue, setInputValue] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)
    const [result, setResult] = useState<{ status: VerifyResult, message: string, details?: string } | null>(null)

    const handleVerify = () => {
        if (!inputValue) return;
        setIsVerifying(true);
        setResult(null);

        // Mock Verification Logic
        setTimeout(() => {
            const val = inputValue.toLowerCase();
            let status: VerifyResult = 'safe';
            let message = "This identifier has not been reported in our database.";
            let details = "However, always exercise caution. Even 'safe' numbers can be spoofed.";

            // Mock Bad Actors
            if (val.includes('999') || val.includes('lottery') || val.includes('free') || val.includes('scam')) {
                status = 'reported';
                message = "DANGER: This identifier has been reported 145 times.";
                details = "Reports link this to a 'Digital Arrest' scam ring operating out of Jamtara.";
            } else if (val.includes('offer') || val.includes('bank') || val.length < 5) {
                status = 'suspicious';
                message = "CAUTION: Suspicious patterns detected.";
                details = "This looks like a system-generated ID often used for bulk spam.";
            }

            setResult({ status, message, details });
            setIsVerifying(false);
        }, 1500);
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
                    Verify Before You Pay
                </h1>
                <p className="text-muted-foreground">
                    Check Phone Numbers, UPI IDs, or Links against our national cybercrime database.
                </p>
            </div>

            <Card className="border-t-4 border-t-primary shadow-xl">
                <CardHeader>
                    <div className="flex justify-center space-x-6 mb-6">
                        <button
                            onClick={() => setInputType('phone')}
                            className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${inputType === 'phone' ? 'bg-primary/10 text-primary scale-110' : 'text-muted-foreground hover:bg-muted'}`}
                        >
                            <Smartphone className="h-6 w-6" />
                            <span className="text-xs font-semibold">Phone</span>
                        </button>
                        <button
                            onClick={() => setInputType('upi')}
                            className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${inputType === 'upi' ? 'bg-primary/10 text-primary scale-110' : 'text-muted-foreground hover:bg-muted'}`}
                        >
                            <CreditCard className="h-6 w-6" />
                            <span className="text-xs font-semibold">UPI ID</span>
                        </button>
                        <button
                            onClick={() => setInputType('url')}
                            className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${inputType === 'url' ? 'bg-primary/10 text-primary scale-110' : 'text-muted-foreground hover:bg-muted'}`}
                        >
                            <Globe className="h-6 w-6" />
                            <span className="text-xs font-semibold">Website</span>
                        </button>
                    </div>
                    {/* <CardTitle className="text-center">Enter Details</CardTitle> */}
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex gap-2">
                        <Input
                            placeholder={
                                inputType === 'phone' ? "Enter 10-digit mobile number..." :
                                    inputType === 'upi' ? "e.g. merchant@okhdfc" : "https://suspicious-link.com"
                            }
                            className="h-12 text-lg"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                        />
                        <Button size="lg" className="h-12 px-8" onClick={handleVerify} disabled={!inputValue || isVerifying}>
                            {isVerifying ? "Checking..." : "Verify"}
                        </Button>
                    </div>

                    {/* Results Section */}
                    {result && (
                        <div className="animate-in fade-in zoom-in duration-300">
                            <Alert className={`border-l-4 ${result.status === 'reported' ? 'border-l-red-600 bg-red-50 dark:bg-red-900/20' :
                                    result.status === 'suspicious' ? 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                                        'border-l-green-600 bg-green-50 dark:bg-green-900/20'
                                }`}>
                                <div className="flex items-start gap-4">
                                    {result.status === 'reported' ? <AlertTriangle className="h-6 w-6 text-red-600" /> :
                                        result.status === 'suspicious' ? <Info className="h-6 w-6 text-yellow-600" /> :
                                            <CheckCircle className="h-6 w-6 text-green-600" />
                                    }
                                    <div>
                                        <AlertTitle className={`text-lg font-bold mb-1 ${result.status === 'reported' ? 'text-red-700' :
                                                result.status === 'suspicious' ? 'text-yellow-700' :
                                                    'text-green-700'
                                            }`}>
                                            {result.status === 'reported' ? "HIGH RISK DETECTED" :
                                                result.status === 'suspicious' ? "POTENTIAL RISK" :
                                                    "NO REPORTS FOUND"}
                                        </AlertTitle>
                                        <AlertDescription className="text-foreground/80">
                                            <p className="font-semibold mb-2">{result.message}</p>
                                            <p className="text-sm opacity-90">{result.details}</p>
                                        </AlertDescription>
                                    </div>
                                </div>
                            </Alert>

                            {result.status === 'reported' && (
                                <Button className="w-full mt-4 bg-red-600 hover:bg-red-700" onClick={() => window.location.href = '/dashboard/file-complaint'}>
                                    Report this {inputType === 'phone' ? 'Number' : inputType === 'upi' ? 'ID' : 'Link'}
                                </Button>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>This tool searches across the CyberSuraksha National Database and community reports.</p>
                <p>Results are indicative. Always verify directly with banks/organizations.</p>
            </div>
        </div>
    )
}
