import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import finishes from "../data/finishes";
import "../styles/CartPage.css";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // load cart (codes) and resolve to full items
  useEffect(() => {
    const codes = JSON.parse(sessionStorage.getItem("cartFinishes") || "[]");
    const mapped = finishes
      .flatMap(g => g.items)
      .filter(item => codes.includes(item.code));
    setCartItems(mapped);
  }, []);

  const itemCount = cartItems.length;

  const handleRemove = (code) => {
    const updated = cartItems.filter(i => i.code !== code);
    setCartItems(updated);
    sessionStorage.setItem("cartFinishes", JSON.stringify(updated.map(i => i.code)));
  };

  const handleClear = () => {
    setCartItems([]);
    sessionStorage.setItem("cartFinishes", "[]");
  };

  const summary = useMemo(() => ({
    items: itemCount,
    // Samples typically $0; keep a subtotal line for future pricing
    subtotal: 0
  }), [itemCount]);

  return (
    <section className="cart-section">
      <div className="container">
        {/* Step indicator */}
        <div className="steps">
          <div className="step active">Cart</div>
          <div className="step">Checkout</div>
          <div className="step">Payment</div>
        </div>

        <h1 className="cart-title">Your Cart</h1>

        {itemCount === 0 ? (
          <div className="cart-empty">
            <p>Looks like you haven’t added any finishes yet.</p>
            <Link className="btn primary" to="/samples">Browse Samples & Finishes</Link>
          </div>
        ) : (
          <div className="cart-grid">
            {/* Left: Items */}
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.code} className="cart-card">
                  <img className="cart-thumb" src={item.img} alt={item.name} />
                  <div className="cart-info">
                    <h3>{item.code}</h3>
                    <p>{item.name}</p>
                    <div className="chip">Sample</div>
                  </div>
                  <div className="cart-actions">
                    {/* If you add quantity later, drop a qty control here */}
                    <button className="cart-remove" onClick={() => handleRemove(item.code)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-footer-actions">
                <Link className="btn ghost" to="/samples">← Continue browsing</Link>
                <button className="btn ghost danger" onClick={handleClear}>Clear cart</button>
              </div>
            </div>

            {/* Right: Summary */}
            <aside className="cart-summary">
              <div className="summary-row">
                <span>Items</span>
                <span className="emph">{summary.items}</span>
              </div>
              <div className="summary-row">
                <span>Subtotal</span>
                <span className="emph">$0.00</span>
              </div>
              <div className="summary-note">
                Samples are free. Shipping and lead time will be confirmed by our team at checkout.
              </div>

              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>

              <div className="trust">
                <span>🔒 Secure request</span>
                <span>⏱ 1–2 min</span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
