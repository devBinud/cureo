import { Link } from 'react-router-dom'
import { FaWhatsapp, FaLocationDot, FaCalendarCheck, FaGlobe, FaRoute, FaArrowUpRightFromSquare } from 'react-icons/fa6'

export default function ContactPage() {
  const whatsappNumber = "917002974378";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Dr. Niharika Bezboruah, I would like to enquire about consultation.")}`;
  const googleMapsUrl = "https://www.google.com/maps/place/Cureo+Personalised+Homeopathic+Care/@27.4839343,94.9237945,17z";

  return (
    <div className="section" style={{ marginTop: '2.5rem' }}>
      <div className="section-header">
        <span className="section-tag">Get In Touch</span>
        <h2 className="section-title">Contact & Clinic Location</h2>
        <p className="section-desc">Consultation details, interactive Google Map, and appointment instructions for Dr. Niharika Bezboruah.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="specialty-card">
          <div className="specialty-icon-box">
            <FaLocationDot />
          </div>
          <h3>Clinic Address</h3>
          <p style={{ lineHeight: 1.7, fontSize: '0.9rem' }}>
            <strong style={{ color: 'var(--primary-dark)', fontSize: '0.98rem' }}>Cureo Personalised Homeopathic Care</strong><br />
            Lab collection centre, near Dr Lal path,<br />
            opposite Honda dealer, Naliapool,<br />
            Dibrugarh, Assam 786001<br />
            <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px', display: 'inline-block' }}>Plus Code: FWMF+HG Dibrugarh</span>
          </p>
          <div style={{ marginTop: '1rem' }}>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-directions-map" style={{ border: '1px solid #0b6b4f', padding: '0.5rem 0.9rem', fontSize: '0.8rem' }}>
              Open Directions <FaArrowUpRightFromSquare size={11} />
            </a>
          </div>
        </div>

        <div className="specialty-card">
          <div className="specialty-icon-box">
            <FaCalendarCheck />
          </div>
          <h3>Book Consultation Slot</h3>
          <p style={{ lineHeight: 1.8 }}>
            Schedule your in-clinic consultation at Dibrugarh with Dr. Niharika Bezboruah (BHMS) using our online portal or WhatsApp support line (+91 70029 74378).
          </p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/appointment" className="btn-hero-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
              Open Appointment Portal →
            </Link>
          </div>
        </div>
      </div>

      {/* Embedded Google Maps Section */}
      <div className="clinic-map-section">
        <div className="clinic-map-header">
          <div className="clinic-map-title-box">
            <h3><FaLocationDot style={{ color: '#86efac' }} /> Cureo Personalised Homeopathic Care</h3>
            <p>Lab collection centre, near Dr Lal path, opposite Honda dealer, Naliapool, Dibrugarh, Assam 786001</p>
          </div>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-directions-map">
            <FaRoute /> Get Directions on Google Maps <FaArrowUpRightFromSquare size={11} />
          </a>
        </div>
        <div className="clinic-map-frame-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.528511227843!2d94.9237945!3d27.4839343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3740992dc75e4b9f%3A0x86f74470d0b8ca74!2sCureo%20Personalised%20Homeopathic%20Care!5e0!3m2!1sen!2sin!4v1787557924980!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Cureo Personalised Homeopathic Care Location Map"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

