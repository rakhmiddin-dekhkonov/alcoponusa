import React from "react";
import { useParams, Link } from "react-router-dom";
import systems from "../data/systems.js";
import "../styles/SystemDetail.css";

export default function SystemDetail() {
  const { slug } = useParams();
  const system = systems.find(s => s.slug === slug);

  if (!system) {
    return (
      <section className="section">
        <div className="container">
          <h1 className="section-heading">System Not Found</h1>
          <Link to="/systems" className="btn btn--primary">Back to Systems</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <header className="sd__header">
          <h1 className="section-heading">{system.name}</h1>
          <p className="section-sub">{system.tagline}</p>
        </header>

        <div className="sdHero card">
          <div className="sdHero__text">
            <h2>Overview</h2>
            <p>{system.description}</p>
            <div className="sd__ctas">
              <Link to="/contact" className="btn btn--primary">Request Info</Link>
            </div>
          </div>
          <div className="sdHero__media">
            <img src={system.images[0]} alt={`${system.name} render`} />
          </div>
        </div>

        {system.images[1] && (
          <div className="sdGallery card">
            <img src={system.images[1]} alt={`${system.name} alternate view`} />
          </div>
        )}

        <div className="sd__footer">
          <Link to="/systems" className="btn btn--accent">← Back to Systems</Link>
        </div>
      </div>
    </section>
  );
}
