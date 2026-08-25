import { Link } from 'react-router-dom'
import { FaUserDoctor, FaGraduationCap, FaLocationDot, FaCalendarCheck, FaGlobe } from 'react-icons/fa6'
import logoImg from '../cureo/logo.jpg'
import coverImg from '../cureo/cover.jpg'
import { FadeUp, FadeHorizontal } from '../components/Animated'

export default function AboutPage() {
  return (
    <div className="section" style={{ marginTop: '2.5rem' }}>
      <FadeUp className="section-header">
        <h2 className="section-title">About Cureo</h2>
      </FadeUp>

      <div className="hero-grid" style={{ marginBottom: '3rem' }}>
        <FadeHorizontal direction="left" className="hero-text-content">
          <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}>
            Personalized Homeopathic Healthcare
          </h2>
          <p className="hero-subtitle">
            Dr. Niharika Bezboruah is a qualified Homeopathic physician practicing in Dibrugarh, Assam. She specializes in individualized case-taking and constitutional treatment for chronic and recurring ailments.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FaGraduationCap size={20} style={{ color: 'var(--primary)' }} />
              <span><strong>Degree:</strong> Bachelor of Homoeopathic Medicine and Surgery (BHMS)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FaLocationDot size={20} style={{ color: 'var(--primary)' }} />
              <span><strong>Clinic Location:</strong> Dibrugarh, Assam, India - 786001</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FaGlobe size={20} style={{ color: 'var(--primary)' }} />
              <span><strong>Consultation Modes:</strong> In-Clinic (Dibrugarh) & Worldwide Tele-Consultation</span>
            </div>
          </div>
        </FadeHorizontal>

        <FadeHorizontal direction="right" className="hero-image-wrapper">
          <img src={coverImg} alt="Dr. Niharika Bezboruah Clinic Cover" className="hero-cover-img" />
        </FadeHorizontal>
      </div>
    </div>
  )
}
