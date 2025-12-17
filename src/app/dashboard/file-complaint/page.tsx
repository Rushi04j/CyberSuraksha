"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { api } from "@/lib/api"
import { Complaint } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, CheckCircle2, ChevronRight, ChevronLeft, Upload, MapPin, Calendar, FileText, ShieldAlert } from "lucide-react"
import { VoiceInput } from "@/components/voice-input"

export default function FileComplaintPage() {
    const router = useRouter()
    const { user } = useAuth()
    const { t } = useLanguage()
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<Partial<Complaint>>({
        title: "",
        description: "",
        category: "Other",
        urgency: "Low",
        location: "",
        incidentDate: new Date().toISOString().split('T')[0],
    })

    const STEPS = [
        { id: 1, name: t.complaint.steps.category, icon: ShieldAlert },
        { id: 2, name: t.complaint.steps.details, icon: FileText },
        { id: 3, name: t.complaint.steps.location, icon: MapPin },
        { id: 4, name: t.complaint.steps.evidence, icon: Upload },
        { id: 5, name: t.complaint.steps.review, icon: CheckCircle2 },
    ]

    // Handle Input Changes
    const handleChange = (field: keyof Complaint, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    // Navigation
    const nextStep = () => setStep((prev) => Math.min(prev + 1, STEPS.length))
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

    // Submission
    const handleSubmit = async () => {
        if (!user) return
        setLoading(true)
        try {
            await api.createComplaint({
                userId: user.id,
                title: formData.title!,
                description: formData.description!,
                category: formData.category as Complaint["category"],
                urgency: formData.urgency as Complaint["urgency"],
                location: formData.location!,
                incidentDate: formData.incidentDate!,
            }, user.id)
            // Show success or redirect
            router.push("/dashboard/my-complaints")
        } catch (error) {
            console.error("Failed to submit", error)
        } finally {
            setLoading(false)
        }
    }

    // Render Steps
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-3">
                            <Label>Incident Category</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['Cyberbullying', 'Financial Fraud', 'Identity Theft', 'Data Breach', 'Ransomware', 'Online Stalking', 'Hacking', 'Fake Profile', 'Other'].map((cat) => (
                                    <div
                                        key={cat}
                                        onClick={() => handleChange("category", cat)}
                                        className={`cursor-pointer border rounded-lg p-4 hover:bg-muted transition-colors flex items-center justify-between ${formData.category === cat ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-input"
                                            }`}
                                    >
                                        <span>{cat}</span>
                                        {formData.category === cat && <CheckCircle2 className="h-4 w-4 text-primary" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label>Urgency Level</Label>
                            <RadioGroup
                                value={formData.urgency}
                                onValueChange={(val) => handleChange("urgency", val)}
                                className="grid grid-cols-4 gap-4"
                            >
                                {['Low', 'Medium', 'High', 'Emergency'].map((level) => (
                                    <div key={level}>
                                        <RadioGroupItem value={level} id={`urgency-${level}`} className="peer sr-only" />
                                        <Label
                                            htmlFor={`urgency-${level}`}
                                            className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-center h-full ${level === 'Emergency' ? 'peer-data-[state=checked]:border-red-500 peer-data-[state=checked]:text-red-500' : ''
                                                }`}
                                        >
                                            <span className="text-sm font-semibold">{level}</span>
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-3">
                            <Label htmlFor="title">Subject / Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g. Scammed on WhatsApp for 5000 Rs"
                                value={formData.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                            />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="desc">Detailed Description</Label>
                                <VoiceInput onTranscript={(text) => handleChange("description", (formData.description || "") + " " + text)} />
                            </div>
                            <Textarea
                                id="desc"
                                className="min-h-[150px]"
                                placeholder="Please describe exactly what happened..."
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                            />
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-3">
                            <Label>When did it happen?</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="date"
                                    className="pl-9"
                                    value={formData.incidentDate}
                                    onChange={(e) => handleChange("incidentDate", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label>Location (City/Area)</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="e.g. Andheri East, Mumbai (or 'Online')"
                                    className="pl-9"
                                    value={formData.location}
                                    onChange={(e) => handleChange("location", e.target.value)}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="absolute right-1 top-1 h-8 px-2"
                                    onClick={() => {
                                        if (navigator.geolocation) {
                                            navigator.geolocation.getCurrentPosition(
                                                async (position) => {
                                                    const { latitude, longitude } = position.coords;
                                                    // Simple reverse geocoding mock or just coords
                                                    handleChange("location", `${latitude.toFixed(4)}, ${longitude.toFixed(4)} (GPS)`);
                                                    // In a real app, use Google Maps Geocoding API here
                                                },
                                                (error) => {
                                                    alert("Unable to retrieve location. Please allow access or type manually.");
                                                }
                                            );
                                        } else {
                                            alert("Geolocation is not supported by your browser.");
                                        }
                                    }}
                                >
                                    Get Location
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 text-center py-10 border-2 border-dashed rounded-lg bg-muted/10">
                        <div className="mb-4 flex justify-center">
                            <div className="bg-muted p-4 rounded-full">
                                <Upload className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold">Upload Evidence</h3>
                        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                            Attach screenshots, PDF documents, or audio recordings.
                            (Mock functionality: Visual only)
                        </p>
                        <Button variant="outline" className="mt-4">Choose Files</Button>
                    </div>
                )
            case 5:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                            <h3 className="font-bold text-primary mb-2">Review Report</h3>
                            <div className="space-y-2 text-sm">
                                <div className="grid grid-cols-3 gap-2">
                                    <span className="text-muted-foreground">Title:</span>
                                    <span className="col-span-2 font-medium">{formData.title}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <span className="text-muted-foreground">Category:</span>
                                    <span className="col-span-2">{formData.category}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <span className="text-muted-foreground">Urgency:</span>
                                    <span className={`col-span-2 font-bold ${formData.urgency === 'Emergency' ? 'text-red-500' : ''}`}>{formData.urgency}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <span className="text-muted-foreground">Date:</span>
                                    <span className="col-span-2">{formData.incidentDate}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-muted-foreground bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded border border-yellow-100 dark:border-yellow-800">
                            <AlertCircle className="h-5 w-5 shrink-0 text-yellow-600" />
                            <p>By submitting this report, you declare that the information provided is true to the best of your knowledge.</p>
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="max-w-2xl mx-auto py-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">File New Complaint</h1>
                <p className="text-muted-foreground">Follow the steps to report an incident securely.</p>
            </div>

            {/* Stepper */}
            <div className="relative mb-8">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -z-10 -translate-y-1/2 rounded-full" />
                <div className="flex justify-between items-center">
                    {STEPS.map((s) => {
                        const isCompleted = step > s.id
                        const isCurrent = step === s.id
                        return (
                            <div key={s.id} className="flex flex-col items-center bg-background px-2">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${isCompleted ? "bg-primary border-primary text-primary-foreground" :
                                        isCurrent ? "border-primary text-primary" : "border-muted text-muted-foreground bg-background"
                                        }`}
                                >
                                    {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <s.icon className="h-5 w-5" />}
                                </div>
                                <span className={`text-xs mt-2 font-medium ${isCurrent ? "text-primary" : "text-muted-foreground"}`}>{s.name}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Card className="glassy shadow-xl">
                <CardContent className="pt-6">
                    {renderStep()}
                </CardContent>
                <CardFooter className="flex justify-between pt-6 border-t mt-6">
                    <Button variant="ghost" onClick={prevStep} disabled={step === 1}>
                        <ChevronLeft className="mr-2 h-4 w-4" /> {t.common.back}
                    </Button>

                    {step < STEPS.length ? (
                        <Button onClick={nextStep} className="w-32">
                            {t.common.next} <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit} disabled={loading} className="w-32 bg-green-600 hover:bg-green-700">
                            {loading ? t.common.loading : t.common.submit}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}
