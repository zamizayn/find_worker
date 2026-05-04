import React from 'react';
import { Users, Briefcase, MessageSquare, TrendingUp } from 'lucide-react';
import StatCard from '../components/StatCard';
import UserRow from '../components/UserRow';

function Dashboard() {
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

export default Dashboard;
