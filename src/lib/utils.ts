import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Language } from "@/data/translations";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the appropriate font class for a given language
 */
export function getLanguageFontClass(language: Language): string {
  const fontMap: Record<Language, string> = {
    English: "font-english",
    Hindi: "font-hindi",
    Bengali: "font-bengali",
    Telugu: "font-telugu",
    Marathi: "font-marathi",
    Tamil: "font-tamil",
    Urdu: "font-urdu",
    Gujarati: "font-gujarati",
    Kannada: "font-kannada",
    Odia: "font-odia",
    Punjabi: "font-punjabi",
    Malayalam: "font-malayalam",
  };

  return fontMap[language] || "font-english";
}

/**
 * Apply multilingual text rendering class along with language-specific font
 */
export function getMultilingualTextClass(
  language: Language,
  additionalClasses?: string,
): string {
  return cn(
    "text-multilingual",
    getLanguageFontClass(language),
    additionalClasses,
  );
}
