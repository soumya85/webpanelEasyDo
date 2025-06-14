import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useLocation } from "react-router-dom";

interface SidebarContextType {
  isExpanded: boolean;
  isMobileOpen: boolean;
  toggleExpanded: () => void;
  toggleMobile: () => void;
  setMobileOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Auto-collapse/expand sidebar based on page and screen size
  useEffect(() => {
    const handleSidebarState = () => {
      if (location.pathname === "/chats") {
        // Chat page: expanded on mobile/tablet, collapsed on desktop
        setIsExpanded(window.innerWidth < 1024);
      } else {
        // Other pages: always expanded
        setIsExpanded(true);
      }
    };

    handleSidebarState();

    // Listen for window resize to adjust sidebar state
    window.addEventListener("resize", handleSidebarState);
    return () => window.removeEventListener("resize", handleSidebarState);
  }, [location.pathname]);

  // Auto-expand and close mobile overlay on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleExpanded = () => {
    if (window.innerWidth >= 768) {
      setIsExpanded(!isExpanded);
    }
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const setMobileOpen = (open: boolean) => {
    setIsMobileOpen(open);
  };

  return (
    <SidebarContext.Provider
      value={{
        isExpanded,
        isMobileOpen,
        toggleExpanded,
        toggleMobile,
        setMobileOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
