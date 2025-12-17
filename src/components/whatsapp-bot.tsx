"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Send, ShieldCheck, ShieldAlert, MessageCircle } from "lucide-react"

export function WhatsAppBot() {
    const [messages, setMessages] = useState<{ id: number, text: string, sender: 'user' | 'bot' }[]>([
        { id: 1, text: "👋 Hi! I am CyberSuraksha Bot. Forward any suspicious message/link here to check.", sender: 'bot' }
    ])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSend = () => {
        if (!input.trim()) return

        const userMsg = { id: Date.now(), text: input, sender: 'user' as const }
        setMessages(prev => [...prev, userMsg])
        setInput("")
        setLoading(true)

        // Simulate AI Analysis
        setTimeout(() => {
            const isUnsafe = userMsg.text.toLowerCase().includes("lottery") ||
                userMsg.text.toLowerCase().includes("win") ||
                userMsg.text.toLowerCase().includes("link") ||
                userMsg.text.toLowerCase().includes("http")

            const botReply = isUnsafe
                ? { id: Date.now() + 1, text: "🚨 UNSAFE DETECTED! This looks like a phishing attempt. Do not click.", sender: 'bot' as const, isDanger: true }
                : { id: Date.now() + 1, text: "✅ SEEMS SAFE. But always verify with the official source.", sender: 'bot' as const, isDanger: false }

            setMessages(prev => [...prev, botReply])
            setLoading(false)
        }, 1500)
    }

    return (
        <Card className="w-full max-w-md mx-auto border-none shadow-2xl overflow-hidden bg-[#e5ddd5] dark:bg-slate-900 h-[600px] flex flex-col">
            <div className="bg-[#075e54] p-4 flex items-center gap-3 text-white shadow-md">
                <div className="bg-white/20 p-2 rounded-full">
                    <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="font-bold">CyberGuard Bot</h3>
                    <p className="text-xs text-white/80">Verified • Online</p>
                </div>
                <ShieldCheck className="ml-auto h-5 w-5 text-green-300" />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] dark:bg-none dark:bg-slate-800 bg-repeat">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg text-sm shadow-sm relative ${msg.sender === 'user'
                                ? 'bg-[#dcf8c6] text-black rounded-tr-none'
                                : 'bg-white text-black rounded-tl-none'
                            }`}>
                            {msg.text}
                            {/* @ts-ignore */}
                            {msg.isDanger && (
                                <div className="mt-2 pt-2 border-t border-red-200">
                                    <Button variant="destructive" size="sm" className="w-full h-8 text-xs">
                                        Report Now
                                    </Button>
                                </div>
                            )}
                            <span className="text-[10px] text-gray-500 absolute bottom-1 right-2 block mt-1">
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm">
                            <div className="flex gap-1">
                                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" />
                                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-3 bg-[#f0f0f0] dark:bg-slate-900 flex gap-2 items-center">
                <Input
                    className="bg-white dark:bg-slate-800 border-none focus-visible:ring-0"
                    placeholder="Type or paste link..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button size="icon" className="rounded-full bg-[#075e54] hover:bg-[#128c7e]" onClick={handleSend}>
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </Card>
    )
}
