import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-muted rounded-md relative overflow-hidden",
        "before:absolute before:inset-0 before:animate-rune-shimmer",
        "before:bg-gradient-to-r before:from-transparent before:via-arcane-500/10 before:to-transparent",
        "before:bg-[length:200%_auto]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
