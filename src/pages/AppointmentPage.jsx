import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp, FaCalendarCheck, FaClipboardList, FaUser, FaPhone, FaLocationDot, FaStethoscope, FaClock, FaGlobe, FaCircleInfo, FaTriangleExclamation, FaCircleCheck } from 'react-icons/fa6'
import { addAppointment } from '../admin/adminStore'
import { saveAppointmentToFirebase } from '../firebase'
import { FadeUp } from '../components/Animated'

export default function AppointmentPage() {
  const todayStr = (() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  })();

  const [dateError, setDateError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState('');
  const [errors, setErrors] = useState({});
  const [formSubmittedAttempted, setFormSubmittedAttempted] = useState(false);

  const [formData, setFormData] = useState({
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
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  }

  const handleDateChange = (e) => {
    const val = e.target.value;
    if (errors.preferredDate) {
      setErrors((prev) => ({ ...prev, preferredDate: false }));
    }
    if (val) {
      const parts = val.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const selectedDate = new Date(year, month, day);
        if (selectedDate.getDay() === 0) { // 0 = Sunday
          setDateError('Sundays are clinic holidays. Please select Monday to Saturday.');
          setFormData((prev) => ({ ...prev, preferredDate: '' }));
          return;
        }
      }
    }
    setDateError('');
    setFormData((prev) => ({ ...prev, preferredDate: val }));
  }

  const validateForm = () => {
    const newErrors = {};
    if (!formData.patientName || !formData.patientName.trim()) newErrors.patientName = true;
    if (!formData.phone || !formData.phone.trim()) newErrors.phone = true;
    if (!formData.age || !formData.age.toString().trim()) newErrors.age = true;
    if (!formData.gender) newErrors.gender = true;
    if (!formData.location || !formData.location.trim()) newErrors.location = true;
    if (!formData.concern) newErrors.concern = true;
    if (!formData.mode) newErrors.mode = true;
    if (!formData.preferredDate) newErrors.preferredDate = true;
    if (!formData.timeSlot) newErrors.timeSlot = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmittedAttempted(true);

    if (!validateForm()) {
      return;
    }

    if (dateError) return;

    setSubmitting(true);

    const generatedId = `CUREO-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedBookingId(generatedId);

    const payload = {
      ...formData,
      id: generatedId
    };

    try {
      addAppointment(payload);
      await saveAppointmentToFirebase(payload);
    } catch (err) {
      console.error("Failed to save appointment to Firebase", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  }

  const handleResetForm = () => {
    setFormData({
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
    setErrors({});
    setFormSubmittedAttempted(false);
    setCreatedBookingId('');
    setSubmitted(false);
  }

  return (
    <div className="section" style={{ paddingTop: '2.25rem' }}>
      <FadeUp className="appointment-page-wrapper">
        <div className="section-header appointment-header">
          <span className="section-tag">Book an Appointment</span>
          <h2 className="section-title">Schedule Your Consultation</h2>
        </div>

        <div className="appointment-container">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <FaCircleCheck size={60} style={{ color: '#0b6b4f', marginBottom: '1.25rem' }} />
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#093819', marginBottom: '0.25rem' }}>
                Booking Request Submitted!
              </h2>

              <p style={{ fontSize: '0.95rem', color: '#475569', marginTop: 20, maxWidth: '520px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
                Thank you, <strong>{formData.patientName}</strong>. Your consultation request has been sent directly to the Cureo Homeopathic Clinic admin portal.
              </p>

              <div style={{ background: '#f8faf9', border: '1px solid #e2ece4', borderRadius: '14px', padding: '1.5rem', textAlign: 'left', maxWidth: '520px', margin: '0 auto 2rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: '#0b6b4f', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', borderBottom: '1px dashed #cbd5e1', paddingBottom: '0.5rem' }}>
                  Summary of Request
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem', fontSize: '0.875rem', color: '#1e293b' }}>
                  <div><strong>Appointment ID:</strong> <span style={{ color: '#d97706', fontWeight: 700 }}>{createdBookingId}</span></div>
                  <div><strong>Patient Name:</strong> {formData.patientName}</div>
                  <div><strong>Phone:</strong> {formData.phone}</div>
                  <div><strong>Age / Gender:</strong> {formData.age} Yrs ({formData.gender})</div>
                  <div><strong>Location:</strong> {formData.location}</div>
                  <div><strong>Health Concern:</strong> {formData.concern}</div>
                  <div><strong>Consultation Mode:</strong> {formData.mode}</div>
                  <div><strong>Preferred Date:</strong> {formData.preferredDate || 'Earliest Available'}</div>
                  <div><strong>Time Slot:</strong> {formData.timeSlot}</div>
                </div>
              </div>

              <div style={{ maxWidth: '520px', margin: '0 auto' }}>
                <button onClick={handleResetForm} className="btn-hero-primary" style={{ width: '100%', padding: '0.85rem' }}>
                  Book Another Appointment
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="appointment-amber-banner">
                <span>
                  Online consultations are available from the comfort of your home. After consultation, prescribed medicine & remedy kits can be delivered to your doorstep by courier.
                </span>
              </div>

              {formSubmittedAttempted && Object.keys(errors).length > 0 && (
                <div style={{ padding: '0.85rem 1.15rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', color: '#dc2626', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaTriangleExclamation size={18} style={{ flexShrink: 0 }} />
                  <span>Please fill out all mandatory fields marked with * before submitting.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <h3 className="form-section-header">
                  1. Patient Personal Information
                </h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="patientName">
                      Patient Full Name <span style={{ color: '#dc2626', fontWeight: 700 }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="patientName"
                      name="patientName"
                      className="form-input"
                      style={errors.patientName ? { borderColor: '#dc2626', backgroundColor: '#fff5f5' } : {}}
                      placeholder="e.g. Ananya Das"
                      value={formData.patientName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      WhatsApp / Mobile Number <span style={{ color: '#dc2626', fontWeight: 700 }}>*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      style={errors.phone ? { borderColor: '#dc2626', backgroundColor: '#fff5f5' } : {}}
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="age">
                      Age (Years) <span style={{ color: '#dc2626', fontWeight: 700 }}>*</span>
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      className="form-input"
                      style={errors.age ? { borderColor: '#dc2626', backgroundColor: '#fff5f5' } : {}}
                      placeholder="e.g. 32"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender">
                      Gender <span style={{ color: '#dc2626', fontWeight: 700 }}>*</span>
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      className="form-select"
                      style={errors.gender ? { borderColor: '#dc2626', backgroundColor: '#fff5f5' } : {}}
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="location">
                      City / District / Area <span style={{ color: '#dc2626', fontWeight: 700 }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="form-input"
                      style={errors.location ? { borderColor: '#dc2626', backgroundColor: '#fff5f5' } : {}}
                      placeholder="e.g. Dibrugarh, Tinsukia, Jorhat, etc."
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <h3 className="form-section-header">
                  2. Consultation & Preferred Schedule
                </h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="concern">
                      Primary Health Concern <span style={{ color: '#dc2626', fontWeight: 700 }}>*</span>
                    </label>
                    <select
                      id="concern"
                      name="concern"
                      className="form-select"
                      style={errors.concern ? { borderColor: '#dc2626', backgroundColor: '#fff5f5' } : {}}
                      value={formData.concern}
                      onChange={handleChange}
                      required
                    >
                      <option value="Skin Concerns">Skin Concerns</option>
                      <option value="Piles & Anorectal Care">Piles & Anorectal Concerns</option>
                      <option value="Digestive & Bowel Health">Digestive & Chronic Indigestion</option>
                      <option value="General Homeopathic Consultation">General Homeopathic Consultation</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="mode">
                      Consultation Type <span style={{ color: '#dc2626', fontWeight: 700 }}>*</span>
                    </label>
                    <select
                      id="mode"
                      name="mode"
                      className="form-select"
                      style={errors.mode ? { borderColor: '#dc2626', backgroundColor: '#fff5f5' } : {}}
                      value={formData.mode}
                      onChange={handleChange}
                      required
                    >
                      <option value="In-Clinic Consultation">In-Clinic Consultation</option>
                      <option value="Online Consultation">Online Consultation</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="preferredDate">
                      Preferred Appointment Date <span style={{ color: '#dc2626', fontWeight: 700 }}>*</span> <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>(Mon – Sat)</span>
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      className="form-input"
                      style={errors.preferredDate ? { borderColor: '#dc2626', backgroundColor: '#fff5f5' } : {}}
                      min={todayStr}
                      value={formData.preferredDate}
                      onChange={handleDateChange}
                      required
                    />
                    {dateError && (
                      <small style={{ fontSize: '0.78rem', color: '#dc2626', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                        <FaTriangleExclamation size={13} /> {dateError}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="timeSlot">
                      Preferred Time Slot <span style={{ color: '#dc2626', fontWeight: 700 }}>*</span>
                    </label>
                    <select
                      id="timeSlot"
                      name="timeSlot"
                      className="form-select"
                      style={errors.timeSlot ? { borderColor: '#dc2626', backgroundColor: '#fff5f5' } : {}}
                      value={formData.timeSlot}
                      onChange={handleChange}
                      required
                    >
                      <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                      <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                      <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="notes">
                      Brief Description of Symptoms / History <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>(Optional)</span>
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows="4"
                      className="form-textarea"
                      placeholder="Mention how long you have been facing this issue, whether it recurs repeatedly..."
                      value={formData.notes}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="btn-hero-primary btn-submit-appointment" disabled={submitting}>
                  <span>{submitting ? 'Submitting...' : 'Confirm & Send Booking Request'}</span>
                </button>
              </form>
            </>
          )}
        </div>
      </FadeUp>
    </div>
  )
}
