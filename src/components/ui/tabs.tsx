"use client"

import type * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/components/lib/utils"

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-3", className)} {...props} />
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-white/80 dark:bg-gray-900/60 backdrop-blur-lg shadow rounded-xl inline-flex h-12 w-max items-center justify-center p-1 gap-1",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex flex-1 items-center justify-center rounded-lg bg-transparent px-4 py-2.5 text-base font-semibold text-gray-700 dark:text-gray-100 transition-all duration-200 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground hover:bg-blue-50 dark:data-[state=active]:bg-blue-800 dark:data-[state=active]:text-white",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
