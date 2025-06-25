import React from "react";
import { Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Meter } from "@/components/ui/meter";
import { DashboardCard } from "../DashboardCard";
import { CardSize } from "@/types/cardSize";

interface MeterDemoCardProps {
  id: string;
  index: number;
  size?: CardSize;
  onResize?: (cardId: string, newSize: CardSize) => void;
}

export const MeterDemoCard: React.FC<MeterDemoCardProps> = ({
  id,
  index,
  size,
  onResize,
}) => {
  return (
    <DashboardCard id={id} index={index} size={size} onResize={onResize}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-50">
          <Gauge className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-sm font-semibold text-[#283C50]">
          Performance Metrics
        </h3>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Primary Meter */}
        <div className="mb-6">
          <Meter
            value={78.5}
            label="Overall Performance"
            variant="success"
            size="md"
            type="half"
            min={0}
            max={100}
            unit="%"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <Meter
              value={92}
              label="Quality"
              variant="default"
              size="sm"
              type="half"
              showLabels={false}
              showScale={false}
            />
          </div>
          <div className="text-center">
            <Meter
              value={65}
              label="Speed"
              variant="warning"
              size="sm"
              type="half"
              showLabels={false}
              showScale={false}
            />
          </div>
        </div>

        <Button
          className="w-full h-8 text-xs text-gray-700 hover:opacity-90 mt-auto"
          style={{
            backgroundColor: "#eff5ff",
            borderColor: "#bfdbfe",
            borderWidth: "1px",
          }}
        >
          View Detailed Analytics
        </Button>
      </div>
    </DashboardCard>
  );
};
