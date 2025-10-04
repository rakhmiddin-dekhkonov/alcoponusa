import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import finishes from "../data/finishes";
import "../styles/FinishDetail.css";
import BuildingViewer3D from "../components/BuildingViewer3D";
import schoolModelUrl from "../assets/models/school_building.glb";

export default function FinishDetail() {
  const { code } = useParams();

  const allFinishes = finishes.flatMap(g =>
    g.items.map(item => ({ ...item, category: g.category }))
  );
  const initialFinish = allFinishes.find(f => f.code === code) || allFinishes[0];

  const [selected, setSelected] = useState(initialFinish);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState(null);
  const [viewMode, setViewMode] = useState("finish"); // "finish" | "building"

  const viewerRef = useRef(null);       // card viewer
  const lbViewerRef = useRef(null);     // lightbox viewer
  const siblings = allFinishes.filter(f => f.category === selected.category);

  useEffect(() => {
    setIsChanging(true);
    const t = setTimeout(() => setIsChanging(false), 250);
    return () => clearTimeout(t);
  }, [selected.code, viewMode]);

  useEffect(() => {
    if (lightboxOpen) document.body.classList.add("lightbox-open");
    else document.body.classList.remove("lightbox-open");
    return () => document.body.classList.remove("lightbox-open");
  }, [lightboxOpen]);

  const openLightbox = () => setLightboxOpen(true);

  // Capture only used for swatch (3D is interactive in the lightbox)
  const handleCapture = () => {
    if (viewMode === "finish") {
      setPreviewDataUrl(selected.img);
    }
    openLightbox();
  };

  const handleDownload = () => {
    let url;
    if (lightboxOpen && viewMode === "building") {
      url = lbViewerRef.current?.capture?.();
    } else if (viewMode === "building") {
      url = viewerRef.current?.capture?.();
    } else {
      url = selected.img;
    }
    if (!url) return;
    const a = document.createElement("a");
    a.download = `${selected.code}-${viewMode}.png`;
    a.href = url;
    a.click();
  };

  return (
    <section className="finish-detail-section">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/samples-finishes" className="breadcrumb-link">
            <span>← Finishes</span>
          </Link>
        </nav>

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
          {/* VISUAL COLUMN */}
          <div className="finishDetail__img">
            <div className="main-image-container">
              {/* Toggle */}
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <button
                  className={`btn ${viewMode === "finish" ? "btn--primary" : "btn--outline"}`}
                  onClick={() => setViewMode("finish")}
                >
                  🎨 Finish
                </button>
                <button
                  className={`btn ${viewMode === "building" ? "btn--primary" : "btn--outline"}`}
                  onClick={() => setViewMode("building")}
                >
                  🏢 3D Building
                </button>
              </div>

              <div className={`image-wrapper ${isChanging ? "changing" : ""}`}>
                {viewMode === "finish" ? (
                  <img
                    src={selected.img}
                    alt={selected.name}
                    className="main-image loaded"
                    onClick={handleCapture}
                    style={{ cursor: "zoom-in" }}
                  />
                ) : (
                  <>
                    <BuildingViewer3D
                      ref={viewerRef}
                      className="main-image canvas-image loaded"
                      glbUrl={schoolModelUrl}
                      finishUrl={selected.img}
                      targetNames={["*"]} // change later to ["Facade","Walls",...]
                    />
                    {/* Expand button (doesn't block dragging) */}
                    <button
                      className="expand-3d-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox();
                      }}
                      title="Expand 3D view"
                    >
                      ⤢
                    </button>
                  </>
                )}

                {/* overlay: enabled for swatch, disabled in 3D so gestures work */}
                <div
                  className="image-overlay"
                  onClick={viewMode === "finish" ? handleCapture : undefined}
                  style={viewMode === "building" ? { pointerEvents: "none", opacity: 0 } : undefined}
                >
                  <div className="zoom-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21 21L16.514 16.506" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M10.5 18A7.5 7.5 0 1 0 10.5 3a7.5 7.5 0 0 0 0 15Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 10.5h5M10.5 8v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="zoom-text">Click to enlarge</span>
                </div>
              </div>

              <div className="preview-actions">
                <button className="btn btn--outline" onClick={handleDownload} title="Download current preview">
                  ⤓ Download Preview
                </button>
                <span className="preview-hint">
                  {viewMode === "finish" ? (
                    <>Viewing the <strong>finish swatch</strong>.</>
                  ) : (
                    <>Viewing the <strong>3D building</strong> with this finish.</>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* INFO COLUMN */}
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
                  <div className="spec-item"><span className="spec-label">Code:</span><span className="spec-value">{selected.code}</span></div>
                  <div className="spec-item"><span className="spec-label">Category:</span><span className="spec-value">{selected.category}</span></div>
                  <div className="spec-item"><span className="spec-label">Surface:</span><span className="spec-value">Textured</span></div>
                </div>
              </div>

              <div className="finishDetail__actions">
                <Link to="/contact" className="btn btn--primary"><span className="btn-icon">📋</span>Request Sample</Link>
                <Link to="/samples-finishes" className="btn btn--outline"><span className="btn-icon">←</span>Back to Finishes</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="lightbox" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox__close" onClick={() => setLightboxOpen(false)} title="Close (ESC)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div className="lightbox-content">
              {viewMode === "building" ? (
                <div className="lightbox-3d-wrap">
                  <BuildingViewer3D
                    ref={lbViewerRef}
                    className="lightbox-3d-canvas"
                    glbUrl={schoolModelUrl}
                    finishUrl={selected.img}
                    targetNames={["*"]}
                  />
                  <div className="lightbox-3d-help">drag to rotate • scroll to zoom • right-click to pan</div>
                </div>
              ) : (
                <img src={selected.img} alt={selected.name} className="lightbox-image" />
              )}

              <div className="lightbox-info">
                <h3 className="lightbox-title">{selected.name}</h3>
                <p className="lightbox-meta">
                  {selected.code} • {selected.category} {viewMode === "building" ? "• 3D View" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
