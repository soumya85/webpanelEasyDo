import React, { createContext, useContext, useState, useEffect } from "react";
import { type Language } from "@/data/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider",
    );
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  defaultLanguage = "English",
}) => {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  // Load saved language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") as Language;
    if (savedLanguage && isValidLanguage(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem("selectedLanguage", newLanguage);
  };

  const value = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Helper function to validate if a string is a valid Language
const isValidLanguage = (lang: string): lang is Language => {
  const validLanguages: Language[] = [
    "English",
    "Hindi",
    "Bengali",
    "Telugu",
    "Marathi",
    "Tamil",
    "Urdu",
    "Gujarati",
    "Kannada",
    "Odia",
    "Punjabi",
    "Malayalam",
  ];
  return validLanguages.includes(lang as Language);
};

export default LanguageProvider;
