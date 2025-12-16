"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Shield, Phone } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Safety Resources", href: "/safety" },
    { name: "AI Assistant", href: "/ai-assistant" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">CyberSuraksha</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Emergency Button & Auth */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>

            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center space-x-2 border-emergency text-emergency hover:bg-emergency hover:text-emergency-foreground bg-transparent"
              onClick={() => (window.location.href = "tel:100")}
            >
              <Phone className="h-4 w-4" />
              <span>Emergency: 100</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex justify-between items-center px-2">
                    <span className="font-semibold">Language</span>
                    <LanguageToggle />
                  </div>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors px-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t px-2">
                    <Button
                      className="w-full bg-emergency hover:bg-emergency/90 text-emergency-foreground"
                      onClick={() => (window.location.href = "tel:100")}
                    >
                      Emergency: 100
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
