"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, CheckCircle2, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SMSTrackerPage() {
    const [step, setStep] = useState<"input" | "sending" | "sent">("input")
    const [caseId, setCaseId] = useState("")

    const handleMissedCall = () => {
        setStep("sending")
        setTimeout(() => {
            setStep("sent")
        }, 2000)
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            <Button variant="ghost" asChild className="absolute top-4 left-4 text-white">
                <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
            </Button>

            <div className="max-w-sm w-full bg-white rounded-3xl overflow-hidden shadow-2xl relative">
                {/* Mobile Frame Header */}
                <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
                    <span className="text-xs">19:30</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                </div>

                <div className="p-6 h-[500px] flex flex-col items-center justify-center bg-slate-100">
                    {step === "input" && (
                        <div className="text-center space-y-6 w-full">
                            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-green-600">
                                <Phone className="h-10 w-10 animate-pulse" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">SMS Case Tracker</h2>
                            <p className="text-sm text-slate-500">No Internet? No Problem. <br />Enter Case ID to simulate a 'Missed Call' query.</p>

                            <Input
                                placeholder="Enter Case ID (e.g. 1930005)"
                                className="text-center text-lg tracking-widest bg-white border-slate-300"
                                value={caseId}
                                onChange={(e) => setCaseId(e.target.value)}
                            />

                            <Button
                                className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
                                onClick={handleMissedCall}
                                disabled={!caseId}
                            >
                                Give Missed Call
                            </Button>
                        </div>
                    )}

                    {step === "sending" && (
                        <div className="text-center space-y-4">
                            <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto" />
                            <p className="text-slate-600 font-medium">Dialing 1930...</p>
                        </div>
                    )}

                    {step === "sent" && (
                        <div className="w-full animate-in zoom-in duration-300">
                            <div className="bg-slate-200 p-3 rounded-t-xl text-xs text-slate-500 text-center uppercase tracking-wider font-bold">
                                Messages • Now
                            </div>
                            <div className="bg-white p-4 border-x border-b rounded-b-xl shadow-lg relative">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-slate-200 border-r-[10px] border-r-transparent"></div>

                                <h3 className="text-xs font-bold text-slate-400 mb-1">CYBER-POLICE</h3>
                                <p className="text-sm font-medium text-slate-800">
                                    Status for Case #{caseId}: <br />
                                    <span className="text-green-600">bank account frozen.</span> <br />
                                    Refund process initiated. Visit nearest station for KYC within 48 hrs.
                                </p>
                                <p className="text-[10px] text-slate-400 mt-2 text-right">Just now via SMS</p>
                            </div>

                            <Button
                                variant="outline"
                                className="mt-8 w-full"
                                onClick={() => setStep("input")}
                            >
                                Check Another Case
                            </Button>
                        </div>
                    )}
                </div>

                {/* Mobile Frame Footer */}
                <div className="bg-slate-900 p-4 flex justify-center">
                    <div className="w-32 h-1 bg-slate-600 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}
