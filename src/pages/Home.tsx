// src/pages/HomePage.js

import React, { useState } from 'react';
import ProjectList from '../components/project/ProjectList';
import ProjectForm from '../components/project/ProjectForm';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
  const [refreshProjects, setRefreshProjects] = useState(false);

  const handleSuccess = () => {
    setRefreshProjects(!refreshProjects); // Trigger a refresh of the project list
  };

  return (
    <div className="home-page">
      <div className="header">
        <h1>Project Management</h1>
      </div>
      <div className="project-list">
        <ProjectList refreshProjects={refreshProjects} />
      </div>
      <div className="form-container">
        <ProjectForm onSuccess={handleSuccess} />
      </div>

      
    </div>
  );
};

export default HomePage;
