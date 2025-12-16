"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { api } from "@/lib/api"
import { Complaint } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { FileText, Clock, CheckCircle, AlertTriangle, ArrowRight, Plus, Shield } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0, inProgress: 0 })
  const [recentComplaints, setRecentComplaints] = useState<Complaint[]>([])

  // Privacy Toggle
  const [privacyMode, setPrivacyMode] = useState(false)

  // AI Tool State
  const [aiText, setAiText] = useState("")
  const [aiResult, setAiResult] = useState<{ score: string, risk: string } | null>(null)
  const [analyzing, setAnalyzing] = useState(false)

  // SOS State
  const [sosActive, setSosActive] = useState(false)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (sosActive && countdown > 0) {
      interval = setInterval(() => setCountdown(prev => prev - 1), 1000)
    } else if (sosActive && countdown === 0) {
      // Dispatch Alert
      alert("EMERGENCY SIGNAL DISPATCHED TO NEAREST STATION! (Simulated)")
      setSosActive(false)
      setCountdown(5)
    }
    return () => clearInterval(interval)
  }, [sosActive, countdown])

  useEffect(() => {
    if (user) {
      api.getComplaints(user.id, user.role).then((data) => {
        setStats({
          total: data.length,
          pending: data.filter((c) => c.status === "Pending").length,
          resolved: data.filter((c) => c.status === "Resolved").length,
          inProgress: data.filter((c) => c.status === "In Progress").length,
        })
        setRecentComplaints(data.slice(0, 3))
      }).catch(err => {
        console.error("Failed to fetch dashboard data:", err)
      })
    }
  }, [user])

  const handleAnalyze = () => {
    if (!aiText) return
    setAnalyzing(true)
    setTimeout(() => {
      const isFraud = aiText.toLowerCase().includes("lottery") || aiText.toLowerCase().includes("bank") || aiText.toLowerCase().includes("otp")
      setAiResult({
        score: isFraud ? "95/100" : "15/100",
        risk: isFraud ? "High Risk" : "Safe"
      })
      setAnalyzing(false)
    }, 1500)
  }

  const handleSOS = () => {
    setSosActive(true)
    setCountdown(5)
  }

  const cancelSOS = () => {
    setSosActive(false)
    setCountdown(5)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      {/* SOS Overlay */}
      {sosActive && (
        <div className="fixed inset-0 z-50 bg-red-950/90 flex flex-col items-center justify-center text-white space-y-8 animate-in fade-in zoom-in duration-300">
          <div className="text-6xl font-black animate-pulse">SOS ACTIVATED</div>
          <div className="text-2xl">Dispatching Emergency Services in</div>
          <div className="text-9xl font-bold">{countdown}</div>
          <Button onClick={cancelSOS} variant="secondary" size="lg" className="text-xl px-12 py-8 bg-white text-red-600 hover:bg-gray-100">
            CANCEL
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t.dashboard.title}</h1>
            <p className="text-muted-foreground">{t.common.welcome}, {user?.name?.split(" ")[0] || "User"}. {t.dashboard.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <ThemeToggle />
            <Button
              variant={privacyMode ? "default" : "outline"}
              onClick={() => setPrivacyMode(!privacyMode)}
              title="Toggle Privacy Mode"
            >
              {privacyMode ? <CheckCircle className="h-4 w-4 mr-2" /> : <Shield className="h-4 w-4 mr-2" />}
              {privacyMode ? "On" : "Off"}
            </Button>
            <Button
              variant="destructive"
              className="animate-pulse shadow-lg shadow-red-500/50 hover:bg-red-700 hover:scale-110 transition-transform"
              onClick={handleSOS}
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              {t.dashboard.sos}
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105">
              <Link href="/dashboard/file-complaint">
                <Plus className="mr-2 h-4 w-4" />
                {t.dashboard.newComplaint}
              </Link>
            </Button>
          </div>
        </div>

        {/* Live Cyber Ticker */}
        <div className="bg-muted/50 border rounded-md p-2 flex items-center gap-3 overflow-hidden">
          <div className="bg-red-500/10 text-red-500 text-xs font-bold px-2 py-1 rounded animate-pulse whitespace-nowrap">
            {t.dashboard.liveAlerts || "LIVE ALERTS"}
          </div>
          <div className="text-sm text-muted-foreground truncate flex-1">
            {t.dashboard.alerts && t.dashboard.alerts.map((alert: string, i: number) => (
              <span key={i} className="mr-8">{alert}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid - Enhanced */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glassy border-l-4 border-l-primary hover:translate-y-[-2px] transition-transform">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.dashboard.totalReports}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold transition-all duration-300 ${privacyMode ? "blur-md select-none" : ""}`}>{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="glassy border-l-4 border-l-yellow-500 hover:translate-y-[-2px] transition-transform">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.dashboard.pending}</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold transition-all duration-300 ${privacyMode ? "blur-md select-none" : ""}`}>{stats.pending}</div>
          </CardContent>
        </Card>

        {/* New Widget: Safety Score */}
        <Card className="glassy border-l-4 border-l-emerald-500 hover:translate-y-[-2px] transition-transform bg-emerald-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.widgets?.safetyScore || "Safety Score"}</CardTitle>
            <Shield className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">92/100</div>
            <p className="text-xs text-muted-foreground mt-1">{t.widgets?.safetyLevel || "Safe"}</p>
          </CardContent>
        </Card>

        {/* New Widget: Report Download */}
        <Card className="glassy border-l-4 border-l-indigo-500 hover:translate-y-[-2px] transition-transform cursor-pointer hover:bg-accent/50 group" onClick={() => alert("Downloading Monthly Digest...")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.widgets?.class || "Reports"}</CardTitle>
            <ArrowRight className="h-4 w-4 text-indigo-500 group-hover:translate-x-1 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-indigo-600">{t.widgets?.downloadReport || "Download PDF"}</div>
            <p className="text-xs text-muted-foreground mt-1">Monthly Digest</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="col-span-1 lg:col-span-2 shadow-md glassy">
          <CardHeader>
            <CardTitle>{t.dashboard.recentActivity}</CardTitle>
            <CardDescription>{t.dashboard.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            {recentComplaints.length > 0 ? (
              <div className="space-y-6">
                {recentComplaints.map((complaint) => (
                  <div key={complaint.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <p className={`text-sm font-medium leading-none transition-all duration-300 ${privacyMode ? "blur-sm select-none" : ""}`}>{complaint.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{complaint.category}</span>
                      </div>
                    </div>
                    <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium border
                      ${complaint.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        complaint.status === 'Resolved' ? 'bg-green-50 text-green-700 border-green-200' :
                          'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {complaint.status}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {t.dashboard.noActivity}
              </div>
            )}
            <div className="mt-6">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/my-complaints">
                  {t.dashboard.viewAll} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips or Actions */}
        <Card className="glassy">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              {t.dashboard.aiTool}
            </CardTitle>
            <CardDescription>{t.dashboard.aiDesc}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="bg-primary/5 p-4 rounded-lg space-y-3 dark:bg-primary/10">
              <textarea
                className="w-full text-xs p-2 rounded border bg-background text-foreground min-h-[80px]"
                placeholder="Paste suspicious text here (e.g. 'You won a lottery, send bank details')..."
                value={aiText}
                onChange={(e) => setAiText(e.target.value)}
              />

              {aiResult && (
                <div className={`text-xs p-2 rounded font-bold text-center ${aiResult.risk === 'High Risk' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {aiResult.risk} detected (Score: {aiResult.score})
                </div>
              )}

              <Button
                size="sm"
                variant="secondary"
                className="w-full text-xs"
                onClick={handleAnalyze}
                disabled={analyzing}
              >
                {analyzing ? t.common.loading : t.dashboard.analyze}
              </Button>
            </div>

            <div className="border rounded-lg p-4 space-y-2 bg-background/50">
              <div className="font-semibold text-sm">{t.dashboard.emergency}</div>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p>Police: <span className="text-destructive font-bold">100</span></p>
                <p>Cyber Helpline: <span className="text-primary font-bold">1930</span></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

