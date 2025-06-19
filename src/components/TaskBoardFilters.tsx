import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Filter, 
  SortAsc, 
  Archive, 
  Users,
  ChevronDown,
  X,
  Calendar,
  Flag
} from "lucide-react";

type SortOption = "created-desc" | "created-asc" | "due-date" | "priority" | "name";
type FilterOption = "all" | "high-priority" | "due-today" | "overdue" | "no-assignee" | "assigned-to-me";
type GroupByOption = "status" | "assignee" | "priority" | "due-date";

interface TaskBoardFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  filterBy: FilterOption;
  setFilterBy: (filter: FilterOption) => void;
  groupBy: GroupByOption;
  setGroupBy: (group: GroupByOption) => void;
}

export function TaskBoardFilters({ 
  searchTerm, 
  setSearchTerm, 
  sortBy, 
  setSortBy, 
  filterBy, 
  setFilterBy,
  groupBy,
  setGroupBy
}: TaskBoardFiltersProps) {
  const getSortLabel = (sort: SortOption) => {
    switch (sort) {
      case "created-desc": return "Newest first";
      case "created-asc": return "Oldest first";
      case "due-date": return "Due date";
      case "priority": return "Priority";
      case "name": return "Name";
      default: return "Sort";
    }
  };

  const getFilterLabel = (filter: FilterOption) => {
    switch (filter) {
      case "all": return "All tasks";
      case "high-priority": return "High priority";
      case "due-today": return "Due today";
      case "overdue": return "Overdue";
      case "no-assignee": return "Unassigned";
      case "assigned-to-me": return "Assigned to me";
      default: return "Filter";
    }
  };

  const getGroupByLabel = (group: GroupByOption) => {
    switch (group) {
      case "status": return "Status";
      case "assignee": return "Assignee";
      case "priority": return "Priority";
      case "due-date": return "Due Date";
      default: return "Status";
    }
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSortBy("created-desc");
    setFilterBy("all");
  };

  const hasActiveFilters = searchTerm || filterBy !== "all" || sortBy !== "created-desc";

  return (
    <div className="bg-white border-b px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Group by:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 text-sm">
                  {getGroupByLabel(groupBy)}
                  <ChevronDown size={12} className="ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setGroupBy("status")}>Status</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGroupBy("assignee")}>Assignee</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGroupBy("priority")}>Priority</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGroupBy("due-date")}>Due Date</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              {filterBy !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                  {getFilterLabel(filterBy)}
                  <X 
                    size={10} 
                    className="cursor-pointer hover:text-gray-700" 
                    onClick={() => setFilterBy("all")}
                  />
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                  Search: {searchTerm}
                  <X 
                    size={10} 
                    className="cursor-pointer hover:text-gray-700" 
                    onClick={() => setSearchTerm("")}
                  />
                </Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-xs text-gray-500 hover:text-gray-700 h-6"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7">
                <Filter size={14} />
                <span className="ml-1 text-sm">{getFilterLabel(filterBy)}</span>
                <ChevronDown size={12} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel className="text-xs">Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={() => setFilterBy("all")}>
                All tasks
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => setFilterBy("high-priority")}>
                <Flag size={12} className="mr-2 text-red-500" />
                High Priority
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => setFilterBy("due-today")}>
                <Calendar size={12} className="mr-2" />
                Due Today
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => setFilterBy("overdue")}>
                <Calendar size={12} className="mr-2 text-red-500" />
                Overdue
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => setFilterBy("no-assignee")}>
                <Users size={12} className="mr-2" />
                Unassigned
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={() => setFilterBy("assigned-to-me")}>
                Assigned to me
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7">
                <SortAsc size={14} />
                <span className="ml-1 text-sm">{getSortLabel(sortBy)}</span>
                <ChevronDown size={12} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="text-xs">Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortBy("created-desc")}>
                Newest first
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("created-asc")}>
                Oldest first
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("due-date")}>
                Due date
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("priority")}>
                Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("name")}>
                Task name
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search tasks..." 
              className="pl-7 w-48 h-7 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
