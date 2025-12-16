"use client"

import type * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cn } from "@/components/lib/utils"

// Main scroll area: glass effect holder
function ScrollArea({ className, children, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative overflow-hidden rounded-xl bg-white/50 shadow-inner dark:bg-gray-900/30", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-xl bg-transparent">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

// Glassy, animated scrollbar
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-bar"
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-all duration-200",
        orientation === "vertical"
          ? "h-full w-3 border-l bg-gradient-to-t from-white/60 to-white/90 dark:from-gray-900/20 dark:to-gray-900/60 rounded-r-xl"
          : "h-3 w-full border-t bg-gradient-to-r from-white/60 to-white/90 dark:from-gray-900/20 dark:to-gray-900/60 rounded-b-xl",
        "hover:bg-blue-50 active:bg-blue-100",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        className="bg-blue-400/70 dark:bg-blue-800/60 relative flex-1 rounded-full transition-colors duration-200 hover:bg-blue-600/80"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
