import React from 'react';

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

export default StatCard;
