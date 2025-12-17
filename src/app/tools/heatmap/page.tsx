"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, AlertTriangle, TrendingUp } from "lucide-react"

import { useLanguage } from "@/context/language-context"

export default function HeatmapPage() {
    const { t } = useLanguage()

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <MapPin className="text-red-600 h-8 w-8" /> {t.tools.heatmapTitle}
                    </h1>
                    <p className="text-muted-foreground">{t.tools.heatmapDesc}</p>
                </div>
                <Badge variant="destructive" className="text-lg px-4 py-1 animate-pulse">
                    <div className="h-2 w-2 rounded-full bg-white mr-2" /> {t.dashboard.liveAlerts}
                </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Map Placeholder */}
                <Card className="lg:col-span-2 min-h-[500px] relative overflow-hidden bg-slate-100 dark:bg-slate-900 border-2 border-slate-200">
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        {/* Mock India Map Background would go here */}
                        <span className="text-9xl font-black text-slate-300 select-none">INDIA MAP</span>
                    </div>

                    {/* Hotspots */}
                    <div className="absolute top-[30%] left-[25%] group cursor-pointer">
                        <div className="h-6 w-6 bg-red-500/50 rounded-full animate-ping absolute" />
                        <div className="h-6 w-6 bg-red-600 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-bold relative z-10">42</div>
                        <div className="hidden group-hover:block absolute bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs p-2 rounded whitespace-nowrap z-20">
                            Delhi NCR: 42 Phishing Cases (1hr)
                        </div>
                    </div>

                    <div className="absolute top-[60%] left-[30%] group cursor-pointer">
                        <div className="h-4 w-4 bg-orange-500/50 rounded-full animate-ping absolute" />
                        <div className="h-4 w-4 bg-orange-500 rounded-full border-2 border-white relative z-10" />
                        <div className="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs p-2 rounded whitespace-nowrap z-20">
                            Mumbai: 12 Credit Card Frauds
                        </div>
                    </div>

                    <div className="absolute top-[40%] right-[20%] group cursor-pointer">
                        <div className="h-8 w-8 bg-red-600/50 rounded-full animate-ping absolute" />
                        <div className="h-8 w-8 bg-red-700 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-bold relative z-10">89</div>
                        <div className="hidden group-hover:block absolute bottom-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs p-2 rounded whitespace-nowrap z-20">
                            Jamtara Region: High Alert
                        </div>
                    </div>
                </Card>

                {/* Stats Panel */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">{t.dashboard.recentActivity}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-100">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-red-600" />
                                    <span className="font-semibold text-sm">UPI Refunds</span>
                                </div>
                                <span className="font-bold text-red-600">+124%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-100">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                                    <span className="font-semibold text-sm">Fake Part-Time Job</span>
                                </div>
                                <span className="font-bold text-orange-600">+85%</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">{t.safety.title} (Zones)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">Regions with lowest reported activity this week.</p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Lakshadweep</Badge>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Sikkim</Badge>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Goa</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
