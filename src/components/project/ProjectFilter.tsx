import React, { useState } from 'react';
import { Form, Input, DatePicker, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { filterProjects } from '../../redux/projectsSlice'; // Add this action in projectsSlice
import { AppDispatch } from '../../redux/store';

const ProjectFilter: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = (values: any) => {
    console.log('Filter:', values);
    dispatch(filterProjects(values)); // Dispatch filterProjects action
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="name" label="Project Name">
        <Input />
      </Form.Item>
      <Form.Item name="due_date" label="Due Date">
        <DatePicker />
      </Form.Item>
      <Form.Item name="task_count" label="Number of Tasks">
        <Input type="number" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Filter Projects
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectFilter;
