import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Base URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Project APIs
export const fetchProjects = () => api.get('/projects');
export const fetchProjectById = (id: number | string) => api.get(`/projects/${id}`);
export const createProject = (projectData: any) => api.post('/projects', projectData);
export const updateProject = (id: number | string, projectData: any) => api.put(`/projects/${id}`, projectData);
export const deleteProject = (id: number | string) => api.delete(`/projects/${id}`);

// Task APIs
export const fetchTasks = (projectId: number | string) => api.get(`/projects/${projectId}/tasks`);
export const createTask = (projectId: number | string, taskData: any) => api.post(`/projects/${projectId}/tasks`, taskData);
export const updateTask = (taskId: number | string, taskData: any) => api.put(`/tasks/${taskId}`, taskData);
export const deleteTask = (taskId: number | string) => api.delete(`/tasks/${taskId}`);

export default api;
