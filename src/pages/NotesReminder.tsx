import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Clock, Paperclip, Plus, X, Check } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  reminderDate?: string;
  reminderTime?: string;
  attachment?: File | null;
}

export default function NotesReminder() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [reminderDate, setReminderDate] = useState<string>("");
  const [reminderTime, setReminderTime] = useState<string>("");
  const [noteAttachment, setNoteAttachment] = useState<File | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const createNote = () => {
    if (newNote.title.trim() || newNote.content.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        createdAt: new Date(),
        updatedAt: new Date(),
        reminderDate,
        reminderTime,
        attachment: noteAttachment,
      };
      setNotes([note, ...notes]);
      setNewNote({ title: "", content: "" });
      setReminderDate("");
      setReminderTime("");
      setNoteAttachment(null);
      setIsCreating(false);
    }
  };

  const saveEdit = () => {
    if (editingNote) {
      setNotes(notes.map(n => n.id === editingNote.id ? editingNote : n));
      setEditingNote(null);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-inter">
      {/* Fixed Header */}
      <header className="bg-white border-b px-6 py-6 flex flex-col md:flex-row items-center justify-between shadow-sm sticky top-0 z-20">
        <h1 className="text-2xl font-extrabold text-indigo-800 tracking-tight">Notes & Reminders</h1>
      </header>
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-2">
        <div className="max-w-3xl mx-auto p-6 pb-32">
          {/* Create Note Section */}
          <Card className="mb-8 bg-white border shadow-md">
            <CardContent className="p-6">
              {!isCreating ? (
                <button
                  className="flex items-center gap-3 cursor-pointer w-full text-left text-gray-500 hover:text-blue-700 transition"
                  onClick={() => setIsCreating(true)}
                >
                  <Plus size={20} className="text-gray-400" />
                  <span className="font-medium">Take a note...</span>
                </button>
              ) : (
                <div className="space-y-4">
                  <Input
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    placeholder="Title"
                    className="border-none bg-transparent text-lg font-semibold placeholder:text-gray-500"
                  />
                  <Textarea
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    placeholder="Take a note..."
                    className="border-none bg-transparent resize-none placeholder:text-gray-500"
                    rows={3}
                  />
                  {/* Reminder & Attachment */}
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <CalendarIcon size={18} className="text-gray-400" />
                      <Input
                        type="date"
                        value={reminderDate}
                        onChange={e => setReminderDate(e.target.value)}
                        className="w-36"
                        placeholder="Date"
                      />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Clock size={18} className="text-gray-400" />
                      <Input
                        type="time"
                        value={reminderTime}
                        onChange={e => setReminderTime(e.target.value)}
                        className="w-28"
                        placeholder="Time"
                      />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Button
                          variant="outline"
                          className="w-fit flex items-center gap-2 h-8 text-xs"
                          asChild
                        >
                          <span>
                            <Paperclip className="w-4 h-4 mr-1" />
                            {noteAttachment ? noteAttachment.name : "Attachment"}
                          </span>
                        </Button>
                        <input
                          type="file"
                          className="hidden"
                          onChange={e => setNoteAttachment(e.target.files?.[0] || null)}
                        />
                        {noteAttachment && (
                          <button
                            type="button"
                            className="ml-2 text-xs text-red-500"
                            onClick={() => setNoteAttachment(null)}
                          >
                            Remove
                          </button>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setIsCreating(false);
                        setNewNote({ title: "", content: "" });
                        setReminderDate("");
                        setReminderTime("");
                        setNoteAttachment(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" onClick={createNote}>
                      Done
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {notes.length === 0 && (
              <div className="col-span-full text-center text-gray-400 py-12">
                No notes yet. Click "Take a note..." to get started!
              </div>
            )}
            {notes.map((note) => (
              <Card key={note.id} className="bg-white border shadow hover:shadow-lg transition">
                <CardContent className="p-5">
                  {editingNote && editingNote.id === note.id ? (
                    <div className="space-y-3">
                      <Input
                        value={editingNote.title}
                        onChange={e => setEditingNote({ ...editingNote, title: e.target.value })}
                        placeholder="Title"
                        className="border-none bg-transparent text-lg font-semibold placeholder:text-gray-500"
                      />
                      <Textarea
                        value={editingNote.content}
                        onChange={e => setEditingNote({ ...editingNote, content: e.target.value })}
                        placeholder="Take a note..."
                        className="border-none bg-transparent resize-none placeholder:text-gray-500"
                        rows={3}
                      />
                      <div className="flex items-center justify-end gap-2 mt-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setEditingNote(null)}
                        >
                          <X size={16} className="mr-1" />
                          Cancel
                        </Button>
                        <Button 
                          size="sm"
                          onClick={saveEdit}
                        >
                          <Check size={16} className="mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="font-semibold text-lg text-gray-900 mb-1">{note.title}</div>
                      <div className="text-gray-700 whitespace-pre-line mb-3">{note.content}</div>
                      {(note.reminderDate || note.reminderTime || note.attachment) && (
                        <div className="flex flex-wrap gap-3 items-center text-xs text-gray-500 mb-2">
                          {note.reminderDate && (
                            <span className="flex items-center gap-1">
                              <CalendarIcon size={14} /> {note.reminderDate}
                            </span>
                          )}
                          {note.reminderTime && (
                            <span className="flex items-center gap-1">
                              <Clock size={14} /> {note.reminderTime}
                            </span>
                          )}
                          {note.attachment && (
                            <span className="flex items-center gap-1">
                              <Paperclip size={14} />
                              {note.attachment.name}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex justify-end gap-2 mt-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingNote(note)}
                          aria-label="Edit"
                        >
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-500">
                            <path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13z" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setNotes(notes.filter(n => n.id !== note.id))}
                          aria-label="Delete"
                        >
                          <X size={18} className="text-red-500" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/* Fixed Footer */}
      <footer className="bg-white border-t px-6 py-4 flex items-center justify-center shadow-sm sticky bottom-0 z-20">
        <span className="text-xs text-gray-500">© {new Date().getFullYear()} EasyDo. All rights reserved.</span>
      </footer>
    </div>
  );
}
