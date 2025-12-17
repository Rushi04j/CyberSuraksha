"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Shield, Edit } from "lucide-react"

export default function OfficersPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
                <Shield className="h-8 w-8 text-primary" />
                Officer Management
            </h1>

            <Card>
                <CardHeader>
                    <CardTitle>Station Officers</CardTitle>
                    <CardDescription>Manage station officers, roles, and duty status.</CardDescription>
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
                            <TableRow>
                                <TableCell className="font-mono">COP-2023-001</TableCell>
                                <TableCell className="font-medium">Inspector Sharma</TableCell>
                                <TableCell>Station Head</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-mono">COP-2023-045</TableCell>
                                <TableCell className="font-medium">Sub-Inspector Verma</TableCell>
                                <TableCell>Field Officer</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-mono">COP-2023-099</TableCell>
                                <TableCell className="font-medium">Constable Singh</TableCell>
                                <TableCell>Desk Duty</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">On Leave</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className="mt-6 flex justify-end">
                        <Button>Add New Officer</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
