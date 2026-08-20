import { useState } from 'react'
import { FaWhatsapp, FaCalendarCheck, FaClipboardList, FaUser, FaPhone, FaLocationDot, FaStethoscope, FaClock } from 'react-icons/fa6'

export default function AppointmentPage() {
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
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = "917002974378";
    const textMessage = `*NEW ONLINE APPOINTMENT REQUEST - CUREO*
---------------------------------------
👤 *Patient Name:* ${formData.patientName || 'Not provided'}
📱 *Phone:* ${formData.phone || 'Not provided'}
🎂 *Age/Gender:* ${formData.age ? formData.age + ' yrs' : 'N/A'} (${formData.gender})
📍 *Location:* ${formData.location}

🩺 *Health Concern:* ${formData.concern}
🏥 *Consultation Mode:* ${formData.mode}
📅 *Preferred Date:* ${formData.preferredDate || 'Earliest Available'}
⏰ *Preferred Slot:* ${formData.timeSlot}

📝 *Symptoms/Notes:* 
${formData.notes || 'None'}
---------------------------------------
_Sent from Cureo Website Appointment Portal_`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMessage)}`;
    window.open(whatsappUrl, '_blank');
  }

  return (
    <div className="section" style={{ marginTop: '2.5rem' }}>
      <div className="section-header">
        <span className="section-tag">ONLINE BOOKING PORTAL</span>
        <h2 className="section-title">Schedule Your Consultation</h2>
        <p className="section-desc">
          Fill in your details below to request a prior appointment slot with <strong>Dr. Niharika Bezboruah (BHMS)</strong>.
        </p>
      </div>

      <div className="appointment-container">
        {/* Important Consultation Policy Alert Card */}
        <div className="policy-card">
          <div className="policy-icon">
            <FaClipboardList />
          </div>
          <div className="policy-text">
            <h4>Important Consultation Policy</h4>
            <p>
              For Skin, Piles & Digestive concerns, <strong>prior booking is mandatory</strong>. Direct phone calls or unscheduled walk-in consultations will not be attended.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <h3 className="form-section-header">
            1. Patient Personal Information
          </h3>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="patientName">Patient Full Name *</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                className="form-input"
                placeholder="e.g. Ananya Das"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">WhatsApp / Mobile Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age (Years)</label>
              <input
                type="number"
                id="age"
                name="age"
                className="form-input"
                placeholder="e.g. 32"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                className="form-select"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="location">City / District / Area *</label>
              <input
                type="text"
                id="location"
                name="location"
                className="form-input"
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
              <label htmlFor="concern">Primary Health Concern *</label>
              <select
                id="concern"
                name="concern"
                className="form-select"
                value={formData.concern}
                onChange={handleChange}
              >
                <option value="Skin Concerns">Skin Concerns (Eczema, Allergy, Rash)</option>
                <option value="Piles & Anorectal Care">Piles & Anorectal Concerns</option>
                <option value="Digestive & Bowel Health">Digestive & Chronic Indigestion</option>
                <option value="General Homeopathic Consultation">General Homeopathic Consultation</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="mode">Consultation Type</label>
              <select
                id="mode"
                name="mode"
                className="form-select"
                value={formData.mode}
                onChange={handleChange}
              >
                <option value="In-Clinic Consultation">In-Clinic Consultation (Dibrugarh)</option>
                <option value="WhatsApp Online Consultation">WhatsApp Online Consultation</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="preferredDate">Preferred Appointment Date</label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                className="form-input"
                value={formData.preferredDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="timeSlot">Preferred Time Slot</label>
              <select
                id="timeSlot"
                name="timeSlot"
                className="form-select"
                value={formData.timeSlot}
                onChange={handleChange}
              >
                <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="notes">Brief Description of Symptoms / History</label>
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

          <button type="submit" className="btn-hero-primary btn-submit-appointment">
            <FaCalendarCheck size={18} />
            <span>Confirm & Send Booking Request</span>
          </button>
        </form>
      </div>
    </div>
  )
}
