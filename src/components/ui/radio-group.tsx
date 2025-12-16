"use client"

import type * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"
import { cn } from "@/components/lib/utils"

// Group with spacing, can use grid or flex
function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn(
        "flex flex-wrap gap-3 py-2",
        className
      )}
      {...props}
    />
  )
}

// Glassy, animated indicator, large target
function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-2 border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/30 shadow-md transition-all duration-200 aspect-square h-6 w-6 rounded-full flex items-center justify-center focus-visible:ring-4 focus-visible:ring-primary/40 outline-none hover:border-primary/50 checked:bg-primary checked:border-primary checked:scale-110 active:scale-100 disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center animate-in fade-in">
        <CircleIcon className="h-4 w-4 text-primary fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
