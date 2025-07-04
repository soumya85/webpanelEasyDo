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
      src="https://cdn.builder.io/api/v1/image/assets%2Fd6f93891567641d1bb19c951c166916e%2Ffc7e67f030a648d88ee68c1ca36d1224?format=webp&width=800"
      alt="Task"
      className={cn(sizeClasses[size], "object-contain", className)}
    />
  );
}
