import React from "react";
import { cn, getMultilingualTextClass } from "@/lib/utils";
import { useLanguageContext } from "@/contexts/LanguageContext";

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
  const { language } = useLanguageContext();

  return (
    <Component
      className={cn(getMultilingualTextClass(language), className)}
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
  const { language } = useLanguageContext();
  return getMultilingualTextClass(language);
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
