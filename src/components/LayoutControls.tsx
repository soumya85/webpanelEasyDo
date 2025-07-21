import React from "react";
import { RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";
import { MultilingualText } from "@/components/MultilingualText";

interface LayoutControlsProps {
  onReset: () => void;
  isDirty?: boolean;
  dateDisplay?: string;
}

export const LayoutControls: React.FC<LayoutControlsProps> = ({
  onReset,
  isDirty = false,
  dateDisplay,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between w-full mb-6 pt-6">
      {/* Date Display */}
      {dateDisplay && (
        <h2 className="text-lg font-semibold text-[#283C50]">
          {dateDisplay}
        </h2>
      )}

      {/* Layout Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center px-3 h-8 text-xs font-medium text-gray-900 bg-white border border-gray-300 rounded-md cursor-default">
            <Save className="w-3 h-3 mr-1" />
            <MultilingualText className="text-xs">
              {t("layoutAutoSaved")}
            </MultilingualText>
          </div>
          {isDirty && (
            <Badge className="text-xs bg-blue-100 text-blue-700">
              <MultilingualText className="text-xs">
                {t("dragResizeCards")}
              </MultilingualText>
            </Badge>
          )}
        </div>
        <Button
          onClick={onReset}
          variant="outline"
          size="sm"
          className="text-xs h-8 font-medium !text-gray-900 !border-gray-300"
        >
          <RotateCcw className="w-3 h-3 mr-1 text-blue-600" />
          <MultilingualText className="text-xs">
            {t("resetLayout")}
          </MultilingualText>
        </Button>
      </div>
    </div>
  );
};
