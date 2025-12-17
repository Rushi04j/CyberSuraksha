"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ShieldCheck } from "lucide-react"

export function SafetyChecklist() {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Enable Two-Factor Authentication", checked: true },
        { id: 2, text: "Update Banking Passwords", checked: false },
        { id: 3, text: "Review Social Media Privacy", checked: false },
        { id: 4, text: "Install Antivirus Software", checked: true },
    ])

    const completed = tasks.filter(t => t.checked).length
    const progress = (completed / tasks.length) * 100

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, checked: !t.checked } : t))
    }

    return (
        <Card className="glassy border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-green-600" />
                        Security Health
                    </CardTitle>
                    <span className="text-sm font-bold text-green-600">{Math.round(progress)}%</span>
                </div>
                <CardDescription>Complete these steps to secure your digital life.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Progress value={progress} className="h-2" />
                <div className="space-y-2">
                    {tasks.map(task => (
                        <div key={task.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`task-${task.id}`}
                                checked={task.checked}
                                onCheckedChange={() => toggleTask(task.id)}
                            />
                            <label
                                htmlFor={`task-${task.id}`}
                                className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${task.checked ? 'line-through text-muted-foreground' : ''}`}
                            >
                                {task.text}
                            </label>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
