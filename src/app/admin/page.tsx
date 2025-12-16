"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  MessageSquare,
  UserPlus,
  Download,
  BarChart3,
  TrendingUp,
  Activity,
} from "lucide-react"

// Mock data for police admin panel
const mockCases = [
  {
    id: "CR-2024-001",
    title: "Bicycle Theft",
    type: "Theft/Burglary",
    status: "Under Investigation",
    priority: "Medium",
    dateSubmitted: "2024-01-15",
    lastUpdate: "2024-01-18",
    assignedOfficer: "Officer Johnson",
    reportedBy: "John Doe",
    location: "Main Street Park",
    progress: 60,
    isAnonymous: false,
    contactInfo: "john.doe@email.com",
    description: "Blue mountain bike stolen from bike rack during lunch hour",
  },
  {
    id: "CR-2024-002",
    title: "Vandalism Report",
    type: "Vandalism/Property Damage",
    status: "Resolved",
    priority: "Low",
    dateSubmitted: "2024-01-10",
    lastUpdate: "2024-01-20",
    assignedOfficer: "Officer Smith",
    reportedBy: "Jane Smith",
    location: "Downtown Shopping Center",
    progress: 100,
    isAnonymous: false,
    contactInfo: "jane.smith@email.com",
    description: "Graffiti on storefront windows",
  },
  {
    id: "CR-2024-003",
    title: "Online Fraud Attempt",
    type: "Fraud/Scam",
    status: "Pending Assignment",
    priority: "High",
    dateSubmitted: "2024-01-22",
    lastUpdate: "2024-01-22",
    assignedOfficer: "Unassigned",
    reportedBy: "Anonymous",
    location: "Online",
    progress: 10,
    isAnonymous: true,
    contactInfo: "N/A",
    description: "Phishing email attempting to steal banking credentials",
  },
  {
    id: "CR-2024-004",
    title: "Noise Complaint",
    type: "Other",
    status: "New",
    priority: "Low",
    dateSubmitted: "2024-01-23",
    lastUpdate: "2024-01-23",
    assignedOfficer: "Unassigned",
    reportedBy: "Mike Wilson",
    location: "Residential Area",
    progress: 0,
    isAnonymous: false,
    contactInfo: "mike.wilson@email.com",
    description: "Loud music and parties disturbing neighborhood peace",
  },
]

const officers = [
  { id: "1", name: "Officer Johnson", badge: "1234", department: "Investigations" },
  { id: "2", name: "Officer Smith", badge: "1235", department: "Patrol" },
  { id: "3", name: "Officer Brown", badge: "1236", department: "Cybercrime" },
  { id: "4", name: "Officer Davis", badge: "1237", department: "Community Relations" },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "resolved":
      return "bg-success text-success-foreground"
    case "under investigation":
      return "bg-primary text-primary-foreground"
    case "pending assignment":
      return "bg-yellow-500 text-white"
    case "new":
      return "bg-blue-500 text-white"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-emergency text-emergency-foreground"
    case "medium":
      return "bg-yellow-500 text-white"
    case "low":
      return "bg-muted text-muted-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function AdminPage() {

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredCases = mockCases.filter((case_) => {
    const matchesSearch =
      case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.reportedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || case_.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesPriority = priorityFilter === "all" || case_.priority.toLowerCase() === priorityFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesPriority
  })

  const newCases = mockCases.filter((c) => c.status === "New").length
  const activeCases = mockCases.filter((c) => c.status !== "Resolved" && c.status !== "New").length
  const resolvedCases = mockCases.filter((c) => c.status === "Resolved").length
  const highPriorityCases = mockCases.filter((c) => c.priority === "High").length

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Police Admin Panel</h1>
            <p className="text-lg text-muted-foreground">Manage cases and coordinate responses</p>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Button variant="outline" className="bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">New Cases</p>
                  <p className="text-2xl font-bold">{newCases}</p>
                  <p className="text-xs text-muted-foreground">Require assignment</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Cases</p>
                  <p className="text-2xl font-bold">{activeCases}</p>
                  <p className="text-xs text-muted-foreground">Under investigation</p>
                </div>
                <Activity className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold">{resolvedCases}</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold">{highPriorityCases}</p>
                  <p className="text-xs text-muted-foreground">Urgent attention</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emergency" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="cases" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cases">Case Management</TabsTrigger>
            <TabsTrigger value="officers">Officer Assignment</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Case Management Tab */}
          <TabsContent value="cases" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search cases by ID, title, or reporter..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="pending assignment">Pending Assignment</SelectItem>
                      <SelectItem value="under investigation">Under Investigation</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Cases Table */}
            <Card>
              <CardHeader>
                <CardTitle>Cases ({filteredCases.length})</CardTitle>
                <CardDescription>Manage and track all reported cases</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Case ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Assigned Officer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCases.map((case_) => (
                      <TableRow key={case_.id}>
                        <TableCell className="font-medium">{case_.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{case_.title}</p>
                            <p className="text-sm text-muted-foreground">{case_.type}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{case_.reportedBy}</p>
                            {!case_.isAnonymous && <p className="text-sm text-muted-foreground">{case_.contactInfo}</p>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getPriorityColor(case_.priority)}>
                            {case_.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{case_.assignedOfficer}</TableCell>
                        <TableCell>{case_.dateSubmitted}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Update Status
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Assign Officer
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Contact Reporter
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Export Case
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Officer Assignment Tab */}
          <TabsContent value="officers" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Officers</CardTitle>
                  <CardDescription>Manage officer assignments and workload</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {officers.map((officer) => {
                      const assignedCases = mockCases.filter((c) => c.assignedOfficer === officer.name).length
                      return (
                        <div key={officer.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback>
                                {officer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{officer.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Badge #{officer.badge} • {officer.department}
                              </p>
                              <p className="text-sm text-muted-foreground">{assignedCases} active cases</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Eye className="h-4 w-4 mr-2" />
                              View Cases
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <UserPlus className="h-4 w-4 mr-2" />
                              Assign Case
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Assignment</CardTitle>
                  <CardDescription>Assign unassigned cases to officers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCases
                      .filter((c) => c.assignedOfficer === "Unassigned")
                      .map((case_) => (
                        <div key={case_.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium">{case_.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {case_.id} • {case_.type}
                              </p>
                            </div>
                            <Badge className={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Select>
                              <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Select officer" />
                              </SelectTrigger>
                              <SelectContent>
                                {officers.map((officer) => (
                                  <SelectItem key={officer.id} value={officer.id}>
                                    {officer.name} - {officer.department}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button size="sm">Assign</Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Case Statistics</CardTitle>
                  <CardDescription>Overview of case metrics and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Cases This Month</span>
                      <span className="font-bold">{mockCases.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Resolution Time</span>
                      <span className="font-bold">4.2 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Resolution Rate</span>
                      <span className="font-bold">85%</span>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="font-medium">Cases by Type</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Theft/Burglary</span>
                          <span>35%</span>
                        </div>
                        <Progress value={35} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span>Fraud/Scam</span>
                          <span>25%</span>
                        </div>
                        <Progress value={25} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span>Vandalism</span>
                          <span>20%</span>
                        </div>
                        <Progress value={20} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span>Other</span>
                          <span>20%</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Officer Performance</CardTitle>
                  <CardDescription>Track officer workload and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {officers.map((officer) => {
                      const assignedCases = mockCases.filter((c) => c.assignedOfficer === officer.name).length
                      const resolvedCases = mockCases.filter(
                        (c) => c.assignedOfficer === officer.name && c.status === "Resolved",
                      ).length
                      const resolutionRate = assignedCases > 0 ? Math.round((resolvedCases / assignedCases) * 100) : 0

                      return (
                        <div key={officer.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{officer.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {assignedCases} cases • {resolutionRate}% resolved
                            </span>
                          </div>
                          <Progress value={resolutionRate} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure system-wide settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Auto-assignment Rules</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="round-robin">Round Robin</SelectItem>
                        <SelectItem value="workload">Based on Workload</SelectItem>
                        <SelectItem value="specialty">Based on Specialty</SelectItem>
                        <SelectItem value="manual">Manual Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority Escalation (hours)</Label>
                    <Input type="number" placeholder="24" />
                  </div>
                  <div className="space-y-2">
                    <Label>Notification Settings</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="email-notifications" />
                        <Label htmlFor="email-notifications">Email notifications for new cases</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sms-notifications" />
                        <Label htmlFor="sms-notifications">SMS alerts for high priority cases</Label>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Save Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage officer accounts and permissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <Button className="w-full bg-transparent" variant="outline">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add New Officer
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Shield className="h-4 w-4 mr-2" />
                      Manage Permissions
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export User List
                    </Button>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>System Backup</Label>
                    <p className="text-sm text-muted-foreground">Last backup: January 23, 2024 at 2:00 AM</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Create Backup Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
