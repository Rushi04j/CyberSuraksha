"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Download, Printer, Shield } from "lucide-react"

export default function FIRDrafterPage() {
    const [step, setStep] = useState(1)
    const [generating, setGenerating] = useState(false)
    const [generated, setGenerated] = useState(false)

    const handleGenerate = () => {
        setGenerating(true)
        setTimeout(() => {
            setGenerating(false)
            setGenerated(true)
        }, 2000)
    }

    return (
        <div className="container mx-auto py-10 max-w-3xl">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                    <FileText className="h-8 w-8 text-primary" /> AI FIR Drafter
                </h1>
                <p className="text-muted-foreground">
                    Generate a legally compliant police complaint (FIR Application) in seconds.
                    <br /><span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded mt-2 inline-block">Cites BNS 2023 & IT Act 2000 automatically</span>
                </p>
            </div>

            {!generated ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Incident Details</CardTitle>
                        <CardDescription>Enter the key facts. The AI will format them into legal language.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Select Incident Type</Label>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Select type..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="financial">Financial Fraud / UPI Scam</SelectItem>
                                        <SelectItem value="stalking">Cyber Stalking / Harassment</SelectItem>
                                        <SelectItem value="identity">Identity Theft / Fake Profile</SelectItem>
                                        <SelectItem value="job">Fake Job Offer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Amount Lost (if any)</Label>
                                <Input placeholder="₹ 0.00" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Transaction ID / Suspect Number</Label>
                            <Input placeholder="e.g. UTR 12345678 or +91 98765..." />
                        </div>

                        <div className="space-y-2">
                            <Label>Description of Incident</Label>
                            <Textarea placeholder="I received a call from..." className="min-h-[100px]" />
                        </div>

                        <Button className="w-full h-12 text-lg" onClick={handleGenerate} disabled={generating}>
                            {generating ? "Drafting Legal Document..." : "Generate PDF"}
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <Card className="border-green-200 bg-green-50/50">
                        <CardContent className="p-6 text-center text-green-800">
                            <Shield className="h-12 w-12 mx-auto text-green-600 mb-2" />
                            <h3 className="text-xl font-bold">Document Ready!</h3>
                            <p>Your FIR application has been drafted citing <strong>Section 318 (Cheating) of BNS 2023</strong> and <strong>Section 66D of IT Act 2000</strong>.</p>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="h-24 flex flex-col gap-2 hover:bg-slate-100" onClick={() => window.print()}>
                            <Printer className="h-8 w-8 text-primary" />
                            <span className="font-bold">Print Application</span>
                        </Button>
                        <Button className="h-24 flex flex-col gap-2 bg-primary text-white hover:bg-primary/90">
                            <Download className="h-8 w-8" />
                            <span className="font-bold">Download PDF</span>
                        </Button>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Preview</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 bg-white border font-serif text-sm leading-relaxed text-slate-800 shadow-inner h-[400px] overflow-y-auto">
                            <p className="font-bold text-center mb-4">APPLICATION FOR REGISTRATION OF F.I.R</p>
                            <p>To,<br />The Station House Officer,<br />Cyber Crime Police Station,<br />[City Name]</p>
                            <br />
                            <p><strong>Subject:</strong> Complaint regarding Financial Fraud under Section 318 of BNS 2023.</p>
                            <br />
                            <p>Respected Sir/Madam,</p>
                            <p>I, [Name], resident of [Address], wish to report a cybercrime incident.</p>
                            <p>On [Date], I received a fraudulent communication...</p>
                            <br />
                            <p className="bg-yellow-100 p-1"><strong>Legal Reference:</strong> The act committed falls under Section 66D (Cheating by personation using computer resource) of the Information Technology Act, 2000.</p>
                            <br />
                            <p>I request you to register an FIR and take necessary action to freeze the beneficiary account.</p>
                            <br />
                            <p>Sincerely,<br />[Name]</p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
