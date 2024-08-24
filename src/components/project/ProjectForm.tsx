// src/components/ProjectForm.tsx

import React, { useState, useEffect } from 'react';
import { createProject, updateProject } from '../../services/api';
import './ProjectForm.css'; // Import the CSS file

interface Project {
  id: number;
  name: string;
  description?: string;
  due_date?: string;
}

interface ProjectFormProps {
  existingProject?: Project;
  onSuccess: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ existingProject, onSuccess }) => {
  const [name, setName] = useState<string>(existingProject?.name || '');
  const [description, setDescription] = useState<string>(existingProject?.description || '');
  const [dueDate, setDueDate] = useState<string>(existingProject?.due_date || '');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = { name, description, due_date: dueDate };

    try {
      if (existingProject) {
        // Update existing project
        await updateProject(existingProject.id, projectData);
      } else {
        // Create new project
        await createProject(projectData);
      }
      onSuccess(); // Call onSuccess callback to refresh or navigate
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h2>{existingProject ? 'Update Project' : 'Create Project'}</h2>
      <div>
        <label>Project Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button type="submit">
        {existingProject ? 'Update Project' : 'Create Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
