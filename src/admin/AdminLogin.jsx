// src/admin/AdminLogin.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUser, FaCircleExclamation, FaKey, FaEye, FaEyeSlash } from 'react-icons/fa6';
import logoImg from '../cureo/logo.jpg';
import { isAuthenticated, login } from './adminStore';
import './admin.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = login(username, password);
    if (res.success) {
      navigate('/admin', { replace: true });
    } else {
      setError(res.message || 'Invalid username or password');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-logo-wrapper">
            <img src={logoImg} alt="Cureo Logo" className="admin-login-logo" />
          </div>
          <h1 className="admin-login-title">Admin Portal</h1>
          <p className="admin-login-subtitle">Sign in to manage appointments & patient records</p>
        </div>

        {error && (
          <div className="admin-error-box">
            <FaCircleExclamation />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label">Username</label>
            <div className="admin-input-wrapper">
              <FaUser className="admin-input-icon" />
              <input
                type="text"
                className="admin-form-input"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Password</label>
            <div className="admin-input-wrapper">
              <FaLock className="admin-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="admin-form-input has-right-icon"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="admin-btn-primary" style={{ marginTop: '1rem' }}>
            Sign In to Dashboard
          </button>
        </form>

        <div className="admin-login-hint">
          <FaKey style={{ marginRight: '0.4rem', color: '#0ea5e9' }} />
          Default Login: Username <code>admin</code> | Password <code>cureo2026</code>
        </div>
      </div>
    </div>
  );
}

