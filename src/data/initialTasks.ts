
import { Task } from "@/types/task";

export const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design landing page mockups",
    description: "Create high-fidelity mockups for the new landing page design",
    status: "todo",
    assignee: {
      id: "1",
      name: "Alice Johnson",
      avatar: "",
      initials: "AJ"
    },
    dueDate: "2024-12-15",
    priority: "high",
    subtasks: [
      {
        id: "st1",
        title: "Research competitor designs",
        completed: true,
        createdAt: "2024-12-01T10:00:00Z"
      },
      {
        id: "st2",
        title: "Create wireframes",
        completed: false,
        createdAt: "2024-12-01T11:00:00Z"
      },
      {
        id: "st3",
        title: "Design high-fidelity mockups",
        completed: false,
        createdAt: "2024-12-01T12:00:00Z"
      }
    ],
    comments: [
      {
        id: "c1",
        content: "Make sure to follow the brand guidelines",
        author: {
          id: "2",
          name: "Bob Smith",
          avatar: "",
          initials: "BS"
        },
        createdAt: "2024-12-01T14:00:00Z"
      }
    ],
    attachments: [],
    timeTracked: 2,
    estimatedTime: 8,
    tags: ["design", "frontend"],
    createdAt: "2024-12-01T09:00:00Z",
    updatedAt: "2024-12-01T14:00:00Z"
  },
  {
    id: "2", 
    title: "Implement user authentication",
    description: "Set up secure user authentication system with JWT tokens",
    status: "in-progress",
    assignee: {
      id: "2",
      name: "Bob Smith",
      avatar: "",
      initials: "BS"
    },
    dueDate: "2024-12-20",
    priority: "urgent",
    subtasks: [
      {
        id: "st4",
        title: "Set up authentication middleware",
        completed: true,
        createdAt: "2024-12-01T10:00:00Z"
      },
      {
        id: "st5",
        title: "Create login/register forms",
        completed: true,
        createdAt: "2024-12-01T11:00:00Z"
      },
      {
        id: "st6",
        title: "Implement password reset",
        completed: true,
        createdAt: "2024-12-01T12:00:00Z"
      },
      {
        id: "st7",
        title: "Add email verification",
        completed: false,
        createdAt: "2024-12-01T13:00:00Z"
      },
      {
        id: "st8",
        title: "Write tests",
        completed: false,
        createdAt: "2024-12-01T14:00:00Z"
      }
    ],
    comments: [],
    attachments: [],
    timeTracked: 12,
    estimatedTime: 16,
    tags: ["backend", "security"],
    createdAt: "2024-11-28T09:00:00Z",
    updatedAt: "2024-12-01T15:00:00Z"
  },
  {
    id: "3",
    title: "Write API documentation", 
    description: "Create comprehensive API documentation for all endpoints",
    status: "todo",
    dueDate: "2024-12-18",
    priority: "medium",
    subtasks: [
      {
        id: "st9",
        title: "Document authentication endpoints",
        completed: false,
        createdAt: "2024-12-01T10:00:00Z"
      },
      {
        id: "st10",
        title: "Document user management endpoints",
        completed: false,
        createdAt: "2024-12-01T11:00:00Z"
      }
    ],
    comments: [],
    attachments: [],
    timeTracked: 0,
    estimatedTime: 6,
    tags: ["documentation", "api"],
    createdAt: "2024-11-30T09:00:00Z",
    updatedAt: "2024-11-30T09:00:00Z"
  },
  {
    id: "4",
    title: "Test task",
    description: "Testing the new task management system",
    status: "in-progress",
    assignee: {
      id: "3",
      name: "LK",
      avatar: "",
      initials: "LK"
    },
    dueDate: "2024-12-17",
    priority: "urgent",
    subtasks: [
      {
        id: "st11",
        title: "Unit tests",
        completed: true,
        createdAt: "2024-12-01T10:00:00Z"
      },
      {
        id: "st12",
        title: "Integration tests",
        completed: true,
        createdAt: "2024-12-01T11:00:00Z"
      },
      {
        id: "st13",
        title: "E2E tests",
        completed: false,
        createdAt: "2024-12-01T12:00:00Z"
      },
      {
        id: "st14",
        title: "Performance tests",
        completed: false,
        createdAt: "2024-12-01T13:00:00Z"
      }
    ],
    comments: [],
    attachments: [],
    timeTracked: 4,
    estimatedTime: 8,
    tags: ["testing", "qa"],
    createdAt: "2024-11-29T09:00:00Z",
    updatedAt: "2024-12-01T13:00:00Z"
  },
  {
    id: "5",
    title: "Deploy to production",
    description: "Deploy the application to production environment",
    status: "complete",
    assignee: {
      id: "4",
      name: "Charlie Brown",
      avatar: "",
      initials: "CB"
    },
    dueDate: "2024-12-10",
    priority: "high",
    subtasks: [
      {
        id: "st15",
        title: "Set up production server",
        completed: true,
        createdAt: "2024-12-01T10:00:00Z"
      }
    ],
    comments: [],
    attachments: [],
    timeTracked: 6,
    estimatedTime: 6,
    tags: ["deployment", "devops"],
    createdAt: "2024-11-25T09:00:00Z",
    updatedAt: "2024-12-10T16:00:00Z"
  }
];
