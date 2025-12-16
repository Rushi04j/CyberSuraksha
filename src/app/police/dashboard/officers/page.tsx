"use client"

import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

export default function OfficersPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
                <Shield className="h-8 w-8 text-blue-500" />
                Officer Management
            </h1>
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow border p-6">
                <p className="text-muted-foreground mb-4">Manage station officers and permissions.</p>
                <div className="border rounded-md">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted text-muted-foreground uppercase">
                            <tr>
                                <th className="px-6 py-3">Badge ID</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Rank</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-slate-700 dark:text-slate-300">
                            <tr>
                                <td className="px-6 py-4 font-mono">COP-2023-001</td>
                                <td className="px-6 py-4">Inspector Sharma</td>
                                <td className="px-6 py-4">Station Head</td>
                                <td className="px-6 py-4 text-green-600 font-bold">Active</td>
                                <td className="px-6 py-4"><Button variant="outline" size="sm">Edit</Button></td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-mono">COP-2023-045</td>
                                <td className="px-6 py-4">Sub-Inspector Verma</td>
                                <td className="px-6 py-4">Field Officer</td>
                                <td className="px-6 py-4 text-green-600 font-bold">Active</td>
                                <td className="px-6 py-4"><Button variant="outline" size="sm">Edit</Button></td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-mono">COP-2023-099</td>
                                <td className="px-6 py-4">Constable Singh</td>
                                <td className="px-6 py-4">Desk Duty</td>
                                <td className="px-6 py-4 text-yellow-600 font-bold">On Leave</td>
                                <td className="px-6 py-4"><Button variant="outline" size="sm">Edit</Button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex justify-end">
                    <Button>Add New Officer</Button>
                </div>
            </div>
        </div>
    )
}
