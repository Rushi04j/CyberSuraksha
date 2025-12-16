"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, Users, Settings, Shield, Menu, LogOut, Siren } from "lucide-react"

export default function PoliceLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, logout } = useAuth()
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    // Redirect if not police? (Handled in page logic or middleware ideally, but context check is okay for mock)

    const navigation = [
        { name: "Case Management", href: "/police/dashboard", icon: LayoutDashboard },
        { name: "Officers", href: "/police/dashboard/officers", icon: Users },
        { name: "Station Settings", href: "/police/dashboard/settings", icon: Settings },
    ]

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-slate-900 text-slate-100">
            <div className="p-6 border-b border-slate-800">
                <Link href="/police/dashboard" className="flex items-center gap-2 font-bold text-xl">
                    <Siren className="h-6 w-6 text-blue-500 animate-pulse" />
                    <span>CyberPol</span>
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
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="p-4 border-t border-slate-800 bg-slate-900">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="bg-blue-900/50 p-2 rounded-full ring-1 ring-blue-500/30">
                        <Shield className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate text-white">{user?.name || "Officer"}</p>
                        <p className="text-xs text-slate-400 truncate">{user?.jurisdiction || "Cyber Cell"}</p>
                    </div>
                </div>
                <Button variant="destructive" className="w-full justify-start" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b bg-slate-900 text-white sticky top-0 z-20">
                <div className="flex items-center gap-2 font-bold">
                    <Shield className="h-6 w-6 text-blue-500" />
                    <span>CyberPol Portal</span>
                </div>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-slate-800">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 sm:max-w-xs border-r-slate-800 bg-slate-900 text-white">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="flex h-screen overflow-hidden">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-slate-900 sticky top-0 h-screen">
                    <SidebarContent />
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-slate-100 dark:bg-black">
                    <div className="container max-w-7xl mx-auto p-4 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
