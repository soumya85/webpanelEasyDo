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

/**
 * Check if a font is loaded and available
 */
export const isFontLoaded = (fontFamily: string): boolean => {
  if (!document.fonts || !document.fonts.check) {
    return true; // Fallback for browsers without FontFace API
  }

  try {
    return document.fonts.check(`16px "${fontFamily}"`);
  } catch {
    return true; // Fallback on error
  }
};

/**
 * Wait for all required fonts to load
 */
export const waitForFontsToLoad = async (): Promise<void> => {
  if (!document.fonts || !document.fonts.ready) {
    return Promise.resolve(); // Fallback for browsers without FontFace API
  }

  try {
    await document.fonts.ready;

    // Additional check for our specific fonts
    const fontChecks = REQUIRED_FONTS.map((font) =>
      document.fonts.load(`16px "${font}"`).catch(() => {
        console.warn(`Failed to load font: ${font}`);
        return null;
      }),
    );

    await Promise.allSettled(fontChecks);
  } catch (error) {
    console.warn("Font loading check failed:", error);
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
    } catch (error) {
      console.warn("Font reload failed:", error);
    }
  }
};

/**
 * Hook to use in React components to ensure fonts are loaded
 */
export const useFontLoader = () => {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    waitForFontsToLoad().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  return fontsLoaded;
};

// Auto-initialize font loading when module is imported
if (typeof window !== "undefined") {
  // Wait a bit for initial render, then ensure fonts are loaded
  setTimeout(() => {
    waitForFontsToLoad();
  }, 100);
}
