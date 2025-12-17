import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/auth-context"
import { LanguageProvider } from "@/context/language-context"
import { ThemeProvider } from "@/context/theme-context"
import { SeniorModeProvider } from "@/context/senior-mode-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "CyberSuraksha - Secure Crime Reporting Platform",
  description: "A secure platform for citizens to report crimes and for law enforcement to manage cases efficiently.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <SeniorModeProvider>
                {children}
              </SeniorModeProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
