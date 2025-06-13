import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmployeeDashboard() {
  const cardData = [
    // Row 1
    {
      icon: <img src="/leave_request-icon.png" alt="Leave Request" />,
      title: "Leave Request",
      id: "leave-request",
    },
    {
      icon: <img src="/OT_request-icon.png" alt="OT Request" />,
      title: "OT Request",
      id: "ot-request",
    },
    {
      icon: (
        <img src="/Salaryadvance_request-icon.png" alt="Salary Adv. Request" />
      ),
      title: "Salary Adv. Request",
      id: "salary-request",
    },
    {
      icon: <img src="/Reimburse_request-icon.png" alt="Reimburse Request" />,
      title: "Reimburse Request",
      id: "reimburse-request",
    },
    // Row 2
    {
      icon: <img src="/statistics-icon.png" alt="Statistics" />,
      title: "Statistics",
      id: "statistics",
    },
    {
      icon: <img src="/leave-icon.png" alt="Leave" />,
      title: "Leave",
      id: "leave",
    },
    {
      icon: <img src="/holiday-icon.png" alt="Holiday" />,
      title: "Holiday",
      id: "holiday",
    },
    {
      icon: <img src="/reports-icon.png" alt="Reports" />,
      title: "Reports",
      id: "reports",
    },
  ];

  return (
    <div className={cn("w-full p-3 sm:p-4 lg:p-6 font-inter")}>
      {/* Page Area */}
      <div
        className={cn(
          "flex w-full flex-col items-start gap-4 sm:gap-5 lg:gap-6",
        )}
      >
        {/* Breadcrumb Section Row */}
        <div
          className={cn(
            "flex min-h-[50px] sm:min-h-[60px] lg:min-h-[65px]",
            "px-4 py-3 sm:px-6 sm:py-3 lg:px-[30px] lg:py-[13.5px]",
            "justify-between items-center self-stretch",
            "rounded-lg border-l-[6px] border-[#4766E5] bg-white",
            "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
            "flex-row gap-2 lg:gap-0",
          )}
        >
          <div className="flex items-center gap-2 sm:gap-[8px] lg:gap-[10px] flex-wrap flex-1">
            <span className="text-[#283C50] font-inter text-base sm:text-xl lg:text-base font-bold leading-[20px] sm:leading-[24px] lg:leading-[19.2px]">
              Employee Dashboard
            </span>
            <span className="text-[#DBD9D9] font-inter text-sm sm:text-base font-normal leading-[16px] sm:leading-[19.2px] hidden sm:block">
              |
            </span>
            <span className="text-[#283C50] font-inter text-xs sm:text-[13px] font-bold leading-[16px] sm:leading-[20.8px] hidden sm:block">
              Liberty Highrise PVT Ltd
            </span>
            <div className="hidden sm:block">
              <ChevronRight className="w-1 h-[7px] text-[#7C8796] flex-shrink-0" />
            </div>
            <span className="text-[#222] font-inter text-xs sm:text-[13px] font-normal leading-[16px] sm:leading-[20.8px] hidden sm:block">
              All Branch
            </span>
          </div>
          <div className="flex justify-end items-center gap-2 lg:gap-[10px] flex-shrink-0">
            <div className="w-[171px] h-[41.19px] flex items-center justify-end">
              <div className="h-full bg-transparent"></div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 w-full">
          {/* Row 1 */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-full">
            {cardData.slice(0, 4).map((card, index) => (
              <div
                key={card.id}
                className={cn(
                  "flex w-full min-w-[200px] sm:min-w-[251px] h-[100px] sm:h-[116px]",
                  "px-3 sm:px-4 justify-center items-center gap-2 flex-shrink-0",
                  "rounded-[10px] border-b-[6px] border-[#4766E5] bg-white",
                  "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
                  "cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-md",
                )}
              >
                <div className="flex w-[35px] sm:w-[41px] flex-col items-start flex-shrink-0">
                  {card.icon}
                </div>
                <div className="flex justify-start items-center flex-1 min-w-0">
                  <h3 className="text-[#283C50] font-inter font-bold text-sm sm:text-base leading-[20px] sm:leading-[25.6px]">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-full">
            {cardData.slice(4, 8).map((card, index) => (
              <div
                key={card.id}
                className={cn(
                  "flex w-full min-w-[200px] sm:min-w-[251px] h-[100px] sm:h-[116px]",
                  "px-3 sm:px-4 justify-center items-center gap-2 flex-shrink-0",
                  "rounded-[10px] border-b-[6px] border-[#4766E5] bg-white",
                  "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
                  "cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-md",
                )}
              >
                <div className="flex w-[35px] sm:w-[41px] flex-col items-start flex-shrink-0">
                  {card.icon}
                </div>
                <div className="flex justify-start items-center flex-1 min-w-0">
                  <h3 className="text-[#283C50] font-inter font-bold text-sm sm:text-base leading-[20px] sm:leading-[25.6px]">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
