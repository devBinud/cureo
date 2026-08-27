import { Link } from 'react-router-dom'
import { FaCalendarCheck, FaStethoscope, FaArrowRight, FaChevronRight, FaPhone, FaWhatsapp, FaStar, FaGlobe, FaCircleInfo, FaLocationDot, FaRoute, FaArrowUpRightFromSquare, FaShieldHalved, FaUserGroup, FaClock, FaLeaf, FaUserDoctor } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { GiSparkles, GiStomach } from 'react-icons/gi'
import heroImg from '../assets/hero-image.png'
import doctorImg from '../assets/doctor.jpeg'
import coverImg from '../cureo/cover.jpg'
import gallery1 from '../cureo/gallery/1.jpg'
import gallery2 from '../cureo/gallery/2.jpg'
import gallery3 from '../cureo/gallery/3.jpg'
import holisticDietImg from '../assets/holistic/dietplan.png'
import holisticConsultationImg from '../assets/cureosupport/support.png'
import holisticKitImg from '../assets/holistic/personalized_kit.png'
import cureoSupport1 from '../assets/cureosupport/dietplan.png'
import cureoSupport2 from '../assets/cureosupport/habit.png'
import cureoSupport3 from '../assets/cureosupport/support.png'
import ctaImg from '../assets/cta.png'
import step1Img from '../assets/steps/screening.png'
import step2Img from '../assets/steps/consultation.png'
import step3Img from '../assets/steps/support.png'
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
          <img src={coverImg} alt="Dr. Niharika Bezboruah - Cureo Personalised Homoeopathic Kit" className="hero-mobile-img" />
          <div className="hero-mobile-img-overlay"></div>
        </div>

        <div className="hero-full-bg-container" style={{ backgroundImage: `url(${heroImg})` }}>
          <div className="hero-gradient-overlay"></div>

          <div className="hero-content-wrapper">
            <div className="hero-grid-layout">
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

              {/* Right Side Cover Banner Image (src/cureo/cover.jpg) */}
              <FadeHorizontal direction="right" className="hero-right-card-wrapper">
                <div className="hero-cover-card">
                  <img src={coverImg} alt="Dr. Niharika Bezboruah - Cureo Personalised Homoeopathic Kit" className="hero-cover-img" />
                </div>
              </FadeHorizontal>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Column Specialty Action Bar */}
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

          <StaggerItem style={{ flex: 1 }}>
            <Link to="/specialties" className="action-bar-item">
              <div className="action-bar-icon"><FaUserDoctor size={24} /></div>
              <span className="action-bar-title">Follow up Support</span>
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
                  At Cureo Clinic, we are deeply committed to empowering every patient with individualized, constitutional homeopathic care that restores natural vitality and long-term health. Our mission is to deliver compassionate, root-cause healing tailored to your unique wellness journey.
                </p>
              </div>
            </FadeHorizontal>
          </div>
        </div>
      </section>

      {/* Holistic Approach Section */}
      <section className="holistic-approach-section">
        <div className="holistic-container">
          <FadeUp className="holistic-header">
            <span className="holistic-tag">Natural Wellness Approach</span>
            <h2 className="holistic-title">Personalised Healing Requires More Than Just Remedies</h2>
          </FadeUp>

          <StaggerContainer className="holistic-grid">
            {/* Card 1: Personalised Kit */}
            <StaggerItem className="holistic-card">
              <div className="holistic-card-content">
                <h3 className="holistic-card-title">Personalised Kit</h3>
                <p className="holistic-card-desc">
                  Supports natural healing from inside & out, tailored to your constitutional remedy needs.
                </p>
              </div>
              <div className="holistic-card-img-wrapper">
                <img src={holisticKitImg} alt="Personalised Kit - Cureo Homeopathy" className="holistic-card-img img-kit" />
              </div>
            </StaggerItem>

            {/* Card 2: Diet & Lifestyle Plan */}
            <StaggerItem className="holistic-card">
              <div className="holistic-card-content">
                <h3 className="holistic-card-title">Diet Plan</h3>
                <p className="holistic-card-desc">
                  A customized diet & wellness routine designed to complement homeopathic remedies.
                </p>
              </div>
              <div className="holistic-card-img-wrapper">
                <img src={holisticDietImg} alt="Diet & Lifestyle Plan - Cureo Homeopathy" className="holistic-card-img img-diet" />
              </div>
            </StaggerItem>

            {/* Card 3: Expert Consultation */}
            <StaggerItem className="holistic-card">
              <div className="holistic-card-content">
                <h3 className="holistic-card-title">Expert Consultation</h3>
                <p className="holistic-card-desc">
                  Personalised 1-on-1 guidance from Dr. Niharika Bezboruah (BHMS) at every step.
                </p>
              </div>
              <div className="holistic-card-img-wrapper">
                <img src={holisticConsultationImg} alt="Expert Consultation - Cureo Homeopathy" className="holistic-card-img img-consultation" />
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section className="booking-cta-section">
        <div className="booking-cta-container">
          <FadeUp className="booking-cta-content">
            <div className="booking-cta-text">
              <h2 className="booking-title">Ready for Personalised Homeopathic Healing?</h2>
              <p className="booking-desc">
                We provide gentle, root-cause healing for Skin, Piles, and Digestive concerns - available in-clinic at Dibrugarh and via online tele-consultation worldwide.
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
                    <span>Book an Appointment</span>
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

      {/* 3-Step Treatment Process Section */}
      <section className="treatment-steps-section">
        <div className="treatment-steps-container">
          <FadeUp className="treatment-steps-header">
            <span className="treatment-steps-tag">3-Step Guided Care</span>
            <h2 className="treatment-steps-title">Your Path to Recovery in 3 Easy Steps</h2>
          </FadeUp>

          <StaggerContainer className="treatment-steps-grid">
            {/* Step 1: Screening Test */}
            <StaggerItem className="treatment-step-card">
              <div className="treatment-step-card-content">
                <span className="step-number-tag">STEP 1</span>
                <h3 className="treatment-step-card-title">Screening Test</h3>
                <p className="treatment-step-card-desc">
                  Comprehensive initial case analysis & screening test to evaluate your constitutional profile.
                </p>
              </div>
              <div className="treatment-step-card-img-wrapper">
                <img src={step1Img} alt="Screening Test - Cureo Homeopathy" className="treatment-step-card-img" />
              </div>
            </StaggerItem>

            {/* Step 2: 30-Minute Consultation */}
            <StaggerItem className="treatment-step-card">
              <div className="treatment-step-card-content">
                <span className="step-number-tag">STEP 2</span>
                <h3 className="treatment-step-card-title">30-Min Consultation</h3>
                <p className="treatment-step-card-desc">
                  In-depth 30-minute 1-on-1 consultation with Dr. Niharika Bezboruah (BHMS) in-clinic or online.
                </p>
              </div>
              <div className="treatment-step-card-img-wrapper">
                <img src={step2Img} alt="30-Minute Consultation - Cureo Homeopathy" className="treatment-step-card-img" />
              </div>
            </StaggerItem>

            {/* Step 3: Follow-Up Support */}
            <StaggerItem className="treatment-step-card">
              <div className="treatment-step-card-content">
                <span className="step-number-tag">STEP 3</span>
                <h3 className="treatment-step-card-title">Follow-Up Support</h3>
                <p className="treatment-step-card-desc">
                  Dedicated progress tracking & support at 7 days and 15 days for continuous recovery.
                </p>
              </div>
              <div className="treatment-step-card-img-wrapper">
                <img src={step3Img} alt="Follow-Up Support 7 & 15 Days - Cureo Homeopathy" className="treatment-step-card-img" />
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Google Reviews Testimonials Section */}
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

      {/* 500+ Patients Stats Banner (Matching Traya Pill Badge Design) */}
      <section className="stats-impact-section">
        <div className="stats-impact-container">
          <FadeUp className="stats-impact-content">
            <span className="stats-impact-tag">CLINICAL IMPACT</span>
            <h2 className="stats-impact-title">500+ Patients Treated in 8 Months</h2>

            <div className="stats-pills-row">
              <div className="traya-pill-badge">
                <FaUserGroup size={14} className="traya-pill-icon" />
                <span>500+ Satisfied Patients</span>
              </div>
              <div className="traya-pill-badge">
                <FaStethoscope size={14} className="traya-pill-icon" />
                <span>Skin, Piles & Digestive Care</span>
              </div>
              <div className="traya-pill-badge">
                <FaClock size={14} className="traya-pill-icon" />
                <span>Tracked for 8+ Months</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Cureo Complete 360° Support Section (In Between Clinical Impact & Our Healing Formula) */}
      <section className="cureo-support-section">
        <div className="cureo-support-container">
          <FadeUp className="cureo-support-header">
            <h2 className="cureo-support-title">Holistic Support Beyond Just Medication</h2>
          </FadeUp>

          <StaggerContainer className="cureo-support-grid">
            {/* Card 1: Diet & Nutrition */}
            <StaggerItem className="cureo-support-card">
              <div className="cureo-support-card-content">
                <h3 className="cureo-support-card-title">Diet & Custom Nutrition</h3>
                <p className="cureo-support-card-desc">
                  Personalized nutritional guidance & customized meal plans designed to complement homeopathic remedies for faster recovery.
                </p>
              </div>
              <div className="cureo-support-img-wrapper">
                <img src={cureoSupport1} alt="Diet & Custom Nutrition" className="cureo-support-card-img" />
              </div>
            </StaggerItem>

            {/* Card 2: Habit & Lifestyle Building */}
            <StaggerItem className="cureo-support-card">
              <div className="cureo-support-card-content">
                <h3 className="cureo-support-card-title">Habit & Lifestyle Building</h3>
                <p className="cureo-support-card-desc">
                  Guided daily health routines and lifestyle habit coaching to eliminate root-cause triggers and prevent disease recurrence.
                </p>
              </div>
              <div className="cureo-support-img-wrapper">
                <img src={cureoSupport2} alt="Habit & Lifestyle Building" className="cureo-support-card-img" />
              </div>
            </StaggerItem>

            {/* Card 3: Continuous Doctor Support */}
            <StaggerItem className="cureo-support-card">
              <div className="cureo-support-card-content">
                <h3 className="cureo-support-card-title">Continuous Doctor Support</h3>
                <p className="cureo-support-card-desc">
                  Dedicated 1-on-1 progress tracking and direct physician support with Dr. Niharika Bezboruah (BHMS) throughout your care.
                </p>
              </div>
              <div className="cureo-support-img-wrapper">
                <img src={cureoSupport3} alt="Continuous Doctor Support" className="cureo-support-card-img" />
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Have Questions? Traya-Style WhatsApp Card (After Holistic Support Section) */}
      <section className="cureo-cta-banner-section">
        <div className="cureo-cta-banner-container">
          <FadeUp className="traya-questions-card">
            <div className="traya-questions-text">
              <h2 className="traya-questions-title">Have questions?</h2>
              <p className="traya-questions-sub">
                Get personalised guidance and take the first step towards better health
              </p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="traya-chat-btn">
                <FaWhatsapp size={18} />
                <span>Chat with us</span>
              </a>
            </div>

            <div className="traya-questions-image-wrapper">
              <img src={ctaImg} alt="Dr. Niharika Bezboruah - Cureo Homeopathy" className="traya-questions-img" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 3-Pillars Healing Formula Banner (Before Gallery - Matching Screenshot 2) */}
      <section className="pillars-formula-section">
        <div className="pillars-formula-container">
          <FadeUp className="pillars-formula-content">
            <span className="pillars-formula-tag">OUR HEALING FORMULA</span>
            <h2 className="pillars-formula-title">
              Homeopathy <span className="pillars-formula-plus">+</span> Root-Cause Analysis <span className="pillars-formula-plus">+</span> Personalised Care
            </h2>
          </FadeUp>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="gallery-section">
        <div className="gallery-container">
          <FadeUp className="section-header">
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
        </div>
      </section>

      {/* Embedded Google Maps Section */}
      <section className="section" style={{ paddingTop: '1rem', marginBottom: '3.5rem' }}>
        <FadeUp className="section-header">
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
              Get Directions on Google Maps <FaArrowUpRightFromSquare size={11} />
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

      {/* Disclaimers Section (After Clinic Location - Matching Traya Layout) */}
      <section className="disclaimer-section">
        <div className="disclaimer-container">
          <FadeUp>
            <h2 className="disclaimer-title">Disclaimers</h2>
            <p className="disclaimer-intro-text">
              All consultations, treatment plans, and homeopathic medicine kits provided by Cureo Personalised Homeopathic Care are conducted under expert medical observation and individualized constitutional guidelines.
            </p>

            <div className="disclaimer-content-block">
              <div className="disclaimer-item">
                <h4 className="disclaimer-item-title">Individualized Case-Based Remedies</h4>
                <p className="disclaimer-item-desc">
                  In classical homeopathy, every remedy is uniquely selected based on detailed individual case-taking, physical traits, health history, and root-cause symptoms. Medicines prescribed for one patient differ completely from another, even for identical clinical diagnoses or symptoms.
                </p>
              </div>

              <div className="disclaimer-item">
                <h4 className="disclaimer-item-title">Non-Transferable Prescriptions</h4>
                <p className="disclaimer-item-desc">
                  Homeopathic remedies and potency dosages prescribed to a specific individual are tailored strictly to their current constitutional profile. They should never be shared, reused, or recommended to family members or friends experiencing similar issues without formal medical evaluation.
                </p>
              </div>

              <div className="disclaimer-item">
                <h4 className="disclaimer-item-title">Personalised Doorstep Medicine Delivery</h4>
                <p className="disclaimer-item-desc">
                  Online consultations are available from the comfort of your home. After thorough evaluation, prescribed homeopathic medicines and custom remedy kits can be delivered directly to your doorstep by courier.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
