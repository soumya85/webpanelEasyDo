import { ChevronRight } from "lucide-react";

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
    <div className="w-full p-3 sm:p-4 lg:p-6 font-inter">
      {/* Page Area */}
      <div className="flex w-full flex-col items-start gap-4 sm:gap-5 lg:gap-6">
        {/* Breadcrumb Section Row */}
        <div className="flex min-h-[50px] sm:min-h-[60px] lg:min-h-[65px] px-4 py-3 sm:px-6 sm:py-3 lg:px-[30px] lg:py-[13.5px] justify-between items-center self-stretch rounded-lg border-l-[6px] border-[#4766E5] bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)] flex-row gap-2 lg:gap-0">
        <div className="flex items-center gap-2.5">
          <span className="font-semibold text-base text-slate-700 leading-[19.2px]">
            Employee Dashboard
          </span>
          <span className="font-light text-base text-gray-300 leading-[19.2px]">
            |
          </span>
          <span className="font-semibold text-[13px] text-slate-700 leading-[20.8px]">
            Liberty Highrise PVT Ltd
          </span>
          <ChevronRight className="h-[7px] w-1 text-gray-500 stroke-[1px]" />
          <span className="font-normal text-[13px] text-black leading-[20.8px]">
            All Branch
          </span>
        </div>
        <div className="w-[171px] h-[41.19px] flex items-center justify-end">
          <div className="h-full bg-transparent"></div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="space-y-7">
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {cardData.slice(0, 4).map((card, index) => (
            <div
              key={card.id}
              className="flex w-full min-w-[251px] h-[116px] px-4 justify-center items-center gap-3 flex-shrink-0 rounded-[10px] border-b-[6px] border-b-blue-600 bg-white shadow-sm shadow-black/10 cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-md"
            >
              <div className="flex w-[41px] flex-col items-start gap-2.5 flex-shrink-0">
                {card.icon}
              </div>
              <div className="flex justify-center items-center gap-2.5">
                <h3 className="font-bold text-base text-slate-700 leading-[25.6px] text-center">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {cardData.slice(4, 8).map((card, index) => (
            <div
              key={card.id}
              className="flex w-full min-w-[251px] h-[116px] px-4 justify-center items-center gap-3 flex-shrink-0 rounded-[10px] border-b-[6px] border-b-blue-600 bg-white shadow-sm shadow-black/10 cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-md"
            >
              <div className="flex w-[41px] flex-col items-start gap-2.5 flex-shrink-0">
                {card.icon}
              </div>
              <div className="flex justify-center items-center gap-2.5">
                <h3 className="font-bold text-base text-slate-700 leading-[25.6px] text-center">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}