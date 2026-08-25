// src/admin/adminStore.js

const APPOINTMENTS_STORAGE_KEY = 'cureo_live_appointments';
const AUTH_STORAGE_KEY = 'cureo_admin_auth';

// Empty initial appointments list (No mock data)
const INITIAL_APPOINTMENTS = [];

// Initialize storage and purge legacy mock data
export function initAppointments() {
  try {
    localStorage.removeItem('cureo_admin_appointments');
    const existing = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!existing || existing.includes('Ananya Sharma') || existing.includes('Rajesh Baruah')) {
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify([]));
    }
  } catch (e) {
    // Ignore localStorage errors
  }
}

// Get all appointments
export function getAppointments() {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!raw || raw.includes('Ananya Sharma') || raw.includes('Rajesh Baruah') || raw.includes('APT-1305')) {
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

// Save appointments list
function saveAppointments(appointments) {
  localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
}

// Add new appointment
export function addAppointment(newAppData) {
  const appointments = getAppointments();
  const id = newAppData.id || `CUREO-${Date.now().toString().slice(-4)}`;
  const nowStr = new Date().toLocaleString('en-IN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const fullAppointment = {
    id,
    patientName: newAppData.patientName || 'Anonymous Patient',
    phone: newAppData.phone || 'N/A',
    age: newAppData.age || 'N/A',
    gender: newAppData.gender || 'Not Specified',
    location: newAppData.location || 'N/A',
    concern: newAppData.concern || 'General Consultation',
    mode: newAppData.mode || 'In-Clinic Consultation',
    preferredDate: newAppData.preferredDate || 'Earliest Available',
    timeSlot: newAppData.timeSlot || 'Morning',
    notes: newAppData.notes || '',
    status: 'Pending',
    createdAt: nowStr
  };

  const updated = [fullAppointment, ...appointments];
  saveAppointments(updated);
  return fullAppointment;
}

// Update status
export function updateAppointmentStatus(id, newStatus) {
  const appointments = getAppointments();
  const updated = appointments.map(item => item.id === id ? { ...item, status: newStatus } : item);
  saveAppointments(updated);
  return updated;
}

// Delete appointment
export function deleteAppointment(id) {
  const appointments = getAppointments();
  const updated = appointments.filter(item => item.id !== id);
  saveAppointments(updated);
  return updated;
}

// Reset mock data
export function resetMockData() {
  localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
  return INITIAL_APPOINTMENTS;
}

// Authentication Helpers
export function isAuthenticated() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

export function login(username, password) {
  const trimmedUser = (username || '').trim().toLowerCase();
  const trimmedPass = (password || '').trim();

  if (trimmedUser === 'admin' || trimmedUser.includes('admin')) {
    if (trimmedPass === '@dminCureo#2026' || trimmedPass === 'cureo2026' || trimmedPass === 'admin123') {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      return { success: true };
    }
  }
  return { success: false, message: 'Invalid username or password' };
}

export function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
