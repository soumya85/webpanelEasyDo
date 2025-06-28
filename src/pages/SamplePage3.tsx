import { cn } from "@/lib/utils";
import { useState } from "react";
import { ReactiveMultilingualText } from "@/components/ReactiveMultilingualText";
import { useGlobalTranslation } from "@/hooks/useGlobalTranslation";
import AttendanceSummary from "@/components/AttendanceSummary";
import PerformanceMeter from "@/components/PerformanceMeter";
import WagesSummary from "@/components/WagesSummary";
import LeaveBalance from "@/components/LeaveBalance";
import UpcomingHolidays from "@/components/UpcomingHolidays";

export default function SamplePage3() {
  const { t } = useGlobalTranslation();
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);

  // Sample card data for this page with business-focused actions
  const cardData = [
    {
      icon: <img src="/register-icon.png" alt="Register" />,
      title: "Register",
      id: "register",
    },
    {
      icon: (
        <img src="/backgroundcheck-icon.png" alt="Background Verification" />
      ),
      title: "Background Verification",
      id: "background-verification",
    },
    {
      icon: (
        <img src="/performamance_review-icon.png" alt="Performance Review" />
      ),
      title: "Performance Review",
      id: "performance-review",
    },
    {
      icon: <img src="/branch-icon.png" alt="Branch" />,
      title: "Branch",
      id: "branch",
    },
    {
      icon: <img src="/announce-icon.png" alt="Announce" />,
      title: "Announce",
      id: "announce",
    },
    {
      icon: <img src="/Documents-icon.png" alt="Documents" />,
      title: "Documents",
      id: "documents",
    },
    {
      icon: <img src="/holiday-icon.png" alt="Holidays" />,
      title: "Holidays",
      id: "holidays",
    },
    {
      icon: <img src="/reports-icon.png" alt="Reports" />,
      title: "Reports",
      id: "reports",
    },
  ];

  return (
    <div className={cn("w-full p-3 sm:p-4 lg:p-6 pt-8 font-inter")}>
      {/* Page Area */}
      <div
        className={cn(
          "flex w-full flex-col items-start gap-4 sm:gap-5 lg:gap-6",
        )}
      >
        {/* Quick Action Cards Grid - Fewer cards */}
        <div className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 lg:gap-4 w-full max-w-6xl">
            {cardData.map((card, index) => (
              <div
                key={card.id}
                onClick={() => {
                  console.log(`Clicked ${card.title}`);
                }}
                className={cn(
                  "flex w-full h-[90px] sm:h-[95px] lg:h-[100px]",
                  "px-1 sm:px-2 lg:px-3 py-3 sm:py-4 lg:py-5 justify-center items-center flex-shrink-0",
                  "rounded-[8px] sm:rounded-[10px] border-b-[4px] sm:border-b-[6px] border-[#7C3AED] bg-white",
                  "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
                  "cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-md",
                )}
              >
                <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5">
                  <div className="flex w-[20px] sm:w-[24px] lg:w-[28px] flex-col items-center justify-center flex-shrink-0">
                    {card.icon}
                  </div>
                  <h3 className="text-[#283C50] font-inter font-bold text-xs lg:text-sm leading-[12px] sm:leading-[14px] lg:leading-[16px] text-center">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Sections - Vertical Layout */}
        <div className="flex flex-col gap-6 w-full">
          {/* Performance and Attendance side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="min-h-[300px]">
              <PerformanceMeter />
            </div>
            <div className="min-h-[250px]">
              <AttendanceSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
