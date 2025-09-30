// src/pages/FinishDetail.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import finishes from "../data/finishes";
import "../styles/FinishDetail.css";

// Preset building photos
import residentialBuilding from "../assets/buildings/residential-building.jpg";
import commercialBuilding from "../assets/buildings/commercial-building.jpg";
import warehouseBuilding from "../assets/buildings/warehouse.jpg";

export default function FinishDetail() {
  const { code } = useParams();

  // --- data prep ---
  const allFinishes = finishes.flatMap(g =>
    g.items.map(item => ({ ...item, category: g.category }))
  );
  const initialFinish = allFinishes.find(f => f.code === code) || allFinishes[0];

  // --- preset buildings only ---
  const PRESET_BUILDINGS = [
  { id: "none", label: "Finish", thumb: null, baseUrl: null },
  { id: "residential", label: "Residential", thumb: residentialBuilding, baseUrl: residentialBuilding },
  { id: "commercial",  label: "Commercial",  thumb: commercialBuilding,  baseUrl: commercialBuilding },
  { id: "warehouse",   label: "Warehouse",   thumb: warehouseBuilding,   baseUrl: warehouseBuilding }
];


  // --- state ---
  const [selected, setSelected] = useState(initialFinish);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  // Changed approach: Apply finish facade to building
  const [selectedBuildingId, setSelectedBuildingId] = useState("none");
  const [previewDataUrl, setPreviewDataUrl] = useState(null);

  const canvasRef = useRef(null);

  // keep siblings for lightbox nav (unchanged)
  const siblings = allFinishes.filter(f => f.category === selected.category);

  // animate on finish change
  useEffect(() => {
    setImageLoaded(false);
    setIsChanging(true);
    const t = setTimeout(() => setIsChanging(false), 300);
    return () => clearTimeout(t);
  }, [selected.code]);

  // lightbox body scroll lock
  useEffect(() => {
    if (lightboxOpen) document.body.classList.add("lightbox-open");
    else document.body.classList.remove("lightbox-open");
    return () => document.body.classList.remove("lightbox-open");
  }, [lightboxOpen]);

  // helpers
  function loadImg(src) {
    return new Promise((resolve) => {
      if (!src) return resolve(null);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  // Try to resolve a building mask for facade detection
  // Priority: building-specific mask → generic building mask
  const getBuildingMask = (buildingId) => {
    if (buildingId === "none") return null;
    // Try building-specific mask first
    const specificMask = `/assets/building-masks/${buildingId}-mask.png`;
    // Fallback to generic building facade mask
    const genericMask = `/assets/building-masks/facade-mask.png`;
    return [specificMask, genericMask];
  };

  // NEW APPROACH: Apply finish facade texture to building
  useEffect(() => {
    let cancelled = false;

    async function render() {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      // base = finish swatch
      const finishImg = await loadImg(selected.img);

      // building selection
      const building = PRESET_BUILDINGS.find(b => b.id === selectedBuildingId);
      const buildingImg = await loadImg(building?.baseUrl || null);

      // If user wants plain finish (none) or we can't load images → show finish only
      if (!finishImg || selectedBuildingId === "none" || !buildingImg) {
        if (finishImg) {
          canvas.width = finishImg.naturalWidth;
          canvas.height = finishImg.naturalHeight;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(finishImg, 0, 0, canvas.width, canvas.height);
          const url = canvas.toDataURL("image/png");
          if (!cancelled) setPreviewDataUrl(url);
        } else {
          if (!cancelled) setPreviewDataUrl(null);
        }
        return;
      }

      // Try to load a mask for building facade detection
      const maskCandidates = getBuildingMask(selectedBuildingId) || [];
      let maskImg = null;
      for (const maskPath of maskCandidates) {
        // eslint-disable-next-line no-await-in-loop
        const loaded = await loadImg(maskPath);
        if (loaded) { maskImg = loaded; break; }
      }

      // Match canvas to building image size
      canvas.width = buildingImg.naturalWidth;
      canvas.height = buildingImg.naturalHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the building as base
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(buildingImg, 0, 0, canvas.width, canvas.height);

      if (maskImg) {
        // APPROACH 1: Use mask to apply finish only to facade areas
        
        // Create a temporary canvas for the finish texture
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        
        // Scale and tile the finish to cover the building canvas
        const finishPattern = tempCtx.createPattern(finishImg, 'repeat');
        if (finishPattern) {
          // Calculate scale to make finish texture appropriately sized
          const scale = Math.min(canvas.width / finishImg.naturalWidth, canvas.height / finishImg.naturalHeight) * 0.3;
          tempCtx.scale(scale, scale);
          tempCtx.fillStyle = finishPattern;
          tempCtx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
          tempCtx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
        } else {
          // Fallback: stretch finish to cover
          tempCtx.drawImage(finishImg, 0, 0, canvas.width, canvas.height);
        }

        // Apply mask to the finish texture
        tempCtx.globalCompositeOperation = "destination-in";
        tempCtx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);

        // Blend the masked finish onto the building
        ctx.globalCompositeOperation = "multiply";
        ctx.globalAlpha = 0.7; // Adjust for desired finish opacity
        ctx.drawImage(tempCanvas, 0, 0);
        
        // Add some finish texture overlay for realism
        ctx.globalCompositeOperation = "soft-light";
        ctx.globalAlpha = 0.4;
        ctx.drawImage(tempCanvas, 0, 0);
        
        // Reset
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
        
      } else {
        // APPROACH 2: No mask found → apply finish as overlay to entire building with fade edges
        
        // Create finish overlay scaled to building
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        
        // Create a subtle pattern from the finish
        const finishPattern = tempCtx.createPattern(finishImg, 'repeat');
        if (finishPattern) {
          const scale = Math.min(canvas.width / finishImg.naturalWidth, canvas.height / finishImg.naturalHeight) * 0.25;
          tempCtx.scale(scale, scale);
          tempCtx.fillStyle = finishPattern;
          tempCtx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
          tempCtx.setTransform(1, 0, 0, 1, 0, 0);
        } else {
          tempCtx.drawImage(finishImg, 0, 0, canvas.width, canvas.height);
        }

        // Create a radial gradient mask for natural fade
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.max(canvas.width, canvas.height) * 0.6;
        const minRadius = Math.min(canvas.width, canvas.height) * 0.1;
        
        const gradient = tempCtx.createRadialGradient(
          centerX, centerY, minRadius,
          centerX, centerY, maxRadius
        );
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.7, "rgba(255,255,255,0.8)");
        gradient.addColorStop(1, "rgba(255,255,255,0.2)");
        
        tempCtx.globalCompositeOperation = "destination-in";
        tempCtx.fillStyle = gradient;
        tempCtx.fillRect(0, 0, canvas.width, canvas.height);

        // Apply the finish overlay to building
        ctx.globalCompositeOperation = "multiply";
        ctx.globalAlpha = 0.5;
        ctx.drawImage(tempCanvas, 0, 0);
        
        ctx.globalCompositeOperation = "soft-light";
        ctx.globalAlpha = 0.3;
        ctx.drawImage(tempCanvas, 0, 0);
        
        // Reset
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      }

      const url = canvas.toDataURL("image/png");
      if (!cancelled) setPreviewDataUrl(url);
    }

    render();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBuildingId, selected.code, selected.img]);

  // building options for the picker (use current finish swatch as thumb for "Finish")
  const buildingOptions = PRESET_BUILDINGS.map(b =>
    b.id === "none" ? { ...b, thumb: selected.img } : b
  );

  // simple download button
  const handleDownload = () => {
    if (!previewDataUrl) return;
    const link = document.createElement("a");
    link.download = `${selected.code}-facade-${selectedBuildingId}.png`;
    link.href = previewDataUrl;
    link.click();
  };

  return (
    <section className="finish-detail-section">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/samples-finishes" className="breadcrumb-link">
            <span>← Finishes</span>
          </Link>
        </nav>

        {/* Header */}
        <header className="finishDetail__header">
          <div className="header-content">
            <h1 className="finish-title">
              <span className="title-text">{selected.name}</span>
              <div className="title-underline"></div>
            </h1>
            <div className="finish-meta">
              <span className="finish-code">{selected.code}</span>
              <span className="meta-separator">•</span>
              <span className="finish-category">{selected.category}</span>
            </div>
          </div>
        </header>

        <div className="finishDetail__content">
          {/* IMAGE COLUMN */}
          <div className="finishDetail__img">
            {/* Main image: building with finish facade applied */}
            <div className="main-image-container">
              <div className={`image-wrapper ${isChanging ? "changing" : ""}`}>
                <canvas
                  ref={canvasRef}
                  className="main-image canvas-image loaded"
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Building with finish facade applied"
                />
                <div className="image-overlay">
                  <div className="zoom-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21 21L16.514 16.506" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M10.5 18A7.5 7.5 0 1 0 10.5 3a7.5 7.5 0 0 0 0 15Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 10.5h5M10.5 8v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="zoom-text">Click to enlarge</span>
                </div>
                <div className="image-shine"></div>
              </div>

              <div className="preview-actions">
                <button
                  className="btn btn--outline"
                  onClick={handleDownload}
                  disabled={!previewDataUrl}
                  title="Download current preview"
                >
                  ⤓ Download Preview
                </button>
                <span className="preview-hint">
                  This view shows the <strong>finish facade</strong> applied to your chosen <strong>building</strong>.
                </span>
              </div>
            </div>

            {/* Controls below main image */}
            <div className="below-controls">
              <div className="below-left">
                <div className="below-label">Choose a building to apply the finish facade to:</div>
                <div className="building-picker horizontal">
                  {buildingOptions.map(opt => (
                    <button
                      key={opt.id}
                      className={`bthumb ${selectedBuildingId === opt.id ? "active" : ""}`}
                      onClick={() => setSelectedBuildingId(opt.id)}
                      title={opt.label}
                    >
                      <img src={opt.thumb || selected.img} alt={opt.label} />
                      <span className="bthumb-label">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* INFO COLUMN (unchanged) */}
          <div className="finishDetail__info">
            <div className="info-content">
              <div className="info-section">
                <h2 className="info-title">About This Finish</h2>
                <p className="info-description">
                  This premium finish is part of our <strong>{selected.category}</strong> collection,
                  offering exceptional surface aesthetics and long-lasting durability.
                </p>
              </div>

              <div className="info-section">
                <h3 className="features-title">Key Features</h3>
                <ul className="features-list">
                  <li>Premium aluminum composite material</li>
                  <li>Weather-resistant surface coating</li>
                  <li>Easy maintenance and cleaning</li>
                  <li>Consistent color and texture</li>
                </ul>
              </div>

              <div className="info-section">
                <h3 className="specs-title">Specifications</h3>
                <div className="specs-grid">
                  <div className="spec-item">
                    <span className="spec-label">Code:</span>
                    <span className="spec-value">{selected.code}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Category:</span>
                    <span className="spec-value">{selected.category}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Surface:</span>
                    <span className="spec-value">Textured</span>
                  </div>
                </div>
              </div>

              <div className="finishDetail__actions">
                <Link to="/contact" className="btn btn--primary">
                  <span className="btn-icon">📋</span>
                  Request Sample
                </Link>
                <Link to="/samples-finishes" className="btn btn--outline">
                  <span className="btn-icon">←</span>
                  Back to Finishes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="lightbox" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox__inner" onClick={e => e.stopPropagation()}>
            <button
              className="lightbox__close"
              onClick={() => setLightboxOpen(false)}
              title="Close (ESC)"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="lightbox-content">
              <img
                src={previewDataUrl || selected.img}
                alt={selected.name}
                className="lightbox-image"
              />
              <div className="lightbox-info">
                <h3 className="lightbox-title">{selected.name}</h3>
                <p className="lightbox-meta">
                  {selected.code} • {selected.category}
                </p>
              </div>
            </div>

            {siblings.length > 1 && (
              <>
                <button
                  className="lightbox-nav lightbox-prev"
                  onClick={() => {
                    const currentIndex = siblings.findIndex(f => f.code === selected.code);
                    const prevIndex = (currentIndex - 1 + siblings.length) % siblings.length;
                    setSelected(siblings[prevIndex]);
                  }}
                  title="Previous (←)"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  className="lightbox-nav lightbox-next"
                  onClick={() => {
                    const currentIndex = siblings.findIndex(f => f.code === selected.code);
                    const nextIndex = (currentIndex + 1) % siblings.length;
                    setSelected(siblings[nextIndex]);
                  }}
                  title="Next (→)"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}