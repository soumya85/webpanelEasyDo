import { useState } from "react";
import {
  Menu,
  Plus,
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
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useUser, getUserInitials, getProfileImageSrc } from "@/hooks/useUser";
import { GlobalLanguageSelector } from "@/components/GlobalLanguageSelector";
import { useTranslation } from "@/hooks/useTranslation";
import { MultilingualText } from "@/components/MultilingualText";
import { CreateMenu } from "@/components/CreateMenu";

export function Header() {
  const { toggleExpanded, toggleMobile, isExpanded } = useSidebar();
  const { user, logout } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const isChatsPage = location.pathname === "/chats";
  const [selectedCompany, setSelectedCompany] = useState(
    "Liberty Highrise PVT Ltd",
  );
  const [selectedBranch, setSelectedBranch] = useState("All Branch");

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <>
      {/* Mobile/Tablet Header - Show on screens smaller than 1024px */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-[100] h-[86px] bg-white border-b border-[#E0E0E0] flex items-center justify-between px-3">
        {/* Left Controls */}
        <div className="flex items-center">
          {/* Logo and Menu Group */}
          <div className="flex items-center gap-2">
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
          </div>

          {/* Title and Button Group */}
          <div className="flex items-center gap-3 ml-3">
            {/* Dashboard Title */}
            <MultilingualText
              as="h1"
              className="text-[16px] font-black text-[#283C50] uppercase tracking-wide leading-6"
            >
              {t("dashboardTitle")}
            </MultilingualText>

            {/* Create Button */}
            <CreateMenu>
              <button className="flex items-center justify-center w-[26px] h-[24px] bg-[#4766E5] rounded-[3px] border border-[#4766E5]">
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.32812 9H8.32812V13C8.32812 13.1875 8.39323 13.3464 8.52344 13.4766C8.65365 13.6068 8.8125 13.6719 9 13.6719C9.1875 13.6719 9.34635 13.6068 9.47656 13.4766C9.60677 13.3464 9.67188 13.1875 9.67188 13V9H13.6719C13.849 9 14.0026 8.9349 14.1328 8.80469C14.263 8.67448 14.3281 8.51562 14.3281 8.32812C14.3281 8.15104 14.263 7.9974 14.1328 7.86719C14.0026 7.73698 13.849 7.67188 13.6719 7.67188H9.67188V3.67188C9.67188 3.48438 9.60677 3.32552 9.47656 3.19531C9.34635 3.0651 9.1875 3 9 3C8.8125 3 8.65365 3.0651 8.52344 3.19531C8.39323 3.32552 8.32812 3.48438 8.32812 3.67188V7.67188H4.32812C4.15104 7.67188 3.9974 7.73698 3.86719 7.86719C3.73698 7.9974 3.67188 8.15104 3.67188 8.32812C3.67188 8.51562 3.73698 8.67448 3.86719 8.80469C3.9974 8.9349 4.15104 9 4.32812 9Z"
                    fill="white"
                  />
                </svg>
              </button>
            </CreateMenu>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Language Selector - Mobile */}
          <GlobalLanguageSelector
            position="relative"
            showGlobe={false}
            size="sm"
            className="min-w-[60px]"
          />

          {/* Chat Notification */}
          <div className="relative flex items-center justify-center">
            <button
              className="flex items-center justify-center w-[22px] h-[22px]"
              onClick={() => navigate("/chats")}
            >
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
            <div className="absolute -top-1 -right-7 flex items-center justify-center min-w-[18px] h-[18px] px-1.5 py-1 bg-[#EA4D4D] rounded-full">
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

      {/* Desktop Header - Show on screens 1024px and larger */}
      <header
        className={cn(
          "hidden lg:flex fixed top-0 right-0 z-[100] h-[86px] bg-white border-b border-gray-400 items-center justify-between px-6",
          "transition-all duration-300",
          // Mobile/Tablet: always full width (left-0)
          "left-0",
          // Desktop: adjust for sidebar
          isExpanded ? "lg:left-[260px]" : "lg:left-[103px]",
        )}
      >
        {/* Left Controls */}
        <div className="flex items-center gap-0">
          {/* Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleExpanded}
            className="flex-shrink-0"
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Title */}
          <MultilingualText
            as="h1"
            className="text-xl font-black text-azure-24 uppercase tracking-wide mr-8"
          >
            {t("dashboardTitle")}
          </MultilingualText>

                    {/* Desktop Controls */}
          <div className="flex items-center gap-6">
            {/* Create Button */}
            <CreateMenu>
              <Button className="bg-primary hover:bg-primary-600 text-white px-3 h-11 gap-2">
                <Plus className="h-4 w-4" />
                <MultilingualText className="text-sm font-semibold uppercase tracking-wider">
                  {t("create")}
                </MultilingualText>
              </Button>
            </CreateMenu>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* Desktop Icons */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <GlobalLanguageSelector
              position="relative"
              showGlobe={true}
              size="sm"
              className="min-w-[120px]"
            />

            {/* Chat Notification */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate("/chats")}
            >
              <MessageSquare className="h-5 w-5 text-gray-500" />
              <NotificationBadge count={2} variant="success" />
            </Button>

            {/* Bell Notification */}
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
                  <AvatarImage src={getProfileImageSrc(user)} alt={user.name} />
                  <AvatarFallback className="bg-azure-24 text-white text-xs">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleProfileClick}>
                <MultilingualText>{t("profile")}</MultilingualText>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettingsClick}>
                <MultilingualText>{t("settings")}</MultilingualText>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogoutClick}>
                <MultilingualText>{t("logout")}</MultilingualText>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      
    </>
  );
}
