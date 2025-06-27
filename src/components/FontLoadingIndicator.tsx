import React from "react";
import { cn } from "@/lib/utils";
import { useFontLoader } from "@/hooks/useFontLoader";
import { useLanguageContext } from "@/contexts/LanguageContext";

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
  const { language } = useLanguageContext();
  const { isLoading, isLoaded, hasError } = useFontLoader(language);

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
      `Font loading error for ${language}, displaying content anyway`,
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
