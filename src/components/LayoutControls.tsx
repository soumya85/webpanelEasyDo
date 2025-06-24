import React from "react";
import { RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface LayoutControlsProps {
  onReset: () => void;
  isDirty?: boolean;
}

export const LayoutControls: React.FC<LayoutControlsProps> = ({
  onReset,
  isDirty = false,
}) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-8 cursor-default font-medium text-gray-900 pointer-events-none"
        >
          <Save className="w-3 h-3 mr-1" />
          Layout auto-saved
        </Button>
        {isDirty && (
          <Badge className="text-xs bg-blue-100 text-blue-700">
            Drag cards to rearrange
          </Badge>
        )}
      </div>
      <Button
        onClick={onReset}
        variant="outline"
        size="sm"
        className="text-xs h-8 font-medium text-gray-900"
      >
        <RotateCcw className="w-3 h-3 mr-1" />
        Reset Layout
      </Button>
    </div>
  );
};
