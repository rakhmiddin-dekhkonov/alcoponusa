import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import data from "../data/products.js";
import "../styles/ProductDetail.css";

export default function ProductDetail() {
  const { slug } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [specsExpanded, setSpecsExpanded] = useState(false);
  const galleryRef = useRef(null);

  const product = data.find(p => p.slug === slug);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.dataset.section]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Handle image navigation
  const handleImageNavigation = (direction) => {
    if (!product?.images) return;
    
    const newIndex = direction === 'next' 
      ? (selectedImageIndex + 1) % product.images.length
      : (selectedImageIndex - 1 + product.images.length) % product.images.length;
    
    setSelectedImageIndex(newIndex);
  };

  // Handle keyboard navigation for gallery
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isImageModalOpen) return;
      
      if (e.key === 'Escape') {
        setIsImageModalOpen(false);
      } else if (e.key === 'ArrowLeft') {
        handleImageNavigation('prev');
      } else if (e.key === 'ArrowRight') {
        handleImageNavigation('next');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isImageModalOpen, selectedImageIndex]);

  if (!product) {
    return (
      <section className="section section--error">
        <div className="container">
          <div className="error__content">
            <div className="error__icon">❌</div>
            <h1 className="error__heading">Product Not Found</h1>
            <p className="error__text">We couldn't find the product you're looking for.</p>
            <Link to="/products" className="btn btn--primary btn--large">
              <span className="btn__text">← Back to Products</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb" data-section="breadcrumb">
          <Link to="/" className="breadcrumb__link">Home</Link>
          <span className="breadcrumb__separator">→</span>
          <Link to="/products" className="breadcrumb__link">Products</Link>
          <span className="breadcrumb__separator">→</span>
          <span className="breadcrumb__current">{product.name}</span>
        </nav>

        {/* Enhanced Header */}
        <header 
          className={`pd__header ${visibleSections.has('header') ? 'pd__header--visible' : ''}`}
          data-section="header"
        >
          <div className="header__content">
            <div className="header__badge">
              <span className="badge__dot"></span>
              Premium Product
            </div>
            <h1 className="section-heading">
              <span className="heading__text">{product.name}</span>
              <span className="heading__accent"></span>
            </h1>
            {product.tagline && (
              <p className="section-sub">{product.tagline}</p>
            )}
          </div>
        </header>

        {/* Enhanced Main Content Block */}
        <div 
          className={`pdMain card ${visibleSections.has('main') ? 'pdMain--visible' : ''}`}
          data-section="main"
        >
          {/* Overview Section */}
          <div className="pdMain__overview">
            <div className="overview__header">
              <h2 className="overview__title">
                <span className="title__icon">📋</span>
                Overview
              </h2>
            </div>
            
            <div className="overview__content">
              <p className="overview__description">{product.description}</p>
              
              {/* Key Features */}
              <div className="features__grid">
                <div className="feature__item">
                  <div className="feature__icon">🏆</div>
                  <div className="feature__content">
                    <h4>Premium Quality</h4>
                    <p>Industry-leading materials and manufacturing</p>
                  </div>
                </div>
                <div className="feature__item">
                  <div className="feature__icon">⚡</div>
                  <div className="feature__content">
                    <h4>Fast Delivery</h4>
                    <p>Reliable lead times and quick turnaround</p>
                  </div>
                </div>
                <div className="feature__item">
                  <div className="feature__icon">🛡️</div>
                  <div className="feature__content">
                    <h4>Warranty</h4>
                    <p>Comprehensive coverage and support</p>
                  </div>
                </div>
              </div>

              {/* Enhanced CTAs */}
              <div className="pd__ctas">
                <Link to="/resources" className="btn btn--outline">
                  <span className="btn__icon">📄</span>
                  <span className="btn__text">Download Specs</span>
                </Link>
                <Link to="/contact" className="btn btn--primary">
                  <span className="btn__icon">💬</span>
                  <span className="btn__text">Request Quote</span>
                  <span className="btn__arrow">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Enhanced Specifications */}
          {product.specs && (
            <div className="pdMain__specs">
              <div className="specs__header">
                <h2 className="specs__title">
                  <span className="title__icon">⚙️</span>
                  Technical Specifications
                </h2>
                <button 
                  className="specs__toggle"
                  onClick={() => setSpecsExpanded(!specsExpanded)}
                  aria-expanded={specsExpanded}
                >
                  <span className={`toggle__icon ${specsExpanded ? 'toggle__icon--expanded' : ''}`}>
                    ↓
                  </span>
                </button>
              </div>
              
              <div className={`specTable card ${specsExpanded ? 'specTable--expanded' : ''}`}>
                {Object.entries(product.specs).map(([key, value], index) => (
                  <div 
                    className="specRow" 
                    key={key}
                    style={{ '--row-index': index }}
                  >
                    <div className="specProp">
                      <span className="spec__label">{key}</span>
                    </div>
                    <div className="specVal">
                      <span className="spec__value">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Image Gallery */}
        {product.images && product.images.length > 0 && (
          <div 
            className={`pdGallery ${visibleSections.has('gallery') ? 'pdGallery--visible' : ''}`}
            data-section="gallery"
            ref={galleryRef}
          >
            <div className="gallery__header">
              <h2 className="gallery__title">
                <span className="title__icon">🖼️</span>
                Product Gallery
              </h2>
              <div className="gallery__counter">
                {selectedImageIndex + 1} of {product.images.length}
              </div>
            </div>

            {/* Main Featured Image */}
            <div className="gallery__featured">
              <div className="featured__container">
                <img 
                  src={product.images[selectedImageIndex]} 
                  alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                  className="featured__image"
                  onClick={() => setIsImageModalOpen(true)}
                />
                <div className="featured__overlay">
                  <button className="overlay__button">
                    <span className="button__icon">🔍</span>
                    <span className="button__text">View Full Size</span>
                  </button>
                </div>
                
                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button 
                      className="gallery__nav gallery__nav--prev"
                      onClick={() => handleImageNavigation('prev')}
                      aria-label="Previous image"
                    >
                      ←
                    </button>
                    <button 
                      className="gallery__nav gallery__nav--next"
                      onClick={() => handleImageNavigation('next')}
                      aria-label="Next image"
                    >
                      →
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnail Grid */}
            {product.images.length > 1 && (
              <div className="gallery__thumbnails">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail__item ${index === selectedImageIndex ? 'thumbnail__item--active' : ''}`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} thumbnail ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Enhanced Footer */}
        <div 
          className={`pd__footer ${visibleSections.has('footer') ? 'pd__footer--visible' : ''}`}
          data-section="footer"
        >
          <div className="pd__footer__content">
            <Link to="/products" className="btn btn--outline btn--large">
              <span className="btn__text">← Back to Products</span>
            </Link>
            
            <div className="pd__footer__actions">
              <button className="btn btn--ghost">
                <span className="btn__icon">📤</span>
                <span className="btn__text">Share Product</span>
              </button>
              <button className="btn btn--ghost">
                <span className="btn__icon">❤️</span>
                <span className="btn__text">Add to Favorites</span>
              </button>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {isImageModalOpen && (
          <div className="image__modal" onClick={() => setIsImageModalOpen(false)}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
              <button 
                className="modal__close"
                onClick={() => setIsImageModalOpen(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
              
              <img 
                src={product.images[selectedImageIndex]} 
                alt={`${product.name} - Full size`}
                className="modal__image"
              />
              
              {product.images.length > 1 && (
                <>
                  <button 
                    className="modal__nav modal__nav--prev"
                    onClick={() => handleImageNavigation('prev')}
                  >
                    ←
                  </button>
                  <button 
                    className="modal__nav modal__nav--next"
                    onClick={() => handleImageNavigation('next')}
                  >
                    →
                  </button>
                </>
              )}
              
              <div className="modal__counter">
                {selectedImageIndex + 1} / {product.images.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}