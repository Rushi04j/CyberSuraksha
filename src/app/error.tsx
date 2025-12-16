"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex h-[80vh] flex-col items-center justify-center space-y-4 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-full">
                <AlertTriangle className="h-16 w-16 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold">Something went wrong!</h2>
            <p className="text-muted-foreground max-w-md">
                We encountered an unexpected error. Our cyber team has been notified.
            </p>
            <div className="flex gap-4 mt-4">
                <Button onClick={() => window.location.reload()} variant="outline">
                    Reload Page
                </Button>
                <Button onClick={() => reset()}>Try Again</Button>
            </div>
        </div>
    )
}
