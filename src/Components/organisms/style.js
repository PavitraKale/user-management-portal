import React from 'react';

// CSS styles for Ant Design table overrides
export const tableStyles = `
  /* Custom table container */
  .custom-user-table {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  /* Override Ant Design table header */
  .custom-user-table .ant-table-thead > tr > th {
    background: #fff;
    color: #1a1a1a ;
    font-weight: 600;
    text-align: left;
    border: none;
    padding: 16px;
  }

  /* Override table body rows */
  .custom-user-table .ant-table-tbody > tr > td {
    padding: 12px 16px;
    border-bottom: 1px solid #f0f0f0;
  }

  /* Row hover effect */
  .custom-user-table .ant-table-tbody > tr:hover > td {
    background: #f5f7fa;
    cursor: pointer;
  }

  /* Override table border */
  .custom-user-table .ant-table {
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    overflow: hidden;
  }

  /* Override pagination styles */
  .custom-user-table .ant-pagination {
    margin: 16px 0;
    text-align: center;
  }

  /* Override pagination item */
  .custom-user-table .ant-pagination-item {
    border-radius: 4px;
  }

  /* Override pagination item active */
  .custom-user-table .ant-pagination-item-active {
    background: #667eea;
    border-color: #667eea;
  }

  /* Override pagination item active link */
  .custom-user-table .ant-pagination-item-active a {
    color: #fff;
  }

  /* Override search input container */
  .custom-search-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding: 16px;
    // background: #f8f9fa;
    border-radius: 8px;
  }

  /* Override search input */
  .custom-search-container .ant-input-search {
    border-radius: 6px;
  }

  /* Override table title */
  .custom-table-title {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
  }

  /* Table filters section */
  .table-filters {
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }

  .table-filters .ant-select {
    border-radius: 6px;
  }

  .table-filters .ant-input-search {
    border-radius: 6px;
  }

  .table-filters .ant-input-search .ant-input {
    background-color: #fff;
    border-color: #d9d9d9;
  }

  .table-filters .ant-input-search .ant-input:hover {
    border-color:  #1a1a1a;
  }

  .table-filters .ant-input-search .ant-input:focus {
    border-color: #1a1a1a;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  .table-filters .ant-input-search .ant-btn {
    background-color: #fff;
    border-color: #d9d9d9;
    color: #000;
  }

  .table-filters .ant-input-search .ant-btn:hover {
    background-color: #f5f5f5;
    border-color: #1a1a1a;
    color: #000;
  }

  .table-filters .ant-input-search .anticon {
    color: #000;
  }

  /* Override action buttons */
  .custom-user-table .ant-btn {
    border-radius: 4px;
    font-weight: 500;
  }

  /* Override action buttons hover */
  .custom-user-table .ant-btn-primary:hover {
    background: #5568d3;
    border-color: #5568d3;
  }

  /* Action menu trigger button */
  .action-menu-trigger {
    font-size: 18px;
    color: #8c8c8c;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.3s;
  }

  .action-menu-trigger:hover {
    background: #f0f0f0;
    color: #1a1a1a;
  }

  /* Dropdown menu styles */
  .custom-user-table .ant-dropdown-menu {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 4px 0;
    min-width: 140px;
  }

  .custom-user-table .ant-dropdown-menu-item {
    padding: 8px 16px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .custom-user-table .ant-dropdown-menu-item:hover {
    background: #f5f7fa;
  }

  .custom-user-table .ant-dropdown-menu-item-danger {
    color: #ff4d4f;
  }

  .custom-user-table .ant-dropdown-menu-item-danger:hover {
    background: #fff1f0;
    color: #ff4d4f;
  }

  /* Drawer styles */
  .user-details-drawer .ant-drawer-header {
    padding: 16px 24px;
    border-bottom: 1px solid #f0f0f0;
  }

  .user-details-drawer .ant-drawer-title {
    width: 100%;
  }

  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .drawer-email {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    flex: 1;
  }

  .drawer-menu-trigger {
    font-size: 18px;
    color: #8c8c8c;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.3s;
  }

  .drawer-menu-trigger:hover {
    background: #f0f0f0;
    color: #1a1a1a;
  }

  /* Drawer dropdown menu styles */
  .user-details-drawer .ant-dropdown-menu {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 4px 0;
    min-width: 140px;
  }

  .user-details-drawer .ant-dropdown-menu-item {
    padding: 8px 16px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .user-details-drawer .ant-dropdown-menu-item:hover {
    background: #f5f7fa;
  }

  .user-details-drawer .ant-dropdown-menu-item-danger {
    color: #ff4d4f;
  }

  .user-details-drawer .ant-dropdown-menu-item-danger:hover {
    background: #fff1f0;
    color: #ff4d4f;
  }

  /* Drawer body styles */
  .user-details-drawer .ant-drawer-body {
    padding: 24px;
  }

  .user-details-drawer .ant-descriptions {
    margin-top: 16px;
  }

  .user-details-drawer .ant-descriptions-item-label {
    font-weight: 600;
    background: #fafafa;
    width: 140px;
  }

  .user-details-drawer .ant-descriptions-item-content {
    background: #fff;
  }

  /* Edit form styles */
  .edit-form {
    margin-top: 16px;
  }

  .edit-form .form-item {
    margin-bottom: 20px;
  }

  .edit-form .form-item label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #1a1a1a;
    font-size: 14px;
  }

  .edit-form .form-item .ant-input,
  .edit-form .form-item .ant-select {
    width: 100%;
  }

  .edit-form .readonly-input {
    background-color: #f5f5f5;
    cursor: not-allowed;
    color: #8c8c8c;
  }

  .edit-form .form-actions {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
  }

  .edit-form .form-actions .ant-btn {
    min-width: 120px;
  }
`;

// Function to inject styles into the document
const injectStylesToDocument = (styles, styleId) => {
  if (typeof document !== 'undefined') {
    let styleElement = document.getElementById(styleId);
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.innerHTML = styles;
      document.head.appendChild(styleElement);
    }
  }
};

// Higher-Order Component to wrap components with style injection
export const injectStyles = (Component, styles = tableStyles, styleId = 'custom-user-table-styles') => {
  const WrappedComponent = (props) => {
    React.useEffect(() => {
      injectStylesToDocument(styles, styleId);
    }, []);
    
    return <Component {...props} />;
  };
  
  // Preserve component display name for debugging
  WrappedComponent.displayName = `withStyles(${Component.displayName || Component.name || 'Component'})`;
  
  return WrappedComponent;
};

// Export class names for use in components
export const tableClasses = {
  tableContainer: 'custom-user-table',
  searchContainer: 'custom-search-container',
  tableTitle: 'custom-table-title',
};

