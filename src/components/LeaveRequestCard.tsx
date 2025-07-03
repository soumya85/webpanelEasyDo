import { cn } from "@/lib/utils";

interface LeaveRequestCardProps {
  onClick?: () => void;
  className?: string;
}

export function LeaveRequestCard({
  onClick,
  className,
}: LeaveRequestCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex w-full h-[90px] sm:h-[95px] lg:h-[100px]",
        "px-1 sm:px-2 lg:px-3 py-3 sm:py-4 lg:py-5 justify-center items-center flex-shrink-0",
        "rounded-[8px] sm:rounded-[10px] border-b-[4px] sm:border-b-[6px] border-[#4766E5] bg-white",
        "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
        "cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-md",
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5">
        <div className="flex w-[20px] sm:w-[24px] lg:w-[28px] flex-col items-center justify-center flex-shrink-0">
          <img src="/leave_request-icon.png" alt="Leave Request" />
        </div>
        <h3 className="text-[#283C50] font-inter font-bold text-xs lg:text-sm leading-[12px] sm:leading-[14px] lg:leading-[16px] text-center">
          Leave Request
        </h3>
      </div>
    </div>
  );
}
