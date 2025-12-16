"use client"

import { useState, useRef, useEffect } from "react"
import { knowledgeBase, defaultAnswer } from "@/lib/ai-knowledge-base"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Scale,
  Shield,
  FileText,
  AlertTriangle,
  Clock,
  BookOpen,
  Search,
  Lightbulb,
  ChevronDown,
  Mic,
} from "lucide-react"

// ✅ Types
interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  type?: "text" | "suggestion"
}

export default function AIAssistantPage() {
  const { t } = useLanguage()

  // Dynamic Topics based on Language
  const quickTopics = [
    {
      title: t.ai?.topics?.police?.title || "Police Reports",
      description: t.ai?.topics?.police?.desc || "Learn how to file and track police reports.",
      icon: FileText,
      questions: [
        t.ai?.questions?.[0] || "How can I file a police report?",
        t.ai?.questions?.[1] || "Can I withdraw a police complaint?",
      ],
    },
    {
      title: t.ai?.topics?.rights?.title || "Legal Rights",
      description: t.ai?.topics?.rights?.desc || "Understand your basic rights and protections.",
      icon: Shield,
      questions: [
        t.ai?.questions?.[2] || "What are my rights during an arrest?",
        t.ai?.questions?.[3] || "Can I remain silent?"
      ],
    },
  ]

  const commonQuestions = [
    t.ai?.questions?.[4] || "Can I report a crime anonymously?",
    t.ai?.questions?.[5] || "What evidence should I collect?",
    t.ai?.questions?.[6] || "How long does a legal case take?",
    t.ai?.questions?.[7] || "Do I need a lawyer for a minor offense?",
  ]

  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showScrollBtn, setShowScrollBtn] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [initialized, setInitialized] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Initialize Greeting on Load
  useEffect(() => {
    if (!initialized && t.ai) {
      setMessages([
        {
          id: "init",
          content: `Hello! I'm your ${t.ai.title}. ${t.ai.subtitle}`,
          sender: "assistant",
          timestamp: new Date()
        }
      ])
      setInitialized(true)
    }
  }, [t.ai, initialized])


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    const bottom =
      target.scrollHeight - target.scrollTop - target.clientHeight < 80
    setShowScrollBtn(!bottom)
  }

  // ✅ Typed speech recognition constructor
  const createSpeechRecognition = (): SpeechRecognition | null => {
    // Check purely for browser support
    if (typeof window !== 'undefined') {
      const SpeechRecognitionConstructor =
        window.SpeechRecognition || window.webkitSpeechRecognition
      return SpeechRecognitionConstructor
        ? new SpeechRecognitionConstructor()
        : null
    }
    return null
  }

  const startSpeechRecognition = () => {
    const recognition = createSpeechRecognition()
    if (!recognition) {
      alert("Speech recognition is not supported in this browser.")
      return
    }

    recognitionRef.current = recognition
    recognition.lang = "en-US" // Could be dynamic based on language context
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript
      setInputMessage(transcript)
    }

    recognition.onerror = () => setIsRecording(false)
    recognition.onend = () => setIsRecording(false)

    setIsRecording(true)
    recognition.start()
  }

  const stopSpeechRecognition = () => {
    recognitionRef.current?.stop()
    setIsRecording(false)
  }

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(message),
        sender: "assistant",
        timestamp: new Date(),
        type: "text",
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase()

    // Find the best match based on keyword intersection count
    let bestMatch = { answer: "", score: 0 };

    for (const item of knowledgeBase) {
      const matchCount = item.keywords.filter(k => lowerMsg.includes(k.toLowerCase())).length;
      if (matchCount > bestMatch.score) {
        bestMatch = { answer: item.answer, score: matchCount };
      }
    }

    if (bestMatch.score > 0) {
      return bestMatch.answer;
    }

    return defaultAnswer;
  }

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question)
  }
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Bot className="h-12 w-12 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              {t.ai?.title}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.ai?.subtitle}
          </p>
        </div>

        {/* Disclaimer */}
        <Card className="mb-8 border-yellow-200 bg-yellow-50/50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">
                  {t.ai?.disclaimerTitle}
                </h3>
                <p className="text-sm text-yellow-700">
                  {t.ai?.disclaimer}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Area */}
          <div className="lg:col-span-2 flex flex-col h-[680px] rounded-xl glassy shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>{t.ai?.chatTitle}</span>
              </CardTitle>
              <CardDescription>
                {t.ai?.chatDesc}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden relative">
              <ScrollArea onScroll={onScroll} className="flex-1 p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${message.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                      }`}
                  >
                    {message.sender === "assistant" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user"
                        ? "bg-primary text-white"
                        : "bg-muted"
                        }`}
                    >
                      <p className="text-sm whitespace-pre-line">
                        {message.content}
                      </p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex space-x-3 items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3 flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </ScrollArea>

              {showScrollBtn && (
                <button
                  onClick={scrollToBottom}
                  className="absolute right-6 bottom-6 z-10 rounded-full bg-primary p-2 shadow-lg text-white hover:bg-primary/90 transition"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              )}
            </CardContent>

            <div className="p-6 border-t flex space-x-2">
              <Input
                placeholder={t.ai?.placeholder}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSendMessage(inputMessage)
                }
                className="flex-1 text-foreground bg-background border-input"
              />
              <Button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
              <Button
                variant={isRecording ? "destructive" : "outline"}
                onClick={
                  isRecording ? stopSpeechRecognition : startSpeechRecognition
                }
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5" />
                  <span>{t.ai?.quickTopics}</span>
                </CardTitle>
                <CardDescription>
                  {t.ai?.chatDesc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickTopics.map((topic, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <topic.icon className="h-4 w-4 text-primary" />
                      <h4 className="font-medium text-sm">{topic.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {topic.description}
                    </p>
                    <div className="space-y-1">
                      {topic.questions.map((q, qIdx) => (
                        <Button
                          key={qIdx}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-xs h-auto p-2 text-left"
                          onClick={() => handleQuickQuestion(q)}
                        >
                          {q}
                        </Button>
                      ))}
                    </div>
                    {idx < quickTopics.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Common Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>{t.ai?.commonQuestions}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {commonQuestions.map((q, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs h-auto p-2 text-left"
                    onClick={() => handleQuickQuestion(q)}
                  >
                    {q}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Legal Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{t.ai?.resources}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Legal Forms & Documents
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Scale className="h-4 w-4 mr-2" />
                  Know Your Rights Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Victim Support Services
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Legal Process Timeline
                </Button>
              </CardContent>
            </Card>

            {/* Emergency */}
            <Card className="border-red-300 bg-red-50">
              <CardContent className="p-4 text-center">
                <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-red-700 mb-2">
                  {t.ai?.emergencyTitle}
                </h3>
                <p className="text-sm text-red-600 mb-3">
                  {t.ai?.emergencyDesc}
                </p>
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => (window.location.href = "tel:100")}
                >
                  {t.ai?.call911}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
