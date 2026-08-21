import { Link } from 'react-router-dom'
import { FaCalendarCheck, FaStethoscope, FaArrowRight, FaPhone, FaWhatsapp, FaStar } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { GiSparkles, GiStomach } from 'react-icons/gi'
import heroImg from '../assets/hero-image.png'
import heroImgMobile from '../assets/hero-image-mobile.png'
import doctorImg from '../assets/doctor.jpeg'
import gallery1 from '../cureo/gallery/1.jpg'
import gallery2 from '../cureo/gallery/2.jpg'
import gallery3 from '../cureo/gallery/3.jpg'

export default function HomePage() {
  const whatsappNumber = "917002974378";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Dr. Niharika Bezboruah, I would like to book a homeopathy consultation.")}`;

  return (
    <>
      {/* Full-Width Hero Section */}
      <section className="hero-full-section">
        {/* Mobile Top Image Banner (visible on mobile screens) */}
        <div className="hero-mobile-image-banner">
          <img src={heroImgMobile} alt="Dr. Niharika Bezboruah - Cureo Clinic" className="hero-mobile-img" />
          <div className="hero-mobile-img-overlay"></div>
        </div>

        <div className="hero-full-bg-container" style={{ backgroundImage: `url(${heroImg})` }}>
          <div className="hero-gradient-overlay"></div>

          <div className="hero-content-wrapper">
            <div className="hero-text-block">
              <h1 className="hero-main-title">
                <span className="hero-title-blue">Personalized Healing</span><br />
                <span className="hero-title-green">Your Health Matters</span>
              </h1>

              <p className="hero-banner-desc">
                Advanced homeopathic care, expert doctor consultations, and compassionate constitutional healing - all under one roof for you and your family.
              </p>

              <div className="hero-banner-buttons">
                <Link to="/appointment" className="btn-hero-primary">
                  <FaCalendarCheck size={18} />
                  <span>Book An Appointment</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Column Specialty Action Bar */}
      <section className="quick-action-bar-wrapper">
        <div className="quick-action-bar-container">
          <div className="quick-action-top-banner">
            <span>Nurturing you from within</span>
          </div>
          <Link to="/specialties" className="action-bar-item">
            <div className="action-bar-icon"><FaStethoscope size={24} /></div>
            <span className="action-bar-title">Piles & Anorectal Concerns</span>
          </Link>

          <Link to="/specialties" className="action-bar-item">
            <div className="action-bar-icon"><GiStomach size={25} /></div>
            <span className="action-bar-title">Digestive Issues</span>
          </Link>

          <Link to="/specialties" className="action-bar-item">
            <div className="action-bar-icon"><GiSparkles size={24} /></div>
            <span className="action-bar-title">Skin Concerns</span>
          </Link>
        </div>
      </section>

      {/* About Us & Founder Spotlight Section (HealthCity UI) */}
      <section className="about-spotlight-section">
        <div className="about-spotlight-container">
          <div className="about-grid">
            {/* Left Content Column */}
            <div className="about-left-col">
              <span className="about-tag">ABOUT US</span>
              <h2 className="about-title">Trusted Care.<br />World-Class Expertise.</h2>
              <p className="about-desc">
                At Cureo Homeopathy Clinic, we are committed to providing gentle, high-quality, and personalized homeopathic healthcare. With expert consultation led by Dr. Niharika Bezboruah (BHMS) and individualized constitutional care, we ensure the best long-term wellness for every patient.
              </p>

              <div>
                <Link to="/about" className="btn-hero-primary">
                  <span>Know More About Us</span>
                </Link>
              </div>
            </div>

            {/* Right Doctor Founder Card (Matching HealthCity UI) */}
            <div className="about-right-card">
              <div className="doctor-header-row">
                <img src={doctorImg} alt="Dr. Niharika Bezboruah" className="doctor-avatar-img" />
                <div className="doctor-header-info">
                  <h3 className="doctor-name">Dr. Niharika Bezboruah</h3>
                  <div className="doctor-designation">Founder & Chief Homeopathic Physician (BHMS)</div>
                </div>
              </div>

              <div className="doctor-quote-box">
                <span className="quote-mark">“</span>
                <p className="doctor-quote-text">
                  At Cureo Clinic, we are deeply committed to empowering every patient with individualized, constitutional homeopathic care that restores natural vitality and long-term health. Our mission is to deliver compassionate, root-cause healing tailored to your unique wellness journey...
                </p>
              </div>

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="doctor-view-message">
                <span>View Message</span>
                <FaArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section className="booking-cta-section">
        <div className="booking-cta-container">
          <div className="booking-cta-content">
            <div className="booking-cta-text">
              <span className="booking-tag">Prior Appointment Mandatory</span>
              <h2 className="booking-title">Ready for Personalised Homeopathic Healing?</h2>
              <p className="booking-desc">
                Consult directly with Dr. Niharika Bezboruah (BHMS). We provide gentle, root-cause healing for Skin, Piles, and Digestive concerns — available in-clinic at Dibrugarh and via online tele-consultation worldwide.
              </p>

              <div className="booking-features-list">
                <div className="booking-feature-item">
                  <span className="feature-check">✓</span>
                  <span>In-Clinic & Online Tele-Consultations</span>
                </div>
                <div className="booking-feature-item">
                  <span className="feature-check">✓</span>
                  <span>Individualized Constitutional Case-Taking</span>
                </div>
                <div className="booking-feature-item">
                  <span className="feature-check">✓</span>
                  <span>Direct WhatsApp Booking & Support</span>
                </div>
              </div>
            </div>

            <div className="booking-cta-actions">
              <div className="booking-action-card">
                <h3>Book Your Consultation</h3>
                <p>Select your preferred mode of consultation to confirm your appointment slot.</p>

                <div className="booking-btn-group">
                  <Link to="/appointment" className="btn-booking-primary">
                    <FaCalendarCheck size={18} />
                    <span>Book Online Slot</span>
                  </Link>

                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-booking-whatsapp">
                    <FaWhatsapp size={20} />
                    <span>Book via WhatsApp</span>
                  </a>
                </div>

                <div className="booking-phone-note">
                  <FaPhone size={13} style={{ color: '#0b2c6b' }} />
                  <span>Call Us: <strong>+91 70029 74378</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Testimonials Section (Before Gallery) */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="section-header">
            <div className="google-badge-header">
              <FcGoogle size={22} />
              <span className="google-rating-text">4.9 / 5.0 Rating on Google Reviews</span>
              <div className="stars-row">
                <FaStar style={{ color: '#FFB800' }} size={14} />
                <FaStar style={{ color: '#FFB800' }} size={14} />
                <FaStar style={{ color: '#FFB800' }} size={14} />
                <FaStar style={{ color: '#FFB800' }} size={14} />
                <FaStar style={{ color: '#FFB800' }} size={14} />
              </div>
            </div>
            <h2 className="section-title">Patient Testimonials</h2>
            <p className="section-desc">Real stories and verified experiences from patients treated at Cureo Clinic.</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="card-top-row">
                <div className="google-icon-box">
                  <FcGoogle size={20} />
                  <span className="verified-text">Verified Google Review</span>
                </div>
                <div className="card-stars">
                  <FaStar style={{ color: '#FFB800' }} size={13} />
                  <FaStar style={{ color: '#FFB800' }} size={13} />
                  <FaStar style={{ color: '#FFB800' }} size={13} />
                  <FaStar style={{ color: '#FFB800' }} size={13} />
                  <FaStar style={{ color: '#FFB800' }} size={13} />
                </div>
              </div>

              <blockquote className="testimonial-quote">
                "Dr. Niharika Bezboruah is extremely patient and thorough. My chronic eczema and skin allergies cleared up after 3 months of constitutional homeopathic treatment. Highly recommended in Dibrugarh!"
              </blockquote>

              <div className="testimonial-footer">
                <div className="reviewer-info">
                  <h4 className="reviewer-name">Riniki Phukan</h4>
                  <span className="treatment-tag">Skin Care Patient</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="card-top-row">
                <div className="google-icon-box">
                  <FcGoogle size={20} />
                  <span className="verified-text">Verified Google Review</span>
                </div>
                <div className="card-stars">
                  <FaStar style={{ color: '#FFB800' }} size={13} />
                  <FaStar style={{ color: '#FFB800' }} size={13} />
                  <FaStar style={{ color: '#FFB800' }} size={13} />
                  <FaStar style={{ color: '#FFB800' }} size={13} />
                  <FaStar style={{ color: '#FFB800' }} size={13} />
                </div>
              </div>

              <blockquote className="testimonial-quote">
                "I suffered from severe acidity and chronic digestive distress for over 2 years. Dr. Bezboruah's gentle remedies gave me complete relief without any side effects. Truly compassionate care."
              </blockquote>

              <div className="testimonial-footer">
                <div className="reviewer-info">
                  <h4 className="reviewer-name">Pranjal Sharma</h4>
                  <span className="treatment-tag">Digestive Health Patient</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="card-top-row">
                <div className="google-icon-box">
                  <FcGoogle size={20} />
                  <span className="verified-text">Verified Google Review</span>
                </div>
                <div className="card-stars">
                  <FaStar style={{ color: '#FFB800' }} size={13} />
                  <FaStar style={{ color: '#FFB800' }} size={13} />
                  <FaStar style={{ color: '#FFB800' }} size={13} />
                  <FaStar style={{ color: '#FFB800' }} size={13} />
                  <FaStar style={{ color: '#FFB800' }} size={13} />
                </div>
              </div>

              <blockquote className="testimonial-quote">
                "Remarkable recovery for chronic anorectal discomfort. Dr. Bezboruah took time to understand my entire medical history. The clinic environment is warm and very professional."
              </blockquote>

              <div className="testimonial-footer">
                <div className="reviewer-info">
                  <h4 className="reviewer-name">Mousumi Dutta</h4>
                  <span className="treatment-tag">Piles Care Patient</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="section">
        <div className="section-header">
          <span className="section-tag">Clinic Showcase</span>
          <h2 className="section-title">Gallery</h2>
          <p className="section-desc">A glimpse into Cureo Homeopathy Clinic and patient care environment.</p>
        </div>

        <div className="gallery-grid">
          <div className="gallery-item">
            <img src={gallery1} alt="Cureo Clinic Showcase 1" className="gallery-img" />
          </div>
          <div className="gallery-item">
            <img src={gallery2} alt="Cureo Clinic Showcase 2" className="gallery-img" />
          </div>
          <div className="gallery-item">
            <img src={gallery3} alt="Cureo Clinic Showcase 3" className="gallery-img" />
          </div>
        </div>
      </section>
    </>
  )
}
