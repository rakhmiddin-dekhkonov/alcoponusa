import React from "react";
import "../styles/Resources.css";

const FILES = [
  { id: 1, name: "Product Catalogue 2025", type: "PDF", size: "2.3 MB", link: "#" },
  { id: 2, name: "Installation Guide - Cassette System", type: "PDF", size: "1.8 MB", link: "#" },
  { id: 3, name: "Fire-Rated ACP Certification", type: "PDF", size: "0.9 MB", link: "#" },
  { id: 4, name: "Finish Chart (Gloss, Matte, Metallic, Wood)", type: "PDF", size: "1.1 MB", link: "#" },
  { id: 5, name: "Warranty & Maintenance Guide", type: "PDF", size: "0.6 MB", link: "#" },
];

export default function Resources() {
  return (
    <section className="section">
      <div className="container">
        <header className="res__header">
          <h1 className="section-heading">Resources</h1>
          <p className="section-sub">
            Download datasheets, installation guides, and certifications.
          </p>
        </header>

        <div className="resList card">
          {FILES.map(f => (
            <a key={f.id} href={f.link} className="resItem" download>
              <div className="res__meta">
                <span className="res__icon">📄</span>
                <div>
                  <strong>{f.name}</strong>
                  <div className="res__info">{f.type} • {f.size}</div>
                </div>
              </div>
              <span className="res__cta">Download</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
