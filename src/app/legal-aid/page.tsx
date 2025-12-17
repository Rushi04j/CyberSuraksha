"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Scale, Phone, Globe, User, MapPin } from "lucide-react"
import { useState } from "react"

export default function LegalAidPage() {
    const [category, setCategory] = useState("")

    const getLawyers = () => {
        if (category === "financial") {
            return [
                { name: "Adv. Rahul Sharma", spec: "Financial Fraud", exp: "12 Yrs", verified: true },
                { name: "Legal Aid Clinic Delhi", spec: "Pro Bono", exp: "N/A", verified: true }
            ]
        }
        if (category === "harassment") {
            return [
                { name: "Adv. Priya Singh", spec: "Women's Safety", exp: "8 Yrs", verified: true },
                { name: "NGO Shakti", spec: "Support & Counseling", exp: "20 Yrs", verified: true }
            ]
        }
        return []
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                    <Scale className="text-primary h-8 w-8" /> Instant Legal Aid Matcher
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Don't just report it, fight it. Find verified lawyers and NGOs specializing in your specific type of cyber crime.
                </p>
            </div>

            <div className="max-w-xl mx-auto mb-12">
                <Card>
                    <CardContent className="pt-6">
                        <Label className="mb-2 block">What type of incident did you face?</Label>
                        <Select onValueChange={setCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Crime Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="financial">Financial Fraud / Bank Scam</SelectItem>
                                <SelectItem value="harassment">Harassment / Stalking</SelectItem>
                                <SelectItem value="identity">Identity Theft</SelectItem>
                                <SelectItem value="crypto">Crypto & Investment Scam</SelectItem>
                            </SelectContent>
                        </Select>

                        {category && <p className="text-sm text-muted-foreground mt-2">Showing specialists for: <span className="font-semibold text-foreground capitalize">{category}</span></p>}
                    </CardContent>
                </Card>
            </div>

            {category && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {getLawyers().map((l, i) => (
                        <Card key={i} className="hover:shadow-lg transition-shadow border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                        <User className="text-primary h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{l.name}</CardTitle>
                                        <CardDescription>{l.spec}</CardDescription>
                                    </div>
                                </div>
                                {l.verified && <Badge variant="secondary" className="bg-blue-100 text-blue-700">Verified</Badge>}
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between text-sm mb-4">
                                    <span className="text-muted-foreground">Experience: {l.exp}</span>
                                    <span className="text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> New Delhi</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button className="flex-1">
                                        <Phone className="h-4 w-4 mr-2" /> Call Now
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        <Globe className="h-4 w-4 mr-2" /> Profile
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {getLawyers().length === 0 && (
                        <div className="col-span-2 text-center py-10 text-muted-foreground">
                            No specific matches found. Call the general helpline at 1930 for guidance.
                        </div>
                    )}
                </div>
            )}

            {!category && (
                <div className="text-center opacity-50">
                    <Scale className="h-24 w-24 mx-auto mb-4" />
                    <p>Select a category above to see matched legal experts.</p>
                </div>
            )}
        </div>
    )
}
