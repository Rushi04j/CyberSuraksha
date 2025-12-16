"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex h-[80vh] flex-col items-center justify-center space-y-4 text-center animate-in fade-in zoom-in duration-500">
            <div className="bg-muted p-6 rounded-full">
                <ShieldAlert className="h-16 w-16 text-muted-foreground" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">404 - Page Not Found</h1>
            <p className="text-muted-foreground max-w-md">
                The page you are looking for does not exist or has been moved.
                It might be a broken link or a restricted area.
            </p>
            <Button asChild className="mt-4" size="lg">
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    )
}
