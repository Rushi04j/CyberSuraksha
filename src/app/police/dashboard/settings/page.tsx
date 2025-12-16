"use client"

import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
                <Building2 className="h-8 w-8 text-blue-500" />
                Station Settings
            </h1>
            <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow border p-6">
                    <h2 className="text-xl font-semibold mb-4">Jurisdiction Details</h2>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Station Name</label>
                            <input type="text" className="w-full p-2 border rounded-md bg-transparent" defaultValue="Cyber Cell - Central Division" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Station Code</label>
                            <input type="text" className="w-full p-2 border rounded-md bg-transparent" defaultValue="MUM-CYBER-01" disabled />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Emergency Contact</label>
                            <input type="text" className="w-full p-2 border rounded-md bg-transparent" defaultValue="+91 22 2262 0111" />
                        </div>
                        <Button>Save Changes</Button>
                    </form>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow border p-6">
                    <h2 className="text-xl font-semibold mb-4">System Preferences</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span>Auto-Assign Cases</span>
                            <div className="h-6 w-11 bg-blue-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full"></div></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Email Notifications</span>
                            <div className="h-6 w-11 bg-blue-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full"></div></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>SMS Alerts</span>
                            <div className="h-6 w-11 bg-gray-300 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full"></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
