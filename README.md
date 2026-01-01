# User Management Portal

A modern **User Management Portal** built with **React** and **Ant Design** to efficiently manage users, including viewing, editing, searching, filtering, and deleting user data. This project demonstrates best practices in **React development**, **state management**, and **clean UI design**.

---

## Demo Screenshot / GIF
*(Add a screenshot or GIF of your portal here to make it visually appealing)*

---

## Features

- **User Listing:** View all users in a paginated table.
- **Search & Filter:** Search users by name, email, or role (minimum 4 characters), and filter by role or status.
- **User Details Drawer:** Click a user to view details in a responsive drawer.
- **Edit User:** Edit user information including name, email, role, and status directly from the drawer.
- **Delete User:** Delete users safely with a confirmation modal.
- **Dynamic Status Tags:** User status is highlighted with color-coded tags (`Active`, `Inactive`, `Pending`).
- **Responsive UI:** Fully responsive design for desktop screens.
- **Optimized Performance:** Debounced search, memoized table columns, and reusable components for scalability.

---

## Technologies Used

- **Frontend:** React (Functional Components + Hooks)
- **UI Library:** Ant Design (Table, Drawer, Modal, Tag, Input, Select)
- **State Management:** React `useState`, `useEffect`, `useCallback`, `useMemo`
- **Utilities:** Custom helper functions for filters and status color
- **Version Control:** Git (with meaningful commits)
- **JavaScript:** ES6+ features (destructuring, arrow functions, template literals)

---

## Project Structure

src/
│
├─ components/ # Reusable components like UserManagementTable
├─ mockData/ # Mock user data
├─ utils/ # Utility functions (e.g., getStatusColor)
├─ constants.js # Constants/messages
├─ style.js # Custom styles and injected classes
└─ App.js # Main app entry


---

## Getting Started

### Prerequisites
- Node.js >= 14.x
- npm >= 6.x

### Installation
1. Clone the repository:

```bash
git clone https://github.com/PavitraKale/user-management-portal.git
cd user-management-portal

#Install dependencies:

npm install


#Run the application:

npm start


#Open in browser:

http://localhost:3000