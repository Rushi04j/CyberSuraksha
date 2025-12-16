import type * as React from "react"
import { cn } from "@/components/lib/utils"

// Card with glass effect, shadow, animated elevation
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-white/80 backdrop-blur-lg border border-gray-200 text-gray-900 flex flex-col gap-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-200 dark:bg-gray-800/70 dark:border-gray-700 dark:text-gray-100",
        className
      )}
      {...props}
    />
  )
}

// Header with divider and spacing
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col gap-2 px-8 pt-6 pb-3 border-b border-b-gray-100 dark:border-b-gray-800",
        className
      )}
      {...props}
    />
  )
}

// Prominent title style
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "leading-tight font-extrabold text-xl text-gray-900 dark:text-gray-100",
        className
      )}
      {...props}
    />
  )
}

// Subtle description
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-gray-600 dark:text-gray-300 text-base leading-relaxed mt-1",
        className
      )}
      {...props}
    />
  )
}

// Floating action area
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "self-end flex gap-2 pt-2",
        className
      )}
      {...props}
    />
  )
}

// Spacious content area
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-8 py-4",
        className
      )}
      {...props}
    />
  )
}

// Footer with subtle divider
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center px-8 py-3 border-t border-t-gray-100 dark:border-t-gray-800",
        className
      )}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
