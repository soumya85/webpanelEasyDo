import { cn } from "@/lib/utils";

interface TaskIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
};

export function TaskIcon({ className, size = "md" }: TaskIconProps) {
  return (
    <span
      className={cn("material-icons-outlined", sizeClasses[size], className)}
    >
      task_alt
    </span>
  );
}
