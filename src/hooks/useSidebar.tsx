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

  // Auto-expand and close mobile overlay on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
      // Keep sidebar expanded on all screen sizes
      setIsExpanded(true);
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
