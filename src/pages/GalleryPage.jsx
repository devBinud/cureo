import gallery1 from '../cureo/gallery/1.jpg'
import gallery2 from '../cureo/gallery/2.jpg'
import gallery3 from '../cureo/gallery/3.jpg'
import { FadeUp, StaggerContainer, StaggerItem } from '../components/Animated'

export default function GalleryPage() {
  return (
    <div className="section" style={{ marginTop: '2.5rem' }}>
      <FadeUp className="section-header">
        <span className="section-tag">Clinic Environment</span>
        <h2 className="section-title">Gallery & Atmosphere</h2>
        <p className="section-desc">A glimpse into Cureo Homeopathy Clinic and patient care facility in Dibrugarh.</p>
      </FadeUp>

      <StaggerContainer className="gallery-grid" style={{ marginBottom: '3rem' }}>
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
  )
}
