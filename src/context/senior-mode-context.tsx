"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type SeniorModeContextType = {
    isSeniorMode: boolean
    toggleSeniorMode: () => void
}

const SeniorModeContext = createContext<SeniorModeContextType | undefined>(undefined)

export function SeniorModeProvider({ children }: { children: React.ReactNode }) {
    const [isSeniorMode, setIsSeniorMode] = useState(false)

    // Persist preference
    useEffect(() => {
        const stored = localStorage.getItem("senior-mode")
        if (stored === "true") setIsSeniorMode(true)
    }, [])

    const toggleSeniorMode = () => {
        const newVal = !isSeniorMode
        setIsSeniorMode(newVal)
        localStorage.setItem("senior-mode", String(newVal))
    }

    return (
        <SeniorModeContext.Provider value={{ isSeniorMode, toggleSeniorMode }}>
            <div className={isSeniorMode ? "senior-mode-active" : ""}>
                {children}
            </div>
        </SeniorModeContext.Provider>
    )
}

export const useSeniorMode = () => {
    const context = useContext(SeniorModeContext)
    if (context === undefined) {
        throw new Error("useSeniorMode must be used within a SeniorModeProvider")
    }
    return context
}
