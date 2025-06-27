import * as React from "react";

import { cn } from "@/lib/utils";
import { useGlobalTranslation } from "@/hooks/useGlobalTranslation";
import { getMultilingualTextClass } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const { currentLanguage } = useGlobalTranslation();

    // Map global language codes to the format expected by getMultilingualTextClass
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

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          getMultilingualTextClass(mappedLanguage),
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
