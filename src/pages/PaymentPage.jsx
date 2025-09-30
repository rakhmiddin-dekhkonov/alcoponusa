import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/PaymentPage.css";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(""); // "", "processing", "success"

  // Guard: if no checkout info, send back
  useEffect(() => {
    const info = sessionStorage.getItem("checkoutInfo");
    const cart = sessionStorage.getItem("cartFinishes");
    if (!info || !cart || JSON.parse(cart).length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [navigate]);

  const handlePay = () => {
    setStatus("processing");
    // Simulated payment
    setTimeout(() => {
      setStatus("success");
      sessionStorage.removeItem("cartFinishes");
      // keep checkoutInfo so we can show a confirmation (optional: remove)
    }, 1600);
  };

  return (
    <section className="payment-section">
      <div className="container">
        {/* Steps */}
        <div className="steps">
          <div className="step">Cart</div>
          <div className="step">Checkout</div>
          <div className="step active">Payment</div>
        </div>

        <h1 className="payment-title">Payment</h1>

        <div className="pay-wrap">
          <div className="pay-card">
            <p style={{marginTop:0, color:"var(--rich-charcoal)"}}>
              This is a demo payment screen. You can plug Stripe/PayPal later.
            </p>

            <div className="pay-row">
              <input className="pay-input" placeholder="Cardholder name" />
              <input className="pay-input" placeholder="Card number" />
            </div>
            <div className="pay-row">
              <input className="pay-input" placeholder="MM/YY" />
              <input className="pay-input" placeholder="CVC" />
            </div>

            <button className="pay-btn" onClick={handlePay} disabled={status === "processing" || status === "success"}>
              {status === "processing" ? "Processing…" : status === "success" ? "Paid" : "Pay Now"}
            </button>
          </div>

          {status && (
            <div className={`payment-status ${status === "processing" ? "status-processing" : "status-success"}`}>
              {status === "processing" ? "Processing secure payment…" : "✅ Payment Successful! We’ll email confirmation shortly."}
            </div>
          )}

          <div style={{display:"flex", gap:12}}>
            <Link to="/checkout" className="btn ghost">← Back to Checkout</Link>
            {status === "success" && (
              <Link to="/samples-finishes" className="btn primary">Continue browsing</Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
