import React from 'react';
import { ConfigProvider } from 'antd';
import { Routes, Route, Navigate } from 'react-router-dom';
import UsersPage from './pages/UsersPage/UsersPage';
import AddUsers from './pages/AddUsers/AddUsers';
import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/add" element={<AddUsers />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
