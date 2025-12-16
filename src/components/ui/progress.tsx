"use client"

import type * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/components/lib/utils"

function Progress({
  className,
  value = 0,
  striped = false,
  color = "from-blue-500 to-blue-700",
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  striped?: boolean
  color?: string // e.g. "from-blue-500 to-blue-700"
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      aria-valuenow={typeof value === "number" ? value : undefined}
      className={cn(
        "bg-white/50 dark:bg-gray-900/40 backdrop-blur rounded-full h-3 w-full overflow-hidden shadow-inner border border-gray-200 dark:border-gray-800 transition-all",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full transition-all duration-500 rounded-full bg-gradient-to-r",
          color,
          striped && "bg-[repeating-linear-gradient(45deg,theme(colors.blue.500)_0px,theme(colors.blue.500)_8px,theme(colors.white)_8px,theme(colors.white)_16px)] animate-stripes"
        )}
        style={{
          width: `${typeof value === "number" && value !== null ? value : 0}%`,
          minWidth: typeof value === "number" && value !== null && value > 0 ? 12 : 0
        }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
