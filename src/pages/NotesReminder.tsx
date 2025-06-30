import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Pin, 
  Archive, 
  Trash2, 
  Edit, 
  Check,
  X,
  Grid3X3,
  List,
  Calendar as CalendarIcon,
  Clock,
  Paperclip
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  isPinned: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const noteColors = [
  { name: "Default", value: "bg-white", border: "border-gray-200" },
  { name: "Red", value: "bg-red-100", border: "border-red-200" },
  { name: "Orange", value: "bg-orange-100", border: "border-orange-200" },
  { name: "Yellow", value: "bg-yellow-100", border: "border-yellow-200" },
  { name: "Green", value: "bg-green-100", border: "border-green-200" },
  { name: "Teal", value: "bg-teal-100", border: "border-teal-200" },
  { name: "Blue", value: "bg-blue-100", border: "border-blue-200" },
  { name: "Purple", value: "bg-purple-100", border: "border-purple-200" },
  { name: "Pink", value: "bg-pink-100", border: "border-pink-200" },
];

export default function NotesReminder() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Meeting Notes",
      content: "Discuss project timeline and deliverables for Q4",
      color: "bg-yellow-100",
      isPinned: true,
      isArchived: false,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      title: "Shopping List",
      content: "Milk, Bread, Eggs, Cheese, Apples",
      color: "bg-green-100",
      isPinned: false,
      isArchived: false,
      createdAt: new Date("2024-01-14"),
      updatedAt: new Date("2024-01-14"),
    },
    {
      id: "3",
      title: "Book Recommendations",
      content: "1. The Pragmatic Programmer\n2. Clean Code\n3. Design Patterns",
      color: "bg-blue-100",
      isPinned: false,
      isArchived: false,
      createdAt: new Date("2024-01-13"),
      updatedAt: new Date("2024-01-13"),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "", color: "bg-white" });
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [reminderDate, setReminderDate] = useState<string>("");
  const [reminderTime, setReminderTime] = useState<string>("");
  const [noteAttachment, setNoteAttachment] = useState<File | null>(null);

  const filteredNotes = notes.filter(note => 
    !note.isArchived && 
    (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     note.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.isPinned);

  const createNote = () => {
    if (newNote.title.trim() || newNote.content.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        color: newNote.color,
        isPinned: false,
        isArchived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        reminderDate,
        reminderTime,
        attachment: noteAttachment,
      };
      setNotes([note, ...notes]);
      setNewNote({ title: "", content: "", color: "bg-white" });
      setReminderDate("");
      setReminderTime("");
      setNoteAttachment(null);
      setIsCreating(false);
    }
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date() }
        : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const togglePin = (id: string) => {
    updateNote(id, { isPinned: !notes.find(n => n.id === id)?.isPinned });
  };

  const archiveNote = (id: string) => {
    updateNote(id, { isArchived: true });
  };

  const NoteCard = ({ note }: { note: Note }) => (
    <Card 
      className={`${note.color} ${noteColors.find(c => c.value === note.color)?.border} hover:shadow-md transition-shadow cursor-pointer relative group`}
      onClick={() => setEditingNote(note.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium text-sm line-clamp-2 flex-1">
            {note.title || "Untitled"}
          </h3>
          {note.isPinned && (
            <Pin size={16} className="text-gray-600 flex-shrink-0" />
          )}
        </div>
        <p className="text-sm text-gray-700 line-clamp-4 whitespace-pre-wrap">
          {note.content}
        </p>
        
        <div className="flex items-center justify-between mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-1">
            {noteColors.slice(0, 5).map((color) => (
              <button
                key={color.name}
                className={`w-6 h-6 rounded-full ${color.value} border ${color.border} hover:scale-110 transition-transform`}
                onClick={(e) => {
                  e.stopPropagation();
                  updateNote(note.id, { color: color.value });
                }}
              />
            ))}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => togglePin(note.id)}>
                <Pin size={16} className="mr-2" />
                {note.isPinned ? "Unpin" : "Pin"} note
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => archiveNote(note.id)}>
                <Archive size={16} className="mr-2" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => deleteNote(note.id)}
                className="text-red-600"
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );

  const EditNoteModal = ({ note }: { note: Note }) => {
    const [editTitle, setEditTitle] = useState(note.title);
    const [editContent, setEditContent] = useState(note.content);

    const saveEdit = () => {
      updateNote(note.id, { title: editTitle, content: editContent });
      setEditingNote(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className={`w-full max-w-lg ${note.color}`}>
          <CardContent className="p-4">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Title"
              className="mb-3 border-none bg-transparent text-lg font-medium placeholder:text-gray-500"
            />
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Take a note..."
              className="border-none bg-transparent resize-none min-h-[200px] placeholder:text-gray-500"
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-1">
                {noteColors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-8 h-8 rounded-full ${color.value} border ${color.border} hover:scale-110 transition-transform`}
                    onClick={() => updateNote(note.id, { color: color.value })}
                  />
                ))}
              </div>
              
              <div className="flex gap-2">
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
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <main className="flex-1 overflow-auto">
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-4">
         
          <h1 className="text-2xl font-semibold">Notes & Reminders</h1>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Search and Controls */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-2xl">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            {viewMode === "grid" ? <List size={16} /> : <Grid3X3 size={16} />}
          </Button>
        </div>

        {/* Create Note Section */}
        <Card className={`mb-6 ${newNote.color} ${noteColors.find(c => c.value === newNote.color)?.border}`}>
          <CardContent className="p-4">
            {!isCreating ? (
              <div 
                className="flex items-center gap-3 cursor-text"
                onClick={() => setIsCreating(true)}
              >
                <Plus size={20} className="text-gray-400" />
                <span className="text-gray-500">Take a note...</span>
              </div>
            ) : (
              <div className="space-y-3">
                <Input
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="Title"
                  className="border-none bg-transparent text-lg font-medium placeholder:text-gray-500"
                />
                <Textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Take a note..."
                  className="border-none bg-transparent resize-none placeholder:text-gray-500"
                  rows={3}
                />

                {/* Reminder Section */}
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

                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {noteColors.map((color) => (
                      <button
                        key={color.name}
                        className={`w-8 h-8 rounded-full ${color.value} border ${color.border} hover:scale-110 transition-transform ${newNote.color === color.value ? 'ring-2 ring-blue-500' : ''}`}
                        onClick={() => setNewNote({ ...newNote, color: color.value })}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setIsCreating(false);
                        setNewNote({ title: "", content: "", color: "bg-white" });
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
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pinned Notes */}
        {pinnedNotes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-2">
              <Pin size={16} />
              PINNED
            </h2>
            <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
              {pinnedNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </div>
        )}

        {/* Other Notes */}
        {unpinnedNotes.length > 0 && (
          <div>
            {pinnedNotes.length > 0 && (
              <h2 className="text-sm font-medium text-gray-600 mb-3">OTHERS</h2>
            )}
            <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
              {unpinnedNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredNotes.length === 0 && !isCreating && (
          <div className="text-center py-12">
            <Edit size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No notes yet</h3>
            <p className="text-gray-500">Click "Take a note..." to get started</p>
          </div>
        )}

        {/* Edit Modal */}
        {editingNote && (
          <EditNoteModal note={notes.find(n => n.id === editingNote)!} />
        )}
      </div>
    </main>
  );
}
