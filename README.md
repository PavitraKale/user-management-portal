# User Management Portal

A modern **User Management Portal** built with **React** and **Ant Design** to efficiently manage users with full **CRUD functionality**, **persistent storage**, and a clean, scalable architecture.  
This project demonstrates best practices in **React development**, **state management**, **component reuse**, and **UI/UX design**.

---

## Features

### ✅ Core Functionality
- **User Listing:** View all users in a paginated, sortable table.
- **Add User:** Add a new user via a dedicated form with auto-generated unique ID.
- **Edit User:** Edit user details (name, email, role, status) from a side drawer.
- **Delete User:** Delete users safely with a confirmation modal.
- **Persistent Storage:** All add, edit, and delete operations are **saved to localStorage**, so data remains intact after page refresh.

### 🔍 Search & Filters
- **Search:** Search users by name, email, or role (minimum 4 characters).
- **Filters:** Filter users by **role** and **status**.
- **Debounced Search:** Optimized input handling for better performance.

### 🎨 UI & UX
- **User Details Drawer:** View and edit user details in a responsive drawer.
- **Dynamic Status Tags:** Color-coded status labels (`Active`, `Inactive`, `Pending`).
- **Confirmation Modals:** Prevent accidental deletions.

---

## Technologies Used

- **Frontend:** React (Functional Components + Hooks)
- **Routing:** React Router DOM
- **UI Library:** Ant Design (Table, Drawer, Modal, Tag, Input, Select, Button)
- **State Management:** React `useState`, `useEffect`
- **Persistence:** Browser `localStorage`
- **Utilities:** Custom helpers for filters and status color mapping
- **Version Control:** Git & GitHub
- **JavaScript:** ES6+ (arrow functions, destructuring, template literals)

---

## Project Structure

src/
│
├─ components/
│ ├─ organisms/
│ │ └─ User/
│ │ └─ User.js # Main User Management component
│
├─ pages/
│ ├─ UsersPage.js # Page-level routing component
│ └─ AddUser.js # Add User form component
│
├─ services/
│ └─ userStorage.js # localStorage CRUD helper
│
├─ utils/
│ └─ getStatusColor.js # Status → color mapping
│
├─ styles/
│ └─ style.js # Injected/custom styles
│
├─ App.js # Router & app shell
└─ index.js # Entry point


---

## Data Persistence Strategy

- On first load, data is stored in `localStorage`
- All subsequent **add, edit, and delete operations update localStorage**
- UI state and persistent storage remain **fully synchronized**

This ensures:
- No data loss on refresh
- Real-world CRUD behavior without a backend
- Easy migration to APIs later

---

## Getting Started

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Installation

1. Clone the repository:

```bash
git clone https://github.com/PavitraKale/user-management-portal.git
cd user-management-portal

Install dependencies:

npm install


Run the application:

npm start


Open in browser:

http://localhost:3000

