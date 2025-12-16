"use client"

import type * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { cn } from "@/components/lib/utils"

// Menu root (unchanged, best practice)
function DropdownMenu({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

// Menu content with glass, shadow, advanced animation
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15)] animate-in data-[state=closed]:fade-out data-[state=open]:fade-in zoom-in data-[side=bottom]:slide-in-from-top-3 data-[side=left]:slide-in-from-right-3 data-[side=right]:slide-in-from-left-3 data-[side=top]:slide-in-from-bottom-3 z-50 max-h-[calc(var(--radix-dropdown-menu-content-available-height,320px))] min-w-[10rem] overflow-y-auto p-2 transition-all",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 text-base cursor-pointer select-none outline-none transition-all focus:bg-blue-50 dark:focus:bg-blue-800/10 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 data-[variant=destructive]:text-red-600 data-[variant=destructive]:focus:bg-red-50/90 dark:data-[variant=destructive]:focus:bg-red-900/20 data-[variant=destructive]:font-bold data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[inset]:pl-10 [&_svg:not([class*='text-'])]:text-gray-400 dark:[&_svg:not([class*='text-'])]:text-gray-500 [&_svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "flex items-center gap-2 rounded-lg pl-10 pr-3 py-2 text-base cursor-pointer select-none outline-none transition-all focus:bg-blue-50 dark:focus:bg-blue-800/10 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-3 flex items-center justify-center h-5 w-5">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="w-4 h-4 text-primary" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "flex items-center gap-2 rounded-lg pl-10 pr-3 py-2 text-base cursor-pointer select-none outline-none transition-all focus:bg-blue-50 dark:focus:bg-blue-800/10 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    >
      <span className="absolute left-3 flex items-center justify-center h-5 w-5">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="w-3 h-3 fill-current text-primary" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn("px-3 py-2 text-base font-semibold data-[inset]:pl-10 text-gray-600 dark:text-gray-400", className)}
      {...props}
    />
  )
}

// Divider line, glass effect
function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 mx-2 my-2 h-px", className)}
      {...props}
    />
  )
}

// Keyboard shortcut visual
function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("text-gray-400 dark:text-gray-500 ml-auto text-xs tracking-widest", className)}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex items-center rounded-lg px-3 py-2 text-base cursor-pointer select-none outline-none transition-all focus:bg-blue-50 dark:focus:bg-blue-800/10 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 data-[state=open]:bg-blue-100 dark:data-[state=open]:bg-blue-700/20 data-[inset]:pl-10",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto w-4 h-4 text-gray-500" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

// Glass, shadow, smooth animation for submenus
function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl animate-in p-2 min-w-[10rem]",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
