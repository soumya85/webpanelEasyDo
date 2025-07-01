import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import { ReactiveMultilingualText } from "@/components/ReactiveMultilingualText";
import { useGlobalTranslation } from "@/hooks/useGlobalTranslation";
import EmployeeAttendanceCard from "@/components/cards/EmployeeAttendanceCard";
import EmployeeLocationTimelineCard from "@/components/cards/EmployeeLocationTimelineCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  X,
  Search,
  Settings2,
  Phone,
  MessageCircle,
  MoreVertical,
  ChevronDown,
  MapPin,
  Check,
  Plus,
  Calendar,
  User,
  ArrowLeft,
  Shield,
} from "lucide-react";

export default function SamplePage3() {
  const { t } = useGlobalTranslation();
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("Head office");
  const [holidayName, setHolidayName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [holidayType, setHolidayType] = useState("Public");
  const [selectedBranchFilter, setSelectedBranchFilter] =
    useState("All Branches");
  const [leaveView, setLeaveView] = useState("day");
  const [leaveFilter, setLeaveFilter] = useState("pending");
  const [selectedLeaveDate, setSelectedLeaveDate] = useState(18);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<{
    title: string;
    id: string;
  } | null>(null);

  // Employee Management State (for Register modal)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("accepted");
  const [selectedEmployeeBranch, setSelectedEmployeeBranch] = useState("all");
  const [sortBy, setSortBy] = useState("alphabetically");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showBranchSheet, setShowBranchSheet] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showTeamMembersPopup, setShowTeamMembersPopup] = useState(false);
  const [selectedManagerTeam, setSelectedManagerTeam] = useState(null);

  // Announcement state
  const [announcementSearch, setAnnouncementSearch] = useState("");
  const [announcementFilter, setAnnouncementFilter] = useState("All");
  const [showAnnouncementDropdown, setShowAnnouncementDropdown] =
    useState(false);

  // Mock announcement data
  const announcementData = [
    {
      id: "1",
      branch: "Ahmedabad office",
      date: "07-08-2024",
      time: "06:39 PM",
      title: "Server Maintenance..",
      description:
        "Today night 9:00 PM to 11:00 PM, the server will be down for some maintenance work.",
    },
    {
      id: "2",
      branch: "Haldia",
      date: "07-08-2024",
      time: "06:38 PM",
      title: "Server Maintenance",
      description:
        "Today night 9:00 PM to 11:00 PM, the server will be down for some maintenance work.",
    },
    {
      id: "3",
      branch: "Head office",
      date: "07-08-2024",
      time: "06:37 PM",
      title: "Server Maintenance..",
      description:
        "Today night 9:00 PM to 11:00 PM, the server will be down for some maintenance work.",
    },
    {
      id: "4",
      branch: "Head office",
      date: "24-05-2024",
      time: "04:40 PM",
      title: "NOTICE",
      description:
        "Due to the Loksava Election on 1st June 2024 at Kolkata Aera,Our Kolkata Office will be closed on that day..but if there is any urgent work then the work should be done from home..",
    },
    {
      id: "5",
      branch: "Head office",
      date: "09-01-2024",
      time: "01:34 AM",
      title: "Saturday - Full Working Days",
      description: "2024 - all Saturday will be a full working day.",
    },
    {
      id: "6",
      branch: "All Branch",
      date: "19-10-2023",
      time: "02:03 AM",
      title: "Test 2",
      description: "1234567",
    },
  ];

  // Mock employee data
  const employeeData = [
    {
      id: 1,
      name: "ABHIJIT MONDAL",
      position: "Jetty Sircar",
      branch: "Haldia",
      doj: "Apr 09, 2024",
      authority: 3,
      avatar: "/api/placeholder/40/40",
      initials: "AM",
      reportingManager: "Nayanjyoti Mandal",
      status: "accepted",
      rating: 0,
    },
    {
      id: 2,
      name: "Abhijit Mukherjee",
      position: "Operation Executive",
      branch: "Head office",
      doj: "Jan 01, 2017",
      authority: 3,
      avatar: "/api/placeholder/40/40",
      initials: "AM",
      reportingManager: "Debashis Debnath",
      status: "accepted",
      rating: 0,
    },
    {
      id: 3,
      name: "ABHIRAM MOHAPATRA",
      position: "Supervisor",
      branch: "Paradip",
      doj: "N/A",
      authority: 3,
      avatar: null,
      initials: "AM",
      reportingManager: "Digambar Khuntia",
      status: "accepted",
      rating: 0,
    },
    {
      id: 4,
      name: "AHSAN RAZA",
      position: "Manager",
      branch: "Head office",
      doj: "Mar 15, 2023",
      authority: 2,
      avatar: "/api/placeholder/40/40",
      initials: "AR",
      reportingManager: "Bhaskar Ghosh",
      status: "accepted",
      rating: 0,
    },
    {
      id: 5,
      name: "Bholanath Pal",
      position: "Office Boy",
      branch: "Head office",
      doj: "Feb 14, 2022",
      authority: 3,
      avatar: null,
      initials: "BP",
      reportingManager: "Digambar Khuntia",
      status: "accepted",
      rating: 0,
    },
    {
      id: 6,
      name: "Amar Prasad Sahoo",
      position: "HR manager",
      branch: "Paradip",
      doj: "Dec 01, 2018",
      authority: 2,
      avatar: "/api/placeholder/40/40",
      initials: "APS",
      reportingManager: "Amulya Kumar Kar",
      status: "accepted",
      rating: 3.0,
    },
    {
      id: 7,
      name: "Amlan Mallick",
      position: "Branch Manager",
      branch: "New Delhi",
      doj: "Oct 01, 2018",
      authority: 2,
      avatar: "/api/placeholder/40/40",
      initials: "AM",
      reportingManager: "Bhaskar Sir",
      status: "accepted",
      rating: 4.4,
      teamMembers: [
        { initials: "AK", avatar: "/api/placeholder/40/40" },
        { initials: "SK", avatar: "/api/placeholder/40/40" },
        { initials: "RK", avatar: "/api/placeholder/40/40" },
        { initials: "RS", avatar: "/api/placeholder/40/40" },
      ],
      totalTeamMembers: 6,
      detailedTeamMembers: [
        {
          id: 101,
          name: "Sunil Kumar",
          position: "Assistant Manager",
          branch: "New Delhi",
          doj: "Jan 10, 2020",
          authority: 3,
          avatar: "/api/placeholder/40/40",
          initials: "SK",
          reportingManager: "Amlan Mallick",
          status: "accepted",
          rating: 0,
        },
        {
          id: 102,
          name: "Rajesh Kumar",
          position: "Executive",
          branch: "New Delhi",
          doj: "Mar 05, 2021",
          authority: 3,
          avatar: "/api/placeholder/40/40",
          initials: "RK",
          reportingManager: "Amlan Mallick",
          status: "accepted",
          rating: 0,
        },
        {
          id: 103,
          name: "Ritesh Kumar Singh",
          position: "Senior Executive",
          branch: "New Delhi",
          doj: "Jul 12, 2020",
          authority: 3,
          avatar: "/api/placeholder/40/40",
          initials: "RS",
          reportingManager: "Amlan Mallick",
          status: "accepted",
          rating: 0,
        },
        {
          id: 104,
          name: "Manoj Kumar",
          position: "Junior Executive",
          branch: "New Delhi",
          doj: "Nov 20, 2021",
          authority: 3,
          avatar: "/api/placeholder/40/40",
          initials: "MK",
          reportingManager: "Amlan Mallick",
          status: "accepted",
          rating: 0,
        },
        {
          id: 105,
          name: "RAHUL KUMAR",
          position: "Trainee",
          branch: "New Delhi",
          doj: "Feb 01, 2022",
          authority: 2,
          avatar: "/api/placeholder/40/40",
          initials: "RK",
          reportingManager: "Amlan Mallick",
          status: "accepted",
          rating: 0,
        },
        {
          id: 106,
          name: "Rakesh Shankar Jadhav",
          position: "Supervisor",
          branch: "New Delhi",
          doj: "Sep 15, 2019",
          authority: 3,
          avatar: "/api/placeholder/40/40",
          initials: "RSJ",
          reportingManager: "Amlan Mallick",
          status: "accepted",
          rating: 0,
        },
      ],
    },
  ];

  // Mock branch data
  const branchData = [
    {
      id: "all",
      name: "All Branches",
      description: "Manage/View all the branches",
      address: "",
    },
    {
      id: "head-office",
      name: "Head office",
      description: "",
      address:
        "104, 3rd Floor , Shyama Prasad Mukherjee Road, Hazra, Kalighat, Kalighat, Kolkata, West Bengal 700026, India",
    },
    {
      id: "haldia",
      name: "Haldia",
      description: "",
      address:
        "33GG+34V, Sukanta Nagar, WARD NO:15, Haldia, West Bengal 721657, India",
    },
    {
      id: "ahmedabad",
      name: "Ahmedabad office",
      description: "",
      address: "C/142, Vishwas City 1, Sola, Ahmedabad, Gujarat 380061, India",
    },
    {
      id: "paradip",
      name: "Paradip",
      description: "",
      address: "7J9X+5GG, Paradeep, Odisha 754142, India",
    },
    {
      id: "new-delhi",
      name: "New Delhi",
      description: "",
      address:
        "New Delhi,405, District Centre, Janakpuri, New Delhi, Delhi, 110058, India",
    },
  ];

  const handleCardClick = (card: { title: string; id: string }) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const getBranchName = (branchId: string) => {
    const branch = branchData.find((b) => b.id === branchId);
    return branch ? branch.name : "All Branches";
  };

  // Filter and sort employees
  const filteredEmployees = useMemo(() => {
    let filtered = employeeData.filter((emp) => {
      // Filter by status
      if (emp.status !== selectedStatus) return false;

      // Filter by branch
      if (
        selectedEmployeeBranch !== "all" &&
        emp.branch.toLowerCase() !==
          getBranchName(selectedEmployeeBranch).toLowerCase()
      )
        return false;

      // Filter by search query
      if (
        searchQuery &&
        !emp.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;

      return true;
    });

    // Sort employees
    if (sortBy === "alphabetically") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "doj") {
      filtered.sort(
        (a, b) => new Date(a.doj).getTime() - new Date(b.doj).getTime(),
      );
    } else if (sortBy === "authority") {
      filtered.sort((a, b) => a.authority - b.authority);
    }

    return filtered;
  }, [
    employeeData,
    selectedStatus,
    selectedEmployeeBranch,
    searchQuery,
    sortBy,
  ]);

  // Get counts for status tabs
  const statusCounts = useMemo(() => {
    const counts = { accepted: 0, pending: 0, exit: 0 };
    employeeData.forEach((emp) => {
      if (counts.hasOwnProperty(emp.status)) {
        counts[emp.status as keyof typeof counts]++;
      }
    });
    return counts;
  }, [employeeData]);

  // Filter and group announcements
  const groupedAnnouncements = useMemo(() => {
    const filtered = announcementData.filter((announcement) => {
      if (!announcementSearch) return true;

      return (
        announcement.title
          .toLowerCase()
          .includes(announcementSearch.toLowerCase()) ||
        announcement.description
          .toLowerCase()
          .includes(announcementSearch.toLowerCase()) ||
        announcement.branch
          .toLowerCase()
          .includes(announcementSearch.toLowerCase())
      );
    });

    // Group by month and year
    const grouped: Record<string, typeof filtered> = {};

    filtered.forEach((announcement) => {
      const [day, month, year] = announcement.date.split("-");
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthKey = `${monthNames[parseInt(month) - 1]} ${year}`;

      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(announcement);
    });

    // Sort each group by date (newest first)
    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => {
        const dateA = new Date(a.date.split("-").reverse().join("-"));
        const dateB = new Date(b.date.split("-").reverse().join("-"));
        return dateB.getTime() - dateA.getTime();
      });
    });

    return grouped;
  }, [announcementData, announcementSearch]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  // Get leave data for selected date
  const getLeaveDataForDate = (date: number) => {
    const leaveData: Record<number, any[]> = {
      18: [
        {
          id: 1,
          employee: "SAMIR PANDA",
          company: "Liberty Highrise Pvt Ltd",
          avatar: "SM",
          leaveType: "Sick Leave",
          status: "Approved",
          statusColor: "green",
          duration: "2 days from Jun 18 to Jun 19",
          reportingManager: "Bhaskar Sir",
          date: "17 Jun 2025, 10:46 PM",
          profileImage:
            "https://cdn.builder.io/api/v1/image/assets%2F4151f6d04f9e4b7ea192f924bc09c466%2Fc6eefb5de19543c18843527f845b0a2b?format=webp&width=800",
        },
      ],
      28: [
        {
          id: 1,
          employee: "SMITA CHAKRABORTY",
          company: "Liberty Highrise Pvt Ltd",
          avatar: "SC",
          leaveType: "Sick Leave",
          status: "Rejected",
          statusColor: "red",
          duration: "1 day Jun 28",
          reportingManager: "Debashis Debnath",
          date: "28 Jun 2025, 08:52 AM",
          profileImage:
            "https://cdn.builder.io/api/v1/image/assets%2F4151f6d04f9e4b7ea192f924bc09c466%2Fc6eefb5de19543c18843527f845b0a2b?format=webp&width=800",
        },
        {
          id: 2,
          employee: "SAMIR PANDA",
          company: "Liberty Highrise Pvt Ltd",
          avatar: "SP",
          leaveType: "Other Leave",
          status: "Approved",
          statusColor: "green",
          duration: "1 day Jun 28",
          reportingManager: "Bhaskar Sir",
          date: "27 Jun 2025, 09:50 PM",
          profileImage:
            "https://cdn.builder.io/api/v1/image/assets%2F4151f6d04f9e4b7ea192f924bc09c466%2F729d2c034fdc4d9c8f13ad645dea0b67?format=webp&width=800",
        },
        {
          id: 3,
          employee: "AmarPrasad",
          company: "Liberty Highrise Pvt Ltd",
          avatar: "AP",
          leaveType: "Other Leave",
          status: "Rejected",
          statusColor: "red",
          duration: "0.5 day Jun 28 - First Half",
          reportingManager: "Amulya Kumar Kar",
          date: "27 Jun 2025, 07:00 PM",
          profileImage:
            "https://cdn.builder.io/api/v1/image/assets%2F4151f6d04f9e4b7ea192f924bc09c466%2F54d8c9e3a68a4573be08e8e04fd48e96?format=webp&width=800",
        },
        {
          id: 4,
          employee: "Rahul Kumar",
          company: "Liberty Highrise Pvt Ltd",
          avatar: "RK",
          leaveType: "Other Leave",
          status: "Approved",
          statusColor: "green",
          duration: "1 day Jun 28",
          reportingManager: "Amlan Malick",
          date: "27 Jun 2025, 06:32 PM",
          profileImage:
            "https://cdn.builder.io/api/v1/image/assets%2F4151f6d04f9e4b7ea192f924bc09c466%2F063515019b3a4d4cac9d87eb6777a45e?format=webp&width=800",
        },
        {
          id: 5,
          employee: "Shraban Kumar Mishra",
          company: "Liberty Highrise Pvt Ltd",
          avatar: "SM",
          leaveType: "Earned Leave",
          status: "Approved",
          statusColor: "green",
          duration: "1.5 days from Jun 27 to Jun 28 - First Half",
          reportingManager: "Amulya Kumar Kar",
          date: "26 Jun 2025, 11:50 AM",
          profileImage:
            "https://cdn.builder.io/api/v1/image/assets%2F4151f6d04f9e4b7ea192f924bc09c466%2F96367df235854d9196efd6d9d7f9fec0?format=webp&width=800",
        },
        {
          id: 6,
          employee: "Sambhunath ghosh",
          company: "Liberty Highrise Pvt Ltd",
          avatar: "SG",
          leaveType: "Other Leave",
          status: "Approved",
          statusColor: "green",
          duration: "2 days from Jun 27 to Jun 28",
          reportingManager: "Debashis Debnath",
          date: "26 Jun 2025, 11:50 AM",
          profileImage:
            "https://cdn.builder.io/api/v1/image/assets%2F4151f6d04f9e4b7ea192f924bc09c466%2Fda09e85359e2419d99a6282d61cbeea0?format=webp&width=800",
        },
        {
          id: 7,
          employee: "Suresh",
          company: "Liberty Highrise Pvt Ltd",
          avatar: "S",
          leaveType: "Casual Leave",
          status: "Rejected",
          statusColor: "red",
          duration: "3 days from Jun 26 to Jun 28",
          reportingManager: "Digambar Khuntia",
          date: "25 Jun 2025, 10:38 PM",
        },
        {
          id: 8,
          employee: "Madhurika Pal",
          company: "Liberty Highrise Pvt Ltd",
          avatar: "MP",
          leaveType: "Earned Leave",
          status: "Approved",
          statusColor: "green",
          duration: "1 day Jun 28",
          reportingManager: "Debashis Debnath",
          date: "25 Jun 2025, 09:46 PM",
        },
        {
          id: 9,
          employee: "Prabir Khanra",
          company: "Liberty Highrise Pvt Ltd",
          avatar: "PK",
          leaveType: "Earned Leave",
          status: "Approved",
          statusColor: "green",
          duration: "3 days from Jun 26 to Jun 28",
          reportingManager: "Debashis Debnath",
          date: "25 Jun 2025, 05:39 PM",
        },
        {
          id: 10,
          employee: "Nitai Samanta",
          company: "Liberty Highrise Pvt Ltd",
          avatar: "NS",
          leaveType: "Casual Leave",
          status: "Approved",
          statusColor: "green",
          duration: "2 days from Jun 27 to Jun 28",
          reportingManager: "Amulya Kumar Kar",
          date: "25 Jun 2025, 04:22 PM",
        },
        {
          id: 11,
          employee: "Amulya Kumar Kar",
          company: "Liberty Highrise Pvt Ltd",
          avatar: "AK",
          leaveType: "Earned Leave",
          status: "Approved",
          statusColor: "green",
          duration: "2 days from Jun 27 to Jun 28",
          reportingManager: "Bhaskar Sir",
          date: "23 Jun 2025, 08:23 PM",
        },
      ],
      14: [
        {
          id: 1,
          employee: "MARY WILSON",
          company: "Liberty Highrise Pvt Ltd",
          avatar: "MW",
          leaveType: "Casual Leave",
          status: "Denied",
          statusColor: "red",
          duration: "Full Day",
        },
      ],
    };
    return leaveData[date] || [];
  };

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
      notificationCount: 18,
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
      notificationCount: 5,
    },
    {
      icon: <img src="/Documents-icon.png" alt="Documents" />,
      title: "Documents",
      id: "documents",
    },
    {
      icon: <img src="/pendingapproval-icon.png" alt="Pending Approval" />,
      title: "Pending Approval",
      id: "pending-approval",
      notificationCount: 3,
    },
    {
      icon: <img src="/reports-icon.png" alt="Reports" />,
      title: "Reports",
      id: "reports",
    },
  ];

  return (
    <div className={cn("w-full p-3 sm:p-4 lg:p-6 pt-0 font-inter")}>
      {/* Page Area */}
      <div
        className={cn(
          "flex w-full flex-col items-start gap-4 sm:gap-5 lg:gap-6",
        )}
      >
        {/* Quick Action Cards Grid - Fewer cards */}
        <div className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 lg:gap-4 w-full">
            {cardData.map((card, index) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={cn(
                  "flex w-full h-[100px]",
                  "px-2 py-3 justify-center items-center flex-shrink-0",
                  "rounded-[8px] sm:rounded-[10px] border-b-[4px] sm:border-b-[6px] border-[#4766E5] bg-white",
                  "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
                  "cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-md",
                )}
              >
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <div className="flex items-center justify-center h-[40px] mb-1 relative">
                    <img
                      src={card.icon.props.src}
                      alt={card.icon.props.alt}
                      className="w-[32px] h-[32px] object-contain"
                    />
                    {card.notificationCount && (
                      <div className="absolute -top-1 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {card.notificationCount}
                      </div>
                    )}
                  </div>
                  <div className="flex items-start justify-center h-[32px] text-center">
                    <h3 className="text-[#283C50] font-inter font-bold text-sm leading-tight max-w-full">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employee Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <div className="min-h-[400px]">
            <EmployeeAttendanceCard />
          </div>
          <div className="min-h-[600px]">
            <EmployeeLocationTimelineCard />
          </div>
        </div>

        {/* Holidays and Leave Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <div className="min-h-[600px]">
            <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Holiday list
                  </h2>
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-1 text-primary-500 font-medium"
                    >
                      <span>{selectedBranchFilter}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-80 h-96 bg-white rounded-lg shadow-lg border border-gray-200 z-10 overflow-y-auto">
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Branches
                          </h3>
                          <div className="space-y-3">
                            <div
                              onClick={() => {
                                setSelectedBranchFilter("All Branches");
                                setIsDropdownOpen(false);
                              }}
                              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                  <circle cx="12" cy="10" r="3" />
                                </svg>
                                <div>
                                  <div className="font-semibold text-gray-800">
                                    All Branches
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Manage/View all the branches
                                  </div>
                                </div>
                              </div>
                              {selectedBranchFilter === "All Branches" && (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  className="text-primary-500"
                                >
                                  <path d="M20 6 9 17l-5-5" />
                                </svg>
                              )}
                            </div>
                            {[
                              {
                                name: "Head office",
                                address:
                                  "104, 3rd Floor, Shyama Prasad Mukherjee Road, Hazra, Kalighat, Kalighat, Kolkata, West Bengal 700026, India",
                              },
                              {
                                name: "Haldia",
                                address:
                                  "336G+34V, Sukanta Nagar, WARD NO:15, Haldia, West Bengal 721667, India",
                              },
                              {
                                name: "Ahmedabad office",
                                address:
                                  "C/142, Vishwas City 1, Sola, Ahmedabad, Gujarat 380061, India",
                              },
                              {
                                name: "Paradip",
                                address:
                                  "7J9X+5GG, Paradeep, Odisha 754142, India",
                              },
                              {
                                name: "New Delhi",
                                address:
                                  "New Delhi,405, District Centre, Janakpuri, New Delhi, Delhi, 110058, India",
                              },
                            ].map((branch, index) => (
                              <div
                                key={index}
                                onClick={() => {
                                  setSelectedBranchFilter(branch.name);
                                  setIsDropdownOpen(false);
                                }}
                                className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                              >
                                <div className="flex items-start gap-3">
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="mt-1"
                                  >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                  </svg>
                                  <div>
                                    <div className="font-semibold text-gray-800">
                                      {branch.name}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">
                                      {branch.address}
                                    </div>
                                  </div>
                                </div>
                                {selectedBranchFilter === branch.name && (
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-primary-500 mt-1"
                                  >
                                    <path d="M20 6 9 17l-5-5" />
                                  </svg>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsHolidayModalOpen(true)}
                  className="bg-black text-white rounded-lg p-2 hover:bg-gray-800 transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
              {/* Summary Stats */}
              <div className="p-4 border-b border-gray-200">
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center bg-white rounded-lg p-3 shadow-md border border-gray-100">
                    <div className="text-2xl font-bold text-gray-800">37</div>
                    <div className="text-xs text-gray-600 font-medium">
                      TOTAL
                    </div>
                    <div className="h-1 bg-primary-500 rounded-full mt-1"></div>
                  </div>
                  <div className="text-center bg-white rounded-lg p-3 shadow-md border border-gray-100">
                    <div className="text-2xl font-bold text-gray-800">16</div>
                    <div className="text-xs text-gray-600 font-medium">
                      PUBLIC
                    </div>
                    <div className="h-1 bg-primary-500 rounded-full mt-1"></div>
                  </div>
                  <div className="text-center bg-white rounded-lg p-3 shadow-md border border-gray-100">
                    <div className="text-2xl font-bold text-gray-800">1</div>
                    <div className="text-xs text-gray-600 font-medium">
                      COMPANY
                    </div>
                    <div className="h-1 bg-primary-500 rounded-full mt-1"></div>
                  </div>
                  <div className="text-center bg-white rounded-lg p-3 shadow-md border border-gray-100">
                    <div className="text-2xl font-bold text-gray-800">10</div>
                    <div className="text-xs text-gray-600 font-medium">
                      REGIONAL
                    </div>
                    <div className="h-1 bg-primary-500 rounded-full mt-1"></div>
                  </div>
                </div>
              </div>
              {/* Holiday List */}
              <div className="h-[500px] overflow-y-auto">
                {[
                  {
                    date: "Wed 01",
                    month: "JAN 25",
                    name: "ENGLISH NEW YEAR",
                    location: "Haldia",
                    type: "Company",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Tue 14",
                    month: "JAN 25",
                    name: "Uttrayan",
                    location: "Ahmedabad office",
                    type: "Regional",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Wed 15",
                    month: "JAN 25",
                    name: "Vasi Uttrayan",
                    location: "Ahmedabad office",
                    type: "Regional",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Sun 26",
                    month: "JAN 25",
                    name: "REPUBLIC DAY",
                    location: "Haldia",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Mon 03",
                    month: "FEB 25",
                    name: "SARASWATI PUJA",
                    location: "Head office",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Wed 05",
                    month: "FEB 25",
                    name: "Delhi Assembly Election",
                    location: "New Delhi",
                    type: "Regional",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Wed 26",
                    month: "FEB 25",
                    name: "MAHASHIVRATRI",
                    location: "New Delhi",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Fri 14",
                    month: "MAR 25",
                    name: "Dhuleti",
                    location: "Ahmedabad office",
                    type: "Regional",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Fri 14",
                    month: "MAR 25",
                    name: "DOLYATRA / HOLI",
                    location: "Head office",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Sat 15",
                    month: "MAR 25",
                    name: "Dolyatra/Holi",
                    location: "Paradip",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Mon 31",
                    month: "MAR 25",
                    name: "ID UL FITAR",
                    location: "Head office",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Thu 10",
                    month: "APR 25",
                    name: "MAHAVIR JAYANTI",
                    location: "New Delhi",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Tue 15",
                    month: "APR 25",
                    name: "BENGALI NEW YEARS DAY",
                    location: "Haldia",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Fri 18",
                    month: "APR 25",
                    name: "GOODFRIDAY",
                    location: "Head office",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Mon 12",
                    month: "MAY 25",
                    name: "BUDDHA PURNIMA",
                    location: "New Delhi",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Sat 07",
                    month: "JUN 25",
                    name: "BAKRID",
                    location: "New Delhi",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Sun 15",
                    month: "JUN 25",
                    name: "RAJA SANKRANTI",
                    location: "Paradip",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Fri 27",
                    month: "JUN 25",
                    name: "RATH YATRA",
                    location: "Paradip",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Sun 06",
                    month: "AUG 25",
                    name: "MUHARRAM",
                    location: "Head office",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Tue 30",
                    month: "SEP 25",
                    name: "MAHA ASTAMI",
                    location: "Paradip",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Wed 01",
                    month: "OCT 25",
                    name: "MAHA NABAMI",
                    location: "Head office",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Thu 02",
                    month: "OCT 25",
                    name: "Dussehra",
                    location: "Ahmedabad office",
                    type: "Regional",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Thu 02",
                    month: "OCT 25",
                    name: "DUSSHERA / GANDHI BIRTHDAY",
                    location: "Head office",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Mon 06",
                    month: "OCT 25",
                    name: "LAXMI PUJA",
                    location: "Haldia",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Mon 20",
                    month: "OCT 25",
                    name: "Diwali",
                    location: "Ahmedabad office",
                    type: "Regional",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Mon 20",
                    month: "OCT 25",
                    name: "KALI PUJA",
                    location: "Paradip",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Tue 21",
                    month: "OCT 25",
                    name: "Gujarati New Year",
                    location: "Ahmedabad office",
                    type: "Regional",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Tue 21",
                    month: "OCT 25",
                    name: "KALI PUJA/DIWALI",
                    location: "New Delhi",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Wed 22",
                    month: "OCT 25",
                    name: "Gujarati New Year",
                    location: "Ahmedabad office",
                    type: "Regional",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Thu 23",
                    month: "OCT 25",
                    name: "Bhai Bij",
                    location: "Ahmedabad office",
                    type: "Regional",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Wed 05",
                    month: "NOV 25",
                    name: "GURU NANAK BIRTHDAY",
                    location: "Haldia",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Thu 25",
                    month: "DEC 25",
                    name: "X MAS DAY",
                    location: "Haldia",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                ]
                  .filter((holiday) => {
                    if (selectedBranchFilter === "All Branches") return true;
                    return holiday.location === selectedBranchFilter;
                  })
                  .map((holiday, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 mx-3 my-2 bg-white rounded-lg shadow-md border border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center min-w-[50px]">
                          <div className="text-lg font-bold text-gray-800">
                            {holiday.date.split(" ")[1]}
                          </div>
                          <div className="text-xs text-gray-600">
                            {holiday.date.split(" ")[0]}
                          </div>
                          <div className="text-xs text-gray-500">
                            {holiday.month}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 text-sm">
                            {holiday.name}
                          </div>
                          <div className="text-xs text-gray-600">
                            {holiday.location}
                          </div>
                          <div className="h-0.5 bg-primary-500 rounded-full mt-1 w-full"></div>
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded text-white text-xs font-medium ${holiday.typeColor}`}
                      >
                        {holiday.type}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="min-h-[600px]">
            <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Leave</h2>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setLeaveView("day")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      leaveView === "day"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Day
                  </button>
                  <button
                    onClick={() => setLeaveView("list")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      leaveView === "list"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>

              {/* Day View - Calendar */}
              {leaveView === "day" && (
                <div className="p-4">
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-3">
                    <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-800">
                        June
                      </div>
                      <div className="text-red-500 font-semibold text-sm">
                        2025
                      </div>
                    </div>
                    <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>

                  {/* Selected Date */}
                  <div className="text-center mb-3">
                    <div className="text-blue-500 font-semibold text-sm">
                      {selectedLeaveDate} Jun 2025
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-0.5 mb-3">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-center text-xs font-medium text-gray-600 py-1.5"
                        >
                          {day}
                        </div>
                      ),
                    )}
                    {/* Previous month days */}
                    {[25, 26, 27, 28, 29, 30, 31].map((date) => (
                      <div
                        key={`prev-${date}`}
                        className="text-center p-1.5 text-gray-400 relative text-sm"
                      >
                        {date}
                        <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-0.5"></div>
                      </div>
                    ))}
                    {/* Current month days */}
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((date) => (
                      <div
                        key={date}
                        onClick={() => setSelectedLeaveDate(date)}
                        className="text-center p-1.5 relative cursor-pointer hover:bg-gray-50 rounded text-sm"
                      >
                        <div
                          className={`inline-block px-2 py-1 rounded-lg ${
                            date === selectedLeaveDate
                              ? "bg-blue-500 text-white"
                              : ""
                          } ${[1, 7, 14, 15, 21, 27, 28].includes(date) ? "text-red-500" : ""}`}
                        >
                          {date}
                        </div>
                        {[
                          1, 2, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
                          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                        ].includes(date) && (
                          <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                    ))}
                    {/* Next month days */}
                    {[1, 2, 3, 4, 5].map((date) => (
                      <div
                        key={`next-${date}`}
                        className="text-center p-1.5 text-gray-400 relative text-sm"
                      >
                        {date}
                        <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-0.5"></div>
                      </div>
                    ))}
                  </div>

                  {/* Leave Details for Selected Date */}
                  <div className="border-t border-gray-200 pt-2">
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {getLeaveDataForDate(selectedLeaveDate).length > 0 ? (
                        getLeaveDataForDate(selectedLeaveDate).map(
                          (leave, index) => (
                            <div
                              key={leave.id}
                              className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm mb-4"
                            >
                              {/* Header with profile and status */}
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                                    <svg
                                      width="48"
                                      height="48"
                                      viewBox="0 0 48 48"
                                      className="rounded-full"
                                    >
                                      <circle
                                        cx="24"
                                        cy="24"
                                        r="24"
                                        fill="#000000"
                                      />
                                      <text
                                        x="24"
                                        y="24"
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        fill="white"
                                        fontSize="16"
                                        fontWeight="600"
                                        fontFamily="Inter, sans-serif"
                                      >
                                        {leave.avatar}
                                      </text>
                                    </svg>
                                  </div>
                                  <div>
                                    <div className="font-bold text-gray-900 text-lg">
                                      {leave.employee}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {leave.company}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <span
                                    className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                                      leave.statusColor === "green"
                                        ? "bg-green-500 text-white"
                                        : "bg-red-500 text-white"
                                    }`}
                                  >
                                    {leave.status}
                                  </span>
                                </div>
                              </div>

                              {/* Leave Type */}
                              <div className="mb-4">
                                <h3 className="font-bold text-gray-900 text-xl mb-3">
                                  {leave.leaveType}
                                </h3>

                                {/* Duration with calendar icon */}
                                <div className="flex items-center gap-2 text-gray-700 mb-3">
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-red-500"
                                  >
                                    <rect
                                      x="3"
                                      y="4"
                                      width="18"
                                      height="18"
                                      rx="2"
                                      ry="2"
                                    />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                  </svg>
                                  <span className="font-bold text-gray-900 text-base">
                                    {leave.duration}
                                  </span>
                                </div>

                                {/* Reporting Manager */}
                                <div className="text-sm text-gray-700 mb-3">
                                  Reporting Manager -{" "}
                                  <span className="font-bold text-gray-900">
                                    {leave.reportingManager}
                                  </span>
                                </div>
                              </div>

                              {/* Timestamp */}
                              <div className="text-right">
                                <div className="text-xs text-gray-500">
                                  {leave.date}
                                </div>
                              </div>
                            </div>
                          ),
                        )
                      ) : (
                        <div className="text-center text-gray-500 text-sm py-8">
                          No leave requests for this date
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* List View */}
              {leaveView === "list" && (
                <div className="p-4">
                  {/* Status Filters */}
                  <div className="flex gap-6 mb-4">
                    <button
                      onClick={() => setLeaveFilter("pending")}
                      className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                        leaveFilter === "pending"
                          ? "border-gray-800 text-gray-800"
                          : "border-transparent text-gray-600"
                      }`}
                    >
                      <span className="font-medium">PENDING</span>
                      <span className="bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        1
                      </span>
                    </button>
                    <button
                      onClick={() => setLeaveFilter("approved")}
                      className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                        leaveFilter === "approved"
                          ? "border-gray-800 text-gray-800"
                          : "border-transparent text-gray-600"
                      }`}
                    >
                      <span className="font-medium">APPROVED</span>
                      <span className="bg-black text-white rounded-full w-6 h-5 text-xs flex items-center justify-center">
                        40
                      </span>
                    </button>
                    <button
                      onClick={() => setLeaveFilter("denied")}
                      className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                        leaveFilter === "denied"
                          ? "border-gray-800 text-gray-800"
                          : "border-transparent text-gray-600"
                      }`}
                    >
                      <span className="font-medium">DENIED</span>
                      <span className="bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        6
                      </span>
                    </button>
                  </div>

                  {/* Leave Approval Section */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <div className="text-blue-600 font-medium text-sm">
                      LEAVE APPROVAL
                    </div>
                  </div>

                  {/* Leave List */}
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {leaveFilter === "pending" && (
                      <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-semibold">
                              UD
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800">
                              Uttam Dey
                            </div>
                            <div className="text-sm font-semibold">
                              1 day Jun 30
                            </div>
                            <div className="text-sm text-gray-600">Haldia</div>
                            <div className="text-sm text-gray-600 font-medium">
                              CASUAL LEAVE (CL)
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                              30 June, 2025 5:56 AM
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {leaveFilter === "approved" && (
                      <>
                        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-sm font-semibold">
                                SC
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800">
                                SMITA CHAKRABORTY
                              </div>
                              <div className="text-sm font-semibold">
                                1 day Jun 28
                              </div>
                              <div className="text-sm text-gray-600">
                                Head office
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                SICK LEAVE (SL)
                              </div>
                              <div className="text-xs text-gray-500 mt-2">
                                28 June, 2025 10:48 AM
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-sm font-semibold">
                                SM
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800">
                                SAMIR PANDA
                              </div>
                              <div className="text-sm font-semibold">
                                1 day Jun 28
                              </div>
                              <div className="text-sm text-gray-600">
                                Head office
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                OTHER LEAVE (OL)
                              </div>
                              <div className="text-xs text-gray-500 mt-2">
                                27 June, 2025 9:50 PM
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-sm font-semibold">
                                RK
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800">
                                Rahul Kumar
                              </div>
                              <div className="text-sm font-semibold">
                                1 day Jun 28
                              </div>
                              <div className="text-sm text-gray-600">
                                New Delhi
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                OTHER LEAVE (OL)
                              </div>
                              <div className="text-xs text-gray-500 mt-2">
                                27 June, 2025 6:32 PM
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-sm font-semibold">
                                MK
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800">
                                Manoj Kumar
                              </div>
                              <div className="text-sm font-semibold">
                                1 day Jun 27
                              </div>
                              <div className="text-sm text-gray-600">
                                New Delhi
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                CASUAL LEAVE (CL)
                              </div>
                              <div className="text-xs text-gray-500 mt-2">
                                27 June, 2025 6:37 AM
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {leaveFilter === "denied" && (
                      <>
                        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-sm font-semibold">
                                SM
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div className="font-semibold text-gray-800">
                                  Smurti
                                </div>
                                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                  Rejected
                                </span>
                              </div>
                              <div className="text-sm font-semibold">
                                2 days from May 16 to May 17
                              </div>
                              <div className="text-sm text-gray-600">
                                Liberty Highrise Pvt Ltd
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                SICK LEAVE
                              </div>
                              <div className="text-red-500 font-medium text-sm">
                                ABSENT
                              </div>
                              <div className="text-sm text-gray-600 mt-2">
                                Reporting Manager -{" "}
                                <span className="font-medium">
                                  Digambar Khuntia
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                16 May 2025, 09:47 AM
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-sm font-semibold">
                                TD
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div className="font-semibold text-gray-800">
                                  Tusar Das
                                </div>
                                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                  Rejected
                                </span>
                              </div>
                              <div className="text-sm font-semibold">
                                4 days from May 15 to May 18
                              </div>
                              <div className="text-sm text-gray-600">
                                Liberty Highrise Pvt Ltd
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                CASUAL LEAVE
                              </div>
                              <div className="text-red-500 font-medium text-sm">
                                ABSENT
                              </div>
                              <div className="text-sm text-gray-600 mt-2">
                                Reporting Manager -{" "}
                                <span className="font-medium">
                                  Digambar Khuntia
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                15 May 2025, 09:50 AM
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-sm font-semibold">
                                RJ
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div className="font-semibold text-gray-800">
                                  Rajesh Joshi
                                </div>
                                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                  Rejected
                                </span>
                              </div>
                              <div className="text-sm font-semibold">
                                3 days from May 12 to May 14
                              </div>
                              <div className="text-sm text-gray-600">
                                Haldia
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                SICK LEAVE (SL)
                              </div>
                              <div className="text-red-500 font-medium text-sm">
                                ABSENT
                              </div>
                              <div className="text-sm text-gray-600 mt-2">
                                Reporting Manager -{" "}
                                <span className="font-medium">Amit Sharma</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                12 May 2025, 08:15 AM
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-sm font-semibold">
                                AP
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div className="font-semibold text-gray-800">
                                  AmarPrasad
                                </div>
                                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                  Rejected
                                </span>
                              </div>
                              <div className="text-sm font-semibold">
                                1 day May 10
                              </div>
                              <div className="text-sm text-gray-600">
                                New Delhi
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                CASUAL LEAVE (CL)
                              </div>
                              <div className="text-red-500 font-medium text-sm">
                                ABSENT
                              </div>
                              <div className="text-sm text-gray-600 mt-2">
                                Reporting Manager -{" "}
                                <span className="font-medium">Priya Singh</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                10 May 2025, 07:30 AM
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-sm font-semibold">
                                NK
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div className="font-semibold text-gray-800">
                                  Neha Kapoor
                                </div>
                                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                  Rejected
                                </span>
                              </div>
                              <div className="text-sm font-semibold">
                                2 days from May 8 to May 9
                              </div>
                              <div className="text-sm text-gray-600">
                                Paradip
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                OTHER LEAVE (OL)
                              </div>
                              <div className="text-red-500 font-medium text-sm">
                                ABSENT
                              </div>
                              <div className="text-sm text-gray-600 mt-2">
                                Reporting Manager -{" "}
                                <span className="font-medium">
                                  Vikash Kumar
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                08 May 2025, 06:45 AM
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-sm font-semibold">
                                AS
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div className="font-semibold text-gray-800">
                                  Anil Sinha
                                </div>
                                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                  Rejected
                                </span>
                              </div>
                              <div className="text-sm font-semibold">
                                5 days from May 5 to May 9
                              </div>
                              <div className="text-sm text-gray-600">
                                Ahmedabad office
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                ANNUAL LEAVE (AL)
                              </div>
                              <div className="text-red-500 font-medium text-sm">
                                ABSENT
                              </div>
                              <div className="text-sm text-gray-600 mt-2">
                                Reporting Manager -{" "}
                                <span className="font-medium">Ravi Patel</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                05 May 2025, 05:20 AM
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Holiday Modal */}
        {isHolidayModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-lg mx-4 max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  Add Holiday
                </h2>
                <button
                  onClick={() => setIsHolidayModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 p-6 space-y-6">
                {/* Branch Dropdown */}
                <div className="relative">
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full p-4 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 appearance-none"
                  >
                    <option value="Head office">Head office</option>
                    <option value="Haldia">Haldia</option>
                    <option value="Ahmedabad office">Ahmedabad office</option>
                    <option value="Paradip">Paradip</option>
                    <option value="New Delhi">New Delhi</option>
                  </select>
                  <svg
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={holidayName}
                    onChange={(e) => setHolidayName(e.target.value)}
                    className="w-full p-4 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-600"
                  />
                </div>

                {/* Date Picker */}
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-4 bg-gray-100 border border-gray-200 rounded-lg text-gray-800"
                    placeholder="Select Date"
                  />
                  <svg
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>

                {/* Holiday Type Buttons */}
                <div className="flex gap-3">
                  {["Company", "Public", "Regional"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setHolidayType(type)}
                      className={`flex-1 py-3 px-4 rounded-full font-medium transition-colors ${
                        holidayType === type
                          ? "bg-black text-white"
                          : "bg-white text-gray-700 border border-gray-300"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button at Bottom */}
              <div className="p-6 border-t border-gray-200">
                <button className="w-full bg-primary-500 text-white py-4 rounded-lg font-medium text-lg hover:bg-primary-600 transition-colors">
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader className="flex flex-row items-center justify-between px-4 pt-1 pb-2 border-b">
            <DialogTitle className="text-xl font-semibold text-[#283C50]">
              {selectedCard?.title || ""}
            </DialogTitle>
            <div className="flex items-center gap-4">
              {selectedCard?.id === "announce" && (
                <Popover
                  open={showAnnouncementDropdown}
                  onOpenChange={setShowAnnouncementDropdown}
                >
                  <PopoverTrigger asChild>
                    <button className="flex items-center gap-1 text-blue-500 font-medium text-lg">
                      {announcementFilter}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-48 p-2">
                    <div className="space-y-1">
                      {[
                        "All",
                        "Head office",
                        "Ahmedabad office",
                        "Haldia",
                        "All Branch",
                      ].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => {
                            setAnnouncementFilter(filter);
                            setShowAnnouncementDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${
                            announcementFilter === filter
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-700"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </DialogHeader>

          {/* Modal Content Area */}
          <div className="flex-1 overflow-hidden">
            {selectedCard?.id === "register" ? (
              // Employee Management Interface
              <div className="h-full flex flex-col -mt-px">
                {/* Employee Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b bg-slate-100">
                  <h1 className="text-lg font-semibold text-gray-900">
                    Employee
                  </h1>
                  <Popover
                    open={showSortDropdown}
                    onOpenChange={setShowSortDropdown}
                  >
                    <PopoverTrigger asChild>
                      <button className="p-1">
                        <Settings2 className="w-5 h-5 text-blue-500" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-80 p-0">
                      <div className="bg-blue-50 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Alphabetically
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">A</span>
                            <div className="w-8 h-4 bg-gray-300 rounded-full relative">
                              <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                            </div>
                            <span className="text-sm">Z</span>
                            <ArrowLeft className="w-4 h-4 rotate-90" />
                          </div>
                        </div>

                        <button
                          onClick={() => setSortBy("doj")}
                          className="flex items-center justify-between w-full p-3 bg-white rounded-lg"
                        >
                          <span className="text-sm font-medium">
                            Date Of Joining
                          </span>
                          <Calendar className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() => setSortBy("authority")}
                          className="flex items-center justify-between w-full p-3 bg-white rounded-lg"
                        >
                          <span className="text-sm font-medium">Authority</span>
                          <User className="w-5 h-5" />
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
                    <Input
                      placeholder="Search Employee"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-10 bg-gray-100 border-none placeholder:text-gray-600"
                    />
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Status Tabs */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedStatus("accepted")}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium",
                        selectedStatus === "accepted"
                          ? "bg-white text-gray-900 shadow-sm border"
                          : "bg-gray-100 text-gray-600",
                      )}
                    >
                      ACCEPTED ({statusCounts.accepted})
                    </button>
                    <button
                      onClick={() => setSelectedStatus("pending")}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium",
                        selectedStatus === "pending"
                          ? "bg-white text-gray-900 shadow-sm border"
                          : "bg-gray-100 text-gray-600",
                      )}
                    >
                      PENDING ({statusCounts.pending})
                    </button>
                    <button
                      onClick={() => setSelectedStatus("exit")}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium",
                        selectedStatus === "exit"
                          ? "bg-white text-gray-900 shadow-sm border"
                          : "bg-gray-100 text-gray-600",
                      )}
                    >
                      EXIT ({statusCounts.exit})
                    </button>
                  </div>

                  {/* Branch Selector */}
                  <button
                    onClick={() => setShowBranchSheet(true)}
                    className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
                  >
                    <span className="text-gray-900">
                      {getBranchName(selectedEmployeeBranch)}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-700" />
                  </button>

                  {/* Employee List */}
                  <div className="space-y-4">
                    {filteredEmployees.map((employee) => (
                      <div
                        key={employee.id}
                        className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-black text-white">
                                {employee.initials ||
                                  employee.name
                                    .split(" ")
                                    .map((word) => word[0])
                                    .join("")
                                    .substring(0, 2)
                                    .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900">
                                  {employee.name}
                                </h3>
                                <span className="material-icons-outlined text-red-500 text-base">
                                  privacy_tip
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">
                                {employee.position}{" "}
                                <span className="text-blue-500">
                                  ({employee.branch})
                                </span>
                              </p>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-sm text-gray-600">
                                  DOJ : {employee.doj}
                                </span>
                                <Badge
                                  variant="secondary"
                                  className="bg-gray-100"
                                >
                                  Authority : {employee.authority}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2">
                              <Phone className="w-5 h-5 text-gray-600" />
                            </button>
                            <button className="p-2">
                              <MessageCircle className="w-5 h-5 text-gray-600" />
                            </button>
                            <button className="p-2">
                              <MoreVertical className="w-5 h-5 text-gray-600" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <span className="text-sm text-gray-600">
                            Reporting Manager: {employee.reportingManager}
                          </span>
                          {!employee.teamMembers ||
                          employee.teamMembers.length === 0 ? (
                            <div className="flex items-center gap-1 px-3 py-1 border border-blue-200 rounded-full">
                              <span className="text-blue-500">★</span>
                              <span className="text-sm text-blue-500">
                                {employee.rating} (0)
                              </span>
                            </div>
                          ) : null}
                        </div>

                        {/* Manager for section - only show for employees with team members */}
                        {employee.teamMembers &&
                          employee.teamMembers.length > 0 && (
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-blue-500 font-medium">
                                  Manager for :
                                </span>
                                <div className="flex items-center">
                                  {employee.teamMembers
                                    .slice(0, 4)
                                    .map((member, index) => (
                                      <div
                                        key={index}
                                        className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-sm font-medium text-gray-700 -ml-1 first:ml-0"
                                        style={{
                                          zIndex:
                                            employee.teamMembers.length - index,
                                        }}
                                      >
                                        {member.initials}
                                      </div>
                                    ))}
                                  {employee.totalTeamMembers > 4 && (
                                    <>
                                      <span className="text-sm text-blue-500 font-medium ml-2">
                                        +{employee.totalTeamMembers - 4}
                                      </span>
                                      <button
                                        onClick={() => {
                                          setSelectedManagerTeam(
                                            employee.detailedTeamMembers,
                                          );
                                          setShowTeamMembersPopup(true);
                                        }}
                                        className="ml-1"
                                      >
                                        <svg
                                          className="w-4 h-4 text-blue-500"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                          />
                                        </svg>
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-1 px-3 py-1 border border-blue-200 rounded-full">
                                <span className="text-blue-500">★</span>
                                <span className="text-sm text-blue-500">
                                  {employee.rating} (0)
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                    ))}
                  </div>

                  {/* Add Employee Button */}
                  <button
                    onClick={() => setShowAddEmployee(true)}
                    className="fixed bottom-6 right-6 bg-black text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    Add Employee
                  </button>
                </div>
              </div>
            ) : selectedCard?.id === "announce" ? (
              // Announcement Interface
              <div className="h-full flex flex-col bg-gray-50">
                {/* Search Box */}
                <div className="p-4 bg-white border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search"
                      value={announcementSearch}
                      onChange={(e) => setAnnouncementSearch(e.target.value)}
                      className="pl-12 bg-gray-100 border-none rounded-full text-gray-600 placeholder:text-gray-500"
                    />
                  </div>
                </div>

                {/* Announcements List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {Object.entries(groupedAnnouncements).map(
                    ([monthYear, announcements]) => (
                      <div key={monthYear} className="space-y-4">
                        {/* Month Header */}
                        <h2 className="text-lg font-semibold text-gray-900 sticky top-0 bg-gray-50 py-2">
                          {monthYear}
                        </h2>

                        {/* Announcement Cards */}
                        <div className="space-y-4">
                          {announcements.map((announcement) => (
                            <div
                              key={announcement.id}
                              className="bg-white rounded-lg p-4 shadow-sm"
                            >
                              {/* Branch and Date */}
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-base font-semibold text-gray-900">
                                  {announcement.branch}
                                </h3>
                                <span className="text-sm text-gray-500">
                                  {announcement.date} {announcement.time}
                                </span>
                              </div>

                              {/* Title */}
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                {announcement.title}
                              </h4>

                              {/* Description */}
                              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                                {announcement.description}
                              </p>

                              {/* Blue Underline */}
                              <div className="w-full h-1 bg-blue-500 rounded-full"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  )}

                  {Object.keys(groupedAnnouncements).length === 0 && (
                    <div className="text-center text-gray-500 py-12">
                      <p>No announcements found.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Default placeholder for other modals
              <div className="w-full h-full flex items-center justify-center text-gray-500 p-6">
                <p>Content for {selectedCard?.title} will be added here</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Branch Selection Modal */}
      <Dialog open={showBranchSheet} onOpenChange={setShowBranchSheet}>
        <DialogContent className="max-w-md max-h-[80vh] flex flex-col">
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="text-lg font-semibold text-center">
              Branches
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-4 py-4">
            {branchData.map((branch) => (
              <button
                key={branch.id}
                onClick={() => {
                  setSelectedEmployeeBranch(branch.id);
                  setShowBranchSheet(false);
                }}
                className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">
                        {branch.name}
                      </h3>
                      {selectedEmployeeBranch === branch.id && (
                        <Check className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    {branch.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {branch.description}
                      </p>
                    )}
                    {branch.address && (
                      <p className="text-sm text-gray-500 mt-1">
                        {branch.address}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Employee Modal */}
      <Dialog open={showAddEmployee} onOpenChange={setShowAddEmployee}>
        <DialogContent className="max-w-lg max-h-[90vh] flex flex-col">
          <DialogHeader className="flex flex-row items-center justify-between px-0 pt-0 pb-4 border-b">
            <button onClick={() => setShowAddEmployee(false)}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <DialogTitle className="text-lg font-semibold">
              Add Employee
            </DialogTitle>
            <button className="text-blue-500 font-medium">Submit</button>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-4 py-4">
            <select className="w-full p-4 bg-gray-100 rounded-lg border-none">
              <option>Head office</option>
            </select>

            <button className="w-full p-4 bg-gray-100 rounded-lg border-none text-left flex items-center justify-between">
              <span className="text-gray-600">Select Contact</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <Input placeholder="Name" className="bg-gray-100 border-none" />

            <div className="flex gap-2">
              <select className="p-4 bg-gray-100 rounded-lg border-none">
                <option>IN +91</option>
              </select>
              <Input
                placeholder="Mobile"
                className="flex-1 bg-gray-100 border-none"
              />
            </div>

            <Input placeholder="Email" className="bg-gray-100 border-none" />
            <Input
              placeholder="Employee Code"
              className="bg-gray-100 border-none"
            />

            <div className="relative">
              <Input
                placeholder="Date Of Birth"
                className="bg-gray-100 border-none pr-12"
              />
              <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <Input
              placeholder="Designation"
              className="bg-gray-100 border-none"
            />

            <select className="w-full p-4 bg-gray-100 rounded-lg border-none">
              <option>Role</option>
            </select>

            <p className="text-sm text-gray-600">
              Note: Access rights will be granted base on role of the employee
            </p>

            <select className="w-full p-4 bg-gray-100 rounded-lg border-none">
              <option>Reporting Manager</option>
            </select>

            <p className="text-sm text-gray-600">
              Note: Attendance, approvals request will be send reporting manager
              when it is send directly from company dashboard.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Team Members Popup */}
      <Dialog
        open={showTeamMembersPopup}
        onOpenChange={setShowTeamMembersPopup}
      >
        <DialogContent className="max-w-xs p-0">
          {/* Simple list of team member names */}
          <div className="bg-white rounded-lg overflow-hidden relative">
            {/* Close button */}
            <button
              onClick={() => setShowTeamMembersPopup(false)}
              className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full z-10"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
            {selectedManagerTeam?.map((member, index) => (
              <div
                key={member.id}
                className={`px-4 py-3 text-gray-900 ${
                  index !== selectedManagerTeam.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                {member.name}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
