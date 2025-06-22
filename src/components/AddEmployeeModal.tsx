import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const branches = ["Head Office", "New Delhi", "Haldia", "Paradip"];
const roles = ["Admin", "Manager", "Employee"];
const managers = ["Bhaskar Ghosh", "Debashis Debnath", "Nayanjyoti Mandal", "Digambar Khuntia"];
const salaryTypes = ["Monthly", "Per Hour", "Daily", "Weekly"];
const allowances = ["HRA", "Travel", "Medical"];
const deductions = ["PF", "ESI", "Professional Tax"];
const saturdays = ["1st", "2nd", "3rd", "4th", "5th"];

export default function AddEmployeeModal({ open, onClose }: Props) {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [showCustomTiming, setShowCustomTiming] = useState(false);
  const [overtimeAllowed, setOvertimeAllowed] = useState("no");
  const [workingSaturday, setWorkingSaturday] = useState("no");
  const [includeAllowances, setIncludeAllowances] = useState(false);
  const [includeDeductions, setIncludeDeductions] = useState(false);
  const [attendanceSelfie, setAttendanceSelfie] = useState("no");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-3xl p-0 overflow-hidden rounded-2xl shadow-2xl border-0"
        style={{ maxHeight: "90vh", display: "flex", flexDirection: "column" }}
      >
        <DialogHeader className="bg-gradient-to-r from-blue-600 to-blue-400 px-8 py-6">
          <DialogTitle className="text-2xl font-bold text-white">Add New Employee</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto" style={{ flex: 1, minHeight: 0 }}>
          <form className="px-8 py-8 bg-white space-y-10">
            {/* Section: Basic Info */}
            <section>
              <h2 className="text-lg font-semibold text-blue-700 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Branch selection dropdown */}
                <div>
                  <Label className="font-medium">Branch</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map(branch => (
                        <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Contact select (max one, removable) */}
                <div>
                  <Label className="font-medium">Contact</Label>
                  {!selectedContact ? (
                    <Input
                      placeholder="Select contact"
                      onBlur={e => setSelectedContact(e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="bg-gray-100 px-2 py-1 rounded">{selectedContact}</span>
                      <Button type="button" size="icon" variant="ghost" onClick={() => setSelectedContact(null)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  )}
                </div>
                {/* Name input */}
                <div>
                  <Label className="font-medium">Name</Label>
                  <Input placeholder="Enter name" />
                </div>
                {/* Contact input with country code */}
                <div>
                  <Label className="font-medium">Contact Number</Label>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="+91" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+91">+91</SelectItem>
                        <SelectItem value="+1">+1</SelectItem>
                        <SelectItem value="+44">+44</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Phone number" />
                  </div>
                </div>
                {/* Email input with validation */}
                <div>
                  <Label className="font-medium">Email</Label>
                  <Input type="email" placeholder="Enter email" required />
                </div>
                {/* Date of birth */}
                <div>
                  <Label className="font-medium">Date of Birth</Label>
                  <Input type="date" />
                </div>
                {/* Designation input */}
                <div>
                  <Label className="font-medium">Designation</Label>
                  <Input placeholder="Enter designation" />
                </div>
                {/* Role dropdown */}
                <div>
                  <Label className="font-medium">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Reporting manager dropdown */}
                <div>
                  <Label className="font-medium">Reporting Manager</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      {managers.map(mgr => (
                        <SelectItem key={mgr} value={mgr}>{mgr}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* Section: Work & Salary */}
            <section>
              <h2 className="text-lg font-semibold text-blue-700 mb-4">Work & Salary Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Branch timing selection with custom */}
                <div>
                  <Label className="font-medium">Branch Timing</Label>
                  <Select onValueChange={v => setShowCustomTiming(v === "custom")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9-6">9:00 AM - 6:00 PM</SelectItem>
                      <SelectItem value="10-7">10:00 AM - 7:00 PM</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  {showCustomTiming && (
                    <Input className="mt-2" placeholder="Enter custom timing" />
                  )}
                </div>
                {/* Overtime allowed radio */}
                <div>
                  <Label className="font-medium">Overtime Allowed</Label>
                  <RadioGroup value={overtimeAllowed} onValueChange={setOvertimeAllowed} className="flex gap-6 mt-2">
                    <div className="flex items-center gap-1">
                      <RadioGroupItem value="yes" /> <span>Yes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <RadioGroupItem value="no" /> <span>No</span>
                    </div>
                  </RadioGroup>
                </div>
                {/* Selected shift timing show */}
                <div>
                  <Label className="font-medium">Selected Shift Timing</Label>
                  <div className="bg-blue-50 text-blue-700 rounded px-3 py-2 font-medium">9:00 AM - 6:00 PM</div>
                </div>
                {/* Manage working Saturday */}
                <div>
                  <Label className="font-medium">Manage Working Saturday</Label>
                  <RadioGroup value={workingSaturday} onValueChange={setWorkingSaturday} className="flex gap-6 mt-2">
                    <div className="flex items-center gap-1">
                      <RadioGroupItem value="yes" /> <span>Yes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <RadioGroupItem value="no" /> <span>No</span>
                    </div>
                  </RadioGroup>
                  {workingSaturday === "yes" && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {saturdays.map(sat => (
                        <div key={sat} className="flex items-center gap-1">
                          <Checkbox id={`sat-${sat}`} />
                          <Label htmlFor={`sat-${sat}`}>{sat}</Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Leave balance */}
                <div>
                  <Label className="font-medium">Leave Balance</Label>
                  <Input type="number" min={0} placeholder="Enter leave balance" />
                </div>
                {/* Salary detail dropdown */}
                <div>
                  <Label className="font-medium">Salary Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select salary type" />
                    </SelectTrigger>
                    <SelectContent>
                      {salaryTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Basic salary input */}
                <div>
                  <Label className="font-medium">Basic Salary</Label>
                  <Input type="number" min={0} placeholder="Enter basic salary" />
                </div>
              </div>
              {/* Allowances and Deductions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Include allowances */}
                <div>
                  <div className="flex items-center">
                    <Checkbox checked={includeAllowances} onCheckedChange={v => setIncludeAllowances(!!v)} id="allowances" />
                    <Label htmlFor="allowances" className="ml-2 font-medium">Include Allowances</Label>
                  </div>
                  {includeAllowances && (
                    <div className="flex gap-4 mt-2 flex-wrap">
                      {allowances.map(a => (
                        <div key={a} className="flex items-center gap-1">
                          <Checkbox id={`allowance-${a}`} />
                          <Label htmlFor={`allowance-${a}`}>{a}</Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Include deductions */}
                <div>
                  <div className="flex items-center">
                    <Checkbox checked={includeDeductions} onCheckedChange={v => setIncludeDeductions(!!v)} id="deductions" />
                    <Label htmlFor="deductions" className="ml-2 font-medium">Include Deductions</Label>
                  </div>
                  {includeDeductions && (
                    <div className="flex gap-4 mt-2 flex-wrap">
                      {deductions.map(d => (
                        <div key={d} className="flex items-center gap-1">
                          <Checkbox id={`deduction-${d}`} />
                          <Label htmlFor={`deduction-${d}`}>{d}</Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Section: Employee Details & Verification */}
            <section>
              <h2 className="text-lg font-semibold text-blue-700 mb-4">Employee Details & Verification</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Employee details */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <Label className="font-medium mb-2 block">Employee Details</Label>
                  <div className="grid grid-cols-1 gap-3">
                    <Input placeholder="UAN Number" />
                    <Input placeholder="PF Number" />
                    <Input placeholder="PAN Number" />
                    <Input placeholder="ESI Number" />
                    <Input type="date" placeholder="Date of Joining" />
                  </div>
                </div>
                {/* Verification section */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <Label className="font-medium mb-2 block">Verification</Label>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex gap-2">
                      <Input placeholder="Aadhar" />
                      <Button type="button" variant="secondary">Verify</Button>
                    </div>
                    <div className="flex gap-2">
                      <Input placeholder="PAN" />
                      <Button type="button" variant="secondary">Verify</Button>
                    </div>
                    <div className="flex gap-2">
                      <Input placeholder="UAN" />
                      <Button type="button" variant="secondary">Verify</Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Attendance */}
            <section>
              <h2 className="text-lg font-semibold text-blue-700 mb-4">Attendance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Attendance tag input */}
                <div>
                  <Label className="font-medium">Attendance Tag</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter tag" />
                    <Button type="button" variant="secondary">Copy to Card</Button>
                  </div>
                </div>
                {/* Attendance selfie section */}
                <div>
                  <Label className="font-medium">Attendance Selfie</Label>
                  <RadioGroup value={attendanceSelfie} onValueChange={setAttendanceSelfie} className="flex gap-6 mt-2">
                    <div className="flex items-center gap-1">
                      <RadioGroupItem value="yes" /> <span>Yes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <RadioGroupItem value="no" /> <span>No</span>
                    </div>
                  </RadioGroup>
                  {attendanceSelfie === "yes" && (
                    <Input type="file" accept="image/*" multiple className="mt-2" />
                  )}
                </div>
                {/* Attendance location selection */}
                <div className="md:col-span-2">
                  <Label className="font-medium">Attendance Location</Label>
                  <Input placeholder="Enter location" />
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t mt-8">
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Employee
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
