import React from 'react';
import { Form, Input, Select, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROLE_OPTIONS, STATUS_OPTIONS } from '../../Components/organisms/User/constants';

export const AddUser = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const newUser = {
      id: Date.now(), 
      name: values.name,
      email: values.email,
      role: values.role,
      status: values.status,
      createdAt: new Date().toISOString().split('T')[0],
    };

    localStorage.setItem(
      'users',
      JSON.stringify([newUser, ...storedUsers])
    );

    message.success('User added successfully');
    navigate('/users');
  };

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <Card title="Add New User">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Invalid email format' },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select role' }]}
          >
            <Select placeholder="Select role" options={ROLE_OPTIONS} />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select status" options={STATUS_OPTIONS} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create User
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => navigate('/users')}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddUser;
