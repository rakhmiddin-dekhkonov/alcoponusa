import React, { useState, useMemo, useEffect } from "react";
import { FaLayerGroup, FaImages, FaSearch, FaEye, FaArrowRight, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import useReveal from "../hooks/useReveal";
import "../styles/Gallery.css";
import { Link } from "react-router-dom";

const PROJECTS = [
  { 
    id: 1, 
    name: "Commercial Tower", 
    cat: "Commercial", 
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    description: "Modern 40-story office complex with premium ACP facade",
    location: "Downtown Singapore",
    year: "2024"
  },
  { 
    id: 2, 
    name: "Residential Complex", 
    cat: "Residential", 
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    description: "Luxury residential towers with energy-efficient panels",
    location: "Marina Bay",
    year: "2023"
  },
  { 
    id: 3, 
    name: "Airport Terminal", 
    cat: "Infrastructure", 
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
    description: "State-of-the-art terminal with weather-resistant ACP",
    location: "Changi Airport",
    year: "2024"
  },
  { 
    id: 4, 
    name: "Retail Mall", 
    cat: "Commercial", 
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    description: "Shopping center with vibrant architectural panels",
    location: "Orchard Road",
    year: "2023"
  },
  { 
    id: 5, 
    name: "University Block", 
    cat: "Institutional", 
    img: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
    description: "Academic building with sustainable design elements",
    location: "NUS Campus",
    year: "2024"
  },
  { 
    id: 6, 
    name: "Hospital Wing", 
    cat: "Healthcare", 
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
    description: "Medical facility with antimicrobial ACP solutions",
    location: "Singapore General",
    year: "2023"
  },
  { 
    id: 7, 
    name: "Tech Hub", 
    cat: "Commercial", 
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    description: "Innovation center with smart building integration",
    location: "Jurong East",
    year: "2024"
  },
  { 
    id: 8, 
    name: "Cultural Center", 
    cat: "Institutional", 
    img: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
    description: "Arts venue with acoustically optimized panels",
    location: "Esplanade",
    year: "2023"
  }
];

const CATS = ["All", "Commercial", "Residential", "Infrastructure", "Institutional", "Healthcare"];

export default function Gallery() {
  useReveal();
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [filterAnimation, setFilterAnimation] = useState(false);

  const filtered = useMemo(() => {
    let projects = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === filter);
    if (searchTerm) {
      projects = projects.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return projects;
  }, [filter, searchTerm]);

  const handleFilterChange = (newFilter) => {
    if (newFilter !== filter) {
      setFilterAnimation(true);
      setTimeout(() => {
        setFilter(newFilter);
        setFilterAnimation(false);
      }, 300);
    }
  };

  return (
    <section className="section gallery">
      <div className="container">
        {/* Enhanced Header */}
        <header className="gal__header reveal fade-up">
          <div className="section-tag">
            <FaImages />
            PROJECT SHOWCASE
          </div>
          <h1 className="section-title">Project Gallery</h1>
          <p className="section-subtitle">
            Discover how our premium aluminum composite panels transform architectural visions into stunning realities across diverse sectors.
          </p>
        </header>

        {/* Enhanced Controls */}
        <div className="gal__controls-wrapper reveal fade-up delay-1">
          {/* Search Bar */}
          <div className="gal__search">
            <FaSearch className="gal__search-icon" />
            <input
              type="text"
              placeholder="Search projects, locations, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="gal__search-input"
            />
          </div>

          {/* Filter Controls */}
          <div className="gal__controls">
            <div className="gal__filters">
              {CATS.map((cat, index) => {
                const active = filter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleFilterChange(cat)}
                    className={`chip ${active ? "chip--active" : ""}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            
            <div className="gal__count">
              <FaLayerGroup />
              <span className="gal__count-text">
                {filtered.length} project{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Grid */}
        <div className={`galGrid ${filterAnimation ? 'galGrid--filtering' : ''}`}>
          {filtered.map((project, index) => (
            <Link to={`/gallery/${project.id}`} 
                  key={project.id}
                  className="finish-link">
              <article 
                key={project.id} 
                className={`galCard reveal zoom-in delay-${(index % 4) + 1}`}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                >
                <div className="galCard__media">
                  <img src={project.img} alt={project.name} loading="lazy" />
                  <div className="galCard__overlay">
                    <div className="galCard__scrim" />
                    <div className="galCard__top">
                      <span className="badge">{project.cat}</span>
                    </div>
                    <div className="galCard__hover">
                      <button className="btn btn-primary galCard__btn">
                        <FaEye />
                        <span>View Details</span>
                        <FaArrowRight className="btn-arrow" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="galCard__body">
                  <div className="galCard__header">
                    <h3 className="galCard__title">{project.name}</h3>
                    <div className="galCard__meta">
                      <div className="galCard__meta-item">
                        <FaMapMarkerAlt />
                        <span>{project.location}</span>
                      </div>
                      <div className="galCard__meta-item">
                        <FaCalendarAlt />
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </div>
                  <p className="galCard__description">{project.description}</p>
                  
                  {/* Progress indicator */}
                  <div className="galCard__progress">
                    <div 
                      className="galCard__progress-bar"
                      style={{
                        transform: hoveredCard === project.id ? 'scaleX(1)' : 'scaleX(0)'
                      }}
                      />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

{/* No Results State */}
{filtered.length === 0 && (
  <div className="gal__no-results reveal fade-up">
            <div className="gal__no-results-content">
              <FaSearch className="gal__no-results-icon" />
              <h3>No projects found</h3>
              <p>Try adjusting your search terms or filters to find what you're looking for.</p>
              <button 
                className="btn btn-outline"
                onClick={() => {
                  setSearchTerm("");
                  setFilter("All");
                }}
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}