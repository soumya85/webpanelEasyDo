
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Plus,
  Grid3X3,
  List,
  Calendar,
  BarChart3,
  Table,
  ChevronDown,
  Eye,
  Settings
} from "lucide-react";

interface TaskBoardNavigationProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setIsAddTaskModalOpen: (open: boolean) => void;
}

export function TaskBoardNavigation({ 
  currentView, 
  setCurrentView, 
  searchTerm, 
  setSearchTerm, 
  setIsAddTaskModalOpen 
}: TaskBoardNavigationProps) {
  return (
    <div className="bg-white border-b px-6 py-3">
      <div className="flex items-center justify-between">
        {/* View Options */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant={currentView === "board" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setCurrentView("board")}
              className="flex items-center gap-2"
            >
              <Grid3X3 size={16} />
              Board
            </Button>
            <Button 
              variant={currentView === "list" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setCurrentView("list")}
              className="flex items-center gap-2"
            >
              <List size={16} />
              List
            </Button>
            <Button 
              variant={currentView === "calendar" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setCurrentView("calendar")}
              className="flex items-center gap-2"
            >
              <Calendar size={16} />
              Calendar
            </Button>
            <Button 
              variant={currentView === "gantt" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setCurrentView("gantt")}
              className="flex items-center gap-2"
            >
              <BarChart3 size={16} />
              Gantt
            </Button>
            <Button 
              variant={currentView === "table" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setCurrentView("table")}
              className="flex items-center gap-2"
            >
              <Table size={16} />
              Table
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Plus size={16} />
                  View
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Timeline</DropdownMenuItem>
                <DropdownMenuItem>Workload</DropdownMenuItem>
                <DropdownMenuItem>Activity</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-48"
            />
          </div>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Eye size={16} />
            Hide
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Settings size={16} />
            Customize
          </Button>
          <Button 
            onClick={() => setIsAddTaskModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            Add Task
            <ChevronDown size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
