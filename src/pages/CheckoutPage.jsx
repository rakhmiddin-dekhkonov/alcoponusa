import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import finishes from "../data/finishes";
import "../styles/CheckoutPage.css";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    country: "",
    notes: "",
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    // restore form if user goes back
    const saved = sessionStorage.getItem("checkoutInfo");
    if (saved) setForm(JSON.parse(saved));

    // resolve cart codes to items
    const codes = JSON.parse(sessionStorage.getItem("cartFinishes") || "[]");
    const mapped = finishes.flatMap(g => g.items).filter(i => codes.includes(i.code));
    setItems(mapped);
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    setForm(next);
    sessionStorage.setItem("checkoutInfo", JSON.stringify(next));
  };

  const valid = useMemo(() => {
    return form.name && /\S+@\S+\.\S+/.test(form.email) && form.address && form.country;
  }, [form]);

  const handleNext = () => {
    if (!valid) return;
    sessionStorage.setItem("checkoutInfo", JSON.stringify(form));
    navigate("/payment");
  };


  return (
    <section className="checkout-section">
      <div className="container">
        {/* Steps */}
        <div className="steps">
          <div className="step">Cart</div>
          <div className="step active">Checkout</div>
          <div className="step">Payment</div>
        </div>

        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
          {/* Left: form */}
          <form className="checkout-form" noValidate>
            <div className="form-row">
              <input className="input" name="name" placeholder="Full name *" value={form.name} onChange={onChange} required />
              <input className="input" name="email" type="email" placeholder="Email *" value={form.email} onChange={onChange} required />
            </div>

            <div className="form-row">
              <input className="input" name="phone" placeholder="Phone (optional)" value={form.phone} onChange={onChange} required />
              <input className="input" name="company" placeholder="Company (optional)" value={form.company} onChange={onChange} />
            </div>

            <textarea className="textarea" name="address" placeholder="Shipping address *" value={form.address} onChange={onChange} required />
            <div className="form-row">
              <input className="input" name="city" placeholder="City" value={form.city} onChange={onChange} />
              <input className="input" name="country" placeholder="Country *" value={form.country} onChange={onChange} required />
            </div>

            <textarea className="textarea" name="notes" placeholder="Notes (e.g., preferred colors, deadline)" value={form.notes} onChange={onChange} />

            <p className="checkout-note">We’ll confirm availability and shipping details via email.</p>

            <div style={{display:"flex", gap:12, marginTop:4}}>
              <Link to="/cart" className="btn ghost">← Back to cart</Link>
              <button
                type="button"                 // ⬅️ not submit
                className="next-btn"
                onClick={handleNext}
                disabled={!valid}
              >
                Continue to Payment
              </button>
            </div>
          </form>

          {/* Right: order summary */}
          <aside className="checkout-summary">
            <div className="summary-list">
              {items.map(i => (
                <div key={i.code} className="summary-item">
                  <span>{i.code}</span>
                  <span style={{opacity:.8}}>{i.name}</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span>Items</span>
              <span>{items.length}</span>
            </div>
            <div className="summary-total">
              <span>Subtotal</span>
              <span>$0.00</span>
            </div>
            <p className="checkout-note">Samples are free. Shipping is calculated after address verification.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
