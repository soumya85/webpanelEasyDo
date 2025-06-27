import React from "react";
import { Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "../DashboardCard";
import { CardSize } from "@/types/cardSize";
import { useTranslation } from "@/hooks/useTranslation";

interface PerformanceCardProps {
  id: string;
  index: number;
  size?: CardSize;
  onResize?: (cardId: string, newSize: CardSize) => void;
}

export const PerformanceCard: React.FC<PerformanceCardProps> = ({
  id,
  index,
  size,
  onResize,
}) => {
  const { t } = useTranslation();

  return (
    <DashboardCard id={id} index={index} size={size} onResize={onResize}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-yellow-50">
          <Trophy className="w-5 h-5 text-yellow-600" />
        </div>
        <h3 className="text-sm font-semibold text-[#283C50]">
          {t("myPerformance")}
        </h3>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="text-center mb-4">
          <div className="flex justify-center mb-2">
            {[1, 2, 3, 4].map((star) => (
              <Star
                key={star}
                className="w-4 h-4 text-yellow-500 fill-current"
              />
            ))}
            <Star className="w-4 h-4 text-gray-300" />
          </div>
          <div className="text-2xl font-bold text-[#4766E5] mb-1">4.4</div>
          <div className="text-xs text-gray-600">
            {t("averageOverTaskReviews").replace("{count}", "23")}
          </div>
        </div>

        <div className="text-center mb-4">
          <div className="text-sm text-green-600 font-semibold mb-1">
            {t("niceKeepItUp")}
          </div>
        </div>

        <div className="text-center mb-4">
          <div className="w-12 h-12 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-2">
            <Trophy className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-xs font-semibold text-[#283C50]">
            {t("employeeOfTheMonth")}
          </div>
          <div className="text-xs text-gray-500">June 2025</div>
        </div>

        <Button
          className="w-full h-8 text-xs text-gray-700 hover:opacity-90 mt-auto"
          style={{
            backgroundColor: "#eff5ff",
            borderColor: "#bfdbfe",
            borderWidth: "1px",
          }}
        >
          {t("viewPerformanceDetails")}
        </Button>
      </div>
    </DashboardCard>
  );
};
