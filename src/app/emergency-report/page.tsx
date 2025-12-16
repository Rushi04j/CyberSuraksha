"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { Complaint } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, MapPin, CheckCircle2, ChevronLeft, Siren } from "lucide-react"
import Link from "next/link"

export default function EmergencyReportPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Other",
    urgency: "Emergency",
    location: "",
    incidentDate: new Date().toISOString().split('T')[0],
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await api.createComplaint({
        userId: "anonymous", // Flag for API to handle
        title: formData.title || "Emergency Report",
        description: formData.description,
        category: formData.category as Complaint['category'],
        urgency: formData.urgency as Complaint['urgency'],
        location: formData.location || "Unknown",
        incidentDate: formData.incidentDate
      }, "anonymous")

      setSuccess(true)
    } catch (error) {
      console.error("Failed to submit anonymous report", error)
      alert("Failed to submit report. Please try again or call 100.")
    } finally {
      setLoading(false)
    }
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleChange("location", `${latitude.toFixed(4)}, ${longitude.toFixed(4)} (GPS)`);
        },
        () => alert("Location access denied.")
      );
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-slate-900 border-red-500/50 text-white">
          <CardHeader className="text-center">
            <div className="mx-auto bg-green-500/20 p-4 rounded-full w-fit mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Report Sent!</CardTitle>
            <CardDescription className="text-slate-400">
              Your emergency report has been securely transmitted to the nearest Cyber Cell.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center pb-8">
            <Link href="/">
              <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-white">
                Return Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-red-500 flex items-center gap-2">
              <Siren className="h-8 w-8 animate-pulse" />
              Emergency Reporting
            </h1>
            <p className="text-slate-400 text-sm">Anonymous • Secure • Instant Priority</p>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-slate-300">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(val) => handleChange("category", val)}
              >
                <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-white">
                  <SelectItem value="Cyberbullying">Cyberbullying</SelectItem>
                  <SelectItem value="Financial Fraud">Financial Fraud</SelectItem>
                  <SelectItem value="Identity Theft">Identity Theft</SelectItem>
                  <SelectItem value="Data Breach">Data Breach</SelectItem>
                  <SelectItem value="Ransomware">Ransomware</SelectItem>
                  <SelectItem value="Hacking">Hacking</SelectItem>
                  <SelectItem value="Online Stalking">Online Stalking</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Urgency</Label>
              <Select
                value={formData.urgency}
                onValueChange={(val) => handleChange("urgency", val)}
              >
                <SelectTrigger className="bg-slate-950 border-slate-800 text-red-400 font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-white">
                  <SelectItem value="High">High Priority</SelectItem>
                  <SelectItem value="Emergency">EMERGENCY (Immediate Threat)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">Description of Incident</Label>
            <Textarea
              placeholder="Describe what is happening right now... (Please provide as much detail as possible)"
              className="bg-slate-950 border-slate-800 text-white min-h-[160px] text-base p-4 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">Location</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Where is this happening?"
                className="bg-slate-950 border-slate-800 text-white"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                onClick={getLocation}
                className="border-slate-700 text-white hover:bg-slate-800"
              >
                <MapPin className="h-4 w-4 mr-2" />
                GPS
              </Button>
            </div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700/50 p-4 rounded text-sm text-yellow-200 flex gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <p>
              Note: This report will be filed anonymously. We will not be able to contact you back for further details unless you provide contact info in the description.
            </p>
          </div>

          <Button
            size="lg"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg shadow-[0_0_20px_rgba(220,38,38,0.5)]"
            onClick={handleSubmit}
            disabled={loading || !formData.description}
          >
            {loading ? "SENDING..." : "SUBMIT EMERGENCY REPORT"}
          </Button>
        </div>
      </div>
    </div>
  )
}
