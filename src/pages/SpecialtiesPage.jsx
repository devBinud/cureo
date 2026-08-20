import { Link } from 'react-router-dom'
import { GiSparkles, GiStomach } from 'react-icons/gi'
import { FaStethoscope, FaCalendarCheck } from 'react-icons/fa6'

export default function SpecialtiesPage() {
  return (
    <div className="section" style={{ marginTop: '2.5rem' }}>
      <div className="section-header">
        <span className="section-tag">Clinical Focus</span>
        <h2 className="section-title">Specialized Homeopathic Care</h2>
        <p className="section-desc">Targeted, gentle, and constitutional care for chronic recurring concerns.</p>
      </div>

      <div className="specialty-grid" style={{ marginBottom: '3rem' }}>
        <div className="specialty-card">
          <div className="specialty-icon-box">
            <GiSparkles />
          </div>
          <h3>Skin Concerns</h3>
          <p style={{ marginBottom: '1rem' }}>
            Comprehensive treatment for persistent dermatological problems including chronic eczema, psoriasis, recurrent allergic rashes, urticaria, and acne. Homeopathy addresses internal systemic imbalances to clear skin naturally.
          </p>
          <Link to="/appointment" className="btn-hero-primary" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
            <FaCalendarCheck /> <span>Book Appointment Now</span>
          </Link>
        </div>

        <div className="specialty-card">
          <div className="specialty-icon-box">
            <FaStethoscope />
          </div>
          <h3>Piles & Anorectal Care</h3>
          <p style={{ marginBottom: '1.25rem' }}>
            Non-surgical homeopathic management for internal/external piles, anal fissures, chronic constipation, bleeding, and rectal discomfort. Safe, gentle remedies aimed at root-cause bowel regulation.
          </p>
          <Link to="/appointment" className="btn-hero-primary" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
            <FaCalendarCheck /> <span>Book Appointment Now</span>
          </Link>
        </div>

        <div className="specialty-card">
          <div className="specialty-icon-box">
            <GiStomach />
          </div>
          <h3>Digestive & Bowel Health</h3>
          <p style={{ marginBottom: '1.25rem' }}>
            Holistic care for chronic indigestion, hyperacidity, IBS, bloating, and lifestyle-induced digestive issues. Focuses on restoring natural digestive rhythm and gut flora balance.
          </p>
          <Link to="/appointment" className="btn-hero-primary" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
            <FaCalendarCheck /> <span>Book Appointment Now</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
