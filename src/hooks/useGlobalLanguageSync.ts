import { useEffect } from "react";
import { initializeGlobalLanguage } from "@/lib/globalLanguage";

/**
 * Hook to ensure global language state is properly synced
 * Useful for debugging and ensuring language state persists across navigation
 */
export const useGlobalLanguageSync = () => {
  useEffect(() => {
    // Ensure global language is initialized
    initializeGlobalLanguage();

    // Log current state for debugging
    console.log("🔄 Language sync check:", {
      windowSiteLang: window.siteLang,
      localStorage: localStorage.getItem("siteLang"),
      documentLang: document.documentElement.lang,
    });
  }, []);

  return {
    getCurrentLanguage: () => window.siteLang,
    changeLanguage: window.changeLanguage,
    syncLanguage: () => initializeGlobalLanguage(),
  };
};

export default useGlobalLanguageSync;
