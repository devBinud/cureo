// src/admin/AdminDashboard.jsx
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaCalendarCheck, FaClock, FaUserPlus, FaFileCsv, FaRotateLeft,
  FaMagnifyingGlass, FaEye, FaTrash, FaWhatsapp, FaPhone, FaXmark,
  FaCheck, FaStethoscope, FaHospital, FaCalendarDays,
  FaUserGroup, FaGear, FaFloppyDisk, FaPlus, FaLocationDot, FaEnvelope,
  FaCircleCheck, FaUserCheck, FaClipboardList
} from 'react-icons/fa6';
import AdminLayout from './AdminLayout';
import {
  isAuthenticated, getAppointments, updateAppointmentStatus,
  deleteAppointment, addAppointment, resetMockData
} from './adminStore';
import './admin.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Patient Directory Search
  const [patientSearch, setPatientSearch] = useState('');

  // Settings State & Alert
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [clinicSettings, setClinicSettings] = useState({
    clinicName: 'Cureo Homeopathic Clinic',
    doctorName: 'Dr. Niharika Bezboruah (BHMS)',
    phone: '+91 70029 74378',
    whatsapp: '+91 70029 74378',
    email: 'contact@cureoclinic.com',
    address: 'Near HS Road, Dibrugarh, Assam - 786001',
    morningSlot: '10:00 AM - 01:00 PM',
    afternoonSlot: '02:00 PM - 05:00 PM',
    eveningSlot: '05:00 PM - 08:00 PM',
    autoWhatsapp: true,
    emailNotify: true
  });



  // New appointment form state
  const [newForm, setNewForm] = useState({
    patientName: '',
    phone: '',
    age: '',
    gender: 'Female',
    location: 'Dibrugarh',
    concern: 'Skin Concerns',
    mode: 'In-Clinic Consultation',
    preferredDate: '',
    timeSlot: 'Morning (10:00 AM - 1:00 PM)',
    notes: ''
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login', { replace: true });
    } else {
      setAppointments(getAppointments());
    }
  }, [navigate]);

  const handleStatusChange = (id, newStatus) => {
    const updated = updateAppointmentStatus(id, newStatus);
    setAppointments(updated);
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, status: newStatus });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment record?')) {
      const updated = deleteAppointment(id);
      setAppointments(updated);
      if (selectedAppointment && selectedAppointment.id === id) {
        setSelectedAppointment(null);
      }
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset appointments list to default sample records?')) {
      const res = resetMockData();
      setAppointments(res);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addAppointment(newForm);
    setAppointments(getAppointments());
    setShowAddModal(false);
    setNewForm({
      patientName: '',
      phone: '',
      age: '',
      gender: 'Female',
      location: 'Dibrugarh',
      concern: 'Skin Concerns',
      mode: 'In-Clinic Consultation',
      preferredDate: '',
      timeSlot: 'Morning (10:00 AM - 1:00 PM)',
      notes: ''
    });
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (!appointments.length) return;
    const headers = ['ID', 'Patient Name', 'Phone', 'Age', 'Gender', 'Location', 'Concern', 'Mode', 'Date', 'Time Slot', 'Status', 'Notes', 'Created At'];
    const rows = appointments.map(a => [
      a.id,
      `"${a.patientName.replace(/"/g, '""')}"`,
      `"${a.phone}"`,
      a.age,
      a.gender,
      `"${a.location.replace(/"/g, '""')}"`,
      `"${a.concern}"`,
      `"${a.mode}"`,
      a.preferredDate,
      `"${a.timeSlot}"`,
      a.status,
      `"${(a.notes || '').replace(/"/g, '""')}"`,
      a.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Cureo_Appointments_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter(app => {
      const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        app.patientName.toLowerCase().includes(query) ||
        app.phone.toLowerCase().includes(query) ||
        app.location.toLowerCase().includes(query) ||
        app.concern.toLowerCase().includes(query) ||
        app.id.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [appointments, searchQuery, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = appointments.length;
    const pending = appointments.filter(a => a.status === 'Pending').length;
    const confirmed = appointments.filter(a => a.status === 'Confirmed').length;
    const completed = appointments.filter(a => a.status === 'Completed').length;
    return { total, pending, confirmed, completed };
  }, [appointments]);

  // Unique Patients computed list
  const uniquePatients = useMemo(() => {
    const map = new Map();
    appointments.forEach((app, idx) => {
      const key = app.phone.replace(/[^0-9]/g, '') || app.patientName.toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          id: `PAT-10${idx + 1}`,
          patientName: app.patientName,
          phone: app.phone,
          age: app.age,
          gender: app.gender,
          location: app.location,
          concern: app.concern,
          totalVisits: 1,
          lastVisit: app.preferredDate || app.createdAt,
          lastStatus: app.status
        });
      } else {
        const existing = map.get(key);
        existing.totalVisits += 1;
      }
    });
    return Array.from(map.values()).filter(p => {
      const q = patientSearch.toLowerCase();
      return (
        p.patientName.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.concern.toLowerCase().includes(q)
      );
    });
  }, [appointments, patientSearch]);

  const formatCleanPhone = (phone) => {
    return phone.replace(/[^0-9]/g, '');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => {
      setSettingsSaved(false);
    }, 4000);
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {/* --- TAB 1: APPOINTMENTS & REQUESTS --- */}
      {activeTab === 'appointments' && (
        <>
          <div className="admin-page-header">
            <div className="admin-header-title">
              <h1>Appointments Dashboard</h1>
              <p>View, manage, and confirm patient booking requests</p>
            </div>

            <div className="admin-actions-group">
              <button onClick={handleExportCSV} className="admin-btn-secondary" title="Download CSV">
                <FaFileCsv /> Export CSV
              </button>
            </div>
          </div>

          {/* KPI Stats Grid matching reference design */}
          <div className="admin-stats-grid">
            {/* Card 1: Total Bookings */}
            <div className="admin-stat-card ref-style">
              <div className="admin-stat-icon total-blue">
                <FaCalendarCheck />
              </div>
              <div className="admin-stat-info">
                <p className="stat-label">Total Bookings</p>
                <h3 className="stat-value">{stats.total}</h3>
              </div>
            </div>

            {/* Card 2: Active Bookings */}
            <div className="admin-stat-card ref-style">
              <div className="admin-stat-icon confirmed-green">
                <FaCheck />
              </div>
              <div className="admin-stat-info">
                <p className="stat-label">Active Bookings</p>
                <h3 className="stat-value">{stats.confirmed}</h3>
              </div>
            </div>

            {/* Card 3: Pending Requests */}
            <div className="admin-stat-card ref-style">
              <div className="admin-stat-icon pending-pink">
                <FaClock />
              </div>
              <div className="admin-stat-info">
                <p className="stat-label">Pending Requests</p>
                <h3 className="stat-value">{stats.pending}</h3>
              </div>
            </div>

            {/* Card 4: Book Appointment CTA Card */}
            <div
              className="admin-stat-card cta-card"
              onClick={() => setShowAddModal(true)}
              title="Create New Patient Booking"
            >
              <div className="admin-stat-icon cta-icon">
                <FaPlus />
              </div>
              <div className="admin-stat-info">
                <h3 className="stat-value cta">Book Appointment</h3>
              </div>
            </div>
          </div>

          {/* Controls & Search Bar */}
          <div className="admin-controls-card">
            <div className="admin-search-box">
              <FaMagnifyingGlass className="admin-search-icon" />
              <input
                type="text"
                placeholder="Search patient name, phone, location, concern, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="admin-filter-group">
              <label style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)', fontWeight: '600' }}>Filter Status:</label>
              <select
                className="admin-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses ({stats.total})</option>
                <option value="Pending">Pending ({stats.pending})</option>
                <option value="Confirmed">Confirmed ({stats.confirmed})</option>
                <option value="Completed">Completed ({stats.completed})</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Appointments List Table */}
          <div className="admin-table-container">
            {filteredAppointments.length === 0 ? (
              <div className="admin-empty-state">
                <FaCalendarDays className="admin-empty-icon" />
                <h3>No Appointments Found</h3>
                <p>No bookings match your current search or filter criteria.</p>
              </div>
            ) : (
              <table className="admin-table bordered-grid-table">
                <thead>
                  <tr>
                    <th style={{ width: '65px', textAlign: 'center' }}>SL NO.</th>
                    <th>Booking ID</th>
                    <th>Patient Information</th>
                    <th>Health Concern & Mode</th>
                    <th>Date & Preferred Slot</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((app, index) => (
                    <tr key={app.id}>
                      <td style={{ textAlign: 'center', fontWeight: '700', color: '#475569' }}>{index + 1}</td>
                      <td>
                        <span style={{ fontWeight: '700', color: '#0284c7', fontSize: '0.85rem' }}>{app.id}</span>
                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{app.createdAt}</div>
                      </td>
                      <td>
                        <div className="patient-info">
                          <span className="patient-name">{app.patientName}</span>
                          <span className="patient-meta">{app.phone} • {app.age ? `${app.age} yrs` : ''} ({app.gender})</span>
                          <span className="patient-meta" style={{ color: '#059669' }}>{app.location}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600', color: 'var(--admin-text-main)' }}>{app.concern}</div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>{app.mode}</span>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600', color: 'var(--admin-text-main)' }}>{app.preferredDate || 'Earliest Available'}</div>
                        <span className="slot-badge">{app.timeSlot}</span>
                      </td>
                      <td>
                        <select
                          className={`status-pill ${app.status}`}
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          style={{ cursor: 'pointer', outline: 'none' }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <div className="action-buttons" style={{ justifyContent: 'center' }}>
                          <button
                            className="table-btn-pill view"
                            title="View Full Details"
                            onClick={() => setSelectedAppointment(app)}
                          >
                            <FaEye /> View
                          </button>
                          <button
                            className="table-btn-pill delete"
                            title="Delete Record"
                            onClick={() => handleDelete(app.id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {/* --- TAB 2: PATIENTS DIRECTORY --- */}
      {activeTab === 'patients' && (
        <>
          <div className="admin-page-header">
            <div className="admin-header-title">
              <h1>Patients Directory</h1>
              <p>Manage patient records, contact history, and consultation counts</p>
            </div>

            <div className="admin-actions-group">
              <button onClick={() => setShowAddModal(true)} className="admin-btn-primary" style={{ width: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.2rem' }}>
                <FaUserPlus /> Add New Patient
              </button>
            </div>
          </div>

          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-icon total">
                <FaUserGroup />
              </div>
              <div className="admin-stat-info">
                <h3>{uniquePatients.length}</h3>
                <p>Total Patients</p>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon confirmed">
                <FaUserCheck />
              </div>
              <div className="admin-stat-info">
                <h3>{uniquePatients.filter(p => p.lastStatus === 'Confirmed' || p.lastStatus === 'Completed').length}</h3>
                <p>Active Registered</p>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon completed">
                <FaClipboardList />
              </div>
              <div className="admin-stat-info">
                <h3>{appointments.length}</h3>
                <p>Consultation Records</p>
              </div>
            </div>
          </div>

          <div className="admin-controls-card">
            <div className="admin-search-box">
              <FaMagnifyingGlass className="admin-search-icon" />
              <input
                type="text"
                placeholder="Filter patient by name, phone number, location, or condition..."
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-table-container">
            {uniquePatients.length === 0 ? (
              <div className="admin-empty-state">
                <FaUserGroup className="admin-empty-icon" />
                <h3>No Patients Found</h3>
                <p>No patient records match your search criteria.</p>
              </div>
            ) : (
              <table className="admin-table bordered-grid-table">
                <thead>
                  <tr>
                    <th style={{ width: '65px', textAlign: 'center' }}>SL NO.</th>
                    <th>Patient ID</th>
                    <th>Full Name & Demographics</th>
                    <th>Contact & Location</th>
                    <th>Primary Concern</th>
                    <th>Total Visits</th>
                    <th>Recent Status</th>
                    <th style={{ textAlign: 'center' }}>Quick Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {uniquePatients.map((pat, index) => (
                    <tr key={pat.id}>
                      <td style={{ textAlign: 'center', fontWeight: '700', color: '#475569' }}>{index + 1}</td>
                      <td>
                        <span style={{ fontWeight: '700', color: '#059669', fontSize: '0.85rem' }}>{pat.id}</span>
                      </td>
                      <td>
                        <div className="patient-info">
                          <span className="patient-name">{pat.patientName}</span>
                          <span className="patient-meta">{pat.age ? `${pat.age} yrs` : 'N/A'} • {pat.gender}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600', color: 'var(--admin-text-main)' }}>{pat.phone}</div>
                        <span style={{ fontSize: '0.8rem', color: '#059669' }}>{pat.location}</span>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600', color: 'var(--admin-text-main)' }}>{pat.concern}</div>
                      </td>
                      <td>
                        <span className="status-pill Confirmed" style={{ fontSize: '0.78rem' }}>{pat.totalVisits} Visit(s)</span>
                      </td>
                      <td>
                        <span className={`status-pill ${pat.lastStatus}`}>{pat.lastStatus}</span>
                      </td>
                      <td>
                        <div className="action-buttons" style={{ justifyContent: 'center' }}>
                          <a
                            href={`tel:${formatCleanPhone(pat.phone)}`}
                            className="table-btn-pill view"
                            title="Call Patient"
                          >
                            <FaPhone /> Call
                          </a>
                          <a
                            href={`https://wa.me/${formatCleanPhone(pat.phone)}?text=${encodeURIComponent(`Hello ${pat.patientName}, this is Dr. Niharika Bezboruah from Cureo Homeopathic Clinic.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="table-btn-pill whatsapp"
                            title="WhatsApp Chat"
                          >
                            <FaWhatsapp /> WhatsApp
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}



      {/* --- TAB 4: CLINIC SETTINGS --- */}
      {activeTab === 'settings' && (
        <>
          <div className="admin-page-header">
            <div className="admin-header-title">
              <h1>Clinic & Portal Settings</h1>
              <p>Configure doctor profile, contact phone numbers, consultation slots, and notification preferences</p>
            </div>
          </div>

          {settingsSaved && (
            <div className="admin-alert-success">
              <FaCircleCheck style={{ fontSize: '1.25rem' }} />
              <span>Clinic settings and consultation parameters saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="settings-container">
            {/* General Profile Section */}
            <div className="settings-card">
              <h2 className="settings-card-title">
                <FaStethoscope style={{ color: '#059669' }} /> Clinic & Doctor Profile
              </h2>

              <div className="details-grid" style={{ marginBottom: '1rem' }}>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">Clinic Name</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    style={{ paddingLeft: '1rem' }}
                    value={clinicSettings.clinicName}
                    onChange={(e) => setClinicSettings({ ...clinicSettings, clinicName: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">Chief Medical Officer Name</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    style={{ paddingLeft: '1rem' }}
                    value={clinicSettings.doctorName}
                    onChange={(e) => setClinicSettings({ ...clinicSettings, doctorName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="details-grid" style={{ marginBottom: '1rem' }}>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">Primary Phone Number</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    style={{ paddingLeft: '1rem' }}
                    value={clinicSettings.phone}
                    onChange={(e) => setClinicSettings({ ...clinicSettings, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">WhatsApp Helpline Number</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    style={{ paddingLeft: '1rem' }}
                    value={clinicSettings.whatsapp}
                    onChange={(e) => setClinicSettings({ ...clinicSettings, whatsapp: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="details-grid" style={{ marginBottom: 0 }}>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">Official Email Address</label>
                  <input
                    type="email"
                    className="admin-form-input"
                    style={{ paddingLeft: '1rem' }}
                    value={clinicSettings.email}
                    onChange={(e) => setClinicSettings({ ...clinicSettings, email: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">Clinic Location / Address</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    style={{ paddingLeft: '1rem' }}
                    value={clinicSettings.address}
                    onChange={(e) => setClinicSettings({ ...clinicSettings, address: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Consultation Slots Section */}
            <div className="settings-card" style={{ marginTop: '1.5rem' }}>
              <h2 className="settings-card-title">
                <FaClock style={{ color: '#0284c7' }} /> Daily Consultation Time Slots
              </h2>

              <div className="details-grid" style={{ marginBottom: 0 }}>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">Morning Slot Timing</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    style={{ paddingLeft: '1rem' }}
                    value={clinicSettings.morningSlot}
                    onChange={(e) => setClinicSettings({ ...clinicSettings, morningSlot: e.target.value })}
                  />
                </div>

                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">Afternoon Slot Timing</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    style={{ paddingLeft: '1rem' }}
                    value={clinicSettings.afternoonSlot}
                    onChange={(e) => setClinicSettings({ ...clinicSettings, afternoonSlot: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="admin-btn-primary" style={{ width: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem 2rem' }}>
                <FaFloppyDisk /> Save All Settings
              </button>
            </div>
          </form>
        </>
      )}

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="admin-modal-overlay" onClick={() => setSelectedAppointment(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Appointment Details - {selectedAppointment.id}</h2>
              <button className="admin-modal-close" onClick={() => setSelectedAppointment(null)}>
                <FaXmark />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="details-grid">
                <div className="detail-item">
                  <label>Patient Full Name</label>
                  <p>{selectedAppointment.patientName}</p>
                </div>
                <div className="detail-item">
                  <label>Phone / WhatsApp</label>
                  <p>{selectedAppointment.phone}</p>
                </div>
                <div className="detail-item">
                  <label>Age & Gender</label>
                  <p>{selectedAppointment.age ? `${selectedAppointment.age} Years` : 'N/A'} ({selectedAppointment.gender})</p>
                </div>
                <div className="detail-item">
                  <label>Location / City</label>
                  <p>{selectedAppointment.location}</p>
                </div>
                <div className="detail-item">
                  <label>Health Concern</label>
                  <p style={{ color: '#059669' }}>{selectedAppointment.concern}</p>
                </div>
                <div className="detail-item">
                  <label>Consultation Mode</label>
                  <p>{selectedAppointment.mode}</p>
                </div>
                <div className="detail-item">
                  <label>Preferred Date</label>
                  <p>{selectedAppointment.preferredDate || 'Earliest Available'}</p>
                </div>
                <div className="detail-item">
                  <label>Time Slot</label>
                  <p>{selectedAppointment.timeSlot}</p>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Patient Symptoms / Notes</label>
                <div className="notes-box">
                  {selectedAppointment.notes || 'No extra symptoms or notes provided.'}
                </div>
              </div>

              <div className="modal-actions">
                <a
                  href={`tel:${formatCleanPhone(selectedAppointment.phone)}`}
                  className="admin-btn-secondary"
                  style={{ textDecoration: 'none' }}
                >
                  <FaPhone /> Call Patient
                </a>
                <a
                  href={`https://wa.me/${formatCleanPhone(selectedAppointment.phone)}?text=${encodeURIComponent(`Hello ${selectedAppointment.patientName}, this is Cureo Homeopathic Clinic regarding your appointment request (${selectedAppointment.id}).`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-whatsapp"
                >
                  <FaWhatsapp /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual New Appointment Modal */}
      {showAddModal && (
        <div className="admin-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Create New Patient Booking</h2>
              <button className="admin-modal-close" onClick={() => setShowAddModal(false)}>
                <FaXmark />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="admin-modal-body">
              <div className="admin-form-group">
                <label className="admin-form-label">Patient Name *</label>
                <input
                  type="text"
                  className="admin-form-input"
                  style={{ paddingLeft: '1rem' }}
                  placeholder="e.g. Ramesh Kumar"
                  value={newForm.patientName}
                  onChange={(e) => setNewForm({ ...newForm, patientName: e.target.value })}
                  required
                />
              </div>

              <div className="details-grid" style={{ marginBottom: '1rem' }}>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">Phone Number *</label>
                  <input
                    type="tel"
                    className="admin-form-input"
                    style={{ paddingLeft: '1rem' }}
                    placeholder="+91 98765 43210"
                    value={newForm.phone}
                    onChange={(e) => setNewForm({ ...newForm, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">Age</label>
                  <input
                    type="number"
                    className="admin-form-input"
                    style={{ paddingLeft: '1rem' }}
                    placeholder="35"
                    value={newForm.age}
                    onChange={(e) => setNewForm({ ...newForm, age: e.target.value })}
                  />
                </div>
              </div>

              <div className="details-grid" style={{ marginBottom: '1rem' }}>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">Gender</label>
                  <select
                    className="admin-select"
                    style={{ width: '100%' }}
                    value={newForm.gender}
                    onChange={(e) => setNewForm({ ...newForm, gender: e.target.value })}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">Location / City</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    style={{ paddingLeft: '1rem' }}
                    placeholder="Dibrugarh"
                    value={newForm.location}
                    onChange={(e) => setNewForm({ ...newForm, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="details-grid" style={{ marginBottom: '1rem' }}>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">Health Concern</label>
                  <select
                    className="admin-select"
                    style={{ width: '100%' }}
                    value={newForm.concern}
                    onChange={(e) => setNewForm({ ...newForm, concern: e.target.value })}
                  >
                    <option value="Skin Concerns">Skin Concerns</option>
                    <option value="Piles & Anorectal Care">Piles & Anorectal Care</option>
                    <option value="Digestive & Bowel Health">Digestive & Bowel Health</option>
                    <option value="General Homeopathic Consultation">General Homeopathic Consultation</option>
                  </select>
                </div>

                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">Consultation Mode</label>
                  <select
                    className="admin-select"
                    style={{ width: '100%' }}
                    value={newForm.mode}
                    onChange={(e) => setNewForm({ ...newForm, mode: e.target.value })}
                  >
                    <option value="In-Clinic Consultation">In-Clinic Consultation</option>
                    <option value="WhatsApp Online Consultation">WhatsApp Online Consultation</option>
                  </select>
                </div>
              </div>

              <div className="details-grid" style={{ marginBottom: '1rem' }}>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">Preferred Date</label>
                  <input
                    type="date"
                    className="admin-form-input"
                    style={{ paddingLeft: '1rem' }}
                    value={newForm.preferredDate}
                    onChange={(e) => setNewForm({ ...newForm, preferredDate: e.target.value })}
                  />
                </div>

                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">Time Slot</label>
                  <select
                    className="admin-select"
                    style={{ width: '100%' }}
                    value={newForm.timeSlot}
                    onChange={(e) => setNewForm({ ...newForm, timeSlot: e.target.value })}
                  >
                    <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                    <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Patient Symptoms / Notes</label>
                <textarea
                  rows="3"
                  className="admin-form-input"
                  style={{ paddingLeft: '1rem', height: 'auto' }}
                  placeholder="Notes about patient condition..."
                  value={newForm.notes}
                  onChange={(e) => setNewForm({ ...newForm, notes: e.target.value })}
                ></textarea>
              </div>

              <div className="modal-actions">
                <button type="button" className="admin-btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary" style={{ width: 'auto', padding: '0.65rem 1.5rem' }}>
                  Save Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
