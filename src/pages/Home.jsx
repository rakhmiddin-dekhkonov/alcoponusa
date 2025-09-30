import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import aboutImg from "../assets/h-aboutus.jpg";
import products from "../data/products.js";
import finishes from "../data/finishes.js";
import useReveal from "../hooks/useReveal";
import { 
  FaCheckCircle, 
  FaShieldAlt, 
  FaPalette, 
  FaTruck,
  FaPlay,
  FaArrowRight,
  FaStar,
  FaQuoteLeft,
  FaLeaf,
  FaAward
} from "react-icons/fa";
import logo from "../assets/LOGO.png";


// Enhanced Building Icon with animation
function BuildingIcon({ title = "Building" }) {
  return (
    <div className="app-icon-wrapper">
      <svg
        className="app-icon-svg"
        viewBox="0 0 24 24"
        role="img"
        aria-label={title}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 21h18v-2H3v2zm3-3h2V8H6v10zm4 0h2V5h-2v13zm4 0h2v-6h-2v6zm4 0h2V9h-2v9zM4 7h4V4H4v3zm8-2h4V3h-4v2z" />
      </svg>
    </div>
  );
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = React.useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * end);
            setCount(current);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          animate();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
}

export default function Home() {
  useReveal();
  
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  // Enhanced product selection
  const featuredProducts = products.slice(0, 4);

  // Enhanced finishes selection
  const featuredFinishes = finishes
    .flatMap(g => g.items.map(item => ({ ...item, category: g.category })))
    .slice(0, 12);

  const stats = [
    { number: 20, suffix: "+", label: "Years of Excellence" },
    { number: 1000, suffix: "+", label: "Projects Completed" },
    { number: 500, suffix: "+", label: "Happy Clients" },
    { number: 99, suffix: "%", label: "Quality Assurance" }
  ];

  const testimonials = [
    {
      text: "ALCOPON's panels transformed our building facade. The quality and finish are exceptional.",
      author: "Sarah Chen",
      position: "Lead Architect, ModernSpace"
    },
    {
      text: "Reliable delivery and outstanding technical support. They're our go-to supplier.",
      author: "Michael Rodriguez", 
      position: "Project Manager, UrbanBuild"
    },
    {
      text: "The variety of finishes and consistent quality make ALCOPON our preferred choice.",
      author: "David Kim",
      position: "Senior Designer, FutureForm"
    }
  ];

  return (
    <>
      {/* Enhanced Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="hero-particles"></div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge reveal fade-up">
              <FaStar />
              <span>Since 2003 • Premium Quality</span>
            </div>

            <div className="hero-logo reveal fade-up delay-1" aria-label="ALCOPON logo">
              <div className="hero-logo-card">
                <img src={logo} alt="ALCOPON Logo" className="front" />
                <img src={logo} alt="" aria-hidden="true" className="back" />
              </div>
            </div>


            <h1 className="hero-title reveal fade-up delay-1">
              Engineering Excellence in
              <span className="gradient-text"> Envelope Materials</span>
            </h1>

            <p className="hero-subtitle reveal fade-up delay-2">
              Transform your architectural vision with premium aluminum composite panels. 
              Trusted by architects worldwide for superior quality, durability, and design flexibility.
            </p>

            <div className="hero-cta reveal fade-up delay-3">
              <Link to="/contact" className="btn btn-primary">
                <span>Get Quote</span>
                <FaArrowRight />
              </Link>
              <Link to="/products" className="btn btn-ghost">
                <FaPlay />
                <span>View Showcase</span>
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="hero-stats reveal fade-up delay-4">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-card floating-card-1"></div>
          <div className="floating-card floating-card-2"></div>
          <div className="floating-card floating-card-3"></div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section about-preview reveal fade-left">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <div className="section-tag">About ALCOPON</div>
              <h2 className="about-title">
                Two Decades of 
                <span className="gradient-text"> Innovation</span>
              </h2>
              <p className="about-text">
                Since 2003, ALCOPON has been at the forefront of aluminum composite panel 
                innovation. Our panels combine architectural beauty with engineering precision, 
                offering unmatched durability and design versatility for modern construction.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <FaCheckCircle />
                  <span>Premium Materials</span>
                </div>
                <div className="feature-item">
                  <FaCheckCircle />
                  <span>Weather Resistant</span>
                </div>
                <div className="feature-item">
                  <FaCheckCircle />
                  <span>Fire Safety Certified</span>
                </div>
              </div>
              <Link to="/about" className="btn btn-outline">
                <span>Learn More</span>
                <FaArrowRight />
              </Link>
            </div>
            <div className="about-image">
              <img src={aboutImg} alt="ALCOPON manufacturing excellence" />
              <div className="image-overlay">
                <div className="overlay-content">
                  <FaPlay className="play-icon" />
                  <span>Watch Our Story</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="section why-choose">
        <div className="container">
          <div className="section-header reveal fade-up">
            <h2 className="section-title">Why Choose ALCOPON</h2>
            <p className="section-subtitle">
              Experience the difference that premium quality and dedicated service make
            </p>
          </div>

          <div className="why-grid stagger">
            {[
              {
                icon: <FaCheckCircle />,
                title: "Uncompromising Quality",
                description: "Every panel meets the highest industry standards with rigorous quality control",
                color: "green"
              },
              {
                icon: <FaShieldAlt />,
                title: "Proven Durability", 
                description: "Weather-resistant panels that maintain beauty and performance for decades",
                color: "blue"
              },
              {
                icon: <FaPalette />,
                title: "Design Freedom",
                description: "Extensive range of colors, textures, and finishes to match any vision",
                color: "gold"
              },
              {
                icon: <FaTruck />,
                title: "Reliable Partnership",
                description: "On-time delivery and comprehensive support from specification to installation",
                color: "charcoal"
              },
              {
                icon: <FaLeaf />,
                title: "Eco-Friendly Solutions",
                description: "Manufactured with environmentally responsible processes and recyclable materials, reducing carbon footprint",
                color: "emerald"
              },
              {
                icon: <FaAward />,
                title: "Certified & Trusted",
                description: "Backed by international certifications and decades of industry expertise, ensuring confidence in every project",
                color: "platinum"
              }
            ].map((item, index) => (
              <div key={index} className={`why-card reveal fade-up delay-${index + 1} ${item.color}`}>
                <div className="why-icon">
                  {item.icon}
                </div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-description">{item.description}</p>
                <div className="card-hover-effect"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="section products-showcase reveal fade-right">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Product Excellence</h2>
            <p className="section-subtitle">
              Discover our comprehensive range of premium aluminum composite solutions
            </p>
          </div>

          <div className="products-grid stagger">
            {featuredProducts.slice(0, 3).map((product, index) => (
              <div key={product.id} className={`product-card reveal zoom-in delay-${index + 1}`}>
                <div className="product-image">
                  <img src={product.images[0]} alt={product.name} />
                  <div className="product-overlay">
                    <Link to={`/product/${product.slug}`} className="product-link">
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
                <div className="product-content">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-tagline">{product.tagline}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="products-cta">
            <Link to="/products" className="btn btn-primary">
              <span>View All Products</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Finishes Gallery */}
      <section className="section finishes-gallery reveal zoom-in">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Signature Finishes</h2>
            <p className="section-subtitle">
              From classic elegance to contemporary boldness
            </p>
          </div>

          <div className="finishes-slider">
            <div className="finishes-track">
              {[...featuredFinishes, ...featuredFinishes].map((finish, index) => (
                <div key={`${finish.code}-${index}`} className="finish-card">
                  <div className="finish-image">
                    <img src={finish.img} alt={`${finish.code} ${finish.name}`} />
                    <div className="finish-overlay">
                      <span className="finish-code">{finish.code}</span>
                    </div>
                  </div>
                  <div className="finish-info">
                    <h4>{finish.name}</h4>
                    <span className="finish-category">{finish.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="finishes-cta">
            <Link to="/samples-finishes" className="btn btn-outline">
              <span>Explore All Finishes</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="section applications">
        <div className="container">
          <div className="section-header reveal fade-up">
            <h2 className="section-title">Versatile Applications</h2>
            <p className="section-subtitle">
              Perfect for diverse architectural projects with superior performance characteristics
            </p>
          </div>

          <div className="applications-grid stagger">
            {[
              "Retail & Commercial",
              "Residential Buildings",
              "Administrative Buildings",
              "Restaurants & Hospitality", 
              "Hotels & Resorts",
            ].map((application, index) => (
              <div key={index} className={`application-card reveal bounce-in delay-${index + 1}`}>
                <BuildingIcon title={application} />
                <h3>{application}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials">
        <div className="container">
          <div className="section-header reveal fade-up">
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Trusted by industry leaders worldwide
            </p>
          </div>

          <div className="testimonials-grid stagger">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`testimonial-card reveal fade-up delay-${index + 1}`}>
                <div className="testimonial-quote">
                  <FaQuoteLeft />
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>{testimonial.author}</h4>
                    <span>{testimonial.position}</span>
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content reveal fade-up">
            <h2 className="cta-title">Ready to Transform Your Project?</h2>
            <p className="cta-subtitle">
              Join thousands of satisfied clients who trust ALCOPON for their premium 
              aluminum composite panel needs. Let's build something extraordinary together.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                <span>Start Your Project</span>
                <FaArrowRight />
              </Link>
              <Link to="/samples-finishes" className="btn btn-ghost">
                <span>Request Samples</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}