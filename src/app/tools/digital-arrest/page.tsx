"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Phone, PhoneOff, Video, Mic, MicOff, AlertTriangle, ShieldAlert } from "lucide-react"
import Link from "next/link"

export default function DigitalArrestSimulator() {
    const [state, setState] = useState<'incoming' | 'connected' | 'scare' | 'education'>('incoming')
    const [timeLeft, setTimeLeft] = useState(15)

    // Simulate incoming call ring
    useEffect(() => {
        if (state === 'incoming') {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 0) {
                        setState('education') // Missed call -> Safe
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [state])

    const handleAccept = () => {
        setState('connected')
        // After 3 seconds, show the "Scare" tactic
        setTimeout(() => setState('scare'), 3000)
    }

    const handleReject = () => {
        setState('education')
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background blur for realism */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529733-0e670560f7e1?q=80&w=1000&auto=format&fit=crop')] bg-cover opacity-20 blur-sm"></div>

            <Card className="w-full max-w-md h-[80vh] bg-slate-900 border-slate-700 shadow-2xl relative flex flex-col overflow-hidden">

                {/* INCOMING CALL STATE */}
                {state === 'incoming' && (
                    <div className="flex-1 flex flex-col items-center justify-between py-20 animate-in fade-in">
                        <div className="text-center space-y-4">
                            <div className="w-32 h-32 rounded-full bg-slate-700 mx-auto flex items-center justify-center overflow-hidden border-4 border-slate-600">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_k2X_3k3k_3k3k_3k3k_3k3k_3k3k_3k3k_3k3k&s" alt="Police Logo" className="w-full h-full object-cover opacity-50" />
                                <ShieldAlert className="absolute h-16 w-16 text-slate-400" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-light text-white">CBI OFFICER (HQ)</h2>
                                <p className="text-slate-400">Mobile • +91 92847...</p>
                            </div>
                        </div>

                        <div className="w-full flex justify-around px-8">
                            <Button
                                className="h-20 w-20 rounded-full bg-red-600 hover:bg-red-700 shadow-lg shadow-red-900/50 flex flex-col gap-1"
                                onClick={handleReject}
                            >
                                <PhoneOff className="h-8 w-8 text-white" />
                                <span className="text-[10px] uppercase font-bold text-white/80">Decline</span>
                            </Button>

                            <Button
                                className="h-20 w-20 rounded-full bg-green-500 hover:bg-green-600 shadow-lg shadow-green-900/50 animate-bounce flex flex-col gap-1"
                                onClick={handleAccept}
                            >
                                <Phone className="h-8 w-8 text-white" />
                                <span className="text-[10px] uppercase font-bold text-white/80">Accept</span>
                            </Button>
                        </div>
                    </div>
                )}

                {/* CONNECTED / SCARE STATE */}
                {(state === 'connected' || state === 'scare') && (
                    <div className="flex-1 flex flex-col relative">
                        {/* Video Feed Mock */}
                        <div className="flex-1 bg-slate-800 relative">
                            {state === 'scare' ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                                    <div className="text-center p-6 space-y-4">
                                        <div className="bg-red-500/20 p-6 rounded-full inline-block animate-pulse">
                                            <AlertTriangle className="h-16 w-16 text-red-500" />
                                        </div>
                                        <h3 className="text-red-400 font-bold text-xl uppercase tracking-widest">Digital Arrest Warrant</h3>
                                        <p className="text-white text-lg">"Pay ₹50,000 immediately or report to Delhi HQ in 2 hours."</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <p className="text-slate-500 animate-pulse">Connecting secure line...</p>
                                </div>
                            )}

                            {/* Self View */}
                            <div className="absolute top-4 right-4 w-24 h-32 bg-black rounded-lg border border-slate-600 overflow-hidden">
                                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                    <Video className="h-8 w-8 text-slate-500" />
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="h-24 bg-slate-900 flex justify-around items-center px-4">
                            <div className="p-3 bg-slate-800 rounded-full"><MicOff className="h-6 w-6 text-white" /></div>
                            <Button className="h-16 w-16 rounded-full bg-red-600 hover:bg-red-700" onClick={() => setState('education')}>
                                <PhoneOff className="h-8 w-8" />
                            </Button>
                            <div className="p-3 bg-slate-800 rounded-full"><Video className="h-6 w-6 text-white" /></div>
                        </div>

                        {state === 'scare' && (
                            <div className="absolute inset-x-0 bottom-24 p-4">
                                <div className="bg-black/80 text-white p-4 rounded-xl text-center border border-red-500 shadow-2xl">
                                    <p className="font-bold text-lg text-red-400 mb-2">⚠ Is this real?</p>
                                    <Button variant="secondary" className="w-full" onClick={() => setState('education')}>
                                        STOP SIMULATION - SHOW TRUTH
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* EDUCATION STATE (SUCCESS) */}
                {state === 'education' && (
                    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 p-6 animate-in slide-in-from-bottom duration-500">
                        <div className="text-center mb-8">
                            <ShieldAlert className="h-16 w-16 text-green-600 mx-auto mb-4" />
                            <h2 className="text-3xl font-bold text-green-700 dark:text-green-500">You are Safe!</h2>
                            <p className="text-muted-foreground">That was a simulation of a "Digital Arrest" scam.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-500">
                                <h3 className="font-bold text-red-800 dark:text-red-400 mb-2">The Truth:</h3>
                                <ul className="list-disc list-inside space-y-1 text-sm text-red-700 dark:text-red-300">
                                    <li>Indian Police <strong>NEVER</strong> make video calls on WhatsApp/Skype.</li>
                                    <li><strong>"Digital Arrest"</strong> is NOT a real legal term.</li>
                                    <li>No agency asks for money to transfer via UPI to "verify" funds.</li>
                                </ul>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-semibold">What to do if you get such a call?</h4>
                                <div className="flex gap-3 items-center p-3 bg-white dark:bg-slate-800 rounded border shadow-sm">
                                    <div className="bg-blue-100 p-2 rounded-full text-blue-600 font-bold">1</div>
                                    <p className="text-sm">Cut the call immediately.</p>
                                </div>
                                <div className="flex gap-3 items-center p-3 bg-white dark:bg-slate-800 rounded border shadow-sm">
                                    <div className="bg-blue-100 p-2 rounded-full text-blue-600 font-bold">2</div>
                                    <p className="text-sm">Do NOT transfer any money.</p>
                                </div>
                                <div className="flex gap-3 items-center p-3 bg-white dark:bg-slate-800 rounded border shadow-sm">
                                    <div className="bg-blue-100 p-2 rounded-full text-blue-600 font-bold">3</div>
                                    <p className="text-sm">Report the number to 1930.</p>
                                </div>
                            </div>

                            <Button className="w-full h-12 text-lg mt-4" asChild>
                                <Link href="/">Back to Safety</Link>
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    )
}
