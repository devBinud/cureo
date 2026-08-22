// src/admin/adminStore.js

const APPOINTMENTS_STORAGE_KEY = 'cureo_admin_appointments';
const AUTH_STORAGE_KEY = 'cureo_admin_auth';

// Initial pre-seeded mock appointments
const INITIAL_APPOINTMENTS = [
  {
    id: 'APT-1001',
    patientName: 'Ananya Sharma',
    phone: '+91 98765 43210',
    age: '28',
    gender: 'Female',
    location: 'Dibrugarh (Near HS Road)',
    concern: 'Skin Concerns',
    mode: 'In-Clinic Consultation',
    preferredDate: '2026-08-23',
    timeSlot: 'Morning (10:00 AM - 1:00 PM)',
    notes: 'Experiencing recurrent eczema flare-ups on forearm for past 3 months. Needs consultation.',
    status: 'Pending',
    createdAt: '2026-08-22 09:30'
  },
  {
    id: 'APT-1002',
    patientName: 'Rajesh Baruah',
    phone: '+91 94350 12345',
    age: '45',
    gender: 'Male',
    location: 'Tinsukia',
    concern: 'Piles & Anorectal Care',
    mode: 'In-Clinic Consultation',
    preferredDate: '2026-08-24',
    timeSlot: 'Afternoon (2:00 PM - 5:00 PM)',
    notes: 'Chronic pain during bowel movement, looking for non-surgical homeopathic treatment.',
    status: 'Confirmed',
    createdAt: '2026-08-21 16:15'
  },
  {
    id: 'APT-1003',
    patientName: 'Priya Gogoi',
    phone: '+91 88123 99887',
    age: '34',
    gender: 'Female',
    location: 'Jorhat',
    concern: 'Digestive & Bowel Health',
    mode: 'WhatsApp Online Consultation',
    preferredDate: '2026-08-23',
    timeSlot: 'Evening (5:00 PM - 8:00 PM)',
    notes: 'Suffering from severe acidity and bloated stomach after meals.',
    status: 'Confirmed',
    createdAt: '2026-08-21 11:45'
  },
  {
    id: 'APT-1004',
    patientName: 'Bikash Sonowal',
    phone: '+91 97060 54321',
    age: '52',
    gender: 'Male',
    location: 'Dibrugarh (Graham Bazar)',
    concern: 'General Homeopathic Consultation',
    mode: 'In-Clinic Consultation',
    preferredDate: '2026-08-20',
    timeSlot: 'Morning (10:00 AM - 1:00 PM)',
    notes: 'Joint stiffness and seasonal allergies.',
    status: 'Completed',
    createdAt: '2026-08-19 14:20'
  },
  {
    id: 'APT-1005',
    patientName: 'Smita Saikia',
    phone: '+91 91012 34567',
    age: '22',
    gender: 'Female',
    location: 'Sivasagar',
    concern: 'Skin Concerns',
    mode: 'WhatsApp Online Consultation',
    preferredDate: '2026-08-25',
    timeSlot: 'Afternoon (2:00 PM - 5:00 PM)',
    notes: 'Hormonal acne breakout on cheeks.',
    status: 'Pending',
    createdAt: '2026-08-22 10:05'
  }
];

// Initialize storage if empty
export function initAppointments() {
  const existing = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
  }
}

// Get all appointments
export function getAppointments() {
  initAppointments();
  try {
    const raw = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : INITIAL_APPOINTMENTS;
  } catch (e) {
    console.error('Failed to parse appointments', e);
    return INITIAL_APPOINTMENTS;
  }
}

// Save appointments list
function saveAppointments(appointments) {
  localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
}

// Add new appointment
export function addAppointment(newAppData) {
  const appointments = getAppointments();
  const id = `APT-${Date.now().toString().slice(-4)}`;
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
  // Accepts admin / cureo2026 or admin / admin123
  const trimmedUser = (username || '').trim().toLowerCase();
  const trimmedPass = (password || '').trim();

  if (trimmedUser === 'admin' && (trimmedPass === 'cureo2026' || trimmedPass === 'admin123')) {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    return { success: true };
  } else {
    return { success: false, message: 'Invalid username or password' };
  }
}

export function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
