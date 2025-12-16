import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/components/lib/utils"

const alertVariants = cva(
  "relative w-full flex items-start gap-4 rounded-xl px-5 py-4 shadow-lg bg-white/70 backdrop-blur-md border border-gray-200 transition-all duration-200 animate-in fade-in data-[state=open]:slide-in-from-top-2",
  {
    variants: {
      variant: {
        default: "border-l-4 border-primary text-card-foreground",
        info: "border-l-4 border-blue-400 text-blue-800 bg-blue-50/70",
        success: "border-l-4 border-green-500 text-green-800 bg-green-50/70",
        warning: "border-l-4 border-yellow-400 text-yellow-900 bg-yellow-50/70",
        destructive:
          "border-l-4 border-red-500 text-destructive bg-red-50/80 *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "text-lg font-semibold tracking-tight mb-1 flex items-center",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-muted-foreground leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
