import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useUser, getUserInitials, getProfileImageSrc } from "@/hooks/useUser";
import { useSidebar } from "@/hooks/useSidebar";
import { Menu, ChevronDown, Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Plus,
  Phone,
  MessageCircle,
  Camera,
  Scan,
  FileText,
  Image as ImageIcon,
  Users,
  MapPin,
  BarChart3,
  Eye,
  Mic,
  Send,
  ArrowLeft,
  MoreHorizontal,
  Calendar,
  CheckSquare,
  Receipt,
  UserPlus,
  Clock,
  Info,
  PieChart,
  Shield,
  Settings,
} from "lucide-react";

// Types
interface TaskSummary {
  id: string;
  title: string;
  count: number;
  color: string;
}

interface ChatMessage {
  id: string;
  text: string;
  timestamp: string;
  isSent: boolean;
  isRead?: boolean;
  attachment?: {
    type: "image" | "document";
    title: string;
    size?: string;
  };
}

interface ChatItem {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isGroup: boolean;
  tags?: string[];
  phone?: string;
}

// Mock Data
const taskSummaries: TaskSummary[] = [
  { id: "1", title: "My Tasks", count: 134, color: "bg-blue-500" },
  { id: "2", title: "Delegated Tasks", count: 23, color: "bg-blue-500" },
  { id: "3", title: "Meet", count: 8, color: "bg-blue-500" },
  { id: "4", title: "Notes & Reminder", count: 7, color: "bg-blue-500" },
];

const chatItems: ChatItem[] = [
  {
    id: "1",
    name: "EasyDo AI",
    avatar: "",
    lastMessage:
      "It's time to punch in Innov8 Solution Soumyadeep have u forgotten to pun...",
    timestamp: "2:10 PM",
    unreadCount: 458,
    isGroup: false,
  },
  {
    id: "2",
    name: "Bug Resolve 2025",
    avatar: "",
    lastMessage: "~Bhaskar IOS (+919831670400) : On...",
    timestamp: "2:06 PM",
    unreadCount: 19,
    isGroup: true,
    tags: ["#LIBERTY"],
  },
  {
    id: "3",
    name: "Liberty Righrise@Kolkata",
    avatar: "",
    lastMessage: "~Amulya Kumar Kar (+919748741142...",
    timestamp: "1:38 PM",
    unreadCount: 2,
    isGroup: true,
  },
  {
    id: "4",
    name: "Amulya Kumar Kar",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Attendance",
    timestamp: "10:14 AM",
    unreadCount: 1,
    isGroup: false,
    phone: "+919748741142",
  },
  {
    id: "5",
    name: "Bholanath Pal",
    avatar: "",
    lastMessage: "Meet",
    timestamp: "Sunday",
    unreadCount: 87,
    isGroup: false,
    phone: "+919836072814",
  },
  {
    id: "6",
    name: "Chinmay Banerjee",
    avatar: "/api/placeholder/40/40",
    lastMessage: "",
    timestamp: "Saturday",
    unreadCount: 42,
    isGroup: false,
    phone: "+919123456789",
  },
];

const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    text: "Hi",
    timestamp: "05:30 PM",
    isSent: false,
  },
  {
    id: "2",
    text: "Hello",
    timestamp: "05:31 PM",
    isSent: true,
    isRead: true,
  },
  {
    id: "3",
    text: "Invitation - Join the company...",
    timestamp: "6:46 PM",
    isSent: false,
    attachment: {
      type: "document",
      title: "Pending - Company Joining Offers\nLiberty Righrise Pvt Ltd",
      size: "127.28 KB",
    },
  },
];

const quickActions = [
  { id: "invoice", label: "Sales Invoice", icon: Receipt },
  { id: "lead", label: "Lead", icon: UserPlus },
  { id: "approval", label: "Approval", icon: CheckSquare },
  { id: "poll", label: "Poll", icon: BarChart3 },
  { id: "attendance", label: "Attendance", icon: Clock },
];

const companyActions = [
  // Communication
  { id: "camera", label: "Camera", icon: Camera, category: "communication" },
  { id: "scan", label: "Scan", icon: Scan, category: "communication" },
  {
    id: "document",
    label: "Document",
    icon: FileText,
    category: "communication",
  },
  {
    id: "photos",
    label: "Photos & Videos",
    icon: ImageIcon,
    category: "communication",
  },
  { id: "contacts", label: "Contacts", icon: Users, category: "communication" },
  {
    id: "location",
    label: "Share Location",
    icon: MapPin,
    category: "communication",
  },
  {
    id: "opinion",
    label: "Opinion Poll",
    icon: PieChart,
    category: "communication",
  },
  {
    id: "request",
    label: "Request Location",
    icon: MapPin,
    category: "communication",
  },

  // Company Options
  {
    id: "sales-invoice",
    label: "Sales Invoice",
    icon: Receipt,
    category: "company",
  },
  {
    id: "sales-lead",
    label: "Sales Lead",
    icon: UserPlus,
    category: "company",
  },
  {
    id: "schedule",
    label: "Schedule Meet",
    icon: Calendar,
    category: "company",
  },
  {
    id: "delegate",
    label: "Delegate Task",
    icon: CheckSquare,
    category: "company",
  },
  { id: "logs", label: "View Logs", icon: Info, category: "company" },
  { id: "bills", label: "Submit Bills", icon: Receipt, category: "company" },
  {
    id: "approval",
    label: "Request Approval",
    icon: Shield,
    category: "company",
  },
  {
    id: "mark-attendance",
    label: "Mark Attendance",
    icon: Clock,
    category: "company",
  },
];

// Components
const TaskSummaryCard: React.FC<{ task: TaskSummary }> = ({ task }) => (
  <div className="bg-gray-100 rounded-[20px] p-4 min-w-[120px] text-center cursor-pointer hover:bg-gray-200 transition-colors">
    <div className={cn("text-[28px] font-bold text-blue-500 mb-1")}>
      {task.count}
    </div>
    <div className="text-[12px] font-medium text-gray-800 leading-tight">
      {task.title}
    </div>
  </div>
);

const ChatListItem: React.FC<{ chat: ChatItem; onClick: () => void }> = ({
  chat,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
  >
    <div className="relative">
      <Avatar className="h-12 w-12">
        <AvatarImage src={chat.avatar} alt={chat.name} />
        <AvatarFallback className="bg-gray-300 text-gray-700 font-semibold">
          {chat.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
        </AvatarFallback>
      </Avatar>
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-gray-900 text-[16px] truncate">
          {chat.name}
        </h3>
      </div>

      <div className="flex items-center gap-2 mb-2">
        {chat.isGroup && (
          <Badge
            variant="secondary"
            className="bg-black text-white text-[10px] px-2 py-0.5 rounded"
          >
            GROUP CHAT
          </Badge>
        )}
        {chat.tags?.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <p className="text-[14px] text-gray-600 truncate">{chat.lastMessage}</p>
    </div>

    <div className="flex flex-col items-end gap-2">
      <span className="text-[12px] text-gray-500 flex-shrink-0">
        {chat.timestamp}
      </span>
      {chat.unreadCount > 0 && (
        <Badge className="bg-blue-500 text-white min-w-[20px] h-5 rounded-full text-[11px] font-medium">
          {chat.unreadCount > 999 ? "999+" : chat.unreadCount}
        </Badge>
      )}
    </div>
  </div>
);

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => (
  <div
    className={cn(
      "flex mb-4",
      message.isSent ? "justify-end" : "justify-start",
    )}
  >
    <div
      className={cn(
        "max-w-[70%] rounded-[18px] px-4 py-2 relative",
        message.isSent ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900",
      )}
    >
      {message.attachment ? (
        <div className="space-y-2">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-gray-600" />
              <span className="text-[12px] text-gray-600">
                Size {message.attachment.size}
              </span>
            </div>
            <p className="text-[14px] text-gray-900 font-medium">
              {message.attachment.title}
            </p>
          </div>
          <div className="text-[12px] opacity-75">{message.timestamp}</div>
        </div>
      ) : (
        <>
          <p className="text-[15px] leading-tight">{message.text}</p>
          <div
            className={cn(
              "text-[11px] mt-1 flex items-center justify-end gap-1",
              message.isSent ? "text-blue-100" : "text-gray-500",
            )}
          >
            <span>{message.timestamp}</span>
            {message.isSent && message.isRead && <Eye className="h-3 w-3" />}
          </div>
        </>
      )}
    </div>
  </div>
);

const CompanyActionDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onActionSelect: (action: any) => void;
}> = ({ isOpen, onClose, onActionSelect }) => (
  <Sheet open={isOpen} onOpenChange={onClose}>
    <SheetContent
      side="bottom"
      className="h-[85vh] rounded-t-[20px] overflow-y-auto"
    >
      <div className="pb-4">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
      </div>

      <div className="space-y-6 pb-8">
        {/* Communication Section */}
        <div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {companyActions
              .filter((a) => a.category === "communication")
              .slice(0, 8)
              .map((action) => (
                <button
                  key={action.id}
                  onClick={() => onActionSelect(action)}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <action.icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <span className="text-[11px] text-gray-700 text-center leading-tight">
                    {action.label}
                  </span>
                </button>
              ))}
          </div>
        </div>

        {/* Company Options Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-[16px] font-semibold text-gray-900">
              Company Options
            </h3>
            <div className="flex-1 h-px bg-gray-500"></div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {companyActions
              .filter((a) => a.category === "company")
              .map((action) => (
                <button
                  key={action.id}
                  onClick={() => onActionSelect(action)}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50"
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      action.id === "delegate"
                        ? "bg-orange-500"
                        : action.id === "mark-attendance"
                          ? "bg-green-500"
                          : "bg-gray-100",
                    )}
                  >
                    <action.icon
                      className={cn(
                        "h-6 w-6",
                        action.id === "delegate" ||
                          action.id === "mark-attendance"
                          ? "text-white"
                          : "text-gray-700",
                      )}
                    />
                  </div>
                  <span className="text-[11px] text-gray-700 text-center leading-tight">
                    {action.label}
                  </span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

const Chats: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [messageText, setMessageText] = useState("");
  const [isActionDrawerOpen, setIsActionDrawerOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: messageText.trim(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isSent: true,
        isRead: false,
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessageText("");

      // Here you would typically send the message to your backend
      console.log("Sending message:", messageText);
    }
  };

  const handleActionSelect = (action: any) => {
    console.log("Selected action:", action);
    setIsActionDrawerOpen(false);
    // Handle the selected action
  };

  // Filter chats based on search query and selected filter
  const filteredChats = chatItems.filter((chat) => {
    // Search filter
    const matchesSearch =
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Category filter
    switch (selectedFilter) {
      case "Unread":
        return chat.unreadCount > 0;
      case "Groups":
        return chat.isGroup;
      case "Labels":
        return chat.tags && chat.tags.length > 0;
      case "Archived":
        return false; // No archived chats in mock data
      default:
        return true;
    }
  });

  const filterTabs = ["All", "Unread", "Groups", "Labels", "Archived"];

  if (selectedChat) {
    return (
      <div
        className="flex flex-col bg-white -mb-16 pb-16"
        style={{ height: "calc(100vh - 151px + 4rem)" }}
      >
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedChat(null)}
            className="h-8 w-8 p-0"
          >
            <ArrowLeft className="h-5 w-5 text-blue-500" />
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
            <AvatarFallback className="bg-gray-300 text-gray-700 text-sm">
              {selectedChat.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="font-semibold text-[16px] text-gray-900">
              {selectedChat.phone || selectedChat.name}
            </h2>
            <p className="text-[12px] text-gray-500">36 minutes ago</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <Phone className="h-5 w-5 text-blue-500" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-5 w-5 text-blue-500" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-center">
            <span className="bg-gray-200 text-gray-600 text-[12px] px-3 py-1 rounded-full">
              Wednesday 01 May 2024
            </span>
          </div>

          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          <div className="text-center">
            <span className="bg-gray-200 text-gray-600 text-[12px] px-3 py-1 rounded-full">
              Wednesday 08 May 2024
            </span>
          </div>

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 border-t border-gray-100">
          <div className="flex gap-2 mb-3 overflow-x-auto">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleActionSelect(action)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full whitespace-nowrap text-[12px] font-medium text-gray-700"
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-3 p-4 border-t border-gray-200 bg-white">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsActionDrawerOpen(true)}
            className="h-8 w-8 p-0 text-blue-500"
          >
            <Plus className="h-5 w-5" />
          </Button>

          <div className="flex-1 relative">
            <Input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type here..."
              className="rounded-full border-gray-300 pr-10"
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </div>

          {messageText.trim() ? (
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0 text-blue-500"
            >
              <Mic className="h-5 w-5" />
            </Button>
          )}
        </div>

        <CompanyActionDrawer
          isOpen={isActionDrawerOpen}
          onClose={() => setIsActionDrawerOpen(false)}
          onActionSelect={handleActionSelect}
        />
      </div>
    );
  }

  const { user } = useUser();
  const { toggleMobile } = useSidebar();

  return (
    <>
      {/* Mobile Header - Only visible on mobile */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 h-[86px] bg-white border-b border-[#E0E0E0] flex items-center justify-between px-3">
        {/* Left Controls */}
        <div className="flex items-center gap-4">
          {/* Small Logo */}
          <img
            src="/logo-small.png"
            alt="EasyDo Logo"
            className="w-[38px] h-[38px] object-contain rounded-[3px]"
          />

          {/* Sidebar Toggle Button */}
          <button
            onClick={toggleMobile}
            className="flex items-center justify-center w-7 h-[25px]"
          >
            <svg
              width="28"
              height="26"
              viewBox="0 0 28 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.3245 9.17361H1.23118C0.887594 9.17361 0.596502 9.29768 0.357901 9.54583C0.1193 9.79397 0 10.0967 0 10.454C0 10.8114 0.1193 11.1141 0.357901 11.3622C0.596502 11.6104 0.887594 11.7345 1.23118 11.7345H18.3245C18.6681 11.7345 18.9592 11.6104 19.1978 11.3622C19.4364 11.1141 19.5557 10.8114 19.5557 10.454C19.5557 10.0967 19.4364 9.79397 19.1978 9.54583C18.9592 9.29768 18.6681 9.17361 18.3245 9.17361ZM23.2206 4.11146H1.23118C0.887594 4.11146 0.596502 4.23553 0.357901 4.48368C0.1193 4.73182 0 5.02463 0 5.36211C0 5.71944 0.1193 6.02217 0.357901 6.27032C0.596502 6.51846 0.887594 6.64254 1.23118 6.64254H23.2206C23.5642 6.64254 23.8553 6.51846 24.0939 6.27032C24.3325 6.02217 24.4518 5.71944 24.4518 5.36211C24.4518 5.02463 24.3325 4.73182 24.0939 4.48368C23.8553 4.23553 23.5642 4.11146 23.2206 4.11146ZM23.2206 14.2655H1.23118C0.887594 14.2655 0.596502 14.3896 0.357901 14.6378C0.1193 14.8859 0 15.1886 0 15.546C0 15.8834 0.1193 16.1763 0.357901 16.4244C0.596502 16.6725 0.887594 16.7966 1.23118 16.7966H23.2206C23.5642 16.7966 23.8553 16.6725 24.0939 16.4244C24.3325 16.1763 24.4518 15.8834 24.4518 15.546C24.4518 15.1886 24.3325 14.8859 24.0939 14.6378C23.8553 14.3896 23.5642 14.2655 23.2206 14.2655ZM18.3245 19.3575H1.23118C0.887594 19.3575 0.596502 19.4815 0.357901 19.7297C0.1193 19.9778 0 20.2706 0 20.6081C0 20.9654 0.1193 21.2682 0.357901 21.5163C0.596502 21.7645 0.887594 21.8885 1.23118 21.8885H18.3245C18.6681 21.8885 18.9592 21.7645 19.1978 21.5163C19.4364 21.2682 19.5557 20.9654 19.5557 20.6081C19.5557 20.2706 19.4364 19.9778 19.1978 19.7297C18.9592 19.4815 18.6681 19.3575 18.3245 19.3575Z"
                fill="#283C50"
              />
            </svg>
          </button>

          {/* Dashboard Title */}
          <h1 className="text-[16px] font-black text-[#283C50] uppercase tracking-wide leading-6">
            CHATS
          </h1>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* Chat Notification */}
          <div className="relative flex items-center justify-center">
            <button className="flex items-center justify-center w-[22px] h-[22px]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5061 4.32031V10.1797H5.30298L4.83423 10.6484L4.32642 11.1562V4.32031H13.5061ZM14.3264 2.67969H3.5061C3.03735 2.67969 2.68579 3.03125 2.68579 3.5V15.1797L6.0061 11.8203H14.3264C14.7952 11.8203 15.1858 11.4688 15.1858 11V3.5C15.1858 3.03125 14.7952 2.67969 14.3264 2.67969ZM18.5061 6H16.8264V13.5H6.0061V15.1797C6.0061 15.6094 6.39673 16 6.82642 16H16.0061L19.3264 19.3203V6.82031C19.3264 6.39062 18.9749 6 18.5061 6Z"
                  fill="#6B7280"
                />
              </svg>
            </button>
            {/* Green Badge */}
            <div className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1.5 py-1 bg-[#17C666] rounded-full">
              <span className="text-white text-[9px] font-semibold leading-[9px]">
                2
              </span>
            </div>
          </div>

          {/* Bell Notification */}
          <div className="relative flex items-center justify-center">
            <button className="flex items-center justify-center w-[22px] h-[22px]">
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.8204 6.6709C14.8204 7.50423 14.866 8.25944 14.9571 8.93652C15.0483 9.62663 15.1687 10.2451 15.3185 10.792C15.4682 11.3389 15.6342 11.8206 15.8165 12.2373C15.9988 12.654 16.1811 13.0186 16.3634 13.3311H4.95713C5.13942 13.0186 5.32171 12.654 5.504 12.2373C5.68629 11.8206 5.85231 11.3389 6.00205 10.792C6.15179 10.2451 6.27223 9.62663 6.36338 8.93652C6.45452 8.25944 6.50009 7.50423 6.50009 6.6709C6.50009 6.08496 6.60752 5.54134 6.82236 5.04004C7.0372 4.53874 7.33343 4.09928 7.71103 3.72168C8.08864 3.34408 8.53134 3.0446 9.03916 2.82324C9.54697 2.60189 10.0873 2.49121 10.6603 2.49121C11.2332 2.49121 11.7735 2.60189 12.2813 2.82324C12.7892 3.0446 13.2319 3.34408 13.6095 3.72168C13.9871 4.09928 14.2833 4.53874 14.4981 5.04004C14.713 5.54134 14.8204 6.08496 14.8204 6.6709ZM16.5001 6.6709C16.5001 5.86361 16.3471 5.10514 16.0411 4.39551C15.7351 3.68587 15.3152 3.06413 14.7813 2.53027C14.2605 2.00944 13.6453 1.59603 12.9356 1.29004C12.226 0.984049 11.4675 0.831055 10.6603 0.831055C9.85296 0.831055 9.0945 0.984049 8.38486 1.29004C7.67522 1.59603 7.05999 2.00944 6.53916 2.53027C6.0053 3.06413 5.58538 3.68587 5.27939 4.39551C4.9734 5.10514 4.82041 5.86361 4.82041 6.6709C4.82041 7.94694 4.71624 9.01465 4.50791 9.87402C4.29957 10.7334 4.06845 11.4235 3.81455 11.9443C3.56064 12.4652 3.3165 12.8428 3.08213 13.0771C2.86077 13.3115 2.73056 13.4417 2.6915 13.4678C2.49619 13.598 2.379 13.777 2.33994 14.0049C2.30088 14.2327 2.34645 14.4378 2.47666 14.6201C2.55478 14.7503 2.65569 14.8447 2.77939 14.9033C2.90309 14.9619 3.03004 14.9912 3.16025 14.9912H18.1603C18.3946 14.9912 18.5932 14.9098 18.756 14.7471C18.9187 14.5843 19.0001 14.3923 19.0001 14.1709C19.0001 14.0277 18.9675 13.8942 18.9024 13.7705C18.8373 13.6468 18.7462 13.5524 18.629 13.4873C18.603 13.4613 18.4727 13.3311 18.2384 13.0967C18.017 12.8623 17.7761 12.4814 17.5157 11.9541C17.2553 11.4268 17.0209 10.7334 16.8126 9.87402C16.6043 9.01465 16.5001 7.94694 16.5001 6.6709ZM11.3829 17.0811C11.3178 17.1852 11.2429 17.2699 11.1583 17.335C11.0737 17.4001 10.9793 17.4456 10.8751 17.4717C10.7709 17.4977 10.6635 17.5042 10.5528 17.4912C10.4422 17.4782 10.3412 17.4391 10.2501 17.374C10.172 17.335 10.1101 17.2926 10.0645 17.2471C10.019 17.2015 9.97666 17.1462 9.93759 17.0811C9.82041 16.8857 9.65114 16.7588 9.42978 16.7002C9.20843 16.6416 9.00009 16.6644 8.80478 16.7686C8.60947 16.8857 8.47926 17.055 8.41416 17.2764C8.34905 17.4977 8.37509 17.7061 8.49228 17.9014C8.59645 18.0967 8.72666 18.2725 8.88291 18.4287C9.03916 18.585 9.21494 18.7152 9.41025 18.8193C9.70973 19.0016 10.0222 19.1123 10.3478 19.1514C10.6733 19.1904 10.9923 19.1644 11.3048 19.0732C11.6173 18.9951 11.9037 18.8584 12.1642 18.6631C12.4246 18.4678 12.6459 18.2204 12.8282 17.9209C12.9454 17.7126 12.9714 17.4977 12.9063 17.2764C12.8412 17.055 12.711 16.8857 12.5157 16.7686C12.3204 16.6644 12.1121 16.6416 11.8907 16.7002C11.6694 16.7588 11.5001 16.8857 11.3829 17.0811Z"
                  fill="#6B7280"
                />
              </svg>
            </button>
            {/* Red Badge */}
            <div className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1.5 py-1 bg-[#EA4D4D] rounded-full">
              <span className="text-white text-[9px] font-semibold leading-[9px]">
                3
              </span>
            </div>
          </div>

          {/* User Avatar */}
          <div className="flex items-center justify-center -mt-1">
            <Avatar className="h-[22px] w-[22px]">
              <AvatarImage src={getProfileImageSrc(user)} alt={user.name} />
              <AvatarFallback className="bg-azure-24 text-white text-xs">
                {getUserInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Mobile Breadcrumb Section - Only visible on mobile */}
      <div className="md:hidden fixed top-[86px] left-0 right-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-start justify-between px-4 py-3">
          <div className="flex flex-col gap-1 text-sm flex-1 mr-4">
            <span className="font-semibold text-azure-24 leading-tight break-words">
              Liberty Righrise PVT Ltd
            </span>
            <div className="flex items-center gap-2">
              <ChevronDown className="h-4 w-4 text-gray-800 -rotate-90 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 leading-tight">All Branch</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-sm border-gray-400"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div
      <div className="flex flex-col h-full bg-gray-50 overflow-hidden" style={{ marginTop: '151px' }}>
        {/* Header - Hidden on mobile, visible on desktop */}
        <div className="hidden md:block bg-white border-b border-gray-200 sticky top-0 z-10">
          {/* Title and Search Bar */}
          <div className="flex items-center gap-4 p-4">
            <h1 className="text-[28px] font-black text-gray-900">Chats</h1>
            <div className="flex-1 relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="pl-10 rounded-lg border-gray-300 bg-gray-50"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="px-4 pb-3">
            <div className="flex gap-2 overflow-x-auto">
              {filterTabs.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                    selectedFilter === filter
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Task Summary Cards */}
          <div className="px-4 pb-4">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {taskSummaries.map((task) => (
                <TaskSummaryCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 bg-white overflow-y-auto">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                onClick={() => setSelectedChat(chat)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500 text-center">
                {searchQuery ? "No chats found" : "No chats available"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chats;