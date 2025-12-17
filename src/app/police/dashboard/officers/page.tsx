"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Shield, Edit, Plus, UserPlus, Check, X } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner" // Assuming sonner or use toast hook

// Mock Initial Data
const INITIAL_OFFICERS = [
    { id: "COP-2023-001", name: "Inspector Sharma", rank: "Station Head", status: "Active" },
    { id: "COP-2023-045", name: "Sub-Inspector Verma", rank: "Field Officer", status: "Active" },
    { id: "COP-2023-099", name: "Constable Singh", rank: "Desk Duty", status: "On Leave" },
]

export default function OfficersPage() {
    const [officers, setOfficers] = useState(INITIAL_OFFICERS)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [newOfficer, setNewOfficer] = useState({ name: "", rank: "", id: "" })

    const handleAddOfficer = () => {
        if (!newOfficer.name || !newOfficer.rank || !newOfficer.id) {
            alert("Please fill all fields") // Simple validation
            return
        }

        setOfficers([...officers, { ...newOfficer, status: "Active" }])
        setIsAddOpen(false)
        setNewOfficer({ name: "", rank: "", id: "" })
        // Optional: toast.success("Officer added successfully")
    }

    const toggleStatus = (id: string) => {
        setOfficers(officers.map(off =>
            off.id === id
                ? { ...off, status: off.status === "Active" ? "On Leave" : "Active" }
                : off
        ))
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
                <Shield className="h-8 w-8 text-primary" />
                Officer Management
            </h1>

            <Card className="border-t-4 border-t-primary shadow-lg">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Station Officers</CardTitle>
                            <CardDescription>Manage station officers, roles, and duty status.</CardDescription>
                        </div>
                        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                            <DialogTrigger asChild>
                                <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                                    <UserPlus className="h-4 w-4" /> Add New Officer
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Officer</DialogTitle>
                                    <DialogDescription>
                                        Enter the details of the new officer to add to the station roster.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">Name</Label>
                                        <Input
                                            id="name"
                                            value={newOfficer.name}
                                            onChange={(e) => setNewOfficer({ ...newOfficer, name: e.target.value })}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="badge" className="text-right">Badge ID</Label>
                                        <Input
                                            id="badge"
                                            value={newOfficer.id}
                                            onChange={(e) => setNewOfficer({ ...newOfficer, id: e.target.value })}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="rank" className="text-right">Rank</Label>
                                        <Select onValueChange={(v) => setNewOfficer({ ...newOfficer, rank: v })}>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select Rank" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Constable">Constable</SelectItem>
                                                <SelectItem value="Head Constable">Head Constable</SelectItem>
                                                <SelectItem value="Sub-Inspector">Sub-Inspector</SelectItem>
                                                <SelectItem value="Inspector">Inspector</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleAddOfficer}>Save Officer</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Badge ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Rank</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {officers.map((officer) => (
                                <TableRow key={officer.id}>
                                    <TableCell className="font-mono text-muted-foreground">{officer.id}</TableCell>
                                    <TableCell className="font-medium">{officer.name}</TableCell>
                                    <TableCell>{officer.rank}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={`${officer.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}
                                        >
                                            {officer.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleStatus(officer.id)}
                                            title="Toggle Status"
                                        >
                                            <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
