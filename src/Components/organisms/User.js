import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Input, message, Dropdown, Drawer, Descriptions, Select, Space, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, MoreOutlined, EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { userData } from '../mockData/mockdata';
import { getStatusColor} from './utils';
import { injectStyles, tableClasses, tableStyles } from './style';
import messages from './constants';

const { Search } = Input;
const { Option } = Select;

const UserManagementTable = () => {
  const [users, setUsers] = useState(userData);

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

  const handleView = (record) => {
    setSelectedUser(record);
    setIsEditMode(false);
    setDrawerVisible(true);
  };

  const handleEdit = (record) => {
    setSelectedUser(record);
    setIsEditMode(true);
    setEditFormData({
      name: record.name,
      email: record.email,
      role: record.role,
      status: record.status,
      createdAt: record.createdAt,
    });
    setDrawerVisible(true);
  };

  const handleEditFromDrawer = () => {
    if (selectedUser) {
      setIsEditMode(true);
      setEditFormData({
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
        status: selectedUser.status,
        createdAt: selectedUser.createdAt,
      });
    }
  };

  const handleFormChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    if (!selectedUser) return;

    // Update the user
    const updatedUsers = users.map(user =>
      user.id === selectedUser.id
        ? {
            ...user,
            name: editFormData.name,
            email: editFormData.email,
            role: editFormData.role,
            status: editFormData.status,
            createdAt: editFormData.createdAt,
          }
        : user
    );

    setUsers(updatedUsers);
    
    message.success(`User "${editFormData.email}" has been updated successfully.`);
    
    // Close drawer and reset edit mode
    setDrawerVisible(false);
    setIsEditMode(false);
    setSelectedUser(null);
    
    applyFilters(searchValue, selectedRole, selectedStatus, updatedUsers);
  };

  const handleCancelEdit = () => {
    setDrawerVisible(false);
    setIsEditMode(false);
    setSelectedUser(null);
    setEditFormData({
      name: '',
      email: '',
      role: '',
      status: '',
      createdAt: '',
    });
  };

  const handleDeleteFromDrawer = () => {
    if (selectedUser) {
      Modal.confirm({
        title: 'Delete User',
        icon: <ExclamationCircleOutlined />,
        content: `Are you sure you want to delete user "${selectedUser.name}" (${selectedUser.email})? This action cannot be undone.`,
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk() {
          const updatedUsers = users.filter(user => user.id !== selectedUser.id);
          setUsers(updatedUsers);
          setDrawerVisible(false);
          setSelectedUser(null);
          message.success(`User "${selectedUser.email}" has been deleted successfully.`);
          // Reapply filters after deletion with updated users
          applyFilters(searchValue, selectedRole, selectedStatus, updatedUsers);
        },
      });
    }
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedUser(null);
    setIsEditMode(false);
    setEditFormData({
      name: '',
      email: '',
      role: '',
      status: '',
      createdAt: '',
    });
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Delete User',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete user "${record.name}" (${record.email})? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        const updatedUsers = users.filter(user => user.id !== record.id);
        setUsers(updatedUsers);
        message.success(`User "${record.email}" has been deleted successfully.`);
        // Reapply filters after deletion with updated users
        applyFilters(searchValue, selectedRole, selectedStatus, updatedUsers);
      },
    });
  };

  // Debounce search value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Apply filters when debounced search value changes (only if 4+ characters or empty)
  useEffect(() => {
    const searchToApply = debouncedSearchValue.length >= 4 || debouncedSearchValue.length === 0 
      ? debouncedSearchValue 
      : '';
    applyFilters(searchToApply, selectedRole, selectedStatus);
  }, [debouncedSearchValue, selectedRole, selectedStatus]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    // If search is cleared, immediately apply filters
    if (!value) {
      setDebouncedSearchValue('');
    }
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    setDebouncedSearchValue(value);
    applyFilters(value, selectedRole, selectedStatus);
  };

  const handleRoleFilter = (value) => {
    setSelectedRole(value);
    const searchToApply = debouncedSearchValue.length >= 4 ? debouncedSearchValue : '';
    applyFilters(searchToApply, value, selectedStatus);
  };

  const handleStatusFilter = (value) => {
    setSelectedStatus(value);
    const searchToApply = debouncedSearchValue.length >= 4 ? debouncedSearchValue : '';
    applyFilters(searchToApply, selectedRole, value);
  };

  const applyFilters = (search, role, status, usersToFilter = null) => {
    const sourceUsers = usersToFilter || users;
    let filtered = [...sourceUsers];

    // Apply search filter
    if (search) {
      filtered = filtered.filter(
        user =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.role.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (role) {
      filtered = filtered.filter(user => user.role === role);
    }

    if (status) {
      filtered = filtered.filter(user => user.status === status);
    }

    setFilteredUsers(filtered);
  };

  const clearFilters = () => {
    setSearchValue('');
    setSelectedRole(null);
    setSelectedStatus(null);
    setFilteredUsers(users);
  };

 
  const columns = [
    {
      title: messages.NAME,
      dataIndex: 'name',
      key: 'name',
      width: 200
    },
    {
      title: messages.EMAIL,
      dataIndex: 'email',
      key: 'email',
      width: 250,
    },
    {
      title: messages.ROLE,
      dataIndex: 'role',
      key: 'role',
      width: 150,
    },
    {
      title: messages.STATUS,
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: messages.CREATED_AT,
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 250,
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: messages.ACTIONS,
      key: 'actions',
      width: 100,
      render: (_, record) => {
        const menuItems = [
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
            onClick: () => handleDelete(record),
          },
        ];

        return (
          <Dropdown
            menu={{ items: menuItems }}
            trigger={['hover']}
            placement="bottomRight"
          >
            <Button
              type="text"
              icon={<MoreOutlined />}
              className="action-menu-trigger"
            />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div className={tableClasses.searchContainer}>
        <h1 className={tableClasses.tableTitle}>{messages.USER_MANAGEMENT}</h1>
      </div>
      <div className="table-filters">
        <Search
          placeholder="Search by name, email, or role (min 4 characters)"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          style={{ width: 320 }}
          value={searchValue}
          onChange={handleSearchChange}
          onSearch={handleSearch}
        />
        <Select
          placeholder={messages.ROLE}
          allowClear
          style={{ width: 100 }}
          size="large"
          value={selectedRole}
          onChange={handleRoleFilter}
        >
          <Option value="Admin">{messages.ADMIN}</Option>
          <Option value="Manager">{messages.MANAGER}</Option>
          <Option value="User">{messages.USER}</Option>
        </Select>
        <Select
          placeholder={messages.STATUS}
          allowClear
          style={{ width: 100 }}
          size="large"
          value={selectedStatus}
          onChange={handleStatusFilter}
        >
          <Option value="Active">{messages.ACTIVE}</Option>
          <Option value="Inactive">{messages.INACTIVE}</Option>
          <Option value="Pending">{messages.PENDING}</Option>
        </Select>
        {(selectedRole || selectedStatus || searchValue) && (
          <Button onClick={clearFilters} size="medium">
             {messages.CLEAR_FILTERS}
          </Button>
        )}
      </div>
      <Table
        className={tableClasses.tableContainer}
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        pagination={{
          pageSize: 5,
          // showSizeChanger: true,
          showTotal: (total) => `Total ${total} users`,
        }}
        bordered
        onRow={(record) => ({
          onClick: (event) => {
            // Prevent row click when clicking on actions column
            if (event.target.closest('.action-menu-trigger') || 
                event.target.closest('.ant-dropdown')) {
              return;
            }
            handleView(record);
          },
        })}
      />
      <Drawer
        title={
          <div className="drawer-header">
            <span className="drawer-email">{selectedUser?.email || ''}</span>
            {!isEditMode && (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'edit',
                      label: messages.EDIT,
                      icon: <EditOutlined />,
                      onClick: handleEditFromDrawer,
                    },
                    {
                      key: 'delete',
                      label: messages.DELETE,
                      icon: <DeleteOutlined />,
                      danger: true,
                      onClick: handleDeleteFromDrawer,
                    },
                  ],
                }}
                trigger={['hover', 'click']}
                placement="bottomRight"
              >
                <Button
                  type="text"
                  icon={<MoreOutlined />}
                  className="drawer-menu-trigger"
                />
              </Dropdown>
            )}
          </div>
        }
        placement="right"
        onClose={handleCloseDrawer}
        open={drawerVisible}
        width={480}
        className="user-details-drawer"
      >
        {selectedUser && (
          <>
            {isEditMode ? (
              <div className="edit-form">
                <div className="form-item">
                  <label>{messages.ID}</label>
                  <Input
                    value={selectedUser.id}
                    disabled
                    readOnly
                    className="readonly-input"
                  />
                </div>
                <div className="form-item">
                  <label>{messages.NAME}</label>
                  <Input
                    value={editFormData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    placeholder="Enter name"
                  />
                </div>
                <div className="form-item">
                  <label>{messages.EMAIL}</label>
                  <Input
                    value={editFormData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    placeholder="Enter email"
                    type="email"
                  />
                </div>
                <div className="form-item">
                  <label>{messages.ROLE}</label>
                  <Select
                    value={editFormData.role}
                    onChange={(value) => handleFormChange('role', value)}
                    style={{ width: '100%' }}
                    placeholder="Select role"
                  >
                    <Option value="Admin">{messages.ADMIN}</Option>
                    <Option value="Manager">{messages.MANAGER}</Option>
                    <Option value="User">{messages.USER}</Option>
                  </Select>
                </div>
                <div className="form-item">
                  <label>{messages.STATUS}</label>
                  <Select
                    value={editFormData.status}
                    onChange={(value) => handleFormChange('status', value)}
                    style={{ width: '100%' }}
                    placeholder="Select status"
                  >
                    <Option value="Active">{messages.ACTIVE}</Option>
                    <Option value="Inactive">{messages.INACTIVE}</Option>
                    <Option value="Pending">{messages.PENDING}</Option>
                  </Select>
                </div>
                <div className="form-item">
                  <label>{messages.CREATED_AT}</label>
                  <Input
                    value={editFormData.createdAt}
                    disabled
                    readOnly
                    className="readonly-input"
                    placeholder="Enter date (YYYY-MM-DD)"
                  />
                </div>
                <div className="form-actions">
                  <Button
                    type="secondary"
                    onClick={handleSaveChanges}
                    size="large"
                    style={{ marginRight: 8 }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    size="large"
                  >
                    {messages.CANCEL}
                  </Button>
                </div>
              </div>
            ) : (
              <Descriptions column={1} bordered>
                <Descriptions.Item label="ID">
                  {selectedUser.id}
                </Descriptions.Item>
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
                <Descriptions.Item label="Created Date">
                  {selectedUser.createdAt}
                </Descriptions.Item>
              </Descriptions>
            )}
          </>
        )}
      </Drawer>
    </div>
  );
};

export default injectStyles(UserManagementTable, tableStyles);

