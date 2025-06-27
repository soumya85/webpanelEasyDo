/**
 * Global Translation Utility
 *
 * Provides a simple way to get translations using the global language system
 * without requiring React context or hooks.
 */

import { translations } from "@/data/translations";
import { getCurrentLanguage } from "./globalLanguage";

// Map global language codes to translation keys
const langMap: Record<string, keyof typeof translations> = {
  en: "English",
  hi: "Hindi",
  bn: "Bengali",
  te: "Telugu",
  mr: "Marathi",
  ta: "Tamil",
  ur: "Urdu",
  gu: "Gujarati",
  kn: "Kannada",
  or: "Odia",
  pa: "Punjabi",
  ml: "Malayalam",
};

/**
 * Get translation for a key using the current global language
 */
export const getGlobalTranslation = (
  key: keyof (typeof translations)["English"],
): string => {
  const currentLang = getCurrentLanguage();
  const translationKey = langMap[currentLang] || "English";
  return translations[translationKey][key] || translations.English[key] || key;
};

/**
 * Get translation for a specific language
 */
export const getTranslationForLanguage = (
  key: keyof (typeof translations)["English"],
  langCode: string,
): string => {
  const translationKey = langMap[langCode] || "English";
  return translations[translationKey][key] || translations.English[key] || key;
};

/**
 * Create a reactive translation hook that works with the global system
 */
export const createGlobalTranslationGetter = () => {
  return (key: keyof (typeof translations)["English"]) => {
    return getGlobalTranslation(key);
  };
};
