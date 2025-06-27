import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { type Language } from "@/data/translations";
import { useLanguageContext } from "@/contexts/LanguageContext";

interface LanguageOption {
  value: Language;
  label: string;
  nativeLabel: string;
}

const languageOptions: LanguageOption[] = [
  { value: "English", label: "English", nativeLabel: "English" },
  { value: "Hindi", label: "Hindi", nativeLabel: "हिंदी" },
  { value: "Bengali", label: "Bengali", nativeLabel: "বাংলা" },
  { value: "Telugu", label: "Telugu", nativeLabel: "తెలుగు" },
  { value: "Marathi", label: "Marathi", nativeLabel: "मराठी" },
  { value: "Tamil", label: "Tamil", nativeLabel: "தமிழ்" },
  { value: "Urdu", label: "Urdu", nativeLabel: "اردو" },
  { value: "Gujarati", label: "Gujarati", nativeLabel: "ગુજરાતી" },
  { value: "Kannada", label: "Kannada", nativeLabel: "ಕನ್ನಡ" },
  { value: "Odia", label: "Odia", nativeLabel: "ଓଡ଼ିଆ" },
  { value: "Punjabi", label: "Punjabi", nativeLabel: "ਪੰਜਾਬੀ" },
  { value: "Malayalam", label: "Malayalam", nativeLabel: "മലയാളം" },
];

interface LanguageSelectorProps {
  value: Language;
  onValueChange: (language: Language) => void;
  className?: string;
  showGlobe?: boolean;
  position?: "absolute" | "relative";
  size?: "sm" | "md" | "lg";
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onValueChange,
  className = "",
  showGlobe = true,
  position = "relative",
  size = "md",
}) => {
  const currentLanguage = languageOptions.find((lang) => lang.value === value);
  const displayValue = currentLanguage
    ? `${currentLanguage.nativeLabel} (${currentLanguage.label})`
    : "English";

  const sizeClasses = {
    sm: "min-w-[120px] text-xs",
    md: "min-w-[140px] text-sm",
    lg: "min-w-[160px] text-base",
  };

  const positionClasses =
    position === "absolute" ? "absolute top-6 right-6" : "";

  return (
    <div className={`${positionClasses} ${className}`}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className={`${sizeClasses[size]} border-gray-200 bg-white hover:bg-gray-50 transition-colors`}
        >
          <div className="flex items-center gap-2">
            {showGlobe && <Globe className="h-4 w-4 text-gray-500 shrink-0" />}
            <SelectValue>
              <span className="truncate">
                {currentLanguage?.nativeLabel || "English"}
              </span>
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent className="max-w-[250px]">
          {languageOptions.map((language) => (
            <SelectItem
              key={language.value}
              value={language.value}
              className="cursor-pointer"
            >
              <span className="flex items-center justify-between w-full">
                <span className="font-medium">{language.nativeLabel}</span>
                <span className="text-xs text-gray-500 ml-2">
                  ({language.label})
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

// Hook for managing language state across components
export const useLanguage = (initialLanguage: Language = "English") => {
  const [language, setLanguage] = React.useState<Language>(initialLanguage);

  // You can extend this to save to localStorage or context
  const changeLanguage = React.useCallback((newLanguage: Language) => {
    setLanguage(newLanguage);
    // Optional: Save to localStorage
    localStorage.setItem("selectedLanguage", newLanguage);
  }, []);

  // Optional: Load from localStorage on mount
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") as Language;
    if (
      savedLanguage &&
      languageOptions.some((lang) => lang.value === savedLanguage)
    ) {
      setLanguage(savedLanguage);
    }
  }, []);

  return { language, setLanguage: changeLanguage };
};

export default LanguageSelector;
