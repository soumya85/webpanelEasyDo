import React, { useState } from "react";
import { Building2, Plus, ChevronRight, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

// Dummy map modal for picking location
function MapModal({ open, onClose, onSelect }: { open: boolean; onClose: () => void; onSelect: (location: string) => void }) {
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(null);

  return open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>✕</button>
        <h2 className="text-lg font-bold mb-4">Select Location on Map</h2>
        <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center mb-4 relative">
          {/* Replace this div with a real map component (e.g. react-leaflet or Google Maps) */}
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded shadow"
            onClick={() => {
              // Example: select Kolkata
              setSelected({ lat: 22.5726, lng: 88.3639 });
              onSelect("Kolkata, India");
              onClose();
            }}
          >
            Click to select Kolkata (Demo)
          </button>
        </div>
        {selected && (
          <div className="text-xs text-gray-600">
            Selected: Lat {selected.lat}, Lng {selected.lng}
          </div>
        )}
      </div>
    </div>
  ) : null;
}

const initialBranches = [
  { id: "1", name: "Head Office", location: "Kolkata, India" },
  { id: "2", name: "New Delhi", location: "New Delhi, India" },
  { id: "3", name: "Haldia", location: "Haldia, India" },
  { id: "4", name: "Paradip", location: "Paradip, India" },
];

export default function BranchManagement() {
  const [branches, setBranches] = useState(initialBranches);
  const [showAdd, setShowAdd] = useState(false);
  const [newBranch, setNewBranch] = useState({ name: "", location: "" });
  const [search, setSearch] = useState("");
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();

  const filteredBranches = branches.filter(
    b =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranch.name.trim() || !newBranch.location.trim()) return;
    setBranches([
      ...branches,
      {
        id: (branches.length + 1).toString(),
        name: newBranch.name.trim(),
        location: newBranch.location.trim(),
      },
    ]);
    setNewBranch({ name: "", location: "" });
    setShowAdd(false);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-inter flex flex-col">
      {/* Header */}
      <div className="w-full sticky top-0 z-30 bg-gradient-to-r from-indigo-700 via-blue-600 to-blue-400 shadow">
        <div className="max-w-7xl mx-auto flex flex-col gap-1 px-4 py-4">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-white bg-indigo-500 rounded-full p-1 shadow" />
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight drop-shadow">
                Branch Management
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
            <span className="text-blue-100">Branch</span>
          </nav>
        </div>
      </div>

      {/* Actions */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-4 flex flex-col md:flex-row gap-2 md:gap-4 items-center">
        <Input
          className="w-full md:w-64 text-sm"
          placeholder="Search branch or location"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Button
          className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 text-sm rounded shadow flex items-center gap-2"
          onClick={() => setShowAdd(true)}
        >
          <Plus className="w-4 h-4" /> Add Branch
        </Button>
      </div>

      {/* Add Branch Form */}
      {showAdd && (
        <div className="max-w-2xl mx-auto w-full px-4 py-4">
          <form
            onSubmit={handleAddBranch}
            className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-3 items-center"
          >
            <Input
              className="flex-1"
              placeholder="Branch Name"
              value={newBranch.name}
              onChange={e => setNewBranch({ ...newBranch, name: e.target.value })}
              required
            />
            <div className="flex-1 flex gap-2 items-center">
              <Input
                placeholder="Location"
                value={newBranch.location}
                onChange={e => setNewBranch({ ...newBranch, location: e.target.value })}
                required
              />
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => setShowMap(true)}
                title="Pick from map"
              >
                <MapPin className="w-4 h-4" /> Map
              </Button>
            </div>
            <Button
              type="submit"
              className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 text-sm rounded shadow"
            >
              Save
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowAdd(false)}
              className="text-gray-500"
            >
              Cancel
            </Button>
          </form>
          {/* Map Modal */}
          <MapModal
            open={showMap}
            onClose={() => setShowMap(false)}
            onSelect={loc => setNewBranch(b => ({ ...b, location: loc }))}
          />
        </div>
      )}

      {/* Branch List */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 overflow-auto">
        {filteredBranches.length === 0 ? (
          <div className="text-center text-gray-400 py-16 text-base">No branches found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBranches.map(branch => (
              <Card key={branch.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-8 h-8 text-indigo-500" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 truncate">{branch.name}</h3>
                      <div className="text-xs text-gray-500">{branch.location}</div>
                    </div>
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
