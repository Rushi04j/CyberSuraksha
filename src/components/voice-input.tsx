"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Loader2 } from "lucide-react"

interface VoiceInputProps {
    onTranscript: (text: string) => void
    isListening?: boolean
}

export function VoiceInput({ onTranscript }: VoiceInputProps) {
    const [listening, setListening] = useState(false)
    const [supported, setSupported] = useState(true)

    useEffect(() => {
        if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
            setSupported(false)
        }
    }, [])

    const toggleListening = () => {
        if (!supported) {
            alert("Voice input is not supported in this browser.")
            return
        }

        if (listening) {
            setListening(false)
            // Stop logic would go here
        } else {
            setListening(true)
            // Simulate/Start speech recognition
            // For demo purposes, we will simulate after 3 seconds
            setTimeout(() => {
                const mockPhrases = [
                    "My bank account was hacked yesterday.",
                    "Someone is blackmailing me on Instagram.",
                    "I received a fake lottery call asking for money.",
                    "My neighbor is being harassed online."
                ]
                const randomPhrase = mockPhrases[Math.floor(Math.random() * mockPhrases.length)]
                onTranscript(randomPhrase)
                setListening(false)
            }, 3000)
        }
    }

    if (!supported) return null

    return (
        <div className="flex flex-col items-center gap-2">
            <Button
                variant={listening ? "destructive" : "secondary"}
                size="lg"
                className={`rounded-full h-16 w-16 shadow-xl transition-all ${listening ? "animate-pulse scale-110" : "hover:scale-105"}`}
                onClick={toggleListening}
                title="Press to Speak"
            >
                {listening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
            </Button>
            <span className="text-xs font-medium text-muted-foreground animate-in fade-in">
                {listening ? "Listening... (Speak in Hindi/English)" : "Tap to Speak"}
            </span>
        </div>
    )
}
