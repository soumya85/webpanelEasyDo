import React from "react";
import { RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";
import { MultilingualText } from "@/components/MultilingualText";

interface LayoutControlsProps {
  onReset: () => void;
  isDirty?: boolean;
}

export const LayoutControls: React.FC<LayoutControlsProps> = ({
  onReset,
  isDirty = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <Save className="w-4 h-4" />
        <span>Layout auto-saved</span>
      </div>
      <button
        onClick={onReset}
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Reset Layout</span>
      </button>
    </div>
  );
};
