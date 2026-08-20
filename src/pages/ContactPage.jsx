import { Link } from 'react-router-dom'
import { FaWhatsapp, FaLocationDot, FaPhone, FaCalendarCheck, FaClipboardList } from 'react-icons/fa6'

export default function ContactPage() {
  const whatsappNumber = "917002974378";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Dr. Niharika Bezboruah, I would like to enquire about consultation.")}`;

  return (
    <div className="section" style={{ marginTop: '2.5rem' }}>
      <div className="section-header">
        <span className="section-tag">Get In Touch</span>
        <h2 className="section-title">Contact & Location</h2>
        <p className="section-desc">Consultation details and appointment instructions for Dr. Niharika Bezboruah.</p>
      </div>

      <div className="policy-banner" style={{ padding: 0, marginBottom: '2.5rem' }}>
        <div className="policy-card">
          <div className="policy-icon">
            <FaClipboardList />
          </div>
          <div className="policy-text">
            <h4>Mandatory Consultation Notice</h4>
            <p>
              For Skin, Piles & Digestive concerns, <strong>prior appointment booking via WhatsApp / Online Portal is strictly required</strong>. Direct phone calls or walk-ins without prior booking will not be attended.
            </p>
          </div>
        </div>
      </div>

      <div className="specialty-grid" style={{ marginBottom: '3rem' }}>
        <div className="specialty-card">
          <div className="specialty-icon-box">
            <FaLocationDot />
          </div>
          <h3>Clinic Address</h3>
          <p style={{ lineHeight: 1.8 }}>
            <strong>Cureo Homeopathy Clinic</strong><br />
            Dr. Niharika Bezboruah (BHMS)<br />
            Dibrugarh, Assam, India<br />
            Pincode: 786001
          </p>
        </div>

        <div className="specialty-card">
          <div className="specialty-icon-box" style={{ backgroundColor: 'rgba(37, 211, 102, 0.15)', color: '#1E5725' }}>
            <FaWhatsapp />
          </div>
          <h3>WhatsApp Appointments</h3>
          <p style={{ lineHeight: 1.8 }}>
            <strong>Phone / WhatsApp:</strong> +91 70029 74378<br />
            <strong>Policy:</strong> Message on WhatsApp for slot confirmation.<br />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>*Calls without prior appointment are disabled.</span>
          </p>
          <div style={{ marginTop: '1rem' }}>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
              <FaWhatsapp /> WhatsApp Message
            </a>
          </div>
        </div>

        <div className="specialty-card">
          <div className="specialty-icon-box">
            <FaCalendarCheck />
          </div>
          <h3>Online Slot Request</h3>
          <p style={{ lineHeight: 1.8 }}>
            Use our interactive online portal to select your preferred date, time slot, and health concern details.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/appointment" className="btn-whatsapp" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', backgroundColor: 'var(--secondary)' }}>
              Open Appointment Portal →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
