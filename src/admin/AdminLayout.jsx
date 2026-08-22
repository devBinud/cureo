// src/admin/AdminLayout.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaCalendarCheck, FaUserGroup, FaStethoscope, FaGear, FaGlobe,
  FaRightFromBracket, FaUserShield, FaBars, FaXmark
} from 'react-icons/fa6';
import logoImg from '../cureo/logo.jpg';
import { logout } from './adminStore';

export default function AdminLayout({ children, activeTab = 'appointments', onTabChange }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { id: 'appointments', label: 'Appointments & Requests', icon: FaCalendarCheck },
    { id: 'patients', label: 'Patients Directory', icon: FaUserGroup },
    { id: 'settings', label: 'Clinic Settings', icon: FaGear },
  ];

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'patients': return 'Patients Directory';
      case 'settings': return 'Clinic Settings';
      default: return 'Appointments Dashboard';
    }
  };

  return (
    <div className="admin-wrapper" data-theme="light">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="admin-layout-body">
        {/* Left Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
          <div className="admin-sidebar-header">
            <Link to="/admin" className="admin-sidebar-brand">
              <img src={logoImg} alt="Cureo Logo" className="admin-sidebar-logo" />
            </Link>
            <button
              className="admin-sidebar-close-btn"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <FaXmark />
            </button>
          </div>

          <div className="admin-sidebar-nav">
            <div className="admin-sidebar-section-label">MAIN MENU</div>
            <ul className="admin-sidebar-menu">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`admin-nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        if (onTabChange) onTabChange(item.id);
                        setSidebarOpen(false);
                      }}
                    >
                      <Icon className="admin-nav-icon" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="admin-sidebar-section-label" style={{ marginTop: '1.75rem' }}>
              QUICK LINKS
            </div>
            <ul className="admin-sidebar-menu">
              <li>
                <Link to="/" className="admin-nav-item" onClick={() => setSidebarOpen(false)}>
                  <FaGlobe className="admin-nav-icon" />
                  <span>Public Website</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="admin-sidebar-footer">
            <div className="admin-sidebar-user">
              <div className="admin-user-avatar">
                <FaUserShield />
              </div>
              <div className="admin-user-info">
                <span className="admin-user-name">Dr. Bezboruah</span>
                <span className="admin-user-role">Administrator</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="admin-sidebar-logout-btn"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <FaRightFromBracket />
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <div className="admin-content-area">
          {/* Top Header Bar */}
          <header className="admin-topbar">
            <div className="admin-topbar-left">
              <button
                className="admin-mobile-toggle"
                onClick={() => setSidebarOpen(true)}
                title="Toggle Menu"
                aria-label="Toggle Menu"
              >
                <FaBars />
              </button>
              <div className="admin-page-breadcrumb">
                <span className="breadcrumb-parent">Portal</span> /{' '}
                <span className="breadcrumb-current">{getBreadcrumbTitle()}</span>
              </div>
            </div>

            <div className="admin-topbar-right">
              <button onClick={handleLogout} className="admin-btn-logout" title="Sign out of Admin">
                <FaRightFromBracket />
                <span className="desktop-only">Logout</span>
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="admin-main">{children}</main>
        </div>
      </div>
    </div>
  );
}


