import { Link } from 'react-router-dom'
import { FaWhatsapp, FaLocationDot } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="cureo-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Cureo Homeopathy Clinic</h3>
          <p>Dr. Niharika Bezboruah (BHMS)</p>
          <p style={{ fontSize: '0.85rem', color: '#BDB9A2' }}>
            Dedicated to root-cause healing and individualized homeopathic consultation.
          </p>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          <ul style={{ padding: 0, margin: 0 }}>
            <li><Link to="/" style={{ color: '#DDE1DD' }}>Home</Link></li>
            <li><Link to="/about" style={{ color: '#DDE1DD' }}>About Cureo</Link></li>
            <li><Link to="/specialties" style={{ color: '#DDE1DD' }}>Clinical Specialties</Link></li>
            <li><Link to="/appointment" style={{ color: '#DDE1DD' }}>Online Appointment</Link></li>
            <li><Link to="/gallery" style={{ color: '#DDE1DD' }}>Clinic Gallery</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Location & Contact</h4>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FaLocationDot style={{ color: 'var(--accent-light)' }} /> Dibrugarh, Assam
          </p>
          <p>India - 786001</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.75rem' }}>
            <FaWhatsapp style={{ color: '#25D366' }} /> WhatsApp Booking:
          </p>
          <p style={{ fontWeight: 'bold', color: 'var(--accent-light)', fontSize: '1.05rem', marginTop: '0.2rem' }}>+91 70029 74378</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Direct calls without prior booking will not be attended.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Cureo, All Rights Reserved <span className="footer-sep">|</span> Developed by <a href="https://www.binudsoftwaresolutions.in/" target="_blank" rel="noopener noreferrer" className="dev-credit-link">Binud Software Solutions</a>
        </p>
      </div>
    </footer>
  )
}
