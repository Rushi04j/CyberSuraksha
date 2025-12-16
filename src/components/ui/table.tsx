"use client"

import type * as React from "react"
import { cn } from "@/components/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto rounded-xl bg-white/70 shadow-inner dark:bg-gray-900/40">
      <table data-slot="table" className={cn("w-full caption-bottom text-base rounded-xl", className)} {...props} />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn("[&_tr]:border-b bg-gray-50 dark:bg-gray-800/40", className)} {...props} />
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props} />
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot data-slot="table-footer" className={cn("bg-gradient-to-r from-muted/40 to-white/60 border-t font-medium", className)} {...props} />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr data-slot="table-row" className={cn("hover:bg-blue-50/50 dark:hover:bg-blue-900/30 border-b transition-colors", className)} {...props} />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th data-slot="table-head" className={cn("text-foreground h-12 px-3 font-bold bg-gray-100 dark:bg-gray-800 text-left align-middle whitespace-nowrap", className)} {...props} />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td data-slot="table-cell" className={cn("p-3 align-middle whitespace-nowrap text-gray-700 dark:text-gray-200", className)} {...props} />
  )
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption data-slot="table-caption" className={cn("text-muted-foreground mt-4 text-base", className)} {...props} />
  )
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
