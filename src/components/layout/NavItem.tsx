import { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { useTranslation } from "@/hooks/useTranslation";
import { MultilingualText } from "@/components/MultilingualText";
import { type TranslationKey } from "@/data/translations";

interface NavItemProps {
  icon?: LucideIcon;
  customIconUrl?: string;
  materialIcon?: string;
  labelKey: TranslationKey;
  href: string;
  badge?: number;
}

export function NavItem({
  icon: Icon,
  customIconUrl,
  materialIcon,
  labelKey,
  href,
  badge,
}: NavItemProps) {
  const location = useLocation();
  const { isExpanded, setMobileOpen } = useSidebar();
  const { t } = useTranslation();
  const isActive = location.pathname === href;

  const handleClick = () => {
    // Close mobile sidebar when navigating on mobile, tablet, and iPad
    // Use media query to ensure proper detection
    const isMobileOrTablet = window.matchMedia("(max-width: 1023px)").matches;
    if (isMobileOrTablet) {
      setMobileOpen(false);
    }
  };

  // Check if this is Employee Dashboard or Meet for larger icons
  const isEmployeeDashboard = href === "/employee-dashboard";
  const isMeet = href === "/meet";
  const shouldUseLargerIcon = isEmployeeDashboard || isMeet;

  return (
    <Link
      to={href}
      onClick={handleClick}
      className={cn(
        "flex items-center gap-4 px-4 py-3 mx-3 rounded-lg transition-colors relative",
        "hover:bg-gray-100",
        isActive
          ? "bg-primary-100 text-azure-24 border-l-4 border-primary ml-3 pl-3"
          : "text-azure-24",
        !isExpanded && "justify-center px-2",
      )}
    >
      {customIconUrl ? (
        <img
          src={customIconUrl}
          alt=""
          className={cn(
            "flex-shrink-0 object-contain",
            shouldUseLargerIcon ? "h-[24px] w-[24px]" : "h-[18px] w-[18px]",
          )}
        />
      ) : materialIcon ? (
        <span
          className={cn(
            "material-icons-outlined flex-shrink-0",
            shouldUseLargerIcon ? "text-[24px]" : "text-[18px]",
          )}
        >
          {materialIcon}
        </span>
      ) : Icon ? (
        <Icon
          className={cn(
            "flex-shrink-0",
            shouldUseLargerIcon ? "h-[24px] w-[24px]" : "h-[18px] w-[18px]",
          )}
        />
      ) : null}
      {isExpanded && (
        <MultilingualText className="text-13 font-semibold leading-tight">
          {t(labelKey)}
        </MultilingualText>
      )}
      {badge && badge > 0 && isExpanded && (
        <div className="ml-auto mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-warning text-white text-[9px] font-semibold">
          {badge}
        </div>
      )}
    </Link>
  );
}
