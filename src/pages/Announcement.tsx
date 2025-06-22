import React, { useState } from "react";
import { Megaphone, Plus, Paperclip, ChevronRight, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

const branches = [
  "All",
  "Head Office",
  "New Delhi",
  "Haldia",
  "Paradip"
];

const initialAnnouncements = [
  {
    id: "1",
    title: "Annual Company Meet",
    description: "Join us for the annual company meet at the Head Office auditorium.",
    date: "2025-07-10",
    branch: "Head Office",
    attachment: "",
    createdAt: "2025-06-20",
  },
  {
    id: "2",
    title: "Holiday Notice",
    description: "Office will remain closed on 15th August for Independence Day.",
    date: "2025-08-15",
    branch: "All",
    attachment: "",
    createdAt: "2025-06-22",
  },
  {
    id: "3",
    title: "New Branch Opening",
    description: "We are excited to announce the opening of our new branch in Haldia.",
    date: "2025-07-01",
    branch: "Haldia",
    attachment: "",
    createdAt: "2025-06-18",
  },
];

export default function Announcement() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showDialog, setShowDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [filterBranch, setFilterBranch] = useState("All");
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    date: "",
    branch: "All",
    attachment: null as File | null,
  });
  const [attachmentName, setAttachmentName] = useState("");
  const navigate = useNavigate();

  const filtered = announcements.filter(
    a =>
      (filterBranch === "All" || a.branch === filterBranch) &&
      (a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase()))
  );

  const handleNewAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    setAnnouncements([
      {
        id: (announcements.length + 1).toString(),
        title: newAnnouncement.title,
        description: newAnnouncement.description,
        date: newAnnouncement.date,
        branch: newAnnouncement.branch,
        attachment: attachmentName,
        createdAt: format(new Date(), "yyyy-MM-dd"),
      },
      ...announcements,
    ]);
    setShowDialog(false);
    setNewAnnouncement({
      title: "",
      description: "",
      date: "",
      branch: "All",
      attachment: null,
    });
    setAttachmentName("");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-inter flex flex-col">
      {/* Header */}
      <div className="w-full sticky top-0 z-30 bg-gradient-to-r from-indigo-700 via-blue-600 to-blue-400 shadow">
        <div className="max-w-7xl mx-auto flex flex-col gap-1 px-4 py-4">
          <div className="flex items-center gap-3">
            <Megaphone className="h-8 w-8 text-white bg-indigo-500 rounded-full p-1 shadow" />
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight drop-shadow">
                Announcements
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
            <span className="text-blue-100">Announcement</span>
          </nav>
        </div>
      </div>

      {/* Actions */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-4 flex flex-col md:flex-row gap-2 md:gap-4 items-center">
        <Input
          className="w-full md:w-64 text-sm"
          placeholder="Search announcement"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border border-indigo-200 rounded px-2 py-2 text-sm bg-white text-indigo-700 focus:border-indigo-400 transition"
          value={filterBranch}
          onChange={e => setFilterBranch(e.target.value)}
        >
          {branches.map(branch => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>
        <Button
          className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 text-sm rounded shadow flex items-center gap-2"
          onClick={() => setShowDialog(true)}
        >
          <Plus className="w-4 h-4" /> New Announcement
        </Button>
      </div>

      {/* Announcement List */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 overflow-auto">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 py-16 text-base">No announcements found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(a => (
              <Card key={a.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <Megaphone className="w-8 h-8 text-indigo-500" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 truncate">{a.title}</h3>
                      <div className="text-xs text-gray-500">{a.branch}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    Date: <span className="text-gray-700">{a.date}</span>
                  </div>
                  <div className="flex-1 text-sm text-gray-700 mb-2 line-clamp-4">{a.description}</div>
                  {a.attachment && (
                    <div className="flex items-center gap-1 mt-2">
                      <Paperclip className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs text-indigo-700">{a.attachment}</span>
                    </div>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-2 border-t">
                    <Badge className="bg-gray-100 text-gray-700 text-[11px]">
                      Created: {a.createdAt}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* New Announcement Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-indigo-600" />
                <span className="text-xl font-bold text-indigo-800">New Announcement</span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleNewAnnouncement} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
              <Input
                required
                className="w-full bg-gray-50"
                placeholder="Announcement title"
                value={newAnnouncement.title}
                onChange={e => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <Textarea
                required
                className="w-full bg-gray-50"
                placeholder="Write announcement details"
                value={newAnnouncement.description}
                onChange={e => setNewAnnouncement({ ...newAnnouncement, description: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                <Input
                  required
                  type="date"
                  className="w-full bg-gray-50"
                  value={newAnnouncement.date}
                  onChange={e => setNewAnnouncement({ ...newAnnouncement, date: e.target.value })}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Branch</label>
                <select
                  required
                  className="w-full border rounded px-2 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-200"
                  value={newAnnouncement.branch}
                  onChange={e => setNewAnnouncement({ ...newAnnouncement, branch: e.target.value })}
                >
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Attachment</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  className="block w-full text-xs text-gray-700 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-indigo-50 file:text-indigo-700"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    setNewAnnouncement({ ...newAnnouncement, attachment: file || null });
                    setAttachmentName(file ? file.name : "");
                  }}
                />
                {attachmentName && (
                  <span className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs">
                    <Paperclip className="w-3 h-3" /> {attachmentName}
                    <button
                      type="button"
                      className="ml-1 text-gray-400 hover:text-red-500"
                      onClick={() => {
                        setNewAnnouncement({ ...newAnnouncement, attachment: null });
                        setAttachmentName("");
                      }}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
                Create Announcement
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
