import React, { useState, useEffect, useRef } from "react";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRuler,
  FaUsers,
  FaClock,
  FaAward,
  FaExpand,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaShare,
  FaHeart,
  FaEye,
  FaLayerGroup,
  FaCertificate,
  FaTools,
  FaLeaf,
} from "react-icons/fa";
import useReveal from "../hooks/useReveal";
// import PanoramaViewer from "../components/PanoramaViewer";
import "../styles/GalleryDetails.css";

// Simple inline PanoramaViewer component to avoid import issues
const PanoramaViewer = ({ src, autoRotate = true }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rotation, setRotation] = useState({ yaw: 0, pitch: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      setIsLoading(false);
      setError(null);
    };
    image.onerror = () => {
      setIsLoading(false);
      setError('Failed to load 360° image');
    };
    image.src = src;
    imageRef.current = image;
  }, [src]);

  // Auto rotation
  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const interval = setInterval(() => {
      setRotation(prev => ({ ...prev, yaw: prev.yaw + 0.3 }));
    }, 50);
    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;
    setRotation(prev => ({
      yaw: prev.yaw - deltaX * 0.5,
      pitch: Math.max(-90, Math.min(90, prev.pitch - deltaY * 0.5))
    }));
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (error) {
    return (
      <div className="panorama-error">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h3>Unable to load 360° view</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="panorama-viewer" ref={containerRef}>
      {isLoading && (
        <div className="panorama-loading">
          <div className="loading-spinner"></div>
          <p>Loading 360° view...</p>
        </div>
      )}
      
      {!isLoading && imageRef.current && (
        <div 
          className="panorama-display"
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: `${-rotation.yaw * 2}px ${rotation.pitch * 2}px`,
            backgroundRepeat: 'repeat-x',
            cursor: isDragging ? 'grabbing' : 'grab',
            transition: isDragging ? 'none' : 'background-position 0.1s ease-out'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      )}
      
      {!isLoading && (
        <div className="panorama-controls">
          <div className="control-hint">
            <span>🖱️ Drag to look around</span>
          </div>
          <div className="rotation-info">
            <small>Yaw: {Math.round(rotation.yaw)}° | Pitch: {Math.round(rotation.pitch)}°</small>
          </div>
        </div>
      )}
    </div>
  );
};

// Mock project data – replace with API data as needed
const PROJECT_DATA = {
  id: 1,
  name: "Commercial Tower",
  category: "Commercial",
  description:
    "A stunning 40-story commercial tower featuring cutting-edge aluminum composite panel technology. This architectural masterpiece combines sustainability with modern aesthetics, creating an iconic addition to Singapore's skyline.",
  location: "Downtown Singapore",
  year: "2024",
  client: "SkyLine Developments Pte Ltd",
  architect: "Foster + Partners Singapore",
  contractor: "Woh Hup Construction",
  area: "125,000 sq ft",
  duration: "24 months",
  status: "Completed",
  heroImage:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
  ],
  // 360° panoramas - Updated with sample equirectangular images
  panoramas: [
    {
      id: "p1",
      title: "Building Exterior 360°",
      src: "https://pannellum.org/images/alma.jpg", // Sample equirectangular panorama
    },
    {
      id: "p2", 
      title: "Lobby Interior 360°",
      src: "https://pannellum.org/images/cerro-toco-0.jpg", // Another sample panorama
    },
  ],
  features: [
    {
      icon: FaLeaf,
      title: "Eco-Friendly Materials",
      description:
        "100% recyclable aluminum composite panels with low environmental impact",
    },
    {
      icon: FaCertificate,
      title: "Fire Resistant",
      description:
        "A2-s1,d0 fire classification meeting international safety standards",
    },
    {
      icon: FaTools,
      title: "Weather Resistant",
      description:
        "Superior durability against harsh weather conditions and UV radiation",
    },
    {
      icon: FaAward,
      title: "Award Winning",
      description: "Recipient of Singapore Green Building Award 2024",
    },
  ],
  specifications: [
    { label: "Panel Type", value: "Aluminum Composite Panel" },
    { label: "Core Material", value: "Fire Retardant Polyethylene" },
    { label: "Aluminum Thickness", value: "0.5mm Front / 0.3mm Back" },
    { label: "Total Thickness", value: "4mm Standard" },
    { label: "Panel Size", value: "1220mm x 2440mm" },
    { label: "Color System", value: "PVDF Coating" },
    { label: "Warranty", value: "15 Years Structural" },
    { label: "Certification", value: "ISO 9001, CE Marking" },
  ],
  relatedProjects: [
    {
      id: 2,
      name: "Residential Complex",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Airport Terminal",
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Retail Mall",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    },
  ],
};

export default function GalleryDetails() {
  useReveal();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [imageLoaded, setImageLoaded] = useState(false);

  // 360 viewer modal state
  const [isPanoOpen, setIsPanoOpen] = useState(false);
  const [currentPanoIndex, setCurrentPanoIndex] = useState(0);

  const project = PROJECT_DATA;

  useEffect(() => {
    // Preload standard images
    project.gallery.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [project.gallery]);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.gallery.length - 1 : prev - 1
    );
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const openPanorama = (index = 0) => {
    setCurrentPanoIndex(index);
    setIsPanoOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closePanorama = () => {
    setIsPanoOpen(false);
    document.body.style.overflow = "unset";
  };

  // Keyboard navigation for both lightboxes
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isLightboxOpen && !isPanoOpen) return;

      if (e.key === "Escape") {
        if (isLightboxOpen) closeLightbox();
        if (isPanoOpen) closePanorama();
      }
      if (e.key === "ArrowLeft") {
        if (isLightboxOpen) prevImage();
        if (isPanoOpen && project.panoramas.length > 1) {
          setCurrentPanoIndex(
            (i) => (i - 1 + project.panoramas.length) % project.panoramas.length
          );
        }
      }
      if (e.key === "ArrowRight") {
        if (isLightboxOpen) nextImage();
        if (isPanoOpen && project.panoramas.length > 1) {
          setCurrentPanoIndex(
            (i) => (i + 1) % project.panoramas.length
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isLightboxOpen, isPanoOpen, project.panoramas.length]);

  return (
    <div className="gallery-details">
      {/* Hero Section */}
      <section className="gal-hero-section">
        <div className="gal-hero-image-container reveal fade-up">
          <img
            src={project.heroImage}
            alt={project.name}
            className={`gal-hero-image ${imageLoaded ? "loaded" : ""}`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="gal-hero-overlay" />
          <div className="gal-hero-content">
            <div className="container">
              <div className="gal-hero-header reveal fade-up delay-1">
                <button
                  className="back-btn"
                  onClick={() => window.history.back()}
                >
                  <FaArrowLeft />
                  <span>Back to Gallery</span>
                </button>
                <div className="gal-hero-actions">
                  <button
                    className={`action-btn ${isLiked ? "liked" : ""}`}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <FaHeart />
                  </button>
                  <button className="action-btn">
                    <FaShare />
                  </button>
                  <button className="action-btn">
                    <FaDownload />
                  </button>
                </div>
              </div>

              <div className="gal-hero-info reveal fade-up delay-2">
                <div className="category-badge">{project.category}</div>
                <h1 className="gal-hero-title">{project.name}</h1>
                <p className="gal-hero-subtitle">{project.description}</p>

                <div className="gal-hero-meta">
                  <div className="meta-item">
                    <FaMapMarkerAlt />
                    <span>{project.location}</span>
                  </div>
                  <div className="meta-item">
                    <FaCalendarAlt />
                    <span>{project.year}</span>
                  </div>
                  <div className="meta-item">
                    <FaRuler />
                    <span>{project.area}</span>
                  </div>
                  <div className="meta-item">
                    <FaClock />
                    <span>{project.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Navigation Tabs - Updated to include 360 tab */}
          <nav className="content-tabs reveal fade-up">
            {["overview", "gallery", "360view", "specifications", "features"].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "360view" ? "360° View" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "overview" && (
              <div className="overview-content reveal fade-up">
                <div className="content-grid">
                  <div className="main-column">
                    <section className="project-overview">
                      <h2>Project Overview</h2>
                      <p className="lead-text">{project.description}</p>

                      <div className="overview-stats">
                        <div className="stat-card">
                          <FaUsers className="stat-icon" />
                          <div className="stat-info">
                            <h3>Client</h3>
                            <p>{project.client}</p>
                          </div>
                        </div>
                        <div className="stat-card">
                          <FaLayerGroup className="stat-icon" />
                          <div className="stat-info">
                            <h3>Architect</h3>
                            <p>{project.architect}</p>
                          </div>
                        </div>
                        <div className="stat-card">
                          <FaTools className="stat-icon" />
                          <div className="stat-info">
                            <h3>Contractor</h3>
                            <p>{project.contractor}</p>
                          </div>
                        </div>
                        <div className="stat-card">
                          <FaAward className="stat-icon" />
                          <div className="stat-info">
                            <h3>Status</h3>
                            <p className="status-completed">{project.status}</p>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                  <aside className="sidebar-column">
                    <div className="quick-facts">
                      <h3>Quick Facts</h3>
                      <ul className="facts-list">
                        <li>
                          <span>Location:</span> {project.location}
                        </li>
                        <li>
                          <span>Year:</span> {project.year}
                        </li>
                        <li>
                          <span>Area:</span> {project.area}
                        </li>
                        <li>
                          <span>Duration:</span> {project.duration}
                        </li>
                      </ul>
                    </div>
                  </aside>
                </div>
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="gallery-content reveal fade-up">
                <div className="gallery-grid">
                  {/* 360° tile */}
                  {project.panoramas?.length > 0 && (
                    <div
                      className="gallery-item pano-item"
                      onClick={() => openPanorama(0)}
                      title="Open 360° view"
                    >
                      <div className="pano-tile">
                        <div className="pano-badge">360°</div>
                        <span>Interactive Panorama</span>
                      </div>
                    </div>
                  )}

                  {/* regular photos */}
                  {project.gallery.map((image, index) => (
                    <div
                      key={index}
                      className={`gallery-item reveal zoom-in delay-${
                        (index % 4) + 1
                      }`}
                      onClick={() => openLightbox(index)}
                    >
                      <img
                        src={image}
                        alt={`${project.name} - Image ${index + 1}`}
                      />
                      <div className="gallery-overlay">
                        <FaExpand />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New 360° View Tab */}
            {activeTab === "360view" && (
              <div className="panorama-content reveal fade-up">
                <div className="panorama-section">
                  <h2>360° Virtual Tour</h2>
                  <p className="panorama-description">
                    Explore the building from every angle with our interactive 360° views. 
                    Click and drag to look around, or use your mouse wheel to zoom.
                  </p>
                  
                  {project.panoramas?.length > 0 && (
                    <div className="panorama-grid">
                      {project.panoramas.map((panorama, index) => (
                        <div key={panorama.id} className="panorama-card">
                          <h3>{panorama.title}</h3>
                          <div className="panorama-container">
                            <PanoramaViewer 
                              src={panorama.src}
                              autoRotate={true}
                              initialYaw={0}
                              initialPitch={0}
                            />
                          </div>
                          <button 
                            className="fullscreen-btn"
                            onClick={() => openPanorama(index)}
                            title="Open in fullscreen"
                          >
                            <FaExpand />
                            <span>Fullscreen View</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="specifications-content reveal fade-up">
                <div className="spec-grid">
                  {project.specifications.map((spec, index) => (
                    <div
                      key={index}
                      className={`spec-item reveal fade-up delay-${
                        (index % 3) + 1
                      }`}
                    >
                      <h4>{spec.label}</h4>
                      <p>{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="features-content reveal fade-up">
                <div className="features-grid">
                  {project.features.map((feature, index) => (
                    <div
                      key={index}
                      className={`feature-card reveal zoom-in delay-${
                        (index % 2) + 1
                      }`}
                    >
                      <div className="feature-icon">
                        <feature.icon />
                      </div>
                      <div className="feature-content">
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Projects */}
          <section className="related-projects reveal fade-up">
            <h2>Related Projects</h2>
            <div className="related-grid">
              {project.relatedProjects.map((related, index) => (
                <div
                  key={related.id}
                  className={`related-card reveal zoom-in delay-${index + 1}`}
                >
                  <img src={related.image} alt={related.name} />
                  <div className="related-info">
                    <h3>{related.name}</h3>
                    <button className="view-btn">
                      <FaEye />
                      <span>View Project</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Image Lightbox */}
      {isLightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <FaTimes />
            </button>
            <button className="lightbox-prev" onClick={prevImage}>
              <FaChevronLeft />
            </button>
            <button className="lightbox-next" onClick={nextImage}>
              <FaChevronRight />
            </button>

            <div className="lightbox-image-container">
              <img
                src={project.gallery[currentImageIndex]}
                alt={`${project.name} - Image ${currentImageIndex + 1}`}
                className="lightbox-image"
              />
            </div>

            <div className="lightbox-counter">
              {currentImageIndex + 1} / {project.gallery.length}
            </div>
          </div>
        </div>
      )}

      {/* 360° Modal */}
      {isPanoOpen && (
        <div
          className="lightbox-overlay"
          onClick={closePanorama}
        >
          <div className="lightbox-content panorama-lightbox" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={closePanorama}
            >
              <FaTimes />
            </button>

            {project.panoramas.length > 1 && (
              <>
                <button
                  className="lightbox-prev"
                  onClick={() =>
                    setCurrentPanoIndex(
                      (i) =>
                        (i - 1 + project.panoramas.length) %
                        project.panoramas.length
                    )
                  }
                >
                  <FaChevronLeft />
                </button>
                <button
                  className="lightbox-next"
                  onClick={() =>
                    setCurrentPanoIndex(
                      (i) => (i + 1) % project.panoramas.length
                    )
                  }
                >
                  <FaChevronRight />
                </button>
              </>
            )}

            <div className="panorama-lightbox-container">
              <PanoramaViewer 
                src={project.panoramas[currentPanoIndex].src}
                autoRotate={false}
                initialYaw={0}
                initialPitch={0}
              />
            </div>
            
            <div className="lightbox-counter">
              {project.panoramas[currentPanoIndex].title} •{" "}
              {currentPanoIndex + 1} / {project.panoramas.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}