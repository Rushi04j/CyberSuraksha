"use client"

import type * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/components/lib/utils"

// Animate, shadow, and add slot for status/badge
function Avatar({
  className,
  status,
  badge,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  status?: "online" | "offline" | "busy"
  badge?: React.ReactNode
}) {
  return (
    <div className="relative">
      <AvatarPrimitive.Root
        data-slot="avatar"
        className={cn(
          "flex h-12 w-12 shrink-0 overflow-hidden rounded-full shadow-lg border border-gray-200 transition-transform ease-in duration-200 hover:scale-105 bg-white/60 backdrop-blur-lg",
          className
        )}
        {...props}
      />
      {/* Optional status dot */}
      {status && (
        <span
          className={cn(
            "absolute bottom-1 right-1 block h-3 w-3 rounded-full border-2 border-white shadow",
            {
              "bg-green-500": status === "online",
              "bg-gray-400": status === "offline",
              "bg-red-500": status === "busy"
            }
          )}
        />
      )}
      {/* Optional badge slot */}
      {badge && (
        <span className="absolute top-[-2px] right-[-2px] text-xs bg-gradient-to-tr from-primary to-secondary text-white rounded-full px-1.5 py-0.5 shadow">{badge}</span>
      )}
    </div>
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square h-full w-full object-cover transition-opacity duration-200 rounded-full",
        className
      )}
      {...props}
    />
  )
}

// Gradient fallback + initials
function AvatarFallback({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full text-lg font-bold bg-gradient-to-tr from-primary/60 to-secondary/60 text-white animate-pulse select-none",
        className
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Fallback>
  )
}

export { Avatar, AvatarImage, AvatarFallback }
