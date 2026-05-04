import React, { useState } from 'react';
import { login } from '../services/authService';

function Login({ onLogin }) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);
      try {
        const response = await login(email, password);
        onLogin(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to login');
      } finally {
        setLoading(false);
      }
   };

   return (
      <div className="login-container">
         <div className="login-card">
            <div className="login-header">
               <div className="logo-box">F</div>
               <h1>FindWorker Admin</h1>
               <p>Enter your credentials to access the dashboard</p>
            </div>
            {error && <div className="error-message" style={{color: 'red', marginBottom: '16px'}}>{error}</div>}
            <form onSubmit={handleSubmit} className="login-form">
               <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="admin@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
               </div>
               <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
               </div>
               <button type="submit" className="login-btn" disabled={loading}>
                 {loading ? 'Signing In...' : 'Sign In'}
               </button>
            </form>
            <div className="login-footer">
               <a href="#">Forgot password?</a>
            </div>
         </div>
      </div>
   );
}

export default Login;
