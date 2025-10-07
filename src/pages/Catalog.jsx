import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// data
import products from "../data/products.js";
import systems from "../data/systems.js";

// styles (reuse your Products.css for variables + product row styles)
import "../styles/Products.css";
import "../styles/Catalog.css";

export default function Catalog() {
  const [activeTab, setActiveTab] = useState("products"); // 'products' | 'systems'
  const [visibleProducts, setVisibleProducts] = useState(new Set());
  const [visibleSystems, setVisibleSystems] = useState(new Set());

  // IntersectionObserver for reveal-on-scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = entry.target.dataset.index;
          const block = entry.target.dataset.block; // 'product' | 'system'
          if (block === "product") {
            setVisibleProducts((prev) => new Set([...prev, idx]));
          } else if (block === "system") {
            setVisibleSystems((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.15, rootMargin: "60px" }
    );

    // Observe current tab items
    const items = document.querySelectorAll("[data-block][data-index]");
    items.forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, [activeTab]);

  return (
    <section className="section catalog">
      <div className="container">
        {/* Header */}
        {/* <header className="prod__header">
          <div className="header__content">
            <h1 className="section-heading">
              <span className="heading__text">Products & Systems</span>
              <span className="heading__accent"></span>
            </h1>
            <p className="section-sub">
              Explore our aluminum composite <strong>Products</strong> and engineered façade <strong>Systems</strong>.
            </p>
          </div>
        </header> */}

        {/* Tabs */}
        <nav className="catalog__tabs" role="tablist" aria-label="Catalog Tabs">
          {[
            { id: "products", label: "Products" },
            { id: "systems", label: "Systems" },
          ].map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={activeTab === t.id}
              aria-controls={`panel-${t.id}`}
              id={`tab-${t.id}`}
              className={`catalog__tab ${activeTab === t.id ? "is-active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
          <div
            className={`catalog__tab-indicator ${activeTab}`}
            aria-hidden="true"
          />
        </nav>

        {/* Panels */}
        <div className="catalog__panels">
          {/* PRODUCTS PANEL */}
          <div
            id="panel-products"
            role="tabpanel"
            aria-labelledby="tab-products"
            hidden={activeTab !== "products"}
          >
            <div className="productRows productRows--striped">
              {products.map((product, index) => {
                const reverse = index % 2 === 1;
                const isVisible = visibleProducts.has(String(index));
                return (
                  <article
                    key={product.id}
                    data-block="product"
                    data-index={index}
                    className={`productRow ${reverse ? "productRow--reverse" : ""} ${
                      isVisible ? "productRow--visible" : ""
                    }`}
                    style={{ "--animation-delay": `${index * 150}ms` }}
                  >
                    {/* Text */}
                    <div className="productRow__text">
                      <div className="text__badge">
                        <span className="badge__dot"></span>
                        Premium Quality
                      </div>
                      <h3 className="text__title">{product.name}</h3>
                      <p className="text__description">{product.tagline}</p>
                      <div className="text__actions">
                        <Link
                          to={`/product/${product.slug}`}
                          className="btn btn--primary"
                        >
                          <span className="btn__text">Learn More</span>
                          <span className="btn__arrow">→</span>
                        </Link>
                        <button className="btn btn--ghost">
                          <span className="btn__text">Specifications</span>
                        </button>
                      </div>
                    </div>

                    {/* Media */}
                    <div className="productRow__media">
                      <div className="media__container">
                        <div className="media__backdrop"></div>
                        <img
                          src={product.images?.[0]}
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

            {/* Footer CTA */}
            <div className="products__footer">
              <div className="footer__content">
                <h3 className="footer__title">Need Custom Solutions?</h3>
                <p className="footer__text">
                  Our engineering team can develop tailored composite panel solutions for your specific requirements.
                </p>
                <Link to="/contact" className="btn btn--outline btn--large">
                  <span className="btn__text">Contact Engineering</span>
                </Link>
              </div>
            </div>
          </div>

          {/* SYSTEMS PANEL */}
          <div
            id="panel-systems"
            role="tabpanel"
            aria-labelledby="tab-systems"
            hidden={activeTab !== "systems"}
          >
            <div className="systemRows">
              {systems.map((s, i) => {
                const reverse = i % 2 === 1;
                const isVisible = visibleSystems.has(String(i));
                return (
                  <article
                    key={s.id}
                    data-block="system"
                    data-index={i}
                    className={`systemRow ${reverse ? "systemRow--reverse" : ""} ${
                      isVisible ? "systemRow--visible" : ""
                    }`}
                    style={{ "--animation-delay": `${i * 150}ms` }}
                  >
                    <div className="systemRow__text">
                      <div className="sys__eyebrow">Ventilated Façade System</div>
                      <h3 className="sys__title">{s.name}</h3>
                      <p className="sys__desc">{s.tagline}</p>
                      <Link to={`/system/${s.slug}`} className="btn btn--outline">
                        Learn more
                      </Link>
                    </div>
                    <div className="systemRow__media">
                      <div className="sysMedia__frame">
                        <img src={s.images?.[0]} alt={s.name} loading="lazy" />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
