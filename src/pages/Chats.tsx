import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useGlobalTranslation } from "@/hooks/useGlobalTranslation";
import { getGlobalTranslation } from "@/lib/globalTranslations";
import { useSidebar } from "@/hooks/useSidebar";
import { ReactiveMultilingualText } from "@/components/ReactiveMultilingualText";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  MoreVertical,
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
  isArchived?: boolean;
}

// Mock Data
const taskSummaries: TaskSummary[] = [
  { id: "1", title: "My Tasks", count: 134, color: "bg-blue-500" },
  { id: "2", title: "Delegated Tasks", count: 23, color: "bg-blue-500" },
  { id: "3", title: "Meet", count: 8, color: "bg-blue-500" },
  { id: "4", title: "Notes & Reminder", count: 7, color: "bg-blue-500" },
];

// Helper function to generate proper two-letter initials
const getInitials = (name: string): string => {
  // Remove special characters and extra text like phone numbers
  const cleanName = name.replace(/[~\(\)+0-9]/g, "").trim();
  const words = cleanName.split(" ").filter((word) => word.length > 0);

  if (words.length >= 2) {
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  } else if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return "AI"; // fallback for AI/system messages
};

const chatItems: ChatItem[] = [
  {
    id: "1",
    name: "EasyDo AI",
    avatar: "/api/placeholder/40/40",
    lastMessage: "It's time to punch in from Innov8 Solution...",
    timestamp: "2:25 PM",
    unreadCount: 486,
    isGroup: false,
    tags: [],
  },
  {
    id: "2",
    name: "Bug Resolve 2025",
    avatar: "",
    lastMessage: "This message was deleted",
    timestamp: "1:58 PM",
    unreadCount: 19,
    isGroup: true,
    tags: ["GROUP CHAT", "#LIBERTY"],
  },
  {
    id: "3",
    name: "~Chinmay Banerjee (+91...",
    avatar: "/api/placeholder/40/40",
    lastMessage: "👁️ Meet",
    timestamp: "11:31 AM",
    unreadCount: 47,
    isGroup: false,
    tags: [],
  },
  {
    id: "4",
    name: "~Amulya Kumar Kar (+91...",
    avatar: "/api/placeholder/40/40",
    lastMessage: "🏃 Attendance",
    timestamp: "10:12 AM",
    unreadCount: 2,
    isGroup: false,
    tags: [],
  },
  {
    id: "5",
    name: "~Bholanath Pal (983607...",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Good Morning all",
    timestamp: "9:45 AM",
    unreadCount: 0,
    isGroup: false,
    tags: [],
  },
  {
    id: "6",
    name: "Priya Sharma",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Can you review the document?",
    timestamp: "8:30 AM",
    unreadCount: 3,
    isGroup: false,
    tags: [],
  },
  {
    id: "7",
    name: "Rajesh Kumar",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Thanks for the update!",
    timestamp: "8:15 AM",
    unreadCount: 1,
    isGroup: false,
    tags: [],
  },
  {
    id: "8",
    name: "Dev Team Sprint Planning",
    avatar: "",
    lastMessage: "Sprint planning starts at 10 AM",
    timestamp: "Yesterday",
    unreadCount: 3,
    isGroup: true,
    tags: ["GROUP CHAT", "#DEV"],
  },
  {
    id: "9",
    name: "Anjali Verma",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Sure, I'll send it by EOD",
    timestamp: "Yesterday",
    unreadCount: 0,
    isGroup: false,
    tags: [],
  },
  {
    id: "10",
    name: "Liberty Kolkata Daily Attendance",
    avatar: "",
    lastMessage: "Bhaskar: Good morning ! Working on ap...",
    timestamp: "Yesterday",
    unreadCount: 2,
    isGroup: true,
    tags: ["GROUP CHAT", "#LIBERTY"],
  },
  {
    id: "11",
    name: "Marketing Team",
    avatar: "",
    lastMessage: "Campaign results are looking great!",
    timestamp: "Yesterday",
    unreadCount: 5,
    isGroup: true,
    tags: ["GROUP CHAT", "#MARKETING"],
  },
  {
    id: "12",
    name: "Vikram Singh",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Let's schedule a call tomorrow",
    timestamp: "Yesterday",
    unreadCount: 0,
    isGroup: false,
    tags: [],
  },
  {
    id: "13",
    name: "Neha Patel",
    avatar: "/api/placeholder/40/40",
    lastMessage: "The files are ready for download",
    timestamp: "Yesterday",
    unreadCount: 4,
    isGroup: false,
    tags: [],
  },
  {
    id: "14",
    name: "Project Alpha Team",
    avatar: "",
    lastMessage: "Milestone 3 completed successfully!",
    timestamp: "Yesterday",
    unreadCount: 8,
    isGroup: true,
    tags: ["GROUP CHAT", "#ALPHA"],
  },
  {
    id: "15",
    name: "Suresh Gupta",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Meeting scheduled for 3 PM",
    timestamp: "Yesterday",
    unreadCount: 0,
    isGroup: false,
    tags: [],
  },
  {
    id: "16",
    name: "IntelliUI UX Designers Group",
    avatar: "",
    lastMessage: "IntelliUI: ��� I'm improving messages to...",
    timestamp: "Yesterday",
    unreadCount: 0,
    isGroup: true,
    tags: ["GROUP CHAT"],
  },
  {
    id: "17",
    name: "Ravi Mishra",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Payment processed successfully",
    timestamp: "Yesterday",
    unreadCount: 0,
    isGroup: false,
    tags: [],
  },
  {
    id: "18",
    name: "QA Testing Team",
    avatar: "",
    lastMessage: "New build is ready for testing",
    timestamp: "Yesterday",
    unreadCount: 12,
    isGroup: true,
    tags: ["GROUP CHAT", "#QA"],
  },
  {
    id: "19",
    name: "Kavita Rao",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Documents uploaded to shared folder",
    timestamp: "2 days ago",
    unreadCount: 0,
    isGroup: false,
    tags: [],
  },
  {
    id: "20",
    name: "EasyDo Marketing 2024",
    avatar: "",
    lastMessage: "Bhaskar Ghosh found: it .",
    timestamp: "2 days ago",
    unreadCount: 0,
    isGroup: true,
    tags: ["GROUP CHAT"],
  },
  {
    id: "21",
    name: "Deepak Joshi",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Great work on the presentation!",
    timestamp: "2 days ago",
    unreadCount: 2,
    isGroup: false,
    tags: [],
  },
  {
    id: "22",
    name: "HR Announcements",
    avatar: "",
    lastMessage: "New policy updates available",
    timestamp: "2 days ago",
    unreadCount: 1,
    isGroup: true,
    tags: ["GROUP CHAT", "#HR"],
  },
  {
    id: "23",
    name: "Aditi Kapoor",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Budget approval received",
    timestamp: "2 days ago",
    unreadCount: 0,
    isGroup: false,
    tags: [],
  },
  {
    id: "24",
    name: "Client Support Team",
    avatar: "",
    lastMessage: "Ticket #1234 resolved",
    timestamp: "2 days ago",
    unreadCount: 3,
    isGroup: true,
    tags: ["GROUP CHAT", "#SUPPORT"],
  },
  {
    id: "25",
    name: "Manish Agarwal",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Invoice sent for approval",
    timestamp: "2 days ago",
    unreadCount: 0,
    isGroup: false,
    tags: [],
  },
  {
    id: "26",
    name: "Liberty Ahmedabad Daily Atten...",
    avatar: "",
    lastMessage: "Dev: The links have steps to follow to Integr...",
    timestamp: "3 days ago",
    unreadCount: 0,
    isGroup: true,
    tags: ["GROUP CHAT", "#LIBERTY"],
  },
  {
    id: "27",
    name: "Pooja Reddy",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Training session was very helpful",
    timestamp: "3 days ago",
    unreadCount: 1,
    isGroup: false,
    tags: [],
  },
  {
    id: "28",
    name: "Finance Team Updates",
    avatar: "",
    lastMessage: "Q4 reports are now available",
    timestamp: "3 days ago",
    unreadCount: 2,
    isGroup: true,
    tags: ["GROUP CHAT", "#FINANCE"],
  },
  {
    id: "29",
    name: "Rohit Sharma",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Server maintenance completed",
    timestamp: "3 days ago",
    unreadCount: 0,
    isGroup: false,
    tags: [],
  },
  {
    id: "30",
    name: "Product Development",
    avatar: "",
    lastMessage: "Feature release scheduled for Monday",
    timestamp: "3 days ago",
    unreadCount: 7,
    isGroup: true,
    tags: ["GROUP CHAT", "#PRODUCT"],
  },
  {
    id: "31",
    name: "Sita Devi",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Vendor contract signed",
    timestamp: "3 days ago",
    unreadCount: 0,
    isGroup: false,
    tags: [],
  },
  {
    id: "32",
    name: "Sales Team Discussion",
    avatar: "",
    lastMessage: "Monthly targets achieved!",
    timestamp: "4 days ago",
    unreadCount: 4,
    isGroup: true,
    tags: ["GROUP CHAT", "#SALES"],
  },
  {
    id: "33",
    name: "Amit Sinha",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Database backup completed",
    timestamp: "4 days ago",
    unreadCount: 0,
    isGroup: false,
    tags: [],
  },
  {
    id: "34",
    name: "Operations Team",
    avatar: "",
    lastMessage: "Daily standup at 9 AM tomorrow",
    timestamp: "4 days ago",
    unreadCount: 1,
    isGroup: true,
    tags: ["GROUP CHAT", "#OPS"],
  },
  {
    id: "35",
    name: "Geeta Pillai",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Client feedback was positive",
    timestamp: "4 days ago",
    unreadCount: 0,
    isGroup: false,
    tags: [],
  },
  {
    id: "36",
    name: "Security Updates",
    avatar: "",
    lastMessage: "New security patches available",
    timestamp: "5 days ago",
    unreadCount: 2,
    isGroup: true,
    tags: ["GROUP CHAT", "#SECURITY"],
  },
  {
    id: "37",
    name: "Arjun Mehta",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Code review completed",
    timestamp: "5 days ago",
    unreadCount: 0,
    isGroup: false,
    tags: [],
  },
  {
    id: "38",
    name: "Design Team Sync",
    avatar: "",
    lastMessage: "Wireframes approved by client",
    timestamp: "5 days ago",
    unreadCount: 3,
    isGroup: true,
    tags: ["GROUP CHAT", "#DESIGN"],
  },
  {
    id: "39",
    name: "Lakshmi Narayan",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Project timeline updated",
    timestamp: "1 week ago",
    unreadCount: 0,
    isGroup: false,
    tags: [],
  },
  {
    id: "40",
    name: "Company All Hands",
    avatar: "",
    lastMessage: "Next all-hands meeting: March 15th",
    timestamp: "1 week ago",
    unreadCount: 15,
    isGroup: true,
    tags: ["GROUP CHAT", "#COMPANY"],
  },
  // Archived Chats
  {
    id: "41",
    name: "Old Project Beta",
    avatar: "",
    lastMessage: "Project completed successfully",
    timestamp: "2 weeks ago",
    unreadCount: 0,
    isGroup: true,
    tags: ["GROUP CHAT", "#BETA"],
    isArchived: true,
  },
  {
    id: "42",
    name: "Raghav Malhotra",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Thanks for the collaboration!",
    timestamp: "3 weeks ago",
    unreadCount: 0,
    isGroup: false,
    isArchived: true,
  },
  {
    id: "43",
    name: "Legacy System Migration",
    avatar: "",
    lastMessage: "Migration completed successfully",
    timestamp: "1 month ago",
    unreadCount: 0,
    isGroup: true,
    tags: ["GROUP CHAT", "#LEGACY"],
    isArchived: true,
  },
  {
    id: "44",
    name: "Former Client Support",
    avatar: "",
    lastMessage: "Contract ended, thanks for everything",
    timestamp: "1 month ago",
    unreadCount: 0,
    isGroup: true,
    tags: ["GROUP CHAT", "#SUPPORT"],
    isArchived: true,
  },
  {
    id: "45",
    name: "Sunita Khanna",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Will miss working together",
    timestamp: "2 months ago",
    unreadCount: 0,
    isGroup: false,
    isArchived: true,
  },
  {
    id: "46",
    name: "Closed Project Gamma",
    avatar: "",
    lastMessage: "Final deliverables submitted",
    timestamp: "2 months ago",
    unreadCount: 0,
    isGroup: true,
    tags: ["GROUP CHAT", "#GAMMA"],
    isArchived: true,
  },
];

// Unique conversation data for each contact - LONG conversations for scroll testing
const conversationData: Record<string, ChatMessage[]> = {
  "1": [
    // Lokendra Kumar - Project discussion
    {
      id: "1-1",
      text: "Hi Lokendra, how's the project going?",
      timestamp: "9:00 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "1-2",
      text: "Hello! It's going well. I've completed the initial wireframes.",
      timestamp: "9:05 AM",
      isSent: false,
    },
    {
      id: "1-3",
      text: "Great! Can you show me what you've done so far?",
      timestamp: "9:06 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "1-4",
      text: "Sure, let me share the designs with you in a moment",
      timestamp: "9:07 AM",
      isSent: false,
    },
    {
      id: "1-5",
      text: "I've been working on the user dashboard layout",
      timestamp: "9:08 AM",
      isSent: false,
    },
    {
      id: "1-6",
      text: "The main challenge was organizing all the components properly",
      timestamp: "9:09 AM",
      isSent: false,
    },
    {
      id: "1-7",
      text: "That makes sense. How did you solve it?",
      timestamp: "9:10 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "1-8",
      text: "I used a grid-based approach with responsive breakpoints",
      timestamp: "9:12 AM",
      isSent: false,
    },
    {
      id: "1-9",
      text: "Each section can collapse on mobile for better UX",
      timestamp: "9:13 AM",
      isSent: false,
    },
    {
      id: "1-10",
      text: "Smart approach! What about the color scheme?",
      timestamp: "9:15 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "1-11",
      text: "I'm following our brand guidelines with blue as primary",
      timestamp: "9:16 AM",
      isSent: false,
    },
    {
      id: "1-12",
      text: "Added some gray tones for secondary elements",
      timestamp: "9:17 AM",
      isSent: false,
    },
    {
      id: "1-13",
      text: "Perfect. When can you have the complete mockup ready?",
      timestamp: "9:20 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "1-14",
      text: "I should have it done by end of today",
      timestamp: "9:22 AM",
      isSent: false,
    },
    {
      id: "1-15",
      text: "Just need to finalize the navigation menu",
      timestamp: "9:23 AM",
      isSent: false,
    },
    {
      id: "1-16",
      text: "Excellent! Looking forward to reviewing it",
      timestamp: "9:25 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "1-17",
      text: "I'll also include the interactive prototype",
      timestamp: "9:26 AM",
      isSent: false,
    },
    {
      id: "1-18",
      text: "That would be very helpful for client presentation",
      timestamp: "9:28 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "1-19",
      text: "Absolutely! I'll make sure it covers all user flows",
      timestamp: "9:30 AM",
      isSent: false,
    },
    {
      id: "1-20",
      text: "Also working on the dark mode variant",
      timestamp: "9:31 AM",
      isSent: false,
    },
    {
      id: "1-21",
      text: "Oh that's great! Client will love that feature",
      timestamp: "9:33 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "1-22",
      text: "Yes, it's becoming quite popular these days",
      timestamp: "9:35 AM",
      isSent: false,
    },
    {
      id: "1-23",
      text: "I've tested it with different screen sizes too",
      timestamp: "9:36 AM",
      isSent: false,
    },
    {
      id: "1-24",
      text: "Thorough testing is key. Any issues found?",
      timestamp: "9:38 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "1-25",
      text: "Minor spacing issues on tablet view, but fixed now",
      timestamp: "9:40 AM",
      isSent: false,
    },
    {
      id: "1-26",
      text: "Great attention to detail!",
      timestamp: "9:42 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "1-27",
      text: "Thanks! I believe in delivering quality work",
      timestamp: "9:45 AM",
      isSent: false,
    },
    {
      id: "1-28",
      text: "That's what makes you an excellent designer",
      timestamp: "9:47 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "1-29",
      text: "I appreciate that! Means a lot coming from you",
      timestamp: "9:50 AM",
      isSent: false,
    },
    {
      id: "1-30",
      text: "By the way, should I include the onboarding flow?",
      timestamp: "9:52 AM",
      isSent: false,
    },
    {
      id: "1-31",
      text: "Yes, definitely! That's crucial for user adoption",
      timestamp: "9:55 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "1-32",
      text: "I'll make it simple and intuitive",
      timestamp: "9:57 AM",
      isSent: false,
    },
    {
      id: "1-33",
      text: "Perfect. Can you host the design on the platform we discussed?",
      timestamp: "10:00 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "1-34",
      text: "can you host your design on https://scrod.com/ for me?",
      timestamp: "6:43 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "1-35",
      text: "I mean the Easy Do Web App",
      timestamp: "6:43 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "1-36",
      text: "Sure, I'll upload it there right after completion",
      timestamp: "11:00 AM",
      isSent: false,
    },
    {
      id: "1-37",
      text: "After that please share that link also",
      timestamp: "11:45 AM",
      isSent: false,
    },
  ],

  "2": [
    // Liberty Kolkata Daily Attendance - Group chat
    {
      id: "2-1",
      text: "Good morning everyone! Time for daily attendance",
      timestamp: "8:00 AM",
      isSent: false,
    },
    {
      id: "2-2",
      text: "Present ✅",
      timestamp: "8:01 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "2-3",
      text: "Rajesh: Present ✅",
      timestamp: "8:02 AM",
      isSent: false,
    },
    { id: "2-4", text: "Priya: Here ✅", timestamp: "8:03 AM", isSent: false },
    {
      id: "2-5",
      text: "Amit: Present ✅",
      timestamp: "8:05 AM",
      isSent: false,
    },
    {
      id: "2-6",
      text: "Sarah: Present ✅",
      timestamp: "8:07 AM",
      isSent: false,
    },
    {
      id: "2-7",
      text: "Today's agenda: Project status review",
      timestamp: "8:10 AM",
      isSent: false,
    },
    {
      id: "2-8",
      text: "Meeting room A at 10 AM",
      timestamp: "8:11 AM",
      isSent: false,
    },
    {
      id: "2-9",
      text: "Don't forget to bring your laptops",
      timestamp: "8:12 AM",
      isSent: false,
    },
    {
      id: "2-10",
      text: "Will the client be joining us?",
      timestamp: "8:15 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "2-11",
      text: "Yes, they'll join virtually at 10:30 AM",
      timestamp: "8:16 AM",
      isSent: false,
    },
    {
      id: "2-12",
      text: "Bhaskar: I'll prepare the presentation",
      timestamp: "8:20 AM",
      isSent: false,
    },
    {
      id: "2-13",
      text: "Great! Include the latest metrics",
      timestamp: "8:22 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "2-14",
      text: "Will do. Performance has improved 25%",
      timestamp: "8:25 AM",
      isSent: false,
    },
    {
      id: "2-15",
      text: "That's excellent progress!",
      timestamp: "8:27 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "2-16",
      text: "Team effort paid off well",
      timestamp: "8:30 AM",
      isSent: false,
    },
    {
      id: "2-17",
      text: "Priya: What about the new features?",
      timestamp: "8:32 AM",
      isSent: false,
    },
    {
      id: "2-18",
      text: "They're in testing phase",
      timestamp: "8:35 AM",
      isSent: false,
    },
    {
      id: "2-19",
      text: "QA team found any issues?",
      timestamp: "8:37 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "2-20",
      text: "Minor bugs, already fixed",
      timestamp: "8:40 AM",
      isSent: false,
    },
    {
      id: "2-21",
      text: "Ready for deployment next week",
      timestamp: "8:42 AM",
      isSent: false,
    },
    {
      id: "2-22",
      text: "Perfect timing for the quarterly review",
      timestamp: "8:45 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "2-23",
      text: "Amit: Should we update the documentation?",
      timestamp: "8:47 AM",
      isSent: false,
    },
    {
      id: "2-24",
      text: "Yes, please update it before deployment",
      timestamp: "8:50 AM",
      isSent: false,
    },
    {
      id: "2-25",
      text: "I'll handle the user guide updates",
      timestamp: "8:52 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "2-26",
      text: "Thanks! That would be very helpful",
      timestamp: "8:55 AM",
      isSent: false,
    },
    {
      id: "2-27",
      text: "Sarah: What about training for new features?",
      timestamp: "9:00 AM",
      isSent: false,
    },
    {
      id: "2-28",
      text: "Good point. Let's schedule training sessions",
      timestamp: "9:02 AM",
      isSent: false,
    },
    {
      id: "2-29",
      text: "I can help with that",
      timestamp: "9:05 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "2-30",
      text: "Excellent! Team collaboration at its best",
      timestamp: "9:07 AM",
      isSent: false,
    },
    {
      id: "2-31",
      text: "By the way, lunch meeting today at 1 PM",
      timestamp: "9:10 AM",
      isSent: false,
    },
    {
      id: "2-32",
      text: "Count me in!",
      timestamp: "9:12 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "2-33",
      text: "Bhaskar: Good morning ! Working on ap...",
      timestamp: "10:47 AM",
      isSent: false,
    },
  ],

  "3": [
    // IntelliUI UX Designers Group
    {
      id: "3-1",
      text: "Hey designers! New project brief is ready",
      timestamp: "9:00 AM",
      isSent: false,
    },
    {
      id: "3-2",
      text: "Excited to see what we're working on!",
      timestamp: "9:02 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "3-3",
      text: "It's a fintech mobile app for millennials",
      timestamp: "9:05 AM",
      isSent: false,
    },
    {
      id: "3-4",
      text: "Focus on clean, modern interface",
      timestamp: "9:06 AM",
      isSent: false,
    },
    {
      id: "3-5",
      text: "Love working on fintech projects!",
      timestamp: "9:08 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "3-6",
      text: "Same here! The challenge is always interesting",
      timestamp: "9:10 AM",
      isSent: false,
    },
    {
      id: "3-7",
      text: "Maria: What's the timeline looking like?",
      timestamp: "9:12 AM",
      isSent: false,
    },
    {
      id: "3-8",
      text: "We have 6 weeks for the complete design",
      timestamp: "9:15 AM",
      isSent: false,
    },
    {
      id: "3-9",
      text: "That's reasonable for a comprehensive app",
      timestamp: "9:17 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "3-10",
      text: "User research phase: 1 week",
      timestamp: "9:20 AM",
      isSent: false,
    },
    {
      id: "3-11",
      text: "Wireframing: 2 weeks",
      timestamp: "9:21 AM",
      isSent: false,
    },
    {
      id: "3-12",
      text: "Visual design: 2 weeks",
      timestamp: "9:22 AM",
      isSent: false,
    },
    {
      id: "3-13",
      text: "Prototyping and testing: 1 week",
      timestamp: "9:23 AM",
      isSent: false,
    },
    {
      id: "3-14",
      text: "Sounds like a solid plan",
      timestamp: "9:25 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "3-15",
      text: "Alex: Should we start with user personas?",
      timestamp: "9:27 AM",
      isSent: false,
    },
    {
      id: "3-16",
      text: "Absolutely! That's our foundation",
      timestamp: "9:30 AM",
      isSent: false,
    },
    {
      id: "3-17",
      text: "I'll coordinate with the research team",
      timestamp: "9:32 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "3-18",
      text: "Perfect! Let's schedule a kickoff meeting",
      timestamp: "9:35 AM",
      isSent: false,
    },
    {
      id: "3-19",
      text: "Tomorrow 2 PM works for everyone?",
      timestamp: "9:37 AM",
      isSent: false,
    },
    {
      id: "3-20",
      text: "Works for me!",
      timestamp: "9:40 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "3-21",
      text: "Maria: I'm in too",
      timestamp: "9:42 AM",
      isSent: false,
    },
    {
      id: "3-22",
      text: "Alex: Same here",
      timestamp: "9:45 AM",
      isSent: false,
    },
    {
      id: "3-23",
      text: "Great! I'll send calendar invites",
      timestamp: "9:47 AM",
      isSent: false,
    },
    {
      id: "3-24",
      text: "Should we prepare anything specific?",
      timestamp: "9:50 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "3-25",
      text: "Bring your initial thoughts and references",
      timestamp: "9:52 AM",
      isSent: false,
    },
    {
      id: "3-26",
      text: "I'll gather some fintech app inspirations",
      timestamp: "9:55 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "3-27",
      text: "Excellent idea! Competitive analysis helps",
      timestamp: "9:57 AM",
      isSent: false,
    },
    {
      id: "3-28",
      text: "I'll look into accessibility standards too",
      timestamp: "10:00 AM",
      isSent: false,
    },
    {
      id: "3-29",
      text: "That's crucial for inclusive design",
      timestamp: "10:02 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "3-30",
      text: "Maria: What about design system integration?",
      timestamp: "10:05 AM",
      isSent: false,
    },
    {
      id: "3-31",
      text: "We'll need to adapt our existing system",
      timestamp: "10:07 AM",
      isSent: false,
    },
    {
      id: "3-32",
      text: "I can work on component modifications",
      timestamp: "10:10 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "3-33",
      text: "IntelliUI: 📄 I'm improving messages to...",
      timestamp: "10:15 AM",
      isSent: false,
    },
  ],

  "4": [
    // Liberty Righrise Private Limited
    {
      id: "4-1",
      text: "Board meeting notes are ready for review",
      timestamp: "10:00 AM",
      isSent: false,
    },
    {
      id: "4-2",
      text: "Thanks! I'll review them shortly",
      timestamp: "10:05 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "4-3",
      text: "Q3 numbers look promising",
      timestamp: "10:10 AM",
      isSent: false,
    },
    {
      id: "4-4",
      text: "That's great news! What's the growth rate?",
      timestamp: "10:12 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "4-5",
      text: "15% increase from last quarter",
      timestamp: "10:15 AM",
      isSent: false,
    },
    {
      id: "4-6",
      text: "Impressive! Which sectors contributed most?",
      timestamp: "10:17 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "4-7",
      text: "Technology and healthcare led the growth",
      timestamp: "10:20 AM",
      isSent: false,
    },
    {
      id: "4-8",
      text: "Makes sense given current market trends",
      timestamp: "10:22 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "4-9",
      text: "Remote work solutions were particularly strong",
      timestamp: "10:25 AM",
      isSent: false,
    },
    {
      id: "4-10",
      text: "Perfect timing with our digital transformation",
      timestamp: "10:27 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "4-11",
      text: "Exactly! Our investment in tech is paying off",
      timestamp: "10:30 AM",
      isSent: false,
    },
    {
      id: "4-12",
      text: "What about the new product line?",
      timestamp: "10:32 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "4-13",
      text: "Beta testing results exceeded expectations",
      timestamp: "10:35 AM",
      isSent: false,
    },
    {
      id: "4-14",
      text: "When are we planning the full launch?",
      timestamp: "10:37 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "4-15",
      text: "Target date is next month",
      timestamp: "10:40 AM",
      isSent: false,
    },
    {
      id: "4-16",
      text: "Marketing team ready for the campaign?",
      timestamp: "10:42 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "4-17",
      text: "Yes, campaigns are finalized and scheduled",
      timestamp: "10:45 AM",
      isSent: false,
    },
    {
      id: "4-18",
      text: "Excellent coordination across teams",
      timestamp: "10:47 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "4-19",
      text: "Collaboration has been outstanding",
      timestamp: "10:50 AM",
      isSent: false,
    },
    {
      id: "4-20",
      text: "Any concerns we should address?",
      timestamp: "10:52 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "4-21",
      text: "Supply chain might need monitoring",
      timestamp: "10:55 AM",
      isSent: false,
    },
    {
      id: "4-22",
      text: "I'll coordinate with operations on that",
      timestamp: "10:57 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "4-23",
      text: "Also, customer support scaling up",
      timestamp: "11:00 AM",
      isSent: false,
    },
    {
      id: "4-24",
      text: "Good thinking ahead! Training in progress?",
      timestamp: "11:02 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "4-25",
      text: "Yes, new team members start next week",
      timestamp: "11:05 AM",
      isSent: false,
    },
    {
      id: "4-26",
      text: "Perfect timing with product launch",
      timestamp: "11:07 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "4-27",
      text: "Strategic planning is really showing results",
      timestamp: "11:10 AM",
      isSent: false,
    },
    {
      id: "4-28",
      text: "Team deserves credit for execution",
      timestamp: "11:12 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "4-29",
      text: "Speaking of which, need design updates",
      timestamp: "11:15 AM",
      isSent: false,
    },
    {
      id: "4-30",
      text: "What kind of updates are needed?",
      timestamp: "11:17 AM",
      isSent: true,
      isRead: true,
    },
    { id: "4-31", text: "Old design", timestamp: "Yesterday", isSent: false },
  ],

  "5": [
    // EasyDo Marketing 2024
    {
      id: "5-1",
      text: "Campaign performance update is ready",
      timestamp: "9:30 AM",
      isSent: false,
    },
    {
      id: "5-2",
      text: "Great! How are we performing this quarter?",
      timestamp: "9:32 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "5-3",
      text: "Social media engagement up 40%",
      timestamp: "9:35 AM",
      isSent: false,
    },
    {
      id: "5-4",
      text: "That's fantastic! Which platform performed best?",
      timestamp: "9:37 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "5-5",
      text: "LinkedIn and Instagram leading",
      timestamp: "9:40 AM",
      isSent: false,
    },
    {
      id: "5-6",
      text: "Makes sense for our B2B focus",
      timestamp: "9:42 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "5-7",
      text: "Video content generated most engagement",
      timestamp: "9:45 AM",
      isSent: false,
    },
    {
      id: "5-8",
      text: "Should we increase video production?",
      timestamp: "9:47 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "5-9",
      text: "Definitely! ROI is excellent",
      timestamp: "9:50 AM",
      isSent: false,
    },
    {
      id: "5-10",
      text: "I'll work with creative team on budget",
      timestamp: "9:52 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "5-11",
      text: "Email campaigns also showing improvement",
      timestamp: "9:55 AM",
      isSent: false,
    },
    {
      id: "5-12",
      text: "What's the open rate looking like?",
      timestamp: "9:57 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "5-13",
      text: "22% average, up from 18% last quarter",
      timestamp: "10:00 AM",
      isSent: false,
    },
    {
      id: "5-14",
      text: "Excellent! Personalization is working",
      timestamp: "10:02 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "5-15",
      text: "AI-driven content suggestions helped",
      timestamp: "10:05 AM",
      isSent: false,
    },
    {
      id: "5-16",
      text: "Technology investment paying off",
      timestamp: "10:07 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "5-17",
      text: "What about lead generation numbers?",
      timestamp: "10:10 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "5-18",
      text: "35% increase in qualified leads",
      timestamp: "10:12 AM",
      isSent: false,
    },
    {
      id: "5-19",
      text: "Sales team must be happy!",
      timestamp: "10:15 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "5-20",
      text: "Yes, conversion rates improved too",
      timestamp: "10:17 AM",
      isSent: false,
    },
    {
      id: "5-21",
      text: "Marketing and sales alignment working",
      timestamp: "10:20 AM",
      isSent: false,
    },
    {
      id: "5-22",
      text: "That collaboration was crucial",
      timestamp: "10:22 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "5-23",
      text: "Weekly meetings made a difference",
      timestamp: "10:25 AM",
      isSent: false,
    },
    {
      id: "5-24",
      text: "Should we continue that cadence?",
      timestamp: "10:27 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "5-25",
      text: "Absolutely! Communication is key",
      timestamp: "10:30 AM",
      isSent: false,
    },
    {
      id: "5-26",
      text: "Any new initiatives for next quarter?",
      timestamp: "10:32 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "5-27",
      text: "Planning influencer partnerships",
      timestamp: "10:35 AM",
      isSent: false,
    },
    {
      id: "5-28",
      text: "Interesting! Which industry verticals?",
      timestamp: "10:37 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "5-29",
      text: "Tech and business thought leaders",
      timestamp: "10:40 AM",
      isSent: false,
    },
    {
      id: "5-30",
      text: "Perfect fit for our audience",
      timestamp: "10:42 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "5-31",
      text: "Bhaskar Ghosh found: it .",
      timestamp: "Yesterday",
      isSent: false,
    },
  ],

  "6": [
    // Bhaskar Ghosh
    {
      id: "6-1",
      text: "Hey! How's the development going?",
      timestamp: "2:00 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "6-2",
      text: "Pretty good! Just finished the authentication module",
      timestamp: "2:05 PM",
      isSent: false,
    },
    {
      id: "6-3",
      text: "Awesome! Any challenges you faced?",
      timestamp: "2:07 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "6-4",
      text: "OAuth integration was tricky, but got it working",
      timestamp: "2:10 PM",
      isSent: false,
    },
    {
      id: "6-5",
      text: "OAuth can be complex. Which providers?",
      timestamp: "2:12 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "6-6",
      text: "Google, GitHub, and Microsoft",
      timestamp: "2:15 PM",
      isSent: false,
    },
    {
      id: "6-7",
      text: "Great coverage! Users will appreciate options",
      timestamp: "2:17 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "6-8",
      text: "Exactly what I was thinking",
      timestamp: "2:20 PM",
      isSent: false,
    },
    {
      id: "6-9",
      text: "What's next on your development roadmap?",
      timestamp: "2:22 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "6-10",
      text: "Working on the dashboard API endpoints",
      timestamp: "2:25 PM",
      isSent: false,
    },
    {
      id: "6-11",
      text: "RESTful or GraphQL approach?",
      timestamp: "2:27 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "6-12",
      text: "Going with GraphQL for better flexibility",
      timestamp: "2:30 PM",
      isSent: false,
    },
    {
      id: "6-13",
      text: "Smart choice! Especially for complex queries",
      timestamp: "2:32 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "6-14",
      text: "Performance optimization will be easier too",
      timestamp: "2:35 PM",
      isSent: false,
    },
    {
      id: "6-15",
      text: "Absolutely! Are you using any caching layer?",
      timestamp: "2:37 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "6-16",
      text: "Redis for session management and query caching",
      timestamp: "2:40 PM",
      isSent: false,
    },
    {
      id: "6-17",
      text: "Perfect setup! How's the database design?",
      timestamp: "2:42 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "6-18",
      text: "Using PostgreSQL with proper indexing",
      timestamp: "2:45 PM",
      isSent: false,
    },
    {
      id: "6-19",
      text: "Excellent choice for data integrity",
      timestamp: "2:47 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "6-20",
      text: "Yeah, ACID compliance is important for us",
      timestamp: "2:50 PM",
      isSent: false,
    },
    {
      id: "6-21",
      text: "Speaking of which, backup strategy in place?",
      timestamp: "2:52 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "6-22",
      text: "Daily automated backups to cloud storage",
      timestamp: "2:55 PM",
      isSent: false,
    },
    {
      id: "6-23",
      text: "Great planning! You're thinking ahead",
      timestamp: "2:57 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "6-24",
      text: "Learned from previous projects 😅",
      timestamp: "3:00 PM",
      isSent: false,
    },
    {
      id: "6-25",
      text: "Experience is the best teacher!",
      timestamp: "3:02 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "6-26",
      text: "By the way, found an interesting article",
      timestamp: "3:05 PM",
      isSent: false,
    },
    {
      id: "6-27",
      text: "About GraphQL optimization techniques",
      timestamp: "3:06 PM",
      isSent: false,
    },
    {
      id: "6-28",
      text: "Oh cool! Please share it",
      timestamp: "3:08 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "6-29",
      text: "📄 https://www.youtube.com/watch?v=sSE...",
      timestamp: "Yesterday",
      isSent: false,
    },
  ],

  "7": [
    // EasyDo Web App - Lokendra
    {
      id: "7-1",
      text: "Status update on the web app redesign",
      timestamp: "11:00 AM",
      isSent: false,
    },
    {
      id: "7-2",
      text: "Perfect timing! How's progress?",
      timestamp: "11:02 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "7-3",
      text: "Frontend components are 80% complete",
      timestamp: "11:05 AM",
      isSent: false,
    },
    {
      id: "7-4",
      text: "That's great progress! Which components left?",
      timestamp: "11:07 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "7-5",
      text: "Settings page and user profile sections",
      timestamp: "11:10 AM",
      isSent: false,
    },
    {
      id: "7-6",
      text: "Those are usually the most complex",
      timestamp: "11:12 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "7-7",
      text: "Exactly! Lots of form validations",
      timestamp: "11:15 AM",
      isSent: false,
    },
    {
      id: "7-8",
      text: "Are you using a form library?",
      timestamp: "11:17 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "7-9",
      text: "React Hook Form with Zod validation",
      timestamp: "11:20 AM",
      isSent: false,
    },
    {
      id: "7-10",
      text: "Excellent choice! Very performant",
      timestamp: "11:22 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "7-11",
      text: "Much better than previous form libs",
      timestamp: "11:25 AM",
      isSent: false,
    },
    {
      id: "7-12",
      text: "How's the responsive design coming along?",
      timestamp: "11:27 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "7-13",
      text: "Mobile-first approach working well",
      timestamp: "11:30 AM",
      isSent: false,
    },
    {
      id: "7-14",
      text: "Smart! Mobile usage is majority now",
      timestamp: "11:32 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "7-15",
      text: "Tailwind CSS makes responsive design easy",
      timestamp: "11:35 AM",
      isSent: false,
    },
    {
      id: "7-16",
      text: "Love the utility-first approach!",
      timestamp: "11:37 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "7-17",
      text: "Development speed increased significantly",
      timestamp: "11:40 AM",
      isSent: false,
    },
    {
      id: "7-18",
      text: "That's one of its biggest advantages",
      timestamp: "11:42 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "7-19",
      text: "What about testing coverage?",
      timestamp: "11:45 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "7-20",
      text: "Unit tests at 85%, integration at 70%",
      timestamp: "11:47 AM",
      isSent: false,
    },
    {
      id: "7-21",
      text: "Solid coverage! Which testing framework?",
      timestamp: "11:50 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "7-22",
      text: "Vitest for unit, Cypress for E2E",
      timestamp: "11:52 AM",
      isSent: false,
    },
    {
      id: "7-23",
      text: "Modern stack! How's performance?",
      timestamp: "11:55 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "7-24",
      text: "Lighthouse scores all above 90",
      timestamp: "11:57 AM",
      isSent: false,
    },
    {
      id: "7-25",
      text: "Outstanding! Users will love the speed",
      timestamp: "12:00 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "7-26",
      text: "Code splitting and lazy loading helped",
      timestamp: "12:02 PM",
      isSent: false,
    },
    {
      id: "7-27",
      text: "Smart optimizations! Bundle size?",
      timestamp: "12:05 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "7-28",
      text: "Initial load under 200KB gzipped",
      timestamp: "12:07 PM",
      isSent: false,
    },
    {
      id: "7-29",
      text: "Impressive! Great work on optimization",
      timestamp: "12:10 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "7-30",
      text: "lokendra: 58 image",
      timestamp: "Yesterday",
      isSent: false,
    },
  ],

  "8": [
    // Easy Do SIX
    {
      id: "8-1",
      text: "Team meeting recap from this morning",
      timestamp: "1:00 PM",
      isSent: false,
    },
    {
      id: "8-2",
      text: "Thanks for sharing! Key highlights?",
      timestamp: "1:02 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "8-3",
      text: "Sprint 6 completed successfully",
      timestamp: "1:05 PM",
      isSent: false,
    },
    {
      id: "8-4",
      text: "Great! Did we meet all the sprint goals?",
      timestamp: "1:07 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "8-5",
      text: "Yes, all user stories completed",
      timestamp: "1:10 PM",
      isSent: false,
    },
    {
      id: "8-6",
      text: "Excellent team performance!",
      timestamp: "1:12 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "8-7",
      text: "Quality assurance found minimal bugs",
      timestamp: "1:15 PM",
      isSent: false,
    },
    {
      id: "8-8",
      text: "That shows good development practices",
      timestamp: "1:17 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "8-9",
      text: "Code reviews have been thorough",
      timestamp: "1:20 PM",
      isSent: false,
    },
    {
      id: "8-10",
      text: "Peer review process really helps",
      timestamp: "1:22 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "8-11",
      text: "Team collaboration is outstanding",
      timestamp: "1:25 PM",
      isSent: false,
    },
    {
      id: "8-12",
      text: "What's planned for Sprint 7?",
      timestamp: "1:27 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "8-13",
      text: "Focus on mobile app performance",
      timestamp: "1:30 PM",
      isSent: false,
    },
    {
      id: "8-14",
      text: "Good priority! Any specific areas?",
      timestamp: "1:32 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "8-15",
      text: "Database query optimization mainly",
      timestamp: "1:35 PM",
      isSent: false,
    },
    {
      id: "8-16",
      text: "Smart focus. Impact on load times?",
      timestamp: "1:37 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "8-17",
      text: "Targeting 30% improvement",
      timestamp: "1:40 PM",
      isSent: false,
    },
    {
      id: "8-18",
      text: "Ambitious but achievable goal",
      timestamp: "1:42 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "8-19",
      text: "Team is confident about delivery",
      timestamp: "1:45 PM",
      isSent: false,
    },
    {
      id: "8-20",
      text: "That confidence comes from experience",
      timestamp: "1:47 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "8-21",
      text: "Previous sprints built good momentum",
      timestamp: "1:50 PM",
      isSent: false,
    },
    {
      id: "8-22",
      text: "Momentum is crucial for team success",
      timestamp: "1:52 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "8-23",
      text: "Any blockers we should be aware of?",
      timestamp: "1:55 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "8-24",
      text: "None currently, all systems green",
      timestamp: "1:57 PM",
      isSent: false,
    },
    {
      id: "8-25",
      text: "Perfect! Proactive problem solving works",
      timestamp: "2:00 PM",
      isSent: true,
      isRead: true,
    },
    {
      id: "8-26",
      text: "Daily standups help catch issues early",
      timestamp: "2:02 PM",
      isSent: false,
    },
    {
      id: "8-27",
      text: "Communication is definitely key",
      timestamp: "2:05 PM",
      isSent: true,
      isRead: true,
    },
    { id: "8-28", text: "Ravi Mishra", timestamp: "Yesterday", isSent: false },
  ],

  "9": [
    // Liberty Ahmedabad Daily Atten...
    {
      id: "9-1",
      text: "Daily attendance tracking is live",
      timestamp: "8:30 AM",
      isSent: false,
    },
    {
      id: "9-2",
      text: "Excellent! How's the adoption rate?",
      timestamp: "8:32 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "9-3",
      text: "95% of team using it consistently",
      timestamp: "8:35 AM",
      isSent: false,
    },
    {
      id: "9-4",
      text: "That's fantastic engagement!",
      timestamp: "8:37 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "9-5",
      text: "Mobile app makes it very convenient",
      timestamp: "8:40 AM",
      isSent: false,
    },
    {
      id: "9-6",
      text: "Convenience drives adoption",
      timestamp: "8:42 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "9-7",
      text: "Geofencing feature works perfectly",
      timestamp: "8:45 AM",
      isSent: false,
    },
    {
      id: "9-8",
      text: "Good to ensure location accuracy",
      timestamp: "8:47 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "9-9",
      text: "HR department loves the automation",
      timestamp: "8:50 AM",
      isSent: false,
    },
    {
      id: "9-10",
      text: "Reduces manual tracking significantly",
      timestamp: "8:52 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "9-11",
      text: "Reports generation is also automated",
      timestamp: "8:55 AM",
      isSent: false,
    },
    {
      id: "9-12",
      text: "Perfect! How often are reports generated?",
      timestamp: "8:57 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "9-13",
      text: "Daily, weekly, and monthly options",
      timestamp: "9:00 AM",
      isSent: false,
    },
    {
      id: "9-14",
      text: "Flexible reporting is important",
      timestamp: "9:02 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "9-15",
      text: "Managers can access real-time data",
      timestamp: "9:05 AM",
      isSent: false,
    },
    {
      id: "9-16",
      text: "Real-time visibility helps management",
      timestamp: "9:07 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "9-17",
      text: "Dashboard shows attendance patterns",
      timestamp: "9:10 AM",
      isSent: false,
    },
    {
      id: "9-18",
      text: "Analytics help identify trends",
      timestamp: "9:12 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "9-19",
      text: "Yes, very useful for planning",
      timestamp: "9:15 AM",
      isSent: false,
    },
    {
      id: "9-20",
      text: "Any integration challenges?",
      timestamp: "9:17 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "9-21",
      text: "Smooth integration with payroll system",
      timestamp: "9:20 AM",
      isSent: false,
    },
    {
      id: "9-22",
      text: "That saves a lot of manual work",
      timestamp: "9:22 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "9-23",
      text: "Exactly! Accuracy improved too",
      timestamp: "9:25 AM",
      isSent: false,
    },
    {
      id: "9-24",
      text: "Automation reduces human errors",
      timestamp: "9:27 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "9-25",
      text: "Team feedback has been very positive",
      timestamp: "9:30 AM",
      isSent: false,
    },
    {
      id: "9-26",
      text: "User satisfaction is most important",
      timestamp: "9:32 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "9-27",
      text: "Planning to add more features soon",
      timestamp: "9:35 AM",
      isSent: false,
    },
    {
      id: "9-28",
      text: "What kind of features are planned?",
      timestamp: "9:37 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "9-29",
      text: "Leave management and approval workflow",
      timestamp: "9:40 AM",
      isSent: false,
    },
    {
      id: "9-30",
      text: "Comprehensive HR solution in making",
      timestamp: "9:42 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "9-31",
      text: "Dev: The links have steps to follow to Integr...",
      timestamp: "Yesterday",
      isSent: false,
    },
  ],
};

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
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  hideHeader?: boolean;
}> = ({
  chatItems,
  selectedChat,
  onChatSelect,
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  hideHeader = false,
}) => {
  const filterTabs = ["All", "Unread", "Groups", "Labels", "Archived"];
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Calculate counts for each filter
  const getFilterCount = (filter: string) => {
    switch (filter) {
      case "All":
        return chatItems.filter((chat) => !chat.isArchived).length;
      case "Unread":
        return chatItems.filter(
          (chat) => !chat.isArchived && chat.unreadCount > 0,
        ).length;
      case "Groups":
        return chatItems.filter((chat) => !chat.isArchived && chat.isGroup)
          .length;
      case "Labels":
        return chatItems.filter(
          (chat) => !chat.isArchived && chat.tags && chat.tags.length > 0,
        ).length;
      case "Archived":
        return chatItems.filter((chat) => chat.isArchived === true).length;
      default:
        return 0;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Search Bar - matching screenshot */}
      {!hideHeader && (
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search or start a new chat"
              className="pl-10 bg-gray-50 border-gray-200 h-10 rounded-lg"
            />
          </div>
        </div>
      )}

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
                {getInitials(chat.name)}
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
                    {chat.unreadCount > 999 ? "999+" : chat.unreadCount}
                  </Badge>
                )}
              </div>

              {chat.tags && chat.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {chat.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      className={cn(
                        "text-xs px-2 py-0.5 text-white font-medium",
                        tag.startsWith("#")
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-800 hover:bg-gray-900",
                      )}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatConversation: React.FC<{
  selectedChat: ChatItem | null;
  messages: ChatMessage[];
  messageText: string;
  onMessageChange: (text: string) => void;
  onSendMessage: () => void;
  onOpenActions: () => void;
  hideHeader?: boolean;
}> = ({
  selectedChat,
  messages,
  messageText,
  onMessageChange,
  onSendMessage,
  onOpenActions,
  hideHeader = false,
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
            <ReactiveMultilingualText translationKey="selectChatToStart" />
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
      {!hideHeader && (
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white">
          <Avatar className="h-10 w-10">
            <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
            <AvatarFallback className="bg-gray-300 text-gray-700 text-sm">
              {getInitials(selectedChat.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="font-semibold text-gray-900">{selectedChat.name}</h2>
            <p className="text-sm text-gray-500">
              <ReactiveMultilingualText translationKey="online" />
            </p>
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
      )}

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

      {/* Action Buttons */}
      <div className="px-4 py-2 border-t border-gray-200 bg-white">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm"
          >
            <Receipt className="h-4 w-4" />
            Sales Invoice
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm"
          >
            <UserPlus className="h-4 w-4" />
            Lead
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm"
          >
            <CheckSquare className="h-4 w-4" />
            Approval
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm"
          >
            <BarChart3 className="h-4 w-4" />
            Poll
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm"
          >
            <Clock className="h-4 w-4" />
            Attendance
          </Button>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white">
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
              placeholder={getGlobalTranslation("typeAMessage")}
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
  const { t } = useGlobalTranslation();
  const filterTabs = ["All", "Unread", "Groups", "Labels", "Archived"];

  // Calculate counts for each filter
  const getFilterCount = (filter: string) => {
    switch (filter) {
      case "All":
        return chatItems.filter((chat) => !chat.isArchived).length;
      case "Unread":
        return chatItems.filter(
          (chat) => !chat.isArchived && chat.unreadCount > 0,
        ).length;
      case "Groups":
        return chatItems.filter((chat) => !chat.isArchived && chat.isGroup)
          .length;
      case "Labels":
        return chatItems.filter(
          (chat) => !chat.isArchived && chat.tags && chat.tags.length > 0,
        ).length;
      case "Archived":
        return chatItems.filter((chat) => chat.isArchived === true).length;
      default:
        return 0;
    }
  };

  return (
    <div className="h-full bg-gray-50">
      {/* Fixed Header with Original Mobile Design */}
      <div className="bg-white border-b border-gray-200 fixed top-[86px] left-0 right-0 z-20">
        {/* Title */}
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-[28px] font-black text-gray-900">
            <ReactiveMultilingualText translationKey="chats" />
          </h1>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t("search")}
              className="pl-10 rounded-lg border-gray-300 bg-gray-50"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto">
            {filterTabs.map((filter) => {
              const count = getFilterCount(filter);
              return (
                <button
                  key={filter}
                  onClick={() => onFilterChange(filter)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2",
                    selectedFilter === filter
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                  )}
                >
                  <span>{filter}</span>
                  <Badge
                    className={cn(
                      "text-xs",
                      selectedFilter === filter
                        ? "bg-white/20 text-white"
                        : "bg-blue-500 text-white",
                    )}
                  >
                    {count}
                  </Badge>
                </button>
              );
            })}
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

      {/* Scrollable Chat List Container */}
      <div className="pt-[400px] h-screen overflow-y-auto">
        <div className="bg-white min-h-full">
          {chatItems.length > 0 ? (
            chatItems.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onChatSelect(chat)}
                className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    <AvatarImage src={chat.avatar} alt={chat.name} />
                    <AvatarFallback className="bg-gray-300 text-gray-700 font-semibold">
                      {getInitials(chat.name)}
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
                        <ReactiveMultilingualText translationKey="groupChat" />
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
                <ReactiveMultilingualText
                  translationKey={
                    searchQuery ? "noChatsFound" : "noChatsAvailable"
                  }
                />
              </p>
            </div>
          )}
        </div>
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
    <div className="flex flex-col bg-white h-screen pt-[86px]">
      {/* Mobile Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white fixed top-[86px] left-0 right-0 z-20">
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
            {getInitials(selectedChat.name)}
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
      <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
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
            placeholder={getGlobalTranslation("typeHere")}
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
  // Hooks
  const location = useLocation();
  const { t } = useGlobalTranslation();
  const { isExpanded } = useSidebar();

  // For mobile: start with no chat selected (show list)
  // For desktop: start with first chat selected (show conversation)
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [messageText, setMessageText] = useState("");
  const [isActionDrawerOpen, setIsActionDrawerOpen] = useState(false);

  // Store conversations per chat - each chat has its own conversation history
  const [chatConversations, setChatConversations] =
    useState<Record<string, ChatMessage[]>>(conversationData);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Handle employee chat from navigation state
  useEffect(() => {
    const state = location.state as any;
    if (state?.openChatWithEmployee) {
      const employeeChat = state.openChatWithEmployee;

      // Check if chat already exists in chatItems
      const existingChat = chatItems.find(
        (chat) => chat.id === employeeChat.id,
      );

      if (existingChat) {
        // If chat exists, select it
        setSelectedChat(existingChat);
      } else {
        // If chat doesn't exist, create a new chat item and add it to the list
        const newEmployeeChat: ChatItem = {
          ...employeeChat,
          // Ensure all required fields are present
          isArchived: false,
        };

        // Add to chat items (you might want to persist this)
        chatItems.unshift(newEmployeeChat);
        setSelectedChat(newEmployeeChat);

        // Initialize empty conversation for this new chat
        setChatConversations((prev) => ({
          ...prev,
          [newEmployeeChat.id]: [],
        }));
      }

      // Clear the navigation state to prevent re-triggering
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Set default chat for desktop on mount
  useEffect(() => {
    const setDefaultChatForDesktop = () => {
      // Only set default chat if we're on desktop (width >= 1024px)
      if (window.innerWidth >= 1024 && !selectedChat) {
        setSelectedChat(chatItems[0]);
      }
    };

    setDefaultChatForDesktop();
    window.addEventListener("resize", setDefaultChatForDesktop);

    return () => window.removeEventListener("resize", setDefaultChatForDesktop);
  }, [selectedChat]);

  // Get messages for the currently selected chat
  const currentMessages = selectedChat
    ? chatConversations[selectedChat.id] || []
    : [];

  const handleSendMessage = () => {
    if (messageText.trim() && selectedChat) {
      const newMessage: ChatMessage = {
        id: `${selectedChat.id}-${Date.now()}`,
        text: messageText.trim(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isSent: true,
        isRead: false,
      };

      // Update the conversation for the specific chat
      setChatConversations((prev) => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage],
      }));

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
      case "All":
        // Show all non-archived chats
        return !chat.isArchived;
      case "Unread":
        // Show only non-archived chats with unread messages
        return !chat.isArchived && chat.unreadCount > 0;
      case "Groups":
        // Show only non-archived group chats
        return !chat.isArchived && chat.isGroup;
      case "Labels":
        // Show only non-archived chats that have tags/labels
        return !chat.isArchived && chat.tags && chat.tags.length > 0;
      case "Archived":
        // Show only archived chats
        return chat.isArchived === true;
      default:
        return !chat.isArchived;
    }
  });

  // Define filter tabs and count function for the desktop layout
  const filterTabs = ["All", "Unread", "Groups", "Labels", "Archived"];

  const getFilterCount = (filter: string) => {
    switch (filter) {
      case "All":
        return chatItems.filter((chat) => !chat.isArchived).length;
      case "Unread":
        return chatItems.filter(
          (chat) => !chat.isArchived && chat.unreadCount > 0,
        ).length;
      case "Groups":
        return chatItems.filter((chat) => !chat.isArchived && chat.isGroup)
          .length;
      case "Labels":
        return chatItems.filter(
          (chat) => !chat.isArchived && chat.tags && chat.tags.length > 0,
        ).length;
      case "Archived":
        return chatItems.filter((chat) => chat.isArchived === true).length;
      default:
        return 0;
    }
  };

  return (
    <>
      {/* DESKTOP LAYOUT - WhatsApp Style (Only for large screens 1024px+) */}
      <div className="hidden lg:block h-full bg-white">
        {/* Fixed Chat Subheader - Simplified to match screenshot */}
        <div
          className={cn(
            "fixed top-[86px] right-0 z-20 px-6 py-6 border-b border-gray-200 bg-white transition-all duration-300",
            isExpanded ? "left-[280px]" : "left-[103px]",
          )}
        >
          {/* Chat Title and Filter Tabs */}
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-semibold text-gray-900">Chats</h1>

            {/* Filter Tabs - matching screenshot style */}
            <div className="flex gap-2">
              {filterTabs.map((filter) => {
                const count = getFilterCount(filter);
                return (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2",
                      selectedFilter === filter
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                    )}
                  >
                    <span>{filter}</span>
                    <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div
          className="flex pt-[55px]"
          style={{ height: "calc(100vh - 55px)" }}
        >
          {/* Left Panel - Chat Contacts */}
          <div className="w-1/3 min-w-[300px] max-w-[400px]">
            <ChatContactsList
              chatItems={filteredChats}
              selectedChat={selectedChat}
              onChatSelect={setSelectedChat}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
              hideHeader={true}
            />
          </div>

          {/* Right Panel - Chat Conversation */}
          <ChatConversation
            selectedChat={selectedChat}
            messages={currentMessages}
            messageText={messageText}
            onMessageChange={setMessageText}
            onSendMessage={handleSendMessage}
            onOpenActions={() => setIsActionDrawerOpen(true)}
          />
        </div>
      </div>

      {/* MOBILE/TABLET LAYOUT - Original Design with Task Cards & Filters */}
      <div className="lg:hidden">
        {selectedChat ? (
          <MobileChatView
            selectedChat={selectedChat}
            messages={currentMessages}
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
