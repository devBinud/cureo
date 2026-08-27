import { Link } from 'react-router-dom'
import { FaWhatsapp, FaLocationDot, FaInstagram, FaFacebookF } from 'react-icons/fa6'

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

          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Connect:</span>
            <a
              href="https://www.instagram.com/cureohomeopathy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', transition: 'background 0.3s ease' }}
              title="Instagram"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://www.facebook.com/healthwithdrniharika"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', transition: 'background 0.3s ease' }}
              title="Facebook"
            >
              <FaFacebookF size={15} />
            </a>
            <a
              href="https://wa.me/917002974378"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25D366', transition: 'background 0.3s ease' }}
              title="WhatsApp"
            >
              <FaWhatsapp size={16} />
            </a>
          </div>
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
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '1rem' }}>
            <FaLocationDot style={{ color: '#86efac', flexShrink: 0, marginTop: '4px' }} size={16} />
            <div style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#e0f4f8' }}>
              <strong style={{ color: '#ffffff', display: 'block', marginBottom: '4px', fontSize: '0.95rem' }}>
                Cureo Personalised Homeopathic Care
              </strong>
              <p style={{ margin: 0, color: '#d1d5db', lineHeight: '1.5' }}>
                Lab collection centre, near Dr Lal path,<br />
                opposite Honda dealer, Naliapool,<br />
                Dibrugarh, Assam 786001
              </p>
              <div style={{ marginTop: '0.4rem' }}>
                <a
                  href="https://www.google.com/maps/place/Cureo+Personalised+Homeopathic+Care/@27.4839343,94.9237945,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#86efac', fontSize: '0.8rem', textDecoration: 'underline', fontWeight: 600 }}
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px dashed rgba(255, 255, 255, 0.15)', paddingTop: '0.85rem' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
              <FaWhatsapp style={{ color: '#25D366' }} /> WhatsApp Booking:
            </p>
            <p style={{ fontWeight: 'bold', color: '#86efac', fontSize: '1.05rem', marginTop: '0.2rem', marginBottom: '0.2rem' }}>+91 70029 74378</p>
            <p style={{ fontSize: '0.78rem', color: '#a0aec0', margin: 0 }}>
              Direct calls without prior booking will not be attended.
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-bottom-text">
          <span>© {new Date().getFullYear()} Cureo, All Rights Reserved</span>
          <span className="footer-sep">|</span>
          <span className="footer-dev-credit">
            Developed by <a href="https://www.binudsoftwaresolutions.in/" target="_blank" rel="noopener noreferrer" className="dev-credit-link">Binud Software Solutions</a>
          </span>
        </p>
      </div>
    </footer>
  )
}
