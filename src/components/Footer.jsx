import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import logo from "../assets/LOGO.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__grid">
            {/* Company Info Section */}
            <div className="footer__section footer__section--brand">
              <div className="footer__brand">
                <img className="footer__logo" src={logo} alt="ALCOPON Logo" />
                {/* <span className="footer__brand-text">ALCOPON</span> */}
              </div>
              <p className="footer__description">
                Premium aluminum composite panels for modern façades. 
                Trusted by architects worldwide for superior quality, 
                durability, and design flexibility.
              </p>
              <div className="footer__badge">
                <span className="footer__badge-icon">⭐</span>
                <span className="footer__badge-text">Since 2003 • Premium Quality</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer__section">
              <h4 className="footer__heading">Company</h4>
              <ul className="footer__links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/systems">Systems</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/resources">Resources</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer__section">
              <h4 className="footer__heading">Services</h4>
              <ul className="footer__links">
                <li><Link to="/samples-finishes">Samples & Finishes</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-content">
            <div className="footer__copyright">
              <span>© {new Date().getFullYear()} ALCOPON. All rights reserved.</span>
            </div>
            <div className="footer__bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
            <div className="footer__built">
              <span>Built with care ♥</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}