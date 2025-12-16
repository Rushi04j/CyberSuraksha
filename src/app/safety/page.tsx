"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Shield, Lock, Smartphone, CreditCard, Globe, ExternalLink } from "lucide-react"

export default function SafetyPage() {
  const { t } = useLanguage()
  const [search, setSearch] = useState("")

  // Use fallback if translations are not fully populated for a specific language yet
  // This ensures the page never crashes even if 'mr' or 'te' keys are missing
  const resources = t.safety?.articles || []
  const categories = t.safety?.categories || {}

  const getIcon = (idx: number) => {
    const icons = [CreditCard, Smartphone, Lock, Shield, Globe]
    return icons[idx % icons.length]
  }

  const filtered = resources.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.desc.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          {t.nav.safety}
        </h1>
        <p className="text-muted-foreground">
          {t.safety?.subtitle || "Knowledge is your first line of defense."}
        </p>

        <div className="relative max-w-md mx-auto mt-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t.safety?.searchPlaceholder || "Search..."}
            className="pl-10 h-10 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx: number) => {
          const Icon = getIcon(idx)
          return (
            <Card key={idx} className="glassy hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  {/* Mock Category Mapping for Demo */}
                  <Badge variant="outline">Guide</Badge>
                </div>
                <CardTitle className="mt-4">{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {item.tips && item.tips.map((tip: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      {tip}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(item.title + " safety guide")}`, '_blank')}
                >
                  {t.safety?.readMore || "Read More"} <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          {t.safety?.noResults} &quot;{search}&quot;.
        </div>
      )}
    </div>
  )
}
