// routes.js
const express = require('express');
const { register, login } = require('./auth');
const { getProjects, getProjectById, createProject, updateProject, deleteProject, addTask, getTasks, updateTask, deleteTask, filterProjects } = require('./project');
// const authenticateToken = require('./middleware/authenticateToken');

const router = express.Router();

// Authentication routes
router.post('/register', register);
router.post('/login', login);

// Project routes
router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById)
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

// Task routes
router.get('/projects/:id/tasks', getTasks);
router.post('/projects/:id/tasks', addTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

// Filtering route
router.get('/projects/filter',filterProjects);

module.exports = router;

