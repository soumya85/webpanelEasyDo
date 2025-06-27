import { useEffect, useState, useCallback } from "react";
import { type Language } from "@/data/translations";
import {
  loadLanguageFonts,
  forceFontRerender,
  LANGUAGE_FONT_MAP,
  reloadLanguageFonts,
} from "@/lib/fontLoader";

interface FontLoadState {
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
  currentLanguage: Language | null;
}

/**
 * Hook for managing font loading state for specific languages
 */
export const useFontLoader = (language: Language) => {
  const [state, setState] = useState<FontLoadState>({
    isLoading: false,
    isLoaded: false,
    hasError: false,
    currentLanguage: null,
  });

  const loadFontsForLanguage = useCallback(async (lang: Language) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      hasError: false,
    }));

    try {
      if (lang in LANGUAGE_FONT_MAP) {
        await loadLanguageFonts(lang as keyof typeof LANGUAGE_FONT_MAP);
      }

      // Force re-render to ensure proper display
      forceFontRerender();

      setState((prev) => ({
        ...prev,
        isLoading: false,
        isLoaded: true,
        currentLanguage: lang,
      }));
    } catch (error) {
      console.warn(`Font loading failed for ${lang}:`, error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        hasError: true,
      }));
    }
  }, []);

  const reloadFonts = useCallback(async () => {
    if (language in LANGUAGE_FONT_MAP) {
      await reloadLanguageFonts(language as keyof typeof LANGUAGE_FONT_MAP);
      forceFontRerender();
    }
  }, [language]);

  // Load fonts when language changes
  useEffect(() => {
    if (state.currentLanguage !== language) {
      loadFontsForLanguage(language);
    }
  }, [language, state.currentLanguage, loadFontsForLanguage]);

  return {
    ...state,
    reloadFonts,
  };
};

/**
 * Hook for global font management across the entire application
 */
export const useGlobalFontLoader = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeFonts = useCallback(async (language: Language) => {
    try {
      console.log(`🚀 Initializing fonts for ${language}`);

      if (language in LANGUAGE_FONT_MAP) {
        await loadLanguageFonts(language as keyof typeof LANGUAGE_FONT_MAP);
      }

      // Apply global font classes
      const body = document.body;
      const existingClasses = Object.keys(LANGUAGE_FONT_MAP).map(
        (lang) => `font-${lang.toLowerCase()}`,
      );
      body.classList.remove(...existingClasses);
      body.classList.add(`font-${language.toLowerCase()}`);
      body.classList.add("text-multilingual");

      forceFontRerender();

      setCurrentLanguage(language);
      setIsInitialized(true);

      console.log(`✅ Global fonts initialized for ${language}`);
    } catch (error) {
      console.error(
        `❌ Global font initialization failed for ${language}:`,
        error,
      );
    }
  }, []);

  const switchLanguage = useCallback(
    async (newLanguage: Language) => {
      if (currentLanguage === newLanguage) return;

      console.log(
        `🔄 Switching fonts from ${currentLanguage} to ${newLanguage}`,
      );
      await initializeFonts(newLanguage);
    },
    [currentLanguage, initializeFonts],
  );

  return {
    currentLanguage,
    isInitialized,
    initializeFonts,
    switchLanguage,
  };
};

/**
 * Hook for ensuring fonts are loaded before component renders
 */
export const useEnsureFontsLoaded = (language: Language) => {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    const ensureFonts = async () => {
      setFontsReady(false);

      try {
        if (language in LANGUAGE_FONT_MAP) {
          await loadLanguageFonts(language as keyof typeof LANGUAGE_FONT_MAP);
        }

        // Small delay to ensure proper rendering
        setTimeout(() => {
          forceFontRerender();
          setFontsReady(true);
        }, 100);
      } catch (error) {
        console.warn(`Font ensuring failed for ${language}:`, error);
        setFontsReady(true); // Continue anyway
      }
    };

    ensureFonts();
  }, [language]);

  return fontsReady;
};
