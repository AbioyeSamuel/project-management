// projectsSlice.ts (use .ts extension for TypeScript)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Project, ProjectsState } from './types'; // Import types

export const fetchProjects = createAsyncThunk<Project[]>(
  'projects/fetchProjects',
  async () => {
    const response = await axios.get('/projects');
    return response.data;
  }
);

export const fetchProjectById = createAsyncThunk<Project, number>(
  'projects/fetchProjectById',
  async (id) => {
    const response = await axios.get(`/projects/${id}`);
    return response.data;
  }
);

export const createProject = createAsyncThunk<Project, Project>(
  'projects/createProject',
  async (project) => {
    const response = await axios.post('/projects', project);
    return response.data;
  }
);

export const filterProjects = createAsyncThunk<Project[], Record<string, any>>(
  'projects/filterProjects',
  async (filters) => {
    const response = await axios.get('/projects/filter', { params: filters });
    return response.data;
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState: { projects: [], status: 'idle', error: null } as ProjectsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index >= 0) {
          state.projects[index] = action.payload;
        } else {
          state.projects.push(action.payload);
        }
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(filterProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
      });
  },
});

export default projectsSlice.reducer;
