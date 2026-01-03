import React, { useState, useEffect } from 'react';
import UserManagementTable from '../../Components/organisms/User/User';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);
  }, []);

  return (
    <UserManagementTable
      users={users}
      setUsers={setUsers}
    />
  );
};

export default UsersPage;
