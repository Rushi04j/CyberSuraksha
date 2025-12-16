"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Role } from "@/lib/types"
import { mockApi } from "@/lib/mockData"
import { supabase } from "@/lib/supabase"
import { api } from "@/lib/api"

interface AuthContextType {
    user: User | null
    login: (role: Role) => Promise<void>
    logout: () => Promise<void>
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    // Initialize Auth State
    useEffect(() => {
        const initAuth = async () => {
            // 1. Check Supabase Session
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                // Fetch extended profile
                const profile = await api.getUserProfile(session.user.id);
                if (profile) {
                    setUser({ ...profile, email: session.user.email || profile.email });
                } else {
                    // Fallback: Create partial user from session if profile missing
                    setUser({
                        id: session.user.id,
                        email: session.user.email!,
                        name: session.user.user_metadata.full_name || 'User',
                        role: 'citizen' // Default
                    })
                }
            } else {
                // 2. Check LocalStorage for Mock Session (Fallback)
                const storedUser = localStorage.getItem("cs_user")
                if (storedUser) {
                    setUser(JSON.parse(storedUser))
                }
            }
            setLoading(false)
        }

        initAuth();

        // Listen for Auth Changes (Supabase)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session) {
                const profile = await api.getUserProfile(session.user.id);
                if (profile) {
                    setUser({ ...profile, email: session.user.email || '' });
                } else {
                    setUser({
                        id: session.user.id,
                        email: session.user.email!,
                        name: session.user.user_metadata.full_name || 'User',
                        role: 'citizen'
                    })
                }
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                localStorage.removeItem("cs_user"); // Clear mock too
                router.push("/");
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [router])

    const login = async (role: Role) => {
        // For Demo purposes, we still allow the "Mock Login" flow if no real auth is triggered
        // In a real app, this function would take email/password and call supabase.auth.signInWithPassword

        // START MOCK LOGIN
        const mockUser = await mockApi.login(role)
        setUser(mockUser)
        localStorage.setItem("cs_user", JSON.stringify(mockUser))

        if (role === "police") {
            router.push("/police/dashboard")
        } else {
            router.push("/dashboard")
        }
        // END MOCK LOGIN
    }

    const logout = async () => {
        await supabase.auth.signOut(); // Real Logout
        setUser(null)
        localStorage.removeItem("cs_user") // Mock Logout
        router.push("/")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
