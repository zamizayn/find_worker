import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import {
  LayoutDashboard,
  Users as UsersIcon,
  Briefcase,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Search,
  Menu,
  X
} from 'lucide-react';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Jobs from './pages/Jobs';
import Posts from './pages/Posts';
import Notifications from './pages/Notifications';

// Components
import SidebarItem from './components/SidebarItem';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = (data) => {
    localStorage.setItem('token', data.token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Navigate to="/" replace />} />

        <Route path="/" element={<AdminLayout onLogout={handleLogout} />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="posts" element={<Posts />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<div><h1 className="view-title">Settings</h1></div>} />
        </Route>
      </Routes>
    </Router>
  );
}

function AdminLayout({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`admin-container ${sidebarOpen ? 'sidebar-mobile-open' : ''}`}>
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <div className="logo-box">F</div>
          <span className="logo-text">FindWorker Admin</span>
          <button className="menu-toggle mobile-only" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <SidebarItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <SidebarItem to="/users" icon={<UsersIcon size={20} />} label="Users" />
          <SidebarItem to="/jobs" icon={<Briefcase size={20} />} label="Jobs" />
          <SidebarItem to="/posts" icon={<MessageSquare size={20} />} label="Posts" />
          <SidebarItem to="/notifications" icon={<Bell size={20} />} label="Notifications" />
        </nav>

        <div className="sidebar-footer">
          <SidebarItem to="/settings" icon={<Settings size={20} />} label="Settings" />
          <div className="sidebar-item" onClick={onLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="flex items-center gap-4">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={24} />
            </button>
            <div className="header-search">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search for users ... " />
            </div>
          </div>
          <div className="header-user">
            <div className="user-avatar">AD</div>
            <span className="user-name">Admin User</span>
          </div>
        </header>

        <div className="admin-content">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="posts" element={<Posts />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<div><h1 className="view-title">Settings</h1></div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
