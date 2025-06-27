import { useCallback, useState, useEffect } from "react";
import { translations, type TranslationKey } from "@/data/translations";
import { getCurrentLanguage, type GlobalLanguage } from "@/lib/globalLanguage";

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
 * Hook for easy translation access across components
 * Now works with the global language system and updates reactively
 *
 * Usage:
 * const { t, language, setLanguage } = useTranslation();
 *
 * // Simple translation
 * <span>{t('dashboard')}</span>
 *
 * // With fallback
 * <span>{t('someKey', 'Default Text')}</span>
 */
export const useTranslation = () => {
  const [currentLang, setCurrentLang] = useState<GlobalLanguage>(() =>
    getCurrentLanguage(),
  );

  useEffect(() => {
    // Listen for global language changes
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLang(event.detail.language);
    };

    const handleStorageChange = () => {
      const newLang = getCurrentLanguage();
      setCurrentLang(newLang);
    };

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

  // Get the translation language key from the current global language
  const translationLanguage = langMap[currentLang] || "English";

  /**
   * Translation function
   * @param key - The translation key
   * @param fallback - Optional fallback text if translation not found
   * @returns Translated text or fallback
   */
  const t = useCallback(
    (key: TranslationKey, fallback?: string): string => {
      try {
        const translation = translations[translationLanguage]?.[key];
        if (translation) {
          return translation;
        }

        // Fallback to English if translation not found in current language
        const englishTranslation = translations.English[key];
        if (englishTranslation) {
          return englishTranslation;
        }

        // Return fallback or key if no translation found
        return fallback || key;
      } catch (error) {
        console.warn(
          `Translation error for key "${key}" in language "${translationLanguage}":`,
          error,
        );
        return fallback || key;
      }
    },
    [translationLanguage],
  );

  /**
   * Get translation with pluralization support
   * @param key - The translation key
   * @param count - Number for pluralization
   * @param fallback - Optional fallback text
   * @returns Translated text with proper pluralization
   */
  const tp = useCallback(
    (key: TranslationKey, count: number, fallback?: string): string => {
      // For now, just return the basic translation
      // This can be extended for proper pluralization rules per language
      const translation = t(key, fallback);
      return `${count} ${translation}`;
    },
    [t],
  );

  /**
   * Check if a translation key exists
   * @param key - The translation key to check
   * @returns true if translation exists, false otherwise
   */
  const hasTranslation = useCallback(
    (key: TranslationKey): boolean => {
      return !!(
        translations[translationLanguage]?.[key] || translations.English[key]
      );
    },
    [translationLanguage],
  );

  /**
   * Get translation for a specific language (useful for comparisons)
   * @param key - The translation key
   * @param targetLanguage - The specific language to get translation for
   * @param fallback - Optional fallback text
   * @returns Translated text in specified language
   */
  const tl = useCallback(
    (
      key: TranslationKey,
      targetLanguage: keyof typeof translations,
      fallback?: string,
    ): string => {
      try {
        const translation = translations[targetLanguage]?.[key];
        if (translation) {
          return translation;
        }

        // Fallback to English
        const englishTranslation = translations.English[key];
        if (englishTranslation) {
          return englishTranslation;
        }

        return fallback || key;
      } catch (error) {
        console.warn(
          `Translation error for key "${key}" in language "${targetLanguage}":`,
          error,
        );
        return fallback || key;
      }
    },
    [],
  );

  /**
   * Change language using the global system
   */
  const setLanguage = useCallback((newLang: GlobalLanguage) => {
    if (window.changeLanguage) {
      window.changeLanguage(newLang);
    }
  }, []);

  return {
    t,
    tp,
    tl,
    hasTranslation,
    language: translationLanguage,
    setLanguage,
  };
};

export default useTranslation;
