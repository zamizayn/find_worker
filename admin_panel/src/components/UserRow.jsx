import React from 'react';
import { ChevronRight } from 'lucide-react';

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

export default UserRow;
