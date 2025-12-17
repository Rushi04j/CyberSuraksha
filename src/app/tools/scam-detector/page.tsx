"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, AlertTriangle, CheckCircle, Info, ScanLine, Smartphone } from "lucide-react"

export default function ScamDetectorPage() {
    const [analyzing, setAnalyzing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [result, setResult] = useState<{ status: 'danger' | 'warning' | 'safe', confidence: number, triggers: string[] } | null>(null)
    const [image, setImage] = useState<string | null>(null)

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setImage(URL.createObjectURL(file))
            setResult(null)
        }
    }

    const analyzeImage = () => {
        if (!image) return
        setAnalyzing(true)
        setProgress(0)

        // Simulate Analysis Progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) {
                    clearInterval(interval)
                    return 90
                }
                return prev + 10
            })
        }, 200)

        // Mock Result
        setTimeout(() => {
            clearInterval(interval)
            setProgress(100)
            setResult({
                status: 'danger',
                confidence: 94.5,
                triggers: [
                    "Urgency keyword: 'Immediately'",
                    "Suspicious Link: 'bit.ly/bank-kyc'",
                    "Request for sensitive info (PIN)",
                    "Grammatical errors detected"
                ]
            })
            setAnalyzing(false)
        }, 2500)
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    WhatsApp Scam-o-Meter
                </h1>
                <p className="text-muted-foreground">
                    Upload a screenshot of a suspicious chat or SMS. Our AI will analyze it for fraud patterns.
                </p>
            </div>

            <Card className="border-t-4 border-t-teal-500 shadow-xl">
                <CardContent className="p-6 space-y-6">

                    {/* Upload Area */}
                    <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${image ? 'border-teal-500/50 bg-teal-50/10' : 'border-slate-200 hover:bg-slate-50'}`}>
                        {image ? (
                            <div className="relative">
                                <img src={image} alt="Upload" className="max-h-64 mx-auto rounded shadow-sm" />
                                <Button variant="secondary" size="sm" className="absolute top-2 right-2" onClick={() => { setImage(null); setResult(null); }}>
                                    Change
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="bg-teal-100 dark:bg-teal-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Smartphone className="h-8 w-8 text-teal-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Upload Screenshot</h3>
                                <p className="text-sm text-muted-foreground mb-4">Supports JPG, PNG (Max 5MB)</p>
                                <input type="file" accept="image/*" id="scan-upload" className="hidden" onChange={handleUpload} />
                                <Button asChild>
                                    <label htmlFor="scan-upload" className="cursor-pointer">
                                        <Upload className="mr-2 h-4 w-4" /> Select Image
                                    </label>
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Analysis Button */}
                    {image && !result && (
                        <div className="space-y-4">
                            {analyzing ? (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                                        <span>Scanning text patterns (OCR)...</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <Progress value={progress} className="h-2" />
                                </div>
                            ) : (
                                <Button onClick={analyzeImage} className="w-full h-12 text-lg bg-teal-600 hover:bg-teal-700">
                                    <ScanLine className="mr-2 h-5 w-5" /> Analyze for Scams
                                </Button>
                            )}
                        </div>
                    )}

                    {/* Results */}
                    {result && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Alert className={`border-l-4 ${result.status === 'danger' ? 'border-l-red-600 bg-red-50 dark:bg-red-900/10' : 'border-l-green-600 bg-green-50'
                                }`}>
                                <div className="flex gap-4">
                                    {result.status === 'danger' ? <AlertTriangle className="h-8 w-8 text-red-600" /> : <CheckCircle className="h-8 w-8 text-green-600" />}
                                    <div>
                                        <AlertTitle className="text-xl font-bold mb-1">
                                            {result.status === 'danger' ? "HIGH PROBABILITY OF SCAM" : "Looks Safe"}
                                        </AlertTitle>
                                        <AlertDescription>
                                            <p className="mb-2 font-medium opacity-90">AI Confidence: {result.confidence}%</p>
                                            <ul className="list-disc pl-4 space-y-1 text-sm">
                                                {result.triggers.map((t, i) => (
                                                    <li key={i}>{t}</li>
                                                ))}
                                            </ul>
                                        </AlertDescription>
                                    </div>
                                </div>
                            </Alert>

                            {result.status === 'danger' && (
                                <Button variant="destructive" className="w-full mt-4" onClick={() => window.location.href = '/file-complaint'}>
                                    Report this immediately
                                </Button>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
