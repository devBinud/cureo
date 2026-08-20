import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { FaPhone, FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube, FaEnvelope, FaBars, FaXmark } from 'react-icons/fa6'
import logoImg from '../cureo/logo.jpg'

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const whatsappNumber = "917002974378";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Dr. Niharika Bezboruah, I would like to book a homeopathy consultation.")}`;

  return (
    <header className="cureo-header-wrapper">
      {/* Navy Blue Top Bar (#0b2c6b) */}
      <div className="top-bar-navy">
        <div className="top-bar-container">
          <div className="top-bar-left">
            <a href="tel:+917002974378" className="phone-fullheight-link">
              <FaPhone size={13} />
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
            <a href="mailto:contact@cureo.in" className="topbar-social-item" title="Email Us">
              <FaEnvelope size={14} />
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
              <FaPhone size={14} />
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            className="mobile-hamburger-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FaXmark size={24} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer Menu */}
        {mobileMenuOpen && (
          <div className="mobile-drawer-menu">
            <ul className="mobile-nav-links">
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")} end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/specialties" className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}>
                  Specialties
                </NavLink>
              </li>
              <li>
                <NavLink to="/philosophy" className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}>
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink to="/gallery" className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}>
                  Gallery
                </NavLink>
              </li>
            </ul>

            <div className="mobile-drawer-action">
              <Link to="/appointment" className="btn-hero-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Book Appointment Now</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
