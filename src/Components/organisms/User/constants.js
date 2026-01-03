export const messages = {
    ID: 'ID',
    NAME: 'Name',
    EMAIL: 'Email',
    ROLE: 'Role',
    STATUS: 'Status',
    CREATED_AT: 'Created At',
    ACTIONS: 'Actions',
    VIEW: 'View',
    EDIT: 'Edit',
    DELETE: 'Delete',
    SEARCH: 'Search',
    SEARCH_PLACEHOLDER: 'Search by name, email, or role (min 4 characters)',
    SEARCH_BUTTON: 'Search',
    CLEAR_FILTERS: 'Clear Filters',
    CLEAR_FILTERS_BUTTON: 'Clear Filters',
    SAVE: 'Save Changes',
    CANCEL: 'Cancel',
    USER_MANAGEMENT: 'User Management',
    ADMIN: 'Admin',
    MANAGER: 'Manager',
    USER: 'User',
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    PENDING: 'Pending',
  };

  export const STATUS_OPTIONS=[
    { value: 'Active', label: messages.ACTIVE },
    { value: 'Inactive', label: messages.INACTIVE },
    { value: 'Pending', label: messages.PENDING },
  ];

  export const ROLE_OPTIONS=[
    { value: 'Admin', label: messages.ADMIN },
    { value: 'Manager', label: messages.MANAGER },
    { value: 'User', label: messages.USER },
  ];
  