import { cn } from "@/lib/utils";

interface NotificationBadgeProps {
  count: number;
  variant?: "success" | "error" | "default";
  className?: string;
}

export function NotificationBadge({
  count,
  variant = "default",
  className,
}: NotificationBadgeProps) {
  if (count === 0) return null;

  const variantStyles = {
    success: "bg-success text-white",
    error: "bg-warning text-white",
    default: "bg-primary text-white",
  };

  return (
    <div
      className={cn(
        "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold leading-none",
        variantStyles[variant],
        className,
      )}
    >
      {count > 99 ? "99+" : count}
    </div>
  );
}
