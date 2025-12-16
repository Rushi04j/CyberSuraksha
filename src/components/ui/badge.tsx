import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/components/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-colors border-none shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-tr from-primary/70 to-primary/90 text-primary-foreground animate-in fade-in",
        secondary: "bg-gradient-to-tr from-secondary/70 to-secondary/90 text-secondary-foreground animate-in fade-in",
        destructive: "bg-gradient-to-tr from-destructive/70 to-red-600 text-destructive-foreground animate-in fade-in",
        outline: "border border-foreground text-foreground bg-white/60 backdrop-blur-lg animate-in fade-in",
        glass: "bg-white/40 backdrop-blur-md text-foreground border border-primary/20 animate-in fade-in",
        accent: "bg-gradient-to-br from-accent/70 to-accent text-accent-foreground shadow-inner",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  accent?: string
  pulse?: boolean
}

function Badge({ accent, pulse, className, variant, ...props }: BadgeProps) {
  return (
    <div
      data-slot="badge"
      className={cn(
        badgeVariants({ variant }),
        accent ? `pl-2 border-l-4 ${accent}` : "",
        pulse ? "animate-pulse" : "",
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
