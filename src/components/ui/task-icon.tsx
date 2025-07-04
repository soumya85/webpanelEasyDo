import { cn } from "@/lib/utils";

interface TaskIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export function TaskIcon({ className, size = "md" }: TaskIconProps) {
  return (
    <img
      src="https://cdn.builder.io/api/v1/image/assets%2Fd6f93891567641d1bb19c951c166916e%2F9f2b8203760d4faeb934077bd8947014?format=webp&width=800"
      alt="Task"
      className={cn(sizeClasses[size], "object-contain", className)}
      style={{ backgroundColor: "transparent" }}
    />
  );
}
