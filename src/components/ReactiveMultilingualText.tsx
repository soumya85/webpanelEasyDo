import React from "react";
import { useGlobalTranslation } from "@/hooks/useGlobalTranslation";
import { translations } from "@/data/translations";

interface ReactiveMultilingualTextProps {
  children?: string;
  translationKey?: keyof (typeof translations)["English"];
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  [key: string]: any; // For additional props like onClick, htmlFor, etc.
}

/**
 * Reactive multilingual text component that updates without page reload
 * Use this instead of MultilingualText for dynamic language changes
 */
export const ReactiveMultilingualText: React.FC<
  ReactiveMultilingualTextProps
> = ({
  children,
  translationKey,
  as: Component = "span",
  className,
  ...props
}) => {
  const { t } = useGlobalTranslation();

  // Use translation key if provided, otherwise use children as fallback
  const text = translationKey ? t(translationKey) : children || "";

  return (
    <Component className={className} {...props}>
      {text}
    </Component>
  );
};

export default ReactiveMultilingualText;
