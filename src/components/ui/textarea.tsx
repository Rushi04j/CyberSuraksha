"use client"

import type * as React from "react"
import { cn } from "@/components/lib/utils"

function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "rounded-xl border-2 border-gray-300 bg-white/80 dark:bg-gray-900/50 px-4 py-3 text-base shadow-md focus:border-primary/70 focus:ring-4 focus:ring-primary/20 focus:shadow-xl placeholder:text-gray-400 selection:bg-blue-100 selection:text-blue-900 transition-all duration-200 outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
