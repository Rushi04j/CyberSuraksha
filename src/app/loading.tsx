import { Shield } from "lucide-react"

export default function Loading() {
    return (
        <div className="flex h-[80vh] w-full items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <Shield className="h-16 w-16 text-primary animate-pulse" />
                    <div className="absolute inset-0 border-4 border-primary/30 border-t-primary rounded-full animate-spin h-16 w-16"></div>
                </div>
                <p className="text-muted-foreground font-medium animate-pulse">Securing Connection...</p>
            </div>
        </div>
    )
}
