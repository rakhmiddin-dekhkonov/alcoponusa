import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import finishes from "../data/finishes";
import "../styles/CartPage.css";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]); // [{...item, qty}]
  const navigate = useNavigate();

  // Helper: expand items with qty into duplicate code list for storage
  const persistCart = (itemsWithQty) => {
    const codes = [];
    itemsWithQty.forEach(i => {
      for (let k = 0; k < i.qty; k++) codes.push(i.code);
    });
    sessionStorage.setItem("cartFinishes", JSON.stringify(codes));
  };

  // Load cart: aggregate duplicate codes -> qty per code
  useEffect(() => {
    const codes = JSON.parse(sessionStorage.getItem("cartFinishes") || "[]"); // e.g. ["AL-001","AL-001","AL-002"]

    // If someone stored as objects by mistake, normalize to list of codes
    const normalizedCodes = Array.isArray(codes)
      ? codes.flatMap(c => (typeof c === "string" ? [c] : (c?.code ? [c.code] : [])))
      : [];

    const qtyMap = normalizedCodes.reduce((acc, code) => {
      acc[code] = (acc[code] || 0) + 1;
      return acc;
    }, {});

    const allItems = finishes.flatMap(g => g.items);
    const mapped = Object.entries(qtyMap).map(([code, qty]) => {
      const found = allItems.find(i => i.code === code);
      return found ? { ...found, qty } : null;
    }).filter(Boolean);

    setCartItems(mapped);
  }, []);

  const totalUnits = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.qty, 0),
    [cartItems]
  );

  const handleRemove = (code) => {
    const updated = cartItems.filter(i => i.code !== code);
    setCartItems(updated);
    persistCart(updated);
  };

  const handleClear = () => {
    setCartItems([]);
    sessionStorage.setItem("cartFinishes", "[]");
  };

  const changeQty = (code, nextQty) => {
    setCartItems(prev => {
      const updated = prev
        .map(i => (i.code === code ? { ...i, qty: nextQty } : i))
        .filter(i => i.qty > 0); // remove if 0
      persistCart(updated);
      return updated;
    });
  };

  const dec = (code) => {
    const item = cartItems.find(i => i.code === code);
    if (!item) return;
    const next = Math.max(0, item.qty - 1); // 0 will remove
    changeQty(code, next);
  };

  const inc = (code) => {
    const item = cartItems.find(i => i.code === code);
    if (!item) return;
    changeQty(code, item.qty + 1);
  };

  const onQtyInput = (code, value) => {
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed)) return;
    const clamped = Math.max(1, parsed);
    changeQty(code, clamped);
  };

  const summary = useMemo(() => ({
    uniqueItems: cartItems.length,
    units: totalUnits,
    subtotal: 0 // samples are free; keep line for future pricing
  }), [cartItems.length, totalUnits]);

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

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Looks like you haven’t added any finishes yet.</p>
            <Link className="btn primary" to="/samples-finishes">Browse Samples & Finishes</Link>
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

                  {/* Quantity control */}
                  <div className="qty-control" aria-label={`Quantity for ${item.name}`}>
                    <button
                      className="qty-btn"
                      onClick={() => dec(item.code)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      className="qty-input"
                      type="number"
                      min="1"
                      inputMode="numeric"
                      value={item.qty}
                      onChange={(e) => onQtyInput(item.code, e.target.value)}
                    />
                    <button
                      className="qty-btn"
                      onClick={() => inc(item.code)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-actions">
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
                <span>Unique items</span>
                <span className="emph">{summary.uniqueItems}</span>
              </div>
              <div className="summary-row">
                <span>Total units</span>
                <span className="emph">{summary.units}</span>
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
