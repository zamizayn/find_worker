import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut,
  TrendingUp,
  Search,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="logo-container">
          <div className="logo-box">F</div>
          <span className="logo-text">FindWorker Admin</span>
        </div>
        
        <nav className="sidebar-nav">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarItem 
            icon={<Users size={20} />} 
            label="Users" 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')} 
          />
          <SidebarItem 
            icon={<Briefcase size={20} />} 
            label="Jobs" 
            active={activeTab === 'jobs'} 
            onClick={() => setActiveTab('jobs')} 
          />
          <SidebarItem 
            icon={<MessageSquare size={20} />} 
            label="Posts" 
            active={activeTab === 'posts'} 
            onClick={() => setActiveTab('posts')} 
          />
          <SidebarItem 
            icon={<Bell size={20} />} 
            label="Notifications" 
            active={activeTab === 'notifications'} 
            onClick={() => setActiveTab('notifications')} 
          />
        </nav>

        <div className="sidebar-footer">
          <SidebarItem icon={<Settings size={20} />} label="Settings" />
          <SidebarItem icon={<LogOut size={20} />} label="Logout" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-search">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search for users, jobs, or posts..." />
          </div>
          <div className="header-user">
            <div className="user-avatar">AD</div>
            <span className="user-name">Admin User</span>
          </div>
        </header>

        <div className="admin-content">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'users' && <UsersView />}
          {activeTab === 'jobs' && <JobsView />}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <div className={`sidebar-item ${active ? 'active' : ''}`} onClick={onClick}>
      {icon}
      <span>{label}</span>
      {active && <div className="active-indicator" />}
    </div>
  );
}

function DashboardView() {
  return (
    <div className="dashboard-view">
      <h1 className="view-title">Overview</h1>
      
      <div className="stats-grid">
        <StatCard title="Total Users" value="1,284" change="+12%" icon={<Users className="text-blue-500" />} />
        <StatCard title="Active Jobs" value="456" change="+8%" icon={<Briefcase className="text-green-500" />} />
        <StatCard title="New Posts" value="89" change="-3%" icon={<MessageSquare className="text-orange-500" />} />
        <StatCard title="Engagement" value="4.2k" change="+15%" icon={<TrendingUp className="text-purple-500" />} />
      </div>

      <div className="content-grid">
        <div className="grid-card recent-users">
          <h3>Recent Users</h3>
          <div className="user-list">
            <UserRow name="Alice Smith" role="UI Designer" date="2 mins ago" />
            <UserRow name="Bob Johnson" role="Backend Dev" date="15 mins ago" />
            <UserRow name="Charlie Brown" role="Project Manager" date="1 hour ago" />
          </div>
        </div>
        <div className="grid-card growth-chart">
          <h3>Traffic Growth</h3>
          <div className="chart-placeholder">
            {/* Chart visualization would go here */}
            <div className="bar-container">
              {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                <div key={i} className="bar" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UsersView() {
  return (
    <div className="users-view">
      <div className="view-header">
        <h1 className="view-title">User Management</h1>
        <button className="add-btn">Add New User</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="user-info">
                  <div className="avatar-small">AS</div>
                  <div>
                    <div className="name">Alice Smith</div>
                    <div className="email">alice@example.com</div>
                  </div>
                </div>
              </td>
              <td><span className="status-badge active">Active</span></td>
              <td>May 12, 2024</td>
              <td><MoreVertical className="action-dots" /></td>
            </tr>
            {/* More rows... */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function JobsView() {
  return (
    <div className="jobs-view">
       <h1 className="view-title">Job Postings</h1>
       <div className="jobs-grid">
          <JobCard title="Senior Frontend Engineer" company="TechFlow" applicants={12} />
          <JobCard title="Product Designer" company="StudioX" applicants={8} />
          <JobCard title="DevOps Specialist" company="SecureOps" applicants={5} />
       </div>
    </div>
  )
}

function StatCard({ title, value, change, icon }) {
  const isPositive = change.startsWith('+');
  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-icon">{icon}</div>
        <span className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>{change}</span>
      </div>
      <div className="stat-body">
        <span className="stat-value">{value}</span>
        <span className="stat-title">{title}</span>
      </div>
    </div>
  );
}

function UserRow({ name, role, date }) {
  return (
    <div className="user-row">
       <div className="avatar-small">{name[0]}</div>
       <div className="user-details">
          <span className="user-name">{name}</span>
          <span className="user-role">{role}</span>
       </div>
       <span className="row-date">{date}</span>
       <ChevronRight size={16} className="row-arrow" />
    </div>
  )
}

function JobCard({ title, company, applicants }) {
   return (
      <div className="grid-card">
         <h4>{title}</h4>
         <p>{company}</p>
         <div className="job-footer">
            <span>{applicants} applicants</span>
            <button className="view-btn">View</button>
         </div>
      </div>
   )
}

export default App;
