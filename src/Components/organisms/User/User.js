import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  Tag,
  Button,
  Input,
  message,
  Dropdown,
  Drawer,
  Descriptions,
  Select,
  Modal,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  MoreOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import { getStatusColor } from './utils';
import { injectStyles, tableClasses, tableStyles } from './style';
import { messages, ROLE_OPTIONS, STATUS_OPTIONS } from './constants';
import { saveUsers } from '../../../services/userStorage';

const { Search } = Input;

const UserManagementTable = ({ users, setUsers }) => {
  const navigate = useNavigate();

  const [filteredUsers, setFilteredUsers] = useState(users);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: '',
    createdAt: '',
  });

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleView = (record) => {
    setSelectedUser(record);
    setIsEditMode(false);
    setDrawerVisible(true);
  };

  const handleEdit = (record) => {
    setSelectedUser(record);
    setIsEditMode(true);
    setEditFormData({ ...record });
    setDrawerVisible(true);
  };

  const handleEditFromDrawer = () => {
    if (!selectedUser) return;
    setIsEditMode(true);
    setEditFormData({ ...selectedUser });
  };

  const handleFormChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    if (!selectedUser) return;

    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id
        ? { ...user, ...editFormData }
        : user
    );

    setUsers(updatedUsers);
    saveUsers(updatedUsers); 

    message.success(`User "${editFormData.email}" updated successfully`);

    setDrawerVisible(false);
    setIsEditMode(false);
    setSelectedUser(null);

    applyFilters(searchValue, selectedRole, selectedStatus, updatedUsers);
  };

  const confirmDelete = (userToDelete) => {
    Modal.confirm({
      title: 'Delete User',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete "${userToDelete.name}" (${userToDelete.email})?`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        const updatedUsers = users.filter(
          (u) => u.id !== userToDelete.id
        );

        setUsers(updatedUsers);
        saveUsers(updatedUsers); // ✅ persist

        setDrawerVisible(false);
        setSelectedUser(null);

        message.success(`User "${userToDelete.email}" deleted successfully`);
        applyFilters(searchValue, selectedRole, selectedStatus, updatedUsers);
      },
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    const searchToApply =
      debouncedSearchValue.length >= 4 || debouncedSearchValue.length === 0
        ? debouncedSearchValue
        : '';
    applyFilters(searchToApply, selectedRole, selectedStatus);
  }, [debouncedSearchValue, selectedRole, selectedStatus]);

  const applyFilters = (search, role, status, source = users) => {
    let result = [...source];

    if (search) {
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()) ||
          u.role.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (role) result = result.filter((u) => u.role === role);
    if (status) result = result.filter((u) => u.status === status);

    setFilteredUsers(result);
  };

  const clearFilters = () => {
    setSearchValue('');
    setSelectedRole(null);
    setSelectedStatus(null);
    setFilteredUsers(users);
  };

  const columns = [
    { title: messages.NAME, dataIndex: 'name', width: 200 },
    { title: messages.EMAIL, dataIndex: 'email', width: 250 },
    { title: messages.ROLE, dataIndex: 'role', width: 150 },
    {
      title: messages.STATUS,
      dataIndex: 'status',
      width: 150,
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: messages.CREATED_AT,
      dataIndex: 'createdAt',
      width: 200,
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: messages.ACTIONS,
      width: 100,
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'view',
                label: 'View',
                icon: <EyeOutlined />,
                onClick: () => handleView(record),
              },
              {
                key: 'edit',
                label: 'Edit',
                icon: <EditOutlined />,
                onClick: () => handleEdit(record),
              },
              {
                key: 'delete',
                label: 'Delete',
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => confirmDelete(record),
              },
            ],
          }}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

 
  return (
    <div style={{ padding: 24 }}>
      <h1 className={tableClasses.tableTitle}>
        {messages.USER_MANAGEMENT}
      </h1>

      <div className="table-filters-container">
        <div className="table-filters">
          <Search
            placeholder="Search (min 4 characters)"
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <Select
            placeholder={messages.ROLE}
            options={ROLE_OPTIONS}
            allowClear
            value={selectedRole}
            onChange={setSelectedRole}
          />

          <Select
            placeholder={messages.STATUS}
            options={STATUS_OPTIONS}
            allowClear
            value={selectedStatus}
            onChange={setSelectedStatus}
          />

          {(searchValue || selectedRole || selectedStatus) && (
            <Button onClick={clearFilters}>
              {messages.CLEAR_FILTERS}
            </Button>
          )}
        </div>

        <Button
          type="primary"
          size="large"
          onClick={() => navigate('/users/add')}
        >
          Add New User
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
      />

      <Drawer
        open={drawerVisible}
        width={480}
        onClose={() => setDrawerVisible(false)}
        title={selectedUser?.email}
      >
        {selectedUser &&
          (isEditMode ? (
            <>
              <Input
                value={editFormData.name}
                onChange={(e) =>
                  handleFormChange('name', e.target.value)
                }
                placeholder="Name"
              />
              <Input
                value={editFormData.email}
                onChange={(e) =>
                  handleFormChange('email', e.target.value)
                }
                placeholder="Email"
                style={{ marginTop: 12 }}
              />
              <Select
                options={ROLE_OPTIONS}
                value={editFormData.role}
                onChange={(v) => handleFormChange('role', v)}
                style={{ width: '100%', marginTop: 12 }}
              />
              <Select
                options={STATUS_OPTIONS}
                value={editFormData.status}
                onChange={(v) => handleFormChange('status', v)}
                style={{ width: '100%', marginTop: 12 }}
              />

              <Button
                type="primary"
                block
                style={{ marginTop: 16 }}
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Name">
                {selectedUser.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedUser.email}
              </Descriptions.Item>
              <Descriptions.Item label="Role">
                {selectedUser.role}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={getStatusColor(selectedUser.status)}>
                  {selectedUser.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Created">
                {selectedUser.createdAt}
              </Descriptions.Item>
            </Descriptions>
          ))}
      </Drawer>
    </div>
  );
};

export default injectStyles(UserManagementTable, tableStyles);
