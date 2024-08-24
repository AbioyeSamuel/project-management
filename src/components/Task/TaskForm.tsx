// src/components/TaskForm.js

import React, { useState } from 'react';
import { createTask } from '../../services/api';

interface TaskFormProps {
  projectId: number; // Specify the type of projectId
  onSuccess: () => void; // Define the type of the onSuccess callback
}

const TaskForm: React.FC<TaskFormProps> = ({ projectId, onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const taskData = { name, description, status };

    try {
      await createTask(projectId, taskData);
      onSuccess();
      setName('');
      setDescription('');
      setStatus('pending');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Task Name</label>
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
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
