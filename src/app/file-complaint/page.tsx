"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileText, MapPin, Mic, Upload, Shield, AlertTriangle, ChevronLeft, ChevronRight, Check } from "lucide-react"

function Stepper({ totalSteps, currentStep }: { totalSteps: number; currentStep: number }) {
  return (
    <div className="flex justify-center space-x-4 mb-8">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const step = i + 1
        const isActive = step === currentStep
        const isCompleted = step < currentStep
        return (
          <div key={step} className="flex items-center space-x-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 font-semibold ${isCompleted
                ? "border-primary bg-primary text-primary-foreground"
                : isActive
                  ? "border-primary bg-white text-primary"
                  : "border-muted text-muted-foreground"
                }`}
            >
              {isCompleted ? "✓" : step}
            </div>
            {step !== totalSteps && (
              <div className={`h-1 w-10 rounded ${isCompleted ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function FileComplaintPage() {
  const totalSteps = 5
  const [currentStep, setCurrentStep] = useState(1)
  const [isRecording, setIsRecording] = useState(false)
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const [docPreviews, setDocPreviews] = useState<string[]>([])
  type FormDataType = {
    crimeType: string;
    urgency: string;
    isAnonymous: boolean;
    personalInfo: { name: string; email: string; phone: string };
    incidentDetails: { title: string; description: string; location: string; date: string; time: string };
    evidence: { photos: File[]; documents: File[]; voiceRecording: null | Blob };
    witnesses: { hasWitnesses: boolean; witnessInfo: string };
  };

  const [formData, setFormData] = useState<FormDataType>({
    crimeType: "",
    urgency: "",
    isAnonymous: false,
    personalInfo: { name: "", email: "", phone: "" },
    incidentDetails: { title: "", description: "", location: "", date: "", time: "" },
    evidence: { photos: [], documents: [], voiceRecording: null },
    witnesses: { hasWitnesses: false, witnessInfo: "" },
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Clean up object URLs
  useEffect(() => {
    return () => {
      photoPreviews.forEach(URL.revokeObjectURL)
      docPreviews.forEach(URL.revokeObjectURL)
    }
  }, [photoPreviews, docPreviews])

  // Validate fields per step and return bool
  const validateStep = () => {
    const errors: Record<string, string> = {}
    if (currentStep === 1) {
      if (!formData.crimeType) errors.crimeType = "Crime type is required."
      if (!formData.urgency) errors.urgency = "Priority level is required."
    } else if (currentStep === 2 && !formData.isAnonymous) {
      if (!formData.personalInfo.name) errors.name = "Name is required."
      if (!formData.personalInfo.email) errors.email = "Email is required."
      // Basic email regex
      else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email))
        errors.email = "Email is invalid."
    } else if (currentStep === 3) {
      if (!formData.incidentDetails.title) errors.title = "Incident title is required."
      if (!formData.incidentDetails.description) errors.description = "Description is required."
      if (!formData.incidentDetails.date) errors.date = "Date of incident is required."
      if (!formData.incidentDetails.location) errors.location = "Location is required."
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    if (validateStep()) {
      alert("Complaint submitted successfully! You will receive a confirmation email shortly.")
      // Add real submission logic here
    }
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const files = Array.from(event.target.files)
    const objectUrls = files.map((file) => URL.createObjectURL(file))
    setFormData((prev) => ({
      ...prev,
      evidence: { ...prev.evidence, photos: [...prev.evidence.photos, ...files] },
    }))
    setPhotoPreviews((prev) => [...prev, ...objectUrls])
  }

  const handleDocUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const files = Array.from(event.target.files)
    const objectUrls = files.map((file) => URL.createObjectURL(file))
    setFormData((prev) => ({
      ...prev,
      evidence: { ...prev.evidence, documents: [...prev.evidence.documents, ...files] },
    }))
    setDocPreviews((prev) => [...prev, ...objectUrls])
  }

  const startRecording = () => {
    setIsRecording(true)
    // Integrate real recording here
    setTimeout(() => {
      setIsRecording(false)
      // Simulate recording blob (left null here)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">File a Complaint</h1>
          <p className="text-lg text-muted-foreground">Report an incident securely and confidentially</p>
        </div>

        <Stepper totalSteps={totalSteps} currentStep={currentStep} />

        <div className="mb-6 flex justify-between font-semibold text-sm text-muted-foreground">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>

        <Progress value={(currentStep / totalSteps) * 100} className="h-2 mb-8" />

        <Card>
          <CardContent>
            {currentStep === 1 && (
              <>
                <div className="text-center mb-6">
                  <AlertTriangle className="mx-auto h-12 w-12 text-primary mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Incident Classification</h2>
                  <p className="text-muted-foreground">Help us understand the nature of your report</p>
                </div>

                <div className="mb-4">
                  <Label htmlFor="crimeType">Type of Incident *</Label>
                  <Select value={formData.crimeType} onValueChange={(value) => setFormData({ ...formData, crimeType: value })}>
                    <SelectTrigger className={formErrors.crimeType ? "border-destructive" : ""} id="crimeType">
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent>
                      {["theft", "assault", "fraud", "vandalism", "harassment", "drug", "traffic", "cybercrime", "other"].map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.crimeType && <p className="text-destructive mt-1 text-sm">{formErrors.crimeType}</p>}
                </div>

                <div>
                  <Label>Urgency *</Label>
                  <RadioGroup
                    value={formData.urgency}
                    onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                    className="space-y-3"
                  >
                    {[
                      { value: "low", label: "Low Priority", description: "Non-urgent matter" },
                      { value: "medium", label: "Medium Priority", description: "Requires attention" },
                      { value: "high", label: "High Priority", description: "Urgent response needed" },
                      { value: "emergency", label: "Emergency", description: "Immediate danger - Call 911" },
                    ].map((level) => (
                      <div
                        key={level.value}
                        className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                      >
                        <RadioGroupItem value={level.value} id={level.value} />
                        <div className="flex-1">
                          <Label htmlFor={level.value} className="font-medium cursor-pointer">
                            {level.label}
                          </Label>
                          <p className="text-sm text-muted-foreground">{level.description}</p>
                        </div>
                        {level.value === "emergency" && <Badge variant="destructive">Call 911</Badge>}
                      </div>
                    ))}
                  </RadioGroup>
                  {formErrors.urgency && <p className="text-destructive mt-1 text-sm">{formErrors.urgency}</p>}
                </div>

                {formData.urgency === "emergency" && (
                  <div className="p-4 bg-emergency/10 border border-emergency/20 rounded-lg mt-4">
                    <div className="flex items-center space-x-2 text-emergency">
                      <AlertTriangle className="h-5 w-5" />
                      <span className="font-semibold">Emergency Situation Detected</span>
                    </div>
                    <p className="text-sm mt-2 text-emergency/80">
                      For immediate emergencies, please call 911 directly. This form is for non-emergency reporting.
                    </p>
                  </div>
                )}
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="text-center mb-6">
                  <Shield className="mx-auto h-12 w-12 text-primary mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
                  <p className="text-muted-foreground">Your information is kept secure and confidential</p>
                </div>

                <div className="flex items-center space-x-2 p-4 bg-muted/30 rounded-lg mb-6">
                  <Checkbox
                    id="anonymous"
                    checked={formData.isAnonymous}
                    onCheckedChange={(checked) => setFormData({ ...formData, isAnonymous: checked as boolean })}
                  />
                  <Label htmlFor="anonymous" className="font-medium cursor-pointer">
                    Submit this report anonymously
                  </Label>
                </div>

                {!formData.isAnonymous && (
                  <>
                    <div className="mb-4">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.personalInfo.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalInfo: { ...formData.personalInfo, name: e.target.value },
                          })
                        }
                        className={formErrors.name ? "border-destructive" : ""}
                        placeholder="Enter your full name"
                      />
                      {formErrors.name && <p className="text-destructive mt-1 text-sm">{formErrors.name}</p>}
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.personalInfo.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalInfo: { ...formData.personalInfo, email: e.target.value },
                          })
                        }
                        className={formErrors.email ? "border-destructive" : ""}
                        placeholder="Enter your email address"
                      />
                      {formErrors.email && <p className="text-destructive mt-1 text-sm">{formErrors.email}</p>}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.personalInfo.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalInfo: { ...formData.personalInfo, phone: e.target.value },
                          })
                        }
                        placeholder="Enter your phone number (optional)"
                      />
                    </div>
                  </>
                )}

                {formData.isAnonymous && (
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Anonymous Reporting:</strong> Your identity will not be recorded. However, this may limit our
                      ability to follow up with you for additional information.
                    </p>
                  </div>
                )}
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="text-center mb-6">
                  <FileText className="mx-auto h-12 w-12 text-primary mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Incident Details</h2>
                  <p className="text-muted-foreground">Provide as much detail as possible</p>
                </div>

                <div className="mb-4">
                  <Label htmlFor="title">Incident Title *</Label>
                  <Input
                    id="title"
                    value={formData.incidentDetails.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        incidentDetails: { ...formData.incidentDetails, title: e.target.value },
                      })
                    }
                    className={formErrors.title ? "border-destructive" : ""}
                    placeholder="Brief summary of the incident"
                  />
                  {formErrors.title && <p className="text-destructive mt-1 text-sm">{formErrors.title}</p>}
                </div>

                <div className="mb-4">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.incidentDetails.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        incidentDetails: { ...formData.incidentDetails, description: e.target.value },
                      })
                    }
                    className={`min-h-32 ${formErrors.description ? "border-destructive" : ""}`}
                    placeholder="Describe what happened in detail. Include who, what, when, where, and how."
                  />
                  {formErrors.description && <p className="text-destructive mt-1 text-sm">{formErrors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="date">Date of Incident *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.incidentDetails.date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          incidentDetails: { ...formData.incidentDetails, date: e.target.value },
                        })
                      }
                      className={formErrors.date ? "border-destructive" : ""}
                    />
                    {formErrors.date && <p className="text-destructive mt-1 text-sm">{formErrors.date}</p>}
                  </div>
                  <div>
                    <Label htmlFor="time">Time of Incident</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.incidentDetails.time}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          incidentDetails: { ...formData.incidentDetails, time: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="location"
                      value={formData.incidentDetails.location}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          incidentDetails: { ...formData.incidentDetails, location: e.target.value },
                        })
                      }
                      className={formErrors.location ? "border-destructive pl-10" : "pl-10"}
                      placeholder="Street address, intersection, or landmark"
                    />
                  </div>
                  {formErrors.location && <p className="text-destructive mt-1 text-sm">{formErrors.location}</p>}
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <div className="text-center mb-6">
                  <Upload className="mx-auto h-12 w-12 text-primary mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Evidence & Documentation</h2>
                  <p className="text-muted-foreground">Upload photos, documents, or record your statement</p>
                </div>

                {/* Voice Recording */}
                <div className="mb-6 p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center">
                  <Mic className="mx-auto h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Voice Statement</h3>
                  <p className="text-sm text-muted-foreground mb-4">Record your statement for a more detailed account</p>
                  <Button onClick={startRecording} disabled={isRecording} variant={isRecording ? "destructive" : "outline"} className="bg-transparent">
                    {isRecording ? (
                      <>
                        <div className="animate-pulse h-2 w-2 bg-red-500 rounded-full mr-2 inline-block" />
                        Recording...
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 mr-2 inline-block" />
                        Start Recording
                      </>
                    )}
                  </Button>
                </div>

                {/* Photo Upload */}
                <div className="mb-6">
                  <Label>Photos</Label>
                  <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" id="photos-upload" />
                  <label htmlFor="photos-upload" className="cursor-pointer inline-flex items-center gap-2 rounded-md border border-primary bg-primary/20 px-4 py-2 text-primary hover:bg-primary/50">
                    <Upload className="h-5 w-5" /> Upload Photos
                  </label>

                  {photoPreviews.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-4">
                      {photoPreviews.map((src, idx) => (
                        <Image
                          key={idx}
                          src={src}
                          alt="Preview"
                          width={80}
                          height={80}
                          className="h-20 w-20 rounded-lg object-cover"
                          unoptimized
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Document Upload */}
                <div className="mb-6">
                  <Label>Documents</Label>
                  <input type="file" multiple accept=".pdf,.doc,.docx" onChange={handleDocUpload} className="hidden" id="docs-upload" />
                  <label htmlFor="docs-upload" className="cursor-pointer inline-flex items-center gap-2 rounded-md border border-primary bg-primary/20 px-4 py-2 text-primary hover:bg-primary/50">
                    <Upload className="h-5 w-5" /> Upload Documents
                  </label>

                  {docPreviews.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-4">
                      {docPreviews.map((src, idx) => (
                        <a key={idx} href={src} target="_blank" rel="noopener noreferrer" className="text-primary underline truncate max-w-[150px] block">
                          Document {idx + 1}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Supported formats:</strong> JPG, PNG, PDF, DOC, DOCX (Max 10MB per file)
                  </p>
                </div>
              </>
            )}

            {currentStep === 5 && (
              <>
                <div className="text-center mb-6">
                  <Check className="mx-auto h-12 w-12 text-success mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Final Details & Review</h2>
                  <p className="text-muted-foreground">Add witness information and review your report</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="witnesses"
                      checked={formData.witnesses.hasWitnesses}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, witnesses: { ...formData.witnesses, hasWitnesses: checked as boolean } })
                      }
                    />
                    <Label htmlFor="witnesses" className="font-medium cursor-pointer">
                      There were witnesses to this incident
                    </Label>
                  </div>

                  {formData.witnesses.hasWitnesses && (
                    <div className="mt-4">
                      <Label htmlFor="witness-info">Witness Information</Label>
                      <Textarea
                        id="witness-info"
                        value={formData.witnesses.witnessInfo}
                        onChange={(e) =>
                          setFormData({ ...formData, witnesses: { ...formData.witnesses, witnessInfo: e.target.value } })
                        }
                        className="min-h-24"
                        placeholder="Provide witness names, contact information, and what they observed"
                      />
                    </div>
                  )}
                </div>

                <div className="p-6 bg-muted/30 rounded-lg space-y-4">
                  <h3 className="font-semibold text-lg">Report Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                    <div>
                      <span className="font-medium">Crime Type:</span>
                      <p className="text-muted-foreground">
                        {["Theft/Burglary", "Assault/Violence", "Fraud/Scam", "Vandalism/Property Damage", "Harassment/Stalking", "Drug-related Crime", "Traffic Violation", "Cybercrime", "Other"][formData.crimeType ? ["theft", "assault", "fraud", "vandalism", "harassment", "drug", "traffic", "cybercrime", "other"].indexOf(formData.crimeType) : -1] || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Priority:</span>
                      <p className="text-muted-foreground">
                        {["Low Priority", "Medium Priority", "High Priority", "Emergency"][formData.urgency ? ["low", "medium", "high", "emergency"].indexOf(formData.urgency) : -1] || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Date:</span>
                      <p className="text-muted-foreground">{formData.incidentDetails.date || "Not specified"}</p>
                    </div>
                    <div>
                      <span className="font-medium">Location:</span>
                      <p className="text-muted-foreground">{formData.incidentDetails.location || "Not specified"}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-sm">
                    <strong>Next Steps:</strong> After submission, you will receive a confirmation email with your case number.
                    Law enforcement will review your report and contact you if additional information is needed.
                  </p>
                </div>
              </>
            )}

            <div className="flex justify-between items-center pt-8 border-t">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className="bg-transparent">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex space-x-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-8 rounded-full ${i + 1 <= currentStep ? "bg-primary" : "bg-muted"}`}
                  />
                ))}
              </div>

              {currentStep < totalSteps ? (
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-success hover:bg-success/90 text-success-foreground">
                  Submit Report
                  <Check className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

