export default function PoliceLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="police-theme min-h-screen bg-background text-foreground font-sans">
            {children}
        </div>
    )
}
