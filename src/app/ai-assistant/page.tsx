"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bot, Send, Mic, FileText, ArrowRight, HelpCircle, Scale, Shield, ExternalLink, CheckCircle2, ShieldAlert } from "lucide-react"
import { getAIResponse, AIResponse } from "@/lib/ai-knowledge-base"
import Link from "next/link"
import { VoiceInput } from "@/components/voice-input"

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string | AIResponse }[]>([
    {
      role: 'assistant',
      content: {
        text: "Namaste! I am your Government-Verified Legal Guide. I can help you with official cybercrime procedures, rights, and drafting complaints.",
        steps: ["Tell me what happened (e.g. 'I lost money in UPI scam')", "Ask about your Rights (e.g. 'Zero FIR')", "Draft a Complaint"],
        source: 'Official Govt Sources via VLKB'
      } as AIResponse
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate AI processing
    setTimeout(() => {
      const response = getAIResponse(userMsg.content as string)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 1000)
  }

  // Helper to render message content based on type
  const renderMessageContent = (msg: { role: 'user' | 'assistant', content: string | AIResponse }) => {
    if (typeof msg.content === 'string') return <p>{msg.content}</p>

    const data = msg.content as AIResponse
    return (
      <div className="space-y-4 font-sans">
        <p className="text-sm leading-relaxed whitespace-pre-line">{data.text}</p>

        {data.riskLevel && data.riskLevel !== 'Unknown' && (
          <div className={`text-xs font-bold px-2 py-1 rounded inline-block ${data.riskLevel.includes('High') ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
            Recovery Probability: {data.riskLevel}
          </div>
        )}

        {data.legalInfo && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800 animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-bold uppercase text-blue-700 dark:text-blue-300">Verified Law ({data.legalInfo.bnsSection})</span>
            </div>
            <p className="text-xs text-blue-800 dark:text-blue-200 font-medium italic">"{data.legalInfo.description}"</p>
            <p className="text-[10px] text-blue-600 dark:text-blue-400 mt-1 font-semibold">Punishment: {data.legalInfo.punishment}</p>
          </div>
        )}

        {data.steps && (
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1"><Shield className="h-3 w-3" /> Official Procedure</p>
            <ul className="space-y-2">
              {data.steps.map((step, i) => (
                <li key={i} className="flex gap-2 text-sm bg-background p-2 rounded shadow-sm border">
                  <span className="bg-muted text-muted-foreground w-5 h-5 flex items-center justify-center rounded-full text-[10px] shrink-0 font-bold">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.evidenceRequired && (
          <div className="bg-amber-50 dark:bg-amber-900/10 p-3 rounded-lg border border-amber-100 dark:border-amber-800">
            <p className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-1"><FileText className="h-3 w-3" /> Required Evidence</p>
            <div className="flex flex-wrap gap-2">
              {data.evidenceRequired.map((ev, i) => (
                <span key={i} className="text-[10px] bg-background border px-2 py-1 rounded-full text-foreground/80">{ev}</span>
              ))}
            </div>
          </div>
        )}

        {data.recommendedTool && (
          <div className="mt-2">
            <Button asChild size="sm" className="w-full bg-primary/90 hover:bg-primary gap-2 shadow-lg hover:scale-[1.02] transition-transform">
              <Link href={data.recommendedTool.url}>
                <ExternalLink className="h-3 w-3" /> Use {data.recommendedTool.name}
              </Link>
            </Button>
          </div>
        )}

        <div className="pt-2 border-t mt-2">
          <p className="text-[10px] text-muted-foreground italic flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-green-500" /> Source: {data.source}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chat Area */}
        <Card className="lg:col-span-2 h-[85vh] flex flex-col shadow-2xl border-0 ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader className="border-b bg-card dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
            <CardTitle className="flex items-center gap-2 text-xl text-primary">
              <Bot className="h-6 w-6" />
              Cyber Legal Assistant
            </CardTitle>
            <CardDescription>
              Government-Verified Guidance (BNS 2023 & IT Act).
              <span className="block text-xs text-amber-600 dark:text-amber-500 mt-1 font-semibold flex items-center gap-1">
                <ShieldAlert className="h-3 w-3" /> Not a replacement for a lawyer.
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/50 dark:bg-black/20">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-1 shrink-0">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-card border rounded-tl-none ring-1 ring-slate-200 dark:ring-slate-800'
                  }`}>
                  {renderMessageContent(msg)}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-1">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-card border p-3 rounded-2xl rounded-tl-none flex gap-1 items-center h-10">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </CardContent>

          <div className="p-4 bg-card border-t">
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Describe your incident (e.g. 'Fake Police Call', 'UPI Fraud')..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon" className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Shield className="h-3 w-3" /> Secure & Private
              </div>
              <div className="scale-90 origin-right">
                <VoiceInput onTranscript={(text) => setInput(prev => prev + " " + text)} />
              </div>
            </div>
          </div>
        </Card>

        {/* Sidebar Info */}
        <div className="space-y-6 hidden lg:block">
          {/* Quick Topics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Topics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2">
              {["Report UPI Fraud", "Is this Digital Arrest?", "Draft FIR PDF", "Zero FIR Rights", "Sextortion Help"].map(topic => (
                <Button key={topic} variant="outline" className="justify-start text-sm h-auto py-2 px-3" onClick={() => {
                  setInput(topic)
                }}>
                  <ArrowRight className="mr-2 h-3 w-3 text-muted-foreground" /> {topic}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Emergency Card */}
          <Card className="bg-destructive text-destructive-foreground border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldAlert className="h-5 w-5 animate-pulse" /> Emergency?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm font-medium opacity-90">Lost money recently? Call 1930 immediately to freeze funds.</p>
              <Button variant="secondary" className="w-full font-bold shadow-md" asChild>
                <Link href="tel:1930">📞 Call 1930</Link>
              </Button>
              <p className="text-[10px] text-center opacity-75">National Cyber Crime Helpline</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><HelpCircle className="h-4 w-4" /> FAQ</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-2">
              <p><strong>Is this legal advice?</strong><br />No. This is informational guidance based on BNS 2023.</p>
              <p><strong>Can I use the FIR Draft?</strong><br />Yes, it is a valid format for submission.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
