import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import {
  globalLanguageOptions,
  getCurrentLanguage,
  getLanguageOption,
  type GlobalLanguage,
} from "@/lib/globalLanguage";
import { cn } from "@/lib/utils";

interface GlobalLanguageSelectorProps {
  className?: string;
  showGlobe?: boolean;
  position?: "absolute" | "relative";
  size?: "sm" | "md" | "lg";
}

export const GlobalLanguageSelector: React.FC<GlobalLanguageSelectorProps> = ({
  className = "",
  showGlobe = true,
  position = "relative",
  size = "md",
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<GlobalLanguage>("en");

  // Initialize and listen for language changes
  useEffect(() => {
    // Set initial language
    const initialLang = getCurrentLanguage();
    setCurrentLanguage(initialLang);

    // Listen for language change events
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail.language);
    };

    // Listen for storage events (in case language changed in another tab/component)
    const handleStorageChange = () => {
      const newLang = getCurrentLanguage();
      setCurrentLanguage(newLang);
    };

    // Also listen for route changes to sync language state
    const handleRouteChange = () => {
      const currentLang = getCurrentLanguage();
      setCurrentLanguage(currentLang);
    };

    window.addEventListener(
      "languageChange",
      handleLanguageChange as EventListener,
    );
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("popstate", handleRouteChange);

    // Check language state on focus (when returning to tab)
    window.addEventListener("focus", handleRouteChange);

    return () => {
      window.removeEventListener(
        "languageChange",
        handleLanguageChange as EventListener,
      );
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("focus", handleRouteChange);
    };
  }, []);

  // Also sync on component mount/remount (page navigation)
  useEffect(() => {
    const currentLang = getCurrentLanguage();
    if (currentLang !== currentLanguage) {
      setCurrentLanguage(currentLang);
    }
  });

  const handleLanguageChange = (newLanguage: GlobalLanguage) => {
    // Use the global change language function
    if (window.changeLanguage) {
      window.changeLanguage(newLanguage);
    }
  };

  const currentLanguageOption = getLanguageOption(currentLanguage);
  const displayValue = currentLanguageOption
    ? currentLanguageOption.nativeLabel
    : "English";

  const sizeClasses = {
    sm: "min-w-[120px] text-xs",
    md: "min-w-[140px] text-sm",
    lg: "min-w-[160px] text-base",
  };

  const positionClasses =
    position === "absolute" ? "absolute top-6 right-6" : "";

  return (
    <div className={cn(positionClasses, className)}>
      <Select value={currentLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger
          className={cn(
            sizeClasses[size],
            "border-gray-200 bg-white hover:bg-gray-50 transition-colors",
          )}
        >
          <div className="flex items-center gap-2">
            {showGlobe && <Globe className="h-4 w-4 text-gray-500 shrink-0" />}
            <SelectValue>
              <span className="truncate">{displayValue}</span>
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent className="max-w-[250px]">
          {globalLanguageOptions.map((language) => (
            <SelectItem
              key={language.code}
              value={language.code}
              className="cursor-pointer"
            >
              <span className="flex items-center justify-between w-full">
                <span className="font-medium">{language.nativeLabel}</span>
                <span className="text-xs text-gray-500 ml-2">
                  ({language.name})
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default GlobalLanguageSelector;
