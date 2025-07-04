import { cn } from "@/lib/utils";
import { useState } from "react";
import { ReactiveMultilingualText } from "@/components/ReactiveMultilingualText";
import { useGlobalTranslation } from "@/hooks/useGlobalTranslation";
import AttendanceSummary from "@/components/AttendanceSummary";
import PerformanceMeter from "@/components/PerformanceMeter";
import WagesSummary from "@/components/WagesSummary";
import LeaveBalance from "@/components/LeaveBalance";
import UpcomingHolidays from "@/components/UpcomingHolidays";

export default function SamplePage2() {
  const { t } = useGlobalTranslation();
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);

  // Sample card data for this page with different actions
  const cardData = [
    {
      icon: <img src="/statistics-icon.png" alt="Analytics" />,
      title: "Analytics",
      id: "analytics",
    },
    {
      icon: <img src="/reports-icon.png" alt="Reports" />,
      title: "Reports",
      id: "reports",
    },
    {
      icon: <img src="/leave-icon.png" alt="Planning" />,
      title: "Planning",
      id: "planning",
    },
    {
      icon: <img src="/holiday-icon.png" alt="Calendar" />,
      title: "Calendar",
      id: "calendar",
    },
    {
      icon: (
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fd6f93891567641d1bb19c951c166916e%2F529ce68273f14919b950080f449153c7?format=webp&width=800"
          alt="Tasks"
          className="w-6 h-6 object-contain"
        />
      ),
      title: "Tasks",
      id: "tasks",
    },
    {
      icon: <img src="/OT_request-icon.png" alt="Messages" />,
      title: "Messages",
      id: "messages",
    },
    {
      icon: <img src="/Salaryadvance_request-icon.png" alt="Settings" />,
      title: "Settings",
      id: "settings",
    },
    {
      icon: <img src="/Reimburse_request-icon.png" alt="Support" />,
      title: "Support",
      id: "support",
    },
  ];

  return (
    <div className={cn("w-full p-3 sm:p-4 lg:p-6 pt-8 font-inter")}>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#283C50] mb-2">
          Sample Page 2
        </h1>
        <p className="text-gray-600">
          Another sample page with different styling and content arrangement
        </p>
      </div>

      {/* Page Area */}
      <div
        className={cn(
          "flex w-full flex-col items-start gap-4 sm:gap-5 lg:gap-6",
        )}
      >
        {/* Quick Action Cards Grid - Single Row */}
        <div className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 lg:gap-4 w-full">
            {cardData.map((card, index) => (
              <div
                key={card.id}
                onClick={() => {
                  console.log(`Clicked ${card.title}`);
                }}
                className={cn(
                  "flex w-full h-[90px] sm:h-[95px] lg:h-[100px]",
                  "px-1 sm:px-2 lg:px-3 py-3 sm:py-4 lg:py-5 justify-center items-center flex-shrink-0",
                  "rounded-[8px] sm:rounded-[10px] border-b-[4px] sm:border-b-[6px] border-[#EA4D4D] bg-white",
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

        {/* Dashboard Sections - Different Layout */}
        <div className="flex flex-col gap-6 w-full">
          {/* Single Row: All components in one row for larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
            <div className="min-h-[250px] xl:col-span-2">
              <AttendanceSummary />
            </div>
            <div className="min-h-[250px] xl:col-span-2">
              <PerformanceMeter />
            </div>
            <div className="min-h-[250px]">
              <WagesSummary />
            </div>
          </div>

          {/* Second Row: Leave Balance and Holidays */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="min-h-[200px] lg:min-h-[220px]">
              <LeaveBalance />
            </div>
            <div className="min-h-[200px] lg:min-h-[220px]">
              <UpcomingHolidays
                onViewDetails={() => setIsHolidayModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
