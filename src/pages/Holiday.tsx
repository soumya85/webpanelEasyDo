import React, { useState } from "react";
import { Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const initialHolidays = [
  {
    id: "1",
    name: "Republic Day",
    date: "2025-01-26",
    type: "public",
    description: "National holiday across India.",
  },
  {
    id: "2",
    name: "Company Foundation Day",
    date: "2025-03-15",
    type: "company",
    description: "Celebrating the founding of the company.",
  },
  {
    id: "3",
    name: "Bengali New Year",
    date: "2025-04-15",
    type: "regional",
    description: "Regional holiday for West Bengal.",
  },
  {
    id: "4",
    name: "Independence Day",
    date: "2025-08-15",
    type: "public",
    description: "National holiday across India.",
  },
  {
    id: "5",
    name: "Christmas",
    date: "2025-12-25",
    type: "public",
    description: "Observed as a public holiday.",
  },
  {
    id: "6",
    name: "Annual Company Picnic",
    date: "2025-10-10",
    type: "company",
    description: "Company-wide picnic event.",
  },
  {
    id: "7",
    name: "Chhath Puja",
    date: "2025-11-06",
    type: "regional",
    description: "Regional holiday for Bihar and nearby states.",
  },
];

const filterTabs = [
  { key: "all", label: "All" },
  { key: "public", label: "Public" },
  { key: "company", label: "Company" },
  { key: "regional", label: "Regional" },
];

const typeColors: Record<string, string> = {
  public: "bg-blue-100 text-blue-700",
  company: "bg-indigo-100 text-indigo-700",
  regional: "bg-green-100 text-green-700",
};

export default function Holiday() {
  const [holidays] = useState(initialHolidays);
  const [filter, setFilter] = useState<"all" | "public" | "company" | "regional">("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = holidays.filter(
    h =>
      (filter === "all" || h.type === filter) &&
      (h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-inter flex flex-col">
      {/* Header */}
      <div className="w-full sticky top-0 z-30 bg-gradient-to-r from-indigo-700 via-blue-600 to-blue-400 shadow">
        <div className="max-w-7xl mx-auto flex flex-col gap-1 px-4 py-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-white bg-indigo-500 rounded-full p-1 shadow" />
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight drop-shadow">
                Holidays
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
            <span className="text-blue-100">Holiday</span>
          </nav>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-4 flex flex-col md:flex-row gap-2 md:gap-4 items-center">
        <Input
          className="w-full md:w-64 text-sm"
          placeholder="Search holiday"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          {filterTabs.map(tab => (
            <Button
              key={tab.key}
              className={
                filter === tab.key
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-indigo-700 border"
              }
              onClick={() => setFilter(tab.key as any)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Holiday List */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 overflow-auto">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 py-16 text-base">No holidays found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(h => (
              <Card key={h.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-8 h-8 text-indigo-500" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 truncate">{h.name}</h3>
                      <div className="text-xs text-gray-500">{h.date}</div>
                    </div>
                  </div>
                  <div className="flex-1 text-sm text-gray-700 mb-2">{h.description}</div>
                  <div className="mt-auto flex items-center gap-2 pt-2 border-t">
                    <Badge className={typeColors[h.type] + " text-[11px]"}>
                      {h.type.charAt(0).toUpperCase() + h.type.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
