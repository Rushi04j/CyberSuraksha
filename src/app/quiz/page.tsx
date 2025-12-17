"use client"

import { useState } from "react"
import { BadgeCheck, Brain, ChevronRight, RefreshCw, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
// import Confetti from "react-confetti" // Ideally we would use this for celebration

const QUESTIONS = [
    {
        question: "You receive an SMS: 'Your Electricity will be cut in 2 hours. Call 98XXX'. What do you do?",
        options: ["Call the number immediately", "Ignore it", "Check official bill/app", "Pay the amount requested"],
        answer: 2,
        explanation: "Scammers create urgency. Always verify using the official electricity board app or website."
    },
    {
        question: "A 'Police Officer' video calls you saying you are under 'Digital Arrest'. Is this real?",
        options: ["Yes, I should hide", "No, 'Digital Arrest' is a SCAM", "Maybe, I should pay bail", "Yes, I should share Aadhaar"],
        answer: 1,
        explanation: "Indian Law does NOT have 'Digital Arrest'. Police never ask for money or video call interrogation."
    },
    {
        question: "Which of these is a secure password?",
        options: ["password123", "Rahul@1990", "Cyb3r$ur@ksha#2025", "12345678"],
        answer: 2,
        explanation: "A strong password has Uppercase, Lowercase, Numbers, and Special Characters."
    },
    {
        question: "You won a lottery you never entered! They need a small 'processing fee'.",
        options: ["Pay the fee", "It's a classic 419 Scam", "Give bank details", "Forward to friends"],
        answer: 1,
        explanation: "Legitimate lotteries never ask for a fee to release winnings."
    },
    {
        question: "What is the National Cyber Crime Helpline number?",
        options: ["100", "1930", "155260", "911"],
        answer: 1,
        explanation: "1930 is the dedicated Cyber Financial Fraud Helpline in India."
    }
]

export default function QuizPage() {
    const [currentQ, setCurrentQ] = useState(0)
    const [score, setScore] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [selectedOpt, setSelectedOpt] = useState<number | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)

    const handleAnswer = (idx: number) => {
        setSelectedOpt(idx)
        setIsAnswered(true)
        if (idx === QUESTIONS[currentQ].answer) {
            setScore(score + 1)
        }
    }

    const nextQuestion = () => {
        if (currentQ < QUESTIONS.length - 1) {
            setCurrentQ(currentQ + 1)
            setSelectedOpt(null)
            setIsAnswered(false)
        } else {
            setShowResult(true)
        }
    }

    const restart = () => {
        setCurrentQ(0)
        setScore(0)
        setShowResult(false)
        setSelectedOpt(null)
        setIsAnswered(false)
    }

    if (showResult) {
        const passed = score >= 4
        return (
            <div className="container mx-auto px-4 py-12 max-w-md text-center animate-in zoom-in duration-500">
                <Card className={`border-t-8 ${passed ? 'border-green-500' : 'border-orange-500'} shadow-2xl`}>
                    <CardHeader>
                        <div className="mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            {passed ? <Trophy className="h-12 w-12 text-yellow-500" /> : <Brain className="h-12 w-12 text-orange-500" />}
                        </div>
                        <CardTitle className="text-2xl">{passed ? "Cyber Safe Certified!" : "Keep Learning!"}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-4xl font-bold">{score} / {QUESTIONS.length}</p>
                        <p className="text-muted-foreground">
                            {passed ? "Excellent! You are ready to defend yourself against cyber threats." : "You need a score of 4/5 to get certified. Try again!"}
                        </p>

                        {passed && (
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mt-4">
                                <BadgeCheck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                <p className="font-serif italic text-lg text-slate-800">Certificate of Cyber Awareness</p>
                                <p className="text-xs uppercase tracking-widest text-slate-500 mt-1">CyberSuraksha Verified</p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button onClick={restart} className="w-full" variant="outline">
                            <RefreshCw className="mr-2 h-4 w-4" /> Retake Quiz
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Brain className="text-primary" /> Cyber IQ Test
                </h1>
                <span className="text-sm font-semibold bg-muted px-3 py-1 rounded-full">
                    Question {currentQ + 1}/{QUESTIONS.length}
                </span>
            </div>

            <Progress value={((currentQ) / QUESTIONS.length) * 100} className="h-2 mb-8" />

            <Card className="min-h-[400px] flex flex-col justify-between shadow-lg">
                <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-6">{QUESTIONS[currentQ].question}</h2>

                    <div className="space-y-3">
                        {QUESTIONS[currentQ].options.map((opt, idx) => {
                            let btnClass = "w-full justify-start text-left h-auto py-3 px-4 "
                            if (isAnswered) {
                                if (idx === QUESTIONS[currentQ].answer) btnClass += "bg-green-100 border-green-500 text-green-900 "
                                else if (idx === selectedOpt) btnClass += "bg-red-100 border-red-500 text-red-900 "
                                else btnClass += "opacity-50 "
                            } else {
                                btnClass += "hover:bg-primary/5 "
                            }

                            return (
                                <Button
                                    key={idx}
                                    variant="outline"
                                    className={btnClass}
                                    onClick={() => !isAnswered && handleAnswer(idx)}
                                >
                                    <span className="mr-3 font-mono font-bold text-muted-foreground">{String.fromCharCode(65 + idx)}.</span>
                                    {opt}
                                </Button>
                            )
                        })}
                    </div>

                    {isAnswered && (
                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg animate-in fade-in">
                            <p className="font-bold text-sm mb-1">💡 Explanation:</p>
                            <p className="text-sm">{QUESTIONS[currentQ].explanation}</p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="justify-end border-t pt-4">
                    <Button onClick={nextQuestion} disabled={!isAnswered}>
                        {currentQ === QUESTIONS.length - 1 ? "Finish" : "Next Question"} <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
