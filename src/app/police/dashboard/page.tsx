"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { api } from "@/lib/api"
import { Complaint } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter } from "lucide-react"

export default function PoliceDashboardPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [filter, setFilter] = useState("all")

  const loadData = () => {
    if (user) {
      api.getComplaints(undefined, "police").then(setComplaints)
    }
  }

  useEffect(() => {
    loadData()
  }, [user])

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    await api.updateStatus(id, newStatus)
    loadData() // Refresh
  }

  const filteredComplaints = complaints.filter(c => {
    if (filter === "all") return true
    return c.status.toLowerCase() === filter.toLowerCase()
  })

  // Group stats
  const pendingCount = complaints.filter(c => c.status === "Pending").length
  const activeCount = complaints.filter(c => c.status === "In Progress").length
  const resolvedCount = complaints.filter(c => c.status === "Resolved").length

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{t.nav.policeDashboard}</h1>
          <p className="text-slate-500">{t.dashboard.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> {t.common.filter}</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">{t.common.export}</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800 dark:text-yellow-500">{t.dashboard.pending}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-400">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-500">{t.dashboard.inProgress}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-400">{activeCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-500">{t.dashboard.resolved}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-400">{resolvedCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="px-6 py-4 border-b">
          <Tabs defaultValue="all" onValueChange={setFilter} className="w-full">
            <TabsList>
              <TabsTrigger value="all">{t.nav.policeDashboard} (All)</TabsTrigger>
              <TabsTrigger value="pending">{t.dashboard.pending}</TabsTrigger>
              <TabsTrigger value="in progress">{t.dashboard.inProgress}</TabsTrigger>
              <TabsTrigger value="resolved">{t.dashboard.resolved}</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>{t.complaint.steps.details}</TableHead>
                <TableHead>{t.common.date}</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>{t.common.status}</TableHead>
                <TableHead className="text-right">{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComplaints.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{item.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.category}</div>
                  </TableCell>
                  <TableCell className="text-sm">{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={item.urgency === 'Emergency' ? 'destructive' : 'outline'}>
                      {item.urgency}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        item.status === 'Resolved' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                          item.status === 'In Progress' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                            'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Select onValueChange={(val) => handleStatusUpdate(item.id, val)}>
                      <SelectTrigger className="w-[130px] ml-auto h-8 text-xs">
                        <SelectValue placeholder={t.common.actions} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">{t.dashboard.pending}</SelectItem>
                        <SelectItem value="In Progress">Investigate</SelectItem>
                        <SelectItem value="Resolved">Resolve</SelectItem>
                        <SelectItem value="Closed">Close Case</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
              {filteredComplaints.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    {t.dashboard.noActivity}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
