import {
  ChevronRight,
  Calendar,
  MapPin,
  Users,
  Info,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function UpcomingHolidays() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="w-full h-full">
      {/* Card with background starting from title */}
      <Card className="bg-white border border-gray-200 shadow-sm h-full flex flex-col">
        <CardContent className="p-6 flex-1 flex flex-col">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#283C50] font-inter text-xl font-bold">
              Upcoming Holidays
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#4766E5] hover:text-[#4766E5]/80"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Holiday Card Content */}
          <div className="flex-1 flex flex-col justify-center">
            <div
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200 group"
              onClick={() => setIsModalOpen(true)}
            >
              {/* Date Section */}
              <div className="flex flex-col items-center justify-center bg-blue-50 rounded-lg p-4 min-w-[80px] border-b-4 border-blue-500 group-hover:bg-blue-100 transition-colors duration-200">
                <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                  Sat
                </div>
                <div className="text-2xl font-bold text-blue-600">07</div>
                <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                  JUN 25
                </div>
              </div>

              {/* Holiday Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                      BAKRID
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Sat, 07 June 2025</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Location:</span> Head Office
                    </div>
                  </div>

                  {/* Holiday Type Badge */}
                  <Badge className="bg-[#4766E5] text-white font-medium">
                    General
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Information */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 text-center">
              Next 5 holidays available in calendar
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
