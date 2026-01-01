import React from 'react';
import { ConfigProvider } from 'antd';
import UserManagementTable from './Components/organisms/User';
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
      <div className="App">
        <UserManagementTable />
      </div>
    </ConfigProvider>
  );
}

export default App;
