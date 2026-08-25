import { Link } from 'react-router-dom'
import { FaCalendarCheck, FaStethoscope, FaArrowRight, FaChevronRight, FaPhone, FaWhatsapp, FaStar, FaGlobe, FaCircleInfo, FaLocationDot, FaRoute, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { GiSparkles, GiStomach } from 'react-icons/gi'
import heroImg from '../assets/hero-image.png'
import heroImgMobile from '../assets/hero-image-mobile.png'
import doctorImg from '../assets/doctor.jpeg'
import gallery1 from '../cureo/gallery/1.jpg'
import gallery2 from '../cureo/gallery/2.jpg'
import gallery3 from '../cureo/gallery/3.jpg'
import { FadeUp, FadeHorizontal, StaggerContainer, StaggerItem } from '../components/Animated'

export default function HomePage() {
  const whatsappNumber = "917002974378";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Dr. Niharika Bezboruah, I would like to book a homeopathy consultation.")}`;
  const googleMapsUrl = "https://www.google.com/maps/place/Cureo+Personalised+Homeopathic+Care/@27.4839343,94.9237945,17z";

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
            <FadeUp className="hero-text-block">
              <h1 className="hero-main-title">
                <span className="hero-title-blue">Personalized Healing</span><br />
                <span className="hero-title-green">Your Health Matters</span>
              </h1>

              <p className="hero-banner-desc">
                Advanced homeopathic care, expert doctor consultations, and compassionate constitutional healing - available in-clinic and worldwide online.
              </p>

              <div className="hero-banner-buttons">
                <Link to="/appointment" className="btn-hero-primary">
                  <span>Book An Appointment</span>
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 3-Column Specialty Action Bar */}
      <section className="quick-action-bar-wrapper">
        <StaggerContainer className="quick-action-bar-container">
          <div className="quick-action-top-banner">
            <span>Nurturing you from within</span>
          </div>
          <StaggerItem style={{ flex: 1 }}>
            <Link to="/specialties" className="action-bar-item">
              <div className="action-bar-icon"><FaStethoscope size={24} /></div>
              <span className="action-bar-title">Piles & Anorectal Concerns</span>
            </Link>
          </StaggerItem>

          <StaggerItem style={{ flex: 1 }}>
            <Link to="/specialties" className="action-bar-item">
              <div className="action-bar-icon"><GiStomach size={25} /></div>
              <span className="action-bar-title">Digestive Issues</span>
            </Link>
          </StaggerItem>

          <StaggerItem style={{ flex: 1 }}>
            <Link to="/specialties" className="action-bar-item">
              <div className="action-bar-icon"><GiSparkles size={24} /></div>
              <span className="action-bar-title">Skin Concerns</span>
            </Link>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* About Us & Founder Spotlight Section (HealthCity UI) */}
      <section className="about-spotlight-section">
        <div className="about-spotlight-container">
          <div className="about-grid">
            {/* Left Content Column */}
            <FadeHorizontal direction="left" className="about-left-col">
              <span className="about-tag">ABOUT US</span>
              <h2 className="about-title">Trusted Care.<br />World-Class Expertise.</h2>
              <p className="about-desc">
                At Cureo Homeopathy Clinic, we are committed to providing gentle, high-quality, and personalized homeopathic healthcare. With expert consultation led by Dr. Niharika Bezboruah (BHMS) and individualized constitutional care, we ensure the best long-term wellness for every patient globally and locally
              </p>

              <div style={{ margin: '1rem 0 1.5rem', padding: '0.75rem 1rem', background: '#fffbeb', borderRadius: '10px', fontSize: '0.835rem', color: '#78350f', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>
                  Online consultations are available from the comfort of your home. After the consultation, medicine and remedy kits can be delivered to your doorstep by courier
                </span>
              </div>

              <div>
                <Link to="/about" className="btn-hero-primary">
                  <span>Know More About Us</span>
                </Link>
              </div>
            </FadeHorizontal>

            {/* Right Doctor Founder Card (Matching HealthCity UI) */}
            <FadeHorizontal direction="right" className="about-right-card">
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
            </FadeHorizontal>
          </div>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section className="booking-cta-section">
        <div className="booking-cta-container">
          <FadeUp className="booking-cta-content">
            <div className="booking-cta-text">
              <span className="booking-tag">Prior Appointment Mandatory</span>
              <h2 className="booking-title">Ready for Personalised Homeopathic Healing?</h2>
              <p className="booking-desc">
                Consult directly with Dr. Niharika Bezboruah (BHMS). We provide gentle, root-cause healing for Skin, Piles, and Digestive concerns - available in-clinic at Dibrugarh and via online tele-consultation worldwide.
              </p>

              <div className="booking-features-list">
                <div className="booking-feature-item">
                  <span className="feature-check">✓</span>
                  <span>In-Clinic & Global Online Tele-Consultations</span>
                </div>
                <div className="booking-feature-item">
                  <span className="feature-check">✓</span>
                  <span>Individualized Constitutional Case-Taking</span>
                </div>
                <div className="booking-feature-item">
                  <span className="feature-check">✓</span>
                  <span>Direct WhatsApp Booking & Prescriptions</span>
                </div>
              </div>

              <div style={{ marginTop: '1.25rem', padding: '0.75rem 1rem', background: '#fffbeb', borderRadius: '10px', fontSize: '0.835rem', color: '#78350f', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>
                  Online consultations are available from the comfort of your home. After the consultation, medicine and remedy kits can be delivered to your doorstep by courier
                </span>
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
          </FadeUp>
        </div>
      </section>

      {/* Google Reviews Testimonials Section (Before Gallery) */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <FadeUp className="section-header">
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
          </FadeUp>

          <StaggerContainer className="testimonials-grid">
            <StaggerItem className="testimonial-card">
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
            </StaggerItem>

            <StaggerItem className="testimonial-card">
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
            </StaggerItem>

            <StaggerItem className="testimonial-card">
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
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="section">
        <FadeUp className="section-header">
          <span className="section-tag">Clinic Showcase</span>
          <h2 className="section-title">Gallery</h2>
          <p className="section-desc">A glimpse into Cureo Homeopathy Clinic and patient care environment.</p>
        </FadeUp>

        <StaggerContainer className="gallery-grid">
          <StaggerItem className="gallery-item">
            <img src={gallery1} alt="Cureo Clinic Showcase 1" className="gallery-img" />
          </StaggerItem>
          <StaggerItem className="gallery-item">
            <img src={gallery2} alt="Cureo Clinic Showcase 2" className="gallery-img" />
          </StaggerItem>
          <StaggerItem className="gallery-item">
            <img src={gallery3} alt="Cureo Clinic Showcase 3" className="gallery-img" />
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Embedded Google Maps Section */}
      <section className="section" style={{ paddingTop: '1rem', marginBottom: '3rem' }}>
        <FadeUp className="section-header">
          <span className="section-tag">Find Us</span>
          <h2 className="section-title">Clinic Location</h2>
          <p className="section-desc">Visit Cureo Personalised Homeopathic Care in Dibrugarh, Assam.</p>
        </FadeUp>

        <FadeUp className="clinic-map-section">
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
        </FadeUp>
      </section>
    </>
  )
}
