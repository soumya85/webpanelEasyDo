import { cn } from "@/lib/utils";
import { useState } from "react";
import { ReactiveMultilingualText } from "@/components/ReactiveMultilingualText";
import { useGlobalTranslation } from "@/hooks/useGlobalTranslation";
import AttendanceSummary from "@/components/AttendanceSummary";
import PerformanceMeter from "@/components/PerformanceMeter";
import WagesSummary from "@/components/WagesSummary";
import LeaveBalance from "@/components/LeaveBalance";
import UpcomingHolidays from "@/components/UpcomingHolidays";

export default function SamplePage1() {
  const { t } = useGlobalTranslation();
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);

  // Sample card data for this page
  const cardData = [
    {
      icon: <img src="/leave_request-icon.png" alt="Sample Action 1" />,
      title: "Sample Action 1",
      id: "sample-1",
    },
    {
      icon: <img src="/OT_request-icon.png" alt="Sample Action 2" />,
      title: "Sample Action 2",
      id: "sample-2",
    },
    {
      icon: <img src="/Salaryadvance_request-icon.png" alt="Sample Action 3" />,
      title: "Sample Action 3",
      id: "sample-3",
    },
    {
      icon: <img src="/Reimburse_request-icon.png" alt="Sample Action 4" />,
      title: "Sample Action 4",
      id: "sample-4",
    },
    {
      icon: <img src="/statistics-icon.png" alt="Sample Action 5" />,
      title: "Sample Action 5",
      id: "sample-5",
    },
    {
      icon: <img src="/leave-icon.png" alt="Sample Action 6" />,
      title: "Sample Action 6",
      id: "sample-6",
    },
    {
      icon: <img src="/holiday-icon.png" alt="Sample Action 7" />,
      title: "Sample Action 7",
      id: "sample-7",
    },
    {
      icon: <img src="/reports-icon.png" alt="Sample Action 8" />,
      title: "Sample Action 8",
      id: "sample-8",
    },
  ];

  return (
    <div className={cn("w-full p-3 sm:p-4 lg:p-6 pt-8 font-inter")}>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#283C50] mb-2">
          Sample Page 1
        </h1>
        <p className="text-gray-600">
          This is a sample page based on the Employee Dashboard structure
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
                  "rounded-[8px] sm:rounded-[10px] border-b-[4px] sm:border-b-[6px] border-[#17C666] bg-white",
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

        {/* Dashboard Sections */}
        <div className="flex flex-col gap-6 w-full">
          {/* First Row: Attendance Summary and Performance Meter */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="min-h-[250px] lg:min-h-[280px]">
              <AttendanceSummary />
            </div>
            <div className="min-h-[300px] lg:min-h-[350px]">
              <PerformanceMeter />
            </div>
          </div>

          {/* Second Row: Wages, Leave Balance, and Upcoming Holidays */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="min-h-[200px] lg:min-h-[220px]">
              <WagesSummary />
            </div>
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
