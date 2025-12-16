"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, FileText, ScrollText, Shield, Menu, LogOut, User as UserIcon, Settings, Bot } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, logout } = useAuth()
    const { t } = useLanguage()
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    const navigation = [
        { name: t.nav.overview, href: "/dashboard", icon: LayoutDashboard },
        { name: t.nav.fileComplaint, href: "/dashboard/file-complaint", icon: FileText },
        { name: t.nav.myComplaints, href: "/dashboard/my-complaints", icon: ScrollText },
        { name: t.nav.safety, href: "/safety", icon: Shield },
        { name: t.nav.ai || "AI Assistant", href: "/ai-assistant", icon: Bot },
        { name: t.nav.settings, href: "/settings", icon: Settings },
    ]

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-card text-card-foreground">
            <div className="p-6 border-b">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <Shield className="h-6 w-6 text-primary" />
                    <span>CyberSuraksha</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-6 px-3">
                <nav className="space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="p-4 border-t bg-muted/20">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="bg-primary/10 p-2 rounded-full ring-1 ring-primary/20">
                        <UserIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">{user?.name || "Citizen"}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                    <ThemeToggle />
                    <LanguageToggle />
                </div>
                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t.nav.logout}
                </Button>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b bg-white dark:bg-gray-900 sticky top-0 z-20">
                <div className="flex items-center gap-2 font-bold">
                    <Shield className="h-6 w-6 text-primary" />
                    <span>CyberSuraksha</span>
                </div>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 sm:max-w-xs">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="flex h-screen overflow-hidden">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:flex w-64 flex-col border-r bg-white dark:bg-gray-900 sticky top-0 h-screen">
                    <SidebarContent />
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="container max-w-6xl mx-auto p-4 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
