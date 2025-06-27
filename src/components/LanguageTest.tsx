import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { MultilingualText } from "@/components/MultilingualText";
import { Button } from "@/components/ui/button";

/**
 * Test component to verify language switching functionality
 * This can be temporarily added to any page for testing
 */
export const LanguageTest: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();

  const testLanguages = ["English", "Hindi", "Bengali", "Telugu"] as const;

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <MultilingualText as="h3" className="text-lg font-semibold mb-3">
        Language Test Component
      </MultilingualText>

      <div className="space-y-2 mb-4">
        <p>
          Current Language: <span className="font-semibold">{language}</span>
        </p>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            Dashboard:{" "}
            <MultilingualText className="font-medium">
              {t("dashboard")}
            </MultilingualText>
          </div>
          <div>
            Settings:{" "}
            <MultilingualText className="font-medium">
              {t("settings")}
            </MultilingualText>
          </div>
          <div>
            Tasks:{" "}
            <MultilingualText className="font-medium">
              {t("tasks")}
            </MultilingualText>
          </div>
          <div>
            Reports:{" "}
            <MultilingualText className="font-medium">
              {t("reports")}
            </MultilingualText>
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {testLanguages.map((lang) => (
          <Button
            key={lang}
            variant={language === lang ? "default" : "outline"}
            size="sm"
            onClick={() => setLanguage(lang)}
            className="text-xs"
          >
            {lang}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageTest;
