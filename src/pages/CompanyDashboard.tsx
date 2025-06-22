import { cn } from "@/lib/utils";
import AttendanceSummary from "@/components/AttendanceSummary";
import { useNavigate } from "react-router-dom";
import React from "react";

// Custom ChevronRight Icon to match Overview page
const ChevronRightIcon = () => (
  <svg
    width="6"
    height="9"
    viewBox="0 0 6 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-1 h-[7px] flex-shrink-0"
  >
    <path
      d="M1.00391 7.595L5.00391 4.095L1.00391 0.595001"
      stroke="#7C8796"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function CompanyDashboard() {
  const navigate = useNavigate();

  // Branch options
  const branchOptions = [
    { label: "Head Office Kolkata", value: "kolkata" },
    { label: "Delhi Branch", value: "delhi" },
    { label: "Mumbai Branch", value: "mumbai" },
    { label: "Bangalore Branch", value: "bangalore" },
  ];
  const [selectedBranch, setSelectedBranch] = React.useState("kolkata");
  const selectedBranchLabel =
    branchOptions.find((b) => b.value === selectedBranch)?.label || "";

  // Example card data (add branch property if you want to filter by branch)
  const cardData = [
    {
      icon: <img src="/register-icon.png" alt="Register" />,
      title: "Register",
      id: "register",
      route: "/employee-register",
    },
    {
      icon: <img src="/backgroundcheck-icon.png" alt="Background Verification" />,
      title: "Background Verification",
      id: "background-verification",
      route: "/employee-register",
    },
    {
      icon: <img src="/performamance_review-icon.png" alt="Performance Review" />,
      title: "Performance Review",
      id: "performance-review",
      route: "/performance-review",
    },
    {
      icon: <img src="/location-icon.png" alt="Location" />,
      title: "Location",
      id: "location",
      route: "/location",
    },
    {
      icon: <img src="/branch-icon.png" alt="Branch" />,
      title: "Branch",
      id: "branch",
      route: "/branch",
    },
    {
      icon: <img src="/announce-icon.png" alt="Announce" />,
      title: "Announcement",
      id: "Announcement",
      route: "/announcement",
    },
    {
      icon: <img src="/Documents-icon.png" alt="Documents" />,
      title: "Documents",
      id: "documents",
      route: "/documents",
    },
    {
      icon: <img src="/leave-icon.png" alt="Leave" />,
      title: "Leave",
      id: "leave",
      route: "/leave",
    },
    {
      icon: <img src="/holiday-icon.png" alt="Holiday" />,
      title: "Holiday",
      id: "holiday",
      route: "/holiday",
    },
    {
      icon: <img src="/reports-icon.png" alt="Reports" />,
      title: "Reports",
      id: "reports",
      route: "/reports",
    },
    {
      icon: <img src="/pendingapproval-icon.png" alt="Pending Approvals" />,
      title: "Pending Approvals",
      id: "pending-approvals",
      route: "/pending-approvals",
    },
  ];

  // Responsive: show all cards, or filter if needed
  const filteredCards = cardData;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-inter flex flex-col">
      {/* Header - compact and sticky */}
      <div className="w-full sticky top-0 z-30 bg-gradient-to-r from-indigo-700 via-blue-600 to-blue-400 shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight drop-shadow">
                Company Dashboard
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-blue-100 font-semibold text-xs">
                  Liberty Highrise PVT Ltd
                </span>
                <ChevronRightIcon />
                <select
                  className="ml-2 border border-indigo-200 rounded px-2 py-0.5 text-xs bg-white text-indigo-700 focus:border-indigo-400 transition"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                >
                  {branchOptions.map((branch) => (
                    <option key={branch.value} value={branch.value}>
                      {branch.label}
                    </option>
                  ))}
                </select>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Grid and Dashboard, maximized for viewport */}
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-2 sm:px-4 lg:px-6 py-2">
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3 overflow-auto">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              onClick={() => card.route && navigate(card.route)}
              className={cn(
                "flex flex-col items-center justify-center h-[90px] sm:h-[110px] w-full rounded-xl bg-white border-b-4 border-indigo-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group",
                "relative overflow-hidden"
              )}
            >
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition">
                <ChevronRightIcon />
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 mb-1 shadow group-hover:bg-indigo-100 transition">
                {card.icon}
              </div>
              <div className="text-center">
                <h3 className="text-xs sm:text-sm font-bold text-indigo-800 group-hover:text-indigo-600 transition">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Section - compact */}
        <div className="mt-3">
          <div className="rounded-xl bg-white shadow p-3 min-h-[180px]">
            <AttendanceSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
