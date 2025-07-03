import React from 'react';

interface CalendarViewProps {
  tasks: any[];
  onTaskClick?: (task: any) => void; // <-- Add this prop
}

export function CalendarView({ tasks, onTaskClick }: CalendarViewProps) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} onClick={() => onTaskClick?.(task)}>
          {task.name}
        </div>
      ))}
    </div>
  );
}