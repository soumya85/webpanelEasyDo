import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { PageLayout } from "@/components/layout/PageLayout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
      <PageLayout>
        <div className="flex flex-col bg-white h-full">
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
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
        {/* Content Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
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
    </PageLayout>
  );
};

export default Chats;
