"use client"

import { useLanguage } from "@/context/language-context"
import { Language } from "@/lib/translations"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Monitor, Languages, LogOut } from "lucide-react"

export default function SettingsPage() {
    const { language, setLanguage, t } = useLanguage()
    const { user, logout } = useAuth()

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t.nav.settings}</h1>
                <p className="text-muted-foreground">{t.dashboard.subtitle}</p>
            </div>

            <div className="grid gap-6">
                {/* Language Settings */}
                <Card className="glassy">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Languages className="h-5 w-5 text-primary" />
                            Language / भाषा
                        </CardTitle>
                        <CardDescription>Select your preferred language for the interface.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { code: 'en', label: 'English' },
                                { code: 'hi', label: 'हिंदी (Hindi)' },
                                { code: 'mr', label: 'मराठी (Marathi)' },
                                { code: 'te', label: 'తెలుగు (Telugu)' },
                                { code: 'ta', label: 'தமிழ் (Tamil)' },
                                { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
                                { code: 'bn', label: 'বাংলা (Bengali)' },
                            ].map((lang) => (
                                <Button
                                    key={lang.code}
                                    variant={language === lang.code ? "default" : "outline"}
                                    onClick={() => setLanguage(lang.code as Language)}
                                    className="w-full justify-start"
                                >
                                    <span className="text-lg mr-2">{lang.code === 'en' ? '🇺🇸' : '🇮🇳'}</span>
                                    {lang.label}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Profile (Read Only) */}
                <Card className="glassy">
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Managed via national ID (Demo Mode).</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <div className="p-3 rounded-md bg-muted border">{user?.name}</div>
                            </div>
                            <div className="space-y-2">
                                <Label>Email Address</Label>
                                <div className="p-3 rounded-md bg-muted border">{user?.email}</div>
                            </div>
                        </div>
                        <div className="pt-4">
                            <Button variant="destructive" onClick={logout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                {t.nav.logout}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
