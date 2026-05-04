import React from 'react';
import { CheckCircle, AlertTriangle, X } from 'lucide-react';

function Notifications() {
  return (
    <div className="notifications-view">
      <h1 className="view-title">System Notifications</h1>
      <div className="notifications-list" style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
         <NotificationItem 
          type="success" 
          title="Backup Successful" 
          message="System backup was completed successfully at 03:00 AM." 
          date="Today, 3:00 AM" 
          icon={<CheckCircle size={20} className="text-green-500" />}
         />
         <NotificationItem 
          type="warning" 
          title="High Server Load" 
          message="Server CPU usage exceeded 90% for more than 5 minutes." 
          date="Today, 1:45 PM" 
          icon={<AlertTriangle size={20} className="text-orange-500" />}
         />
         <NotificationItem 
          type="error" 
          title="Failed Login Attempt" 
          message="Multiple failed login attempts detected from IP 192.168.1.102." 
          date="Yesterday, 11:20 PM" 
          icon={<X size={20} className="text-red-500" />}
         />
      </div>
    </div>
  );
}

function NotificationItem({ title, message, date, icon }) {
  return (
    <div className="grid-card" style={{display: 'flex', gap: '20px', alignItems: 'flex-start'}}>
       <div className="stat-icon" style={{marginTop: '4px'}}>{icon}</div>
       <div style={{flex: 1}}>
          <h4 style={{margin: '0 0 4px 0'}}>{title}</h4>
          <p style={{margin: '0 0 8px 0', fontSize: '0.9rem', color: '#64748b'}}>{message}</p>
          <span className="row-date">{date}</span>
       </div>
    </div>
  );
}

export default Notifications;
