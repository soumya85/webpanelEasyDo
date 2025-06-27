import React, { useState } from "react";
import {
  FileText,
  Download,
  Upload,
  Plus,
  ChevronRight,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useTranslation } from "@/hooks/useTranslation";

const initialDocuments = [
  {
    id: "1",
    name: "Employee Handbook.pdf",
    uploadedAt: "2025-06-01",
    uploader: "HR Team",
    url: "#",
  },
  {
    id: "2",
    name: "Holiday List 2025.xlsx",
    uploadedAt: "2025-06-10",
    uploader: "Admin",
    url: "#",
  },
  {
    id: "3",
    name: "Safety Guidelines.docx",
    uploadedAt: "2025-06-15",
    uploader: "Operations",
    url: "#",
  },
];

export default function Documents() {
  const { t } = useTranslation();
  const [documents, setDocuments] = useState(initialDocuments);
  const [showDialog, setShowDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [newDoc, setNewDoc] = useState<{ file: File | null; uploader: string }>(
    { file: null, uploader: "" },
  );
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const filtered = documents.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.uploader.toLowerCase().includes(search.toLowerCase()),
  );

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.file || !newDoc.uploader) return;
    setDocuments([
      {
        id: (documents.length + 1).toString(),
        name: newDoc.file.name,
        uploadedAt: format(new Date(), "yyyy-MM-dd"),
        uploader: newDoc.uploader,
        url: "#",
      },
      ...documents,
    ]);
    setShowDialog(false);
    setNewDoc({ file: null, uploader: "" });
    setFileName("");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-inter flex flex-col">
      {/* Header */}
      <div className="w-full sticky top-0 z-30 bg-gradient-to-r from-indigo-700 via-blue-600 to-blue-400 shadow">
        <div className="max-w-7xl mx-auto flex flex-col gap-1 px-4 py-4">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-white bg-indigo-500 rounded-full p-1 shadow" />
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight drop-shadow">
                Documents
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
            <span className="text-blue-100">Documents</span>
          </nav>
        </div>
      </div>

      {/* Actions */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-4 flex flex-col md:flex-row gap-2 md:gap-4 items-center">
        <Input
          className="w-full md:w-64 text-sm"
          placeholder="Search document"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 text-sm rounded shadow flex items-center gap-2"
          onClick={() => setShowDialog(true)}
        >
          <Plus className="w-4 h-4" /> Upload Document
        </Button>
      </div>

      {/* Document List */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 overflow-auto">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 py-16 text-base">
            No documents found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((doc) => (
              <Card
                key={doc.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition"
              >
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-8 h-8 text-indigo-500" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 truncate">
                        {doc.name}
                      </h3>
                      <div className="text-xs text-gray-500">
                        {doc.uploader}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    Uploaded:{" "}
                    <span className="text-gray-700">{doc.uploadedAt}</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-2 border-t">
                    <a
                      href={doc.url}
                      download={doc.name}
                      className="flex items-center gap-1 text-indigo-600 hover:underline text-xs"
                    >
                      <Download className="w-4 h-4" /> Download
                    </a>
                    <Badge className="bg-gray-100 text-gray-700 text-[11px]">
                      {doc.name.split(".").pop()?.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Upload Document Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-600" />
                <span className="text-xl font-bold text-indigo-800">
                  Upload Document
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Uploader Name
              </label>
              <Input
                required
                className="w-full bg-gray-50"
                placeholder="Uploader name"
                value={newDoc.uploader}
                onChange={(e) =>
                  setNewDoc({ ...newDoc, uploader: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Document File
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  required
                  className="block w-full text-xs text-gray-700 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-indigo-50 file:text-indigo-700"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setNewDoc({ ...newDoc, file });
                    setFileName(file ? file.name : "");
                  }}
                />
                {fileName && (
                  <span className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs">
                    <FileText className="w-3 h-3" /> {fileName}
                    <button
                      type="button"
                      className="ml-1 text-gray-400 hover:text-red-500"
                      onClick={() => {
                        setNewDoc({ ...newDoc, file: null });
                        setFileName("");
                      }}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Upload
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
