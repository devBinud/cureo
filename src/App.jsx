import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWidgets from './components/FloatingWidgets'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import SpecialtiesPage from './pages/SpecialtiesPage'
import PhilosophyPage from './pages/PhilosophyPage'
import AppointmentPage from './pages/AppointmentPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import AdminDashboard from './admin/AdminDashboard'
import AdminLogin from './admin/AdminLogin'
import './App.css'

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </>
    );
  }

  return (
    <div className="cureo-container">
      <ScrollToTop />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/specialties" element={<SpecialtiesPage />} />
          <Route path="/faqs" element={<PhilosophyPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  )
}

export default App
