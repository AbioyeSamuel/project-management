// src/pages/ProjectPage.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProjectById, deleteProject } from '../services/api';
import ProjectForm from '../components/project/ProjectForm';
import TaskForm from '../components/Task/TaskForm';

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const loadProject = async () => {
      if (projectId) {
        try {
          const response = await fetchProjectById(projectId);
          setProject(response.data);
        } catch (error) {
          console.error('Error loading project:', error);
        }
      }
    };

    loadProject();
  }, [projectId]);

  const handleDelete = async () => {
    if (projectId) {
      try {
        await deleteProject(projectId);
        navigate('/projects'); // Redirect after deletion
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleUpdateSuccess = () => {
    navigate('/projects'); // Redirect or reload project
  };

  return (
    <div>
      <h1>Project Details</h1>
      {project ? (
        <div>
          <ProjectForm existingProject={project} onSuccess={handleUpdateSuccess} />
          <button onClick={handleDelete}>Delete Project</button>
          <h2>Tasks</h2>
          <TaskForm projectId={project.id} onSuccess={() => { /* Reload tasks */ }} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProjectPage;
