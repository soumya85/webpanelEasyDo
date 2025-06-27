import React from "react";
import { cn } from "@/lib/utils";
import { useFontLoader } from "@/hooks/useFontLoader";
import { useGlobalTranslation } from "@/hooks/useGlobalTranslation";

interface FontLoadingIndicatorProps {
  children: React.ReactNode;
  fallbackContent?: React.ReactNode;
  className?: string;
  showLoading?: boolean;
}

/**
 * Component that shows loading state while fonts are being loaded
 * and ensures children are only rendered when fonts are ready
 */
export const FontLoadingIndicator: React.FC<FontLoadingIndicatorProps> = ({
  children,
  fallbackContent,
  className = "",
  showLoading = true,
}) => {
  const { currentLanguage } = useGlobalTranslation();

  // Map global language codes to the format expected by useFontLoader
  const languageMap: Record<string, string> = {
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

  const mappedLanguage = languageMap[currentLanguage] || "English";
  const { isLoading, isLoaded, hasError } = useFontLoader(mappedLanguage);

  if (isLoading && showLoading) {
    return (
      <div className={cn("animate-pulse", className)}>
        {fallbackContent || (
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
        )}
      </div>
    );
  }

  if (hasError) {
    console.warn(
      `Font loading error for ${mappedLanguage}, displaying content anyway`,
    );
  }

  return <div className={cn("font-loaded", className)}>{children}</div>;
};

/**
 * Higher-order component that wraps content with font loading protection
 */
export const withFontLoading = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: {
    fallbackContent?: React.ReactNode;
    showLoading?: boolean;
  },
) => {
  const FontLoadingWrapper = (props: P) => {
    return (
      <FontLoadingIndicator
        fallbackContent={options?.fallbackContent}
        showLoading={options?.showLoading}
      >
        <WrappedComponent {...props} />
      </FontLoadingIndicator>
    );
  };

  FontLoadingWrapper.displayName = `withFontLoading(${WrappedComponent.displayName || WrappedComponent.name})`;

  return FontLoadingWrapper;
};

export default FontLoadingIndicator;
