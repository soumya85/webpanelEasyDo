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
              onClick={() => {
                console.log("Holiday card clicked");
                alert("Holiday card clicked!");
                setIsModalOpen(true);
              }}
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

      {/* Holiday Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Holiday Details
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Complete information about the upcoming holiday
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Holiday Header */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">BAKRID</h2>
              <Badge className="bg-[#4766E5] text-white font-medium">
                General Holiday
              </Badge>
            </div>

            {/* Date and Time Information */}
            <div className="bg-blue-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-semibold text-gray-800">Date</div>
                  <div className="text-gray-600">Saturday, June 07, 2025</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-semibold text-gray-800">Duration</div>
                  <div className="text-gray-600">Full Day</div>
                </div>
              </div>
            </div>

            {/* Location and Coverage */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Location</div>
                  <div className="text-gray-600">Head Office</div>
                  <div className="text-sm text-gray-500 mt-1">
                    All departments included
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-600 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">
                    Applicable To
                  </div>
                  <div className="text-gray-600">All employees</div>
                  <div className="text-sm text-gray-500 mt-1">
                    No exceptions
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-gray-600 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">
                    Additional Information
                  </div>
                  <div className="text-gray-600 text-sm">
                    Bakrid (Eid al-Adha) is a significant Islamic holiday
                    celebrating the willingness of Ibrahim to sacrifice his son
                    as an act of obedience to God.
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </Button>
              <Button className="flex-1 bg-[#4766E5] hover:bg-[#4766E5]/90">
                Add to Calendar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
