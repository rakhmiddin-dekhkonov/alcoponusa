import React, { useState } from "react";
import "../styles/Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", company: "", position: "", message: ""
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Please include a short message";
    return e;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      // Here you would POST to your backend (fetch/axios). For now, show success.
      setSent(true);
      setForm({ firstName:"", lastName:"", email:"", phone:"", message:"" });
    }
  };

  return (
    <section className="section">
      <div className="container">
        <header className="contact__header">
          <h1 className="section-heading">Contact Us</h1>
          <p className="section-sub">Tell us about your project and we’ll get back to you soon.</p>
        </header>

        {sent && (
          <div className="alert alert--success" role="status">
            ✅ Thanks! Your message has been received. We’ll reply shortly.
          </div>
        )}

        <div className="contactGrid">
          {/* Form */}
          <form className="card contactForm" onSubmit={onSubmit} noValidate>
            <div className="grid formGrid">
              <label>
                First Name
                <input
                  className={`input ${errors.firstName ? "input--error" : ""}`}
                  name="firstName"
                  value={form.firstName}
                  onChange={onChange}
                  required
                />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
              </label>

              <label>
                Last Name
                <input
                  className={`input ${errors.lastName ? "input--error" : ""}`}
                  name="lastName"
                  value={form.lastName}
                  onChange={onChange}
                  required
                />
                {errors.lastName && <span className="error">{errors.lastName}</span>}
              </label>

              <label>
                Email
                <input
                  type="email"
                  className={`input ${errors.email ? "input--error" : ""}`}
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </label>

              <label>
                Phone (optional)
                <input
                  className="input"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                />
              </label>

              <label>
                Company
                <input
                  className={`input ${errors.company ? "input--error" : ""}`}
                  name="company"
                  value={form.company}
                  onChange={onChange}
                  required
                />
                {errors.company && <span className="error">{errors.company}</span>}
              </label>

              <label>
                Position (optional)
                <input
                  className={`input ${errors.position ? "input--error" : ""}`}
                  name="position"
                  value={form.position}
                  onChange={onChange}
                />
                {errors.position && <span className="error">{errors.position}</span>}
              </label>

              <label className="formFull">
                Message
                <textarea
                  rows="6"
                  className={`input ${errors.message ? "input--error" : ""}`}
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                />
                {errors.message && <span className="error">{errors.message}</span>}
              </label>
            </div>

            <button className="btn btn--primary mt-24" type="submit">Submit</button>
          </form>

          {/* Info panel */}
          <aside className="card contactInfo">
            <h3>Talk to a Specialist</h3>
            <p className="muted">We’re available Mon–Fri, 9:00–18:00.</p>

            <ul className="infoList">
              <li>
                <span className="infoLabel">Email</span>
                <a href="mailto:sales@alcopon.example">sales@alcopon.example</a>
              </li>
              <li>
                <span className="infoLabel">Phone</span>
                <a href="tel:+10000000000">+1 (000) 000-0000</a>
              </li>
              <li>
                <span className="infoLabel">Address</span>
                <span>123 Industry Ave, Suite 200<br/>City, State, ZIP</span>
              </li>
            </ul>

            <div className="mapPlaceholder" aria-label="Map placeholder">
              <div className="mapGrid" />
              <span className="mapText">Map / Location</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
