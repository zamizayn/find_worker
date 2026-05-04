import React from 'react';
import { NavLink } from 'react-router-dom';

function SidebarItem({ to, icon, label }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
    >
      {icon}
      <span>{label}</span>
      <div className="active-indicator" />
    </NavLink>
  );
}

export default SidebarItem;
