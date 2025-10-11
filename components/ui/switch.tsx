"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-9 w-12 shrink-0 items-center rounded-sm border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block h-full w-8 rounded-sm ring-0 transition-transform data-[state=checked]:translate-x-[calc(50%-2px)] data-[state=unchecked]:translate-x-0 flex items-center justify-center"
        )}
      >
        <span className="block dark:hidden">
          {/* Sun icon (light theme) */}
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="4" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="2">
              <line x1="10" y1="2" x2="10" y2="0" />
              <line x1="10" y1="18" x2="10" y2="20" />
              <line x1="2" y1="10" x2="0" y2="10" />
              <line x1="18" y1="10" x2="20" y2="10" />
              <line x1="4.22" y1="4.22" x2="2.81" y2="2.81" />
              <line x1="15.78" y1="15.78" x2="17.19" y2="17.19" />
              <line x1="4.22" y1="15.78" x2="2.81" y2="17.19" />
              <line x1="15.78" y1="4.22" x2="17.19" y2="2.81" />
            </g>
          </svg>
        </span>
        <span className="hidden dark:block">
          {/* Moon icon (dark theme) */}
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path
              d="M15 10a5 5 0 1 1-5-5c0 2.76 2.24 5 5 5z"
              fill="currentColor"
            />
          </svg>
        </span>
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { Switch }

