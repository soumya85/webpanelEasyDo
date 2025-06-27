import React, { useEffect, useRef, useState } from "react";
import { cn, getMultilingualTextClass } from "@/lib/utils";
import { getCurrentLanguage, type GlobalLanguage } from "@/lib/globalLanguage";
import { forceFontRerender } from "@/lib/fontLoader";

interface MultilingualTextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: any; // Allow any additional props to be passed through
}

/**
 * A wrapper component that automatically applies the correct font
 * and text rendering optimizations based on the current language.
 *
 * Usage:
 * <MultilingualText>Your text content</MultilingualText>
 * <MultilingualText as="h1" className="text-xl">Heading</MultilingualText>
 * <MultilingualText as="p" className="text-sm text-gray-600">Paragraph</MultilingualText>
 */
export const MultilingualText: React.FC<MultilingualTextProps> = ({
  children,
  className = "",
  as: Component = "span",
  ...props
}) => {
  const [currentLang, setCurrentLang] = useState<GlobalLanguage>(() =>
    getCurrentLanguage(),
  );
  const elementRef = useRef<HTMLElement>(null);
  const previousLanguage = useRef(currentLang);

  // Listen for global language changes
  useEffect(() => {
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

  // Force re-render when language changes to ensure proper font rendering
  useEffect(() => {
    if (previousLanguage.current !== currentLang && elementRef.current) {
      // Force re-render of this specific element
      const element = elementRef.current;
      const originalTransform = element.style.transform;

      // Brief style change to force re-render
      element.style.transform = "translateZ(0)";
      element.offsetHeight; // Force reflow
      element.style.transform = originalTransform;

      previousLanguage.current = currentLang;
    }
  }, [currentLang]);

  // Map global language codes to the format expected by getMultilingualTextClass
  const languageMap: Record<GlobalLanguage, string> = {
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

  const mappedLanguage = languageMap[currentLang] || "English";

  return (
    <Component
      ref={elementRef}
      className={cn(getMultilingualTextClass(mappedLanguage), className)}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Hook to get the current language font class
 * Use this when you need just the font class without the wrapper component
 */
export const useMultilingualFont = () => {
  const [currentLang, setCurrentLang] = useState<GlobalLanguage>(() =>
    getCurrentLanguage(),
  );

  useEffect(() => {
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

  // Map global language codes to the format expected by getMultilingualTextClass
  const languageMap: Record<GlobalLanguage, string> = {
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

  const mappedLanguage = languageMap[currentLang] || "English";
  return getMultilingualTextClass(mappedLanguage);
};

/**
 * Higher-order component that wraps any component with multilingual font support
 */
export const withMultilingualFont = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const MultilingualWrapper = (props: P) => {
    const fontClass = useMultilingualFont();

    return (
      <div className={fontClass}>
        <WrappedComponent {...props} />
      </div>
    );
  };

  MultilingualWrapper.displayName = `withMultilingualFont(${WrappedComponent.displayName || WrappedComponent.name})`;

  return MultilingualWrapper;
};

export default MultilingualText;
