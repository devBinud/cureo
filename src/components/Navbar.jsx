import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { FaPhone, FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube, FaEnvelope, FaXmark, FaGlobe } from 'react-icons/fa6'
import { FiMenu } from 'react-icons/fi'
import logoImg from '../cureo/logo.jpg'
import hoursIcon from '../assets/24_hours.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else if (window.scrollY < 10) {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and add class when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }
    return () => {
      document.body.classList.remove('drawer-open');
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer whenever location/route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const whatsappNumber = "917002974378";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Dr. Niharika Bezboruah, I would like to book a homeopathy consultation.")}`;

  return (
    <header className="cureo-header-wrapper">
      {/* Navy Blue Top Bar (#0b2c6b) */}
      <div className="top-bar-navy">
        <div className="top-bar-container">
          <div className="top-bar-left">
            <a href="tel:+917002974378" className="phone-fullheight-link">
              <img src={hoursIcon} alt="24 Hours Support" className="topbar-24h-icon" />
              <span>+91 70029 74378</span>
            </a>
            <span className="topbar-tagline desktop-only-tagline">Dr. Niharika Bezboruah (BHMS)</span>
            <span className="topbar-tagline desktop-only-tagline">Cureo Clinic</span>
          </div>

          {/* Social Media Links with Full-Height Dashed Separators */}
          <div className="top-bar-right social-links-top">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="topbar-social-item" title="WhatsApp">
              <FaWhatsapp size={15} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="topbar-social-item" title="Instagram">
              <FaInstagram size={15} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="topbar-social-item" title="Facebook">
              <FaFacebookF size={14} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="topbar-social-item" title="YouTube">
              <FaYoutube size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`cureo-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="header-content">
          <Link to="/" className="brand-wrapper">
            <img src={logoImg} alt="Cureo Logo" className="brand-logo" />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="nav-links desktop-nav">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/specialties" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Specialties
              </NavLink>
            </li>
            <li>
              <NavLink to="/philosophy" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Gallery
              </NavLink>
            </li>
          </ul>

          <div className="header-action desktop-action">
            <Link to="/contact" className="btn-appointment-header">
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <FiMenu size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile Right Side Drawer Backdrop Overlay */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Off-Canvas Right Navigation Drawer */}
      <aside className={`mobile-right-drawer ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-brand">
            <img src={logoImg} alt="Cureo Logo" className="drawer-logo" />
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <FaXmark size={22} />
          </button>
        </div>

        <div className="drawer-body">
          <ul className="drawer-nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "drawer-nav-link active" : "drawer-nav-link")} onClick={() => setMobileMenuOpen(false)} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "drawer-nav-link active" : "drawer-nav-link")} onClick={() => setMobileMenuOpen(false)}>
                About Dr. Bezboruah
              </NavLink>
            </li>
            <li>
              <NavLink to="/specialties" className={({ isActive }) => (isActive ? "drawer-nav-link active" : "drawer-nav-link")} onClick={() => setMobileMenuOpen(false)}>
                Clinical Specialties
              </NavLink>
            </li>
            <li>
              <NavLink to="/philosophy" className={({ isActive }) => (isActive ? "drawer-nav-link active" : "drawer-nav-link")} onClick={() => setMobileMenuOpen(false)}>
                FAQ & Philosophy
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" className={({ isActive }) => (isActive ? "drawer-nav-link active" : "drawer-nav-link")} onClick={() => setMobileMenuOpen(false)}>
                Clinic Gallery
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="drawer-footer">
          <Link to="/appointment" className="btn-hero-primary drawer-cta-btn" onClick={() => setMobileMenuOpen(false)}>
            <span>Book Appointment Now</span>
          </Link>
          <a href="tel:+917002974378" className="drawer-phone-btn">
            <FaPhone size={13} />
            <span>Call: +91 70029 74378</span>
          </a>
        </div>
      </aside>
    </header>
  )
}
