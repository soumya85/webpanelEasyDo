import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle, XCircle } from "lucide-react";

interface EmployeeProfileModalProps {
  open: boolean;
  employee: any;
  onClose: () => void;
}

export default function EmployeeProfileModal({
  open,
  employee,
  onClose,
}: EmployeeProfileModalProps) {
  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-2xl p-0 overflow-hidden shadow-2xl border-0">
        <VisuallyHidden>
          <DialogTitle>Employee Profile</DialogTitle>
        </VisuallyHidden>
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-8 py-8 flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-24 h-24 ring-4 ring-white shadow-lg">
            <AvatarFallback className="bg-blue-100 text-blue-700 text-3xl">
              {employee.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">{employee.name}</h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
              <span className="text-blue-100 text-base">
                {employee.position}
              </span>
              <Badge className="bg-white text-blue-700 font-semibold">
                {employee.branch}
              </Badge>
              <Badge className="bg-blue-700 text-white font-semibold">
                Authority: {employee.authority}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
              <span className="text-blue-100 text-sm">
                Reporting: {employee.reportingManager}
              </span>
              <span className="text-blue-100 text-sm">
                Status:
                <span
                  className={`ml-1 font-semibold ${employee.status === "approved" ? "text-green-200" : "text-red-200"}`}
                >
                  {employee.status}
                </span>
              </span>
              <span className="text-blue-100 text-sm">
                Rating: <span className="font-semibold">{employee.rating}</span>
              </span>
            </div>
          </div>
        </div>
        {/* Tabs Section */}
        <div className="px-8 pt-4 pb-2 bg-white">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="w-full grid grid-cols-4 mb-6 bg-gray-100 rounded-lg">
              <TabsTrigger value="personal" className="rounded-l-lg">
                Personal
              </TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="verify">Verify</TabsTrigger>
              <TabsTrigger value="documents" className="rounded-r-lg">
                Documents
              </TabsTrigger>
            </TabsList>
            {/* Personal Tab */}
            <TabsContent value="personal">
              <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                <div>
                  <div className="text-gray-500 font-medium mb-1">
                    Full Name:
                  </div>
                  <div className="text-gray-900 font-semibold">
                    {employee.name}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium mb-1">
                    Date of Joining:
                  </div>
                  <div className="text-gray-900">{employee.doj}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium mb-1">Email:</div>
                  <div className="text-gray-900">{employee.email || "N/A"}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium mb-1">Phone:</div>
                  <div className="text-gray-900">{employee.phone || "N/A"}</div>
                </div>
              </div>
            </TabsContent>
            {/* Professional Tab */}
            <TabsContent value="professional">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <div className="text-gray-500 font-medium mb-1">Position</div>
                  <div className="text-gray-900">{employee.position}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium mb-1">Branch</div>
                  <div className="text-gray-900">{employee.branch}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium mb-1">
                    Authority
                  </div>
                  <div className="text-gray-900">{employee.authority}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium mb-1">
                    Reporting Manager
                  </div>
                  <div className="text-gray-900">
                    {employee.reportingManager}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium mb-1">Status</div>
                  <div
                    className={`font-semibold ${employee.status === "approved" ? "text-green-600" : "text-red-600"}`}
                  >
                    {employee.status}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium mb-1">Rating</div>
                  <div className="text-gray-900">{employee.rating}</div>
                </div>
              </div>
            </TabsContent>
            {/* Verify Tab */}
            <TabsContent value="verify">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium">
                    Aadhar Verified:
                  </span>
                  {employee.aadharVerified ? (
                    <CheckCircle className="text-green-500 w-5 h-5" />
                  ) : (
                    <XCircle className="text-red-500 w-5 h-5" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium">
                    PAN Verified:
                  </span>
                  {employee.panVerified ? (
                    <CheckCircle className="text-green-500 w-5 h-5" />
                  ) : (
                    <XCircle className="text-red-500 w-5 h-5" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium">
                    UAN Verified:
                  </span>
                  {employee.uanVerified ? (
                    <CheckCircle className="text-green-500 w-5 h-5" />
                  ) : (
                    <XCircle className="text-red-500 w-5 h-5" />
                  )}
                </div>
              </div>
            </TabsContent>
            {/* Documents Tab */}
            <TabsContent value="documents">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <div className="text-gray-500 font-medium mb-1">Aadhar</div>
                  <div className="text-gray-900">
                    {employee.aadhar || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium mb-1">PAN</div>
                  <div className="text-gray-900">{employee.pan || "N/A"}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium mb-1">UAN</div>
                  <div className="text-gray-900">{employee.uan || "N/A"}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium mb-1">
                    PF Number
                  </div>
                  <div className="text-gray-900">{employee.pf || "N/A"}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium mb-1">
                    ESI Number
                  </div>
                  <div className="text-gray-900">{employee.esi || "N/A"}</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        {/* Modal Actions */}
        <div className="flex justify-end px-8 py-4 bg-gray-50 border-t">
          <DialogClose asChild>
            <Button variant="outline" className="min-w-[100px]">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
