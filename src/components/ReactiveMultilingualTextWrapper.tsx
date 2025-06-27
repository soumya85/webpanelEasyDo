import React, { useState, useEffect } from "react";
import { getCurrentLanguage, type GlobalLanguage } from "@/lib/globalLanguage";

interface ReactiveMultilingualTextWrapperProps {
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  [key: string]: any;
}

/**
 * Wrapper for MultilingualText that forces re-render on language changes
 * This ensures existing MultilingualText components update when language changes
 */
export const ReactiveMultilingualTextWrapper: React.FC<
  ReactiveMultilingualTextWrapperProps
> = ({ children, as: Component = "span", className, ...props }) => {
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

  // Force re-render by including currentLang in the key
  return (
    <Component key={currentLang} className={className} {...props}>
      {children}
    </Component>
  );
};

export default ReactiveMultilingualTextWrapper;
