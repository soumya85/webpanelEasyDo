
import { TaskBoardContent } from "@/components/TaskBoardContent";

export default function TaskBoard() {
  return (
    <div className="h-screen flex flex-col overflow-auto h-screen">
      <TaskBoardContent />
    </div>
  );
}
