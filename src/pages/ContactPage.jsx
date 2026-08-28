import { Link } from 'react-router-dom'
import { FaWhatsapp, FaLocationDot, FaCalendarCheck, FaGlobe, FaRoute, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { FadeUp, StaggerContainer, StaggerItem } from '../components/Animated'

export default function ContactPage() {
  const whatsappNumber = "917002974378";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Dr. Niharika Bezboruah, I would like to enquire about consultation.")}`;
  const googleMapsUrl = "https://www.google.com/maps/place/Cureo+Personalised+Homeopathic+Care/@27.4839343,94.9237945,17z/data=!3m1!4b1!4m6!3m5!1s0x3740992dc75e4b9f:0x86f74470d0b8ca74!8m2!3d27.4839343!4d94.9237945!16s%2Fg%2F11y1ypst5k";

  return (
    <div className="section" style={{ marginTop: '2.5rem' }}>
      <FadeUp className="section-header">
        <span className="section-tag">Get In Touch</span>
        <h2 className="section-title">Contact & Location</h2>
        <p className="section-desc">Consultation details, interactive Google Map, and appointment instructions for Dr. Niharika Bezboruah.</p>
      </FadeUp>

      <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <StaggerItem className="specialty-card">
          <div className="specialty-icon-box">
            <FaLocationDot />
          </div>
          <h3>Location & Address</h3>
          <p style={{ lineHeight: 1.7, fontSize: '0.9rem' }}>
            <strong style={{ color: 'var(--primary-dark)', fontSize: '0.98rem' }}>Cureo Personalised Homeopathic Care</strong><br />
            Naliapool, near Dr Lal path,<br />
            opposite Honda dealer,<br />
            Dibrugarh, Assam 786001<br />
            <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px', display: 'inline-block' }}>Plus Code: FWMF+HG Dibrugarh</span>
          </p>
          <div style={{ marginTop: '1rem' }}>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-directions-map" style={{ border: '1px solid #0b6b4f', padding: '0.5rem 0.9rem', fontSize: '0.8rem' }}>
              Open Directions <FaArrowUpRightFromSquare size={11} />
            </a>
          </div>
        </StaggerItem>

        <StaggerItem className="specialty-card">
          <div className="specialty-icon-box">
            <FaCalendarCheck />
          </div>
          <h3>Book Consultation Slot</h3>
          <p style={{ lineHeight: 1.8 }}>
            Schedule your in-person consultation at Dibrugarh with Dr. Niharika Bezboruah (BHMS) using our online portal or WhatsApp support line (+91 70029 74378).
          </p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/appointment" className="btn-hero-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
              Open Appointment Portal →
            </Link>
          </div>
        </StaggerItem>
      </StaggerContainer>

      {/* Embedded Google Maps Section */}
      <FadeUp className="clinic-map-section">
        <div className="clinic-map-header">
          <div className="clinic-map-title-box">
            <h3><FaLocationDot style={{ color: '#86efac' }} /> Cureo Personalised Homeopathic Care</h3>
            <p>Naliapool, near Dr Lal path, opposite Honda dealer, Dibrugarh, Assam 786001</p>
          </div>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-directions-map">
            View on Google Maps <FaArrowUpRightFromSquare size={11} />
          </a>
        </div>
        <div className="clinic-map-frame-wrapper">
          <iframe
            src="https://maps.google.com/maps?q=27.483474,94.924416&hl=en&z=17&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Cureo Personalised Homeopathic Care Location Map"
          ></iframe>
        </div>
      </FadeUp>
    </div>
  )
}
