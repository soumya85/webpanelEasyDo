import { cn } from "@/lib/utils";

interface MeetIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5", 
  lg: "w-6 h-6",
};

export function MeetIcon({ className, size = "md" }: MeetIconProps) {
  return (
    <img
      src="https://cdn.builder.io/api/v1/image/assets%2Fd6f93891567641d1bb19c951c166916e%2F51d359c5891a4e05a53ecd2441dc52fd?format=webp&width=800"
      alt="Meet"
      className={cn(sizeClasses[size], className)}
    />
  );
}
