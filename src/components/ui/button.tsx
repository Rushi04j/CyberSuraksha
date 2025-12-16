import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/components/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 outline-none shadow-lg focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-2 group select-none",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-tr from-blue-700 via-blue-500 to-blue-600 text-white hover:scale-[1.03] hover:shadow-xl active:scale-100 active:bg-blue-800/80 aria-[current=true]:ring-2 aria-[current=true]:ring-blue-500 pulse",
        destructive: "bg-gradient-to-tr from-red-700 via-red-500 to-red-600 text-white hover:scale-105 hover:shadow-xl active:scale-100 active:bg-red-800 aria-[current=true]:ring-2 aria-[current=true]:ring-red-500",
        outline: "border border-gray-300 bg-white/60 backdrop-blur-lg text-gray-800 shadow-sm hover:bg-gray-100 hover:border-primary/40 active:bg-gray-200",
        secondary: "bg-gradient-to-tr from-gray-200 to-gray-400 text-gray-900 hover:bg-gray-300 hover:shadow-lg active:bg-gray-400",
        ghost: "text-gray-700 hover:bg-gray-50 hover:shadow-sm active:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100",
        link: "text-blue-700 underline-offset-4 hover:underline hover:text-blue-800 focus-visible:ring-blue-500/30",
      },
      size: {
        default: "h-11 px-6 py-2.5 has-[>svg]:px-5 text-base rounded-xl",
        sm: "h-9 rounded-md gap-1.5 px-4 text-sm has-[>svg]:px-3",
        lg: "h-14 rounded-2xl px-8 text-lg has-[>svg]:px-7",
        icon: "size-11",
      },
      pulse: {
        true: "animate-pulse",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  pulse, // for attention/call to action
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    pulse?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size }),
        pulse ? "animate-pulse" : "",
        className
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants }
