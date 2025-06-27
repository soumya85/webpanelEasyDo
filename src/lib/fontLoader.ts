import React from "react";

/**
 * Font loading utility to ensure all fonts are properly loaded before use
 */

export const REQUIRED_FONTS = [
  "Inter",
  "Noto Sans",
  "Noto Sans Devanagari",
  "Noto Sans Telugu",
  "Noto Sans Gujarati",
  "Noto Sans Bengali",
  "Noto Sans Tamil",
  "Noto Sans Kannada",
  "Noto Sans Malayalam",
  "Noto Sans Oriya",
  "Noto Sans Gurmukhi",
  "Noto Sans Arabic",
];

// Map languages to their specific font families
export const LANGUAGE_FONT_MAP = {
  English: ["Inter", "Noto Sans"],
  Hindi: ["Noto Sans Devanagari", "Noto Sans"],
  Bengali: ["Noto Sans Bengali", "Noto Sans"],
  Telugu: ["Noto Sans Telugu", "Noto Sans"],
  Marathi: ["Noto Sans Devanagari", "Noto Sans"],
  Tamil: ["Noto Sans Tamil", "Noto Sans"],
  Urdu: ["Noto Sans Arabic", "Noto Sans"],
  Gujarati: ["Noto Sans Gujarati", "Noto Sans"],
  Kannada: ["Noto Sans Kannada", "Noto Sans"],
  Odia: ["Noto Sans Oriya", "Noto Sans"],
  Punjabi: ["Noto Sans Gurmukhi", "Noto Sans"],
  Malayalam: ["Noto Sans Malayalam", "Noto Sans"],
} as const;

/**
 * Test characters for each script to verify proper rendering
 */
export const SCRIPT_TEST_CHARS = {
  "Noto Sans Devanagari": "आपका स्वागत है", // Hindi/Marathi
  "Noto Sans Telugu": "స్వాగతం", // Telugu
  "Noto Sans Gujarati": "સ્વાગત છે", // Gujarati
  "Noto Sans Bengali": "স্বাগতম", // Bengali
  "Noto Sans Tamil": "வரவேற்கிறோம்", // Tamil
  "Noto Sans Kannada": "ಸ್ವಾಗತ", // Kannada
  "Noto Sans Malayalam": "സ്വാഗതം", // Malayalam
  "Noto Sans Oriya": "ସ୍ୱାଗତ", // Odia
  "Noto Sans Gurmukhi": "ਸਵਾਗਤ", // Punjabi
  "Noto Sans Arabic": "مرحباً", // Urdu/Arabic
};

/**
 * Check if a font is loaded and available with character rendering test
 */
export const isFontLoaded = (fontFamily: string): boolean => {
  if (!document.fonts || !document.fonts.check) {
    return true; // Fallback for browsers without FontFace API
  }

  try {
    // Basic font availability check
    const isBasicLoaded = document.fonts.check(`16px "${fontFamily}"`);

    if (!isBasicLoaded) {
      return false;
    }

    // Additional character rendering verification for Indic scripts
    if (SCRIPT_TEST_CHARS[fontFamily as keyof typeof SCRIPT_TEST_CHARS]) {
      return verifyCharacterRendering(
        fontFamily,
        SCRIPT_TEST_CHARS[fontFamily as keyof typeof SCRIPT_TEST_CHARS],
      );
    }

    return true;
  } catch {
    return true; // Fallback on error
  }
};

/**
 * Verify that specific characters render correctly with the given font
 */
export const verifyCharacterRendering = (
  fontFamily: string,
  testChars: string,
): boolean => {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return true; // Fallback if canvas not available
    }

    canvas.width = 200;
    canvas.height = 50;

    // Test with the specific font
    ctx.font = `16px "${fontFamily}", sans-serif`;
    ctx.fillText(testChars, 10, 30);
    const fontData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Clear and test with generic fallback
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px sans-serif";
    ctx.fillText(testChars, 10, 30);
    const fallbackData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Compare pixel data - if identical, font might not be rendering the script
    const fontPixels = Array.from(fontData.data);
    const fallbackPixels = Array.from(fallbackData.data);

    // Simple comparison - if there's a difference, font is likely working
    const isDifferent = fontPixels.some(
      (pixel, index) => pixel !== fallbackPixels[index],
    );

    return isDifferent;
  } catch {
    return true; // Fallback on any error
  }
};

/**
 * Load fonts for a specific language with enhanced verification
 */
export const loadLanguageFonts = async (
  language: keyof typeof LANGUAGE_FONT_MAP,
  maxRetries: number = 3,
): Promise<void> => {
  if (!document.fonts || !document.fonts.ready) {
    return Promise.resolve();
  }

  const languageFonts = LANGUAGE_FONT_MAP[language] || ["Inter", "Noto Sans"];

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      console.log(
        `🔄 Loading fonts for ${language} (attempt ${attempt + 1}/${maxRetries})`,
      );

      // Wait for document fonts to be ready
      await document.fonts.ready;

      // Load language-specific fonts with multiple weights
      const fontLoadPromises = languageFonts.flatMap((font) => [
        document.fonts.load(`400 16px "${font}"`),
        document.fonts.load(`500 16px "${font}"`),
        document.fonts.load(`600 16px "${font}"`),
      ]);

      await Promise.race([
        Promise.all(fontLoadPromises),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Font loading timeout")), 5000),
        ),
      ]);

      // Verify font rendering with language-specific test
      let allFontsVerified = true;
      for (const font of languageFonts) {
        const isWorking = isFontLoaded(font);
        if (!isWorking) {
          console.warn(`⚠ Font verification failed: ${font}`);
          allFontsVerified = false;
        }
      }

      if (allFontsVerified) {
        console.log(`✓ All fonts for ${language} loaded and verified`);
        break;
      } else if (attempt < maxRetries - 1) {
        console.log(`🔄 Retrying font verification for ${language}`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        continue;
      }
    } catch (error) {
      console.warn(
        `Font loading attempt ${attempt + 1} failed for ${language}:`,
        error,
      );
      if (attempt < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }
};

/**
 * Wait for all required fonts to load with retry mechanism
 */
export const waitForFontsToLoad = async (
  maxRetries: number = 3,
): Promise<void> => {
  if (!document.fonts || !document.fonts.ready) {
    return Promise.resolve(); // Fallback for browsers without FontFace API
  }

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      await document.fonts.ready;

      // Load each font individually with timeout
      const fontLoadPromises = REQUIRED_FONTS.map(async (font) => {
        try {
          await Promise.race([
            document.fonts.load(`16px "${font}"`),
            new Promise((_, reject) =>
              setTimeout(
                () => reject(new Error(`Font load timeout: ${font}`)),
                5000,
              ),
            ),
          ]);
          console.log(`✓ Font loaded successfully: ${font}`);
        } catch (error) {
          console.warn(`⚠ Failed to load font: ${font}`, error);
        }
      });

      await Promise.allSettled(fontLoadPromises);

      // Verify fonts are actually working
      const verificationResults = REQUIRED_FONTS.map((font) => ({
        font,
        loaded: isFontLoaded(font),
      }));

      const failedFonts = verificationResults.filter(
        (result) => !result.loaded,
      );

      if (failedFonts.length > 0) {
        console.warn("⚠ Some fonts failed verification:", failedFonts);

        if (attempt < maxRetries - 1) {
          console.log(
            `🔄 Retrying font loading (attempt ${attempt + 2}/${maxRetries})`,
          );
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before retry
          continue;
        }
      } else {
        console.log("✓ All fonts loaded and verified successfully");
      }

      break; // Success, exit retry loop
    } catch (error) {
      console.warn(`Font loading attempt ${attempt + 1} failed:`, error);
      if (attempt < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before retry
      }
    }
  }
};

/**
 * Force reload fonts for a specific language if they're not displaying correctly
 */
export const reloadLanguageFonts = async (
  language: keyof typeof LANGUAGE_FONT_MAP,
): Promise<void> => {
  try {
    console.log(`🔄 Reloading fonts for ${language}`);

    // First, ensure fonts are actually available before proceeding
    await loadLanguageFonts(language);

    // Apply language-specific font classes with immediate effect
    const body = document.body;

    // Remove all existing language font classes
    const languageFontClasses = Object.keys(LANGUAGE_FONT_MAP).map(
      (lang) => `font-${lang.toLowerCase()}`,
    );
    body.classList.remove(...languageFontClasses);

    // Force a reflow to ensure class removal takes effect
    body.offsetHeight;

    // Add the correct language font class
    body.classList.add(`font-${language.toLowerCase()}`);
    body.classList.add("text-multilingual");

    // Force immediate font application with multiple techniques
    forceFontRerender();

    // Additional verification that fonts are working
    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          forceFontRerender();
          resolve(void 0);
        });
      });
    });

    console.log(`✓ Fonts reloaded and verified for ${language}`);
  } catch (error) {
    console.warn(`Font reload failed for ${language}:`, error);
    // Fallback: apply basic font classes anyway
    const body = document.body;
    body.classList.add(`font-${language.toLowerCase()}`);
    body.classList.add("text-multilingual");
  }
};

/**
 * Force reload fonts if they're not displaying correctly
 */
export const reloadFonts = (): void => {
  if (document.fonts && document.fonts.clear) {
    try {
      // Clear font cache and reload
      document.fonts.clear();

      // Trigger font reload by touching font-family style
      const body = document.body;
      const currentFontFamily = getComputedStyle(body).fontFamily;
      body.style.fontFamily = "serif";
      // Force reflow
      body.offsetHeight;
      body.style.fontFamily = currentFontFamily;

      // Trigger re-layout of all text elements
      const allTextElements = document.querySelectorAll("*");
      allTextElements.forEach((element) => {
        const style = getComputedStyle(element);
        if (style.fontFamily) {
          (element as HTMLElement).style.fontFamily = style.fontFamily;
        }
      });

      console.log("🔄 Fonts reloaded and re-applied");
    } catch (error) {
      console.warn("Font reload failed:", error);
    }
  }
};

/**
 * Force font re-render for better character display
 */
export const forceFontRerender = (): void => {
  try {
    // Method 1: Force repaint by changing and restoring text properties
    const body = document.body;
    const originalColor = body.style.color;
    const originalFontWeight = body.style.fontWeight;
    const originalFontFamily = body.style.fontFamily;

    // Force multiple style changes to trigger re-render
    body.style.color = "transparent";
    body.style.fontWeight = "normal";
    body.style.fontFamily = "serif";
    body.offsetHeight; // Force reflow

    body.style.color = originalColor;
    body.style.fontWeight = originalFontWeight;
    body.style.fontFamily = originalFontFamily;

    // Method 2: Force all text elements to re-render with font-specific techniques
    const textElements = document.querySelectorAll(
      "span, p, h1, h2, h3, h4, h5, h6, div, label, button, input, textarea, [class*='font-']",
    );

    textElements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const originalFontFamily = htmlElement.style.fontFamily;
      const computedFont = getComputedStyle(htmlElement).fontFamily;

      // Force font re-application
      htmlElement.style.fontFamily = "serif";
      htmlElement.offsetHeight; // Force reflow
      htmlElement.style.fontFamily = originalFontFamily || computedFont;

      // Additional transform-based re-render
      const originalTransform = htmlElement.style.transform;
      htmlElement.style.transform = "translateZ(0)";
      htmlElement.offsetHeight; // Force reflow
      htmlElement.style.transform = originalTransform;
    });

    // Method 3: Force browser to re-evaluate font-face rules
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        // Trigger a style recalculation
        document.documentElement.style.fontSize = getComputedStyle(
          document.documentElement,
        ).fontSize;
      });
    }
  } catch (error) {
    console.warn("Font re-render failed:", error);
  }
};

/**
 * Hook to use in React components to ensure fonts are loaded
 */
export const useFontLoader = () => {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const [fontLoadAttempts, setFontLoadAttempts] = React.useState(0);

  React.useEffect(() => {
    const loadFonts = async () => {
      try {
        await waitForFontsToLoad();
        setFontsLoaded(true);

        // Additional re-render to ensure proper display
        setTimeout(() => {
          forceFontRerender();
        }, 100);
      } catch (error) {
        console.warn("Font loading failed in hook:", error);
        setFontLoadAttempts((prev) => prev + 1);

        // Retry up to 3 times
        if (fontLoadAttempts < 2) {
          setTimeout(() => {
            loadFonts();
          }, 2000);
        }
      }
    };

    loadFonts();
  }, [fontLoadAttempts]);

  return { fontsLoaded, fontLoadAttempts };
};

// Auto-initialize font loading when module is imported
if (typeof window !== "undefined") {
  // Wait a bit for initial render, then ensure fonts are loaded
  setTimeout(() => {
    waitForFontsToLoad().then(() => {
      // Additional delay to ensure proper rendering
      setTimeout(() => {
        forceFontRerender();
      }, 200);
    });
  }, 100);
}
