"use client"

import type * as React from "react"
import { cn } from "@/components/lib/utils"

function Input({
  className,
  type,
  leftIcon,
  rightIcon,
  ...props
}: React.ComponentProps<"input"> & {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}) {
  return (
    <div className={cn("relative flex items-center w-full", leftIcon || rightIcon ? "pl-10 pr-10" : "")}>
      {leftIcon && (
        <span className="absolute left-3 z-10 flex items-center justify-center text-gray-400 dark:text-gray-500 pointer-events-none">
          {leftIcon}
        </span>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-gray-700 placeholder:text-gray-400 selection:bg-blue-100 selection:text-blue-900 w-full min-w-0 rounded-xl border-2 border-gray-300 bg-white/70 shadow-md px-4 py-2 text-base transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 md:text-base",
          "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:shadow-lg hover:border-primary/40 hover:bg-blue-50",
          "dark:bg-gray-800/40 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 dark:hover:border-primary/40",
          "aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:aria-invalid:border-red-400 dark:aria-invalid:ring-red-400/20",
          className
        )}
        {...props}
      />
      {rightIcon && (
        <span className="absolute right-3 z-10 flex items-center justify-center text-gray-400 dark:text-gray-500 pointer-events-none">
          {rightIcon}
        </span>
      )}
    </div>
  )
}

export { Input }
