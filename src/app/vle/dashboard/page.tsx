"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FilePlus, Phone, Activity } from "lucide-react"
import Link from "next/link"

export default function VLEDashboard() {
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Gram Panchayat Dashboard</h1>
                    <p className="text-muted-foreground">Authorized VLE: <span className="font-semibold text-primary">Ramesh Kumar (CSC-4091)</span></p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/signin">Log Out</Link>
                </Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-orange-50 border-orange-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-4xl text-orange-600">12</CardTitle>
                        <CardDescription>Villagers Assisted</CardDescription>
                    </CardHeader>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-4xl text-blue-600">₹45k</CardTitle>
                        <CardDescription>Fraud Reported</CardDescription>
                    </CardHeader>
                </Card>
                <Card className="bg-green-50 border-green-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-4xl text-green-600">8</CardTitle>
                        <CardDescription>Cases Resolved</CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FilePlus className="h-5 w-5" /> File New Report
                        </CardTitle>
                        <CardDescription>Register a complaint on behalf of a villager.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                            <label className="text-xs font-semibold uppercase text-muted-foreground">Beneficiary Aadhaar / Phone</label>
                            <input type="text" className="w-full mt-1 bg-transparent border-b border-primary outline-none py-1" placeholder="Enter villager's number..." />
                        </div>
                        <Button className="w-full h-12 text-lg" asChild>
                            <Link href="/dashboard/file-complaint">Start Filing Process</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" /> Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: "Sunita Devi", action: "Phishing Report", time: "2 hrs ago", status: "Pending" },
                                { name: "Ram Singh", action: "Farm Loan Scam", time: "1 day ago", status: "Forwarded to Police" },
                                { name: "Amit Patel", action: "Job Fraud", time: "3 days ago", status: "Resolved" }
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-3 hover:bg-muted/50 rounded-lg transition-colors border-b last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {item.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">{item.action}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                                item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                                            }`}>{item.status}</span>
                                        <p className="text-[10px] text-muted-foreground mt-1">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
