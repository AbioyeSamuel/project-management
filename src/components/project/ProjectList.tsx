// src/components/ProjectList.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../../services/api';
import './ProjectList.css'; // Import the CSS file

interface Project {
  id: string;
  name: string;
  description?: string;
  due_date?: string;
}

const ProjectList: React.FC<{ refreshProjects: boolean }> = ({ refreshProjects }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetchProjects();
        setProjects(response.data);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };

    loadProjects();
  }, [refreshProjects]);

  return (
    <div className="project-list">
      <h2>Project List</h2>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects found</p>
      )}
    </div>
  );
};

export default ProjectList;
