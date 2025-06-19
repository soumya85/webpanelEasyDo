
export interface User {
  id: string;
  name: string;
  avatar: string;
  initials: string;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  assignee?: User;
  dueDate?: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt?: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: User;
  dueDate?: string;
  priority?: "urgent" | "high" | "medium" | "low";
  status: "todo" | "in-progress" | "complete";
  subtasks: SubTask[];
  comments: Comment[];
  attachments: Attachment[];
  timeTracked?: number;
  estimatedTime?: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  startDate: string
}
