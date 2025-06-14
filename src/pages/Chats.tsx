import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
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
  Search,
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
    name: "Lokendra Kumar",
    avatar: "/api/placeholder/40/40",
    lastMessage: "After that please share that link also",
    timestamp: "11:45",
    unreadCount: 0,
    isGroup: false,
    phone: "+91 98765 43210",
  },
  {
    id: "2",
    name: "Liberty Kokoro Daily Attendance",
    avatar: "",
    lastMessage: "Bhaskar: Good morning ! Working on ap...",
    timestamp: "10:47",
    unreadCount: 2,
    isGroup: true,
    tags: ["GROUP"],
  },
  {
    id: "3",
    name: "IntelliUI UX Designers Group",
    avatar: "",
    lastMessage: "IntelliUI: 📄 I'm improving messages to...",
    timestamp: "10:15",
    unreadCount: 0,
    isGroup: true,
    tags: ["GROUP"],
  },
  {
    id: "4",
    name: "Liberty Righrise Private Limited",
    avatar: "",
    lastMessage: "Old design",
    timestamp: "Yesterday",
    unreadCount: 5,
    isGroup: true,
    tags: ["GROUP"],
  },
  {
    id: "5",
    name: "EasyDo Marketing 2024",
    avatar: "",
    lastMessage: "Bhaskar Ghosh found: it .",
    timestamp: "Yesterday",
    unreadCount: 0,
    isGroup: true,
    tags: ["GROUP"],
  },
  {
    id: "6",
    name: "Bhaskar Ghosh",
    avatar: "/api/placeholder/40/40",
    lastMessage: "📄 https://www.youtube.com/watch?v=sSE...",
    timestamp: "Yesterday",
    unreadCount: 1,
    isGroup: false,
    phone: "+91 87654 32109",
  },
  {
    id: "7",
    name: "EasyDo Web App - Lokendra",
    avatar: "",
    lastMessage: "lokendra: 58 image",
    timestamp: "Yesterday",
    unreadCount: 0,
    isGroup: true,
    tags: ["GROUP"],
  },
  {
    id: "8",
    name: "Easy Do SIX",
    avatar: "",
    lastMessage: "Ravi Mishra",
    timestamp: "Yesterday",
    unreadCount: 3,
    isGroup: true,
    tags: ["GROUP"],
  },
  {
    id: "9",
    name: "Liberty Ahmedabad Daily Atten...",
    avatar: "",
    lastMessage: "Dev: The links have steps to follow to Integr...",
    timestamp: "Yesterday",
    unreadCount: 0,
    isGroup: true,
    tags: ["GROUP"],
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
    text: "can you host your design on https://scrod.com/ for me?",
    timestamp: "6:43 PM",
    isSent: true,
    isRead: true,
  },
  {
    id: "4",
    text: "I mean the Easy Do Web App",
    timestamp: "6:43 PM",
    isSent: true,
    isRead: true,
  },
  {
    id: "5",
    text: "Good morning",
    timestamp: "10:47 AM",
    isSent: false,
  },
  {
    id: "6",
    text: "Hi",
    timestamp: "10:48 AM",
    isSent: true,
    isRead: true,
  },
  {
    id: "7",
    text: "After that please share that link also",
    timestamp: "11:45 AM",
    isSent: false,
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

// ============================================================
// DESKTOP COMPONENTS (WhatsApp Style - Two Panel Layout)
// ============================================================

const ChatContactsList: React.FC<{
  chatItems: ChatItem[];
  selectedChat: ChatItem | null;
  onChatSelect: (chat: ChatItem) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}> = ({
  chatItems,
  selectedChat,
  onChatSelect,
  searchQuery,
  onSearchChange,
}) => (
  <div className="flex flex-col h-full bg-white border-r border-gray-200">
    {/* Header */}
    <div className="p-4 border-b border-gray-200">
      <h1 className="text-xl font-semibold text-gray-900 mb-3">Chats</h1>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search or start a new chat"
          className="pl-10 bg-gray-50 border-gray-200"
        />
      </div>
    </div>

    {/* Chat List */}
    <div className="flex-1 overflow-y-auto">
      {chatItems.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onChatSelect(chat)}
          className={cn(
            "flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100",
            selectedChat?.id === chat.id && "bg-gray-100",
          )}
        >
          <Avatar className="h-12 w-12 flex-shrink-0">
            <AvatarImage src={chat.avatar} alt={chat.name} />
            <AvatarFallback className="bg-gray-300 text-gray-700 font-semibold">
              {chat.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-gray-900 text-sm truncate">
                {chat.name}
              </h3>
              <span className="text-xs text-gray-500 flex-shrink-0">
                {chat.timestamp}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 truncate flex-1">
                {chat.lastMessage}
              </p>
              {chat.unreadCount > 0 && (
                <Badge className="bg-blue-500 text-white text-xs ml-2">
                  {chat.unreadCount}
                </Badge>
              )}
            </div>

            {chat.isGroup && (
              <div className="mt-1">
                <Badge variant="secondary" className="text-xs">
                  GROUP
                </Badge>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ChatConversation: React.FC<{
  selectedChat: ChatItem | null;
  messages: ChatMessage[];
  messageText: string;
  onMessageChange: (text: string) => void;
  onSendMessage: () => void;
  onOpenActions: () => void;
}> = ({
  selectedChat,
  messages,
  messageText,
  onMessageChange,
  onSendMessage,
  onOpenActions,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <MessageCircle className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Select a chat to start messaging
          </h3>
          <p className="text-gray-500">
            Choose from your existing conversations or start a new one
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white">
        <Avatar className="h-10 w-10">
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
          <h2 className="font-semibold text-gray-900">{selectedChat.name}</h2>
          <p className="text-sm text-gray-500">Online</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Phone className="h-4 w-4 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="text-center mb-4">
          <span className="bg-white text-gray-500 text-xs px-3 py-1 rounded-full shadow-sm">
            Today
          </span>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex mb-3",
              message.isSent ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[70%] rounded-2xl px-4 py-2 relative",
                message.isSent
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-900 shadow-sm",
              )}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <div
                className={cn(
                  "text-xs mt-1 flex items-center justify-end gap-1",
                  message.isSent ? "text-blue-100" : "text-gray-500",
                )}
              >
                <span>{message.timestamp}</span>
                {message.isSent && message.isRead && (
                  <Eye className="h-3 w-3" />
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-end gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenActions}
            className="h-10 w-10 text-gray-500"
          >
            <Plus className="h-5 w-5" />
          </Button>

          <div className="flex-1">
            <Input
              value={messageText}
              onChange={(e) => onMessageChange(e.target.value)}
              placeholder="Type a message"
              className="rounded-3xl border-gray-300 py-3"
              onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
            />
          </div>

          {messageText.trim() ? (
            <Button
              onClick={onSendMessage}
              size="icon"
              className="h-10 w-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-gray-500"
            >
              <Mic className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MOBILE COMPONENTS (Original Design with Task Cards & Filters)
// ============================================================

const MobileChatList: React.FC<{
  chatItems: ChatItem[];
  onChatSelect: (chat: ChatItem) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}> = ({
  chatItems,
  onChatSelect,
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
}) => {
  const filterTabs = ["All", "Unread", "Groups", "Labels", "Archived"];

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
      {/* Header with Original Mobile Design */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        {/* Title */}
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-[28px] font-black text-gray-900">Chats</h1>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search"
              className="pl-10 rounded-lg border-gray-300 bg-gray-50"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto">
            {filterTabs.map((filter) => (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
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

        {/* Task Summary Cards - Original Design Feature */}
        <div className="px-4 pb-4">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {taskSummaries.map((task) => (
              <div
                key={task.id}
                className="bg-gray-100 rounded-[20px] p-4 min-w-[120px] text-center cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <div className="text-[28px] font-bold text-blue-500 mb-1">
                  {task.count}
                </div>
                <div className="text-[12px] font-medium text-gray-800 leading-tight">
                  {task.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 bg-white overflow-y-auto">
        {chatItems.length > 0 ? (
          chatItems.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onChatSelect(chat)}
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

                <p className="text-[14px] text-gray-600 truncate">
                  {chat.lastMessage}
                </p>
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
  );
};

const MobileChatView: React.FC<{
  selectedChat: ChatItem | null;
  messages: ChatMessage[];
  messageText: string;
  onMessageChange: (text: string) => void;
  onSendMessage: () => void;
  onBackToList: () => void;
  onOpenActions: () => void;
}> = ({
  selectedChat,
  messages,
  messageText,
  onMessageChange,
  onSendMessage,
  onBackToList,
  onOpenActions,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChat]);

  if (!selectedChat) return null;

  return (
    <div
      className="flex flex-col bg-white -mb-16 pb-16"
      style={{ height: "calc(100vh - 151px + 4rem)" }}
    >
      {/* Mobile Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBackToList}
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
          <div
            key={message.id}
            className={cn(
              "flex mb-4",
              message.isSent ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[70%] rounded-[18px] px-4 py-2 relative",
                message.isSent
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900",
              )}
            >
              <p className="text-[15px] leading-tight">{message.text}</p>
              <div
                className={cn(
                  "text-[11px] mt-1 flex items-center justify-end gap-1",
                  message.isSent ? "text-blue-100" : "text-gray-500",
                )}
              >
                <span>{message.timestamp}</span>
                {message.isSent && message.isRead && (
                  <Eye className="h-3 w-3" />
                )}
              </div>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions - Original Design Feature */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {quickActions.map((action) => (
            <button
              key={action.id}
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
          onClick={onOpenActions}
          className="h-8 w-8 p-0 text-blue-500"
        >
          <Plus className="h-5 w-5" />
        </Button>

        <div className="flex-1 relative">
          <Input
            value={messageText}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="Type here..."
            className="rounded-full border-gray-300 pr-10"
            onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
          />
        </div>

        {messageText.trim() ? (
          <Button
            onClick={onSendMessage}
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
    </div>
  );
};

// Company Action Drawer (shared between mobile and desktop)
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

// ============================================================
// MAIN COMPONENT
// ============================================================

const Chats: React.FC = () => {
  // For mobile: start with no chat selected (show list)
  // For desktop: start with first chat selected (show conversation)
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [messageText, setMessageText] = useState("");
  const [isActionDrawerOpen, setIsActionDrawerOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Set default chat for desktop on mount
  useEffect(() => {
    const setDefaultChatForDesktop = () => {
      // Only set default chat if we're on desktop (width >= 768px)
      if (window.innerWidth >= 768 && !selectedChat) {
        setSelectedChat(chatItems[0]);
      }
    };

    setDefaultChatForDesktop();
    window.addEventListener("resize", setDefaultChatForDesktop);

    return () => window.removeEventListener("resize", setDefaultChatForDesktop);
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
    }
  };

  const handleActionSelect = (action: any) => {
    console.log("Selected action:", action);
    setIsActionDrawerOpen(false);
  };

  // Filter chats based on search query and selected filter
  const filteredChats = chatItems.filter((chat) => {
    const matchesSearch =
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    switch (selectedFilter) {
      case "Unread":
        return chat.unreadCount > 0;
      case "Groups":
        return chat.isGroup;
      case "Labels":
        return chat.tags && chat.tags.length > 0;
      case "Archived":
        return false;
      default:
        return true;
    }
  });

  return (
    <>
      {/* DESKTOP LAYOUT - WhatsApp Style (No Changes) */}
      <div
        className="hidden md:flex h-full bg-white"
        style={{ height: "calc(100vh - 86px)" }}
      >
        {/* Left Panel - Chat Contacts */}
        <div className="w-1/3 min-w-[300px] max-w-[400px]">
          <ChatContactsList
            chatItems={filteredChats}
            selectedChat={selectedChat}
            onChatSelect={setSelectedChat}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Right Panel - Chat Conversation */}
        <ChatConversation
          selectedChat={selectedChat}
          messages={messages}
          messageText={messageText}
          onMessageChange={setMessageText}
          onSendMessage={handleSendMessage}
          onOpenActions={() => setIsActionDrawerOpen(true)}
        />
      </div>

      {/* MOBILE LAYOUT - Original Design with Task Cards & Filters */}
      <div className="md:hidden">
        {selectedChat ? (
          <MobileChatView
            selectedChat={selectedChat}
            messages={messages}
            messageText={messageText}
            onMessageChange={setMessageText}
            onSendMessage={handleSendMessage}
            onBackToList={() => setSelectedChat(null)}
            onOpenActions={() => setIsActionDrawerOpen(true)}
          />
        ) : (
          <MobileChatList
            chatItems={filteredChats}
            onChatSelect={setSelectedChat}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        )}
      </div>

      <CompanyActionDrawer
        isOpen={isActionDrawerOpen}
        onClose={() => setIsActionDrawerOpen(false)}
        onActionSelect={handleActionSelect}
      />
    </>
  );
};

export default Chats;
