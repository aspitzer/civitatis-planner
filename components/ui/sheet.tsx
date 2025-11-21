import * as React from "react"
import { cn } from "@/lib/utils"

interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  side?: "top" | "right" | "bottom" | "left"
  children: React.ReactNode
}

const Sheet = ({ open, onOpenChange, side = "right", children }: SheetProps) => {
  if (!open) return null

  const sideClasses = {
    top: "top-0 left-0 right-0",
    right: "top-0 right-0 bottom-0",
    bottom: "bottom-0 left-0 right-0",
    left: "top-0 left-0 bottom-0",
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange?.(false)}
      />
      <div
        className={cn(
          "fixed z-50 bg-background shadow-lg",
          sideClasses[side]
        )}
      >
        {children}
      </div>
    </div>
  )
}

const SheetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 h-full overflow-y-auto", className)}
    {...props}
  />
))
SheetContent.displayName = "SheetContent"

export { Sheet, SheetContent }
