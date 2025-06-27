import { useState, useEffect } from "react";
import { getGlobalTranslation } from "@/lib/globalTranslations";
import { getCurrentLanguage, type GlobalLanguage } from "@/lib/globalLanguage";
import { translations } from "@/data/translations";

/**
 * Reactive hook for global translations that updates without page reload
 */
export const useGlobalTranslation = () => {
  const [currentLang, setCurrentLang] = useState<GlobalLanguage>(() =>
    getCurrentLanguage(),
  );

  useEffect(() => {
    // Update current language when it changes
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLang(event.detail.language);
    };

    // Listen for storage events (fired by window.changeLanguage)
    const handleStorageChange = () => {
      const newLang = getCurrentLanguage();
      setCurrentLang(newLang);
    };

    // Add event listeners
    window.addEventListener(
      "languageChange",
      handleLanguageChange as EventListener,
    );
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(
        "languageChange",
        handleLanguageChange as EventListener,
      );
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Translation function that automatically uses current language
  const t = (key: keyof (typeof translations)["English"]): string => {
    return getGlobalTranslation(key);
  };

  return {
    t,
    currentLanguage: currentLang,
    changeLanguage: window.changeLanguage,
  };
};

export default useGlobalTranslation;
