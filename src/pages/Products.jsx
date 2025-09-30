import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import products from "../data/products.js";
import "../styles/Products.css";

export default function Products() {
  const [visibleItems, setVisibleItems] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      { threshold: 0.15, rootMargin: '50px' }
    );

    const items = document.querySelectorAll('[data-index]');
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section">
      <div className="container">
        {/* Enhanced Header Section */}
        <header className="prod__header">
          <div className="header__content">
            <h1 className="section-heading">
              <span className="heading__text">Products</span>
              <span className="heading__accent"></span>
            </h1>
            <p className="section-sub">
              Aluminum composite panels engineered for performance, finish quality, and reliable lead times.
            </p>
          </div>
        </header>

        {/* Enhanced Product Rows */}
        <div className="productRows productRows--striped">
          {products.map((product, index) => {
            const reverse = index % 2 === 1;
            const isVisible = visibleItems.has(String(index));
            
            return (
              <article
                key={product.id}
                data-index={index}
                className={`productRow ${reverse ? "productRow--reverse" : ""} ${
                  isVisible ? "productRow--visible" : ""
                }`}
                style={{ '--animation-delay': `${index * 150}ms` }}
              >
                {/* Product Text Content */}
                <div className="productRow__text">
                  <div className="text__badge">
                    <span className="badge__dot"></span>
                    Premium Quality
                  </div>
                  <h3 className="text__title">{product.name}</h3>
                  <p className="text__description">{product.tagline}</p>
                  <div className="text__actions">
                    <Link to={`/product/${product.slug}`} className="btn btn--primary">
                      <span className="btn__text">Learn More</span>
                      <span className="btn__arrow">→</span>
                    </Link>
                    <button className="btn btn--ghost">
                      <span className="btn__text">Specifications</span>
                    </button>
                  </div>
                </div>
                
                {/* Enhanced Product Media */}
                <div className="productRow__media">
                  <div className="media__container">
                    <div className="media__backdrop"></div>
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      loading="lazy"
                    />
                    <div className="media__overlay">
                      <div className="overlay__content">
                        <span className="overlay__text">View Details</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Enhanced Footer Section */}
        <div className="products__footer">
          <div className="footer__content">
            <h3 className="footer__title">Need Custom Solutions?</h3>
            <p className="footer__text">
              Our engineering team can develop tailored composite panel solutions for your specific requirements.
            </p>
            <button className="btn btn--outline btn--large">
              <span className="btn__text">Contact Engineering</span>
            </button>
          </div>
        </div>

        {/* Product Specifications Table (if needed) */}
        <div className="prod__specs" style={{ display: 'none' }}>
          <div className="specTable">
            <div className="specRow">
              <div className="specProp">Material</div>
              <div className="specVal">Premium Aluminum Composite</div>
            </div>
            <div className="specRow">
              <div className="specProp">Thickness</div>
              <div className="specVal">3mm, 4mm, 6mm</div>
            </div>
            <div className="specRow">
              <div className="specProp">Fire Rating</div>
              <div className="specVal">Class A2-s1,d0</div>
            </div>
            <div className="specRow">
              <div className="specProp">Warranty</div>
              <div className="specVal">15 Years</div>
            </div>
          </div>
          <div className="prod__actions">
            <button className="btn btn--primary">Download Specs</button>
            <button className="btn btn--outline">Request Sample</button>
          </div>
        </div>
      </div>
    </section>
  );
}