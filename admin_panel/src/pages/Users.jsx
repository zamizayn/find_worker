import React, { useState, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import { getProfiles } from '../services/userService';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfiles()
      .then(res => setUsers(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="users-view">
      <div className="view-header">
        <h1 className="view-title">User Management</h1>
        <button className="add-btn">Add New User</button>
      </div>
      <div className="table-container">
        {loading ? <p style={{padding: '20px'}}>Loading users...</p> : (
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Headline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(profile => (
                <tr key={profile.id} className="table-row">
                  <td>
                    <div className="user-info">
                      <div className="avatar-small">{profile.firstName[0]}{profile.lastName[0]}</div>
                      <div>
                        <div className="name">{profile.firstName} {profile.lastName}</div>
                        <div className="email">User ID: {profile.userId}</div>
                      </div>
                    </div>
                  </td>
                  <td>{profile.headline || 'No headline'}</td>
                  <td><MoreVertical className="action-dots" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Users;
