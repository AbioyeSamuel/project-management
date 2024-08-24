// types.ts or a similar file where you define types

export interface Task {
    id?: number; // `id` may be optional if it's not always provided (e.g., when creating a new task)
    name: string;
    description?: string;
    status: 'pending' | 'in-progress' | 'completed';
    projectId: number;
  }
  export interface Project {
    id: number;
    name: string;
    description?: string;
    status: string;
    due_date?: string;
  }
  
  export interface ProjectsState {
    projects: Project[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }  
  