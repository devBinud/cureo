import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaCalendarCheck, FaClock, FaFileCsv,
  FaMagnifyingGlass, FaEye, FaTrash, FaWhatsapp, FaPhone, FaXmark,
  FaCheck, FaStethoscope, FaCalendarDays,
  FaUserGroup, FaFloppyDisk, FaLocationDot, FaEnvelope,
  FaCircleCheck, FaUserCheck, FaClipboardList
} from 'react-icons/fa6';
import AdminLayout from './AdminLayout';
import {
  isAuthenticated, getAppointments, updateAppointmentStatus,
  deleteAppointment
} from './adminStore';
import { subscribeToAppointments, updateAppointmentStatusInFirebase, deleteAppointmentFromFirebase } from '../firebase';
import './admin.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

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

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }

    // Live real-time subscription to Firebase Firestore Database
    const unsubscribe = subscribeToAppointments((liveApps) => {
      if (liveApps) {
        setAppointments(liveApps);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleStatusChange = async (appItemOrId, newStatus) => {
    const targetId = typeof appItemOrId === 'object' ? appItemOrId.id : appItemOrId;
    setAppointments((prev) => prev.map(a => (a.id === targetId || a.firestoreDocId === targetId) ? { ...a, status: newStatus } : a));
    updateAppointmentStatus(targetId, newStatus);
    if (selectedAppointment && (selectedAppointment.id === targetId || selectedAppointment.firestoreDocId === targetId)) {
      setSelectedAppointment({ ...selectedAppointment, status: newStatus });
    }
    await updateAppointmentStatusInFirebase(appItemOrId, newStatus);
  };

  const handleDelete = async (appItemOrId) => {
    const targetId = typeof appItemOrId === 'object' ? appItemOrId.id : appItemOrId;
    if (window.confirm('Are you sure you want to delete this appointment record?')) {
      setAppointments((prev) => prev.filter(a => a.id !== targetId && a.firestoreDocId !== targetId));
      deleteAppointment(targetId);
      if (selectedAppointment && (selectedAppointment.id === targetId || selectedAppointment.firestoreDocId === targetId)) {
        setSelectedAppointment(null);
      }
      await deleteAppointmentFromFirebase(appItemOrId);
    }
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
      const name = (app.patientName || '').toLowerCase();
      const phone = (app.phone || '').toLowerCase();
      const location = (app.location || '').toLowerCase();
      const concern = (app.concern || '').toLowerCase();
      const id = (app.id || '').toLowerCase();
      const matchesSearch =
        name.includes(query) ||
        phone.includes(query) ||
        location.includes(query) ||
        concern.includes(query) ||
        id.includes(query);
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
      const phoneStr = (app.phone || '').replace(/[^0-9]/g, '');
      const nameStr = (app.patientName || '').toLowerCase();
      const key = phoneStr || nameStr || `patient-${idx}`;
      if (!map.has(key)) {
        map.set(key, {
          id: `PAT-10${idx + 1}`,
          patientName: app.patientName || 'Anonymous',
          phone: app.phone || 'N/A',
          age: app.age || '',
          gender: app.gender || '',
          location: app.location || '',
          concern: app.concern || '',
          totalVisits: 1,
          lastVisit: app.preferredDate || app.createdAt || '',
          lastStatus: app.status || 'Pending'
        });
      } else {
        const existing = map.get(key);
        existing.totalVisits += 1;
      }
    });
    return Array.from(map.values()).filter(p => {
      const q = patientSearch.toLowerCase();
      return (
        (p.patientName || '').toLowerCase().includes(q) ||
        (p.phone || '').toLowerCase().includes(q) ||
        (p.location || '').toLowerCase().includes(q) ||
        (p.concern || '').toLowerCase().includes(q)
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
            {isLoading ? (
              <div style={{ padding: '3rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  border: '4px solid rgba(16, 185, 129, 0.15)',
                  borderTop: '4px solid #10b981',
                  borderRadius: '50%',
                  animation: 'spin 0.85s linear infinite'
                }} />
                <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Loading appointments from database...</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
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
                          onChange={(e) => handleStatusChange(app, e.target.value)}
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
                            onClick={() => handleDelete(app)}
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


    </AdminLayout>
  );
}
