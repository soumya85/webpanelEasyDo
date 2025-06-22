import React, { useState } from "react";
import { MapPin, User, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

// Dummy employee location data
const employeeLocations = [
  {
    id: "1",
    name: "Amit Sharma",
    avatar: "AS",
    position: "Software Engineer",
    branch: "Head Office",
    lastSeen: "2025-06-23 09:15",
    location: "Kolkata, India",
    lat: 22.5726,
    lng: 88.3639,
    status: "Online",
  },
  {
    id: "2",
    name: "Priya Verma",
    avatar: "PV",
    position: "HR Manager",
    branch: "New Delhi",
    lastSeen: "2025-06-23 08:50",
    location: "New Delhi, India",
    lat: 28.6139,
    lng: 77.209,
    status: "Offline",
  },
  {
    id: "3",
    name: "Rahul Das",
    avatar: "RD",
    position: "Accountant",
    branch: "Haldia",
    lastSeen: "2025-06-23 09:05",
    location: "Haldia, India",
    lat: 22.0667,
    lng: 88.0698,
    status: "Online",
  },
  {
    id: "4",
    name: "Sneha Mukherjee",
    avatar: "SM",
    position: "Operations Lead",
    branch: "Paradip",
    lastSeen: "2025-06-23 08:30",
    location: "Paradip, India",
    lat: 20.3167,
    lng: 86.6086,
    status: "Offline",
  },
];

export default function EmployeeLocation() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = employeeLocations.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.position.toLowerCase().includes(search.toLowerCase()) ||
      emp.branch.toLowerCase().includes(search.toLowerCase()) ||
      emp.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-inter flex flex-col">
      {/* Header */}
      <div className="w-full sticky top-0 z-30 bg-gradient-to-r from-indigo-700 via-blue-600 to-blue-400 shadow">
        <div className="max-w-7xl mx-auto flex flex-col gap-1 px-4 py-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-8 w-8 text-white bg-indigo-500 rounded-full p-1 shadow" />
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight drop-shadow">
                Employee Location Tracking
              </h1>
            </div>
          </div>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mt-1 text-xs">
            <span
              className="text-blue-100 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/company-dashboard")}
            >
              Company Dashboard
            </span>
            <ChevronRight className="w-3 h-3 text-blue-100" />
            <span className="text-blue-100">Location</span>
          </nav>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-4">
        <Input
          className="w-full md:w-80 text-sm"
          placeholder="Search employee, branch, or location"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Employee Locations List */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((emp) => (
            <div
              key={emp.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-lg font-bold text-indigo-700">
                  {emp.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 truncate">{emp.name}</h3>
                  <div className="text-xs text-gray-500">{emp.position}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Badge className="bg-blue-100 text-blue-700 text-[11px]">{emp.branch}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span className="text-xs text-gray-700">{emp.location}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500">Last Seen:</span>
                <span className="text-xs text-gray-700 font-medium">{emp.lastSeen}</span>
              </div>
              <div className="flex items-center gap-2 mt-auto">
                <Badge
                  className={
                    emp.status === "Online"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }
                >
                  {emp.status}
                </Badge>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${emp.lat},${emp.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-xs text-indigo-600 hover:underline"
                >
                  View on Map
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
