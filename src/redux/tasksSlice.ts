// tasksSlice.ts or tasksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Task } from './types'; // Import the Task type

// Define the shape of the state
interface TasksState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: TasksState = {
  tasks: [],
  status: 'idle',
  error: null,
};

// Async thunks with explicit types
export const addTask = createAsyncThunk<Task, Task>(
  'tasks/addTask',
  async (task: Task) => {
    const response = await axios.post(`/projects/${task.projectId}/tasks`, task);
    return response.data;
  }
);

export const fetchTasks = createAsyncThunk<Task[], number>(
  'tasks/fetchTasks',
  async (projectId: number) => {
    const response = await axios.get(`/projects/${projectId}/tasks`);
    return response.data;
  }
);

export const updateTask = createAsyncThunk<Task, Task>(
  'tasks/updateTask',
  async (task: Task) => {
    const response = await axios.put(`/tasks/${task.id}`, task);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk<number, number>(
  'tasks/deleteTask',
  async (id: number) => {
    await axios.delete(`/tasks/${id}`);
    return id;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
