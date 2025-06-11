import { useState } from "react";
import {
  Menu,
  Plus,
  Moon,
  MessageSquare,
  Bell,
  ChevronDown,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { NotificationBadge } from "@/components/ui/notification-badge";
import { useSidebar } from "@/hooks/useSidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function Header() {
  const { toggleExpanded, toggleMobile, isExpanded } = useSidebar();
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(
    "Liberty Highrise PVT Ltd",
  );
  const [selectedBranch, setSelectedBranch] = useState("All Branch");

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 z-30 h-[86px] bg-white border-b border-gray-400 flex items-center justify-between px-6",
          "transition-all duration-300",
          // Mobile: always full width (left-0)
          "left-0",
          // Desktop: adjust for sidebar
          isExpanded ? "md:left-[280px]" : "md:left-[103px]",
        )}
      >
        {/* Left Controls */}
        <div className="flex items-center gap-6">
          {/* Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={window.innerWidth < 768 ? toggleMobile : toggleExpanded}
            className="flex-shrink-0"
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Logo - Mobile Only */}
          <div className="md:hidden">
            <img
              src="/logo-small.png"
              alt="EasyDo Logo"
              className="h-[38px] w-[38px] object-contain"
            />
          </div>

          {/* Title */}
          <h1 className="text-xl font-black text-azure-24 uppercase tracking-wide">
            Dashboard
          </h1>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-6">
            {/* Company Select */}
            <div className="flex items-center gap-4">
              <span className="text-base font-semibold text-azure-24">
                Company
              </span>
              <Select
                value={selectedCompany}
                onValueChange={setSelectedCompany}
              >
                <SelectTrigger className="w-[241px] h-11 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Liberty Highrise PVT Ltd">
                    Liberty Highrise PVT Ltd
                  </SelectItem>
                  <SelectItem value="Other Company">Other Company</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Branch Select */}
            <div className="flex items-center gap-4">
              <span className="text-base font-semibold text-azure-24">
                Branch
              </span>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="w-[149px] h-11 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Branch">All Branch</SelectItem>
                  <SelectItem value="Branch 1">Branch 1</SelectItem>
                  <SelectItem value="Branch 2">Branch 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Create Button */}
            <Button className="bg-primary hover:bg-primary-600 text-white px-4 h-11 gap-2">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Create
              </span>
            </Button>
          </div>

          {/* Mobile Create Button */}
          <Button
            size="icon"
            className="md:hidden bg-primary hover:bg-primary-600 text-white h-[38px] w-[38px]"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-6">
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-6">
            {/* Theme Toggle */}
            <Button variant="ghost" size="icon">
              <Moon className="h-5 w-5 text-gray-500" />
            </Button>

            {/* Chat Notification */}
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquare className="h-5 w-5 text-gray-500" />
              <NotificationBadge count={2} variant="success" />
            </Button>

            {/* Bell Notification */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-500" />
              <NotificationBadge count={3} variant="error" />
            </Button>
          </div>

          {/* Mobile Notifications */}
          <div className="flex md:hidden items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquare className="h-5 w-5 text-gray-500" />
              <NotificationBadge count={2} variant="success" />
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-500" />
              <NotificationBadge count={3} variant="error" />
            </Button>
          </div>

          {/* User Avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-auto p-0">
                <Avatar className="h-[21px] w-[21px]">
                  <AvatarImage src="/api/placeholder/21/21" alt="User" />
                  <AvatarFallback className="bg-azure-24 text-white text-xs">
                    BG
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile Breadcrumb Section */}
      <div
        className={cn(
          "fixed top-[86px] left-0 right-0 z-20 md:hidden bg-white border-b border-gray-200 shadow-sm",
          "transition-all duration-300",
        )}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-azure-24">
              {selectedCompany}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500 rotate-90" />
            <span className="text-gray-700">{selectedBranch}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="gap-2 text-sm border-gray-400"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Mobile Filter Dropdown */}
        {showMobileFilter && (
          <div className="bg-white border-t border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-azure-24">
                Company
              </span>
              <Select
                value={selectedCompany}
                onValueChange={setSelectedCompany}
              >
                <SelectTrigger className="w-[241px] h-11 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Liberty Highrise PVT Ltd">
                    Liberty Highrise PVT Ltd
                  </SelectItem>
                  <SelectItem value="Other Company">Other Company</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-azure-24">
                Branch
              </span>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="w-[241px] h-11 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Branch">All Branch</SelectItem>
                  <SelectItem value="Branch 1">Branch 1</SelectItem>
                  <SelectItem value="Branch 2">Branch 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
