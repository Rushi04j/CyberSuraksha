"use client"

import type * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/components/lib/utils"

function Accordion({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("w-full", className)}
      {...props}
    />
  )
}

// Card-style, frosted glass effect per accordion item
function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "mb-4 overflow-hidden rounded-xl bg-white/60 backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02] border border-gray-200", // glassmorphic look
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/60 flex flex-1 items-center justify-between gap-4 px-6 py-5 text-lg font-semibold bg-transparent backdrop-blur-md transition-all rounded-xl hover:bg-primary/10 hover:text-primary focus-visible:ring-4 outline-none group",
          "duration-300 ease-in-out select-none cursor-pointer",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          {/* Add an optional icon slot or badge here if needed */}
          {children}
        </div>
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 ml-2 transition-transform duration-300 group-data-[state=open]:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

// Animated, padded content area
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-base data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down bg-white/50 backdrop-blur-lg transition-all duration-300 border-t border-gray-200 px-6",
        className
      )}
      {...props}
    >
      <div className="py-4">{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
