import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  CheckSquare,
  Calendar,
  AlertTriangle,
  StickyNote,
  MessageSquare,
  Clock,
  Users,
  BarChart3,
  TrendingUp,
  Trophy,
  Star,
  Bell,
  DollarSign,
  Target,
  MapPin,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [punchStatus, setPunchStatus] = useState("NOT PUNCHED IN");

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handlePunchIn = () => {
    setPunchStatus("PUNCHED IN");
  };

  // Quick Overview Cards Data
  const quickOverviewCards = [
    {
      id: "tasks",
      title: "My Tasks at a Glance",
      value: "472",
      subtitle: "Total Pending Tasks",
      icon: CheckSquare,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
      details: [
        { label: "Overdue", value: "23", color: "text-red-500" },
        { label: "Due Today", value: "18", color: "text-orange-500" },
      ],
      progress: 85,
      action: "View All My Tasks",
    },
    {
      id: "meetings",
      title: "Meetings This Week",
      value: "7",
      subtitle: "Scheduled Meetings",
      icon: Calendar,
      color: "bg-green-50",
      iconColor: "text-green-600",
      items: [
        {
          type: "Weekly Team Sync",
          time: "Today at 3:00 PM",
          duration: "5 minutes",
        },
        {
          type: "Client Review Meeting",
          time: "Tomorrow at 10:30 AM",
          duration: "3 minutes",
        },
      ],
      action: "View All Meetings",
    },
    {
      id: "approvals",
      title: "Pending Approvals",
      value: "8",
      subtitle: "Items Awaiting Your Approval",
      icon: AlertTriangle,
      color: "bg-red-50",
      iconColor: "text-red-600",
      items: [
        {
          type: "Leave Request - John Doe",
          status: "Urgent",
          time: "Submitted 2 days ago",
        },
        {
          type: "Expense Report - Marketing",
          status: "Review",
          time: "Submitted 1 day ago",
        },
      ],
      action: "Review Approvals",
    },
    {
      id: "notes",
      title: "Quick Notes",
      icon: StickyNote,
      color: "bg-yellow-50",
      iconColor: "text-yellow-600",
      items: [
        { text: "Follow up on client proposal", time: "Added 3 hours ago" },
        { text: "Review Q4 budget allocation", time: "Added yesterday" },
        { text: "Update team on project timeline", time: "Added 3 days ago" },
      ],
      action: "Add New Note",
    },
  ];

  // Chat Activity Data
  const chatActivities = [
    {
      id: 1,
      name: "Sarah Johnson",
      message: "Can we schedule the meeting for tomorrow?",
      time: "5m ago",
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Project Team Alpha",
      message: "The latest updates have been pushed to the develop...",
      time: "12m ago",
      avatar: "/placeholder.svg",
      isGroup: true,
    },
    {
      id: 3,
      name: "Mike Chen",
      message: "Thanks for the quick response!",
      time: "1h ago",
      avatar: "/placeholder.svg",
    },
    {
      id: 4,
      name: "HR Department",
      message: "Please review the updated policy document and prov...",
      time: "Yesterday",
      avatar: "/placeholder.svg",
      isGroup: true,
    },
  ];

  // Information Hub Data
  const noticeItems = [
    {
      title: "Holiday Notice - Diwali Celebration",
      content: "Office will remain closed on October 24th for Diwali...",
      date: "1 day ago",
    },
    {
      title: "New Health Insurance Policy Updates",
      content:
        "Important updates regarding the company health insurance policy...",
      date: "3 days ago",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 px-6 pt-6">
        <h1 className="text-xl font-bold text-[#283C50] flex items-center gap-2">
          Good morning, Bhaskar! 👋
        </h1>
        <p className="text-sm font-medium text-gray-600">
          {formatDate(currentTime)}
        </p>
      </div>

      <div className="flex-1 overflow-auto px-6 pb-6">
        {/* Quick Overview Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#283C50] mb-4">
            Quick Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickOverviewCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={card.id}
                  className={cn(
                    "bg-white rounded-[10px] border-b-[6px] border-[#4766E5]",
                    "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
                    "p-4 flex flex-col h-64",
                  )}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={cn(
                        "p-3 rounded-xl shadow-sm",
                        card.color,
                        "group-hover:scale-110 transition-transform duration-300",
                      )}
                    >
                      <IconComponent
                        className={cn("w-6 h-6", card.iconColor)}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-[#283C50] leading-tight">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1">
                    {card.value && (
                      <div className="mb-4">
                        <div className="text-4xl font-bold text-[#4766E5] mb-1">
                          {card.value}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          {card.subtitle}
                        </div>
                      </div>
                    )}

                    {/* Details/Items */}
                    <div className="space-y-3 text-sm">
                      {card.details?.map((detail, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center bg-gray-50 rounded-lg p-2"
                        >
                          <span className="text-gray-700 font-medium">
                            {detail.label}
                          </span>
                          <span
                            className={cn("font-bold text-lg", detail.color)}
                          >
                            {detail.value}
                          </span>
                        </div>
                      ))}

                      {card.items?.map((item, idx) => (
                        <div
                          key={idx}
                          className="border-l-4 border-blue-200 bg-gray-50 rounded-r-lg p-3 last:mb-0"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-gray-800 font-semibold text-sm leading-tight">
                              {item.type || item.text}
                            </span>
                            {item.status && (
                              <Badge
                                variant={
                                  item.status === "Urgent"
                                    ? "destructive"
                                    : "secondary"
                                }
                                className="text-xs ml-2"
                              >
                                {item.status}
                              </Badge>
                            )}
                          </div>
                          <div className="text-gray-600 text-xs font-medium">
                            {item.time || item.duration}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    {card.progress && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-700 font-medium">
                            Weekly Progress
                          </span>
                          <span className="font-bold text-[#4766E5]">
                            {card.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#4766E5] to-[#6366F1] h-full rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${card.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button className="w-full mt-6 h-10 text-sm font-semibold bg-gradient-to-r from-[#4766E5] to-[#6366F1] text-white border-0 hover:from-[#3b5df0] hover:to-[#5b63e8] transition-all duration-300 shadow-md hover:shadow-lg">
                    {card.action}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Personal Productivity & Communication Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-[#283C50]">
              Personal Productivity & Communication
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Chat Activity */}
            <div
              className={cn(
                "bg-white rounded-xl border-b-4 border-[#4766E5]",
                "shadow-lg hover:shadow-xl transition-all duration-300",
                "p-6",
              )}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-50 shadow-sm">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#283C50]">
                      Recent Chat Activity
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Unread Messages
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4766E5] mb-1">
                    14
                  </div>
                  <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                {chatActivities.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex items-center gap-4 p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200"
                  >
                    <Avatar className="h-10 w-10 ring-2 ring-blue-100">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                        {chat.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-sm font-semibold text-gray-900 truncate">
                          {chat.name}
                        </div>
                        {chat.isGroup && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-blue-100 text-blue-700"
                          >
                            Group
                          </Badge>
                        )}
                        <div className="text-xs text-gray-500 ml-auto font-medium">
                          {chat.time}
                        </div>
                      </div>
                      <div className="text-sm text-gray-700 truncate font-medium leading-relaxed">
                        {chat.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-6 h-10 text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg">
                View All Chats
              </Button>
            </div>

            {/* My Daily Work Status */}
            <div
              className={cn(
                "bg-white rounded-xl border-b-4 border-[#4766E5]",
                "shadow-lg hover:shadow-xl transition-all duration-300",
                "p-6",
              )}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-indigo-50">
                  <Clock className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-sm font-semibold text-[#283C50]">
                  My Daily Work Status
                </h3>
              </div>

              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-[#4766E5] mb-1">
                  {formatTime(currentTime)}
                </div>
                <div className="text-xs text-gray-600">Monday 23 Jun, 2025</div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-xs text-gray-600">Office Hours</span>
                  <span className="text-xs font-semibold text-[#4766E5]">
                    09:00 AM To 06:00 PM
                  </span>
                </div>

                <div className="text-center">
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Punch Status
                  </div>
                  <div className="text-lg font-bold text-red-600 mb-2">
                    {punchStatus}
                  </div>
                </div>
              </div>

              {punchStatus === "NOT PUNCHED IN" && (
                <Button
                  onClick={handlePunchIn}
                  className="w-full mb-3 h-10 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  ⏰ PUNCH IN
                </Button>
              )}

              <div className="text-xs text-gray-500 text-center mb-3">
                Punch-in is tracked for attendance
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
                <div className="flex items-center gap-2 text-orange-600 text-xs">
                  <Bell className="w-3 h-3" />
                  <span className="font-medium">
                    Attendance is locked @01:31 AM.
                  </span>
                </div>
                <div className="text-xs text-orange-600 mt-1">
                  For Punch-in: Click above for request for Approval to yr
                  Reporting Manager...
                </div>
              </div>

              <div className="text-center">
                <div className="text-xs font-medium text-gray-700 mb-1">
                  Location Timeline
                </div>
                <div className="text-xs text-gray-500">
                  (Tracked ONLY between Punch-in & Punch-out as per Mandate of
                  the company)
                </div>
                <Button className="w-full mt-2 h-8 text-xs bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                  Click here for more Detail
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Information Hub */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#283C50] mb-4">
            Information Hub
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Notice Board */}
            <div
              className={cn(
                "bg-white rounded-[10px] border-b-[6px] border-[#4766E5]",
                "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
                "p-4",
              )}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-red-50">
                  <Bell className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-sm font-semibold text-[#283C50]">
                  Notice Board
                </h3>
              </div>

              <div className="text-xs text-gray-600 mb-3">
                You're viewing for: All Branch
              </div>

              <div className="space-y-3">
                {noticeItems.map((notice, idx) => (
                  <div
                    key={idx}
                    className="border-b border-gray-100 pb-2 last:border-b-0"
                  >
                    <div className="text-xs font-medium text-gray-900 mb-1">
                      {notice.title}
                    </div>
                    <div className="text-xs text-gray-600 mb-1">
                      {notice.content}
                    </div>
                    <div className="text-xs text-gray-500">{notice.date}</div>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-4 h-8 text-xs bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                View All Notices
              </Button>
            </div>

            {/* Monthly Attendance Summary */}
            <div
              className={cn(
                "bg-white rounded-[10px] border-b-[6px] border-[#4766E5]",
                "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
                "p-4",
              )}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-50">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-sm font-semibold text-[#283C50]">
                  Monthly Attendance Summary
                </h3>
              </div>

              <div className="text-xs text-gray-600 mb-3">- June 2025</div>
              <div className="text-xs text-gray-600 mb-4">
                Total Days: 30 | Working Days: 22
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-center p-2 bg-green-50 rounded">
                  <div className="text-lg font-bold text-green-600">22</div>
                  <div className="text-xs text-green-600">Present</div>
                </div>
                <div className="text-center p-2 bg-red-50 rounded">
                  <div className="text-lg font-bold text-red-600">0</div>
                  <div className="text-xs text-red-600">Absent</div>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded">
                  <div className="text-lg font-bold text-blue-600">5</div>
                  <div className="text-xs text-blue-600">Sunday</div>
                </div>
                <div className="text-center p-2 bg-orange-50 rounded">
                  <div className="text-lg font-bold text-orange-600">3</div>
                  <div className="text-xs text-orange-600">Holiday</div>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded">
                  <div className="text-lg font-bold text-purple-600">0</div>
                  <div className="text-xs text-purple-600">Late</div>
                </div>
                <div className="text-center p-2 bg-pink-50 rounded">
                  <div className="text-lg font-bold text-pink-600">0</div>
                  <div className="text-xs text-pink-600">Red Flag</div>
                </div>
              </div>

              <Button className="w-full h-8 text-xs bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                View Detailed Report
              </Button>
            </div>

            {/* Salary Snapshot */}
            <div
              className={cn(
                "bg-white rounded-[10px] border-b-[6px] border-[#4766E5]",
                "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
                "p-4",
              )}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-50">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-sm font-semibold text-[#283C50]">
                  Salary Snapshot
                </h3>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-lg font-bold text-green-600">
                    ₹ 50,000.00
                  </div>
                  <Badge className="bg-green-100 text-green-600 text-xs">
                    +12%
                  </Badge>
                </div>
                <div className="text-xs text-gray-600">Last Net Pay</div>
                <div className="text-xs text-gray-500">vs previous month</div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Next Payslip</span>
                  <span className="text-xs font-semibold text-[#4766E5]">
                    15
                  </span>
                </div>
                <div className="text-xs text-gray-500">Days Remaining</div>

                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Deducted</span>
                    <span className="text-red-600 font-semibold">₹8,500</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">PF Contribution</span>
                    <span className="text-blue-600 font-semibold">₹2,200</span>
                  </div>
                </div>
              </div>

              <Button className="w-full mb-2 h-8 text-xs bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                Request Salary Advance
              </Button>
              <Button className="w-full h-8 text-xs bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                View All Payslips
              </Button>
            </div>

            {/* My Performance */}
            <div
              className={cn(
                "bg-white rounded-[10px] border-b-[6px] border-[#4766E5]",
                "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
                "p-4",
              )}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-yellow-50">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="text-sm font-semibold text-[#283C50]">
                  My Performance
                </h3>
              </div>

              <div className="text-center mb-4">
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 text-yellow-500 fill-current"
                    />
                  ))}
                  <Star className="w-4 h-4 text-gray-300" />
                </div>
                <div className="text-2xl font-bold text-[#4766E5] mb-1">
                  4.4
                </div>
                <div className="text-xs text-gray-600">
                  Average over 23 task reviews
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-sm text-green-600 font-semibold mb-1">
                  Nice, Keep it up! 💪
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-xs font-semibold text-[#283C50]">
                  Employee of the Month
                </div>
                <div className="text-xs text-gray-500">June 2025</div>
              </div>

              <Button className="w-full h-8 text-xs bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                View Performance Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
