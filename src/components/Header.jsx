import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "../styles/Header.css";
import logo from "../assets/LOGO.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('nav-open');
    };
  }, [mobileMenuOpen]);

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="nav__brand">
          <img className="nav__logo" src={logo} alt="Company Logo" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="nav__menu nav__menu--desktop">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/catalog">Catalog</NavLink>
          <NavLink to="/samples-finishes">Samples &amp; Finishes</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/resources">Resources</NavLink>
          <div 
            className="nav__more"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button className="nav__moreBtn" type="button">
              More ▾
            </button>
            {open && (
              <div className="nav__dropdown">
                <Link to="/faq">FAQ</Link>
                <Link to="/contact">Contact Us</Link>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop CTA */}
        <Link to="/contact" className="btn btn--primary nav__cta nav__cta--desktop">
          Get a Quote
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className="nav__toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={`nav__toggle-line ${mobileMenuOpen ? 'nav__toggle-line--active' : ''}`}></span>
          <span className={`nav__toggle-line ${mobileMenuOpen ? 'nav__toggle-line--active' : ''}`}></span>
          <span className={`nav__toggle-line ${mobileMenuOpen ? 'nav__toggle-line--active' : ''}`}></span>
        </button>

        {/* Mobile Navigation */}
        <nav className={`nav__menu--mobile ${mobileMenuOpen ? 'nav__menu--mobile-open' : ''}`}>
          <NavLink to="/" end onClick={closeMobileMenu}>Home</NavLink>
          <NavLink to="/about" onClick={closeMobileMenu}>About Us</NavLink>
          <NavLink to="/products" onClick={closeMobileMenu}>Products</NavLink>
          <NavLink to="/systems" onClick={closeMobileMenu}>Systems</NavLink>
          <NavLink to="/samples-finishes" onClick={closeMobileMenu}>Samples &amp; Finishes</NavLink>
          <NavLink to="/gallery" onClick={closeMobileMenu}>Gallery</NavLink>
          <NavLink to="/resources" onClick={closeMobileMenu}>Resources</NavLink>
          <Link to="/faq" onClick={closeMobileMenu}>FAQ</Link>
          <Link to="/contact" onClick={closeMobileMenu}>Contact Us</Link>
          <Link to="/contact" className="btn btn--primary nav__cta nav__cta--mobile" onClick={closeMobileMenu}>
            Get a Quote
          </Link>
        </nav>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="nav__overlay" onClick={closeMobileMenu}></div>
        )}
      </div>
    </header>
  );
}