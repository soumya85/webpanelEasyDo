/**
 * Global Language Management System
 *
 * This module provides a global, future-proof language management system
 * that works across all pages and components without requiring React context.
 *
 * Features:
 * - Uses localStorage for persistence
 * - Exposes window.siteLang for global access
 * - Provides window.changeLanguage for language switching
 * - Prevents font loading issues
 * - Works on all current and future pages
 */

export type GlobalLanguage =
  | "en"
  | "hi"
  | "bn"
  | "te"
  | "mr"
  | "ta"
  | "ur"
  | "gu"
  | "kn"
  | "or"
  | "pa"
  | "ml";

export interface GlobalLanguageOption {
  code: GlobalLanguage;
  name: string;
  nativeLabel: string;
}

export const globalLanguageOptions: GlobalLanguageOption[] = [
  { code: "en", name: "English", nativeLabel: "English" },
  { code: "hi", name: "Hindi", nativeLabel: "हिंदी" },
  { code: "bn", name: "Bengali", nativeLabel: "বাংলা" },
  { code: "te", name: "Telugu", nativeLabel: "తెలుగు" },
  { code: "mr", name: "Marathi", nativeLabel: "मराठी" },
  { code: "ta", name: "Tamil", nativeLabel: "தமிழ்" },
  { code: "ur", name: "Urdu", nativeLabel: "اردو" },
  { code: "gu", name: "Gujarati", nativeLabel: "ગુજરાતી" },
  { code: "kn", name: "Kannada", nativeLabel: "ಕನ್ನಡ" },
  { code: "or", name: "Odia", nativeLabel: "ଓଡ଼ିଆ" },
  { code: "pa", name: "Punjabi", nativeLabel: "ਪੰਜਾਬੀ" },
  { code: "ml", name: "Malayalam", nativeLabel: "മലയാളം" },
];

// Declare global window properties
declare global {
  interface Window {
    siteLang: GlobalLanguage;
    changeLanguage: (lang: GlobalLanguage) => void;
  }
}

/**
 * Initialize the global language system
 * This should be called once on app startup
 */
export const initializeGlobalLanguage = (): void => {
  // Get saved language or default to English
  const savedLang =
    (localStorage.getItem("siteLang") as GlobalLanguage) || "en";

  // Validate the saved language
  const isValidLang = globalLanguageOptions.some(
    (option) => option.code === savedLang,
  );
  const currentLang = isValidLang ? savedLang : "en";

  // Set document language
  document.documentElement.lang = currentLang;

  // Set global window property
  window.siteLang = currentLang;

  // Create global change language function
  window.changeLanguage = (lang: GlobalLanguage) => {
    // Validate the new language
    const isValid = globalLanguageOptions.some(
      (option) => option.code === lang,
    );
    if (!isValid) {
      console.warn(`Invalid language code: ${lang}`);
      return;
    }

    // Update localStorage
    localStorage.setItem("siteLang", lang);

    // Update document language
    document.documentElement.lang = lang;

    // Update global property
    window.siteLang = lang;

    // Dispatch custom event for components to listen to
    window.dispatchEvent(
      new CustomEvent("languageChange", {
        detail: { language: lang },
      }),
    );

    // Reload the page to apply changes across all components
    // This ensures all content updates without manual re-rendering
    location.reload();
  };

  console.log(
    `🌍 Global language system initialized with language: ${currentLang}`,
  );
};

/**
 * Get the current language from window.siteLang
 */
export const getCurrentLanguage = (): GlobalLanguage => {
  return window.siteLang || "en";
};

/**
 * Get language option by code
 */
export const getLanguageOption = (
  code: GlobalLanguage,
): GlobalLanguageOption | undefined => {
  return globalLanguageOptions.find((option) => option.code === code);
};

/**
 * Create the global script content as a string
 * This can be injected into HTML head
 */
export const getGlobalLanguageScript = (): string => {
  return `
    <script>
      (function () {
        const lang = localStorage.getItem('siteLang') || 'en';
        document.documentElement.lang = lang;
        window.siteLang = lang;
        window.changeLanguage = function (lang) {
          localStorage.setItem('siteLang', lang);
          location.reload();
        };
      })();
    </script>
  `;
};
