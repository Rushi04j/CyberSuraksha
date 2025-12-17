"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { api } from "@/lib/api"
import { Complaint } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Search, Filter } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function MyComplaintsPage() {
    const { user } = useAuth()
    const { t } = useLanguage()
    const [complaints, setComplaints] = useState<Complaint[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            setLoading(true)
            api.getComplaints(user.id, user.role).then((data) => {
                setComplaints(data)
                setLoading(false)
            })
        }
    }, [user])

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{t.nav.myComplaints}</h1>
                    <p className="text-muted-foreground">{t.dashboard.subtitle}</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/file-complaint">
                        <Plus className="mr-2 h-4 w-4" /> {t.nav.fileComplaint}
                    </Link>
                </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search complaints..." className="pl-9" />
                </div>
                <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>

            {/* Complaint List */}
            <div className="grid gap-4">
                {loading ? (
                    <div className="text-center py-10">Loading complaints...</div>
                ) : complaints.length === 0 ? (
                    <Card className="text-center py-12">
                        <div className="flex flex-col items-center gap-4">
                            <p className="text-muted-foreground">You haven't filed any complaints yet.</p>
                            <Button variant="outline" asChild>
                                <Link href="/dashboard/file-complaint">File First Complaint</Link>
                            </Button>
                        </div>
                    </Card>
                ) : (
                    complaints.map((item) => {
                        // Stepper Logic
                        const steps = ["Filed", "In Progress", "Resolved"];
                        const currentStepIndex =
                            item.status === 'Resolved' || item.status === 'Closed' ? 2 :
                                item.status === 'In Progress' ? 1 : 0;

                        return (
                            <Card key={item.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <CardTitle className="text-base font-bold">{item.title}</CardTitle>
                                            <Badge variant={
                                                item.status === 'Resolved' ? 'default' :
                                                    item.status === 'In Progress' ? 'secondary' : 'outline'
                                            } className={
                                                item.status === 'Resolved' ? 'bg-green-600 hover:bg-green-700' :
                                                    item.status === 'Pending' ? 'text-yellow-600 border-yellow-200 bg-yellow-50' : ''
                                            }>
                                                {item.status}
                                            </Badge>
                                            <Badge variant="outline" className={`${item.urgency === 'High' || item.urgency === 'Emergency' ? 'border-red-500 text-red-600 bg-red-50' :
                                                    item.urgency === 'Medium' ? 'border-yellow-500 text-yellow-600 bg-yellow-50' : 'border-green-500 text-green-600 bg-green-50'
                                                }`}>
                                                {item.urgency} Priority
                                            </Badge>
                                        </div>
                                        <CardDescription className="mt-1">
                                            Ref ID: <span className="font-mono text-xs">{item.id}</span> • {new Date(item.createdAt).toLocaleDateString()}
                                        </CardDescription>
                                    </div>
                                    <Badge variant="outline">{item.category}</Badge>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                        {item.description}
                                    </p>

                                    {/* Progress Stepper */}
                                    <div className="mb-4 mt-2">
                                        <div className="flex items-center w-full">
                                            {steps.map((step, index) => (
                                                <div key={index} className="flex-1 flex flex-col items-center relative">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 z-10 bg-background
                                                    ${index <= currentStepIndex ? 'border-primary text-primary' : 'border-muted text-muted-foreground'}`}>
                                                        {index + 1}
                                                    </div>
                                                    <div className="text-[10px] mt-1 font-medium text-muted-foreground">{step}</div>
                                                    {index < steps.length - 1 && (
                                                        <div className={`absolute top-4 left-1/2 w-full h-[2px] -z-0
                                                        ${index < currentStepIndex ? 'bg-primary' : 'bg-muted'}`}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {item.policeNotes && (
                                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm mb-2 border border-blue-100 dark:border-blue-800">
                                            <span className="font-semibold text-blue-700 dark:text-blue-300">Updated by Police: </span>
                                            {item.policeNotes}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )
                    })
                )}
            </div>
        </div>
    )
}
