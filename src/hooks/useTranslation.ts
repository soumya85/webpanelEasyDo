import { useCallback } from "react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { translations, type TranslationKey } from "@/data/translations";

/**
 * Hook for easy translation access across components
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
  const { language, setLanguage } = useLanguageContext();

  /**
   * Translation function
   * @param key - The translation key
   * @param fallback - Optional fallback text if translation not found
   * @returns Translated text or fallback
   */
  const t = useCallback(
    (key: TranslationKey, fallback?: string): string => {
      try {
        const translation = translations[language]?.[key];
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
          `Translation error for key "${key}" in language "${language}":`,
          error,
        );
        return fallback || key;
      }
    },
    [language],
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
      return !!(translations[language]?.[key] || translations.English[key]);
    },
    [language],
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

  return {
    t,
    tp,
    tl,
    hasTranslation,
    language,
    setLanguage,
  };
};

export default useTranslation;
